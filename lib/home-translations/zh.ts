import { HomeTranslation } from "./types";

export const homeZh = {
  hero: {
    descriptionLines: [
      "轻松实现协同编辑。",
      "由 CRDT 驱动。",
      "为本地优先的软件而生。",
    ],
    titleLines: ["重新定义", "状态", "管理"],
    connector: "借助",
    emphasis: "CRDT",
  },
  cta: {
    getStarted: "开始使用",
  },
  sections: {
    richTextDemo: "富文本编辑器演示",
    syncHeading: ["轻松同步文档，", "即使在点对点环境下"],
    whatYouCanBuild: "你可以构建什么",
    whatYouCanBuildDescription:
      "Loro 提供协同状态层，你负责界面、认证、存储和传输。",
  },
  features: {
    intro: "Loro 是一个用于本地优先实时协作的高性能 CRDT 库。",
    items: [
      {
        title: "高性能",
        description: "针对内存、CPU 和加载速度进行了优化，具备先进的性能原语。",
      },
      {
        title: "丰富的 CRDT 类型支持",
        description: "轻松将类 JSON 数据转换为可协作的类型。",
      },
      {
        title: "实时协作与版本控制",
        description: "即使在实时协作时，也能保留类似 Git 的完整版本历史。",
      },
      {
        title: "简单直观的 API",
        description: "从开发者体验出发进行设计。",
      },
    ],
  },
  customerWall: {
    heading: "哪些团队在使用 Loro",
  },
  build: {
    cards: [
      {
        title: "协同文档",
        description: "类文档编辑器，具备在线状态、历史记录和无冲突合并。",
        ariaLabel: "文档",
        links: [{ href: "/docs/tutorial/text", label: "教程" }],
      },
      {
        title: "设计工具",
        description: "类 Figma 画布，支持列表/树、撤销/重做和实时同步。",
        ariaLabel: "设计",
        links: [
          { href: "/docs/tutorial/tree", label: "树" },
          { href: "/docs/tutorial/list", label: "可移动列表" },
        ],
      },
      {
        title: "数据仪表板",
        description: "类 Airtable 表格，共享 JSON 状态、快照和历史。",
        ariaLabel: "仪表板",
        links: [{ href: "/docs/tutorial/persistence", label: "持久化" }],
      },
      {
        title: "多人游戏",
        description: "共享的游戏状态，支持无冲突更新和时间线回放。",
        ariaLabel: "游戏",
        links: [],
      },
      {
        title: "聊天应用",
        description: "消息流支持离线同步、在线状态和无冲突的历史记录。",
        ariaLabel: "聊天",
        links: [{ href: "/docs/tutorial/list", label: "列表" }],
      },
      {
        title: "效率应用",
        description: "类 Notion 工作区，支持共享块、任务和知识库。",
        ariaLabel: "效率",
        links: [],
      },
    ],
    linkSeparator: " · ",
  },
  support: {
    heading: "Loro 如何助你一臂之力",
    cards: [
      {
        title: "构建本地优先协作",
        description: [
          "Loro 帮助你构建离线优先的软件，在重新联网后自动同步，并最大限度避免冲突。",
        ],
      },
      {
        title: "前沿算法",
        description: [
          "在我们的博客 ",
          {
            type: "link",
            href: "https://www.loro.dev/blog/loro-update-october-2024",
            label: "更新：2024 年 10 月",
            isExternal: true,
          },
          " 中了解最新的 CRDT 研究成果和多人协作经验。",
        ],
      },
      {
        title: "富文本 CRDT",
        description: [
          "Loro 管理的富文本 CRDT 擅长合并并发的样式编辑，尽可能保留每位用户的原始意图。欢迎阅读我们的博客 ",
          {
            type: "link",
            href: "/blog/loro-richtext",
            label: "Loro 的富文本 CRDT",
            isExternal: true,
            className: "underline",
          },
          " 了解更多。",
        ],
      },
      {
        title: "基于可移动树的层级数据",
        description: [
          "对于需要目录式数据操作的应用，Loro 采用 ",
          {
            type: "link",
            href: "https://ieeexplore.ieee.org/document/9563274",
            label: "A Highly-Available Move Operation for Replicated Trees",
            isExternal: true,
            className: "underline italic",
          },
          " 中的算法，简化层级数据结构的移动与重组。",
        ],
      },
    ],
  },
  followOnGitHub: {
    label: "在 GitHub 上关注我们",
    ariaLabel: "在 GitHub 上关注我们",
  },
} satisfies HomeTranslation;

export default homeZh;
