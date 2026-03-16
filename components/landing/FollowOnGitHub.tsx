import { HTMLAttributes } from "react";
import cn from "clsx";
import { Github, Star } from "lucide-react";

export default function FollowOnGitHub(
  props: HTMLAttributes<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      {...props}
      href="https://github.com/loro-dev/loro"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Star us on GitHub"
      className={cn(
        "group inline-flex items-center gap-3 px-6 py-3 rounded-full",
        "bg-white/[0.03] hover:bg-white/[0.08]",
        "border border-white/[0.08] hover:border-white/[0.15]",
        "backdrop-blur-sm",
        "transition-all duration-300 ease-out",
        "hover:shadow-lg hover:shadow-blue-500/10",
        "hover:-translate-y-0.5",
        props.className
      )}
    >
      <div className="relative">
        <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
        <div className="absolute inset-0 bg-blue-400/30 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <span className="text-white/80 group-hover:text-white font-medium text-sm transition-colors">
        Star us on GitHub
      </span>
      <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
        <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
        <span className="text-xs text-yellow-500/80 font-medium">Star</span>
      </div>
    </a>
  );
}
