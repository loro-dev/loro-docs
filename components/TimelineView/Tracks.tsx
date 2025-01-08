import { useTimelineHistory } from "@components/landing/store/timeline-history";
import { useConnectedHistory } from "@components/landing/store/connection-history";

export default function Tracks(): JSX.Element {
  const history = useTimelineHistory();
  const connectedHistory = useConnectedHistory();
  return (
    <>
      {history.tracks.map((track) => (
        <div key={`peer-${track.peerId}`} className="relative h-3 min-w-[1px]">
          {track.changes.map((change) => (
            <div
              key={`peer-${track.peerId}-change-${change.lamport}`}
              className="absolute top-0 bottom-0 rounded-full bg-timeline-change"
              style={{
                left: `${(change.lamport / history.totalLength) * 100}%`,
                width: `${(change.length / history.totalLength) * 100}%`,
              }}
            />
          ))}
          {connectedHistory.map(({ begin, end, connected }) =>
            connected ? null : (
              <div
                key={`peer-${track.peerId}-disconnected-${begin}-${end}`}
                className="absolute top-0 bottom-0 rounded-full bg-red-500/25"
                style={{
                  left: `${(begin / history.totalLength) * 100}%`,
                  width: `${((end - begin) / history.totalLength) * 100}%`,
                }}
              />
            )
          )}
        </div>
      ))}
    </>
  );
}
