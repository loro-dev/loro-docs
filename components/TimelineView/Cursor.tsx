import { cn } from "@/lib/utils/cn";
import {
  useCurrentTimeState,
  useIsPlaying,
  useTotalLength,
} from "@components/landing/store/player-state";
import { Tally2 } from "lucide-react";
import { useCallback, useState } from "react";

export type CursorProps = {
  trackRange: [number, number] | null;
};

export default function Cursor({ trackRange }: CursorProps): JSX.Element {
  const [startPosition, setStartPosition] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useCurrentTimeState();
  const isPlaying = useIsPlaying();
  const totalLength = useTotalLength();
  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (isPlaying) return;
      const target = e.target as HTMLElement;
      target.setPointerCapture(e.pointerId);
      setStartPosition(e.clientX);
    },
    [isPlaying]
  );
  const onPointerMove = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    e.preventDefault();
    if (target.hasPointerCapture(e.pointerId)) {
      if (trackRange === null) return;
      const [left, right] = trackRange;
      const position = Math.max(left, Math.min(right, e.clientX)) - left;
      const unitSize = (right - left) / totalLength;
      const current = Math.round(position / unitSize);
      // console.log(`[Cursor] Moved to ${current}`);
      document.body.classList.toggle("cursor-grabbing", true);
      document.body.classList.toggle("select-none", true);
      setCurrentTime(current);
    }
  }, [trackRange, totalLength]);
  const onPointerUp = useCallback((e: React.PointerEvent<HTMLElement>) => {
    const target = e.target as HTMLElement;
    if (target.hasPointerCapture(e.pointerId)) {
      document.body.classList.remove("cursor-grabbing", "select-none");
      target.releasePointerCapture(e.pointerId);
      setStartPosition(null);
    }
  }, []);
  return (
    <>
      <button
        className={cn(
          "absolute -top-2.5 -bottom-2.5 w-3",
          0 < currentTime
            ? currentTime === totalLength
              ? "-translate-x-full"
              : "-translate-x-1/2"
            : "",
          "rounded-full bg-neutral-300/50 cursor-pointer",
          "transition-all duration-100 ease-in-out group touch-none",
          "flex flex-row items-center justify-center",
          "border border-neutral-600/10",
          "backdrop backdrop-blur-sm shadow-md",
          startPosition === null
            ? "mouse:hover:w-4 hover:bg-neutral-300/50 cursor-pointer"
            : "w-4 bg-neutral-300/50 cursor-grabbing"
        )}
        style={{ left: `${(currentTime / totalLength) * 100}%` }}
        type="button"
        role="slider"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <Tally2
          className="text-neutral-700/50"
          width={12}
          height={24}
          viewBox="0.5 0 12 24"
        />
        <div
          className={cn(
            "group-hover:block touch:block",
            "absolute left-1/2 -top-6 touch:top-unset touch:-bottom-6",
            "px-1.5 pt-1 pb-1",
            0 < currentTime
              ? currentTime === totalLength
                ? "-translate-x-3/4"
                : "-translate-x-1/2"
              : "-translate-x-1/4",
            "font-mono tabular-nums text-xs leading-[10px] font-semibold",
            "bg-white/25 text-white/50 rounded-full",
            "transition-colors duration-200 ease-in-out",
            startPosition === null
              ? "hidden"
              : "block bg-white/50 text-white/75"
          )}
        >
          {currentTime}/{totalLength}
        </div>
      </button>
    </>
  );
}
