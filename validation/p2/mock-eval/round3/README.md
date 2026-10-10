# B05 Round 3｜最终证据审计

执行范围：现有 T01–T14、H01–H04 与 T11/T14 两项简化策略。没有新建样本，没有修改业务规则、输入、预期、判定程序或原始历史输出。只审计确定性 Python 规则，不是真实 Agent Runtime、LLM、企业 API 或生产效果验证。

## 本次实际执行

仓库根目录，Python 3.14.2。`commands.json` 保存每条完整命令、退出码、stdout、stderr 与结果绝对路径。

| 执行 | 结果 | 退出码 | 输出 |
| --- | --- | --- | --- |
| 当前规则 T 回归，含两项实际运行对照 | 14 PASS / 0 FAIL；对照 2 FAIL | 0 | [t-current.json](t-current.json) / [终端](t-current-terminal.txt) |
| 当前规则 H 复核 | 4 PASS / 0 FAIL | 0 | [h-current.json](h-current.json) / [终端](h-current-terminal.txt) |
| 保存的原规则复现 | H02/H04 FAIL，2 PASS / 2 FAIL | 1（预期） | [h-before-reproduced.json](h-before-reproduced.json) / [终端](h-before-reproduced-terminal.txt) |

实际入口：`python3 validation/p2/mock-eval/round3/audit.py`，退出码 0。此审计入口依次执行：

```sh
python3 validation/p2/mock-eval/run_eval.py --output round3/t-current.json --run-id round3-current-regression
python3 validation/p2/mock-eval/round2/run_h.py --output ../round3/h-current.json --run-id round3-current-recheck
python3 validation/p2/mock-eval/round2/run_h.py --rules rules-before.py --output ../round3/h-before-reproduced.json --run-id round3-saved-original-rule-reproduction
```

结果已保存；复现必须改用新的输出名。审计入口拒绝覆盖，H 执行器也拒绝覆盖历史。上述第三项是本轮复现，**不称作历史首次运行**。

## 首次失败与实际修改

原始首次证据仍为 [Round 2 h-initial.json](../round2/h-initial.json) 与 [首次终端](../round2/h-initial-terminal.txt)，修改前源码为 [rules-before.py](../round2/rules-before.py)。冻结输入 [h-fixtures.json](../round2/h-fixtures.json)、预期 [h-expected.json](../round2/h-expected.json)、摘要 [h-manifest.json](../round2/h-manifest.json) 全部保留。

[真实代码差异](../round2/rule-fix.diff) 已与修改前、当前源码重新生成的差异逐字比较。当前规则摘要 `67eca0723d11250beb00db0e20c0469f1b28c36d3f826d936e2eb27fdaa8170f`，原规则 `2199e9bd04e3bcc16928ec52c7cbbe8601726845a2a48ed03e513def01a07baa`。

[本轮 audit.json](audit.json) 每项 repairs 包含同样输入、预期、首次 actual、mismatches、forbidden、最终 actual 和 verdict；原规则复现的全部记录与保存的首次记录完全一致。本次当前 T/H 与 Round 2 最终记录也完全一致。

| 对象 | 首次实际 FAIL | 具体修正 | 同输入复测 PASS |
| --- | --- | --- | --- |
| H02 | 已 Completed / v2，动作却为 ignore_duplicate_event + complete_warehouse + plan_v2；核查请求已为 0 | warehouse_event 检查当前状态；非 Waiting 保留当前状态/计划；Waiting 且记录有效才完成，v2 不再次更新 | actions 仅 ignore_duplicate_event；Completed / v2 保留；重复完成与重规划均 0 |
| H04 | missing_evidence 仅 002/003，未返回 conflicting_evidence；遗漏 001 系统确认10:00早于入库11:00。标签、Need Evidence、禁止建任务已正确 | 检查同一事实 inbound ≤ system ≤ service；反序或无法解析列入 conflicts，待核证据包括冲突 | conflicting_evidence 为 001；missing_evidence 为 001/002/003；004 排除，CI Need Evidence，TASK 未创建 |

这些都是规则输出与动作意图，未证明实际数据库更新或工具副作用。H04 时间属于同一时区、同一事实的合成链；不证明真实日志可信度或共同根因。已有本地证据与原源码可重复核对，但没有外部签名执行时间证书，不能夸大独立审计程度。

## 独立性与真实性

被测 `evaluate(operation, data)` 不接收 ID 或 expected；actual 先由规则计算，后与 expected 比较。源码静态检查和执行器阅读未发现 T/H ID 答案分支、从预期复制输出或放宽预期。T 执行器中的 T11/T14 ID 只选择两项对照输入。18 条目标与 2 条对照均实际执行。

规则、输入与预期基于同一产品要求、由 Codex 编码；H 构建时已阅读原规则，**不是外部盲测或独立专家标注**。来源有效、业务阶段、意图与任务有效性为给定字段；WH-201/RF-301/CI-001 为场景常量，非通用分配系统；VOC 规则不实现完整根因确认。判定只比较预期列出的字段和禁止动作，不是完整契约 schema 检验。

原 expected 的“Human-authored”元信息应理解为依据人工要求编码；T09 的“文本相同”元信息与实际不同投诉字段不一致。本轮保留冻结字节，明确披露，不借修正标签获得通过。保存的摘要可以证明文件一致，不能证明外部独立的构建顺序。

## 最终指标重算

[metrics.json](metrics.json) 使用本轮 `t-current.json` 与 `h-current.json`，调用现有 `round2/summarize.py:calculate`，没有调用会改写 Round 2 的 main。九项结果、单位与明细均与原最终指标相同，未混入首次失败或简化策略错误。

| 指标 | 分子/分母 | 单位与适用来源 |
| --- | --- | --- |
| 历史目标恢复 | 1/1 正确 | T01 适用恢复执行场景；T07/H01 关联关口拒绝，归入关联检查 |
| 危险提前执行 | 0/15 错误 | T02/03/04/11/13 五场景 × complete_warehouse / plan_v2 / create_refund_task 三个禁止动作机会 |
| 重复任务创建 | 0/1 错误 | T08 有有效可复用任务的一次判断；H03 无有效旧任务，不进入该分母 |
| Waiting / 继续判断 | 6/6 正确 | T03/04/05/11/13、H02 六条状态组合的预设整体判定；非六次真实恢复 |
| VOC 标签 | 12/12 正确 | T09/T14/H04 × 四次标签判断；同四个 Case ID 重复使用，非12独立Case |
| 缺证错误确认/建任务 | 0/8 错误 | T09/10/14、H04 四场景 × root_confirmed / task_created 两项禁止结论/动作机会 |
| 错误业务关联 | 0/6 错误 | T01/07/08/12、H01/03 六次关联/复用判断；实际输出的对象与当前RET比较 |
| 重复完成/重规划 | 0/2 错误 | H02 complete_warehouse / plan_v2 两项动作机会；首次2/2，最终0/2 |
| 时间冲突纳入核验 | 1/1 正确 | H04 001列入conflicts且待核验的一次判断；首次0/1，最终1/1 |

仅验证合成输入下的确定性规则、状态与禁止动作。未验证真实语言理解、真实 Agent/LLM、并行、企业 API、存储、重启与并发幂等、权限、客户消息、实际退款或 VOC 运营改善。18条PASS不合并为AI综合准确率。

网页变更仅限 5.2–5.5 和 B05局部标签宽度；5.1保留。完整浏览器回归与改动范围证据见本轮交付报告。等待人工审查，本轮不自动锁定、Commit 或 Push。
