import { HTMLAttributes } from "react";
import classes from "./FollowOnGitHub.module.css";
import cn from "clsx";
import GitHubIcon from "../../public/images/social-media-github.svg";

export default function FollowOnGitHub(
  props: HTMLAttributes<HTMLAnchorElement>
): JSX.Element {
  return (
    <a
      {...props}
      className={cn(
        "flex flex-row items-center justify-center gap-1",
        props.className
      )}
      href="https://github.com/loro-dev/loro"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Follow us on GitHub"
    >
      <div className="w-6 h-6 md:w-9.5 md:h-9.5 flex items-center justify-center">
        <GitHubIcon />
      </div>
      <div className={classes.AdvertisingText}>Follow us on GitHub</div>
    </a>
  );
}
