"""Deterministic product-rule mock. No LLM, Agent, API, clock or I/O here."""

def valid_task(task, return_id, issue):
    return (task.get('return_id') == return_id and task.get('issue') == issue
            and task.get('valid') is True and task.get('status') in ('Started', 'Waiting', 'Pending'))


def evaluate(operation, data):
    ret = data['return_id']
    if operation == 'recover_goal':
        promises = [p for p in data['promises'] if p['return_id'] == ret
                    and p['customer_id'] == data['customer_id'] and p['source_valid']
                    and p['pending'] and p['issue'] == 'warehouse_receipt_check']
        matched = len(promises) == 1 and data['intent'] == 'followup_warehouse_check'
        return {'goal_status': 'Recovered' if matched else 'Needs Confirmation',
                'goal_return_id': ret if matched else None,
                'promise_source': promises[0]['conversation_id'] if matched else None,
                'handoff': 'Pending' if matched else 'Blocked', 'recovery_attempted': matched,
                'warehouse_task_created': False, 'reply_sent': False,
                'actions': ['recover_goal', 'prepare_handoff'] if matched else ['reject_unrelated_promise']}
    if operation == 'plan_queries':
        return {'query_intents': {'Warehouse Agent': ['warehouse_record', 'warehouse_task'],
                                 'Refund Agent': ['refund_record', 'refund_task']},
                'return_to': 'Service Orchestrator',
                'all_results_ready': data['warehouse_query_complete'] and data['refund_query_complete'],
                'plan': 'v1', 'actions': ['request_parallel_queries', 'hold_refund']}
    if operation == 'warehouse_wait':
        existing = [t for t in data['warehouse_tasks'] if valid_task(t, ret, 'warehouse_receipt_check')]
        can_create = data['handoff_accepted'] and not data['warehouse_verified'] and not existing
        return {'warehouse_task': existing[0]['id'] if existing else 'WH-201' if can_create else None,
                'warehouse_status': 'Waiting', 'context_retained_in_memory': True,
                'created_tasks': ['WH-201'] if can_create else [], 'plan': 'v1',
                'actions': (['create_warehouse_task'] if can_create else []) + ['wait']}
    if operation == 'warehouse_event':
        # Within-process sequence only. This is not a persistent event consumer.
        seen = list(data['seen_event_ids'])
        actions = []
        resumed = duplicate = 0
        for event in data['events']:
            if event['return_id'] != ret or event['task_id'] != 'WH-201':
                continue
            if event['id'] in seen:
                duplicate += 1
                actions.append('ignore_duplicate_event')
                continue
            seen.append(event['id'])
            resumed += 1
            actions.append('request_record_check')
        record = data['receipt_record']
        verified = (data['lookup_complete'] and record is not None
                    and record.get('return_id') == ret and record.get('valid') is True)
        actions += ['complete_warehouse', 'plan_v2'] if verified else ['wait']
        return {'warehouse_status': 'Completed' if verified else 'Waiting',
                'plan': 'v2' if verified else 'v1', 'resume_requests': resumed,
                'warehouse_lookup_requests': resumed, 'ignored_duplicate_events': duplicate,
                'seen_event_ids': seen, 'created_tasks': [],
                'record_check': 'Verified' if verified else 'Missing' if data['lookup_complete'] else 'Pending',
                'actions': actions}
    if operation == 'warehouse_verify':
        record = data['receipt_record']
        verified = record is not None and record.get('return_id') == ret and record.get('valid') is True
        return {'warehouse_task': data['warehouse_task'],
                'warehouse_status': 'Completed' if verified else 'Waiting',
                'plan': 'v2' if verified else 'v1', 'remaining_task': 'refund_exception' if verified else 'warehouse_receipt_check',
                'created_tasks': [], 'actions': ['complete_warehouse', 'plan_v2'] if verified else ['wait']}
    if operation == 'refund_followup':
        if not data['warehouse_verified']:
            return {'refund_task': None, 'refund_task_status': 'Blocked', 'reused_task_return_id': None,
                    'created_tasks': [], 'rejected_task_ids': [], 'actual_refund': data['refund_status'], 'actions': ['hold_refund']}
        existing = [t for t in data['refund_tasks'] if valid_task(t, ret, 'refund_exception')]
        rejected = [t['id'] for t in data['refund_tasks'] if t not in existing]
        if len(existing) > 1:
            return {'refund_task': None, 'refund_task_status': 'Needs Confirmation', 'reused_task_return_id': None,
                    'created_tasks': [], 'rejected_task_ids': rejected, 'actual_refund': data['refund_status'], 'actions': ['verify_task_conflict']}
        return {'refund_task': existing[0]['id'] if existing else 'RF-301',
                'refund_task_status': existing[0]['status'] if existing else 'Started',
                'reused_task_return_id': ret if existing else None,
                'created_tasks': [] if existing else ['RF-301'], 'rejected_task_ids': rejected,
                'actual_refund': data['refund_status'],
                'actions': ['continue_existing_refund_task'] if existing else ['create_refund_task']}
    if operation in ('voc_screen', 'voc_evidence'):
        cases = data.get('cases', data.get('candidates'))
        decisions = {}
        candidates = []
        for case in cases:
            if case['stage'] == 'refund_followup' and case['stage_confirmed']:
                decisions[case['id']] = 'Excluded'
            elif case['stage'] == 'warehouse_confirmation' and case['stage_confirmed']:
                decisions[case['id']] = 'Candidate'
                candidates.append(case)
            else:
                decisions[case['id']] = 'Needs Verification'
                candidates.append(case)
        missing = [c['id'] for c in candidates if not c['stage_confirmed']
                   or any(c['times'].get(key) is None for key in ('inbound', 'system', 'service'))]
        # Complete timestamps alone are not proof of causality. No root inference is implemented.
        output = {'issue_id': 'CI-001', 'issue_status': 'Need Evidence', 'root_confirmed': False,
                  'task_id': None, 'task_created': False, 'missing_evidence': missing,
                  'actions': ['request_evidence']}
        if operation == 'voc_screen':
            output['case_decisions'] = decisions
            output['actions'].insert(0, 'retain_candidates')
        return output
    raise ValueError(f'Unsupported operation: {operation}')


def compare_simplified(strategy, operation, data):
    """Transparent controls, not alleged historical product/Agent versions."""
    output = evaluate(operation, data)
    if strategy == 'event_equals_verified':
        if operation != 'warehouse_event':
            raise ValueError('Event control applies only to a warehouse event sample')
        if data['events']:
            output.update(warehouse_status='Completed', plan='v2', record_check='Assumed From Event', created_tasks=['RF-301'])
            output['actions'] = ['complete_warehouse', 'plan_v2', 'create_refund_task']
    elif strategy == 'same_text_equals_root':
        if operation != 'voc_screen':
            raise ValueError('Text control applies only to VOC screening')
        texts = [c['complaint'] for c in data['cases']]
        if len(texts) >= 2 and len(set(texts)) == 1:
            output.update(case_decisions={c['id']: 'Candidate' for c in data['cases']},
                          issue_status='Confirmed', root_confirmed=True, task_id='TASK-001', task_created=True)
            output['actions'] = ['merge_by_text', 'confirm_root', 'create_improvement_task']
    else:
        raise ValueError(f'Unknown control: {strategy}')
    return output
