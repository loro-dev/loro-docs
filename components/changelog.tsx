import Link from "next/link";

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
      <div className="relative w-full pb-4 pt-8 sm:pb-6 sm:pt-16">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-72 text-base sm:text-lg mb-2 sm:mt-2 text-left sm:text-right sm:pr-28 text-gray-400">
            {date}
          </div>
          <div className="relative">
            <svg
              width="1px"
              height="calc(100% + 80px)"
              className="absolute left-0 sm:left-1/2 -translate-x-1/2 hidden sm:block top-[-20px]"
              style={{ left: "calc(50% - 56px)" }}
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
            <div
              className="absolute left-0 sm:left-1/2 -translate-x-1/2 top-[50px] sm:top-[20px] w-2 h-2 bg-slate-500 rounded-xl hidden sm:block"
              style={{ left: "calc(50% - 56px)" }}
            />
          </div>
          <div className="flex-1">
            <Link className="text-2xl sm:text-4xl font-bold" href={url}>
              {title}
            </Link>
            {/* code block min width */}
            <div className="min-w-[600px]">{mdx}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
