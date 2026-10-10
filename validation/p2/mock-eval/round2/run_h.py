#!/usr/bin/env python3
"""Execute the frozen H review inputs; never overwrite first/final evidence."""
import argparse
import copy
import hashlib
import importlib.util
import json
import platform
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT.parent))
from run_eval import verdict

def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--rules', default='../rules.py')
    parser.add_argument('--output', required=True)
    parser.add_argument('--run-id', required=True)
    args = parser.parse_args()
    rule = (ROOT / args.rules).resolve()
    output = ROOT / args.output
    if output.exists():
        raise SystemExit('Output already exists; choose a new name to preserve evidence.')
    frozen = json.loads((ROOT / 'h-manifest.json').read_text())
    for name, key in [('h-fixtures.json', 'fixture_sha256'), ('h-expected.json', 'expected_sha256')]:
        if sha(ROOT / name) != frozen[key]:
            raise SystemExit('Frozen H input / labels changed; refusing to run.')
    samples = json.loads((ROOT / 'h-fixtures.json').read_text())['samples']
    labels = json.loads((ROOT / 'h-expected.json').read_text())['cases']
    if {s['id'] for s in samples} != set(labels):
        raise SystemExit('H input / expected IDs do not match')
    spec = importlib.util.spec_from_file_location('reviewed_rules', rule)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    records = []
    for sample in samples:
        data = copy.deepcopy(sample['input'])
        actual = module.evaluate(sample['operation'], data)
        # Test ID and expected are not passed to the evaluated business function.
        record = verdict(sample, labels[sample['id']], actual, 'new_compositional_review')
        record['input_unchanged'] = data == sample['input']
        if not record['input_unchanged']:
            record['verdict'] = 'FAIL'
            record['mismatches'].append({'field': 'input_unchanged', 'expected': True, 'actual': False})
        records.append(record)
    failed = [r['id'] for r in records if r['verdict'] == 'FAIL']
    result = {'run_id': args.run_id, 'scope': 'Four new compositional synthetic review cases; not an external blind test or Agent execution',
              'python_version': platform.python_version(),
              'source_sha256': {name: sha(ROOT / name) for name in ('h-fixtures.json', 'h-expected.json', 'h-manifest.json', 'run_h.py')},
              'rule_path': args.rules, 'rule_sha256': sha(rule),
              'initial_rule_unmodified': sha(rule) == frozen['initial_rule_sha256'],
              'summary': {'total': len(records), 'pass': len(records) - len(failed), 'fail': len(failed), 'failed_ids': failed}, 'records': records}
    output.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
    print(json.dumps({'output': str(output), **result['summary'], 'initial_rule_unmodified': result['initial_rule_unmodified']}, ensure_ascii=False, indent=2))
    return 1 if failed else 0

if __name__ == '__main__':
    raise SystemExit(main())
