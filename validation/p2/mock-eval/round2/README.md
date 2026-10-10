# B05 Round 2｜审计与组合冲突复核

当前验证只执行确定性 Python 业务规则。没有真实 Agent、LLM、企业 API、客户消息或外部运营数据。四条 H 样本是在阅读原规则后构建的新组合冲突复核集，不是外部盲测。

## 构建与实际执行顺序

1. 保存 `rules-before.py` 和 `snapshot.json`（含原 fixtures、expected、规则、执行器及历史结果的摘要）。
2. 未改规则，重新执行 T01–T14，生成 `t-audit-initial.json`：14 PASS / 0 FAIL，简化策略对照 2 FAIL。
3. 依据用户 Round 2 要求编写 `h-fixtures.json` 和 `h-expected.json`，然后保存 `h-manifest.json`。真值由 Codex 编码，仍需人工审查。
4. 使用原规则首次运行 H：`h-initial.json` 为 2 PASS / 2 FAIL。初始规则摘要与 snapshot 一致。
5. 分析 H02 / H04 后，只修改 `../rules.py`：任务状态约束及时间冲突检查。`rule-fix.diff` 保留修正。
6. 相同 H 输入、预期及执行器复测：`h-final.json` 为 4 PASS / 0 FAIL；T 回归 `t-final.json` 为 14 PASS / 0 FAIL，对照仍 2 FAIL。
7. `summarize.py` 核对冻结摘要、原失败未覆盖、原 Round 1 输入/预期/输出未改，并生成 `repair-record.json`、`metrics.json` 和补充审计。

终端输出保存在 `t-audit-initial-terminal.txt`、`h-initial-terminal.txt`、`h-final-terminal.txt`、`t-final-terminal.txt`；H 首次运行退出码确为 1。它们是文本执行证据，不是模拟终端截图。

## 本轮实际命令

在仓库根目录执行；Python 3.10+，标准库，本轮实际 Python 3.14.2：

```sh
python3 validation/p2/mock-eval/run_eval.py --output round2/t-audit-initial.json --run-id round2-audit-initial
python3 validation/p2/mock-eval/round2/run_h.py --output h-initial.json --run-id h-first-unchanged-rule
# 上述首次 H 运行后才修正规则。
python3 validation/p2/mock-eval/round2/run_h.py --output h-final.json --run-id h-after-rule-fix
python3 validation/p2/mock-eval/run_eval.py --output round2/t-final.json --run-id round2-regression-after-fix
python3 validation/p2/mock-eval/round2/summarize.py
```

这些结果已经保存。**重新复现时使用新输出文件名，不覆盖历史证据：**

```sh
# 原规则可独立从保存的源码复现：预期 2 PASS / 2 FAIL，退出码 1。
python3 validation/p2/mock-eval/round2/run_h.py --rules rules-before.py --output h-reproduce-before.json --run-id reproduce-before
# 修正规则：预期 4 PASS / 0 FAIL，退出码 0。
python3 validation/p2/mock-eval/round2/run_h.py --output h-reproduce-fixed.json --run-id reproduce-fixed
# 原 T 集在修正规则下的回归：预期 14 PASS / 0 FAIL，控制策略 2 FAIL。
python3 validation/p2/mock-eval/run_eval.py --output round2/t-reproduce-fixed.json --run-id reproduce-fixed
```

H 执行器拒绝覆盖任何已有输出文件，并校验固定的输入/预期；再次执行请换新名字。原 T 执行器不阻止覆盖，因此必须使用新的输出名字。原 `results-initial.json`、`results.json`、`recheck.json` 保持 Round 1 历史版本，当前规则请看本目录新结果。

## 初始发现与修正

| 样本 | 输入冲突 | 首次实际观察 | 修正后实际观察 |
| --- | --- | --- | --- |
| H01 / BC01–02 | 同客户 RET-001/002 相似承诺；当前 RET 来源无效，混入不同客户与事项 | PASS：Needs Confirmation、无目标、不交接、不建单 | PASS；未调整其规则 |
| H02 / BC03 | 已完成 WH-201 / 已生效 Plan v2；相同已处理事件再次到达，有效记录存在 | FAIL：虽不再次查询，却仍输出 complete_warehouse、plan_v2 | PASS：只 ignore_duplicate_event，当前 Completed / v2 不变 |
| H03 / BC04 | 仓库前提满足；五条旧任务取消、关闭、无效、异 RET 或异事项 | PASS：五条均不接续，模拟建 RF-301 Started，退款未发起 | PASS；未调整其规则 |
| H04 / BC05 | 001 系统确认早于实际入库，002 缺客服时间，003 阶段不明，004 属退款后续 | FAIL：Need Evidence / 不建任务已正确，但漏掉 001 冲突证据 | PASS：conflicting_evidence 包含 001，未解决证据包含 001/002/003 |

H02 修正增加当前任务状态与当前计划检查，区分事件 ID 去重和状态更新幂等。输出是动作意图，不是真实工具副作用；Completed / v2 状态由合成输入提供，未验证持久化。

H04 修正检查同一业务事实的三环节合成 ISO 时间顺序，反序 / 无法解析时保留待核验证据，不补全或改写输入。时间采用同一时区。不能把这种顺序检查推广成真实系统时钟、日志可信度或因果推断；本轮未测试跨系统时钟偏差和完整补证后的确认。

## 独立性审计

`audit.json` 明确保存来源、静态结构核查和限制。被测函数只有 operation / data 参数，目标代码无 T/H Test ID 分支、无 expected 读取。expected 仅进入运行后的比较。H 运行前后输入未被修改。

T 执行器按 T11 / T14 ID 选择两项对照实验；这只选择样本，不是目标规则按 ID 返回答案。对照实际运行后与同一 expected 比较，错误保存在新旧结果的 comparisons 中。

原规则使用 WH-201、RF-301、CI-001 场景常量，并非通用 ID 分配系统。fixtures、规则与预期同源；预设 intent / 来源有效 / 任务有效 / 业务阶段不由模型判断。没有外部标注真值，因此通过结果只表明输入条件下的规则符合产品预设。

原 T09 的 conflict 元数据写“文本相同”，实际四条文本不同；网页和指标以实际字段为准。保留原冻结文件，不借审计修改预期。原 expected 元数据“Human-authored”容易误读，实际是 Codex 依据人工产品要求编码，未经过独立专家标注。历史 hash 可以证明保存证据一致，不能单独证明 Round 1 的外部构建过程。

## 指标单位

`metrics.json` 逐项列出 ID / 动作检查 / Case 标签，`summarize.py` 从本轮初始与最终 actual 重新计算：

| 指标 | 最终 | 单位 |
| --- | --- | --- |
| 历史目标恢复 | 1/1 | T01 的适用恢复执行场景；被拒绝的 T07/H01 不进入该分母 |
| 危险提前执行 | 0/15 | 5 条前提不足场景 × 3 项禁止动作检查；不是 15 笔业务 |
| 重复建单 | 0/1 | T08 有可复用有效任务的查重判断；H03 无有效任务，不进入分母 |
| Waiting / 继续判断 | 6/6 | T03/04/05/11/13 与 H02 共 6 条状态组合；初始 H02 失败为 5/6 |
| 候选标签 | 12/12 | T09/T14/H04 × 4 次标签；四个 Case ID 被重复使用 |
| 缺证错误确认 / 建任务 | 0/8 | 四条缺证场景 × 2 项禁止动作检查 |
| 错误业务关联 | 0/6 | T01/07/08/12、H01/03 的关联 / 复用判断 |
| 重复状态更新 | 0/2 | H02 的完成与重规划两项动作机会；首次为 2/2 |
| 时间冲突识别 | 1/1 | H04 一次冲突证据检查；首次为 0/1 |

两项简化策略的错误单列，不并入目标指标。18 条最终 PASS 不组成 AI 综合准确率，复测也不制造新的独立业务样本。

未验证：真实 Agent/LLM、企业 API、实时工具、真实并行、自然语言/来源有效性识别、任务存储、跨进程恢复、生产去重、授权、发送消息、真实退款、完整因果证据审核与运营效果。

## 面试官反向质疑核对

| 追问 | 页面 / 证据给出的回答 |
| --- | --- |
| Agent 真跑起来了吗？ | 尚未；B05 标明规则级 Mock，5.1 给定字段边界，5.5 标明真实运行未完成 |
| PASS 是把答案写进去了吗？ | operation / data 独立生成 actual；expected 只在输出后比较。源码无 Test ID 目标分支；同源预设仍需人工审查 |
| 为什么原集都是 PASS？ | 冲突被正确拦截就是 PASS；新 H 集首次真失败两项；另外两项简化策略实际 FAIL，全部保留 |
| 业务价值是什么？ | 5.2 先给错误对象、提前执行、无效旧任务和 VOC 错误归因的冲突，5.3 解释业务后果与约束 |
| 指标代表真实效果吗？ | 5.4 明确场景 / 动作机会 / 标签单位，重复 Case 不变成新业务，不代表 LLM 或运营效果 |
| 测试究竟改变了什么？ | H02 增加状态更新幂等门槛；H04 增加冲突证据检查；下一轮先验证真实关系 / 状态路径、持久化事件和证据来源 |

仍需人工审查真值与时间定义、分母口径、同源测试的适用边界及页面阅读节奏。本轮不自动锁定 B05。
