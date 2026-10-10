#!/usr/bin/env python3
"""Recompute the Round 2 evidence audit and explicit metric units from saved observations."""
import ast
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PARENT = ROOT.parent

def read(name):return json.loads((ROOT / name).read_text())
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()

def calculate(t, h):
    records = {r['id']:r for r in t['records'] + h['records']}
    forbidden_early = ['complete_warehouse', 'plan_v2', 'create_refund_task']
    unsafe_ids = ['T02', 'T03', 'T04', 'T11', 'T13']
    opportunity_pairs = [{'id':id,'action':action,'error':action in records[id]['actual']['actions']}
                         for id in unsafe_ids for action in forbidden_early]
    duplicate_pairs = [{'id':'H02','action':action,'error':action in records['H02']['actual']['actions']}
                       for action in ['complete_warehouse', 'plan_v2']]
    evidence_ids = ['T09', 'T10', 'T14', 'H04']
    evidence_pairs = [{'id':id,'action':action,'error':bool(records[id]['actual'][field])}
                      for id in evidence_ids for action,field in [('confirm_root','root_confirmed'),('create_improvement_task','task_created')]]
    case_ids = ['T09','T14','H04']
    label_pairs = [{'id':id,'case':case,'expected':label,'actual':records[id]['actual']['case_decisions'][case]}
                   for id in case_ids for case,label in records[id]['expected']['case_decisions'].items()]
    link_ids = ['T01','T07','T08','T12','H01','H03']
    links = [{'id':id,'error':any(val is not None and val != records[id]['input']['return_id']
              for val in [records[id]['actual'].get('goal_return_id'),records[id]['actual'].get('reused_task_return_id')])} for id in link_ids]
    waiting_ids = ['T03','T04','T05','T11','T13','H02']
    return {
        'recovery':{'correct':int(records['T01']['verdict']=='PASS'),'total':1,'unit':'applicable recovery-execution scenario','ids':['T01']},
        'dangerous_early':{'errors':sum(x['error'] for x in opportunity_pairs),'total':len(opportunity_pairs),'unit':'forbidden-action check opportunity (5 scenarios × 3 actions)','observations':opportunity_pairs},
        'duplicate_task':{'errors':int('create_refund_task' in records['T08']['actual']['actions']),'total':1,'unit':'applicable reusable-task decision','ids':['T08']},
        'waiting':{'correct':sum(records[id]['verdict']=='PASS' for id in waiting_ids),'total':len(waiting_ids),'unit':'waiting/continue/state-transition scenario','ids':waiting_ids},
        'case_labels':{'correct':sum(x['expected']==x['actual'] for x in label_pairs),'total':len(label_pairs),'unit':'label judgment; 4 Case IDs repeated across 3 scenarios','observations':label_pairs},
        'insufficient_evidence':{'errors':sum(x['error'] for x in evidence_pairs),'total':len(evidence_pairs),'unit':'forbidden conclusion/action check (4 scenarios × 2 actions)','observations':evidence_pairs},
        'wrong_business_link':{'errors':sum(x['error'] for x in links),'total':len(links),'unit':'business-object association/reuse decision','observations':links},
        'duplicate_state_update':{'errors':sum(x['error'] for x in duplicate_pairs),'total':len(duplicate_pairs),'unit':'duplicate completion/replanning action opportunity in H02','observations':duplicate_pairs},
        'time_conflict':{'correct':int(records['H04']['actual'].get('conflicting_evidence')==['CASE-001'] and 'CASE-001' in records['H04']['actual']['missing_evidence']),'total':1,'unit':'timestamp-conflict evidence review','ids':['H04']}}

def main():
    original=read('t-audit-initial.json');initial=read('h-initial.json');final=read('h-final.json');regression=read('t-final.json');snapshot=read('snapshot.json');manifest=read('h-manifest.json')
    assert sha(ROOT/'rules-before.py')==snapshot['sha256']['rules.py']==manifest['initial_rule_sha256']==initial['rule_sha256']
    assert sha(PARENT/'rules.py')==final['rule_sha256']==regression['source_sha256']['rules.py']
    assert initial['source_sha256']==final['source_sha256']
    for n,key in [('h-fixtures.json','fixture_sha256'),('h-expected.json','expected_sha256')]:assert sha(ROOT/n)==manifest[key]
    for n in ['fixtures.json','expected.json','results-initial.json','results.json','recheck.json','run_eval.py']:assert sha(PARENT/n)==snapshot['sha256'][n]
    tree=ast.parse((PARENT/'rules.py').read_text());text_constants=[n.value for n in ast.walk(tree) if isinstance(n,ast.Constant) and isinstance(n.value,str)]
    audit=read('audit.json');audit['final_structural_checks']={'test_id_target_dispatch_found':any(s in {f'T{i:02}' for i in range(1,15)}|{f'H{i:02}' for i in range(1,5)} for s in text_constants),'expected_reference_found':any(isinstance(n,ast.Name) and n.id=='expected' for n in ast.walk(tree)),'business_function_args':[a.arg for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='evaluate' for a in n.args.args],'imports':[n.module for n in tree.body if isinstance(n,ast.ImportFrom)]}
    audit['historical_metadata_note']='Round 1 expected metadata says Human-authored; actual encoded by Codex from human requirements, not independent expert annotation. Bytes preserved, meaning clarified here.'
    (ROOT/'audit.json').write_text(json.dumps(audit,ensure_ascii=False,indent=2)+'\n')
    repair={'first_H':initial['summary'],'final_H':final['summary'],'original_T_audit':original['summary'],'T_regression':regression['summary'],'original_rule_sha256':initial['rule_sha256'],'fixed_rule_sha256':final['rule_sha256'],'same_fixtures_expected_runner_between_H_runs':True,'Round_1_inputs_expected_and_outputs_preserved':True,'repairs':[{'id':id,'initial_actual':next(r['actual'] for r in initial['records'] if r['id']==id),'first_mismatches':next(r['mismatches'] for r in initial['records'] if r['id']==id),'final_actual':next(r['actual'] for r in final['records'] if r['id']==id),'fix':'Gate side-effect intents with current warehouse status/current plan' if id=='H02' else 'Flag reverse or unparsable synthetic timestamp chains and include the Case in unresolved evidence'} for id in initial['summary']['failed_ids']]}
    (ROOT/'repair-record.json').write_text(json.dumps(repair,ensure_ascii=False,indent=2)+'\n')
    (ROOT/'metrics.json').write_text(json.dumps({'scope':'Target rules only; controls separately retained. Units declared; no AI accuracy.','initial':calculate(original,initial),'final':calculate(regression,final)},ensure_ascii=False,indent=2)+'\n')
    print(json.dumps({'initial_H':initial['summary'],'final_H':final['summary'],'T_regression':regression['summary'],'integrity':'frozen labels / first failures / historical Round 1 results preserved','metrics':{k:{x:y for x,y in v.items() if x in ('correct','errors','total','unit')} for k,v in calculate(regression,final).items()}},ensure_ascii=False,indent=2))

if __name__=='__main__':main()
