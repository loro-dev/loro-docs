import { HomeTranslation } from "./types";

export const homeFr = {
  hero: {
    descriptionLines: [
      "Implémentez la collaboration sans effort.",
      "Propulsé par les CRDTs.",
      "Conçu pour les logiciels local-first.",
    ],
    titleLines: ["Réinventez", "la gestion", "d'état"],
    connector: "avec",
    emphasis: "les CRDTs",
  },
  cta: {
    getStarted: "Commencer",
  },
  sections: {
    richTextDemo: "Démo d'éditeur de texte enrichi",
    syncHeading: [
      "Synchronisation des documents sans effort,",
      "même en environnements P2P",
    ],
    whatYouCanBuild: "Ce que vous pouvez créer",
    whatYouCanBuildDescription:
      "Loro fournit la couche d'état collaborative. Vous apportez l'interface, l'authentification, le stockage et le transport.",
  },
  features: {
    intro:
      "Loro est une bibliothèque CRDT haute performance pour la collaboration locale et en temps réel.",
    items: [
      {
        title: "Haute performance",
        description:
          "Optimisée pour la mémoire, le CPU et la vitesse de chargement grâce à des primitives avancées.",
      },
      {
        title: "Large prise en charge des types CRDT",
        description: "Transformez aisément des données de type JSON en structures collaboratives.",
      },
      {
        title: "Collaboration en temps réel avec gestion de versions",
        description:
          "Préservez un historique complet comme Git, même pendant la collaboration en direct.",
      },
      {
        title: "API simple et intuitive",
        description: "Conçue avec l'expérience développeur en tête.",
      },
    ],
  },
  customerWall: {
    heading: "Qui utilise Loro",
  },
  build: {
    cards: [
      {
        title: "Documents collaboratifs",
        description:
          "Éditeurs de documents avec présence, historique et fusions sans conflit.",
        ariaLabel: "documents",
        links: [{ href: "/docs/tutorial/text", label: "Tutoriel" }],
      },
      {
        title: "Outils de conception",
        description:
          "Canvases façon Figma avec listes/arbres, annulation/rétablissement et synchronisation temps réel.",
        ariaLabel: "design",
        links: [
          { href: "/docs/tutorial/tree", label: "Arbre" },
          { href: "/docs/tutorial/list", label: "Liste déplaçable" },
        ],
      },
      {
        title: "Tableaux de bord de données",
        description:
          "Tableaux façon Airtable avec état JSON partagé, snapshots et historique.",
        ariaLabel: "tableaux de bord",
        links: [{ href: "/docs/tutorial/persistence", label: "Persistance" }],
      },
      {
        title: "Jeux multijoueurs",
        description:
          "État de jeu partagé avec mises à jour sans conflit et relecture de la chronologie.",
        ariaLabel: "jeux",
        links: [],
      },
      {
        title: "Applications de messagerie",
        description:
          "Flux de messages avec synchronisation hors ligne, présence et historique sans conflit.",
        ariaLabel: "messagerie",
        links: [{ href: "/docs/tutorial/list", label: "Liste" }],
      },
      {
        title: "Applications de productivité",
        description:
          "Espaces de travail façon Notion avec blocs, tâches et bases de connaissances partagés.",
        ariaLabel: "productivité",
        links: [],
      },
    ],
    linkSeparator: " · ",
  },
  support: {
    heading: "Comment Loro vous accompagne",
    cards: [
      {
        title: "Construire une collaboration local-first",
        description: [
          "Loro vous aide à créer des logiciels qui fonctionnent hors ligne, se synchronisent lors de la reconnexion et réduisent les conflits.",
        ],
      },
      {
        title: "Algorithmes de pointe",
        description: [
          "Découvrez nos recherches CRDT et retours d'expérience multijoueur sur le blog ",
          {
            type: "link",
            href: "https://www.loro.dev/blog/loro-update-october-2024",
            label: "Mises à jour : octobre 2024",
            isExternal: true,
          },
          ".",
        ],
      },
      {
        title: "CRDT de texte enrichi",
        description: [
          "Loro gère des CRDT de texte enrichi qui fusionnent les styles concurrents tout en préservant l'intention des utilisateurs. Consultez le billet ",
          {
            type: "link",
            href: "/blog/loro-richtext",
            label: "CRDT de texte enrichi de Loro",
            isExternal: true,
            className: "underline",
          },
          " pour en savoir plus.",
        ],
      },
      {
        title: "Données hiérarchiques avec Moveable Tree",
        description: [
          "Pour les applications nécessitant des manipulations de type répertoire, Loro s'appuie sur l'algorithme décrit dans ",
          {
            type: "link",
            href: "https://ieeexplore.ieee.org/document/9563274",
            label: "A Highly-Available Move Operation for Replicated Trees",
            isExternal: true,
            className: "underline italic",
          },
          " afin de simplifier le déplacement et la réorganisation des données hiérarchiques.",
        ],
      },
    ],
  },
  followOnGitHub: {
    label: "Suivez-nous sur GitHub",
    ariaLabel: "Suivez-nous sur GitHub",
  },
} satisfies HomeTranslation;

export default homeFr;
