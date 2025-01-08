import React, { SVGProps } from "react";
import Image from "next/image";
import { NextSeoProps } from "next-seo";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { useRouter } from "next/router";
import Footer from "./components/landing/Footer";

const config: DocsThemeConfig = {
  logo: (
    <span
      className="flex"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        verticalAlign: "middle",
      }}
    >
      <Image
        src="/LORO_PURE.svg"
        alt="Logo"
        width={24}
        height={24}
        style={{ margin: "0 6px", display: "inline-block" }}
      />
      Loro
    </span>
  ),
  nextThemes: {
    defaultTheme: "dark",
  },
  project: {
    link: "https://github.com/loro-dev/loro",
  },
  docsRepositoryBase: "https://github.com/loro-dev/loro-docs",
  navbar: {},
  footer: {
    text: "Loro 2024 ©",
    component: () => <Footer />,
  },
  useNextSeoProps() {
    const { asPath } = useRouter();
    return {
      titleTemplate: asPath === "/" ? undefined : "%s – Loro",
      twitter: {
        site: "@loro_dev",
        cardType: "summary_large_image",
      },
      defaultTitle: "Loro",
      description: "",
    } as NextSeoProps;
  },
  chat: { link: "https://discord.gg/tUsBSVfqzf" },
  head: function useHead() {
    const config = useConfig<{
      description?: string;
      image?: string;
      keywords?: string;
    }>();
    let { title } = config;
    const { description, image, keywords } = config.frontMatter;
    const { route } = useRouter();
    if (title == null) {
      title = "Loro";
    }
    if (!title.includes("Loro")) {
      title += " – Loro";
    }

    const DEFAULT_IMAGE = "https://i.ibb.co/T1x1bSf/IMG-8191.jpg";
    return (
      <>
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        ></script>
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <meta name="og:description" content={description} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image ? image : DEFAULT_IMAGE} />
        <meta name="twitter:site:domain" content="loro.dev" />
        <meta name="twitter:site" content="@loro_dev" />
        <meta name="twitter:url" content="https://loro.dev" />
        <meta name="og:title" content={title} />
        <meta name="og:image" content={image ? image : DEFAULT_IMAGE} />
        <meta name="apple-mobile-web-app-title" content="Loro" />
        {/* <link rel="icon" href="/LORO.svg" type="image/svg+xml" />
        <link rel="icon" href="/apple-touch-icon.png" type="image/png" /> */}
      </>
    );
  },
};

export default config;
