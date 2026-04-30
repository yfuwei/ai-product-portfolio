const projectCards = document.querySelector("#project-cards");
const aigcDemo = document.querySelector("#aigc-demo");
const ragDemo = document.querySelector("#rag-demo");
const workflowDemo = document.querySelector("#workflow-demo");
const localRagDemo = document.querySelector("#local-rag-demo");

let activeAigcId = null;
let activeRagId = null;
let activeWorkflowIndex = 0;
let activeShowDraft = false;
let data = getPortfolioData();

function getPortfolioData() {
  return window.PortfolioI18n?.getData(window.portfolioData, window.portfolioDataEn) ?? window.portfolioData;
}

function labels() {
  const en = window.PortfolioI18n?.lang === "en";
  return {
    projectLinkFeatured: en ? "View featured case" : "查看重点项目",
    projectLink: en ? "View case" : "查看项目",
    aigcFlow: en ? ["Structured input", "Prompt template", "Multi-version generation", "Human review"] : ["结构化输入", "Prompt模板", "多版本生成", "人工筛选"],
    aigcChoose: en ? "Choose a visual scenario" : "选择一个出图场景",
    promptTitle: en ? "Structured prompt" : "生成结构化Prompt",
    negative: en ? "Negative constraints: " : "负向约束：",
    usability: en ? "Usability score" : "可用性评分",
    boundary: en ? "Boundary judgment" : "边界判断",
    sources: en ? "Knowledge base" : "资料库",
    presetQuestions: en ? "Preset questions" : "预设问题",
    answerCitations: en ? "Answer and citations" : "答案与引用",
    userQuestion: en ? "User question" : "用户问题",
    retrieved: en ? "Retrieved evidence" : "召回片段",
    answer: en ? "Generated answer" : "生成答案",
    citations: en ? "Sources" : "引用来源",
    collapseDraft: en ? "Hide draft" : "收起汇报初稿",
    generateDraft: en ? "Generate draft" : "生成汇报初稿",
    editableDraft: en ? "Editable draft" : "可编辑初稿",
    fullCase: en ? "View full case" : "查看完整项目案例",
    workflowStatus: en ? "Workflow status" : "流程状态",
    owner: en ? "Owner" : "负责角色",
    action: en ? "Key action" : "关键动作",
    outcome: en ? "Outcome" : "流程结果",
    branch: en ? "Exception branch" : "异常分支",
    modules: en ? "Four core modules" : "四个核心模块",
    validation: en ? "Validation results" : "验证结果",
    localFeature: en ? "Project 01 · Featured Case" : "Project 01 · Featured Case",
    localTitle: en ? "Local Knowledge Assistant: RAG to Agentic RAG" : "本地知识助手（RAG → Agentic RAG）",
    localIntro: en
      ? "This project starts from a real knowledge-work scenario. V1 solves retrieval and source-grounded answers with local RAG; V2 adds Router, Tool Calling, and Memory so the system can become a task-aware entry point."
      : "这个项目从真实知识管理场景出发：V1 先解决“资料找得回、答案有依据”的本地 RAG 问题；V2 再增加 Router、Tool Calling 和 Memory，把系统从“信息检索工具”升级为“任务执行入口”。",
    openFull: en ? "Open full case page" : "打开完整项目案例页",
    upgradeTitle: en ? "Why upgrade from RAG to Agent" : "为什么从 RAG 升级到 Agent",
    modulesTitle: en ? "Four core Agent modules" : "Agent 四个核心模块",
    decisionsTitle: en ? "Key design decisions" : "关键设计判断",
    traditionalVs: en ? "Traditional workflow vs this system" : "传统方式 vs 本系统",
    traditional: en ? "Traditional: " : "传统：",
    thisSystem: en ? "This system: " : "本系统：",
    limitsTitle: en ? "Current limitations" : "当前边界",
    screenshotAltSuffix: en ? " screenshot" : "界面截图",
  };
}

function renderProjectCards() {
  const { projects } = data;
  const copy = labels();
  projectCards.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card ${project.level === "featured" ? "featured-card" : ""}">
          ${
            project.image
              ? `
                <a class="project-card-media" href="${project.link}">
                  <img src="${project.image}" alt="${project.title}${copy.screenshotAltSuffix}" />
                </a>
              `
              : ""
          }
          <div class="project-card-copy">
            <p class="card-kicker">${project.accent}</p>
            <h3>${project.title}</h3>
            <p class="card-subtitle">${project.subtitle}</p>
            <div class="card-facts">
              <span>${project.problem}</span>
              <strong>${project.result}</strong>
            </div>
            <a href="${project.link}" class="text-link">${project.level === "featured" ? copy.projectLinkFeatured : copy.projectLink}</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAigcDemo(selectedId = activeAigcId || data.aigcCases[0].id) {
  const { aigcCases } = data;
  const copy = labels();
  const selected = aigcCases.find((item) => item.id === selectedId) ?? aigcCases[0];
  activeAigcId = selected.id;

  aigcDemo.innerHTML = `
    <div class="demo-panel">
      <div class="mini-flow">
        ${copy.aigcFlow.map((item) => `<span>${item}</span>`).join("")}
      </div>
      <h3>${copy.aigcChoose}</h3>
      <p class="demo-summary">${selected.brief}</p>
      <div class="choice-list">
        ${aigcCases
          .map(
            (item) => `
              <button class="choice-button ${item.id === selected.id ? "active" : ""}" data-aigc-id="${item.id}">
                ${item.label}
              </button>
            `
          )
          .join("")}
      </div>
      <div class="field-list">
        ${Object.entries(selected.fields)
          .map(
            ([key, value]) => `
              <div>
                <span>${fieldLabel(key)}</span>
                <strong>${value}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel">
      <h3>${copy.promptTitle}</h3>
      <p class="prompt-box">${selected.prompt}</p>
      <p class="negative-box">${copy.negative}${selected.negative}</p>
      <div class="candidate-grid">
        ${selected.candidates
          .map(
            (candidate) => `
              <article class="candidate-card">
                <span>${candidate.label}</span>
                <strong>${candidate.tag}</strong>
                <p>${candidate.note}</p>
              </article>
            `
          )
          .join("")}
      </div>
      <div class="result-row">
        <span>${copy.usability}</span>
        <strong>${selected.score}</strong>
      </div>
      <div class="result-row">
        <span>${copy.boundary}</span>
        <strong>${selected.boundary}</strong>
      </div>
    </div>
  `;

  aigcDemo.querySelectorAll("[data-aigc-id]").forEach((button) => {
    button.addEventListener("click", () => renderAigcDemo(button.dataset.aigcId));
  });
}

function fieldLabel(key) {
  const en = window.PortfolioI18n?.lang === "en";
  const labels = en
    ? {
        projectType: "Project type",
        style: "Style",
        usage: "Usage",
        view: "View",
        focus: "Focus",
      }
    : {
    projectType: "项目类型",
    style: "建筑风格",
    usage: "使用场景",
    view: "画面视角",
    focus: "表达重点",
      };
  return labels[key] ?? key;
}

function renderRagDemo(selectedId = activeRagId || data.ragQuestions[0].id, showDraft = activeShowDraft) {
  const { ragQuestions, ragSources } = data;
  const copy = labels();
  const selected = ragQuestions.find((item) => item.id === selectedId) ?? ragQuestions[0];
  activeRagId = selected.id;
  activeShowDraft = showDraft;

  ragDemo.innerHTML = `
    <div class="demo-panel">
      <h3>${copy.sources}</h3>
      <div class="source-stack">
        ${ragSources
          .map(
            (source) => `
              <div class="source-card">
                <strong>${source.name}</strong>
                <span>${source.type} · ${source.update}</span>
                <p>${source.coverage}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel">
      <h3>${copy.presetQuestions}</h3>
      <div class="choice-list">
        ${ragQuestions
          .map(
            (item) => `
              <button class="choice-button ${item.id === selected.id ? "active" : ""}" data-rag-id="${item.id}">
                <span>${item.type}</span>
                ${item.question}
              </button>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel answer-panel">
      <div class="panel-title-row">
        <h3>${copy.answerCitations}</h3>
        <span class="status-pill">${selected.score}</span>
      </div>
      <div class="query-box">
        <span>${copy.userQuestion}</span>
        <strong>${selected.question}</strong>
      </div>
      <h4>${copy.retrieved}</h4>
      <p class="retrieved-box">${selected.retrieved}</p>
      <h4>${copy.answer}</h4>
      <p>${selected.answer}</p>
      <h4>${copy.citations}</h4>
      <ul class="citation-list">
        ${selected.citations.map((citation) => `<li>${citation}</li>`).join("")}
      </ul>
      <div class="review-note">${selected.reviewNote}</div>
      <button class="primary-action inline-action" data-draft-toggle="${selected.id}">
        ${showDraft ? copy.collapseDraft : copy.generateDraft}
      </button>
      <a class="case-link-primary" href="./docs/enterprise-rag/index.html">${copy.fullCase}</a>
      ${
        showDraft
          ? `
            <div class="draft-box">
              <span>${copy.editableDraft}</span>
              <p>${selected.draft}</p>
            </div>
          `
          : ""
      }
    </div>
  `;

  ragDemo.querySelectorAll("[data-rag-id]").forEach((button) => {
    button.addEventListener("click", () => renderRagDemo(button.dataset.ragId));
  });

  ragDemo.querySelector("[data-draft-toggle]").addEventListener("click", () => {
    renderRagDemo(selected.id, !showDraft);
  });
}

function renderWorkflowDemo(activeIndex = 0) {
  const { workflowModules, workflowSteps, workflowValidation } = data;
  const copy = labels();
  const active = workflowSteps[activeIndex];
  activeWorkflowIndex = activeIndex;

  workflowDemo.innerHTML = `
    <div class="demo-panel">
      <h3>${copy.workflowStatus}</h3>
      <div class="step-list">
        ${workflowSteps
          .map(
            (step, index) => `
              <button class="step-button ${index === activeIndex ? "active" : ""}" data-step-index="${index}">
                <span>${index + 1}</span>
                ${step.status}
              </button>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel workflow-detail">
      <h3>${active.status}</h3>
      <div class="field-list">
        <div>
          <span>${copy.owner}</span>
          <strong>${active.owner}</strong>
        </div>
        <div>
          <span>${copy.action}</span>
          <strong>${active.action}</strong>
        </div>
        <div>
          <span>${copy.outcome}</span>
          <strong>${active.outcome}</strong>
        </div>
        ${
          active.branch
            ? `
              <div>
                <span>${copy.branch}</span>
                <strong>${active.branch}</strong>
              </div>
            `
            : ""
        }
      </div>
      <a class="case-link-primary" href="./docs/b-approval-workflow/index.html">${copy.fullCase}</a>
    </div>

    <div class="demo-panel workflow-modules">
      <h3>${copy.modules}</h3>
      <div class="decision-stack">
        ${workflowModules
          .map(
            (item) => `
              <article class="decision-card">
                <strong>${item.title}</strong>
                <p>${item.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel workflow-validation">
      <h3>${copy.validation}</h3>
      <div class="source-stack">
        ${workflowValidation
          .map(
            (item) => `
              <div class="source-card">
                <strong>${item.scene}</strong>
                <span>${item.result}</span>
                <p>${item.note}</p>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;

  workflowDemo.querySelectorAll("[data-step-index]").forEach((button) => {
    button.addEventListener("click", () => renderWorkflowDemo(Number(button.dataset.stepIndex)));
  });
}

function renderLocalRagDemo() {
  const { localRag } = data;
  const copy = labels();
  const [primaryDoc, downloadDoc, ...secondaryDocs] = localRag.documents;
  const [heroShot, , thirdShot] = localRag.screenshots;

  localRagDemo.innerHTML = `
    <div class="local-rag-feature">
      <div class="feature-copy">
        <p class="panel-kicker">${copy.localFeature}</p>
        <h3>${copy.localTitle}</h3>
        <p>${copy.localIntro}</p>
        <div class="spotlight-list">
          ${localRag.spotlight
            .map(
              (item) => `
                <article class="spotlight-card">
                  <p>${item}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="phase-grid">
          ${localRag.phases
            .map(
              (phase) => `
                <article class="phase-card">
                  <span>${phase.label}</span>
                  <strong>${phase.title}</strong>
                  <p>${phase.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
        <div class="feature-links">
          <a class="case-link-primary" href="${primaryDoc.href}">${primaryDoc.label}</a>
          <a class="case-link-download" href="${downloadDoc.href}" download="${downloadDoc.downloadName || ""}">${downloadDoc.label}</a>
          <div class="case-link-row">
            ${secondaryDocs.map((doc) => `<a href="${doc.href}">${doc.label}</a>`).join("")}
          </div>
        </div>
      </div>
      <a class="feature-cover" href="${primaryDoc.href}">
        <div class="feature-cover-grid">
          <figure class="feature-shot">
            <img src="${heroShot.src}" alt="${heroShot.label}" />
            <figcaption>${heroShot.label}</figcaption>
          </figure>
          <figure class="feature-shot">
            <img src="${thirdShot.src}" alt="${thirdShot.label}" />
            <figcaption>${thirdShot.label}</figcaption>
          </figure>
        </div>
        <span>${copy.openFull}</span>
      </a>
    </div>

    <div class="local-rag-metrics">
      ${localRag.metrics
        .map(
          (item) => `
            <article class="metric-card">
              <span>${item.label}</span>
              <strong>${item.value}</strong>
              <p>${item.note}</p>
            </article>
          `
        )
        .join("")}
    </div>

    <div class="demo-grid local-rag-compact-grid">
      <div class="demo-panel">
        <h3>${copy.upgradeTitle}</h3>
        <div class="decision-stack">
          ${localRag.v1Issues
            .map(
              (item) => `
                <article class="decision-card">
                  <strong>${item.title}</strong>
                  <p>${item.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="demo-panel">
        <h3>${copy.modulesTitle}</h3>
        <div class="decision-stack">
          ${localRag.agentModules
            .map(
              (item) => `
                <article class="decision-card">
                  <strong>${item.title}</strong>
                  <p>${item.body}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </div>

    <div class="demo-panel">
      <h3>${copy.decisionsTitle}</h3>
      <div class="decision-stack">
        ${localRag.decisions
          .map(
            (item) => `
              <article class="decision-card">
                <strong>${item.title}</strong>
                <p>${item.body}</p>
              </article>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-grid local-rag-compact-grid">
      <div class="demo-panel">
        <h3>${copy.traditionalVs}</h3>
        <div class="decision-stack">
          ${localRag.comparisonTable
            .map(
              (item) => `
                <article class="decision-card">
                  <strong>${item.dimension}</strong>
                  <p>${copy.traditional}${item.traditional}</p>
                  <p>${copy.thisSystem}${item.agentic}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
      <div class="demo-panel">
        <h3>${copy.limitsTitle}</h3>
        <div class="decision-stack">
          ${localRag.limits
            .map(
              (item) => `
                <article class="decision-card">
                  <p>${item}</p>
                </article>
              `
            )
            .join("")}
        </div>
      </div>
    </div>
  `;
}

function renderAll() {
  data = getPortfolioData();
  renderProjectCards();
  renderAigcDemo();
  renderRagDemo();
  renderWorkflowDemo(activeWorkflowIndex);
  renderLocalRagDemo();
  window.PortfolioI18n?.applyPage();
}

window.PortfolioI18n?.createSwitcher(".site-header");
window.addEventListener("portfolio:langchange", renderAll);
renderAll();
