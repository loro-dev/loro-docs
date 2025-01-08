export type TrackChange = {
  lamport: number;
  length: number;
  timestamp?: Date;
};

export type TimelineTrack = {
  peerId: string;
  changes: TrackChange[];
};

export type TimelineHistory = {
  tracks: TimelineTrack[];
  totalLength: number;
  currentVersion: number;
};
