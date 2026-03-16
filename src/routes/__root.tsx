import { HeadContent, Outlet, Scripts, createRootRoute } from "@tanstack/react-router";
import appCss from "../app.css?url";

const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var resolved=(stored==='dark'||stored==='light')?stored:'dark';document.documentElement.classList.toggle('dark',resolved==='dark');document.documentElement.style.colorScheme=resolved;}catch(e){document.documentElement.classList.add('dark');}})();`;

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Loro Blog",
        href: "/blog.xml",
      },
      {
        rel: "alternate",
        type: "application/rss+xml",
        title: "Loro Changelog",
        href: "/changelog.xml",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
        <script
          async
          src="https://us.umami.is/script.js"
          data-website-id="5a4c9e46-22c9-46ee-82d8-901253485cf1"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-M8FTP4QZ81"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-M8FTP4QZ81');
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "mmgroay4p9");
            `,
          }}
        />
        <HeadContent />
      </head>
      <body className="bg-black text-white antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
