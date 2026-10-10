/* Three independent design snapshots. No runtime, API calls or state mutation. */
window.P2SupportMock = {
  product: '售后服务工作台',
  caseId: 'CASE-001', returnId: 'RET-001',
  warehouseTask: 'WH-201', refundTask: 'RF-301', issueId: 'CI-001', improvementTask: 'TASK-001',
  views: {
    conversation: { nav: '服务会话', title: '退款重复催办 · 恢复待续办任务', role: '一线客服', snapshot: '当前会话 · CONV-003', icon: 'message' },
    execution: { nav: 'Agent 任务', title: '退款续办任务 · Agent 执行进展', role: '服务跟踪', snapshot: '任务跟进 · CASE-001 / RET-001', icon: 'git-branch' },
    insights: { nav: '问题洞察', title: '退款催办中的重复服务卡点', role: '客服运营', snapshot: 'VOC 问题排查 · 当前候选 CI-001', icon: 'search' }
  },
  conversation: {
    sessions: [
      { day: '周一', id: 'CONV-001', title: '退款周期咨询', summary: '退货寄回后多久能退款？' },
      { day: '周三', id: 'CONV-002', title: '签收后未退款', summary: '物流显示签收，为什么还没退款？' },
      { day: '周五', id: 'CONV-003', title: '追问核查进展', summary: '上次说帮我查仓库，现在怎么还没消息？' }
    ],
    question: '上次不是说帮我去仓库查吗？现在怎么还是没消息？',
    serviceClue: '重复催问 · 仓库确认待核 · 核查任务无有效记录',
    history: [
      { day: '周一', id: 'CONV-001', title: '询问退货退款周期', text: '退货寄回去后一般多久退款？' },
      { day: '周三', id: 'CONV-002', title: '签收后仍未退款', text: '物流显示签收了，怎么还没退款？', promise: '帮您安排仓库核查' },
      { day: '周五', id: 'CONV-003', title: '追问上次的核查进展', text: '当前咨询指向此前承诺的未完成事项。' }
    ],
    draft: '我已找到上次的仓库核查事项，会继续核实退货收货情况，再跟进退款处理进展。',
    recovered: '找回上次没完成的仓库核查',
    goal: '核实退货是否实际入库，再根据核查结果推进退款。',
    gap: '尚未找到可关联的有效仓库核查任务。',
    next: '交由 Service Orchestrator 安排仓库核查与退款状态核对。',
    facts: [
      { name: '物流', value: '已投递', code: 'Delivered', source: '物流投递记录', icon: 'check-circle', tone: 'success' },
      { name: '仓库', value: '尚未确认收货', code: 'Not Confirmed', source: '当前仓库状态', icon: 'pause-circle', tone: 'waiting' },
      { name: '退款', value: '尚未发起', code: 'Not Initiated', source: '当前退款记录', icon: 'clock', tone: 'inactive' }
    ],
    references: [ ['退货业务对象', 'RET-001'], ['历史与当前会话', 'CONV-001 / 002 / 003'], ['周三处理承诺', '安排仓库核查'], ['有效仓库核查任务', '未找到'] ]
  },
  execution: {
    status: '退款异常处理已启动', pending: '退款结果待跟踪',
    warehouse: {
      title: '核查仓库收货', goal: '确认这笔退货是否已经实际入库。',
      steps: ['查询物流与仓库记录', '检查已有仓库核查任务', '无有效任务，创建 WH-201', '等待仓库反馈，保留上下文'],
      result: '后续取得有效入库记录', status: 'WH-201 · 核查完成'
    },
    refund: {
      title: '核对退款处理',
      initial: '查询退款记录：尚未发起；仓库尚未确认时，暂不进入退款异常续办。',
      reassigned: '收到已确认收货的结果后，重新核对退款状态与既有处理任务。',
      result: '主场景无有效既有任务，创建 RF-301。', status: 'RF-301 · 已启动'
    },
    wait: '等待仓库核查结果，任务上下文已保留。',
    event: '仓库反馈已到达', eventNote: '关联 WH-201，作为恢复线索',
    verified: 'Warehouse Agent 已核实有效入库记录', verifiedNote: '仓库收货确认 · WH-201 核查完成',
    planTitle: '有效入库已核实，更新至 Plan v2',
    plans: [ { id: 'Plan v1', title: '核实仓库收货', detail: 'WH-201 · Waiting（此前）' }, { id: 'Plan v2', title: '推进退款异常处理', detail: 'Refund Agent · 检查既有任务并续办' } ],
    facts: [
      { name: '仓库收货', value: '已取得有效入库记录', code: '已核实', icon: 'check-circle' },
      { name: '仓库核查', value: 'WH-201 · Completed', code: '核查完成', icon: 'check-circle' },
      { name: '退款', value: 'Not Initiated', code: '退款尚未发起', icon: 'clock' },
      { name: '退款异常任务', value: 'RF-301 · Started', code: '异常处理已启动', icon: 'arrow-right-circle' }
    ],
    customerUpdate: '您的退货已确认入库，退款异常处理已启动。我们将继续跟进，到账结果尚待确认。'
  },
  insights: {
    selectedSource: 'CONV-002 历史承诺 · WH-201 核查结果 · RF-301 任务进展',
    evidenceMatrix: [
      {
        "id": "CASE-001",
        "cells": [
          {
            "primary": "事后取得有效入库记录",
            "secondary": "入库时间待核实",
            "state": "success",
            "icon": "check-circle",
            "secondaryState": "waiting"
          },
          {
            "primary": "确认时间待核实",
            "secondary": "系统确认记录待核对",
            "state": "waiting",
            "icon": "clock",
            "secondaryState": "inactive"
          },
          {
            "primary": "当时未确认",
            "secondary": "更新时间待核实",
            "state": "partial",
            "icon": "info",
            "secondaryState": "waiting"
          }
        ]
      },
      {
        "id": "CASE-002",
        "cells": [
          {
            "primary": "已有入库记录",
            "secondary": "入库时间待核实",
            "state": "success",
            "icon": "check-circle",
            "secondaryState": "waiting"
          },
          {
            "primary": "确认时间待核实",
            "secondary": "系统确认记录待核对",
            "state": "waiting",
            "icon": "clock",
            "secondaryState": "inactive"
          },
          {
            "primary": "查询时未确认",
            "secondary": "可见状态时间待核实",
            "state": "partial",
            "icon": "info",
            "secondaryState": "waiting"
          }
        ]
      },
      {
        "id": "CASE-003",
        "cells": [
          {
            "primary": "入库时间记录待补",
            "secondary": "缺少完整时间证据",
            "state": "waiting",
            "icon": "clock",
            "secondaryState": "waiting"
          },
          {
            "primary": "状态更新时间待核实",
            "secondary": "系统确认记录待核对",
            "state": "waiting",
            "icon": "clock",
            "secondaryState": "inactive"
          },
          {
            "primary": "查询时间及状态待补",
            "secondary": "客服查询证据待补",
            "state": "waiting",
            "icon": "clock",
            "secondaryState": "waiting"
          }
        ]
      }
    ],
    candidate: '仓库确认与客服可见信息可能存在时序差异',
    commonPoint: '可能集中在退货收货确认环节',
    status: 'Need Evidence',
    cases: [
      { id: 'CASE-001', title: '三次催退款', text: '咨询时仓库未确认收货', question: '三次催问，追查上次承诺的仓库核查。', receipt: '咨询时仓库未确认收货；后续核查取得有效入库记录。', blockage: '仓库确认信息可能不及时', decision: '候选关联' },
      { id: 'CASE-002', title: '已有入库记录', text: '客服查询时仍未确认', question: '已有入库记录，客服咨询时仍未确认。', receipt: '已有入库记录，客服当时未见确认；时间差待核实。', blockage: '具体时间差待核实', decision: '候选关联' },
      { id: 'CASE-003', title: '重复催办', text: '关键时间记录不足', question: '重复催办，关键更新时间记录不足。', receipt: '状态更新与查询时间记录不足；同一业务环节待核验。', blockage: '关键时间记录待补齐', decision: '待核验候选' },
      { id: 'CASE-004', title: '仓库已确认', text: '卡点位于退款后续环节', question: '仓库已确认收货，但退款未到账。', receipt: '已确认收货，卡点位于退款后续处理。', blockage: '退款后续环节', decision: '排除', excluded: true }
    ],
    evidence: [
      { title: '实际入库时间', source: '仓储 / 履约入库记录' },
      { title: '仓库系统确认时间', source: '仓库确认状态与更新时间' },
      { title: '客服可见确认状态的时间', source: '客服查询或状态同步记录' }
    ],
    taskTitle: '待核查仓库收货确认延迟，追踪核查进展。',
    taskCondition: 'CI-001 补证并经业务负责人确认。'
  }
};
