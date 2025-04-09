import { Delta, LoroDoc, LoroText, PeerID } from "loro-crdt";
import Quill, { DeltaOperation, Sources } from "quill";
import isEqual from "is-equal";
import QuillDelta from "quill-delta";

type Frontiers = { peer: PeerID; counter: number }[];

function showFrontiers(frontiers: Frontiers): string {
  return frontiers.map((x) => `${x.peer}@${x.counter}`).join(";");
}

export class QuillBinding {
  private richtext: LoroText;
  constructor(public doc: LoroDoc, public quill: Quill) {
    this.quill = quill;
    const richtext = doc.getText("text");
    this.richtext = richtext;
    richtext.subscribe(async (event) => {
      if (event.by !== "local" && event.origin !== "ignore") {
        for (const e of event.events) {
          if (e.diff.type === "text") {
            const eventDelta = e.diff.diff;
            const delta: Delta<string>[] = [];
            let index = 0;
            for (let i = 0; i < eventDelta.length; i++) {
              const d = eventDelta[i];
              const length = d.delete || d.retain || d.insert!.length;
              // skip the last newline that quill automatically appends
              if (
                d.insert &&
                d.insert === "\n" &&
                index === quill.getLength() - 1 &&
                i === eventDelta.length - 1 &&
                d.attributes != null &&
                Object.keys(d.attributes).length > 0
              ) {
                delta.push({
                  retain: 1,
                  attributes: d.attributes,
                });
                index += length;
                continue;
              }

              delta.push(d);
              index += length;
            }

            quill.updateContents(new QuillDelta(delta), "this" as any);
            const a = doc.getText("text").toDelta();
            const b = this.quill.getContents().ops;
            if (!assertEqual(a, b as any, true)) {
              console.log(this.doc.peerId, "COMPARE AFTER CRDT_EVENT", e.diff);
              this.resetQuillContent(a)
            }
          }
        }
      }
    });
    quill.setContents(
      new QuillDelta(
        richtext.toDelta().map((x) => ({
          insert: x.insert,
          attributions: x.attributes,
        }))
      ),
      "this" as any
    );
    quill.on("editor-change", this.quillObserver);
  }

  async checkout(frontiers: Frontiers) {
    // Checkout
    this.doc.checkout(frontiers);
    const a = this.richtext.toDelta();
    await new Promise(r => setTimeout(r, 10));
    if (!isEqual(this.doc.frontiers(), frontiers)) {
      return;
    }

    // Check the correctness
    const b = this.quill.getContents().ops;
    if (!assertEqual(a, b as any, true)) {
      console.error("Inconsistent after checkout");
      this.resetQuillContent(a)
    }
  }

  async checkoutToLatest() {
    if (!this.doc.isDetached()) {
      return;
    }

    this.doc.attach();
    const a = this.richtext.toDelta();
    const frontiers = this.doc.frontiers();
    await new Promise(r => setTimeout(r, 10));
    if (!isEqual(this.doc.frontiers(), frontiers)) {
      return;
    }

    // Check the correctness
    const b = this.quill.getContents().ops;
    if (!assertEqual(a, b as any, true)) {
      console.error("Inconsistent after checkout");
      this.resetQuillContent(a);
    }
  }

  quillObserver: (
    name: "text-change",
    delta: QuillDelta,
    oldContents: QuillDelta,
    source: Sources
  ) => void = (_eventType, delta, _state, origin) => {
    if (delta && delta.ops) {
      // update content
      const ops = delta.ops;
      if (origin !== ("this" as any)) {
        if (this.richtext.toString().slice(-1) !== '\n') {
          this.richtext.applyDelta([{ retain: this.richtext.length }, { insert: "\n" }]);
          this.doc.commit({ origin: "ignore" });
        }
        this.applyDelta(ops as DeltaOperation[]);
        const a = this.richtext.toDelta();
        const b = this.quill.getContents().ops;
        if (!assertEqual(a, b as any, true)) {
          console.log(this.doc.peerId, "COMPARE AFTER QUILL_EVENT");
          this.resetQuillContent(a);
        }
        // console.log("SIZE", this.doc.exportFrom().length);
        // this.doc.debugHistory();
      }
    }
  };

  private resetQuillContent(a: Delta<string>[]) {
    const s = this.quill.getSelection();
    this.quill.setContents(new QuillDelta(a), "this" as any);
    s && this.quill.setSelection(s.index, s.length);
  }

  applyDelta(delta: DeltaOperation[]) {
    this.richtext.applyDelta(delta as any);
    this.doc.commit();
  }

  destroy() {
    // TODO: unobserve
    this.quill.off("editor-change", this.quillObserver);
  }
}

function assertEqual(
  a: Delta<string>[],
  b: Delta<string>[],
  alert: boolean
): boolean {
  a = normQuillDelta(a);
  b = normQuillDelta(b);
  const equal = isEqual(a, b);
  if (alert) {
    console.assert(equal, a, b);
  }
  return equal;
}

/**
 * Removes the ending '\n's if it has no attributes.
 *
 * Extract line-break to a single op
 *
 * Normalize attributes field
 */
export const normQuillDelta = (delta: Delta<string>[]): Delta<string>[] => {
  delta = delta.slice();
  for (const d of delta) {
    for (const key of Object.keys(d.attributes || {})) {
      if (d.attributes![key] == null) {
        delete d.attributes![key];
      }
    }
  }

  for (const d of delta) {
    if (Object.keys(d.attributes || {}).length === 0) {
      delete d.attributes;
    }
  }

  // split elements by "\n"
  const ans: Delta<string>[] = [];
  for (const span of delta) {
    if (span.insert != null && span.insert.includes("\n")) {
      const lines = span.insert.split("\n");
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        if (line.length !== 0) {
          ans.push({ ...span, insert: line } as Delta<string>);
        }
        if (i < lines.length - 1) {
          const attr = { ...span.attributes };
          const v: Delta<string> = { insert: "\n" };
          for (const style of ["bold", "link", "italic", "underline"]) {
            if (attr && attr[style]) {
              delete attr[style];
            }
          }

          if (Object.keys(attr || {}).length > 0) {
            v.attributes = attr;
          }
          ans.push(v);
        }
      }
    } else {
      ans.push(span);
    }
  }

  removeTrailingLinebreaks(ans);
  return ans;
};

function removeTrailingLinebreaks(delta: Delta<string>[]) {
  while (true) {
    let found = false;
    if (delta.length > 0) {
      const d = delta[delta.length - 1];
      const insert = d.insert;
      if (d.attributes == null &&
        insert != null &&
        insert.slice(-1) === "\n") {
        found = true;
        let ins = insert.slice(0, -1);
        while (ins.slice(-1) === "\n") {
          ins = ins.slice(0, -1);
        }

        if (ins.length === 0) {
          delta.pop();
        } else {
          delta[delta.length - 1] = { insert: ins };
        }
      }
    }

    if (!found) {
      break;
    }
  }
}

