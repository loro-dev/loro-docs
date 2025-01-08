import Link from "next/link";
import { ExpendableContent } from "./ExpandableContent";

// border-b border-gray-400 border-opacity-20

interface ChangelogProps {
  date: string;
  mdx: any;
  title: string;
  url: string;
}

export function ChangelogComponent({ date, mdx, title, url }: ChangelogProps) {
  return (
    <div className="relative">
      <svg
        width="1px"
        height="100%"
        className="absolute left-4 sm:left-56 hidden sm:block"
      >
        <line
          x1="0"
          y1="1"
          x2="1"
          y2="100%"
          stroke="gray"
          strokeWidth="4"
          strokeDasharray="5, 10"
        />
      </svg>
      <div className="relative w-full pb-4 pt-8 sm:pb-6 sm:pt-16">
        <div className="absolute left-5 sm:left-[220px] top-[50px] sm:top-[82px] w-2 h-2 bg-slate-500 rounded-xl hidden sm:block" />
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-72 text-base sm:text-lg mb-2 sm:mt-2 text-left sm:text-right sm:pr-28 text-gray-400">
            {date}
          </div>

          <div className="flex-1">
            <Link className="text-2xl sm:text-4xl font-bold" href={url}>
              {title}
            </Link>
            {mdx}
          </div>
        </div>
      </div>
    </div>
  );
}
