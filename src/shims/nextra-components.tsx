import type { ReactNode } from "react";

function CardsRoot({
  children,
  num,
}: {
  children: ReactNode;
  num?: number;
}) {
  return (
    <div
      className="grid gap-4"
      style={{ gridTemplateColumns: `repeat(${num ?? 2}, minmax(0, 1fr))` }}
    >
      {children}
    </div>
  );
}

function CardsItem({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="block rounded-2xl border border-white/10 bg-white/5 p-4 text-white no-underline transition hover:bg-white/10"
    >
      <div className="mb-3 text-lg font-semibold">{title}</div>
      <div>{children}</div>
    </a>
  );
}

export const Cards = Object.assign(CardsRoot, {
  Card: CardsItem,
});
