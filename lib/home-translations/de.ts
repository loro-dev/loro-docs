import { HomeTranslation } from "./types";

export const homeDe = {
  hero: {
    descriptionLines: [
      "Zusammenarbeit mühelos umsetzen.",
      "Angetrieben von CRDTs.",
      "Entwickelt für Local-First-Software.",
    ],
    titleLines: ["State-Management", "neu denken"],
    connector: "mit",
    emphasis: "CRDTs",
  },
  cta: {
    getStarted: "Loslegen",
  },
  sections: {
    richTextDemo: "Rich-Text-Editor-Demo",
    syncHeading: ["Mühelose Dokument-Synchronisation,", "auch in P2P-Umgebungen"],
    whatYouCanBuild: "Was Sie bauen können",
    whatYouCanBuildDescription:
      "Loro liefert die kollaborative Zustandsschicht. Sie kümmern sich um UI, Authentifizierung, Speicherung und Transport.",
  },
  features: {
    intro:
      "Loro ist eine leistungsstarke CRDT-Bibliothek für lokale, echtzeitfähige Zusammenarbeit.",
    items: [
      {
        title: "Hohe Leistung",
        description:
          "Für Speicher, CPU und Ladegeschwindigkeit mit modernen Performance-Primitiven optimiert.",
      },
      {
        title: "Umfangreiche CRDT-Typen",
        description: "JSON-ähnliche Daten lassen sich mühelos in kollaborative Typen verwandeln.",
      },
      {
        title: "Echtzeit-Zusammenarbeit mit Versionskontrolle",
        description:
          "Bewahrt vollständige Versionshistorien wie Git, selbst während der Echtzeitbearbeitung.",
      },
      {
        title: "Einfache und intuitive API",
        description: "Mit Fokus auf eine großartige Developer Experience gestaltet.",
      },
    ],
  },
  customerWall: {
    heading: "Wer Loro nutzt",
  },
  build: {
    cards: [
      {
        title: "Kollaborative Dokumente",
        description:
          "Dokumenten-Editoren mit Präsenz, Historie und konfliktfreien Zusammenführungen.",
        ariaLabel: "dokumente",
        links: [{ href: "/docs/tutorial/text", label: "Tutorial" }],
      },
      {
        title: "Design-Tools",
        description:
          "Figma-ähnliche Canvas mit Listen/Bäumen, Undo/Redo und Echtzeit-Synchronisation.",
        ariaLabel: "design",
        links: [
          { href: "/docs/tutorial/tree", label: "Baum" },
          { href: "/docs/tutorial/list", label: "Verschiebbare Liste" },
        ],
      },
      {
        title: "Daten-Dashboards",
        description:
          "Airtable-ähnliche Tabellen mit gemeinsam genutztem JSON-Zustand, Snapshots und Historie.",
        ariaLabel: "dashboards",
        links: [{ href: "/docs/tutorial/persistence", label: "Persistenz" }],
      },
      {
        title: "Multiplayer-Spiele",
        description:
          "Geteilter Spielzustand mit konfliktfreien Updates und Timeline-Wiedergabe.",
        ariaLabel: "spiele",
        links: [],
      },
      {
        title: "Chat-Anwendungen",
        description:
          "Nachrichtenströme mit Offline-Synchronisation, Präsenz und konfliktfreier Historie.",
        ariaLabel: "chat",
        links: [{ href: "/docs/tutorial/list", label: "Liste" }],
      },
      {
        title: "Produktivitäts-Apps",
        description:
          "Notion-ähnliche Arbeitsbereiche mit gemeinsamen Blöcken, Aufgaben und Wissensdatenbanken.",
        ariaLabel: "produktivität",
        links: [],
      },
    ],
    linkSeparator: " · ",
  },
  support: {
    heading: "So unterstützt Loro",
    cards: [
      {
        title: "Local-First-Zusammenarbeit aufbauen",
        description: [
          "Loro hilft Ihnen, Software zu entwickeln, die offline funktioniert, beim erneuten Verbinden synchronisiert und Konflikte minimiert.",
        ],
      },
      {
        title: "State-of-the-Art-Algorithmen",
        description: [
          "Lesen Sie in unserem Blog ",
          {
            type: "link",
            href: "https://www.loro.dev/blog/loro-update-october-2024",
            label: "Updates: Oktober 2024",
            isExternal: true,
          },
          ", um mehr über aktuelle CRDT-Forschung und Multiplayer-Erfahrungen zu erfahren.",
        ],
      },
      {
        title: "Rich-Text-CRDT",
        description: [
          "Loro verwaltet Rich-Text-CRDTs, die parallele Stilbearbeitungen zusammenführen und die ursprüngliche Absicht der Nutzer bestmöglich bewahren. Lesen Sie unseren Blog ",
          {
            type: "link",
            href: "/blog/loro-richtext",
            label: "Loros Rich-Text-CRDT",
            isExternal: true,
            className: "underline",
          },
          ", um mehr zu erfahren.",
        ],
      },
      {
        title: "Hierarchische Daten mit Moveable Tree",
        description: [
          "Für Anwendungen mit Verzeichnisstrukturen nutzt Loro den Algorithmus aus ",
          {
            type: "link",
            href: "https://ieeexplore.ieee.org/document/9563274",
            label: "A Highly-Available Move Operation for Replicated Trees",
            isExternal: true,
            className: "underline italic",
          },
          ", um das Verschieben und Reorganisieren hierarchischer Daten zu vereinfachen.",
        ],
      },
    ],
  },
  followOnGitHub: {
    label: "Folgen Sie uns auf GitHub",
    ariaLabel: "Folgen Sie uns auf GitHub",
  },
} satisfies HomeTranslation;

export default homeDe;
