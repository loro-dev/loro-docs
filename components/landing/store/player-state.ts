import { atom, useAtom, useAtomValue, useSetAtom, SetStateAction } from "jotai";
import { useCallback } from "react";

export type PlayerState = {
  playing: boolean;
  currentTime: number;
  totalLength: number;
  /**
   * Only used after import. If this is set to `true`, when `totalLength` is
   * updated, `currentTime` will not be set to the new `totalLength`.
   */
  waitingForImport: boolean;
};

const initialState: PlayerState = {
  playing: false,
  currentTime: 0,
  totalLength: 0,
  waitingForImport: false,
};

export const playerStateAtom = atom<PlayerState>(initialState);

export default function useResetPlayerState(): (
  waitingForImport?: boolean
) => void {
  const setPlayerState = useSetAtom(playerStateAtom);
  return useCallback(
    (waitingForImport = false) => {
      setPlayerState({
        playing: false,
        currentTime: 0,
        totalLength: 0,
        waitingForImport,
      });
    },
    [setPlayerState]
  );
}

const currentTimeAtom = atom(
  (get) => get(playerStateAtom).currentTime,
  (_get, set, value: number) =>
    set(playerStateAtom, (previousState) => {
      const clampedValue = Math.max(
        0,
        Math.min(value, previousState.totalLength)
      );
      return {
        ...previousState,
        currentTime: clampedValue,
        waitingForImport: false,
      };
    })
);

const totalLengthAtom = atom(
  (get) => get(playerStateAtom).totalLength,
  (_get, set, newLength: number) =>
    set(playerStateAtom, (previousState) => {
      return {
        ...previousState,
        totalLength: newLength,
        currentTime:
          // Waiting for import or reviewing
          previousState.waitingForImport ||
            previousState.currentTime < previousState.totalLength
            ? previousState.currentTime
            : newLength,
        waitingForImport: false,
      };
    })
);

export function usePlayerState(): [
  PlayerState,
  (arg: SetStateAction<PlayerState>) => void
] {
  return useAtom(playerStateAtom);
}

export function useIsReviewing(): boolean {
  const { currentTime, totalLength } = useAtomValue(playerStateAtom);
  return totalLength > 0 && currentTime < totalLength;
}

export function useIsPlaying(): boolean {
  return useAtomValue(playerStateAtom).playing;
}

export function useCurrentTimeState(): [number, (currentTime: number) => void] {
  return useAtom(currentTimeAtom);
}

export function useTotalLength(): number {
  return useAtomValue(totalLengthAtom);
}

export function useSetTotalLength(): (update: number) => void {
  return useSetAtom(totalLengthAtom);
}
