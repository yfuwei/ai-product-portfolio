/* All records are synthetic design fixtures. No API requests are made. */
window.P2_MOCK = Object.freeze({
  appName:'企业服务工作台',
  caseId:'CASE-001', applicationId:'SIM-APP-001', applicationStatus:'Returned',
  service:'服务 A', region:'地区甲', returnReason:'授权书缺少签署日期',
  customerQuestion:'我已经按要求提交材料，为什么申请又被退回？',
  history:'客户曾咨询开通材料，并按当时获得的清单提交申请。此次只处理退回原因咨询。',
  businessSource:'Mock 申请系统 · 退回记录 BR-001', recordTime:'10:18（模拟）', updatedAt:'10:24（模拟）',
  knowledgeTitle:'服务 A 开通材料规范 v1.2', knowledgeSource:'Mock 服务规范 · 第 3 条',
  normalRule:'授权书应完整填写签署日期。适用于服务 A、地区甲；本次模拟适用版本为 v1.2。',
  exceptionRule:'渠道清单未说明签署日期要求；所检索清单的地区与版本仍待核实。',
  reply:'已核对 SIM-APP-001 的退回记录：授权书缺少签署日期。按适用材料规范，请补全签署日期，再通过申请平台的补件入口重新提交。本次说明不代表申请已通过，当前申请仍为 Returned。',
  steps:[['识别诉求','Business Query'],['访问条件','身份 / 范围已核验'],['申请查询','Returned'],['退回记录','缺少签署日期'],['按需知识','核对适用规范'],['处理建议','说明原因与补件步骤']],
  events:[
    {id:'CASE-002',signal:'SIG-002',scope:'服务 A / 地区甲',reason:'缺少签署日期',source:'渠道清单未注明日期项',condition:'发布渠道、版本待核查',kind:'关联线索'},
    {id:'CASE-003',signal:'SIG-003',scope:'服务 A / 地区甲',reason:'缺少签署日期',source:'客户依据某渠道清单',condition:'是否同源、同版待核查',kind:'候选关联'},
    {id:'CASE-004',signal:'—',scope:'服务 B / 地区乙',reason:'缺少资质附件',source:'另一类服务清单',condition:'适用条件不同，排除聚合',kind:'排除'},
    {id:'CASE-001',signal:'—',scope:'服务 A / 地区甲',reason:'缺少签署日期',source:'现行规范明确要求日期',condition:'正常缺件，不证明指引有误',kind:'对照'}
  ],
  issueId:'CI-001',issueTitle:'部分渠道材料清单可能遗漏签署日期要求',
  missingEvidence:['清单原始文件或截图','发布渠道与版本','客户实际使用时间','服务类型与地区适用条件'],
  taskId:'TASK-001',taskTitle:'核查并统一服务开通材料清单',
  taskSteps:['核对相关渠道清单、版本与发布记录','与有效服务规范比对','复核实际原因与影响范围','经授权修订已确认的差异','检查范围内渠道更新与旧入口','提交措施证据及后续观察计划']
});
