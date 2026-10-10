"""Round 3 audit of existing frozen tests; adds no fixtures or expected labels."""
from pathlib import Path
import ast, difflib, hashlib, importlib.util, json, subprocess, sys
ROOT=Path(__file__).resolve().parent
P=ROOT.parent
R=P/'round2'
def read(p):return json.loads(p.read_text())
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def save(n,v):(ROOT/n).write_text(json.dumps(v,ensure_ascii=False,indent=2)+'\n')
commands=[
 ['python3',str(P/'run_eval.py'),'--output','round3/t-current.json','--run-id','round3-current-regression'],
 ['python3',str(R/'run_h.py'),'--output','../round3/h-current.json','--run-id','round3-current-recheck'],
 ['python3',str(R/'run_h.py'),'--rules','rules-before.py','--output','../round3/h-before-reproduced.json','--run-id','round3-saved-original-rule-reproduction']]
log=[]
for cmd,stem,exit_expected in zip(commands,['t-current','h-current','h-before-reproduced'],[0,0,1]):
 assert not (ROOT/(stem+'.json')).exists(),'Refuse overwriting saved execution'
 result=subprocess.run(cmd,capture_output=True,text=True)
 (ROOT/(stem+'-terminal.txt')).write_text(result.stdout+result.stderr)
 log.append({'command':cmd,'exit_code':result.returncode,'expected_exit_code':exit_expected,'stdout':result.stdout,'stderr':result.stderr,'output':str(ROOT/(stem+'.json'))})
 save('commands.json',log)
 assert result.returncode==exit_expected,result.stderr
initial=read(R/'h-initial.json');old=read(ROOT/'h-before-reproduced.json');final=read(ROOT/'h-current.json');t=read(ROOT/'t-current.json');snap=read(R/'snapshot.json');manifest=read(R/'h-manifest.json')
assert initial['records']==old['records']
assert final['records']==read(R/'h-final.json')['records']
assert t['records']==read(R/'t-final.json')['records']
assert t['comparisons']==read(R/'t-final.json')['comparisons']
assert initial['summary']=={'total':4,'pass':2,'fail':2,'failed_ids':['H02','H04']}
assert old['rule_sha256']==initial['rule_sha256']==sha(R/'rules-before.py')==manifest['initial_rule_sha256']
assert final['rule_sha256']==sha(P/'rules.py')==t['source_sha256']['rules.py']
assert initial['source_sha256']==final['source_sha256']==old['source_sha256']
for n,h in snap['sha256'].items():assert sha(R/'rules-before.py' if n=='rules.py' else P/n)==h,n
for n,k in [('h-fixtures.json','fixture_sha256'),('h-expected.json','expected_sha256')]:assert sha(R/n)==manifest[k]
actual_diff=''.join(difflib.unified_diff((R/'rules-before.py').read_text().splitlines(True),(P/'rules.py').read_text().splitlines(True),fromfile='rules-before.py',tofile='../rules.py'))
assert actual_diff==(R/'rule-fix.diff').read_text()
tree=ast.parse((P/'rules.py').read_text());constants=[n.value for n in ast.walk(tree) if isinstance(n,ast.Constant) and isinstance(n.value,str)]
args=[a.arg for n in tree.body if isinstance(n,ast.FunctionDef) and n.name=='evaluate' for a in n.args.args]
assert args==['operation','data']
assert not any(s in {f'T{i:02}' for i in range(1,15)}|{f'H{i:02}' for i in range(1,5)} for s in constants)
assert not any(isinstance(n,ast.Name) and n.id=='expected' for n in ast.walk(tree))
assert not any(isinstance(n,ast.Call) and isinstance(n.func,ast.Name) and n.func.id in ('open','eval','exec','__import__') for n in ast.walk(tree))
# Reuse the reviewed existing calculation, without calling its file-writing main.
spec=importlib.util.spec_from_file_location('round2_metrics',R/'summarize.py');module=importlib.util.module_from_spec(spec);spec.loader.exec_module(module)
metrics=module.calculate(t,final)
assert metrics==read(R/'metrics.json')['final']
save('metrics.json',{'version':'Fixed rule only; Round 3 actual reruns, initial failures excluded','rule_sha256':final['rule_sha256'],'sources':['t-current.json','h-current.json'],'calculation':'../round2/summarize.py:calculate','calculation_sha256':sha(R/'summarize.py'),'final':metrics})
repairs=[]
for id in ['H02','H04']:
 first=next(x for x in initial['records'] if x['id']==id);last=next(x for x in final['records'] if x['id']==id)
 repairs.append({'id':id,'input':first['input'],'expected':first['expected'],'first_actual':first['actual'],'first_mismatches':first['mismatches'],'first_forbidden':first['forbidden_observed'],'first_verdict':first['verdict'],'same_input':first['input']==last['input'],'same_expected':first['expected']==last['expected'],'final_actual':last['actual'],'final_verdict':last['verdict']})
save('audit.json',{'commands':'commands.json','T':t['summary'],'H_original_saved':initial['summary'],'H_original_rule_reproduction':old['summary'],'H_current':final['summary'],'integrity':{'frozen_original_inputs_labels_runner_outputs_preserved':True,'frozen_H_labels_runner_preserved':True,'saved_first_records_exactly_reproduced':True,'saved_diff_matches_sources':True,'same_records_as_Round2_final':True},'independence':{'business_args':args,'test_id_answer_dispatch':False,'expected_read_by_target':False,'actual_generated_before_expected_comparison':True,'all_18_target_and_2_control_records_executed':True,'expectations_relaxed':False,'limits':['Fixtures, expected labels and rules share product requirements and Codex author; no independent expert ground truth','H cases were constructed after reviewing rules, not external blind tests','Business stage, intent, source validity and task validity are supplied input facts','WH-201/RF-301/CI-001 are scenario constants; no general allocation or real tool execution','Comparison checks specified output keys and enumerated forbidden actions, not complete schema','Frozen historical metadata Human-authored and T09 same-text description are inaccurate; bytes preserved and meaning disclosed','Saved history and exact source reproduction substantiate recorded failure outputs; no external execution timestamp attestation']},'repairs':repairs,'metrics':'metrics.json','first_evidence':'../round2/h-initial.json','code_difference':'../round2/rule-fix.diff'})
print(json.dumps({'T':t['summary'],'H_first':initial['summary'],'H_final':final['summary'],'historical_outputs_and_labels_unchanged':True,'metrics':{k:{x:y for x,y in v.items() if x in ('correct','errors','total','unit')} for k,v in metrics.items()}},ensure_ascii=False,indent=2))
