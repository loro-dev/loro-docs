import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "../components/LandingPage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Loro - Reimagine state management with CRDTs" },
      {
        name: "description",
        content:
          "Loro - Reimagine state management with CRDTs. Built for local-first software, real-time collaboration, and rich text.",
      },
      {
        property: "og:title",
        content: "Loro - Reimagine state management with CRDTs",
      },
      {
        property: "og:description",
        content:
          "Loro - Reimagine state management with CRDTs. Built for local-first software, real-time collaboration, and rich text.",
      },
    ],
    links: [
      { rel: "canonical", href: "https://loro.dev/" },
      { rel: "alternate", hrefLang: "en", href: "https://loro.dev/" },
      { rel: "alternate", hrefLang: "zh", href: "https://cn.loro.dev/" },
      { rel: "alternate", hrefLang: "x-default", href: "https://loro.dev/" },
    ],
  }),
  component: LandingPage,
});
