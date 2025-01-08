import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/cn";
import { useUpdateConnectedHistory } from "@components/landing/store/connection-history";
import { useIsReviewing } from "@components/landing/store/player-state";
import { useTimelineLength } from "@components/landing/store/timeline-history";
import { useCallback, useEffect } from "react";
import OfflineIcon from "../../public/images/offline.svg";
import OnlineIcon from "../../public/images/online.svg";

export type ConnectionToggleProps = {
  className?: string;
  connected?: boolean;
  onToggle?: (isConnected: boolean) => void;
};

export default function ConnectionToggle({
  className,
  connected = true,
  onToggle,
}: ConnectionToggleProps) {
  const isReviewing = useIsReviewing();
  const timelineLength = useTimelineLength();
  const updateConnectedHistory = useUpdateConnectedHistory();
  const onClick = useCallback(() => {
    onToggle?.(!connected);
  }, [connected, onToggle]);
  useEffect(() => {
    updateConnectedHistory(timelineLength, connected);
  }, [timelineLength, connected]);
  const label = isReviewing
    ? "Cannot change the connection status while reviewing history."
    : connected
    ? "Turn off the connection between two users"
    : "Turn on the connection between two users";
  return (
    <div className={cn("flex flex-row gap-x-3.75 items-center", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "flex w-15 h-15 p-3.5 items-center justify-center rounded-full text-white",
                "transition-all duration-200 ease-in-out bg-black/80 hover:bg-black/60",
                "cursor-pointer",
                "disabled:bg-black/25 disabled:text-white/10 disabled:cursor-not-allowed",
                connected ? "" : "bg-black/40"
              )}
              aria-label={label}
              type="button"
              data-connected={connected}
              onClick={onClick}
              name="connection-toggle"
              disabled={isReviewing}
            >
              {connected ? <OnlineIcon /> : <OfflineIcon />}
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p className="text-center max-w-[16rem]">{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <label
        className="block md:hidden text-white text-base font-semibold"
        htmlFor="connection-toggle"
        aria-label={connected ? "online" : "offline"}
      >
        {connected ? "online" : "offline"}
      </label>
    </div>
  );
}
