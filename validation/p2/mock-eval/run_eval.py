#!/usr/bin/env python3
"""Run frozen fixtures against independent deterministic rules; persist all failures."""
import argparse
import hashlib
import json
import platform
from pathlib import Path
from rules import evaluate, compare_simplified

ROOT = Path(__file__).resolve().parent

def read(name):
    return json.loads((ROOT / name).read_text())

def sha(name):
    return hashlib.sha256((ROOT / name).read_bytes()).hexdigest()

def verdict(sample, expected, actual, classification):
    mismatches = [{'field': k, 'expected': value, 'actual': actual.get(k)}
                  for k, value in expected['output'].items() if actual.get(k) != value]
    forbidden = sorted(set(actual['actions']) & set(expected['forbidden_actions']))
    return {'id': sample['id'], 'flow': sample['flow'], 'bad_cases': sample['bad_cases'],
            'classification': classification, 'input': sample['input'], 'conflict': sample['conflict'],
            'expected': expected['output'], 'forbidden_actions': expected['forbidden_actions'],
            'actual': actual, 'mismatches': mismatches, 'forbidden_observed': forbidden,
            'verdict': 'FAIL' if mismatches or forbidden else 'PASS'}

def calculate_metrics(samples, records):
    by_id = {r['id']: r for r in records}
    groups = {group: [s for s in samples if group in s['metric_groups']]
              for group in ('recovery', 'unsafe', 'duplicate', 'waiting', 'case_decision', 'evidence', 'wrong_link')}
    recovered = sum(by_id[s['id']]['actual'].get('goal_status') == 'Recovered'
                    and by_id[s['id']]['actual'].get('goal_return_id') == s['input']['return_id']
                    and by_id[s['id']]['verdict'] == 'PASS' for s in groups['recovery'])
    dangerous = sum(len(set(by_id[s['id']]['actual']['actions']) & {'complete_warehouse', 'plan_v2', 'create_refund_task'}) for s in groups['unsafe'])
    duplicate = sum('create_refund_task' in by_id[s['id']]['actual']['actions'] for s in groups['duplicate'])
    waiting_ok = sum(by_id[s['id']]['verdict'] == 'PASS' for s in groups['waiting'])
    decisions_total = decisions_ok = 0
    for s in groups['case_decision']:
        rec = by_id[s['id']]
        for case_id, expected in rec['expected']['case_decisions'].items():
            decisions_total += 1
            decisions_ok += rec['actual']['case_decisions'].get(case_id) == expected
    false_confirm = sum(bool(by_id[s['id']]['actual']['root_confirmed']) for s in groups['evidence'])
    false_task = sum(bool(by_id[s['id']]['actual']['task_created']) for s in groups['evidence'])
    wrong_links = sum(any(value is not None and value != s['input']['return_id']
                          for value in (by_id[s['id']]['actual'].get('goal_return_id'), by_id[s['id']]['actual'].get('reused_task_return_id')))
                      for s in groups['wrong_link'])
    return {'goal_recovery': {'correct': recovered, 'applicable': len(groups['recovery']), 'ids': [s['id'] for s in groups['recovery']]},
            'dangerous_early_actions': {'count': dangerous, 'applicable': len(groups['unsafe']), 'ids': [s['id'] for s in groups['unsafe']]},
            'duplicate_task_creation': {'count': duplicate, 'applicable': len(groups['duplicate']), 'ids': [s['id'] for s in groups['duplicate']]},
            'waiting_decisions': {'correct': waiting_ok, 'applicable': len(groups['waiting']), 'ids': [s['id'] for s in groups['waiting']]},
            'case_decisions': {'correct': decisions_ok, 'applicable': decisions_total, 'ids': [s['id'] for s in groups['case_decision']]},
            'insufficient_evidence': {'wrong_confirmations': false_confirm, 'wrong_task_creations': false_task, 'applicable': len(groups['evidence']), 'ids': [s['id'] for s in groups['evidence']]},
            'wrong_business_links': {'count': wrong_links, 'applicable': len(groups['wrong_link']), 'ids': [s['id'] for s in groups['wrong_link']]},
            'critical_errors': dangerous + duplicate + false_confirm + false_task + wrong_links}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', default='results.json')
    parser.add_argument('--run-id', default='recheck')
    args = parser.parse_args()
    samples = read('fixtures.json')['samples']
    expected = read('expected.json')['cases']
    frozen = read('test-set-manifest.json')
    if sha('fixtures.json') != frozen['input_sha256'] or sha('expected.json') != frozen['expected_sha256']:
        raise SystemExit('Frozen fixtures / expected changed; define a new explicit test-set version before running.')
    if set(expected) != {s['id'] for s in samples}:
        raise SystemExit('Input / expected IDs do not match')
    records = []
    for sample in samples:
        actual = evaluate(sample['operation'], sample['input'])
        record = verdict(sample, expected[sample['id']], actual,
                         'correct_interception' if sample['negative'] else 'expected_branch')
        if record['verdict'] == 'FAIL':
            record['classification'] = 'actual_rule_test_failure'
        records.append(record)
    comparisons = []
    for id, strategy in [('T11', 'event_equals_verified'), ('T14', 'same_text_equals_root')]:
        sample = next(s for s in samples if s['id'] == id)
        actual = compare_simplified(strategy, sample['operation'], sample['input'])
        record = verdict(sample, expected[id], actual, 'simplified_control_failure')
        record['strategy'] = strategy
        comparisons.append(record)
    metrics = calculate_metrics(samples, records)
    failed = [r['id'] for r in records if r['verdict'] == 'FAIL']
    result = {'run_id': args.run_id, 'scope': 'synthetic deterministic product-rule mock; no Agent / LLM / API execution',
              'python_version': platform.python_version(),
              'source_sha256': {n: sha(n) for n in ('fixtures.json', 'expected.json', 'test-set-manifest.json', 'rules.py', 'run_eval.py')},
              'summary': {'target_total': len(records), 'target_pass': len(records) - len(failed), 'target_fail': len(failed),
                          'target_failed_ids': failed, 'correct_interceptions': sum(r['classification'] == 'correct_interception' and r['verdict'] == 'PASS' for r in records),
                          'comparison_total': len(comparisons), 'comparison_fail': sum(r['verdict'] == 'FAIL' for r in comparisons)},
              'records': records, 'comparisons': comparisons, 'metrics': metrics,
              'acceptance': {'all_target_checks_pass': not failed, 'critical_errors_zero': metrics['critical_errors'] == 0,
                             'meaning': 'Minimum gate for these synthetic rules only; not production reliability'}}
    output = Path(args.output)
    if not output.is_absolute():
        output = ROOT / output
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'output': str(output), **result['summary'], 'critical_errors': metrics['critical_errors']}, ensure_ascii=False, indent=2))
    return 1 if failed or metrics['critical_errors'] else 0

if __name__ == '__main__':
    raise SystemExit(main())
