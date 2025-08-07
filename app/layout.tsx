import type { ReactNode } from 'react'
import 'nextra-theme-docs/style-prefixed.css'
import '../style.css'

export const metadata = {
  title: 'Loro',
  description: 'Loro - High-performance collaborative editing library',
}

export default function RootLayout({
  children
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
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
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}