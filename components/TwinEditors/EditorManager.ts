import { bytesToBase64DataUrl, dataUrlToBytes } from "@/lib/utils/data";
import { showVersion } from "@/lib/utils/loro";
import { Change, LoroDoc, LoroEventBatch, OpId, Subscription } from "loro-crdt";
import Quill from "quill";
import { QuillBinding } from "./QuillBinding";

type PeerProfile = { name: string; peerId: string };

type Frontiers = OpId[];

function showFrontiers(frontiers: Frontiers): string {
  return frontiers.length === 0
    ? "{}"
    : "{ " +
    frontiers
      .map((x) => `peer: ${x.peer}, counter: ${x.counter}`)
      .join(";") +
    " }";
}

export type OpIdExportData = { peer: string; counter: number };
export type PeerProfileExportData = { name: string; peerId: string };

export type EditorInstanceExportData = {
  profile: PeerProfileExportData;
  encodedLoroText?: string;
  connected: boolean;
};

export type EditorInstanceImportData = {
  profile: PeerProfile;
  loroText?: Uint8Array;
  connected: boolean;
};

const QUILL_TOOLBAR_MAP: WeakMap<HTMLElement, Quill> = new WeakMap();

class EditorInstance {
  #index: number;
  #profile: PeerProfile; // Exportable (JSON)
  #text: LoroDoc; // Exportable (binary data)
  #quill: Quill;
  #binding: QuillBinding;
  #connected: boolean = true; // Exportable (JSON)
  #manager: EditorManager;

  public async export(): Promise<EditorInstanceExportData> {
    const rawData = this.#text.export({mode: "snapshot"});
    return {
      profile: {
        name: this.#profile.name,
        peerId: this.#profile.peerId.toString(),
      },
      encodedLoroText: await bytesToBase64DataUrl(rawData),
      connected: this.#connected,
    };
  }

  public async import(data: EditorInstanceImportData): Promise<void> {
    this.#profile = {
      name: data.profile.name,
      peerId: data.profile.peerId,
    };
    data.loroText && this.#text.import(data.loroText);
    this.#connected = data.connected;
  }

  /**
   * Get an iterator of other peers from the same editor manager.
   */
  *#otherPeers(): Generator<EditorInstance, void, unknown> {
    for (const instance of this.#manager.peers) {
      if (instance === this) continue;
      yield instance;
    }
  }

  public constructor(
    index: number,
    profile: PeerProfile,
    manager: EditorManager,
    editorElement: HTMLDivElement,
    toolbarElement: HTMLDivElement
  ) {
    this.#index = index;
    this.#profile = profile;
    this.#manager = manager;
    this.#text = new LoroDoc();
    this.#text.configTextStyle({
      bold: { expand: "after" },
      italic: { expand: "after" },
      underline: { expand: "after" },
      link: { expand: "none" },
      header: { expand: "none" },
    })
    this.#text.setPeerId(BigInt(profile.peerId));
    if (QUILL_TOOLBAR_MAP.has(toolbarElement)) {
      this.#quill = QUILL_TOOLBAR_MAP.get(toolbarElement)!;
    } else {
      this.#quill = new Quill(editorElement, {
        modules: {
          toolbar: {
            container: toolbarElement,
          }
        },
        theme: "snow",
        formats: ["bold", "underline", "header", "italic", "link"],
        placeholder: "Type something here!",
      });
      QUILL_TOOLBAR_MAP.set(toolbarElement, this.#quill);
    }
    this.#binding = new QuillBinding(this.#text, this.#quill);
    this.#text.subscribe((e) => {
      // Synchronize the change to the sum text.
      const sumVersion = this.#manager.sumText.version();
      const updateData = this.#text.export({mode: "update", from: sumVersion});
      this.#manager.sumText.import(updateData);
      // If this is a local change (i.e., not a change synchronized from
      // other peers), we synchronize to other connected peers if we're
      // connected.
      if (e.by === "local") {
        this.synchronize();
      }
    });
  }

  public get index(): number {
    return this.#index;
  }

  public get name(): string {
    return this.#profile.name;
  }

  public get text(): LoroDoc {
    return this.#text;
  }

  public get peerId(): string {
    return this.#profile.peerId;
  }

  public get quill(): Quill {
    return this.#quill;
  }

  public get binding(): QuillBinding {
    return this.#binding;
  }

  public disconnect(): void {
    this.#connected = false;
  }

  public connect(): void {
    this.#connected = true;
  }

  public get connected(): boolean {
    return this.#connected;
  }

  public async synchronize(): Promise<void> {
    if (this.connected) {
      await Promise.resolve();
      for (const that of this.#otherPeers()) {
        if (!that.connected) return;
        this.#text.import(that.#text.export({mode: "update", from: this.#text.version()}));
        that.#text.import(this.#text.export({mode: "update", from: that.#text.version()}));
      }
    }
  }

  public get readableVersion(): string {
    return showVersion(this.#text.version().toJSON());
  }

  public versionMap(): { [key: string]: number } {
    const map = this.#text.version().toJSON();
    const ans: { [key: string]: number } = {};
    for (const [key, value] of map.entries()) {
      if (key === "0") {
        ans["Alice"] = value
      } else {
        ans["Bob"] = value
      }
    }

    return ans;
  }
}

export type EditorManagerExportData = {
  numberOfOperations: number;
  peers: EditorInstanceExportData[];
};

export type EditorManagerImportData = {
  numberOfOperations: number;
  peers: EditorInstanceImportData[];
};

export async function decodeExport(
  data: EditorManagerExportData
): Promise<EditorManagerImportData> {
  return {
    numberOfOperations: data.numberOfOperations,
    peers: await Promise.all(
      data.peers.map(async (data) => ({
        profile: {
          name: data.profile.name,
          peerId: data.profile.peerId,
        },
        loroText: data.encodedLoroText != null ? await dataUrlToBytes(data.encodedLoroText) : undefined,
        connected: data.connected,
      }))
    ),
  };
}

export class EditorManager {
  #sumText: LoroDoc;
  #numberOfOperations: number = 0;
  #peers: EditorInstance[];
  #subscriptions: Map<number, Subscription[]> = new Map();

  static import(
    data: EditorManagerImportData,
    editorElements: HTMLDivElement[],
    toolbarElements: HTMLDivElement[]
  ): EditorManager {
    const manager = new EditorManager(
      data.peers.map((peer) => peer.profile),
      editorElements,
      toolbarElements
    );
    manager.#numberOfOperations = data.numberOfOperations;
    for (const [index, peer] of data.peers.entries()) {
      manager.#peers[index].import(peer);
    }
    return manager;
  }

  public constructor(
    peerProfiles: PeerProfile[],
    editorElements: HTMLDivElement[],
    toolbarElements: HTMLDivElement[]
  ) {
    if (
      editorElements.length < peerProfiles.length ||
      toolbarElements.length < peerProfiles.length
    ) {
      throw new RangeError("insufficient HTML elements for creating editors");
    }
    this.#sumText = new LoroDoc();
    this.#sumText.subscribe((e) => {
      if (e.by === "local") {
        this.#numberOfOperations += 1;
      }
    });
    this.#peers = peerProfiles.map((profile, index) => {
      return new EditorInstance(
        index,
        profile,
        this,
        editorElements[index]!,
        toolbarElements[index]!
      );
    });
  }

  public async export(): Promise<EditorManagerExportData> {
    return {
      numberOfOperations: this.#numberOfOperations,
      peers: await Promise.all(this.#peers.map((peer) => peer.export())),
    };
  }

  public get sumText(): LoroDoc {
    return this.#sumText;
  }

  public get numberOfOperations(): number {
    return this.#numberOfOperations;
  }

  public get peers(): EditorInstance[] {
    return this.#peers;
  }

  public connectAll(shouldSync: boolean = false): void {
    for (const peer of this.#peers) {
      peer.connect();
    }
    if (shouldSync) {
      for (const peer of this.#peers) {
        peer.synchronize();
      }
    }
  }

  public disconnectAll(): void {
    for (const peer of this.#peers) {
      peer.disconnect();
    }
  }

  public destroy(): void {
    for (const { binding } of this.#peers) {
      binding.destroy();
      binding.quill.setText("");
    }
  }

  public subscribeAll(
    listener: (instance: EditorInstance, e: LoroEventBatch) => void
  ): number {
    this.#subscriptions.set(
      this.#subscriptions.size,
      this.#peers.map((instance) =>
        instance.text.subscribe(listener.bind(null, instance))
      )
    );
    return this.#subscriptions.size - 1;
  }

  public unsubscribeAll(subscription: number): void {
    if (!this.#subscriptions.has(subscription)) return;
    this.#subscriptions
      .get(subscription)
      ?.forEach((unsubscribe, index) => unsubscribe());
    this.#subscriptions.set(subscription, []);
  }

  public playback(timestamp: number | null): void {
    if (this.#numberOfOperations === 0) return;
    if (timestamp === null) {
      for (const peer of this.#peers) {
        peer.quill.history.clear();
        peer.quill.enable();
        peer.binding.checkoutToLatest();
      }
    } else {
      for (const peer of this.#peers) {
        peer.quill.history.clear();
        peer.quill.disable();
        if (timestamp === 0) {
          peer.binding.checkout([]);
        } else {
          const t = timestamp - 1;
          const change0 = peer.binding.doc.getChangeAtLamport("0", t);
          const change1 = peer.binding.doc.getChangeAtLamport("1", t);
          const change0contains = change0 ? change0.lamport + change0.length > t : false;
          const change1contains = change1 ? change1.lamport + change1.length > t : false;
          if (change0contains && change1contains) {
            const change = peer.peerId === "0" ? change0 : change1;
            const id: OpId = { peer: change!.peer, counter: change!.counter + t - change!.lamport };
            peer.binding.checkout([id]);
            continue;
          }

          const cmp = this.compareChangeCausally(change0, change1);

          if (change0contains && cmp === 1) {
            const id: OpId = { peer: change0!.peer, counter: change0!.counter + t - change0!.lamport };
            peer.binding.checkout([id]);
          } else if (change1contains && cmp === -1) {
            const id: OpId = { peer: change1!.peer, counter: change1!.counter + t - change1!.lamport };
            peer.binding.checkout([id]);
          } else {
            // Two changes are concurrent to each other
            const change = peer.peerId === "0" ? change0 : change1;
            let counter = Math.min(
              change!.counter + t - change!.lamport,
              change!.counter + change!.length - 1
            );
            const id: OpId = { peer: change!.peer, counter };
            peer.binding.checkout([id]);
          }
        }
      }
    }
  }

  compareChangeCausally(a?: Change, b?: Change): -1 | 1 | 0 | undefined {
    if (a == null) {
      if (b == null) {
        return 0;
      }

      return -1;
    }

    if (b == null) {
      return 1;
    }

    const ans = this.#sumText.cmpFrontiers(
      [{ peer: a.peer, counter: a.counter }],
      [{ peer: b.peer, counter: b.counter + b.length - 1 }]
    );
    return ans
  }
}
