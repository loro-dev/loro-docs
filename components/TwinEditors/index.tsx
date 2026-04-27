"use client";

import { Separator } from "@ariakit/react";
import { ForwardedRef, forwardRef, useEffect, useRef } from "react";
import ConnectionToggle from "./ConnectionToggle";
import QuillToolBar from "./QuillToolBar";
import UserProfile from "./UserProfile";

export type TwinEditorsProps = {
  versions: [string, string];
  versionMaps: [{ [key: string]: number }, { [key: string]: number }];
  connected: boolean;
  setConnected: (connected: boolean) => void;
};

export type TwinEditorRefs = {
  editors: HTMLDivElement[];
  toolbars: HTMLDivElement[];
};

export default forwardRef<TwinEditorRefs, TwinEditorsProps>(TwinEditors);

function TwinEditors(
  { versions, connected, setConnected, versionMaps }: TwinEditorsProps,
  twinEditorRefs: ForwardedRef<TwinEditorRefs>
): JSX.Element {
  const editorRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  const toolbarRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];
  useEffect(() => {
    if (twinEditorRefs === null) {
      console.error("[TwinEditors] Expect `refs` not to be null.");
    } else {
      // Collect element refs to an object.
      const editors = Array(2);
      if (editorRefs[0].current) editors[0] = editorRefs[0].current;
      if (editorRefs[1].current) editors[1] = editorRefs[1].current;
      const toolbars = Array(2);
      if (toolbarRefs[0].current) toolbars[0] = toolbarRefs[0].current;
      if (toolbarRefs[1].current) toolbars[1] = toolbarRefs[1].current;
      const refsObject: TwinEditorRefs = { editors, toolbars };
      // According to documentation, the `ref` can be an object or a function.
      if (typeof twinEditorRefs === "function") {
        twinEditorRefs(refsObject);
      } else {
        twinEditorRefs.current = refsObject;
      }
    }
  }, []);
  return (
    <section className="w-full min-h-[380px] grid gap-5 items-center grid-rows-twin-editors grid-cols-1 md:grid-rows-1 md:grid-cols-twin-editors">
      <div className="h-full box-border bg-example rounded-[40px] flex flex-col p-5 min-h-[380px]">
        <UserProfile
          // avatarColor="#afb6d4"
          avatarUrl="/images/avatar-1.svg"
          name="Alice"
          version={versions[0]}
          versionMap={versionMaps[0]}
        />
        <Separator
          className="mt-5 border-t border-editor-panel-body"
          orientation="vertical"
        />
        <main className="pt-2.5 flex-grow">
          <div ref={editorRefs[0]} />
        </main>
        <QuillToolBar ref={toolbarRefs[0]} />
      </div>
      <ConnectionToggle
        className="justify-self-center"
        connected={connected}
        onToggle={setConnected}
      />
      <div className="h-full box-border bg-example rounded-[40px] flex flex-col p-5 min-h-[380px]">
        <UserProfile
          // avatarColor="#9fea52"
          avatarUrl="/images/avatar-2.svg"
          backgroundColor="#99b3f4"
          name="Bob"
          version={versions[1]}
          versionMap={versionMaps[1]}
        />
        <Separator
          className="mt-5 border-t border-editor-panel-body"
          orientation="vertical"
        />
        <main className="pt-2.5 flex-grow">
          <div className="min-h-[150px]" ref={editorRefs[1]} />
        </main>
        <QuillToolBar ref={toolbarRefs[1]} />
      </div>
    </section>
  );
}
