export type HeadingEntry = {
  depth: number;
  text: string;
  id: string;
};

export type ContentKind = "page" | "docs" | "blog" | "changelog";

export type ContentEntry = {
  route: string;
  slug: string;
  sourcePath: string;
  title: string;
  description: string;
  date: string | null;
  image: string | null;
  headings: HeadingEntry[];
  kind: ContentKind;
  tocEnabled: boolean;
  paginationEnabled: boolean;
  layout: "raw" | "default";
  prevRoute: string | null;
  prevTitle: string | null;
  nextRoute: string | null;
  nextTitle: string | null;
};

export type DocsNavNode =
  | { kind: "page"; title: string; route: string }
  | { kind: "section"; title: string; route: null; children: DocsNavNode[] };

export const contentEntries: Record<string, ContentEntry> = {
  "/about": {
    "route": "/about",
    "slug": "about",
    "sourcePath": "pages/about.mdx",
    "title": "About",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "page",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/crdt-richtext": {
    "route": "/blog/crdt-richtext",
    "slug": "crdt-richtext",
    "sourcePath": "pages/blog/crdt-richtext.mdx",
    "title": "crdt-richtext - Rust implementation of Peritext and Fugue",
    "description": "Presenting a new Rust crate that combines Peritext and Fugue's power with impressive performance, tailored specifically for rich text. This crate's functionality is set to be incorporated into Loro, a general-purpose CRDT library currently under development.",
    "date": "2023/04/20",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "The interleaving problem",
        "id": "the-interleaving-problem"
      },
      {
        "depth": 2,
        "text": "Example",
        "id": "example"
      },
      {
        "depth": 2,
        "text": "Data structure",
        "id": "data-structure"
      },
      {
        "depth": 2,
        "text": "Encoding",
        "id": "encoding"
      },
      {
        "depth": 2,
        "text": "Heavily tested by libFuzzer",
        "id": "heavily-tested-by-libfuzzer"
      },
      {
        "depth": 2,
        "text": "Benchmark",
        "id": "benchmark"
      },
      {
        "depth": 3,
        "text": "**B4: Real-world editing dataset**",
        "id": "b4-real-world-editing-dataset"
      },
      {
        "depth": 3,
        "text": "**[B4 x 100] Real-world editing dataset 100 times**",
        "id": "b4-x-100-real-world-editing-dataset-100-times"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/loro-mirror": {
    "route": "/blog/loro-mirror",
    "slug": "loro-mirror",
    "sourcePath": "pages/blog/loro-mirror.mdx",
    "title": "Loro Mirror: Make UI State Collaborative by Mirroring to CRDTs",
    "description": "Loro Mirror keeps a typed, immutable app‑state view in sync with a Loro CRDT document. Local `setState` edits become granular CRDT operations; incoming CRDT events update your state. You keep familiar React patterns and gain collaboration, offline edits, and history. ",
    "date": "2025/09/22",
    "image": "/images/loro-mirror.png",
    "headings": [
      {
        "depth": 2,
        "text": "Overview",
        "id": "overview"
      },
      {
        "depth": 2,
        "text": "Why this exists",
        "id": "why-this-exists"
      },
      {
        "depth": 2,
        "text": "What Mirror provides",
        "id": "what-mirror-provides"
      },
      {
        "depth": 2,
        "text": "How to use",
        "id": "how-to-use"
      },
      {
        "depth": 3,
        "text": "Basic Example",
        "id": "basic-example"
      },
      {
        "depth": 3,
        "text": "React Example",
        "id": "react-example"
      },
      {
        "depth": 2,
        "text": "Where we’re going",
        "id": "where-were-going"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/loro-now-open-source": {
    "route": "/blog/loro-now-open-source",
    "slug": "loro-now-open-source",
    "sourcePath": "pages/blog/loro-now-open-source.mdx",
    "title": "Loro: Reimagine State Management with CRDTs",
    "description": "Loro, our high-performance CRDTs library, is now open source.  In this article, we share our vision for the local-first software development paradigm, why we're excited about it, and the current status of Loro.",
    "date": "2023/11/13",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Envisioning the Local-First Development Paradigm",
        "id": "envisioning-the-local-first-development-paradigm"
      },
      {
        "depth": 3,
        "text": "What are Conflict-Free Replicated Data Types (CRDTs)?",
        "id": "what-are-conflict-free-replicated-data-types-crdts"
      },
      {
        "depth": 3,
        "text": "When you can't use CRDTs",
        "id": "when-you-cant-use-crdts"
      },
      {
        "depth": 3,
        "text": "Integrating CRDTs with UI State Management",
        "id": "integrating-crdts-with-ui-state-management"
      },
      {
        "depth": 2,
        "text": "Introduction to Loro",
        "id": "introduction-to-loro"
      },
      {
        "depth": 3,
        "text": "CRDTs",
        "id": "crdts"
      },
      {
        "depth": 4,
        "text": "OT-like CRDTs",
        "id": "ot-like-crdts"
      },
      {
        "depth": 4,
        "text": "Rich Text CRDTs",
        "id": "rich-text-crdts"
      },
      {
        "depth": 4,
        "text": "Movable Tree",
        "id": "movable-tree"
      },
      {
        "depth": 3,
        "text": "Data Structures",
        "id": "data-structures"
      },
      {
        "depth": 3,
        "text": "The Future",
        "id": "the-future"
      },
      {
        "depth": 2,
        "text": "Seeking Collaborative Project Opportunities",
        "id": "seeking-collaborative-project-opportunities"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/loro-protocol": {
    "route": "/blog/loro-protocol",
    "slug": "loro-protocol",
    "sourcePath": "pages/blog/loro-protocol.mdx",
    "title": "Loro Protocol",
    "description": "The Loro Protocol multiplexes CRDT sync workloads over one WebSocket connection and ships the open-source loro-websocket, loro-adaptors, plus Rust client and server implementations that speak the same protocol.",
    "date": "2025/10/30",
    "image": "/images/blog-loro-protocol.png",
    "headings": [
      {
        "depth": 2,
        "text": "Loro Protocol",
        "id": "loro-protocol"
      },
      {
        "depth": 3,
        "text": "Quick Start: Server & Client Example",
        "id": "quick-start-server-client-example"
      },
      {
        "depth": 3,
        "text": "Features",
        "id": "features"
      },
      {
        "depth": 4,
        "text": "Multiplexing",
        "id": "multiplexing"
      },
      {
        "depth": 4,
        "text": "Compatibility",
        "id": "compatibility"
      },
      {
        "depth": 4,
        "text": "Experimental E2E Encryption",
        "id": "experimental-e2e-encryption"
      },
      {
        "depth": 3,
        "text": "Status and Licensing",
        "id": "status-and-licensing"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/loro-richtext": {
    "route": "/blog/loro-richtext",
    "slug": "loro-richtext",
    "sourcePath": "pages/blog/loro-richtext.mdx",
    "title": "Introduction to Loro's Rich Text CRDT",
    "description": "This article presents the rich text CRDT algorithm implemented in Loro, complying with Peritext's criteria for seamless rich text collaboration. Furthermore, it can be built on top of any List CRDT algorithms and turn them into rich text CRDTs.",
    "date": "2024/01/22",
    "image": "https://i.ibb.co/rsX5vR6/cover-long.png",
    "headings": [
      {
        "depth": 2,
        "text": "Background",
        "id": "background"
      },
      {
        "depth": 3,
        "text": "Recap on List CRDTs",
        "id": "recap-on-list-crdts"
      },
      {
        "depth": 3,
        "text": "Brief Introduction to Event Graph Walker",
        "id": "brief-introduction-to-event-graph-walker"
      },
      {
        "depth": 3,
        "text": "Brief Introduction to Peritext",
        "id": "brief-introduction-to-peritext"
      },
      {
        "depth": 3,
        "text": "Why Original Peritext Can't Be Directly Used with Eg-walker",
        "id": "why-original-peritext-cant-be-directly-used-with-eg-walker"
      },
      {
        "depth": 2,
        "text": "Loro's Rich Text CRDT",
        "id": "loros-rich-text-crdt"
      },
      {
        "depth": 3,
        "text": "Algorithm",
        "id": "algorithm"
      },
      {
        "depth": 4,
        "text": "Local Behavior",
        "id": "local-behavior"
      },
      {
        "depth": 4,
        "text": "Merging Remote Updates",
        "id": "merging-remote-updates"
      },
      {
        "depth": 4,
        "text": "Strong Eventual Consistency",
        "id": "strong-eventual-consistency"
      },
      {
        "depth": 3,
        "text": "Criteria in Peritext",
        "id": "criteria-in-peritext"
      },
      {
        "depth": 4,
        "text": "1. Concurrent Formatting and Insertion",
        "id": "1-concurrent-formatting-and-insertion"
      },
      {
        "depth": 4,
        "text": "2. Overlapping Formatting",
        "id": "2-overlapping-formatting"
      },
      {
        "depth": 4,
        "text": "3. Text Insertion at Span Boundaries",
        "id": "3-text-insertion-at-span-boundaries"
      },
      {
        "depth": 4,
        "text": "4. Styles that Support Overlapping",
        "id": "4-styles-that-support-overlapping"
      },
      {
        "depth": 2,
        "text": "Implementation of Loro's Rich Text Algorithm",
        "id": "implementation-of-loros-rich-text-algorithm"
      },
      {
        "depth": 3,
        "text": "Architecture of Loro",
        "id": "architecture-of-loro"
      },
      {
        "depth": 3,
        "text": "Implementation of Loro's Rich Text CRDT",
        "id": "implementation-of-loros-rich-text-crdt"
      },
      {
        "depth": 3,
        "text": "Testing",
        "id": "testing"
      },
      {
        "depth": 2,
        "text": "How to Use",
        "id": "how-to-use"
      },
      {
        "depth": 2,
        "text": "Summary",
        "id": "summary"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/movable-tree": {
    "route": "/blog/movable-tree",
    "slug": "movable-tree",
    "sourcePath": "pages/blog/movable-tree.mdx",
    "title": "Movable tree CRDTs and Loro's implementation",
    "description": "This article introduces the implementation difficulties and challenges of Movable Tree CRDTs when collaboration, and how Loro implements it and sorts child nodes. The algorithm has high performance and can be used in production.",
    "date": "2024/07/18",
    "image": "https://i.ibb.co/nMrgzZJ/DALL-E-2024-01-31-21-29-16-Create-a-black-and-white-illustration-with-a-black-background-that-matche.png",
    "headings": [
      {
        "depth": 2,
        "text": "Background",
        "id": "background"
      },
      {
        "depth": 3,
        "text": "Conflicts in Movable Trees",
        "id": "conflicts-in-movable-trees"
      },
      {
        "depth": 4,
        "text": "Deletion and Movement of the Same Node",
        "id": "deletion-and-movement-of-the-same-node"
      },
      {
        "depth": 4,
        "text": "Moving the Same Node Under Different Parents",
        "id": "moving-the-same-node-under-different-parents"
      },
      {
        "depth": 4,
        "text": "Movement of Different Nodes Resulting in a Cycle",
        "id": "movement-of-different-nodes-resulting-in-a-cycle"
      },
      {
        "depth": 4,
        "text": "Ancestor Node Deletion and Descendant Node Movement",
        "id": "ancestor-node-deletion-and-descendant-node-movement"
      },
      {
        "depth": 3,
        "text": "How Popular Applications Handle Conflicts",
        "id": "how-popular-applications-handle-conflicts"
      },
      {
        "depth": 2,
        "text": "Movable Tree CRDTs",
        "id": "movable-tree-crdts"
      },
      {
        "depth": 3,
        "text": "A highly-available move operation for replicated trees",
        "id": "a-highly-available-move-operation-for-replicated-trees"
      },
      {
        "depth": 4,
        "text": "Globally Ordered Logical Timestamps",
        "id": "globally-ordered-logical-timestamps"
      },
      {
        "depth": 4,
        "text": "Apply a Remote Operation",
        "id": "apply-a-remote-operation"
      },
      {
        "depth": 3,
        "text": "CRDT: Mutable Tree Hierarchy",
        "id": "crdt-mutable-tree-hierarchy"
      },
      {
        "depth": 2,
        "text": "Movable Tree CRDTs implementation in Loro",
        "id": "movable-tree-crdts-implementation-in-loro"
      },
      {
        "depth": 3,
        "text": "Potential Conflicts in Child Node Sorting",
        "id": "potential-conflicts-in-child-node-sorting"
      },
      {
        "depth": 3,
        "text": "Implementation and Encoding Size",
        "id": "implementation-and-encoding-size"
      },
      {
        "depth": 3,
        "text": "Related work",
        "id": "related-work"
      },
      {
        "depth": 2,
        "text": "Benchmark",
        "id": "benchmark"
      },
      {
        "depth": 2,
        "text": "Usage",
        "id": "usage"
      },
      {
        "depth": 3,
        "text": "Demo",
        "id": "demo"
      },
      {
        "depth": 2,
        "text": "Summary",
        "id": "summary"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/blog/v1.0": {
    "route": "/blog/v1.0",
    "slug": "v1.0",
    "sourcePath": "pages/blog/v1.0.mdx",
    "title": "Loro 1.0",
    "description": "Announcing Loro 1.0: Introducing a stable encoding schema, 10-100x faster document import, advanced version control, and more for efficient real-time collaboration and local-first software development.",
    "date": "2024/10/23",
    "image": "https://i.ibb.co/T1x1bSf/IMG-8191.jpg",
    "headings": [
      {
        "depth": 2,
        "text": "Features of Loro 1.0",
        "id": "features-of-loro-10"
      },
      {
        "depth": 3,
        "text": "High-performance CRDTs",
        "id": "high-performance-crdts"
      },
      {
        "depth": 3,
        "text": "Rich CRDT types",
        "id": "rich-crdt-types"
      },
      {
        "depth": 3,
        "text": "Version control",
        "id": "version-control"
      },
      {
        "depth": 3,
        "text": "Leveraging the potential of the [Eg-walker](https://arxiv.org/abs/2409.14252)",
        "id": "leveraging-the-potential-of-the-eg-walkerhttpsarxivorgabs240914252"
      },
      {
        "depth": 4,
        "text": "Shallow Snapshot",
        "id": "shallow-snapshot"
      },
      {
        "depth": 4,
        "text": "Optimized Document Format",
        "id": "optimized-document-format"
      },
      {
        "depth": 4,
        "text": "Benchmarks",
        "id": "benchmarks"
      },
      {
        "depth": 2,
        "text": "Next Steps for Loro",
        "id": "next-steps-for-loro"
      },
      {
        "depth": 3,
        "text": "Loro Version Controller",
        "id": "loro-version-controller"
      },
      {
        "depth": 2,
        "text": "Conclusion",
        "id": "conclusion"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/inspector-v0.1.0": {
    "route": "/changelog/inspector-v0.1.0",
    "slug": "inspector-v0.1.0",
    "sourcePath": "pages/changelog/inspector-v0.1.0.mdx",
    "title": "Release Loro Inspector v0.1.0",
    "description": "",
    "date": "2025/04/30",
    "image": null,
    "headings": [],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.0.0-beta": {
    "route": "/changelog/v1.0.0-beta",
    "slug": "v1.0.0-beta",
    "sourcePath": "pages/changelog/v1.0.0-beta.mdx",
    "title": "Release Loro v1.0.0",
    "description": "",
    "date": "2024/10/21",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "LoroText",
        "id": "lorotext"
      },
      {
        "depth": 3,
        "text": "LoroList",
        "id": "lorolist"
      },
      {
        "depth": 3,
        "text": "LoroMovableList",
        "id": "loromovablelist"
      },
      {
        "depth": 3,
        "text": "LoroMap",
        "id": "loromap"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree"
      },
      {
        "depth": 3,
        "text": "UndoManager",
        "id": "undomanager"
      },
      {
        "depth": 2,
        "text": "Changes",
        "id": "changes"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc-1"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree-1"
      },
      {
        "depth": 2,
        "text": "Deprecation",
        "id": "deprecation"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc-2"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.1.0": {
    "route": "/changelog/v1.1.0",
    "slug": "v1.1.0",
    "sourcePath": "pages/changelog/v1.1.0.mdx",
    "title": "Release Loro v1.1.0",
    "description": "",
    "date": "2024/11/09",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "LoroText",
        "id": "lorotext"
      },
      {
        "depth": 3,
        "text": "LoroMap",
        "id": "loromap"
      },
      {
        "depth": 3,
        "text": "LoroList",
        "id": "lorolist"
      },
      {
        "depth": 3,
        "text": "LoroMovableList",
        "id": "loromovablelist"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.2.0": {
    "route": "/changelog/v1.2.0",
    "slug": "v1.2.0",
    "sourcePath": "pages/changelog/v1.2.0.mdx",
    "title": "Release Loro v1.2.0",
    "description": "",
    "date": "2024/12/10",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "VersionVector",
        "id": "versionvector"
      },
      {
        "depth": 2,
        "text": "Change",
        "id": "change"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.3.0": {
    "route": "/changelog/v1.3.0",
    "slug": "v1.3.0",
    "sourcePath": "pages/changelog/v1.3.0.mdx",
    "title": "Release Loro v1.3.0",
    "description": "",
    "date": "2025/01/09",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.4.0": {
    "route": "/changelog/v1.4.0",
    "slug": "v1.4.0",
    "sourcePath": "pages/changelog/v1.4.0.mdx",
    "title": "Release Loro v1.4.0",
    "description": "",
    "date": "2025/02/13",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.4.7": {
    "route": "/changelog/v1.4.7",
    "slug": "v1.4.7",
    "sourcePath": "pages/changelog/v1.4.7.mdx",
    "title": "Release Loro v1.4.7",
    "description": "",
    "date": "2025/04/01",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.5.0": {
    "route": "/changelog/v1.5.0",
    "slug": "v1.5.0",
    "sourcePath": "pages/changelog/v1.5.0.mdx",
    "title": "Release Loro v1.5.0",
    "description": "",
    "date": "2025/04/04",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "1. New Hooks",
        "id": "1-new-hooks"
      },
      {
        "depth": 3,
        "text": "2. EphemeralStore",
        "id": "2-ephemeralstore"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.6.0": {
    "route": "/changelog/v1.6.0",
    "slug": "v1.6.0",
    "sourcePath": "pages/changelog/v1.6.0.mdx",
    "title": "Release Loro v1.6.0",
    "description": "",
    "date": "2025/08/29",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "v1.0.0 vs v1.6.0",
        "id": "v100-vs-v160"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.8.0": {
    "route": "/changelog/v1.8.0",
    "slug": "v1.8.0",
    "sourcePath": "pages/changelog/v1.8.0.mdx",
    "title": "Release Loro v1.8.0",
    "description": "",
    "date": "2025/09/22",
    "image": null,
    "headings": [
      {
        "depth": 3,
        "text": "Why we changed it",
        "id": "why-we-changed-it"
      },
      {
        "depth": 3,
        "text": "What’s new in 1.8.0",
        "id": "whats-new-in-180"
      },
      {
        "depth": 3,
        "text": "What this means for your app",
        "id": "what-this-means-for-your-app"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/changelog/v1.9.0": {
    "route": "/changelog/v1.9.0",
    "slug": "v1.9.0",
    "sourcePath": "pages/changelog/v1.9.0.mdx",
    "title": "Release Loro v1.9.0",
    "description": "",
    "date": "2025/11/10",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Highlights",
        "id": "highlights"
      },
      {
        "depth": 2,
        "text": "Breaking change",
        "id": "breaking-change"
      },
      {
        "depth": 2,
        "text": "New features & improvements",
        "id": "new-features-improvements"
      },
      {
        "depth": 2,
        "text": "Bug fixes & stability",
        "id": "bug-fixes-stability"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  "/docs/advanced/cid": {
    "route": "/docs/advanced/cid",
    "slug": "cid",
    "sourcePath": "pages/docs/advanced/cid.mdx",
    "title": "Container ID",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Container States and IDs",
        "id": "container-states-and-ids"
      },
      {
        "depth": 2,
        "text": "Container Overwrites",
        "id": "container-overwrites"
      },
      {
        "depth": 3,
        "text": "Best Practices",
        "id": "best-practices"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/when_not_crdt",
    "prevTitle": "When Not to Rely on CRDTs",
    "nextRoute": "/docs/advanced/timestamp",
    "nextTitle": "Storing Timestamps"
  },
  "/docs/advanced/import_batch": {
    "route": "/docs/advanced/import_batch",
    "slug": "import_batch",
    "sourcePath": "pages/docs/advanced/import_batch.mdx",
    "title": "Batch Import",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Performance Differences and Their Causes",
        "id": "performance-differences-and-their-causes"
      },
      {
        "depth": 3,
        "text": "Key Advantages of Import Batch",
        "id": "key-advantages-of-import-batch"
      },
      {
        "depth": 4,
        "text": "1. Single Diff Calculation",
        "id": "1-single-diff-calculation"
      },
      {
        "depth": 4,
        "text": "2. Reduced Communication Overhead",
        "id": "2-reduced-communication-overhead"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/undo",
    "prevTitle": "Undo/Redo",
    "nextRoute": "/docs/advanced/inspector",
    "nextTitle": "Loro Inspector"
  },
  "/docs/advanced/inspector": {
    "route": "/docs/advanced/inspector",
    "slug": "inspector",
    "sourcePath": "pages/docs/advanced/inspector.mdx",
    "title": "Loro Inspector",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/import_batch",
    "prevTitle": "Batch Import",
    "nextRoute": "/docs/advanced/jsonpath",
    "nextTitle": "JSONPath Queries"
  },
  "/docs/advanced/jsonpath": {
    "route": "/docs/advanced/jsonpath",
    "slug": "jsonpath",
    "sourcePath": "pages/docs/advanced/jsonpath.mdx",
    "title": "JSONPath Queries",
    "description": "Learn how to query Loro documents using RFC 9535 JSONPath support.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Preparing Sample Data",
        "id": "preparing-sample-data"
      },
      {
        "depth": 2,
        "text": "Executing JSONPath Queries",
        "id": "executing-jsonpath-queries"
      },
      {
        "depth": 3,
        "text": "Supported Selectors and Filters",
        "id": "supported-selectors-and-filters"
      },
      {
        "depth": 2,
        "text": "Cookbook Examples",
        "id": "cookbook-examples"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/inspector",
    "prevTitle": "Loro Inspector",
    "nextRoute": "/docs/performance/",
    "nextTitle": "JS/WASM Benchmarks"
  },
  "/docs/advanced/timestamp": {
    "route": "/docs/advanced/timestamp",
    "slug": "timestamp",
    "sourcePath": "pages/docs/advanced/timestamp.mdx",
    "title": "Storing Timestamps",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/cid",
    "prevTitle": "Container ID",
    "nextRoute": "/docs/advanced/version_deep_dive",
    "nextTitle": "Loro's Versioning Deep Dive: DAG, Frontiers, and Version Vectors"
  },
  "/docs/advanced/undo": {
    "route": "/docs/advanced/undo",
    "slug": "undo",
    "sourcePath": "pages/docs/advanced/undo.mdx",
    "title": "Undo/Redo",
    "description": "how to use loro undo manager and show all APIs of loro undo manager.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 3,
        "text": "Why Local Undo/Redo?",
        "id": "why-local-undoredo"
      },
      {
        "depth": 2,
        "text": "Usage",
        "id": "usage"
      },
      {
        "depth": 2,
        "text": "Limitations",
        "id": "limitations"
      },
      {
        "depth": 2,
        "text": "Restoring Selections",
        "id": "restoring-selections"
      },
      {
        "depth": 3,
        "text": "Solution",
        "id": "solution"
      },
      {
        "depth": 2,
        "text": "Demonstration",
        "id": "demonstration"
      },
      {
        "depth": 2,
        "text": "Understanding the Undo/Redo Stack",
        "id": "understanding-the-undoredo-stack"
      },
      {
        "depth": 3,
        "text": "How the Callbacks Work",
        "id": "how-the-callbacks-work"
      },
      {
        "depth": 3,
        "text": "Understanding Action Merging",
        "id": "understanding-action-merging"
      },
      {
        "depth": 3,
        "text": "Stack Operations Flow",
        "id": "stack-operations-flow"
      },
      {
        "depth": 3,
        "text": "Manual Grouping with `groupStart` and `groupEnd`",
        "id": "manual-grouping-with-groupstart-and-groupend"
      },
      {
        "depth": 3,
        "text": "Example: Text Editing with Undo/Redo",
        "id": "example-text-editing-with-undoredo"
      },
      {
        "depth": 3,
        "text": "Cursor Efficiency",
        "id": "cursor-efficiency"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/version_deep_dive",
    "prevTitle": "Loro's Versioning Deep Dive: DAG, Frontiers, and Version Vectors",
    "nextRoute": "/docs/advanced/import_batch",
    "nextTitle": "Batch Import"
  },
  "/docs/advanced/version_deep_dive": {
    "route": "/docs/advanced/version_deep_dive",
    "slug": "version_deep_dive",
    "sourcePath": "pages/docs/advanced/version_deep_dive.mdx",
    "title": "Loro's Versioning Deep Dive: DAG, Frontiers, and Version Vectors",
    "description": "The concept of several versions in Loro, DAG, Frontiers, and Version Vectors",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Background Knowledge",
        "id": "background-knowledge"
      },
      {
        "depth": 2,
        "text": "Version Vector",
        "id": "version-vector"
      },
      {
        "depth": 2,
        "text": "Directed Acyclic Graph (DAG) History",
        "id": "directed-acyclic-graph-dag-history"
      },
      {
        "depth": 2,
        "text": "Frontiers",
        "id": "frontiers"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/timestamp",
    "prevTitle": "Storing Timestamps",
    "nextRoute": "/docs/advanced/undo",
    "nextTitle": "Undo/Redo"
  },
  "/docs/api/js": {
    "route": "/docs/api/js",
    "slug": "js",
    "sourcePath": "pages/docs/api/js.mdx",
    "title": "JavaScript API",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Overview",
        "id": "overview"
      },
      {
        "depth": 2,
        "text": "Pitfalls & Best Practices",
        "id": "pitfalls-best-practices"
      },
      {
        "depth": 2,
        "text": "Common Tasks & Examples",
        "id": "common-tasks-examples"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "Configuration Methods",
        "id": "configuration-methods"
      },
      {
        "depth": 3,
        "text": "Container Access Methods",
        "id": "container-access-methods"
      },
      {
        "depth": 3,
        "text": "Import/Export Methods",
        "id": "importexport-methods"
      },
      {
        "depth": 2,
        "text": "Versioning",
        "id": "versioning"
      },
      {
        "depth": 3,
        "text": "Version Control Methods",
        "id": "version-control-methods"
      },
      {
        "depth": 2,
        "text": "Events & Transactions",
        "id": "events-transactions"
      },
      {
        "depth": 3,
        "text": "Subscription Methods",
        "id": "subscription-methods"
      },
      {
        "depth": 3,
        "text": "Transaction Methods",
        "id": "transaction-methods"
      },
      {
        "depth": 3,
        "text": "Query Methods",
        "id": "query-methods"
      },
      {
        "depth": 3,
        "text": "Pre-Commit Hook",
        "id": "pre-commit-hook"
      },
      {
        "depth": 3,
        "text": "Cursor Utilities",
        "id": "cursor-utilities"
      },
      {
        "depth": 3,
        "text": "Pending Operations",
        "id": "pending-operations"
      },
      {
        "depth": 3,
        "text": "Change Graph & History",
        "id": "change-graph-history"
      },
      {
        "depth": 3,
        "text": "Revert & Apply Diff",
        "id": "revert-apply-diff"
      },
      {
        "depth": 3,
        "text": "Detached Editing",
        "id": "detached-editing"
      },
      {
        "depth": 3,
        "text": "Commit Options Helpers",
        "id": "commit-options-helpers"
      },
      {
        "depth": 3,
        "text": "Version & Frontier Utilities",
        "id": "version-frontier-utilities"
      },
      {
        "depth": 3,
        "text": "JSONPath & Path Queries",
        "id": "jsonpath-path-queries"
      },
      {
        "depth": 3,
        "text": "Shallow Doc Utilities",
        "id": "shallow-doc-utilities"
      },
      {
        "depth": 3,
        "text": "JSON Serialization with Replacer",
        "id": "json-serialization-with-replacer"
      },
      {
        "depth": 3,
        "text": "Stats & Introspection",
        "id": "stats-introspection"
      },
      {
        "depth": 3,
        "text": "Import/Export Utilities",
        "id": "importexport-utilities"
      },
      {
        "depth": 2,
        "text": "Container Types",
        "id": "container-types"
      },
      {
        "depth": 3,
        "text": "LoroText",
        "id": "lorotext"
      },
      {
        "depth": 3,
        "text": "LoroList",
        "id": "lorolist"
      },
      {
        "depth": 3,
        "text": "LoroMap",
        "id": "loromap"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree"
      },
      {
        "depth": 3,
        "text": "LoroTreeNode",
        "id": "lorotreenode"
      },
      {
        "depth": 3,
        "text": "LoroCounter",
        "id": "lorocounter"
      },
      {
        "depth": 3,
        "text": "LoroMovableList",
        "id": "loromovablelist"
      },
      {
        "depth": 2,
        "text": "Synchronization",
        "id": "synchronization"
      },
      {
        "depth": 3,
        "text": "Import/Export Patterns",
        "id": "importexport-patterns"
      },
      {
        "depth": 4,
        "text": "Basic Synchronization",
        "id": "basic-synchronization"
      },
      {
        "depth": 4,
        "text": "Continuous Sync",
        "id": "continuous-sync"
      },
      {
        "depth": 4,
        "text": "Network Sync with WebSocket",
        "id": "network-sync-with-websocket"
      },
      {
        "depth": 3,
        "text": "Shallow Snapshots",
        "id": "shallow-snapshots"
      },
      {
        "depth": 2,
        "text": "Version Control",
        "id": "version-control"
      },
      {
        "depth": 3,
        "text": "Time Travel",
        "id": "time-travel"
      },
      {
        "depth": 3,
        "text": "Forking",
        "id": "forking"
      },
      {
        "depth": 3,
        "text": "Version Vectors",
        "id": "version-vectors"
      },
      {
        "depth": 2,
        "text": "Events & Subscriptions",
        "id": "events-subscriptions"
      },
      {
        "depth": 3,
        "text": "Event Structure",
        "id": "event-structure"
      },
      {
        "depth": 3,
        "text": "Diff Types",
        "id": "diff-types"
      },
      {
        "depth": 4,
        "text": "TextDiff",
        "id": "textdiff"
      },
      {
        "depth": 4,
        "text": "ListDiff",
        "id": "listdiff"
      },
      {
        "depth": 4,
        "text": "MapDiff",
        "id": "mapdiff"
      },
      {
        "depth": 4,
        "text": "TreeDiff",
        "id": "treediff"
      },
      {
        "depth": 3,
        "text": "Deep Subscription",
        "id": "deep-subscription"
      },
      {
        "depth": 2,
        "text": "Undo/Redo",
        "id": "undoredo"
      },
      {
        "depth": 3,
        "text": "UndoManager",
        "id": "undomanager"
      },
      {
        "depth": 3,
        "text": "Custom Undo Handlers",
        "id": "custom-undo-handlers"
      },
      {
        "depth": 2,
        "text": "Types & Interfaces",
        "id": "types-interfaces"
      },
      {
        "depth": 3,
        "text": "Core Types",
        "id": "core-types"
      },
      {
        "depth": 3,
        "text": "Version Types",
        "id": "version-types"
      },
      {
        "depth": 3,
        "text": "Change Types",
        "id": "change-types"
      },
      {
        "depth": 3,
        "text": "Cursor Types",
        "id": "cursor-types"
      },
      {
        "depth": 3,
        "text": "Delta Type",
        "id": "delta-type"
      },
      {
        "depth": 2,
        "text": "Utility Functions",
        "id": "utility-functions"
      },
      {
        "depth": 3,
        "text": "Frontier Encoding",
        "id": "frontier-encoding"
      },
      {
        "depth": 3,
        "text": "Debugging",
        "id": "debugging"
      },
      {
        "depth": 3,
        "text": "Import Blob Metadata",
        "id": "import-blob-metadata"
      },
      {
        "depth": 2,
        "text": "EphemeralStore",
        "id": "ephemeralstore"
      },
      {
        "depth": 3,
        "text": "EphemeralStore",
        "id": "ephemeralstore-1"
      },
      {
        "depth": 3,
        "text": "Complete Example",
        "id": "complete-example"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/performance/docsize",
    "prevTitle": "Document Size",
    "nextRoute": "/docs/examples",
    "nextTitle": "Examples"
  },
  "/docs/concepts/attached_detached": {
    "route": "/docs/concepts/attached_detached",
    "slug": "attached_detached",
    "sourcePath": "pages/docs/concepts/attached_detached.mdx",
    "title": "Attached vs Detached States",
    "description": "Understanding attached and detached states in Loro - two different but related concepts",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Document States",
        "id": "document-states"
      },
      {
        "depth": 3,
        "text": "Attached (Default)",
        "id": "attached-default"
      },
      {
        "depth": 3,
        "text": "Detached (Time Travel)",
        "id": "detached-time-travel"
      },
      {
        "depth": 2,
        "text": "Container States",
        "id": "container-states"
      },
      {
        "depth": 3,
        "text": "Detached (Standalone)",
        "id": "detached-standalone"
      },
      {
        "depth": 3,
        "text": "Attached (Document Member)",
        "id": "attached-document-member"
      },
      {
        "depth": 2,
        "text": "Key Differences",
        "id": "key-differences"
      },
      {
        "depth": 2,
        "text": "Common Use Cases",
        "id": "common-use-cases"
      },
      {
        "depth": 3,
        "text": "Time Travel",
        "id": "time-travel"
      },
      {
        "depth": 3,
        "text": "Container Templates",
        "id": "container-templates"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/container",
    "prevTitle": "Container",
    "nextRoute": "/docs/concepts/oplog_docstate",
    "nextTitle": "OpLog and DocState Separation"
  },
  "/docs/concepts/choose_crdt_type": {
    "route": "/docs/concepts/choose_crdt_type",
    "slug": "choose_crdt_type",
    "sourcePath": "pages/docs/concepts/choose_crdt_type.mdx",
    "title": "How to Choose the Right CRDT Types",
    "description": "Loro supports many CRDT types. You need to choose the correct type to model the data based on the algorithm semantics.",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/shallow_snapshots",
    "prevTitle": "Shallow Snapshots and Redaction",
    "nextRoute": "/docs/concepts/when_not_crdt",
    "nextTitle": "When Not to Rely on CRDTs"
  },
  "/docs/concepts/container": {
    "route": "/docs/concepts/container",
    "slug": "container",
    "sourcePath": "pages/docs/concepts/container.mdx",
    "title": "Container",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Container Types",
        "id": "container-types"
      },
      {
        "depth": 2,
        "text": "Container States: Attached vs Detached",
        "id": "container-states-attached-vs-detached"
      },
      {
        "depth": 3,
        "text": "Detached Containers",
        "id": "detached-containers"
      },
      {
        "depth": 3,
        "text": "Attached Containers",
        "id": "attached-containers"
      },
      {
        "depth": 2,
        "text": "Container IDs",
        "id": "container-ids"
      },
      {
        "depth": 2,
        "text": "Working with Containers",
        "id": "working-with-containers"
      },
      {
        "depth": 3,
        "text": "Creating Root Containers",
        "id": "creating-root-containers"
      },
      {
        "depth": 3,
        "text": "Nesting Containers",
        "id": "nesting-containers"
      },
      {
        "depth": 2,
        "text": "Container Overwrites",
        "id": "container-overwrites"
      },
      {
        "depth": 3,
        "text": "Best Practices",
        "id": "best-practices"
      },
      {
        "depth": 2,
        "text": "Related Concepts",
        "id": "related-concepts"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/crdt",
    "prevTitle": "What are CRDTs",
    "nextRoute": "/docs/concepts/attached_detached",
    "nextTitle": "Attached vs Detached States"
  },
  "/docs/concepts/crdt": {
    "route": "/docs/concepts/crdt",
    "slug": "crdt",
    "sourcePath": "pages/docs/concepts/crdt.mdx",
    "title": "What are CRDTs",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/tips",
    "prevTitle": "Tips and Tricks",
    "nextRoute": "/docs/concepts/container",
    "nextTitle": "Container"
  },
  "/docs/concepts/cursor_stable_positions": {
    "route": "/docs/concepts/cursor_stable_positions",
    "slug": "cursor_stable_positions",
    "sourcePath": "pages/docs/concepts/cursor_stable_positions.mdx",
    "title": "Cursor and Stable Positions",
    "description": "Understanding cursor and stable position systems in Loro for maintaining accurate positions across concurrent edits",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "How It Works",
        "id": "how-it-works"
      },
      {
        "depth": 2,
        "text": "Side Parameter",
        "id": "side-parameter"
      },
      {
        "depth": 2,
        "text": "Common Use Cases",
        "id": "common-use-cases"
      },
      {
        "depth": 3,
        "text": "Text Selections",
        "id": "text-selections"
      },
      {
        "depth": 3,
        "text": "List Positions",
        "id": "list-positions"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/version_vector",
    "prevTitle": "Version Vector",
    "nextRoute": "/docs/concepts/import_status",
    "nextTitle": "Import Status and Pending Operations"
  },
  "/docs/concepts/event_graph_walker": {
    "route": "/docs/concepts/event_graph_walker",
    "slug": "event_graph_walker",
    "sourcePath": "pages/docs/concepts/event_graph_walker.mdx",
    "title": "Event Graph Walker (Eg-Walker)",
    "description": "Comprehensive guide to Event Graph Walker (Eg-Walker), a revolutionary CRDT algorithm that enables simpler metadata and better performance in Loro",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "The Problem: Complex CRDT Metadata",
        "id": "the-problem-complex-crdt-metadata"
      },
      {
        "depth": 2,
        "text": "The Innovation: Simple Indices with Smart Replay",
        "id": "the-innovation-simple-indices-with-smart-replay"
      },
      {
        "depth": 3,
        "text": "Core Concept",
        "id": "core-concept"
      },
      {
        "depth": 2,
        "text": "How It Works",
        "id": "how-it-works"
      },
      {
        "depth": 3,
        "text": "The Event Graph",
        "id": "the-event-graph"
      },
      {
        "depth": 3,
        "text": "The Algorithm",
        "id": "the-algorithm"
      },
      {
        "depth": 4,
        "text": "1. **Local Operations: Direct and Fast**",
        "id": "1-local-operations-direct-and-fast"
      },
      {
        "depth": 4,
        "text": "2. **Merging Remote Operations: Smart Replay**",
        "id": "2-merging-remote-operations-smart-replay"
      },
      {
        "depth": 4,
        "text": "3. **Index Transformation**",
        "id": "3-index-transformation"
      },
      {
        "depth": 2,
        "text": "Performance Benefits",
        "id": "performance-benefits"
      },
      {
        "depth": 3,
        "text": "1. **Reduced Storage**",
        "id": "1-reduced-storage"
      },
      {
        "depth": 3,
        "text": "2. **Faster Local Updates**",
        "id": "2-faster-local-updates"
      },
      {
        "depth": 3,
        "text": "3. **Efficient Synchronization**",
        "id": "3-efficient-synchronization"
      },
      {
        "depth": 2,
        "text": "Implementation in Loro",
        "id": "implementation-in-loro"
      },
      {
        "depth": 2,
        "text": "Garbage Collection Revolution",
        "id": "garbage-collection-revolution"
      },
      {
        "depth": 3,
        "text": "Traditional CRDTs",
        "id": "traditional-crdts"
      },
      {
        "depth": 3,
        "text": "With Eg-Walker",
        "id": "with-eg-walker"
      },
      {
        "depth": 2,
        "text": "Research Foundation",
        "id": "research-foundation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/peerid_management",
    "prevTitle": "PeerID Management",
    "nextRoute": "/docs/concepts/shallow_snapshots",
    "nextTitle": "Shallow Snapshots and Redaction"
  },
  "/docs/concepts/frontiers": {
    "route": "/docs/concepts/frontiers",
    "slug": "frontiers",
    "sourcePath": "pages/docs/concepts/frontiers.mdx",
    "title": "Frontiers",
    "description": "Understanding Frontiers in Loro - a compact way to represent document versions",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "What are Frontiers?",
        "id": "what-are-frontiers"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "When to Use Frontiers",
        "id": "when-to-use-frontiers"
      },
      {
        "depth": 2,
        "text": "Quick Comparison",
        "id": "quick-comparison"
      },
      {
        "depth": 2,
        "text": "Practical Example",
        "id": "practical-example"
      },
      {
        "depth": 2,
        "text": "Important Limitation",
        "id": "important-limitation"
      },
      {
        "depth": 2,
        "text": "Conversion with Version Vectors",
        "id": "conversion-with-version-vectors"
      },
      {
        "depth": 2,
        "text": "Learn More",
        "id": "learn-more"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/transaction_model",
    "prevTitle": "Transaction Model",
    "nextRoute": "/docs/concepts/version_vector",
    "nextTitle": "Version Vector"
  },
  "/docs/concepts/import_status": {
    "route": "/docs/concepts/import_status",
    "slug": "import_status",
    "sourcePath": "pages/docs/concepts/import_status.mdx",
    "title": "Import Status and Pending Operations",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Status Structure",
        "id": "status-structure"
      },
      {
        "depth": 2,
        "text": "Pending Operations",
        "id": "pending-operations"
      },
      {
        "depth": 3,
        "text": "Common Scenario: Out-of-Order Delivery",
        "id": "common-scenario-out-of-order-delivery"
      },
      {
        "depth": 2,
        "text": "Handling Pending Operations",
        "id": "handling-pending-operations"
      },
      {
        "depth": 2,
        "text": "Best Practices",
        "id": "best-practices"
      },
      {
        "depth": 3,
        "text": "Always Check Status",
        "id": "always-check-status"
      },
      {
        "depth": 3,
        "text": "Use Batch Import",
        "id": "use-batch-import"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/cursor_stable_positions",
    "prevTitle": "Cursor and Stable Positions",
    "nextRoute": "/docs/concepts/peerid_management",
    "nextTitle": "PeerID Management"
  },
  "/docs/concepts/operations_changes": {
    "route": "/docs/concepts/operations_changes",
    "slug": "operations_changes",
    "sourcePath": "pages/docs/concepts/operations_changes.mdx",
    "title": "Operations and Changes",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Key Concepts",
        "id": "key-concepts"
      },
      {
        "depth": 3,
        "text": "Operations",
        "id": "operations"
      },
      {
        "depth": 3,
        "text": "Changes",
        "id": "changes"
      },
      {
        "depth": 2,
        "text": "Automatic Merging",
        "id": "automatic-merging"
      },
      {
        "depth": 2,
        "text": "When New Changes Are Created",
        "id": "when-new-changes-are-created"
      },
      {
        "depth": 2,
        "text": "Impact on Sync & Storage",
        "id": "impact-on-sync-storage"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/oplog_docstate",
    "prevTitle": "OpLog and DocState Separation",
    "nextRoute": "/docs/concepts/transaction_model",
    "nextTitle": "Transaction Model"
  },
  "/docs/concepts/oplog_docstate": {
    "route": "/docs/concepts/oplog_docstate",
    "slug": "oplog_docstate",
    "sourcePath": "pages/docs/concepts/oplog_docstate.mdx",
    "title": "OpLog and DocState Separation",
    "description": "Understanding Loro's architectural separation of OpLog and DocState for efficient CRDT operations and version control",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Key Concepts",
        "id": "key-concepts"
      },
      {
        "depth": 2,
        "text": "Benefits",
        "id": "benefits"
      },
      {
        "depth": 2,
        "text": "Time Travel & Detachment",
        "id": "time-travel-detachment"
      },
      {
        "depth": 2,
        "text": "Export Strategies",
        "id": "export-strategies"
      },
      {
        "depth": 2,
        "text": "Common Patterns",
        "id": "common-patterns"
      },
      {
        "depth": 3,
        "text": "Relay Server (OpLog Only)",
        "id": "relay-server-oplog-only"
      },
      {
        "depth": 2,
        "text": "Best Practices",
        "id": "best-practices"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/attached_detached",
    "prevTitle": "Attached vs Detached States",
    "nextRoute": "/docs/concepts/operations_changes",
    "nextTitle": "Operations and Changes"
  },
  "/docs/concepts/peerid_management": {
    "route": "/docs/concepts/peerid_management",
    "slug": "peerid_management",
    "sourcePath": "pages/docs/concepts/peerid_management.mdx",
    "title": "PeerID Management",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Key Concepts",
        "id": "key-concepts"
      },
      {
        "depth": 2,
        "text": "Peer ID Assignment",
        "id": "peer-id-assignment"
      },
      {
        "depth": 3,
        "text": "Automatic (Default)",
        "id": "automatic-default"
      },
      {
        "depth": 3,
        "text": "Manual",
        "id": "manual"
      },
      {
        "depth": 2,
        "text": "Counter System",
        "id": "counter-system"
      },
      {
        "depth": 2,
        "text": "Common Pitfalls",
        "id": "common-pitfalls"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/import_status",
    "prevTitle": "Import Status and Pending Operations",
    "nextRoute": "/docs/concepts/event_graph_walker",
    "nextTitle": "Event Graph Walker (Eg-Walker)"
  },
  "/docs/concepts/shallow_snapshots": {
    "route": "/docs/concepts/shallow_snapshots",
    "slug": "shallow_snapshots",
    "sourcePath": "pages/docs/concepts/shallow_snapshots.mdx",
    "title": "Shallow Snapshots and Redaction",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "Content Redaction",
        "id": "content-redaction"
      },
      {
        "depth": 2,
        "text": "Synchronization Limitations",
        "id": "synchronization-limitations"
      },
      {
        "depth": 2,
        "text": "Common Patterns",
        "id": "common-patterns"
      },
      {
        "depth": 3,
        "text": "Archive and Trim",
        "id": "archive-and-trim"
      },
      {
        "depth": 3,
        "text": "Privacy-Aware Design",
        "id": "privacy-aware-design"
      },
      {
        "depth": 2,
        "text": "Best Practices",
        "id": "best-practices"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/event_graph_walker",
    "prevTitle": "Event Graph Walker (Eg-Walker)",
    "nextRoute": "/docs/concepts/choose_crdt_type",
    "nextTitle": "How to Choose the Right CRDT Types"
  },
  "/docs/concepts/transaction_model": {
    "route": "/docs/concepts/transaction_model",
    "slug": "transaction_model",
    "sourcePath": "pages/docs/concepts/transaction_model.mdx",
    "title": "Transaction Model",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Key Concepts",
        "id": "key-concepts"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "How Transactions Work",
        "id": "how-transactions-work"
      },
      {
        "depth": 3,
        "text": "Pending Operations",
        "id": "pending-operations"
      },
      {
        "depth": 3,
        "text": "Implicit Commits",
        "id": "implicit-commits"
      },
      {
        "depth": 3,
        "text": "Transaction Guarantees",
        "id": "transaction-guarantees"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/operations_changes",
    "prevTitle": "Operations and Changes",
    "nextRoute": "/docs/concepts/frontiers",
    "nextTitle": "Frontiers"
  },
  "/docs/concepts/version_vector": {
    "route": "/docs/concepts/version_vector",
    "slug": "version_vector",
    "sourcePath": "pages/docs/concepts/version_vector.mdx",
    "title": "Version Vector",
    "description": "Understanding Version Vectors in Loro - complete peer state tracking for synchronization",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "What is a Version Vector?",
        "id": "what-is-a-version-vector"
      },
      {
        "depth": 2,
        "text": "Key Characteristics",
        "id": "key-characteristics"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "When to Use Version Vectors",
        "id": "when-to-use-version-vectors"
      },
      {
        "depth": 2,
        "text": "Comparison with Frontiers",
        "id": "comparison-with-frontiers"
      },
      {
        "depth": 2,
        "text": "Conversion with Frontiers",
        "id": "conversion-with-frontiers"
      },
      {
        "depth": 2,
        "text": "Related Documentation",
        "id": "related-documentation"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/frontiers",
    "prevTitle": "Frontiers",
    "nextRoute": "/docs/concepts/cursor_stable_positions",
    "nextTitle": "Cursor and Stable Positions"
  },
  "/docs/concepts/when_not_crdt": {
    "route": "/docs/concepts/when_not_crdt",
    "slug": "when_not_crdt",
    "sourcePath": "pages/docs/concepts/when_not_crdt.mdx",
    "title": "When Not to Rely on CRDTs",
    "description": "When CRDTs are not the right tool: hard invariants, exclusivity, ordering, and validation",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Quick Reference",
        "id": "quick-reference"
      },
      {
        "depth": 2,
        "text": "Why CRDTs fall short here",
        "id": "why-crdts-fall-short-here"
      },
      {
        "depth": 2,
        "text": "Common problem scenarios",
        "id": "common-problem-scenarios"
      },
      {
        "depth": 3,
        "text": "1) Exclusive resource management",
        "id": "1-exclusive-resource-management"
      },
      {
        "depth": 3,
        "text": "2) Financial transactions",
        "id": "2-financial-transactions"
      },
      {
        "depth": 3,
        "text": "Other cases to avoid CRDT-as-the-only-source",
        "id": "other-cases-to-avoid-crdt-as-the-only-source"
      },
      {
        "depth": 2,
        "text": "When CRDTs work well",
        "id": "when-crdts-work-well"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/concepts/choose_crdt_type",
    "prevTitle": "How to Choose the Right CRDT Types",
    "nextRoute": "/docs/advanced/cid",
    "nextTitle": "Container ID"
  },
  "/docs/examples": {
    "route": "/docs/examples",
    "slug": "examples",
    "sourcePath": "pages/docs/examples.mdx",
    "title": "Examples",
    "description": "The examples of basic usage in Loro",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 3,
        "text": "loro-prosemirror",
        "id": "loro-prosemirror"
      },
      {
        "depth": 3,
        "text": "loro-codemirror",
        "id": "loro-codemirror"
      },
      {
        "depth": 3,
        "text": "loro-inspector",
        "id": "loro-inspector"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/api/js",
    "prevTitle": "JavaScript API",
    "nextRoute": "/docs/llm",
    "nextTitle": "LLM Resources"
  },
  "/docs/": {
    "route": "/docs/",
    "slug": "index",
    "sourcePath": "pages/docs/index.mdx",
    "title": "Introduction to Loro",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Introduction to Loro",
        "id": "introduction-to-loro"
      },
      {
        "depth": 2,
        "text": "Is Loro Right for You?",
        "id": "is-loro-right-for-you"
      },
      {
        "depth": 3,
        "text": "✅ Use Loro when you need:",
        "id": "-use-loro-when-you-need"
      },
      {
        "depth": 3,
        "text": "⚠️ Consider alternatives when:",
        "id": "-consider-alternatives-when"
      },
      {
        "depth": 2,
        "text": "Differences from other CRDT libraries",
        "id": "differences-from-other-crdt-libraries"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": "/docs/tutorial/get_started",
    "nextTitle": "Getting Started"
  },
  "/docs/llm": {
    "route": "/docs/llm",
    "slug": "llm",
    "sourcePath": "pages/docs/llm.md",
    "title": "LLM Resources",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/examples",
    "prevTitle": "Examples",
    "nextRoute": null,
    "nextTitle": null
  },
  "/docs/performance/docsize": {
    "route": "/docs/performance/docsize",
    "slug": "docsize",
    "sourcePath": "pages/docs/performance/docsize.md",
    "title": "Document Size",
    "description": "Comparing the document size of Loro and popular CRDTs",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/performance/native",
    "prevTitle": "Native Benchmarks",
    "nextRoute": "/docs/api/js",
    "nextTitle": "JavaScript API"
  },
  "/docs/performance/": {
    "route": "/docs/performance/",
    "slug": "index",
    "sourcePath": "pages/docs/performance/index.md",
    "title": "JS/WASM Benchmarks",
    "description": "CRDT benchmarks, comparing the performance of Loro and popular CRDTs",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 4,
        "text": "B1: No conflicts",
        "id": "b1-no-conflicts"
      },
      {
        "depth": 4,
        "text": "B2: Two users producing conflicts",
        "id": "b2-two-users-producing-conflicts"
      },
      {
        "depth": 4,
        "text": "B3: Many conflicts",
        "id": "b3-many-conflicts"
      },
      {
        "depth": 4,
        "text": "B4: Real-world editing dataset",
        "id": "b4-real-world-editing-dataset"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/advanced/jsonpath",
    "prevTitle": "JSONPath Queries",
    "nextRoute": "/docs/performance/native",
    "nextTitle": "Native Benchmarks"
  },
  "/docs/performance/native": {
    "route": "/docs/performance/native",
    "slug": "native",
    "sourcePath": "pages/docs/performance/native.mdx",
    "title": "Native Benchmarks",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/performance/",
    "prevTitle": "JS/WASM Benchmarks",
    "nextRoute": "/docs/performance/docsize",
    "nextTitle": "Document Size"
  },
  "/docs/tutorial/composition": {
    "route": "/docs/tutorial/composition",
    "slug": "composition",
    "sourcePath": "pages/docs/tutorial/composition.mdx",
    "title": "Composing CRDTs",
    "description": "Everyone can effectively model the states and the updates of documents that conform to the JSON schema.",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/text",
    "prevTitle": "Text",
    "nextRoute": "/docs/tutorial/list",
    "nextTitle": "List and Movable List"
  },
  "/docs/tutorial/counter": {
    "route": "/docs/tutorial/counter",
    "slug": "counter",
    "sourcePath": "pages/docs/tutorial/counter.mdx",
    "title": "Counter",
    "description": "how to use loro counter crdt and show all APIs of loro counter crdt.",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/tree",
    "prevTitle": "Tree",
    "nextRoute": "/docs/tutorial/version",
    "nextTitle": "Version"
  },
  "/docs/tutorial/cursor": {
    "route": "/docs/tutorial/cursor",
    "slug": "cursor",
    "sourcePath": "pages/docs/tutorial/cursor.mdx",
    "title": "Cursor",
    "description": "How to use Loro to implement cursor position in real-time collaboration",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Motivation",
        "id": "motivation"
      },
      {
        "depth": 2,
        "text": "Updating Cursors",
        "id": "updating-cursors"
      },
      {
        "depth": 2,
        "text": "Example",
        "id": "example"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/persistence",
    "prevTitle": "Persistence",
    "nextRoute": "/docs/tutorial/time_travel",
    "nextTitle": "Time Travel"
  },
  "/docs/tutorial/encoding": {
    "route": "/docs/tutorial/encoding",
    "slug": "encoding",
    "sourcePath": "pages/docs/tutorial/encoding.mdx",
    "title": "Export Mode",
    "description": "Introduce how to encode and decode Loro documents, and how to persist data",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Updates Encoding",
        "id": "updates-encoding"
      },
      {
        "depth": 2,
        "text": "Snapshot Encoding",
        "id": "snapshot-encoding"
      },
      {
        "depth": 2,
        "text": "Shallow Snapshot Encoding",
        "id": "shallow-snapshot-encoding"
      },
      {
        "depth": 2,
        "text": "Loro's Snapshot File Format",
        "id": "loros-snapshot-file-format"
      },
      {
        "depth": 3,
        "text": "Encoding Details",
        "id": "encoding-details"
      },
      {
        "depth": 2,
        "text": "Snapshot Encoding Layout",
        "id": "snapshot-encoding-layout"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/event",
    "prevTitle": "Event Handling",
    "nextRoute": "/docs/tutorial/persistence",
    "nextTitle": "Persistence"
  },
  "/docs/tutorial/ephemeral": {
    "route": "/docs/tutorial/ephemeral",
    "slug": "ephemeral",
    "sourcePath": "pages/docs/tutorial/ephemeral.mdx",
    "title": "Ephemeral Store",
    "description": "How to use Loro's ephemeral store feature to implement user awareness and online status management in real-time collaboration.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Example",
        "id": "example"
      },
      {
        "depth": 2,
        "text": "API",
        "id": "api"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/time_travel",
    "prevTitle": "Time Travel",
    "nextRoute": "/docs/tutorial/tips",
    "nextTitle": "Tips and Tricks"
  },
  "/docs/tutorial/event": {
    "route": "/docs/tutorial/event",
    "slug": "event",
    "sourcePath": "pages/docs/tutorial/event.mdx",
    "title": "Event Handling",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Event Emission Points",
        "id": "event-emission-points"
      },
      {
        "depth": 2,
        "text": "Transaction Behavior",
        "id": "transaction-behavior"
      },
      {
        "depth": 2,
        "text": "Triggering a Commit",
        "id": "triggering-a-commit"
      },
      {
        "depth": 2,
        "text": "Transactions in Loro",
        "id": "transactions-in-loro"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/version",
    "prevTitle": "Version",
    "nextRoute": "/docs/tutorial/encoding",
    "nextTitle": "Export Mode"
  },
  "/docs/tutorial/get_started": {
    "route": "/docs/tutorial/get_started",
    "slug": "get_started",
    "sourcePath": "pages/docs/tutorial/get_started.mdx",
    "title": "Getting Started",
    "description": "How to use Loro to build real-time or asynchronous collaboration software.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Install",
        "id": "install"
      },
      {
        "depth": 2,
        "text": "Introduction",
        "id": "introduction"
      },
      {
        "depth": 2,
        "text": "Entry Point: LoroDoc",
        "id": "entry-point-lorodoc"
      },
      {
        "depth": 2,
        "text": "Container",
        "id": "container"
      },
      {
        "depth": 2,
        "text": "Save and Load",
        "id": "save-and-load"
      },
      {
        "depth": 2,
        "text": "Sync",
        "id": "sync"
      },
      {
        "depth": 2,
        "text": "Event",
        "id": "event"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/",
    "prevTitle": "Introduction to Loro",
    "nextRoute": "/docs/tutorial/loro_doc",
    "nextTitle": "Loro Document"
  },
  "/docs/tutorial/list": {
    "route": "/docs/tutorial/list",
    "slug": "list",
    "sourcePath": "pages/docs/tutorial/list.mdx",
    "title": "List and Movable List",
    "description": "how to use loro list and movable list crdt and show all APIs of loro list and movable crdt.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 3,
        "text": "List",
        "id": "list"
      },
      {
        "depth": 3,
        "text": "MovableList",
        "id": "movablelist"
      },
      {
        "depth": 2,
        "text": "Using Cursor on List",
        "id": "using-cursor-on-list"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/composition",
    "prevTitle": "Composing CRDTs",
    "nextRoute": "/docs/tutorial/map",
    "nextTitle": "Map"
  },
  "/docs/tutorial/loro_doc": {
    "route": "/docs/tutorial/loro_doc",
    "slug": "loro_doc",
    "sourcePath": "pages/docs/tutorial/loro_doc.mdx",
    "title": "Loro Document",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 2,
        "text": "Supported Data Types (LoroValue)",
        "id": "supported-data-types-lorovalue"
      },
      {
        "depth": 3,
        "text": "Examples of Storing Different Data Types",
        "id": "examples-of-storing-different-data-types"
      },
      {
        "depth": 2,
        "text": "Container Types",
        "id": "container-types"
      },
      {
        "depth": 3,
        "text": "Text Container",
        "id": "text-container"
      },
      {
        "depth": 3,
        "text": "List Container",
        "id": "list-container"
      },
      {
        "depth": 3,
        "text": "Map Container",
        "id": "map-container"
      },
      {
        "depth": 3,
        "text": "Tree Container",
        "id": "tree-container"
      },
      {
        "depth": 3,
        "text": "MovableList Container",
        "id": "movablelist-container"
      },
      {
        "depth": 2,
        "text": "Collaboration Features",
        "id": "collaboration-features"
      },
      {
        "depth": 2,
        "text": "Undo/Redo Support",
        "id": "undoredo-support"
      },
      {
        "depth": 2,
        "text": "Exporting and Importing",
        "id": "exporting-and-importing"
      },
      {
        "depth": 3,
        "text": "Shallow Import/Export",
        "id": "shallow-importexport"
      },
      {
        "depth": 3,
        "text": "Redacting Sensitive Content",
        "id": "redacting-sensitive-content"
      },
      {
        "depth": 4,
        "text": "Important: Synchronization Considerations",
        "id": "important-synchronization-considerations"
      },
      {
        "depth": 2,
        "text": "Event Subscription",
        "id": "event-subscription"
      },
      {
        "depth": 3,
        "text": "Event Emission",
        "id": "event-emission"
      },
      {
        "depth": 2,
        "text": "Version Control and History",
        "id": "version-control-and-history"
      },
      {
        "depth": 3,
        "text": "Version Representation",
        "id": "version-representation"
      },
      {
        "depth": 3,
        "text": "Checkout and Time Travel",
        "id": "checkout-and-time-travel"
      },
      {
        "depth": 3,
        "text": "Detached Mode",
        "id": "detached-mode"
      },
      {
        "depth": 4,
        "text": "Key Behaviors in Detached Mode",
        "id": "key-behaviors-in-detached-mode"
      },
      {
        "depth": 4,
        "text": "Common Use Cases",
        "id": "common-use-cases"
      },
      {
        "depth": 2,
        "text": "Subscription and Sync",
        "id": "subscription-and-sync"
      },
      {
        "depth": 3,
        "text": "Local Updates Subscription",
        "id": "local-updates-subscription"
      },
      {
        "depth": 3,
        "text": "Document Events",
        "id": "document-events"
      },
      {
        "depth": 3,
        "text": "Container-specific Events",
        "id": "container-specific-events"
      },
      {
        "depth": 2,
        "text": "Advanced Features",
        "id": "advanced-features"
      },
      {
        "depth": 3,
        "text": "Cursor Support",
        "id": "cursor-support"
      },
      {
        "depth": 3,
        "text": "Change Tracking",
        "id": "change-tracking"
      },
      {
        "depth": 3,
        "text": "Advanced Import/Export",
        "id": "advanced-importexport"
      },
      {
        "depth": 3,
        "text": "Path and Value Access",
        "id": "path-and-value-access"
      },
      {
        "depth": 3,
        "text": "Debug and Metadata",
        "id": "debug-and-metadata"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/get_started",
    "prevTitle": "Getting Started",
    "nextRoute": "/docs/tutorial/sync",
    "nextTitle": "Sync"
  },
  "/docs/tutorial/map": {
    "route": "/docs/tutorial/map",
    "slug": "map",
    "sourcePath": "pages/docs/tutorial/map.mdx",
    "title": "Map",
    "description": "how to use loro map crdt and show all APIs of loro map crdt.",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/list",
    "prevTitle": "List and Movable List",
    "nextRoute": "/docs/tutorial/tree",
    "nextTitle": "Tree"
  },
  "/docs/tutorial/persistence": {
    "route": "/docs/tutorial/persistence",
    "slug": "persistence",
    "sourcePath": "pages/docs/tutorial/persistence.mdx",
    "title": "Persistence",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Best Practices for Persisting Loro Documents",
        "id": "best-practices-for-persisting-loro-documents"
      },
      {
        "depth": 3,
        "text": "Balancing Quick Saves and Resource Efficiency",
        "id": "balancing-quick-saves-and-resource-efficiency"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/encoding",
    "prevTitle": "Export Mode",
    "nextRoute": "/docs/tutorial/cursor",
    "nextTitle": "Cursor"
  },
  "/docs/tutorial/sync": {
    "route": "/docs/tutorial/sync",
    "slug": "sync",
    "sourcePath": "pages/docs/tutorial/sync.mdx",
    "title": "Sync",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Sync",
        "id": "sync"
      },
      {
        "depth": 2,
        "text": "Real-time Collaboration",
        "id": "real-time-collaboration"
      },
      {
        "depth": 3,
        "text": "Sync Strategies",
        "id": "sync-strategies"
      },
      {
        "depth": 3,
        "text": "Example",
        "id": "example"
      },
      {
        "depth": 2,
        "text": "Understanding the `import()` Return Value",
        "id": "understanding-the-import-return-value"
      },
      {
        "depth": 3,
        "text": "Fields Explained:",
        "id": "fields-explained"
      },
      {
        "depth": 3,
        "text": "How to Use This Information:",
        "id": "how-to-use-this-information"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/loro_doc",
    "prevTitle": "Loro Document",
    "nextRoute": "/docs/tutorial/text",
    "nextTitle": "Text"
  },
  "/docs/tutorial/text": {
    "route": "/docs/tutorial/text",
    "slug": "text",
    "sourcePath": "pages/docs/tutorial/text.mdx",
    "title": "Text",
    "description": "how to use loro richtext crdt and show all APIs of loro text crdt.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Editor Bindings",
        "id": "editor-bindings"
      },
      {
        "depth": 3,
        "text": "ProseMirror Binding",
        "id": "prosemirror-binding"
      },
      {
        "depth": 3,
        "text": "CodeMirror Binding",
        "id": "codemirror-binding"
      },
      {
        "depth": 2,
        "text": "LoroText vs String",
        "id": "lorotext-vs-string"
      },
      {
        "depth": 3,
        "text": "Merge Semantics",
        "id": "merge-semantics"
      },
      {
        "depth": 3,
        "text": "When to Use String in LoroMap",
        "id": "when-to-use-string-in-loromap"
      },
      {
        "depth": 2,
        "text": "Rich Text Config",
        "id": "rich-text-config"
      },
      {
        "depth": 3,
        "text": "Example",
        "id": "example"
      },
      {
        "depth": 2,
        "text": "Methods",
        "id": "methods"
      },
      {
        "depth": 3,
        "text": "`insert(pos: number, s: string)`",
        "id": "insertpos-number-s-string"
      },
      {
        "depth": 3,
        "text": "`delete(pos: number, len: number)`",
        "id": "deletepos-number-len-number"
      },
      {
        "depth": 3,
        "text": "`slice(start: number, end: number): string`",
        "id": "slicestart-number-end-number-string"
      },
      {
        "depth": 3,
        "text": "`sliceDelta(start: number, end: number): Delta<string>[]`",
        "id": "slicedeltastart-number-end-number-deltastring"
      },
      {
        "depth": 3,
        "text": "`sliceDeltaUtf8(start: number, end: number): Delta<string>[]`",
        "id": "slicedeltautf8start-number-end-number-deltastring"
      },
      {
        "depth": 3,
        "text": "`toString(): string`",
        "id": "tostring-string"
      },
      {
        "depth": 3,
        "text": "`charAt(pos: number): char`",
        "id": "charatpos-number-char"
      },
      {
        "depth": 3,
        "text": "`splice(pos: number, len: number, text: string): string`",
        "id": "splicepos-number-len-number-text-string-string"
      },
      {
        "depth": 3,
        "text": "`length: number`",
        "id": "length-number"
      },
      {
        "depth": 3,
        "text": "`getCursor(pos: number, side?: Side): Cursor | undefined`",
        "id": "getcursorpos-number-side-side-cursor-undefined"
      },
      {
        "depth": 3,
        "text": "`toJSON(): string`",
        "id": "tojson-string"
      },
      {
        "depth": 3,
        "text": "`toDelta(): Delta<string>[]`",
        "id": "todelta-deltastring"
      },
      {
        "depth": 3,
        "text": "Slice a Delta snippet",
        "id": "slice-a-delta-snippet"
      },
      {
        "depth": 3,
        "text": "`mark(range: {start: number, end: number}, key: string, value: any): void`",
        "id": "markrange-start-number-end-number-key-string-value-any-void"
      },
      {
        "depth": 3,
        "text": "`unmark(range: {start: number, end: number}, key: string): void`",
        "id": "unmarkrange-start-number-end-number-key-string-void"
      },
      {
        "depth": 3,
        "text": "`update(text: string)`",
        "id": "updatetext-string"
      },
      {
        "depth": 3,
        "text": "`applyDelta(delta: Delta<string>[]): void`",
        "id": "applydeltadelta-deltastring-void"
      },
      {
        "depth": 3,
        "text": "`subscribe(f: (event: Listener)): number`",
        "id": "subscribef-event-listener-number"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/sync",
    "prevTitle": "Sync",
    "nextRoute": "/docs/tutorial/composition",
    "nextTitle": "Composing CRDTs"
  },
  "/docs/tutorial/time_travel": {
    "route": "/docs/tutorial/time_travel",
    "slug": "time_travel",
    "sourcePath": "pages/docs/tutorial/time_travel.mdx",
    "title": "Time Travel",
    "description": "time travel in Loro",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Read-only Time Travel",
        "id": "read-only-time-travel"
      },
      {
        "depth": 3,
        "text": "Enable Timestamps",
        "id": "enable-timestamps"
      },
      {
        "depth": 3,
        "text": "Implementing Time Travel",
        "id": "implementing-time-travel"
      },
      {
        "depth": 2,
        "text": "Time Travel With Editing",
        "id": "time-travel-with-editing"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/cursor",
    "prevTitle": "Cursor",
    "nextRoute": "/docs/tutorial/ephemeral",
    "nextTitle": "Ephemeral Store"
  },
  "/docs/tutorial/tips": {
    "route": "/docs/tutorial/tips",
    "slug": "tips",
    "sourcePath": "pages/docs/tutorial/tips.mdx",
    "title": "Tips and Tricks",
    "description": "",
    "date": null,
    "image": null,
    "headings": [],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/ephemeral",
    "prevTitle": "Ephemeral Store",
    "nextRoute": "/docs/concepts/crdt",
    "nextTitle": "What are CRDTs"
  },
  "/docs/tutorial/tree": {
    "route": "/docs/tutorial/tree",
    "slug": "tree",
    "sourcePath": "pages/docs/tutorial/tree.mdx",
    "title": "Tree",
    "description": "how to use loro tree crdt and show all APIs of loro tree crdt.",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Node Data",
        "id": "node-data"
      },
      {
        "depth": 2,
        "text": "Ordered Tree Nodes",
        "id": "ordered-tree-nodes"
      },
      {
        "depth": 2,
        "text": "Events",
        "id": "events"
      },
      {
        "depth": 3,
        "text": "Events of node's data",
        "id": "events-of-nodes-data"
      },
      {
        "depth": 2,
        "text": "Retrieving All Nodes",
        "id": "retrieving-all-nodes"
      },
      {
        "depth": 2,
        "text": "Basic Usage",
        "id": "basic-usage"
      },
      {
        "depth": 3,
        "text": "Example",
        "id": "example"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/map",
    "prevTitle": "Map",
    "nextRoute": "/docs/tutorial/counter",
    "nextTitle": "Counter"
  },
  "/docs/tutorial/version": {
    "route": "/docs/tutorial/version",
    "slug": "version",
    "sourcePath": "pages/docs/tutorial/version.mdx",
    "title": "Version",
    "description": "",
    "date": null,
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Learn More",
        "id": "learn-more"
      }
    ],
    "kind": "docs",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": "/docs/tutorial/counter",
    "prevTitle": "Counter",
    "nextRoute": "/docs/tutorial/event",
    "nextTitle": "Event Handling"
  }
};

export const blogEntries: ContentEntry[] = [
  {
    "route": "/blog/loro-protocol",
    "slug": "loro-protocol",
    "sourcePath": "pages/blog/loro-protocol.mdx",
    "title": "Loro Protocol",
    "description": "The Loro Protocol multiplexes CRDT sync workloads over one WebSocket connection and ships the open-source loro-websocket, loro-adaptors, plus Rust client and server implementations that speak the same protocol.",
    "date": "2025/10/30",
    "image": "/images/blog-loro-protocol.png",
    "headings": [
      {
        "depth": 2,
        "text": "Loro Protocol",
        "id": "loro-protocol"
      },
      {
        "depth": 3,
        "text": "Quick Start: Server & Client Example",
        "id": "quick-start-server-client-example"
      },
      {
        "depth": 3,
        "text": "Features",
        "id": "features"
      },
      {
        "depth": 4,
        "text": "Multiplexing",
        "id": "multiplexing"
      },
      {
        "depth": 4,
        "text": "Compatibility",
        "id": "compatibility"
      },
      {
        "depth": 4,
        "text": "Experimental E2E Encryption",
        "id": "experimental-e2e-encryption"
      },
      {
        "depth": 3,
        "text": "Status and Licensing",
        "id": "status-and-licensing"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/loro-mirror",
    "slug": "loro-mirror",
    "sourcePath": "pages/blog/loro-mirror.mdx",
    "title": "Loro Mirror: Make UI State Collaborative by Mirroring to CRDTs",
    "description": "Loro Mirror keeps a typed, immutable app‑state view in sync with a Loro CRDT document. Local `setState` edits become granular CRDT operations; incoming CRDT events update your state. You keep familiar React patterns and gain collaboration, offline edits, and history. ",
    "date": "2025/09/22",
    "image": "/images/loro-mirror.png",
    "headings": [
      {
        "depth": 2,
        "text": "Overview",
        "id": "overview"
      },
      {
        "depth": 2,
        "text": "Why this exists",
        "id": "why-this-exists"
      },
      {
        "depth": 2,
        "text": "What Mirror provides",
        "id": "what-mirror-provides"
      },
      {
        "depth": 2,
        "text": "How to use",
        "id": "how-to-use"
      },
      {
        "depth": 3,
        "text": "Basic Example",
        "id": "basic-example"
      },
      {
        "depth": 3,
        "text": "React Example",
        "id": "react-example"
      },
      {
        "depth": 2,
        "text": "Where we’re going",
        "id": "where-were-going"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/v1.0",
    "slug": "v1.0",
    "sourcePath": "pages/blog/v1.0.mdx",
    "title": "Loro 1.0",
    "description": "Announcing Loro 1.0: Introducing a stable encoding schema, 10-100x faster document import, advanced version control, and more for efficient real-time collaboration and local-first software development.",
    "date": "2024/10/23",
    "image": "https://i.ibb.co/T1x1bSf/IMG-8191.jpg",
    "headings": [
      {
        "depth": 2,
        "text": "Features of Loro 1.0",
        "id": "features-of-loro-10"
      },
      {
        "depth": 3,
        "text": "High-performance CRDTs",
        "id": "high-performance-crdts"
      },
      {
        "depth": 3,
        "text": "Rich CRDT types",
        "id": "rich-crdt-types"
      },
      {
        "depth": 3,
        "text": "Version control",
        "id": "version-control"
      },
      {
        "depth": 3,
        "text": "Leveraging the potential of the [Eg-walker](https://arxiv.org/abs/2409.14252)",
        "id": "leveraging-the-potential-of-the-eg-walkerhttpsarxivorgabs240914252"
      },
      {
        "depth": 4,
        "text": "Shallow Snapshot",
        "id": "shallow-snapshot"
      },
      {
        "depth": 4,
        "text": "Optimized Document Format",
        "id": "optimized-document-format"
      },
      {
        "depth": 4,
        "text": "Benchmarks",
        "id": "benchmarks"
      },
      {
        "depth": 2,
        "text": "Next Steps for Loro",
        "id": "next-steps-for-loro"
      },
      {
        "depth": 3,
        "text": "Loro Version Controller",
        "id": "loro-version-controller"
      },
      {
        "depth": 2,
        "text": "Conclusion",
        "id": "conclusion"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/movable-tree",
    "slug": "movable-tree",
    "sourcePath": "pages/blog/movable-tree.mdx",
    "title": "Movable tree CRDTs and Loro's implementation",
    "description": "This article introduces the implementation difficulties and challenges of Movable Tree CRDTs when collaboration, and how Loro implements it and sorts child nodes. The algorithm has high performance and can be used in production.",
    "date": "2024/07/18",
    "image": "https://i.ibb.co/nMrgzZJ/DALL-E-2024-01-31-21-29-16-Create-a-black-and-white-illustration-with-a-black-background-that-matche.png",
    "headings": [
      {
        "depth": 2,
        "text": "Background",
        "id": "background"
      },
      {
        "depth": 3,
        "text": "Conflicts in Movable Trees",
        "id": "conflicts-in-movable-trees"
      },
      {
        "depth": 4,
        "text": "Deletion and Movement of the Same Node",
        "id": "deletion-and-movement-of-the-same-node"
      },
      {
        "depth": 4,
        "text": "Moving the Same Node Under Different Parents",
        "id": "moving-the-same-node-under-different-parents"
      },
      {
        "depth": 4,
        "text": "Movement of Different Nodes Resulting in a Cycle",
        "id": "movement-of-different-nodes-resulting-in-a-cycle"
      },
      {
        "depth": 4,
        "text": "Ancestor Node Deletion and Descendant Node Movement",
        "id": "ancestor-node-deletion-and-descendant-node-movement"
      },
      {
        "depth": 3,
        "text": "How Popular Applications Handle Conflicts",
        "id": "how-popular-applications-handle-conflicts"
      },
      {
        "depth": 2,
        "text": "Movable Tree CRDTs",
        "id": "movable-tree-crdts"
      },
      {
        "depth": 3,
        "text": "A highly-available move operation for replicated trees",
        "id": "a-highly-available-move-operation-for-replicated-trees"
      },
      {
        "depth": 4,
        "text": "Globally Ordered Logical Timestamps",
        "id": "globally-ordered-logical-timestamps"
      },
      {
        "depth": 4,
        "text": "Apply a Remote Operation",
        "id": "apply-a-remote-operation"
      },
      {
        "depth": 3,
        "text": "CRDT: Mutable Tree Hierarchy",
        "id": "crdt-mutable-tree-hierarchy"
      },
      {
        "depth": 2,
        "text": "Movable Tree CRDTs implementation in Loro",
        "id": "movable-tree-crdts-implementation-in-loro"
      },
      {
        "depth": 3,
        "text": "Potential Conflicts in Child Node Sorting",
        "id": "potential-conflicts-in-child-node-sorting"
      },
      {
        "depth": 3,
        "text": "Implementation and Encoding Size",
        "id": "implementation-and-encoding-size"
      },
      {
        "depth": 3,
        "text": "Related work",
        "id": "related-work"
      },
      {
        "depth": 2,
        "text": "Benchmark",
        "id": "benchmark"
      },
      {
        "depth": 2,
        "text": "Usage",
        "id": "usage"
      },
      {
        "depth": 3,
        "text": "Demo",
        "id": "demo"
      },
      {
        "depth": 2,
        "text": "Summary",
        "id": "summary"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/loro-richtext",
    "slug": "loro-richtext",
    "sourcePath": "pages/blog/loro-richtext.mdx",
    "title": "Introduction to Loro's Rich Text CRDT",
    "description": "This article presents the rich text CRDT algorithm implemented in Loro, complying with Peritext's criteria for seamless rich text collaboration. Furthermore, it can be built on top of any List CRDT algorithms and turn them into rich text CRDTs.",
    "date": "2024/01/22",
    "image": "https://i.ibb.co/rsX5vR6/cover-long.png",
    "headings": [
      {
        "depth": 2,
        "text": "Background",
        "id": "background"
      },
      {
        "depth": 3,
        "text": "Recap on List CRDTs",
        "id": "recap-on-list-crdts"
      },
      {
        "depth": 3,
        "text": "Brief Introduction to Event Graph Walker",
        "id": "brief-introduction-to-event-graph-walker"
      },
      {
        "depth": 3,
        "text": "Brief Introduction to Peritext",
        "id": "brief-introduction-to-peritext"
      },
      {
        "depth": 3,
        "text": "Why Original Peritext Can't Be Directly Used with Eg-walker",
        "id": "why-original-peritext-cant-be-directly-used-with-eg-walker"
      },
      {
        "depth": 2,
        "text": "Loro's Rich Text CRDT",
        "id": "loros-rich-text-crdt"
      },
      {
        "depth": 3,
        "text": "Algorithm",
        "id": "algorithm"
      },
      {
        "depth": 4,
        "text": "Local Behavior",
        "id": "local-behavior"
      },
      {
        "depth": 4,
        "text": "Merging Remote Updates",
        "id": "merging-remote-updates"
      },
      {
        "depth": 4,
        "text": "Strong Eventual Consistency",
        "id": "strong-eventual-consistency"
      },
      {
        "depth": 3,
        "text": "Criteria in Peritext",
        "id": "criteria-in-peritext"
      },
      {
        "depth": 4,
        "text": "1. Concurrent Formatting and Insertion",
        "id": "1-concurrent-formatting-and-insertion"
      },
      {
        "depth": 4,
        "text": "2. Overlapping Formatting",
        "id": "2-overlapping-formatting"
      },
      {
        "depth": 4,
        "text": "3. Text Insertion at Span Boundaries",
        "id": "3-text-insertion-at-span-boundaries"
      },
      {
        "depth": 4,
        "text": "4. Styles that Support Overlapping",
        "id": "4-styles-that-support-overlapping"
      },
      {
        "depth": 2,
        "text": "Implementation of Loro's Rich Text Algorithm",
        "id": "implementation-of-loros-rich-text-algorithm"
      },
      {
        "depth": 3,
        "text": "Architecture of Loro",
        "id": "architecture-of-loro"
      },
      {
        "depth": 3,
        "text": "Implementation of Loro's Rich Text CRDT",
        "id": "implementation-of-loros-rich-text-crdt"
      },
      {
        "depth": 3,
        "text": "Testing",
        "id": "testing"
      },
      {
        "depth": 2,
        "text": "How to Use",
        "id": "how-to-use"
      },
      {
        "depth": 2,
        "text": "Summary",
        "id": "summary"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/loro-now-open-source",
    "slug": "loro-now-open-source",
    "sourcePath": "pages/blog/loro-now-open-source.mdx",
    "title": "Loro: Reimagine State Management with CRDTs",
    "description": "Loro, our high-performance CRDTs library, is now open source.  In this article, we share our vision for the local-first software development paradigm, why we're excited about it, and the current status of Loro.",
    "date": "2023/11/13",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Envisioning the Local-First Development Paradigm",
        "id": "envisioning-the-local-first-development-paradigm"
      },
      {
        "depth": 3,
        "text": "What are Conflict-Free Replicated Data Types (CRDTs)?",
        "id": "what-are-conflict-free-replicated-data-types-crdts"
      },
      {
        "depth": 3,
        "text": "When you can't use CRDTs",
        "id": "when-you-cant-use-crdts"
      },
      {
        "depth": 3,
        "text": "Integrating CRDTs with UI State Management",
        "id": "integrating-crdts-with-ui-state-management"
      },
      {
        "depth": 2,
        "text": "Introduction to Loro",
        "id": "introduction-to-loro"
      },
      {
        "depth": 3,
        "text": "CRDTs",
        "id": "crdts"
      },
      {
        "depth": 4,
        "text": "OT-like CRDTs",
        "id": "ot-like-crdts"
      },
      {
        "depth": 4,
        "text": "Rich Text CRDTs",
        "id": "rich-text-crdts"
      },
      {
        "depth": 4,
        "text": "Movable Tree",
        "id": "movable-tree"
      },
      {
        "depth": 3,
        "text": "Data Structures",
        "id": "data-structures"
      },
      {
        "depth": 3,
        "text": "The Future",
        "id": "the-future"
      },
      {
        "depth": 2,
        "text": "Seeking Collaborative Project Opportunities",
        "id": "seeking-collaborative-project-opportunities"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/blog/crdt-richtext",
    "slug": "crdt-richtext",
    "sourcePath": "pages/blog/crdt-richtext.mdx",
    "title": "crdt-richtext - Rust implementation of Peritext and Fugue",
    "description": "Presenting a new Rust crate that combines Peritext and Fugue's power with impressive performance, tailored specifically for rich text. This crate's functionality is set to be incorporated into Loro, a general-purpose CRDT library currently under development.",
    "date": "2023/04/20",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "The interleaving problem",
        "id": "the-interleaving-problem"
      },
      {
        "depth": 2,
        "text": "Example",
        "id": "example"
      },
      {
        "depth": 2,
        "text": "Data structure",
        "id": "data-structure"
      },
      {
        "depth": 2,
        "text": "Encoding",
        "id": "encoding"
      },
      {
        "depth": 2,
        "text": "Heavily tested by libFuzzer",
        "id": "heavily-tested-by-libfuzzer"
      },
      {
        "depth": 2,
        "text": "Benchmark",
        "id": "benchmark"
      },
      {
        "depth": 3,
        "text": "**B4: Real-world editing dataset**",
        "id": "b4-real-world-editing-dataset"
      },
      {
        "depth": 3,
        "text": "**[B4 x 100] Real-world editing dataset 100 times**",
        "id": "b4-x-100-real-world-editing-dataset-100-times"
      }
    ],
    "kind": "blog",
    "tocEnabled": true,
    "paginationEnabled": false,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  }
];

export const changelogEntries: ContentEntry[] = [
  {
    "route": "/changelog/v1.9.0",
    "slug": "v1.9.0",
    "sourcePath": "pages/changelog/v1.9.0.mdx",
    "title": "Release Loro v1.9.0",
    "description": "",
    "date": "2025/11/10",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "Highlights",
        "id": "highlights"
      },
      {
        "depth": 2,
        "text": "Breaking change",
        "id": "breaking-change"
      },
      {
        "depth": 2,
        "text": "New features & improvements",
        "id": "new-features-improvements"
      },
      {
        "depth": 2,
        "text": "Bug fixes & stability",
        "id": "bug-fixes-stability"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.8.0",
    "slug": "v1.8.0",
    "sourcePath": "pages/changelog/v1.8.0.mdx",
    "title": "Release Loro v1.8.0",
    "description": "",
    "date": "2025/09/22",
    "image": null,
    "headings": [
      {
        "depth": 3,
        "text": "Why we changed it",
        "id": "why-we-changed-it"
      },
      {
        "depth": 3,
        "text": "What’s new in 1.8.0",
        "id": "whats-new-in-180"
      },
      {
        "depth": 3,
        "text": "What this means for your app",
        "id": "what-this-means-for-your-app"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.6.0",
    "slug": "v1.6.0",
    "sourcePath": "pages/changelog/v1.6.0.mdx",
    "title": "Release Loro v1.6.0",
    "description": "",
    "date": "2025/08/29",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "v1.0.0 vs v1.6.0",
        "id": "v100-vs-v160"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/inspector-v0.1.0",
    "slug": "inspector-v0.1.0",
    "sourcePath": "pages/changelog/inspector-v0.1.0.mdx",
    "title": "Release Loro Inspector v0.1.0",
    "description": "",
    "date": "2025/04/30",
    "image": null,
    "headings": [],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.5.0",
    "slug": "v1.5.0",
    "sourcePath": "pages/changelog/v1.5.0.mdx",
    "title": "Release Loro v1.5.0",
    "description": "",
    "date": "2025/04/04",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "1. New Hooks",
        "id": "1-new-hooks"
      },
      {
        "depth": 3,
        "text": "2. EphemeralStore",
        "id": "2-ephemeralstore"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.4.7",
    "slug": "v1.4.7",
    "sourcePath": "pages/changelog/v1.4.7.mdx",
    "title": "Release Loro v1.4.7",
    "description": "",
    "date": "2025/04/01",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.4.0",
    "slug": "v1.4.0",
    "sourcePath": "pages/changelog/v1.4.0.mdx",
    "title": "Release Loro v1.4.0",
    "description": "",
    "date": "2025/02/13",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.3.0",
    "slug": "v1.3.0",
    "sourcePath": "pages/changelog/v1.3.0.mdx",
    "title": "Release Loro v1.3.0",
    "description": "",
    "date": "2025/01/09",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.2.0",
    "slug": "v1.2.0",
    "sourcePath": "pages/changelog/v1.2.0.mdx",
    "title": "Release Loro v1.2.0",
    "description": "",
    "date": "2024/12/10",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "VersionVector",
        "id": "versionvector"
      },
      {
        "depth": 2,
        "text": "Change",
        "id": "change"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.1.0",
    "slug": "v1.1.0",
    "sourcePath": "pages/changelog/v1.1.0.mdx",
    "title": "Release Loro v1.1.0",
    "description": "",
    "date": "2024/11/09",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "LoroText",
        "id": "lorotext"
      },
      {
        "depth": 3,
        "text": "LoroMap",
        "id": "loromap"
      },
      {
        "depth": 3,
        "text": "LoroList",
        "id": "lorolist"
      },
      {
        "depth": 3,
        "text": "LoroMovableList",
        "id": "loromovablelist"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree"
      },
      {
        "depth": 2,
        "text": "Fix",
        "id": "fix"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  },
  {
    "route": "/changelog/v1.0.0-beta",
    "slug": "v1.0.0-beta",
    "sourcePath": "pages/changelog/v1.0.0-beta.mdx",
    "title": "Release Loro v1.0.0",
    "description": "",
    "date": "2024/10/21",
    "image": null,
    "headings": [
      {
        "depth": 2,
        "text": "New",
        "id": "new"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc"
      },
      {
        "depth": 3,
        "text": "LoroText",
        "id": "lorotext"
      },
      {
        "depth": 3,
        "text": "LoroList",
        "id": "lorolist"
      },
      {
        "depth": 3,
        "text": "LoroMovableList",
        "id": "loromovablelist"
      },
      {
        "depth": 3,
        "text": "LoroMap",
        "id": "loromap"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree"
      },
      {
        "depth": 3,
        "text": "UndoManager",
        "id": "undomanager"
      },
      {
        "depth": 2,
        "text": "Changes",
        "id": "changes"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc-1"
      },
      {
        "depth": 3,
        "text": "LoroTree",
        "id": "lorotree-1"
      },
      {
        "depth": 2,
        "text": "Deprecation",
        "id": "deprecation"
      },
      {
        "depth": 3,
        "text": "LoroDoc",
        "id": "lorodoc-2"
      }
    ],
    "kind": "changelog",
    "tocEnabled": true,
    "paginationEnabled": true,
    "layout": "default",
    "prevRoute": null,
    "prevTitle": null,
    "nextRoute": null,
    "nextTitle": null
  }
];

export const docsNavTree: DocsNavNode[] = [
  {
    "kind": "page",
    "title": "Introduction to Loro",
    "route": "/docs/"
  },
  {
    "kind": "section",
    "title": "Tutorial",
    "route": null,
    "children": [
      {
        "kind": "page",
        "title": "Getting Started",
        "route": "/docs/tutorial/get_started"
      },
      {
        "kind": "page",
        "title": "Loro Document",
        "route": "/docs/tutorial/loro_doc"
      },
      {
        "kind": "page",
        "title": "Sync",
        "route": "/docs/tutorial/sync"
      },
      {
        "kind": "page",
        "title": "Text",
        "route": "/docs/tutorial/text"
      },
      {
        "kind": "page",
        "title": "Composing CRDTs",
        "route": "/docs/tutorial/composition"
      },
      {
        "kind": "page",
        "title": "List and Movable List",
        "route": "/docs/tutorial/list"
      },
      {
        "kind": "page",
        "title": "Map",
        "route": "/docs/tutorial/map"
      },
      {
        "kind": "page",
        "title": "Tree",
        "route": "/docs/tutorial/tree"
      },
      {
        "kind": "page",
        "title": "Counter",
        "route": "/docs/tutorial/counter"
      },
      {
        "kind": "page",
        "title": "Version",
        "route": "/docs/tutorial/version"
      },
      {
        "kind": "page",
        "title": "Event Handling",
        "route": "/docs/tutorial/event"
      },
      {
        "kind": "page",
        "title": "Export Mode",
        "route": "/docs/tutorial/encoding"
      },
      {
        "kind": "page",
        "title": "Persistence",
        "route": "/docs/tutorial/persistence"
      },
      {
        "kind": "page",
        "title": "Cursor",
        "route": "/docs/tutorial/cursor"
      },
      {
        "kind": "page",
        "title": "Time Travel",
        "route": "/docs/tutorial/time_travel"
      },
      {
        "kind": "page",
        "title": "Ephemeral Store",
        "route": "/docs/tutorial/ephemeral"
      },
      {
        "kind": "page",
        "title": "Tips and Tricks",
        "route": "/docs/tutorial/tips"
      }
    ]
  },
  {
    "kind": "section",
    "title": "Concepts",
    "route": null,
    "children": [
      {
        "kind": "page",
        "title": "What are CRDTs",
        "route": "/docs/concepts/crdt"
      },
      {
        "kind": "page",
        "title": "Container",
        "route": "/docs/concepts/container"
      },
      {
        "kind": "page",
        "title": "Attached vs Detached States",
        "route": "/docs/concepts/attached_detached"
      },
      {
        "kind": "page",
        "title": "OpLog and DocState Separation",
        "route": "/docs/concepts/oplog_docstate"
      },
      {
        "kind": "page",
        "title": "Operations and Changes",
        "route": "/docs/concepts/operations_changes"
      },
      {
        "kind": "page",
        "title": "Transaction Model",
        "route": "/docs/concepts/transaction_model"
      },
      {
        "kind": "page",
        "title": "Frontiers",
        "route": "/docs/concepts/frontiers"
      },
      {
        "kind": "page",
        "title": "Version Vector",
        "route": "/docs/concepts/version_vector"
      },
      {
        "kind": "page",
        "title": "Cursor and Stable Positions",
        "route": "/docs/concepts/cursor_stable_positions"
      },
      {
        "kind": "page",
        "title": "Import Status and Pending Operations",
        "route": "/docs/concepts/import_status"
      },
      {
        "kind": "page",
        "title": "PeerID Management",
        "route": "/docs/concepts/peerid_management"
      },
      {
        "kind": "page",
        "title": "Event Graph Walker (Eg-Walker)",
        "route": "/docs/concepts/event_graph_walker"
      },
      {
        "kind": "page",
        "title": "Shallow Snapshots and Redaction",
        "route": "/docs/concepts/shallow_snapshots"
      },
      {
        "kind": "page",
        "title": "How to Choose the Right CRDT Types",
        "route": "/docs/concepts/choose_crdt_type"
      },
      {
        "kind": "page",
        "title": "When Not to Rely on CRDTs",
        "route": "/docs/concepts/when_not_crdt"
      }
    ]
  },
  {
    "kind": "section",
    "title": "Advanced Topics",
    "route": null,
    "children": [
      {
        "kind": "page",
        "title": "Container ID",
        "route": "/docs/advanced/cid"
      },
      {
        "kind": "page",
        "title": "Storing Timestamps",
        "route": "/docs/advanced/timestamp"
      },
      {
        "kind": "page",
        "title": "Loro's Versioning Deep Dive: DAG, Frontiers, and Version Vectors",
        "route": "/docs/advanced/version_deep_dive"
      },
      {
        "kind": "page",
        "title": "Undo/Redo",
        "route": "/docs/advanced/undo"
      },
      {
        "kind": "page",
        "title": "Batch Import",
        "route": "/docs/advanced/import_batch"
      },
      {
        "kind": "page",
        "title": "Loro Inspector",
        "route": "/docs/advanced/inspector"
      },
      {
        "kind": "page",
        "title": "JSONPath Queries",
        "route": "/docs/advanced/jsonpath"
      }
    ]
  },
  {
    "kind": "section",
    "title": "Performance",
    "route": null,
    "children": [
      {
        "kind": "page",
        "title": "JS/WASM Benchmarks",
        "route": "/docs/performance/"
      },
      {
        "kind": "page",
        "title": "Native Benchmarks",
        "route": "/docs/performance/native"
      },
      {
        "kind": "page",
        "title": "Document Size",
        "route": "/docs/performance/docsize"
      }
    ]
  },
  {
    "kind": "section",
    "title": "API Reference",
    "route": null,
    "children": [
      {
        "kind": "page",
        "title": "JavaScript API",
        "route": "/docs/api/js"
      }
    ]
  },
  {
    "kind": "page",
    "title": "Examples",
    "route": "/docs/examples"
  },
  {
    "kind": "page",
    "title": "LLM Resources",
    "route": "/docs/llm"
  }
];

export function getContentEntry(route: string): ContentEntry | null {
  return contentEntries[route] ?? null;
}
