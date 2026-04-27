"use client";

import Timeline from "@/components/TimelineView";
import TwinEditors, { TwinEditorRefs } from "@/components/TwinEditors";
import {
  decodeExport,
  EditorManager,
  EditorManagerImportData,
} from "@components/TwinEditors/EditorManager";
import { participants } from "@components/landing/store/peers";
import useResetPlayerState, {
  usePlayerState,
} from "@components/landing/store/player-state";
import {
  useResetTimelineHistory,
  useUpdateTimelineHistory,
} from "@components/landing/store/timeline-history";
import download from "downloadjs";
import { useCallback, useEffect, useRef, useState } from "react";
// import { useInView } from "react-intersection-observer";
import { useResetConnectedHistory } from "../store/connection-history";
import demoData from "../data/demo.json";
import { IconPlayerPlayFilled } from "@tabler/icons-react";

const decodedDemoData = decodeExport(demoData);
type VersionMap = { [key: string]: number };

export default function DemoSection() {
  // const { ref: sectionRef, inView: sectionIsInView } = useInView();
  const twinEditorRefs = useRef<TwinEditorRefs>(null);
  const managerRef = useRef<EditorManager | null>(null);
  const importDataRef = useRef<EditorManagerImportData | null>(null);
  const [resetCounter, setResetCounter] = useState(0);
  const [connected, setConnected] = useState(true);
  const updateTimelineHistory = useUpdateTimelineHistory();
  const [playerState, setPlayerState] = usePlayerState();
  const [versions, setVersions] = useState<
    { versions: [string, string]; versionMaps: [VersionMap, VersionMap] }
  >({ versions: ["", ""], versionMaps: [{}, {}] });

  // Load the demo data.
  useEffect(() => {
    decodedDemoData.then((data) => {
      importDataRef.current = data;
      setResetCounter((counter) => counter + 1);
      resetPlayerState(true);
      resetConnectedHistory();
      resetTimelineHistory();
    });
  }, []);

  // Auto-play
  // useEffect(() => {
  //   if (sectionIsInView) {
  //     setPlayerState((state) => {
  //       if (state.playing) {
  //         return state;
  //       } else {
  //         return { ...state, playing: true };
  //       }
  //     });
  //   } else {
  //     setPlayerState((state) => {
  //       if (state.playing) {
  //         return { ...state, playing: false };
  //       } else {
  //         return state;
  //       }
  //     });
  //   }
  // }, [sectionIsInView]);

  useEffect(() => {
    if (managerRef.current !== null || twinEditorRefs.current === null) {
      // Elements are not ready or manager has been already initialized.
      return;
    } else {
      const manager = importDataRef.current === null
        ? new EditorManager(
          participants,
          twinEditorRefs.current.editors,
          twinEditorRefs.current.toolbars,
        )
        : EditorManager.import(
          importDataRef.current,
          twinEditorRefs.current.editors,
          twinEditorRefs.current.toolbars,
        );
      importDataRef.current = null;
      const n = manager.subscribeAll((peer) => {
        Promise.resolve().then(() => {
          setVersions((versions) => {
            const newVersions = {
              versions: [...versions.versions],
              versionMaps: [...versions.versionMaps],
            } as {
              versions: [string, string];
              versionMaps: [VersionMap, VersionMap]
            };
            newVersions.versions[peer.index] = peer.readableVersion;
            newVersions.versionMaps[peer.index] = peer.versionMap();
            return newVersions;
          });
        });
      });
      managerRef.current = manager;
      return () => {
        manager.unsubscribeAll(n);
        manager.destroy();
        managerRef.current = null;
      };
    }
  }, [resetCounter]);

  useEffect(() => {
    if (managerRef.current === null) return;
    const manager = managerRef.current;
    const n = manager.sumText.subscribe((): void => {
      updateTimelineHistory(manager.sumText.getAllChanges());
    });
    return n;
  }, [resetCounter, updateTimelineHistory]);

  useEffect(() => {
    if (connected) {
      managerRef.current?.connectAll(true);
    } else {
      managerRef.current?.disconnectAll();
    }
  }, [resetCounter, connected]);

  useEffect(() => {
    managerRef.current?.playback(
      playerState.currentTime === playerState.totalLength
        ? null
        : playerState.currentTime,
    );
  }, [resetCounter, playerState.currentTime, playerState.totalLength]);

  const resetPlayerState = useResetPlayerState();
  const resetConnectedHistory = useResetConnectedHistory();
  const resetTimelineHistory = useResetTimelineHistory();

  // Reset the editors by re-initializing the manager.
  const onReset = useCallback(() => {
    setResetCounter((counter) => counter + 1);
    resetPlayerState();
    resetConnectedHistory();
    resetTimelineHistory();
  }, []);

  const onImport = useCallback(async (importData: EditorManagerImportData) => {
    importDataRef.current = importData;
    setResetCounter((counter) => counter + 1);
    resetPlayerState(true);
    resetConnectedHistory();
    resetTimelineHistory();
  }, []);

  // Export the history to a JSON file.
  const onExport = useCallback(async () => {
    const manager = managerRef.current;
    if (manager === null) return;
    const blob = new Blob([JSON.stringify(await manager.export())], {
      type: "application/json;charset=utf-8",
    });
    download(blob, "export.json");
  }, []);

  const [isFirst, setIsFirst] = useState(true);
  return (
    <div className="relative">
      {isFirst &&
        (
          <div
            className="absolute w-full h-full top-0 left-0 right-0 bottom-0 z-20 flex justify-center items-center rounded-xl cursor-pointer"
            style={{ backgroundColor: "hsl(0, 0%, 3.9%, 0.2)" }}
            onClick={() => {
              window.clarity?.("event", "demo-start");
              setIsFirst(false);
              setPlayerState((state) => ({ ...state, playing: true }));
            }}
          >
            <IconPlayerPlayFilled size={64} />
          </div>
        )}
      <div style={{ filter: isFirst ? "blur(2px)" : "" }}>
        <section className="flex flex-col gap-5">
          <TwinEditors
            ref={twinEditorRefs}
            connected={connected}
            setConnected={setConnected}
            versions={versions.versions}
            versionMaps={versions.versionMaps}
          />
          <Timeline onReset={onReset} onImport={onImport} onExport={onExport} />
        </section>
      </div>
    </div>
  );
}
