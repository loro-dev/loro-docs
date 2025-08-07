import { Footer, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head } from 'nextra/components'
import Image from 'next/image'
import FooterComponent from '../components/landing/Footer'
import 'nextra-theme-docs/style.css'

export const metadata = {
  title: 'Loro',
  description: 'Loro - High-performance collaborative editing library',
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" dir="ltr">
      <Head faviconGlyph="📝">
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        />
        <meta name="msapplication-TileColor" content="#fff" />
        <meta name="theme-color" content="#fff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en" />
        <meta name="description" content="Loro - High-performance collaborative editing library" />
        <meta name="og:description" content="Loro - High-performance collaborative editing library" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://i.ibb.co/T1x1bSf/IMG-8191.jpg" />
        <meta name="twitter:site:domain" content="loro.dev" />
        <meta name="twitter:site" content="@loro_dev" />
        <meta name="twitter:url" content="https://loro.dev" />
        <meta property="og:title" content="Loro" />
        <meta property="og:image" content="https://i.ibb.co/T1x1bSf/IMG-8191.jpg" />
        <meta name="apple-mobile-web-app-title" content="Loro" />
      </Head>
      <body>
        <Layout
          navbar={
            <Navbar
              logo={
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
              }
              project={{
                link: 'https://github.com/loro-dev/loro',
              }}
              chat={{
                link: 'https://discord.gg/tUsBSVfqzf',
              }}
            />
          }
          footer={<FooterComponent />}
          docsRepositoryBase="https://github.com/loro-dev/loro-docs/tree/main"
          darkMode={true}
          nextThemes={{
            defaultTheme: 'dark',
          }}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}