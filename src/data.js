window.portfolioData = {};

window.portfolioData.projects = [
  {
    id: "local-rag",
    title: "本地个人知识库 RAG 系统",
    subtitle: "重点项目 · Local-first RAG",
    problem: "个人知识分散、语义检索弱、隐私资料不适合上传云端",
    approach: "本地 embedding + Chroma + FastAPI GUI + 引用溯源",
    result: "完成163个文件、390个chunks的索引验证",
    link: "#local-rag",
    level: "featured",
    accent: "主推",
    image: "./docs/local-knowledge-rag/assets/screenshots/notion-style-gui.png",
  },
  {
    id: "rag",
    title: "企业知识库问答与报告生成",
    subtitle: "LLM + RAG",
    problem: "资料分散、引用难追溯、初稿产出慢",
    approach: "检索片段 + 引用溯源 + 人工复核",
    result: "20个验证问题中，19个达到基本可用及以上",
    link: "#rag",
    level: "supporting",
    accent: "RAG方案",
  },
  {
    id: "aigc",
    title: "AIGC视觉内容生成工作流",
    subtitle: "营销/方案物料生成",
    problem: "出图周期长、需求口径抽象、反复修改成本高",
    approach: "结构化输入 + Prompt模板 + 多版本生成流程",
    result: "15个典型出图场景中，13个达到基本可用及以上",
    link: "#aigc",
    level: "supporting",
    accent: "设计工作流",
  },
  {
    id: "workflow",
    title: "B端审批协同平台",
    subtitle: "流程配置/权限/数据沉淀",
    problem: "材料反复、预审低效、意见难沉淀",
    approach: "报审提报 + 会前预审 + 状态追踪 + 记录沉淀",
    result: "6个关键流程场景完成需求验收、联调测试与上线推进",
    link: "#workflow",
    level: "supporting",
    accent: "B端流程",
  },
];

window.portfolioData.localRag = {
  problemMatrix: [
    { pain: "关键词搜索弱", impact: "记得大概意思但找不到原文", design: "用 embedding 做语义召回" },
    { pain: "LLM 容易幻觉", impact: "回答流畅但无法证明依据", design: "先检索来源，再生成答案" },
    { pain: "私人资料敏感", impact: "不适合上传云端知识库", design: "embedding、向量库、缓存全部本地化" },
    { pain: "工具门槛高", impact: "命令行不适合日常使用", design: "提供 Web GUI 和索引状态面板" },
  ],
  metrics: [
    { label: "已索引文件", value: "163", note: "162个 Obsidian Markdown 文件 + 脱敏文档测试样例" },
    { label: "向量片段", value: "390", note: "385个 Obsidian chunks + 5个文档 chunks" },
    { label: "运行方式", value: "本地", note: "Ollama embedding、Chroma 向量库、FastAPI GUI" },
    { label: "机器约束", value: "Intel i5", note: "按 2020 款 MacBook Pro 16GB 内存设计轻量方案" },
  ],
  decisions: [
    {
      title: "先检索，再回答",
      body: "优先展示来源片段和路径，再进入生成回答，降低个人知识库场景里的幻觉风险。",
    },
    {
      title: "本地优先的隐私边界",
      body: "笔记、embedding、Chroma 数据、转换缓存和日志留在本机，敏感档案默认不进入索引。",
    },
    {
      title: "低配置电脑可运行",
      body: "用小批量 embedding、分批索引和路径刷新，适配 2020 Intel MacBook Pro。",
    },
  ],
  flows: [
    "扫描允许索引的 Obsidian 笔记和本地文档",
    "将 DOCX/PDF/PPTX/TXT 转换为 Markdown 或文本",
    "合并短章节，按结构切块，并在本地生成 embedding",
    "写入 Chroma，并按文件路径刷新旧 chunks",
    "通过 FastAPI 原生网页界面完成检索、问答和小批量索引",
  ],
  evidence: [
    "文件管理规则类问题可以召回对应的文件管理说明。",
    "阅读标注导入类问题可以召回对应的导入流程说明。",
    "本地 RAG GUI 启动类问题可以召回日常使用手册。",
    "面试准备类问题可以召回对应的准备材料。",
  ],
  screenshots: [
    { label: "GUI 总览", src: "./docs/local-knowledge-rag/assets/screenshots/notion-style-gui.png" },
    { label: "检索工作台", src: "./docs/local-knowledge-rag/assets/screenshots/search-workspace.png" },
    { label: "带引用回答", src: "./docs/local-knowledge-rag/assets/screenshots/answer-with-citations.png" },
    { label: "索引任务", src: "./docs/local-knowledge-rag/assets/screenshots/indexing-workspace.png" },
  ],
  architecture: [
    "Obsidian 笔记与本地文档",
    "文档转换、切块、本地 embedding",
    "Chroma 本地向量库",
    "FastAPI Web GUI",
  ],
  diagrams: [
    {
      label: "系统架构图",
      src: "./docs/local-knowledge-rag/assets/architecture.png",
      note: "从数据源、文本处理、向量层、检索层到 GUI 的完整链路。",
    },
    {
      label: "查询流程图",
      src: "./docs/local-knowledge-rag/assets/query-flow.png",
      note: "用户从自然语言问题到可复核答案的路径。",
    },
    {
      label: "评估对比图",
      src: "./docs/local-knowledge-rag/assets/evaluation-chart.png",
      note: "关键词搜索、直接问 LLM、本地 RAG 与 RAG+rerank 的对比。",
    },
  ],
  designTable: [
    { decision: "RAG 而非微调", benefit: "动态接入新增资料，并保留来源", cost: "需要维护索引与召回质量" },
    { decision: "本地部署", benefit: "私人资料不上传，控制权更强", cost: "模型能力和速度受本机限制" },
    { decision: "引用优先", benefit: "降低幻觉，方便回到原文复核", cost: "回答流程比普通聊天更复杂" },
    { decision: "GUI 优先", benefit: "日常可用，更像产品而非脚本", cost: "需要额外维护前端体验" },
  ],
  evaluationTable: [
    { query: "本地 RAG GUI 平时怎么用？", expected: "日常使用说明", result: "命中" },
    { query: "文件改动后怎么办？", expected: "索引更新说明", result: "命中" },
    { query: "换电脑时需要迁移哪些内容？", expected: "迁移操作指引", result: "命中" },
    { query: "公开作品集不能放哪些内容？", expected: "公开封装说明", result: "命中" },
    { query: "长文档索引要注意什么？", expected: "系统设计与协作规则", result: "基本命中" },
  ],
  documents: [
    { label: "项目案例页", href: "./docs/local-knowledge-rag/index.html" },
    { label: "下载产品设计文档", href: "./docs/local-knowledge-rag/本地个人知识库RAG系统_产品设计文档_苑夫唯.pdf", type: "download" },
    { label: "产品简报", href: "./docs/local-knowledge-rag/index.html#product-brief" },
    { label: "系统设计", href: "./docs/local-knowledge-rag/index.html#system-design" },
    { label: "验证记录", href: "./docs/local-knowledge-rag/index.html#evaluation" },
  ],
};

window.portfolioData.aigcCases = [
  {
    id: "residential",
    label: "高端住宅概念方向图",
    fields: {
      projectType: "高端住宅",
      style: "现代简洁",
      usage: "概念方向",
      view: "街角人视",
      focus: "入口形象、立面比例、生活氛围",
    },
    prompt:
      "高端住宅社区入口，现代简洁建筑风格，街角人视视角，强调入口形象、立面比例和生活氛围，柔和自然光，适合作为概念方向探索图。",
    score: "基本可用",
    boundary: "适合方向探索和氛围沟通，不适合直接作为正式效果图交付。",
  },
  {
    id: "tod",
    label: "TOD综合体汇报封面",
    fields: {
      projectType: "TOD综合体",
      style: "城市综合体",
      usage: "汇报封面",
      view: "鸟瞰视角",
      focus: "轨道交通、商业界面、城市活力",
    },
    prompt:
      "TOD城市综合体鸟瞰视角，结合轨道交通、商业界面和公共空间，体现城市活力和复合功能，适合作为方案汇报封面辅助图。",
    score: "可用",
    boundary: "适合汇报封面和背景页，不适合表达精确总平关系和交通流线。",
  },
  {
    id: "retail",
    label: "社区商业空间氛围图",
    fields: {
      projectType: "社区商业",
      style: "生活方式街区",
      usage: "空间氛围",
      view: "人视街区",
      focus: "消费场景、街区尺度、夜间氛围",
    },
    prompt:
      "社区商业生活方式街区，人视街区视角，强调消费场景、街区尺度和夜间灯光氛围，适合前期空间氛围沟通。",
    score: "可用",
    boundary: "适合氛围表达，不适合替代招商落位、消防疏散和精确尺度判断。",
  },
];

window.portfolioData.ragSources = [
  {
    id: "standard",
    name: "集团商办产品建筑设计标准",
    type: "标准制度",
    coverage: "公共空间、配置口径、评审原则",
    update: "2021版",
  },
  {
    id: "policy",
    name: "区域综合住区产品管理办法",
    type: "制度办法",
    coverage: "产品定位、变更审批、会前预审",
    update: "试行版",
  },
  {
    id: "tod",
    name: "TOD车辆段上盖项目开发操作指引",
    type: "项目指引",
    coverage: "车辆段上盖、开发流程、风险识别",
    update: "3.0版",
  },
  {
    id: "cases",
    name: "历史项目案例库",
    type: "项目案例",
    coverage: "高端住宅、综合住区、商办案例",
    update: "样例集",
  },
  {
    id: "meeting",
    name: "产品评审会议纪要",
    type: "会议纪要",
    coverage: "评审意见、待办事项、决策结论",
    update: "脱敏样例",
  },
];

window.portfolioData.ragQuestions = [
  {
    id: "q1",
    type: "事实检索",
    question: "集团商办标准里，对公共空间的核心要求有哪些？",
    answer:
      "公共空间需要同时满足形象展示、客流组织、运营效率和后期维护要求。重点关注入口识别性、动线清晰度、公共界面连续性、消防疏散条件和材料耐久性。",
    citations: ["集团商办产品建筑设计标准：公共空间章节", "历史项目案例库：商办公共空间复盘"],
    retrieved:
      "公共空间设计应结合项目定位、客群特征和运营场景，优先保证入口识别、交通组织、公共界面和后期维护的稳定性。",
    reviewNote: "可作为标准检索答案，但具体指标仍需回到原文条款复核。",
    score: "表现稳定",
    draft:
      "本项目公共空间设计需重点校准入口识别性、客流组织效率和公共界面连续性，并结合消防疏散与后期维护要求进行综合判断。",
  },
  {
    id: "q2",
    type: "事实检索",
    question: "区域产品管理办法中，对设计变更审批的限制条件是什么？",
    answer:
      "设计变更审批通常需要说明变更原因、影响范围、成本影响、进度影响和风险判断。涉及产品定位、关键配置、成本目标或客户承诺的变更，应进入会前预审和正式评审。",
    citations: ["区域综合住区产品管理办法：设计变更章节", "产品评审会议纪要：变更审批样例"],
    retrieved:
      "涉及产品定位、关键配置、成本目标和交付承诺的变更，应补充原因说明、影响测算和风险判断后提交评审。",
    reviewNote: "需要根据公司最新制度版本确认审批层级和流程节点。",
    score: "表现稳定",
    draft:
      "本次变更涉及关键配置和成本边界，建议补充变更原因、影响范围、成本测算及风险说明后进入会前预审。",
  },
  {
    id: "q3",
    type: "定向提取",
    question: "请提取某次产品决策会材料里与方案可行性相关的关键条目。",
    answer:
      "关键条目包括：定位是否匹配片区客群、配置是否超出成本边界、总图和动线是否满足运营要求、关键风险是否已有应对方案、后续设计任务是否明确。",
    citations: ["产品评审会议纪要：方案可行性讨论", "区域综合住区产品管理办法：会前预审要求"],
    retrieved:
      "会前预审需重点检查定位匹配、配置边界、成本影响、总图动线和风险事项，避免评审会讨论发散。",
    reviewNote: "单文档提取较稳定，但会议纪要中未明确写出的隐含判断仍需人工补充。",
    score: "可用",
    draft:
      "本次方案可行性评审应围绕定位匹配、配置边界、成本影响、总图动线和关键风险五类问题展开。",
  },
  {
    id: "q4",
    type: "定向提取",
    question: "如果要做一次区域产品汇报，通常需要准备哪些输入资料？",
    answer:
      "通常需要准备项目基础信息、产品定位、竞品对标、方案图纸、成本边界、配置清单、关键风险、历史评审意见和待决策事项。",
    citations: ["区域综合住区产品管理办法：汇报材料要求", "产品评审会议纪要：材料补充清单"],
    retrieved:
      "区域汇报材料应包括基础信息、定位判断、方案表达、竞品依据、成本影响、风险识别和需要管理层决策的问题。",
    reviewNote: "适合作为资料准备清单，具体材料深度要随项目阶段调整。",
    score: "可用",
    draft:
      "本次区域产品汇报建议按项目基础信息、产品定位、竞品对标、方案表达、成本边界、风险识别和待决策事项组织材料。",
  },
  {
    id: "q5",
    type: "对比归纳",
    question: "集团标准和区域口径对同一问题的表述差异在哪里？",
    answer:
      "集团标准通常提供统一原则和底线要求，区域口径更强调本地项目条件、成本边界和执行流程。两者冲突时，需要标出原文依据，并按最新制度和审批层级确认优先级。",
    citations: ["集团商办产品建筑设计标准：通用原则", "区域综合住区产品管理办法：区域执行口径"],
    retrieved:
      "集团标准强调统一性，区域办法强调执行流程和区域适配。若口径不一致，应回到最新制度版本及审批要求确认。",
    reviewNote: "对比类问题依赖检索完整度，建议保留原文对照，避免只给概括结论。",
    score: "可用",
    draft:
      "集团标准与区域口径的差异主要体现在原则层级和执行细节：前者提供统一底线，后者结合本地条件和流程要求进行落地。",
  },
  {
    id: "q6",
    type: "对比归纳",
    question: "不同TOD项目中，有哪些共通做法和差异点？",
    answer:
      "共通做法包括提前识别结构转换、交通组织、消防条件和开发节奏风险。差异点主要来自站点条件、上盖规模、业态组合、建设时序和成本约束。",
    citations: ["TOD车辆段上盖项目开发操作指引：风险识别", "历史项目案例库：TOD案例对比"],
    retrieved:
      "TOD项目通常面临结构、交通、消防、时序和成本多重约束，不同项目的差异取决于站点条件和业态组合。",
    reviewNote: "多案例归纳容易漏项，适合做初步框架，不适合直接作为最终结论。",
    score: "一般",
    draft:
      "不同TOD项目的共性约束集中在结构转换、交通组织、消防条件和开发时序，差异则主要由站点条件、上盖规模和业态组合决定。",
  },
  {
    id: "q7",
    type: "文本生成",
    question: "基于现有资料生成一段项目产品定位说明。",
    answer:
      "项目可定位为面向改善型家庭的综合住区产品，重点通过归家动线、公共空间、景观体系和配套界面形成差异化体验，同时控制配置投入与成本边界。",
    citations: ["历史项目案例库：高端住宅案例", "竞品分析摘要：改善型客群偏好"],
    retrieved:
      "改善型客群更关注归家体验、公共空间品质、景观体系、户型尺度和社区配套完整度。",
    reviewNote: "适合作为初稿，需要结合真实城市、地块条件和客群画像进一步修改。",
    score: "可用",
    draft:
      "本项目建议定位为面向改善型家庭的综合住区产品，通过归家动线、公共空间、景观体系和社区配套形成品质感，同时在配置投入上保持与成本边界的匹配。",
  },
  {
    id: "q8",
    type: "开放追问",
    question: "对没有明确信息支持的评审问题怎么回答？",
    answer:
      "系统不应强行给出确定结论，应提示当前资料中未检索到明确依据，并建议补充资料范围、确认制度版本或转人工判断。",
    citations: ["产品设计原则：先可信，再追求流畅", "验证问题集：拒答与弱回答机制"],
    retrieved:
      "对资料不足、资料冲突或无明确依据的问题，系统应给出边界提示，而不是生成看似完整但无法追溯的结论。",
    reviewNote: "这是专业场景中非常重要的安全机制，拒答比强答更可靠。",
    score: "表现稳定",
    draft:
      "当前资料中未检索到足以支撑结论的明确依据，建议补充资料范围或由相关负责人进行人工判断。",
  },
];

window.portfolioData.workflowSteps = [
  {
    status: "草稿",
    owner: "提交方",
    action: "填写项目名称、报审类型和基础信息",
    outcome: "报审信息进入统一表单",
  },
  {
    status: "已提交",
    owner: "提交方",
    action: "上传材料并提交预审",
    outcome: "系统记录提交时间和材料版本",
  },
  {
    status: "预审中",
    owner: "预审方",
    action: "检查必填项、材料完整性和口径一致性",
    outcome: "缺项退回或进入评审",
  },
  {
    status: "待评审",
    owner: "评审方",
    action: "查看材料、记录问题和评审意见",
    outcome: "评审意见结构化沉淀",
  },
  {
    status: "已归档",
    owner: "系统",
    action: "固化结论、动作项和历史记录",
    outcome: "后续可追踪、可复用、可查询",
  },
];
