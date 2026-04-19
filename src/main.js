const { aigcCases, localRag, projects, ragQuestions, ragSources, workflowSteps } = window.portfolioData;

const projectCards = document.querySelector("#project-cards");
const aigcDemo = document.querySelector("#aigc-demo");
const ragDemo = document.querySelector("#rag-demo");
const workflowDemo = document.querySelector("#workflow-demo");
const localRagDemo = document.querySelector("#local-rag-demo");

function renderProjectCards() {
  projectCards.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card ${project.level === "featured" ? "featured-card" : ""}">
          ${
            project.image
              ? `
                <a class="project-card-media" href="${project.link}">
                  <img src="${project.image}" alt="${project.title}界面截图" />
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
            <a href="${project.link}" class="text-link">${project.level === "featured" ? "查看重点项目" : "查看项目"}</a>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAigcDemo(selectedId = aigcCases[0].id) {
  const selected = aigcCases.find((item) => item.id === selectedId) ?? aigcCases[0];

  aigcDemo.innerHTML = `
    <div class="demo-panel">
      <h3>选择一个出图场景</h3>
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
      <h3>生成结构化Prompt</h3>
      <p class="prompt-box">${selected.prompt}</p>
      <div class="result-row">
        <span>可用性评分</span>
        <strong>${selected.score}</strong>
      </div>
      <div class="result-row">
        <span>边界判断</span>
        <strong>${selected.boundary}</strong>
      </div>
    </div>
  `;

  aigcDemo.querySelectorAll("[data-aigc-id]").forEach((button) => {
    button.addEventListener("click", () => renderAigcDemo(button.dataset.aigcId));
  });
}

function fieldLabel(key) {
  const labels = {
    projectType: "项目类型",
    style: "建筑风格",
    usage: "使用场景",
    view: "画面视角",
    focus: "表达重点",
  };
  return labels[key] ?? key;
}

function renderRagDemo(selectedId = ragQuestions[0].id, showDraft = false) {
  const selected = ragQuestions.find((item) => item.id === selectedId) ?? ragQuestions[0];

  ragDemo.innerHTML = `
    <div class="demo-panel">
      <h3>资料库</h3>
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
      <h3>预设问题</h3>
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
        <h3>答案与引用</h3>
        <span class="status-pill">${selected.score}</span>
      </div>
      <div class="query-box">
        <span>用户问题</span>
        <strong>${selected.question}</strong>
      </div>
      <h4>召回片段</h4>
      <p class="retrieved-box">${selected.retrieved}</p>
      <h4>生成答案</h4>
      <p>${selected.answer}</p>
      <h4>引用来源</h4>
      <ul class="citation-list">
        ${selected.citations.map((citation) => `<li>${citation}</li>`).join("")}
      </ul>
      <div class="review-note">${selected.reviewNote}</div>
      <button class="primary-action inline-action" data-draft-toggle="${selected.id}">
        ${showDraft ? "收起汇报初稿" : "生成汇报初稿"}
      </button>
      ${
        showDraft
          ? `
            <div class="draft-box">
              <span>可编辑初稿</span>
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
  const active = workflowSteps[activeIndex];

  workflowDemo.innerHTML = `
    <div class="demo-panel">
      <h3>流程状态</h3>
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
          <span>负责角色</span>
          <strong>${active.owner}</strong>
        </div>
        <div>
          <span>关键动作</span>
          <strong>${active.action}</strong>
        </div>
        <div>
          <span>流程结果</span>
          <strong>${active.outcome}</strong>
        </div>
      </div>
    </div>
  `;

  workflowDemo.querySelectorAll("[data-step-index]").forEach((button) => {
    button.addEventListener("click", () => renderWorkflowDemo(Number(button.dataset.stepIndex)));
  });
}

function renderLocalRagDemo() {
  const [primaryDoc, downloadDoc, ...secondaryDocs] = localRag.documents;

  localRagDemo.innerHTML = `
    <div class="local-rag-feature">
      <div class="feature-copy">
        <p class="panel-kicker">Project 01 · Featured Case</p>
        <h3>本地个人知识库 RAG 系统</h3>
        <p>
          这个项目从真实知识管理场景出发：资料越来越多，关键词搜索不够，直接问大模型又缺少依据。
          因此产品原则是先找来源，再生成回答，并让用户能回到原文复核。
        </p>
        <div class="feature-links">
          <a class="case-link-primary" href="${primaryDoc.href}">${primaryDoc.label}</a>
          <a class="case-link-download" href="${downloadDoc.href}" download="本地个人知识库RAG系统_产品设计文档_苑夫唯.pdf">${downloadDoc.label}</a>
          <div class="case-link-row">
            ${secondaryDocs.map((doc) => `<a href="${doc.href}">${doc.label}</a>`).join("")}
          </div>
        </div>
      </div>
      <a class="feature-cover" href="${primaryDoc.href}">
        <img src="./docs/local-knowledge-rag/assets/screenshots/notion-style-gui.png" alt="本地个人知识库 RAG 系统封面截图" />
        <span>打开完整项目案例页</span>
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

    <div class="demo-panel local-rag-table-panel ordered-panel">
      <p class="section-number">01</p>
      <h3>问题定义与产品解法</h3>
      <div class="case-table">
        <div class="case-table-row case-table-head">
          <span>痛点</span>
          <span>影响</span>
          <span>设计解法</span>
        </div>
        ${localRag.problemMatrix
          .map(
            (item) => `
              <div class="case-table-row">
                <span>${item.pain}</span>
                <span>${item.impact}</span>
                <strong>${item.design}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel local-rag-diagrams ordered-panel">
      <p class="section-number">02</p>
      <h3>框架图与流程图</h3>
      <div class="diagram-grid">
        ${localRag.diagrams
          .map(
            (item) => `
              <a class="diagram-card" href="${item.src}">
                <img src="${item.src}" alt="${item.label}" />
                <strong>${item.label}</strong>
                <p>${item.note}</p>
              </a>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel local-rag-gallery ordered-panel">
      <p class="section-number">03</p>
      <h3>界面截图</h3>
      <div class="screenshot-grid">
        ${localRag.screenshots
          .map(
            (item) => `
              <a class="screenshot-card" href="${item.src}">
                <img src="${item.src}" alt="${item.label}" />
                <span>${item.label}</span>
              </a>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel ordered-panel">
      <p class="section-number">04</p>
      <h3>产品决策</h3>
      <div class="case-table decision-table">
        <div class="case-table-row case-table-head">
          <span>决策</span>
          <span>收益</span>
          <span>成本</span>
        </div>
        ${localRag.designTable
          .map(
            (item) => `
              <div class="case-table-row">
                <strong>${item.decision}</strong>
                <span>${item.benefit}</span>
                <span>${item.cost}</span>
              </div>
            `
          )
          .join("")}
      </div>
    </div>

    <div class="demo-panel ordered-panel">
      <p class="section-number">05</p>
      <h3>验证问题与结果</h3>
      <div class="case-table evaluation-table">
        <div class="case-table-row case-table-head">
          <span>测试问题</span>
          <span>期望来源</span>
          <span>结果</span>
        </div>
        ${localRag.evaluationTable
          .map(
            (item) => `
              <div class="case-table-row">
                <span>${item.query}</span>
                <span>${item.expected}</span>
                <strong>${item.result}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

renderProjectCards();
renderAigcDemo();
renderRagDemo();
renderWorkflowDemo();
renderLocalRagDemo();
