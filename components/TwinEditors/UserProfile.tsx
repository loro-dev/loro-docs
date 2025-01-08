import Image from "next/image";
import classes from "./UserProfile.module.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export type UserProfileProps = {
  avatarUrl?: string;
  avatarColor?: string;
  backgroundColor?: string;
  name?: string;
  version: string;
  versionMap: { [key: string]: number }
};

export default function UserProfile({
  avatarUrl,
  avatarColor,
  backgroundColor,
  name,
  version,
  versionMap
}: UserProfileProps) {
  return (
    <header className={classes.UserProfile}>
      <div className={classes.Avatar}>
        {typeof avatarUrl === "string" ? (
          <>
            {typeof backgroundColor === "string" ? (
              <div className="absolute inset-0" style={{ backgroundColor }} />
            ) : null}
            <Image
              className="absolute inset-0"
              src={avatarUrl}
              alt={`${name}'s avatar`}
              width={40}
              height={40}
            />
          </>
        ) : (
          <div
            className="absolute inset-0"
            style={{ backgroundColor: avatarColor }}
          />
        )}
      </div>
      <div className={classes.UserInformation}>
        <div className={classes.UserName}>{name}</div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className={classes.Version}>Version: {version}</div>
            </TooltipTrigger>
            <TooltipContent>
              <a href="/docs/tutorial/version" className="underline">Version vector</a> of the document
              {
                <>
                  <br />
                  <br />
                  {version.trim()} means the doc contains:
                  {
                    Object.entries(versionMap).map(([key, value]) => {
                      return (
                        <li key={key}>
                          {" "}{value} ops from {key}{" "}
                        </li>
                      )
                    })
                  }
                </>
              }
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
}
