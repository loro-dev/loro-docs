import { atom, useAtomValue, useSetAtom } from "jotai";
import { useCallback } from "react";

type Duration = { begin: number; end: number; connected: boolean };

const connectedHistoryAtom = atom<Duration[]>([] satisfies Duration[]);

export function useConnectedHistory() {
  return useAtomValue(connectedHistoryAtom);
}

export function useResetConnectedHistory(): () => void {
  const setConnectedHistory = useSetAtom(connectedHistoryAtom);
  return useCallback(() => setConnectedHistory([]), [setConnectedHistory]);
}

export function useUpdateConnectedHistory(): (
  nextTimestamp: number,
  connected: boolean
) => void {
  const update = useSetAtom(connectedHistoryAtom);
  return useCallback(
    (nextTimestamp: number, connected: boolean) => {
      update((past): Duration[] => {
        if (past.length === 0) {
          return [{ begin: 0, end: nextTimestamp, connected }];
        }
        const last = past[past.length - 1];
        if (last.end === nextTimestamp) {
          if (last.begin < last.end) {
            return [
              ...past,
              { begin: nextTimestamp, end: nextTimestamp, connected },
            ];
          } else {
            const init = past.slice(0, -1);
            return [...init, { ...last, end: nextTimestamp }];
          }
        } else if (last.end < nextTimestamp) {
          if (last.connected === connected) {
            const init = past.slice(0, -1);
            return [...init, { ...last, end: nextTimestamp }];
          } else {
            return [
              ...past,
              { begin: last.end, end: nextTimestamp, connected },
            ];
          }
        } else {
          console.log(`Ignore connection event at ${nextTimestamp}.`);
          return past;
        }
      });
    },
    [update]
  );
}
