import { TimelineTrack } from "./types";

export function computeTotalLength(tracks: TimelineTrack[]): number {
  const lengths = tracks.map((track) =>
    track.changes.reduce(
      (acc, change) => Math.max(acc, change.lamport + change.length),
      0
    )
  );
  return Math.max(...lengths);
}
