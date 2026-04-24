window.portfolioData = {};

window.portfolioData.projects = [
  {
    id: "local-rag",
    title: "本地知识助手：从 RAG 到 Agentic RAG",
    subtitle: "主推项目 · AI Agent + 本地 RAG",
    problem: "个人知识分散、语义检索弱、隐私资料不适合上传云端",
    approach: "本地 RAG 底座 + Router/Tool/Memory + 只读 Agent 编排",
    result: "完成163个文件、390个chunks索引，并把知识检索升级为本地 Agent 助手",
    link: "#local-rag",
    level: "featured",
    accent: "AI Agent 产品",
    image: "./docs/local-knowledge-rag/assets/screenshots/notion-style-gui.png",
  },
  {
    id: "aigc",
    title: "建筑方案视觉生成工作台（AIGC）",
    subtitle: "AIGC产品 / Prompt工作流",
    problem: "前期出图慢、需求口径抽象、非AI同事Prompt门槛高",
    approach: "结构化输入 + Prompt模板 + 多版本生成 + 人工筛选",
    result: "15个典型出图场景中，13个达到基本可用及以上",
    link: "./docs/aigc-visual-workbench/index.html",
    level: "supporting",
    accent: "AIGC产品经理",
  },
  {
    id: "rag",
    title: "企业知识库问答与报告生成",
    subtitle: "企业RAG / 引用溯源 / 报告初稿",
    problem: "资料分散、引用难追溯、初稿产出慢",
    approach: "检索片段 + 引用溯源 + 人工复核",
    result: "20个验证问题中，19个达到基本可用及以上",
    link: "./docs/enterprise-rag/index.html",
    level: "supporting",
    accent: "企业RAG补充",
  },
  {
    id: "workflow",
    title: "B端审批协同平台",
    subtitle: "B端产品 / 项目管理",
    problem: "材料反复、预审低效、意见难沉淀",
    approach: "报审提报 + 会前预审 + 状态追踪 + 记录沉淀",
    result: "6个关键流程场景完成需求验收、联调测试与上线推进",
    link: "./docs/b-approval-workflow/index.html",
    level: "supporting",
    accent: "B端项目管理",
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
    { label: "Agent能力", value: "V2", note: "Router 决策、search_docs Tool、Memory 与执行链路展示" },
  ],
  phases: [
    {
      label: "V1",
      title: "本地 RAG 知识库",
      body: "完成文档导入、embedding、Chroma 向量检索、来源引用和 Web GUI，解决资料找回与答案可信问题。",
    },
    {
      label: "V2",
      title: "Agentic RAG 助手",
      body: "在 RAG 之上增加 Router、search_docs Tool、Memory 和 Agent Core，让 LLM 从生成器升级为任务决策中枢。",
    },
  ],
  spotlight: [
    "把本地知识检索从固定流程升级为会判断、会调工具的 AI Agent。",
    "用两阶段叙事清楚说明：为什么从 RAG 升级到 Agent，而不是只堆功能。",
    "强调本地化、引用溯源和只读边界，兼顾能力展示与风险控制。",
  ],
  v1Issues: [
    { title: "强制检索", body: "无论问题是否需要资料依据，V1 都默认进入检索链路，流程不够智能。" },
    { title: "无决策能力", body: "系统只能被动召回片段，不能判断用户是在问答、总结、对比还是项目整理。" },
    { title: "缺少记忆", body: "每轮对话相对独立，用户继续追问时需要重复背景。" },
  ],
  agentModules: [
    { title: "Router", body: "判断问题是否需要查询知识库，输出 direct 或 retrieve。" },
    { title: "Tool", body: "把 RAG 检索封装为 search_docs 工具，供 Agent 调用。" },
    { title: "Memory", body: "保存最近对话，让连续追问可以继承上下文。" },
    { title: "Agent Core", body: "调度决策、工具调用、上下文组装和最终回答生成。" },
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
    {
      title: "Agent 只读边界",
      body: "Agent 先只允许调用检索工具和读取上下文，不直接修改本地文件，降低自动执行带来的误操作风险。",
    },
  ],
  pmRole: [
    "定义目标用户、场景、痛点、MVP 范围和风险边界",
    "拆分数据源、向量库、检索、生成、GUI 和 Agent 控制层",
    "设计 Router prompt 与 Answer prompt，约束是否检索和基于来源回答",
    "完成本地索引、GUI 检索、来源问答和 Agent 助手验证",
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
    "项目整理类问题可以召回对应的准备材料。",
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
    "Agent Router、Tool、Memory",
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
    { label: "完整产品设计文档（含架构、设计思考与演进细节）：👉 点击查看", href: "./docs/local-knowledge-rag/本地知识助手_RAG到AgenticRAG_产品设计文档.pdf", type: "download" },
    { label: "V1/V2对比", href: "./docs/local-knowledge-rag/index.html#comparison" },
    { label: "AI PM角色", href: "./docs/local-knowledge-rag/index.html#role" },
  ],
};

window.portfolioData.aigcCases = [
  {
    id: "residential",
    label: "住宅入口方向图",
    brief: "把“高端、温暖、有归家感”的模糊描述拆成可生成字段，用于 workshop 和设计院沟通。",
    fields: {
      projectType: "高端改善住宅",
      style: "现代东方",
      usage: "设计院沟通",
      view: "入口人视",
      focus: "归家仪式感、温暖灯光、品质界面",
    },
    prompt:
      "高端改善住宅入口，现代东方建筑风格，石材立面，温暖灯光，酒店式归家体验，入口人视视角，真实尺度，精致住宅品质感。",
    negative: "不要文字、不要水印、不要夸张造型、不要畸形透视、不要不真实比例。",
    candidates: [
      { label: "方向 A", tag: "可用", note: "入口气质接近，可放入 workshop 草稿" },
      { label: "方向 B", tag: "需后修", note: "灯光氛围可用，立面比例需调整" },
      { label: "方向 C", tag: "风格参考", note: "材质和色调可参考，构图不稳定" },
    ],
    score: "基本可用",
    boundary: "适合方向探索和氛围沟通，不适合直接作为正式效果图交付。",
  },
  {
    id: "tod",
    label: "TOD汇报封面",
    brief: "面向汇报封面和背景页，优先表达城市活力和复合功能，不承担精确总平关系表达。",
    fields: {
      projectType: "TOD综合体",
      style: "城市综合体",
      usage: "汇报封面",
      view: "鸟瞰视角",
      focus: "轨道交通、商业界面、城市活力",
    },
    prompt:
      "TOD 城市综合体鸟瞰视角，轨道交通节点，商业街区界面，公共广场，体现城市活力和复合功能，画面干净，适合作为方案汇报封面。",
    negative: "不要文字、不要水印、不要画面杂乱、不要错误交通流线、不要不真实塔楼比例。",
    candidates: [
      { label: "方向 A", tag: "可用", note: "封面氛围完整，适合做背景视觉" },
      { label: "方向 B", tag: "构图参考", note: "城市界面有价值，但交通关系不准确" },
      { label: "方向 C", tag: "不适合", note: "体量过度夸张，不宜对外沟通" },
    ],
    score: "可用",
    boundary: "适合汇报封面和背景页，不适合表达精确总平关系和交通流线。",
  },
  {
    id: "retail",
    label: "社区商业氛围图",
    brief: "用于前期讨论街区尺度、夜间灯光和消费氛围，帮助团队快速统一空间调性。",
    fields: {
      projectType: "社区商业",
      style: "生活方式街区",
      usage: "空间氛围",
      view: "人视街区",
      focus: "消费场景、街区尺度、夜间氛围",
    },
    prompt:
      "社区商业生活方式街区，人视步行视角，温暖夜间灯光，户外座椅，亲切的街区尺度，氛围活跃但不过度拥挤，适合作为前期概念氛围图。",
    negative: "不要文字、不要水印、不要商场内街感、不要人群过多、不要店铺立面畸形、不要低质量模糊画面。",
    candidates: [
      { label: "方向 A", tag: "可用", note: "街区尺度和夜间氛围较稳定" },
      { label: "方向 B", tag: "风格参考", note: "灯光可参考，商业界面偏网红化" },
      { label: "方向 C", tag: "需后修", note: "人物和店招需要清理" },
    ],
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
    status: "待提交",
    owner: "提交方",
    action: "按项目类型填写基础信息、提报阶段和必填附件",
    outcome: "材料入口统一，减少线下收资",
  },
  {
    status: "已提交",
    owner: "提交方",
    action: "提交预审并记录版本号、提交时间和备注说明",
    outcome: "预审方看到统一版本材料",
  },
  {
    status: "预审中",
    owner: "预审方",
    action: "按清单检查材料完整性，标记缺项并填写退回原因",
    outcome: "催补动作平台留痕",
    branch: "材料缺项时进入退回补充",
  },
  {
    status: "退回补充",
    owner: "提交方",
    action: "根据退回原因补齐附件或修正版本命名后再次提交",
    outcome: "减少口头反复确认",
  },
  {
    status: "进入评审",
    owner: "评审方",
    action: "基于统一版本材料记录意见、结论和后续动作",
    outcome: "评审意见结构化沉淀",
  },
  {
    status: "已完成",
    owner: "管理方",
    action: "查看历史流转、责任事项和后续跟进状态",
    outcome: "项目可追踪、可复盘",
  },
];

window.portfolioData.workflowModules = [
  { title: "报审提报", body: "统一入口、项目类型、提报阶段、附件模板和必填校验。" },
  { title: "会前预审", body: "待预审列表、完整性检查、缺项退回和版本查看。" },
  { title: "评审记录", body: "评审结论、意见分类、后续动作、责任人和截止时间。" },
  { title: "流程状态", body: "当前节点、待办提醒、历史流转和角色权限说明。" },
];

window.portfolioData.workflowValidation = [
  { scene: "报审材料提交", result: "可用", note: "提交口径明显更统一" },
  { scene: "会前预审", result: "可用", note: "收资和核对效率提升明显" },
  { scene: "评审记录沉淀", result: "基本可用", note: "意见沉淀能力提升，需要习惯培养" },
];
