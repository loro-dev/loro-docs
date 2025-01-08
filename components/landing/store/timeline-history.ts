import { TimelineHistory, TimelineTrack } from "@components/TimelineView/types";
import { computeTotalLength } from "@components/TimelineView/utils";
import { atom, useAtomValue, useSetAtom } from "jotai";
import { Change } from "loro-crdt";
import { useCallback } from "react";
import { participants } from "./peers";
import { useSetTotalLength } from "./player-state";

const initialTimelineHistory = {
  tracks: [
    {
      peerId: "0",
      changes: [],
    },
    {
      peerId: "1",
      changes: [],
    },
  ],
  totalLength: 0,
  currentVersion: 0,
} satisfies TimelineHistory;

const timelineHistoryAtom = atom<TimelineHistory>(initialTimelineHistory);

export function useResetTimelineHistory(): () => void {
  const setTimelineHistory = useSetAtom(timelineHistoryAtom);
  return useCallback(
    () => setTimelineHistory(initialTimelineHistory),
    [setTimelineHistory]
  );
}

export function useTimelineHistory(): TimelineHistory {
  return useAtomValue(timelineHistoryAtom);
}

const timelineLengthAtom = atom((get) => get(timelineHistoryAtom).totalLength);

export function useTimelineLength(): number {
  return useAtomValue(timelineLengthAtom);
}

const isHistoryEmptyAtom = atom((get) => {
  const history = get(timelineHistoryAtom);
  return (
    history.tracks.length === 0 ||
    history.tracks.every((track) => track.changes.length === 0)
  );
});

export function useIsHistoryEmpty(): boolean {
  return useAtomValue(isHistoryEmptyAtom);
}

export function useUpdateTimelineHistory(): (
  changes: Map<string, Change[]>
) => void {
  const setTimelineHistory = useSetAtom(timelineHistoryAtom);
  const setTotalLength = useSetTotalLength();
  return useCallback(
    (changes: Map<string, Change[]>): void =>
      setTimelineHistory((previousHistory) => {
        const tracks: TimelineTrack[] = Array.from(previousHistory.tracks);
        for (const [peerId, peerChanges] of changes) {
          // Get changes of the current peer.
          const index = participants.findIndex((p) => p.peerId === peerId);
          const track = {
            peerId,
            changes: peerChanges.map((change) => ({
              lamport: change.lamport,
              length: change.length,
            })),
          };
          // Update tracks.
          if (index === -1) {
            console.error(`Unknown peer ID: ${peerId}`);
            tracks.push(track);
          } else {
            tracks[index] = track;
          }
        }
        const totalLength = computeTotalLength(tracks);
        setTotalLength(totalLength);
        return { ...previousHistory, tracks, totalLength };
      }),
    [setTimelineHistory]
  );
}
