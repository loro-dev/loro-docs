export type SupportedLocale = "en" | "zh" | "ja" | "de" | "fr";

export type RichTextSegment =
  | string
  | {
      type: "link" | "codeLink";
      href: string;
      label: string;
      isExternal?: boolean;
      className?: string;
    };

export type SupportCardTranslation = {
  title: string;
  description: RichTextSegment[];
};

export type BuildCardTranslation = {
  title: string;
  description: string;
  ariaLabel: string;
  links: { href: string; label: string }[];
};

export type FeatureTranslation = {
  title: string;
  description: string;
};

export type HomeTranslation = {
  hero: {
    descriptionLines: string[];
    titleLines: string[];
    connector: string;
    emphasis: string;
  };
  cta: {
    getStarted: string;
  };
  sections: {
    richTextDemo: string;
    syncHeading: [string, string];
    whatYouCanBuild: string;
    whatYouCanBuildDescription: string;
  };
  features: {
    intro: string;
    items: FeatureTranslation[];
  };
  customerWall: {
    heading: string;
  };
  build: {
    cards: BuildCardTranslation[];
    linkSeparator: string;
  };
  support: {
    heading: string;
    cards: SupportCardTranslation[];
  };
  followOnGitHub: {
    label: string;
    ariaLabel: string;
  };
};
