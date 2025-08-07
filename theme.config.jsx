import React from 'react'
import { useRouter } from 'next/router'
import { useConfig } from 'nextra-theme-docs'
import Image from 'next/image'
import Footer from './components/landing/Footer'

export default {
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
  project: {
    link: 'https://github.com/loro-dev/loro',
  },
  chat: {
    link: 'https://discord.gg/tUsBSVfqzf',
  },
  docsRepositoryBase: 'https://github.com/loro-dev/loro-docs/tree/main',
  footer: {
    text: 'Loro 2024 ©',
    component: Footer,
  },
  head: () => {
    const { asPath } = useRouter()
    const config = useConfig()
    const { title, description, image } = config.frontMatter
    const pageTitle = title ? `${title} – Loro` : 'Loro'
    const DEFAULT_IMAGE = "https://i.ibb.co/T1x1bSf/IMG-8191.jpg"
    
    return (
      <>
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content={description || "Loro"} />
        <meta name="og:description" content={description || "Loro"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={image || DEFAULT_IMAGE} />
        <meta name="twitter:site:domain" content="loro.dev" />
        <meta name="twitter:site" content="@loro_dev" />
        <meta name="twitter:url" content="https://loro.dev" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:image" content={image || DEFAULT_IMAGE} />
        <meta name="apple-mobile-web-app-title" content="Loro" />
      </>
    )
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    return {
      titleTemplate: asPath === '/' ? undefined : '%s – Loro',
    }
  },
   sidebar: {
    defaultMenuCollapseLevel: 1,
    autoCollapse: true,
  },
  darkMode: true,
  nextThemes: {
    defaultTheme: 'dark',
  },
}
