import { HomeTranslation } from "./types";

export const homeEn = {
  hero: {
    descriptionLines: [
      "Implement collaboration effortlessly.",
      "Powered by CRDTs.",
      "Built for local-first software.",
    ],
    titleLines: ["Reimagine", "State", "Management"],
    connector: "with",
    emphasis: "CRDTs",
  },
  cta: {
    getStarted: "Get Started",
  },
  sections: {
    richTextDemo: "Rich Text Editor Demo",
    syncHeading: [
      "Effortless Document Synchronization,",
      "Even in P2P Environments",
    ],
    whatYouCanBuild: "What You Can Build",
    whatYouCanBuildDescription:
      "Loro powers the collaborative state layer. You bring UI, auth, storage, and transport.",
  },
  features: {
    intro:
      "Loro is a high-performance CRDT library for local-first, real-time collaboration.",
    items: [
      {
        title: "High Performance",
        description:
          "Optimized for memory, CPU, and loading speed with advanced performance primitives.",
      },
      {
        title: "Rich CRDT Types Support",
        description: "Turn JSON-like data into collaborative types effortlessly",
      },
      {
        title: "Real-Time Collaboration with Version Control",
        description:
          "Preserve full version history like Git, even during real-time collaboration",
      },
      {
        title: "Simple and Intuitive API",
        description: "Designed with developer experience in mind",
      },
    ],
  },
  customerWall: {
    heading: "Who's Using Loro",
  },
  build: {
    cards: [
      {
        title: "Collaborative Documents",
        description:
          "Docs-style editors with presence, history, and conflict-free merges.",
        ariaLabel: "documents",
        links: [{ href: "/docs/tutorial/text", label: "Tutorial" }],
      },
      {
        title: "Design Tools",
        description:
          "Figma-style canvases with lists/trees, undo/redo, and real-time sync.",
        ariaLabel: "design",
        links: [
          { href: "/docs/tutorial/tree", label: "Tree" },
          { href: "/docs/tutorial/list", label: "Movable List" },
        ],
      },
      {
        title: "Data Dashboards",
        description:
          "Airtable-like tables with shared JSON state, snapshots, and history.",
        ariaLabel: "dashboards",
        links: [{ href: "/docs/tutorial/persistence", label: "Persistence" }],
      },
      {
        title: "Multiplayer Games",
        description:
          "Shared game state with conflict-free updates and timeline playback.",
        ariaLabel: "games",
        links: [],
      },
      {
        title: "Chat Applications",
        description:
          "Message streams with offline sync, presence, and conflict-free history.",
        ariaLabel: "chat",
        links: [{ href: "/docs/tutorial/list", label: "List" }],
      },
      {
        title: "Productivity Apps",
        description:
          "Notion-style workspaces with shared blocks, tasks, and knowledge bases.",
        ariaLabel: "productivity",
        links: [],
      },
    ],
    linkSeparator: " · ",
  },
  support: {
    heading: "How Loro Helps",
    cards: [
      {
        title: "Build Local-First Collaboration",
        description: [
          "Loro helps you build software that works offline-first, synchronizes when reconnected, and keeps conflicts at bay.",
        ],
      },
      {
        title: "State of the Art Algorithms",
        description: [
          "Learn about our latest research in CRDTs and multiplayer experiences on our blog, ",
          {
            type: "link",
            href: "https://www.loro.dev/blog/loro-update-october-2024",
            label: "Updates: October 2024",
            isExternal: true,
          },
          ", which explores new breakthroughs and use cases.",
        ],
      },
      {
        title: "Rich Text CRDT",
        description: [
          "Loro manages rich text CRDTs that excel at merging concurrent rich text style edits, maintaining the original intent of each user's input as much as possible. Please read our blog, ",
          {
            type: "link",
            href: "/blog/loro-richtext",
            label: "Loro's Rich Text CRDT",
            isExternal: true,
            className: "underline",
          },
          ", to learn more.",
        ],
      },
      {
        title: "Hierarchical Data with Moveable Tree",
        description: [
          "For applications requiring directory-like data manipulation, Loro utilizes the algorithm from ",
          {
            type: "link",
            href: "https://ieeexplore.ieee.org/document/9563274",
            label: "A Highly-Available Move Operation for Replicated Trees",
            isExternal: true,
            className: "underline italic",
          },
          ", simplifying moving and reorganizing hierarchical data structures.",
        ],
      },
    ],
  },
  followOnGitHub: {
    label: "Follow us on GitHub",
    ariaLabel: "Follow us on GitHub",
  },
} satisfies HomeTranslation;

export default homeEn;
