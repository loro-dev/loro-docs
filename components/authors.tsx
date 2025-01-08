import React, { PropsWithChildren } from "react";

export type AuthorsProps = PropsWithChildren<{ date: string }>;

export default function Authors({ date, children }: AuthorsProps) {
  return (
    <div className="mt-8 mb-16 text-gray-400 text-sm">
      {date} by {children}
    </div>
  );
}

export type AuthorProps = { name: string; link: string };

export function Author({ name, link }: AuthorProps) {
  return (
    <span className="after:content-[','] last:after:content-['']">
      <a
        key={name}
        href={link}
        target="_blank"
        className="mx-1 text-gray-800 dark:text-gray-100"
      >
        {name}
      </a>
    </span>
  );
}
