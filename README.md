# AI Product Portfolio

这是一个用于 AI 产品经理求职展示的静态作品集。第一版重点不是完整工程系统，而是展示：

- 如何拆解真实业务问题
- 如何设计 AI 进入工作流
- 如何用可点击 Demo 表达产品方案
- 如何呈现验证结果和产品边界

## 项目结构

```text
ai-product-portfolio/
├── .gitignore
├── index.html
├── src/
│   ├── data.js
│   ├── main.js
│   └── styles/
│       └── main.css
├── public/
│   ├── images/
│   │   ├── aigc/
│   │   ├── rag/
│   │   └── workflow/
│   └── resume.pdf
└── docs/
    ├── 01_AIGC_PRD.md
    ├── 02_RAG_PRD.md
    ├── 03_Workflow_PRD.md
    ├── AIGC_评估表.md
    ├── RAG_验证问题集.md
    ├── B端审批平台_流程说明.md
    └── local-knowledge-rag/
        ├── index.html
        ├── README.md
        ├── product-brief.md
        ├── system-design.md
        ├── indexing-pipeline.md
        ├── evaluation.md
        ├── privacy-and-security.md
        ├── migration-guide.md
        ├── hardware-constraints.md
        ├── diagrams/
        ├── examples/
        └── assets/
```

## 本地打开

直接双击 `index.html`，或在浏览器中打开该文件。

## GitHub Pages 发布

1. 在 GitHub 新建仓库，例如 `ai-product-portfolio`
2. 把本文件夹内容上传到仓库根目录
3. 打开仓库 `Settings` -> `Pages`
4. Source 选择 `Deploy from a branch`
5. Branch 选择 `main`，Folder 选择 `/root`
6. 保存后等待 1-2 分钟，获得可分享链接

## 下一步填充内容

第一版已包含四个项目的展示框架，其中本地 RAG 项目包含首页案例区和公开版文档模块：

1. AIGC 视觉内容生成工作流
2. 企业知识库问答与报告生成
3. B端审批协同平台工作流优化
4. 本地个人知识库 RAG 系统：`docs/local-knowledge-rag/`

后续需要逐步替换为你的真实素材、截图、Prompt、评估表和公开项目说明。私人准备材料不放入公开作品集。

## 新增项目模块

`docs/local-knowledge-rag/` 是本地个人知识库 RAG 系统的 GitHub 公开版封装，包含：

- 产品说明：`product-brief.md`
- 作品集案例页：`portfolio-case.md`
- HTML 展示页：`index.html`
- 系统设计：`system-design.md`
- 索引流程：`indexing-pipeline.md`
- 评估记录：`evaluation.md`
- 隐私边界：`privacy-and-security.md`
- 迁移说明：`migration-guide.md`
- 机器约束：`hardware-constraints.md`
- 架构图：`diagrams/`
- 脱敏示例：`examples/`

该模块只放公开展示材料，不放真实 Obsidian vault、OneDrive 原始文件、Chroma 数据库、转换缓存或私人面试稿。
