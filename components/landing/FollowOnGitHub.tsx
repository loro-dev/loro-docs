import { HTMLAttributes } from "react";
import classes from "./FollowOnGitHub.module.css";
import cn from "clsx";
import GitHubIcon from "../../public/images/social-media-github.svg";
import { useHomeTranslations } from "@/lib/useHomeTranslations";

export default function FollowOnGitHub(
  props: HTMLAttributes<HTMLAnchorElement>
): JSX.Element {
  const { followOnGitHub } = useHomeTranslations();

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
      aria-label={followOnGitHub.ariaLabel}
    >
      <div className="w-6 h-6 md:w-9.5 md:h-9.5 flex items-center justify-center mr-1">
        <GitHubIcon />
      </div>
      <div className={classes.AdvertisingText}>{followOnGitHub.label}</div>
    </a>
  );
}
