"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { ChangelogComponent } from "./changelog";

export function ChangelogHeader() {
  return (
    <div className="max-w-screen-lg mx-auto pt-4 pb-8 mb-8 border-b border-gray-400 border-opacity-20 text-center">
      <h1>
        <span className="font-bold leading-tight lg:text-5xl">Loro Changelog</span>
      </h1>
      <div className="mt-4 lg:text-md">
        <p>You can subscribe the changelog by
          <span className="text-sky-600 ml-1"><Link href="/changelog.xml">RSS</Link></span>
        </p>
        <p className="mt-2">or join our
          <span className=" text-sky-600 ml-1">
            <Link href="https://discord.gg/tUsBSVfqzf">Discord Community</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export function ChangelogIndex() {
  const changelogPages = [
    { name: "v1.5.0", date: "2025/05/05", title: "Release Loro v1.5.0", route: "/changelog/v1.5.0" },
    { name: "v1.4.7", date: "2025/05/01", title: "Release Loro v1.4.7", route: "/changelog/v1.4.7" },
    { name: "inspector-v0.1.0", date: "2025/04/30", title: "Release Loro Inspector v0.1.0", route: "/changelog/inspector-v0.1.0" },
    { name: "v1.4.0", date: "2025/04/21", title: "Release Loro v1.4.0", route: "/changelog/v1.4.0" },
    { name: "v1.3.0", date: "2025/04/07", title: "Release Loro v1.3.0", route: "/changelog/v1.3.0" },
    { name: "v1.2.0", date: "2025/03/13", title: "Release Loro v1.2.0", route: "/changelog/v1.2.0" },
    { name: "v1.1.0", date: "2025/02/27", title: "Release Loro v1.1.0", route: "/changelog/v1.1.0" },
    { name: "v1.0.0-beta", date: "2024/11/01", title: "Release Loro v1.0.0-beta", route: "/changelog/v1.0.0-beta" },
  ];

  // Sort by date descending
  changelogPages.sort((a, b) => {
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return 0;
  });

  return (
    <>
      {changelogPages.map((page) => {
        const Mdx = dynamic(() => import(`../content/changelog/${page.name}.mdx`), { ssr: false });
        return (
          <ChangelogComponent
            key={page.title}
            date={page.date}
            mdx={<Mdx />}
            title={page.title}
            url={page.route}
          />
        );
      })}
    </>
  );
}