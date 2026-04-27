import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Script from "next/script";
import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import LandingFooter from "../components/landing/Footer";
import LanguageDropdown from "../components/LanguageDropdown";

import "@fontsource/poppins/100.css";
import "@fontsource/poppins/200.css";
import "@fontsource/poppins/300.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import "@fontsource/poppins/800.css";
import "../styles/quill.core.css";
import "../styles/quill.loro.css";
import "../style.css";
import "nextra-theme-docs/style-prefixed.css";

const DEFAULT_IMAGE = "https://i.ibb.co/T1x1bSf/IMG-8191.jpg";

export const metadata: Metadata = {
  metadataBase: new URL("https://loro.dev"),
  title: {
    default: "Loro",
    template: "%s – Loro",
  },
  description: "Loro",
  applicationName: "Loro",
  appleWebApp: {
    title: "Loro",
  },
  icons: {
    other: [
      { rel: "msapplication-TileImage", url: "/favicon.ico" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@loro_dev",
    images: DEFAULT_IMAGE,
  },
  openGraph: {
    images: DEFAULT_IMAGE,
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/blog.xml", title: "Loro Blog" },
        { url: "/changelog.xml", title: "Loro Changelog" },
      ],
    },
  },
  other: {
    "msapplication-TileColor": "#fff",
    "Content-Language": "en",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff",
};

const logo = (
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
);

const navbar = (
  <Navbar
    logo={logo}
    projectLink="https://github.com/loro-dev/loro"
    chatLink="https://discord.gg/tUsBSVfqzf"
  >
    <LanguageDropdown />
  </Navbar>
);

const footer = (
  <Footer className="!p-0 !m-0 !block">
    <LandingFooter />
  </Footer>
);

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-M8FTP4QZ81"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M8FTP4QZ81');
          `}
        </Script>
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mmgroay4p9");
          `}
        </Script>
        <Script
          strategy="afterInteractive"
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        />
        <Layout
          navbar={navbar}
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/loro-dev/loro-docs/tree/main"
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 1, autoCollapse: true }}
          darkMode
          nextThemes={{ defaultTheme: "dark" }}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
