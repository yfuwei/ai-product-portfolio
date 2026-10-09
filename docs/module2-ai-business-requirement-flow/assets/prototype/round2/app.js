/* Static view templates. Navigation is implemented; business actions are design-only. */
(() => {
  const d = window.P2SupportMock;
  const paths = {
    message: '<path d="M21 11.5a8.5 8.5 0 0 1-12.3 7.6L3 21l1.9-5.7A8.5 8.5 0 1 1 21 11.5Z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.1 0l3-3a5 5 0 0 0-7.1-7.1l-1.7 1.7M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/>',
    search: '<circle cx="10.5" cy="10.5" r="7.5"/><path d="m16 16 5 5"/>',
    'git-branch': '<circle cx="6" cy="5" r="3"/><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M6 8v8m12-8a11 11 0 0 1-12 8"/>',
    'pause-circle': '<circle cx="12" cy="12" r="9"/><path d="M9 8v8m6-8v8"/>',
    'refresh-cw': '<path d="M20 8a8 8 0 0 0-13-3L4 8m0-5v5h5M4 16a8 8 0 0 0 13 3l3-3m-5 0h5v5"/>',
    'check-circle': '<circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/>',
    'arrow-right-circle': '<circle cx="12" cy="12" r="9"/><path d="M7 12h10m-4-4 4 4-4 4"/>',
    exclude: '<circle cx="12" cy="12" r="9"/><path d="m8 8 8 8m0-8-8 8"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
  };
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const icon = name => `<svg class="icon" data-icon="${name}" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
  const badge = (text, tone='active') => `<span class="badge" data-state="${tone==='neutral'?'inactive':tone}">${escape(text)}</span>`;
  function conversation() {
    const c=d.conversation;
    return `<div class="service-session-workspace">
      <aside class="session-history" id="conversation-records" aria-labelledby="history-title"><header><h2 id="history-title">会话记录</h2><span>3 条</span></header><ol>${c.sessions.map((h,n)=>`<li class="${n===2?'selected':''}"><header><h3>${escape(h.title)}</h3><span class="session-day">${escape(h.day)}</span></header><p>${escape(h.summary)}</p><div class="session-record-meta">${n===1?`<a class="promise-reference" href="#associated-promise">${icon('link')}已关联核查承诺</a>`:`<span class="session-tag">${n===2?'当前选中':'历史咨询'}</span>`}<small>${escape(h.id)}</small></div></li>`).join('')}</ol><footer>关联业务<br><strong>同一笔退货退款</strong><small>RET-001</small></footer></aside>
      <section class="current-session" aria-labelledby="conversation-title">
        <header class="current-session-toolbar"><div><h2 id="conversation-title">退款进展催问</h2>${badge('处理中')}</div><p>周五 · 当前咨询 <a href="#conversation-records">查看历史记录</a></p></header>
        <div class="live-conversation"><div class="live-customer"><small>客户 · 当前咨询</small><div><p>${escape(c.question)}</p><span class="customer-avatar">客</span></div></div>
          <a class="system-link" href="#associated-promise">${icon('link')}已关联周三客服核查承诺。</a><blockquote class="promise-excerpt" id="associated-promise"><p>“帮您安排仓库核查。”</p><footer>周三 · CONV-002</footer></blockquote>
          <section class="pending-service-item" aria-labelledby="pending-service-title"><header>${icon('pause-circle')}<h3 id="pending-service-title">仓库核查 · 待续办</h3>${badge('待安排','waiting')}</header><p>此前承诺已关联，尚无可追踪的有效核查任务。</p></section>
        </div>
        <section class="reply-composer"><header>${icon('message')}<h3>AI 回复建议</h3>${badge('尚未发送','inactive')}</header><textarea readonly aria-label="AI 回复建议，尚未发送">${escape(c.draft)}</textarea><footer><span>客服确认后发送。</span><button disabled>发送 ${icon('arrow-right-circle')}</button></footer></section>
      </section>
      <aside class="continuation-assistant" aria-labelledby="assistant-title"><header class="assistant-toolbar"><h2 id="assistant-title">${icon('link')}AI 续办助手</h2><span class="meta">当前事项</span></header><div class="assistant-task"><h3>接续上次未完成的仓库核查</h3>${badge('待移交 Agent')}</div>
        <ol class="ai-recovery-records" aria-label="AI 历史服务任务恢复记录">
          <li class="ai-recovery-entry" data-state="success"><span class="recovery-marker">${icon('link')}</span><div class="recovery-entry-content"><header><h4>01 · 找回历史承诺</h4><span class="promise-linked">${icon('check-circle')}已关联</span></header><blockquote class="recovered-promise"><p>“帮您安排仓库核查。”</p><footer><span>来源：周三 · CONV-002</span><span>关联：同一笔退货 RET-001</span></footer></blockquote></div></li>
          <li class="ai-recovery-entry" data-state="risk"><span class="recovery-marker"><i class="event-dot"></i></span><div class="recovery-entry-content"><header><h4>02 · 发现续办缺口</h4></header><div class="recovery-gap"><strong>未找到可继续追踪的仓库核查任务</strong><p>此前已有核查承诺，但没有找到有效的关联任务记录。</p></div></div></li>
          <li class="ai-recovery-entry" data-state="active"><span class="recovery-marker">${icon('refresh-cw')}</span><div class="recovery-entry-content"><header><h4>03 · 恢复服务任务</h4></header><div class="recovered-service-goal"><h5>继续核实这笔退货的实际入库情况</h5><p>根据仓库核查结果，再推进退款处理。</p></div></div></li>
          <li class="ai-recovery-entry" data-state="active"><span class="recovery-marker">${icon('arrow-right-circle')}</span><div class="recovery-entry-content recovery-handoff"><header><h4>04 · 接续执行</h4></header><p>交给 Service Orchestrator，安排仓库核查并查询退款状态。</p><button class="primary-button" disabled>交给 Agent 任务 ${icon('arrow-right-circle')}</button><div class="recovery-record-actions"><a href="#associated-promise">查看关联记录 ${icon('link')}</a><small>拟议操作 · 静态原型</small></div></div></li>
        </ol>
        <section class="assistant-facts"><header><h3>当前业务事实</h3><span class="meta">初始快照</span></header><div class="business-status-strip">${c.facts.map(f=>`<div data-state="${f.tone}">${icon(f.icon)}<span>${escape(f.name)}</span><strong>${escape(f.value)}</strong><small>${escape(f.code)}</small></div>`).join('')}</div></section>
      </aside>
    </div>`;
  }

  function execution() {
    const e=d.execution;
    return `<div class="agent-execution-workspace">
      <section class="execution-track" aria-label="Agent 任务执行轨道">
        <header class="track-toolbar"><h2>任务执行轨道</h2><span class="view-tab">执行历史</span><span class="meta">主场景 · Mock</span><span class="track-legend"><i class="event-dot"></i>业务事件</span></header>
        <ol class="execution-timeline">
          <li class="track-step dispatch-step history-complete" data-state="success"><span class="track-marker">${icon('git-branch')}</span><div class="track-content">
            <header class="step-heading"><h3>Plan v1 · 并行查询记录</h3><span>Service Orchestrator · 历史阶段</span></header>
            <div class="parallel-connector" aria-hidden="true"></div>
            <div class="agent-lanes">
              <article class="agent-lane"><header><span class="agent-letter">W</span><div><h4>核实仓库收货</h4><small>Warehouse Agent</small></div>${badge("已核查完成","success")}</header><p class="tool-line">${icon('search')}物流 / 仓库 / 已有任务查询</p><p>未找到有效任务 → 创建 WH-201 → 等待</p><footer class="state-success">${icon('check-circle')}后续取得入库记录 · WH-201 已完成</footer></article>
              <article class="agent-lane"><header><span class="agent-letter">R</span><div><h4>查询退款处理情况</h4><small>Refund Agent</small></div>${badge("查询已完成","success")}</header><p class="tool-line">${icon('search')}退款记录 / 已有退款任务查询</p><p>当时：退款未发起 · 仓库尚未确认收货</p><footer class="state-active">${icon('arrow-right-circle')}Plan v2 已接续 → RF-301 Started</footer></article>
            </div>
          </div></li>
          <li class="track-step waiting-step history-complete" data-state="waiting"><span class="track-marker">${icon('pause-circle')}</span><div class="track-content status-ribbon"><strong>Waiting · WH-201</strong><span>当时等待仓库反馈，保留任务上下文。</span><small>此前等待 · 已结束</small></div></li>
          <li class="track-step event-step history-complete" data-state="risk"><span class="track-marker event-marker"><i class="event-dot"></i></span><div class="track-content compact-step"><strong>仓库反馈：商品已验收入库</strong><span>已到达事件 · 关联 WH-201</span><small>待 Agent 核实 → 下一节点</small></div></li>
          <li class="track-step verified-step history-complete" data-state="success"><span class="track-marker">${icon('check-circle')}</span><div class="track-content compact-step"><strong>取得有效入库记录，完成仓库核查</strong><span>Warehouse Agent · 已核实收货</span><small>WH-201 · 核查完成</small></div></li>
          <li class="track-step replan-step history-complete" data-state="active"><span class="track-marker">${icon('refresh-cw')}</span><div class="track-content plan-focus"><header><span class="eyebrow">Service Orchestrator · Plan v1 → Plan v2</span><span class="plan-adopted">已采用 · 收货结果已核实</span></header><h3>${escape(e.planTitle)}</h3><div class="plan-diff"><div><small>Plan v1 · 历史阶段</small><strong>核实仓库收货</strong><span>WH-201 · Waiting</span></div>${icon('arrow-right-circle')}<div><small>Plan v2 · 已采用</small><strong>推进退款异常处理</strong><span>Refund Agent · Follow-up</span></div></div></div></li>
          <li class="track-step continuation-step" data-state="active"><span class="track-marker">${icon('arrow-right-circle')}</span><div class="track-content followup-row"><div><span class="eyebrow">当前任务 · Refund Agent</span><h3>退款异常续办已启动</h3><p>复查完成：退款未发起，无有效既有任务 → 创建 RF-301</p><small class="next-followup">下一步：持续跟踪处理结果</small></div><a class="selected-task" href="#selected-task">RF-301 · 已启动<span>Started ${icon('arrow-right-circle')}</span></a></div></li>
        </ol>
      </section>
      <aside class="task-inspector" id="selected-task" aria-labelledby="selected-task-title">
        <header class="inspector-heading"><h2>当前任务详情</h2><span class="meta">已选中</span></header><span class="object-label">RF-301 · 退款异常处理</span><h3 id="selected-task-title">退款异常处理</h3>${badge('Started · 异常处理已启动')}
        <dl class="inspector-fields"><div class="object-fields"><div><dt>所属 Case</dt><dd>CASE-001</dd></div><div><dt>业务对象</dt><dd>RET-001</dd></div></div><div><dt>计划来源</dt><dd>Service Orchestrator · Plan v2</dd></div><div><dt>触发依据</dt><dd>WH-201 核查完成，<br>已取得有效入库记录。</dd></div></dl>
        <div class="refund-state"><div data-state="inactive"><span>实际退款</span><strong>尚未发起</strong><small>Not Initiated</small></div><div data-state="waiting"><span>退款到账</span><strong>待确认</strong><small>Pending Confirmation</small></div></div>
        <section class="progress-message"><header>${icon('message')}<h4>客户进展 · 待发送预览</h4></header><p>您的退货已确认入库，退款异常处理已启动。我们将继续跟进，到账结果尚待确认。</p><small>Mock 消息预览 · 非真实发送记录</small></section>
        <div class="inspector-actions"><button disabled>查看关联证据 ${icon('link')}</button><button disabled>查看任务记录 ${icon('arrow-right-circle')}</button><small>拟议入口 · 静态原型</small></div>
      </aside>
    </div>`;
  }

  function insights() {
    const i=d.insights;
    const informationIcon='<svg class="icon" data-icon="info" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7v.5"/></svg>';
    return `<div class="case-investigation-workspace">
      <section class="investigation-main" aria-labelledby="comparison-title">
        <header class="investigation-toolbar"><h2 id="comparison-title">跨 Case 问题排查</h2><span class="meta">4 条服务记录 · Mock 集合</span></header>
        <div class="comparison-filters" aria-label="当前分析范围"><span class="selected">全部记录 <b>4</b></span><span>候选关联 <b>3</b></span><span>已排除 <b>1</b></span><small>当前选中：CASE-001</small></div>
        <table class="case-comparison" id="case-comparison"><caption class="sr-only">四条模拟服务记录的收货相关证据对照</caption><colgroup><col class="case-col"><col class="question-col"><col class="record-col"><col class="blockage-col"><col class="decision-col"></colgroup><thead><tr><th>Case</th><th>客户主要问题</th><th>收货相关记录</th><th>业务卡点</th><th>关联判断</th></tr></thead><tbody>${i.cases.map((c,n)=>`<tr class="${n===0?'selected ':''}${c.excluded?'excluded':''}" data-state="${c.excluded?'inactive':n===2?'waiting':'active'}"><th scope="row">${escape(c.id)}</th><td>${escape(c.question)}</td><td>${escape(c.receipt)}</td><td>${escape(c.blockage)}</td><td><span class="case-decision">${icon(c.excluded?'exclude':n===2?'clock':'link')}${c.excluded?'排除':'候选关联'}</span>${n===2?'<small class="pending-check">待核实</small>':''}</td></tr>`).join('')}</tbody></table>
        <section class="investigation-candidate"><header>${icon('link')}<h3>仓库收货确认信息可能存在滞后</h3>${badge('CI-001 · Need Evidence','waiting')}</header><p>三条 Case 存在可比较的业务卡点，尚不能证明由同一原因导致。</p></section>
        <section class="cross-case-evidence" id="evidence-review" aria-labelledby="matrix-title"><header><h3 id="matrix-title">跨 Case 业务证据对照</h3><span>3 条候选 Case · 待补证</span></header><p class="matrix-description">对照实际入库、系统确认与客服可见的记录，检查信息是否在业务环节之间出现滞后。</p>
          <ol class="evidence-stage-guide" aria-label="业务信息传递顺序"><li>${icon('clock')}<span>01 实际入库</span></li><li>${icon('clock')}<span>02 系统确认</span></li><li>${icon('clock')}<span>03 客服可见</span></li></ol>
          <table class="business-evidence-matrix"><caption class="sr-only">三个候选 Case 的已知业务记录与待补时间证据；不包含已排除 CASE-004</caption><colgroup><col class="matrix-case-col"><col><col><col></colgroup><thead><tr><th>Case</th><th>实际入库记录</th><th>系统确认记录</th><th>客服可见状态</th></tr></thead><tbody>${i.evidenceMatrix.map((r,n)=>`<tr class="${n===0?'selected':''}"><th scope="row">${escape(r.id)}</th>${r.cells.map(c=>`<td><div class="evidence-cell-main" data-state="${c.state}">${c.icon==='info'?informationIcon:icon(c.icon)}<span>${escape(c.primary)}</span></div><small class="evidence-cell-detail" data-state="${c.secondaryState}">${c.secondaryState==='waiting'?icon('clock'):''}${escape(c.secondary)}</small></td>`).join('')}</tr>`).join('')}</tbody></table>
          <section class="ai-investigation-direction"><header>${icon('search')}<h4>AI 提出的调查方向</h4></header><p>实际入库、系统确认和客服可见之间，是否存在状态更新或信息同步滞后？</p>${badge('CI-001 · Need Evidence','waiting')}</section>
        </section>
      </section>
      <aside class="issue-detail-inspector" aria-labelledby="issue-detail-title"><header><h2 id="issue-detail-title">候选问题详情</h2><span class="meta">当前选中</span></header>
        <section class="issue-current-object"><span class="object-label">CI-001 · 当前候选问题</span><h3>${escape(i.candidate)}</h3>${badge('Need Evidence','waiting')}</section>
        <section class="issue-record-scope"><h4>关联与排除</h4><dl class="issue-detail-fields"><div><dt>关联记录</dt><dd>CASE-001 / 002 / 003</dd></div><div><dt>排除记录</dt><dd class="excluded-record">${icon('exclude')}CASE-004</dd></div><div><dt>排除原因</dt><dd>问题发生在退款后续环节。</dd></div><div class="matrix-evidence-gap"><dt>待补证</dt><dd>待核实实际入库、系统确认及客服可见记录的时间信息。</dd></div></dl><a class="issue-evidence-link" href="#evidence-review">查看待核实证据 ${icon('arrow-right-circle')}</a></section>
        <section class="conditional-task-preview"><header><span>TASK-001 · 条件预览</span>${badge('尚未创建','inactive')}</header><h4>${escape(i.taskTitle)}</h4><div><span>创建前提</span><p>CI-001 补齐证据，并经业务负责人确认。</p></div><footer>${icon('clock')}待补证确认 · 尚未触发</footer></section>
      </aside>
    </div>`;
  }

  const requested=new URLSearchParams(location.search).get('view');
  const view=Object.hasOwn(d.views,requested)?requested:'conversation';
  const v=d.views[view];
  const statuses=view==='conversation'?badge('待续办 / 任务已恢复'):view==='execution'?`${badge(d.execution.status)}<span class="pending-inline">${icon('clock')}${d.execution.pending}</span>`:badge(`${d.issueId} · ${d.insights.status}`,'waiting');
  document.title=`${v.nav} · ${d.product} · Mock`;
  document.getElementById('support-app').innerHTML=`
    <header class="product-topbar"><a class="product-brand" href="?view=conversation"><span class="brand-symbol">${icon('link')}</span>${d.product}</a><div class="page-location"><span>工作空间</span><b>/</b><strong>${v.nav}</strong></div><div class="topbar-context"><span class="mock-label">MOCK · 产品设计原型</span><span class="role-avatar">${v.role.slice(0,1)}</span><span>${v.role} · 模拟角色</span></div></header>
    <aside class="product-sidebar"><p class="nav-eyebrow">服务工作空间</p><nav aria-label="工作视图">${Object.entries(d.views).map(([key,val])=>`<a href="?view=${key}" ${key===view?'aria-current="page"':''}>${icon(val.icon)}<span>${val.nav}</span>${key===view?'<span class="nav-current-dot"></span>':''}</a>`).join('')}</nav><div class="sidebar-context"><span>当前业务切片</span><strong>退货退款 · 重复催办</strong><p>业务对象 RET-001<br>服务记录 CASE-001</p></div><div class="sidebar-footer">${icon('clock')}<span>设计工作空间<br><small>无真实业务连接</small></span></div></aside>
    <main class="workspace view-${view}"><header class="workspace-title"><div><p class="snapshot-label">${escape(v.snapshot)}</p><h1>${escape(v.title)}</h1><p class="object-meta">${d.caseId} · ${d.returnId}${view==='conversation'?' · 周五第三次咨询':view==='insights'?' · 多笔独立 Mock Case':''}</p></div><div class="current-status">${statuses}</div></header>${({conversation,execution,insights}[view])()}</main>
    <footer class="product-footer"><span>产品设计模拟 · 三个视图为不同阶段的独立快照</span><span>静态界面 · 业务操作未执行 · 未接入企业系统</span></footer>`;
})();
