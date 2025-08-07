"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

interface BlogPost {
  route: string;
  title: string;
  description?: string;
  date?: string;
}

export function BlogHeader() {
  return (
    <div className="max-w-screen-lg mx-auto pt-4 pb-8 mb-16 border-b border-gray-400 border-opacity-20 text-center">
      <h1>
        <span className="font-bold leading-tight lg:text-5xl">Loro Blog</span>
      </h1>
      <p className="text-center text-gray-500 dark:text-gray-400 font-space-grotesk"></p>
    </div>
  );
}

export function BlogIndex() {
  const [pages, setPages] = useState<BlogPost[]>([]);

  useEffect(() => {
    // Static blog posts data
    const blogPosts: BlogPost[] = [
      {
        route: "/blog/movable-tree",
        title: "Movable tree CRDTs and Loro's implementation",
        description: "This article introduces the implementation difficulties and challenges of Movable Tree CRDTs when collaboration, and how Loro implements it and sorts child nodes. The algorithm has high performance and can be used in production.",
        date: "2024/07/18"
      },
      {
        route: "/blog/v1.0",
        title: "Loro 1.0 Release 🥳",
        description: "Loro 1.0 is released! This release includes the stable version of Loro, with a lot of new features and improvements.",
        date: "2024/11/27"
      },
      {
        route: "/blog/loro-richtext",
        title: "Design and implementation of Loro's rich text CRDT",
        description: "This article introduces the implementation difficulties and challenges of rich text CRDT, and how Loro implements it.",
        date: "2024/01/31"
      },
      {
        route: "/blog/crdt-richtext",
        title: "Rich text CRDT",
        description: "The difficulties and challenges in implementing rich text CRDT.",
        date: "2023/11/14"
      },
      {
        route: "/blog/loro-now-open-source",
        title: "Loro's Rich Text CRDT is now open source",
        description: "We have open-sourced the rich text CRDT implementation in Loro.",
        date: "2023/07/21"
      }
    ];

    // Sort by date descending
    blogPosts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });

    setPages(blogPosts);
  }, []);

  return (
    <>
      {pages.map((page) => (
        <div key={page.route} className="mb-10">
          <Link
            href={page.route}
            style={{ color: "inherit", textDecoration: "none" }}
            className="block font-semibold mt-8 text-2xl"
          >
            {page.title}
          </Link>
          <p className="opacity-80" style={{ marginTop: ".5rem" }}>
            {page.description}{" "}
            <span className="inline-block">
              <Link href={page.route}>{"Read more →"}</Link>
            </span>
          </p>
          {page.date ? (
            <p className="opacity-50 text-sm">{page.date}</p>
          ) : null}
        </div>
      ))}
    </>
  );
}