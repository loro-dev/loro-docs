import { useIsHistoryEmpty } from "@components/landing/store/timeline-history";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";
import { GeneralToolBar, GeneralToolBarProps } from "./GeneralToolBar";
import Controls from "./PlayerToolBar";
import Cursor from "./Cursor";
import EmptyState from "./EmptyState";
import ParticipantNames from "./ParticipantNames";
import Tracks from "./Tracks";
import classes from "./index.module.css";

export type TimelineProps = {} & Omit<GeneralToolBarProps, "className">;

const participants = ["Alice", "Bob"];

export default function Timeline({ ...props }: TimelineProps) {
  const isHistoryEmpty = useIsHistoryEmpty();
  const trackRegionRef = useRef<HTMLDivElement>(null);
  /** The left and right coordinate of the track region. */
  const [trackRange, setTrackRange] = useState<[number, number] | null>(null);
  // Update the track range when the track region is resized.
  const updateTrackRange = useCallback(() => {
    if (trackRegionRef.current) {
      const rect = trackRegionRef.current.getBoundingClientRect();
      setTrackRange([rect.left, rect.right]);
    }
  }, []);
  useIsomorphicLayoutEffect(() => {
    window.addEventListener("resize", updateTrackRange);
    return () => {
      window.removeEventListener("resize", updateTrackRange);
    };
  }, [updateTrackRange]);
  useEffect(updateTrackRange, [isHistoryEmpty]);
  return (
    <div className="w-full rounded-[40px] bg-timeline pt-5 px-7.5 pb-5 flex flex-col">
      <header className="flex flex-row items-center justify-between">
        <h3 className={classes.Title}>History</h3>
        <GeneralToolBar className="ml-auto" {...props} />
      </header>
      <div className="relative mt-2.5 h-full flex flex-col py-2.5 gap-px">
        <div className="flex flex-row items-center gap-x-2">
          <ParticipantNames participants={participants} />
          <div
            className="relative flex-1 flex flex-col gap-y-1"
            ref={trackRegionRef}
          >
            {isHistoryEmpty ? (
              <EmptyState />
            ) : (
              <>
                <Tracks />
                <Cursor trackRange={trackRange} />
              </>
            )}
          </div>
        </div>
      </div>
      <footer className="mt-5 touch:mt-8 flex flex-row justify-center">
        <Controls />
      </footer>
    </div>
  );
}
