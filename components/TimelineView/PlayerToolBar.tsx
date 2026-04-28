"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/cn";
import { usePlayerState } from "@components/landing/store/player-state";
import {
  IconPlayerPauseFilled,
  IconPlayerPlayFilled,
  IconPlayerSkipBackFilled,
  IconPlayerSkipForwardFilled,
} from "@tabler/icons-react";
import { useCallback, useEffect, useMemo, useRef } from "react";

export type PlayerToolBarProps = { className?: string };

const playButtonLabel = "Play the entire timeline.";
const pauseButtonLabel = "Pause the timeline.";

export default function PlayerToolBar({
  className,
}: PlayerToolBarProps): JSX.Element {
  const [playerState, setPlayerState] = usePlayerState();
  // We want to play the entire history within 5 seconds.
  // The interval of each step is 30ms.
  const [interval, speed] = useMemo(() => {
    const maxDuration = 5000;
    const interval = 30;
    const stepCount = maxDuration / interval;
    const stepSize = Math.ceil(playerState.totalLength / stepCount);
    return stepSize === 0 ? [100, 1] : [interval, stepSize];
  }, [playerState]);
  const isAtStart = playerState.currentTime === 0;
  const isAtEnd = playerState.currentTime === playerState.totalLength;
  const isPlaying = playerState.playing;
  const canPlay = playerState.totalLength > 0 && !isAtEnd;
  const onGoToStart = useCallback(() => {
    setPlayerState((state) => ({ ...state, currentTime: 0 }));
  }, [setPlayerState]);
  const onGoToEnd = useCallback(() => {
    setPlayerState((state) => ({ ...state, currentTime: state.totalLength }));
  }, [setPlayerState]);
  const intervalRef = useRef<number | null>(null);
  const onTogglePlay = useCallback(() => {
    setPlayerState((state) => ({ ...state, playing: !state.playing }));
  }, [setPlayerState, speed]);
  useEffect(() => {
    if (playerState.playing) {
      if (intervalRef.current === null) {
        intervalRef.current = setInterval(() => {
          setPlayerState((previousState) => {
            if (previousState.currentTime === previousState.totalLength) {
              // console.log("[PlayerToolBar] The end. Stop playing.");
              clearInterval(intervalRef.current as number);
              intervalRef.current = null;
              return { ...previousState, playing: false };
            } else {
              // console.log("[PlayerToolBar] Tick to the next second.");
              return {
                ...previousState,
                currentTime: Math.min(
                  previousState.currentTime + speed,
                  previousState.totalLength
                ),
              };
            }
          });
        }, interval) as unknown as number;
      }
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [playerState]);
  return (
    <div className={cn("flex flex-row gap-4 text-white/75", className)}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-6 h-6 transition-colors duration-200 ease-in-out disabled:text-stone-100/25 hover:text-white"
              type="button"
              aria-label="Go to the beginning of the timeline."
              disabled={isAtStart}
              onClick={onGoToStart}
            >
              <IconPlayerSkipBackFilled />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>Go to the beginning of the timeline.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-6 h-6 transition-colors duration-200 ease-in-out disabled:text-stone-100/25 hover:text-white"
              type="button"
              aria-label={isPlaying ? playButtonLabel : pauseButtonLabel}
              disabled={!canPlay}
              onClick={onTogglePlay}
            >
              {isPlaying ? <IconPlayerPauseFilled /> : <IconPlayerPlayFilled />}
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={16}>
            <p>{isPlaying ? pauseButtonLabel : playButtonLabel}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="w-6 h-6 transition-colors duration-200 ease-in-out disabled:text-stone-100/25 hover:text-white"
              type="button"
              aria-label="Go to the latest point on the timeline."
              disabled={isAtEnd}
              onClick={onGoToEnd}
            >
              <IconPlayerSkipForwardFilled />
            </button>
          </TooltipTrigger>
          <TooltipContent sideOffset={8}>
            <p>Go to the latest point on the timeline.</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
