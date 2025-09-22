import type { ReactElement } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";
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
import 'nextra-theme-docs/style.css'

export default function Nextra({
  Component,
  pageProps,
}: AppProps): ReactElement {
  return (
    <>
      <Head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Loro Blog"
          href="/blog.xml"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Loro Changelog"
          href="/changelog.xml"
        />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-M8FTP4QZ81"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M8FTP4QZ81');
          `,
        }}
      />
      <Script
        dangerouslySetInnerHTML={{
          __html: `
        (function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "mmgroay4p9");`,
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
