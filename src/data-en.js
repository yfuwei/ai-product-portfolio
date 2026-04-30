window.portfolioDataEn = structuredClone(window.portfolioData);

Object.assign(window.portfolioDataEn, {
  projects: [
    {
      id: "local-rag",
      title: "Local Knowledge Assistant: RAG to Agentic RAG",
      subtitle: "Featured case · AI Agent + local RAG",
      problem: "Knowledge was fragmented, search was inefficient, and LLM answers lacked source evidence.",
      approach: "V1 used RAG for retrieval and citations; V2 added Router, Tool Calling, and Memory for task decisions.",
      result: "10 real task questions: 9 matched, 1 partially matched; answer usefulness around 8/10.",
      link: "./docs/local-knowledge-rag/index.html",
      level: "featured",
      accent: "AI Agent Product",
      image: "./docs/local-knowledge-rag/assets/screenshots/notion-style-gui.png",
    },
    {
      id: "aigc",
      title: "AIGC Visual Generation Workbench",
      subtitle: "AIGC product / prompt workflow",
      problem: "Early visual exploration was slow, vague requirements were hard to translate, and prompt writing had a high barrier.",
      approach: "Structured input, prompt templates, multi-version generation, and human review.",
      result: "13 of 15 typical visual scenarios reached usable or basically usable quality.",
      link: "./docs/aigc-visual-workbench/index.html",
      level: "supporting",
      accent: "AIGC Product",
    },
    {
      id: "rag",
      title: "Enterprise Knowledge QA and Report Drafting",
      subtitle: "Enterprise RAG / citations / report drafts",
      problem: "Materials were scattered, citations were hard to trace, and first drafts took too long.",
      approach: "Retrieved evidence, source citations, generated drafts, and human review.",
      result: "19 of 20 validation questions reached usable or basically usable quality.",
      link: "./docs/enterprise-rag/index.html",
      level: "supporting",
      accent: "Enterprise RAG",
    },
    {
      id: "workflow",
      title: "B2B Approval Workflow Platform",
      subtitle: "B2B product / workflow management",
      problem: "Submission materials repeated, pre-review was inefficient, and review comments were hard to retain.",
      approach: "Submission, pre-review, status tracking, and structured review records.",
      result: "6 key workflow scenarios completed requirement acceptance, integration testing, and launch support.",
      link: "./docs/b-approval-workflow/index.html",
      level: "supporting",
      accent: "B2B Product",
    },
  ],
});

Object.assign(window.portfolioDataEn.localRag, {
  metrics: [
    { label: "Real task questions", value: "10", note: "Questions came from actual personal knowledge workflows, not synthetic QA sets." },
    { label: "Source recall", value: "9+1", note: "9 matched, 1 partially matched with a reviewable retrieval direction." },
    { label: "Answer usefulness", value: "8/10", note: "Judged by whether answers were source-grounded and useful for review." },
    { label: "Local index size", value: "390", note: "163 files and 390 chunks, accessed through a FastAPI GUI." },
  ],
  phases: [
    { label: "V1", title: "Local RAG knowledge base", body: "Built ingestion, embeddings, Chroma retrieval, source citations, and a Web GUI for reliable retrieval and answers." },
    { label: "V2", title: "Agentic RAG assistant", body: "Added Router, search_docs Tool, Memory, and Agent Core so the system can decide when to retrieve and how to continue a task." },
  ],
  spotlight: [
    "Shifted the user experience from finding files to getting source-grounded answers.",
    "Upgraded local knowledge retrieval from a fixed pipeline into a task-aware AI agent.",
    "Validated the system with real task questions instead of a polished demo script.",
    "Kept local deployment, citations, and read-only boundaries as core product constraints.",
  ],
  v1Issues: [
    { title: "Forced retrieval", body: "V1 routed every question through retrieval, even when a direct answer or clarification was more appropriate." },
    { title: "No task decision", body: "The system retrieved passages but could not distinguish QA, summarization, comparison, or project preparation tasks." },
    { title: "No memory", body: "Each turn was mostly independent, so follow-up questions required repeated context." },
  ],
  agentModules: [
    { title: "Router", body: "Decides whether a query should be answered directly, retrieved, or clarified." },
    { title: "Tool", body: "Wraps RAG retrieval as a search_docs tool that the agent can call." },
    { title: "Memory", body: "Keeps short-term conversation context for follow-up questions." },
    { title: "Agent Core", body: "Coordinates routing, tool calls, context assembly, and final answer generation." },
  ],
  decisions: [
    { title: "Retrieve before answering", body: "Show source passages and file paths first, then generate an answer to reduce hallucination risk." },
    { title: "Local-first privacy boundary", body: "Notes, embeddings, vector DB, caches, and logs remain on the local machine." },
    { title: "Works on low-spec hardware", body: "Batch embeddings, incremental indexing, and path-based refresh keep the system usable on a 2020 Intel MacBook Pro." },
    { title: "Read-only agent boundary", body: "The agent can retrieve and reason, but cannot modify local files without explicit review and confirmation." },
  ],
  comparisonTable: [
    { dimension: "Finding materials", traditional: "Keyword search and manual folder browsing.", agentic: "Natural-language semantic retrieval across files and synonymous expressions." },
    { dimension: "Finding answers", traditional: "Open multiple files and manually assemble conclusions.", agentic: "Retrieve sources first, then generate a reviewable answer." },
    { dimension: "Trust", traditional: "Depends on memory and manual judgment.", agentic: "Answers are tied to source snippets and can be checked against originals." },
    { dimension: "Follow-up work", traditional: "Search again and restate background every time.", agentic: "Memory keeps recent context; Router decides whether retrieval is needed." },
  ],
  limits: [
    "The validation set is still small and does not cover many long-chain tasks.",
    "Router decisions can still fail when intent is ambiguous or context is insufficient.",
    "Multi-tool collaboration still needs Planner, state management, and failure recovery.",
  ],
  documents: [
    { label: "Project case page", href: "./docs/local-knowledge-rag/index.html" },
    { label: "Download English Product Case Study PDF", href: "./assets/docs/local-knowledge-rag-case-study-en.pdf", type: "download", downloadName: "local-knowledge-rag-case-study-en.pdf" },
    { label: "View Chinese Product Design Document PDF", href: "./assets/docs/local-knowledge-rag-prd-zh.pdf" },
    { label: "V1/V2 comparison", href: "./docs/local-knowledge-rag/index.html#comparison" },
    { label: "AI PM role", href: "./docs/local-knowledge-rag/index.html#role" },
  ],
});

window.portfolioDataEn.aigcCases = [
  {
    id: "residential",
    label: "Residential entrance concept",
    brief: "Turn vague direction such as premium, warm, and welcoming into structured generation fields for design discussion.",
    fields: { projectType: "High-end residential", style: "Modern oriental", usage: "Design workshop", view: "Human-eye entrance view", focus: "Arrival experience, warm lighting, premium facade" },
    prompt: "High-end residential entrance, modern oriental architecture, stone facade, warm lighting, hotel-like arrival experience, human-eye view, realistic scale, refined residential quality.",
    negative: "No text, no watermark, no exaggerated forms, no distorted perspective, no unrealistic proportions.",
    candidates: [
      { label: "Direction A", tag: "Usable", note: "Close to the desired arrival atmosphere." },
      { label: "Direction B", tag: "Needs edits", note: "Lighting works, facade proportion needs adjustment." },
      { label: "Direction C", tag: "Reference only", note: "Material and color are useful; composition is unstable." },
    ],
    score: "Basically usable",
    boundary: "Useful for direction exploration, not for final architectural rendering delivery.",
  },
];

window.portfolioDataEn.ragSources = [
  { name: "Project documents", type: "PRD / review notes", update: "Weekly", coverage: "Business goals, workflows, acceptance criteria, and review context." },
  { name: "Research notes", type: "Market / user notes", update: "As needed", coverage: "User scenarios, competitor references, and decision background." },
  { name: "Template library", type: "Reusable drafts", update: "Monthly", coverage: "Report structures, product descriptions, and review templates." },
];

window.portfolioDataEn.ragQuestions = [
  {
    id: "q1",
    type: "Source-grounded QA",
    question: "What is the positioning of this product case?",
    answer: "The case is positioned as a local Agentic RAG assistant for personal knowledge work. It focuses on retrieval, source grounding, task routing, and controllable automation.",
    citations: ["Product brief", "Validation notes"],
    retrieved: "The system should help users find local materials, verify sources, summarize work, and continue follow-up tasks.",
    reviewNote: "Usable as a portfolio summary, but should be adapted to the target job description.",
    score: "Usable",
    draft: "This project is a local Agentic RAG assistant for personal knowledge work, designed around source-grounded retrieval, task routing, and controlled automation.",
  },
];

window.portfolioDataEn.workflowSteps = [
  { status: "To submit", owner: "Submitter", action: "Fill in project type, review phase, and required attachments.", outcome: "One unified material entry point." },
  { status: "Submitted", owner: "Submitter", action: "Submit for pre-review with version and notes.", outcome: "Reviewers see one consistent version." },
  { status: "Pre-review", owner: "Reviewer", action: "Check completeness, mark missing items, and record return reasons.", outcome: "Follow-up actions are traceable." },
  { status: "Returned", owner: "Submitter", action: "Fix attachments or version naming and resubmit.", outcome: "Less repeated verbal confirmation." },
  { status: "In review", owner: "Review team", action: "Record comments, conclusions, and next actions.", outcome: "Review feedback becomes structured." },
  { status: "Completed", owner: "Manager", action: "Review history, responsibilities, and follow-up status.", outcome: "Projects are traceable and reviewable." },
];

window.portfolioDataEn.workflowModules = [
  { title: "Submission", body: "Unified entry, project type, review phase, attachment templates, and required checks." },
  { title: "Pre-review", body: "Review queue, completeness check, return flow, and version view." },
  { title: "Review records", body: "Conclusions, comment categories, next actions, owners, and deadlines." },
  { title: "Status flow", body: "Current node, reminders, history, and role permissions." },
];

window.portfolioDataEn.workflowValidation = [
  { scene: "Material submission", result: "Usable", note: "Submission requirements became more consistent." },
  { scene: "Pre-review", result: "Usable", note: "Collection and checking became more efficient." },
  { scene: "Review record retention", result: "Basically usable", note: "Better retention, with adoption still needed." },
];
