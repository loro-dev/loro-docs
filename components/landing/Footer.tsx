"use client";

import React, { SVGProps } from "react";

export default function Footer(): JSX.Element {
  const year = new Date().getFullYear();
  return (
    <footer className="mx-5 md:mx-15 h-[85px] flex flex-row justify-between items-center text-black/80 dark:text-white/60">
      <div className="text-black/60 dark:text-white/60">Loro {year} ©</div>
      <div className="flex flex-row space-x-2">
        <a
          href="https://twitter.com/loro_dev"
          target="_blank"
          rel="noopener noreferrer"
          className="nx-p-2 nx-text-current"
          onClick={() => {
            // deno-lint-ignore no-window
            window.clarity?.("event", "twitter-click");
          }}
        >
          <MdiTwitter />
        </a>
        <a
          href="https://bsky.app/profile/loro.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="nx-p-2 nx-text-current"
          onClick={() => {
            // deno-lint-ignore no-window
            window.clarity?.("event", "bluesky-click");
          }}
        >
          <TablerBrandBluesky />
        </a>
      </div>
    </footer>
  );
}

export function MdiTwitter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="24" height="24" viewBox="0 1 22 22" {...props}>
      <path
        fill="currentColor"
        d="M22.46 6c-.77.35-1.6.58-2.46.69c.88-.53 1.56-1.37 1.88-2.38c-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29c0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15c0 1.49.75 2.81 1.91 3.56c-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07a4.28 4.28 0 0 0 4 2.98a8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21C16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56c.84-.6 1.56-1.36 2.14-2.23Z"
      >
      </path>
    </svg>
  );
}

export function TablerBrandBluesky(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6.335 5.144C4.681 3.945 2 3.017 2 5.97c0 .59.35 4.953.556 5.661C3.269 14.094 5.686 14.381 8 14c-4.045.665-4.889 3.208-2.667 5.41C6.363 20.428 7.246 21 8 21c2 0 3.134-2.769 3.5-3.5q.5-1 .5-1.5q0 .5.5 1.5c.366.731 1.5 3.5 3.5 3.5c.754 0 1.637-.571 2.667-1.59C20.889 17.207 20.045 14.664 16 14c2.314.38 4.73.094 5.444-2.369c.206-.708.556-5.072.556-5.661c0-2.953-2.68-2.025-4.335-.826C15.372 6.806 12.905 10.192 12 12c-.905-1.808-3.372-5.194-5.665-6.856"
      >
      </path>
    </svg>
  );
}
