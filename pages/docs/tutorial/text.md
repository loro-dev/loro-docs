---
keywords: "text crdt, richtext, richtext editor"
description: "how to use loro richtext crdt and show all APIs of loro text crdt."
---

# Text

Loro supports both plain text and rich text. When rich text features (like mark
and unmark) are not used, the text container operates as plain text without any
rich text overhead, making it efficient for simple text operations.

LoroText offers excellent performance, particularly when handling large strings.
It significantly outperforms native JavaScript string operations due to its
internal B-tree structure. All basic operations like insert and delete have
O(log N) time complexity, making it highly efficient even when working with
documents containing several million characters.

> To learn how rich text CRDT in Loro works under the hood, please refer to our
> blog: [Introduction to Loro's Rich Text CRDT](/blog/loro-richtext).

## Editor Bindings

Loro provides official bindings for popular editors to make it easier to integrate Loro's CRDT capabilities:

### ProseMirror Binding

The [loro-prosemirror](https://github.com/loro-dev/loro-prosemirror) package provides seamless integration between Loro and ProseMirror, a powerful rich text editor framework. It includes:

- Document state synchronization with rich text support
- Cursor awareness and synchronization
- Undo/Redo support in collaborative editing

The ProseMirror binding can also be used with [Tiptap](https://tiptap.dev/), a popular rich text editor built on top of ProseMirror. This means you can easily add collaborative editing capabilities to your Tiptap-based applications.

```ts
import {
  CursorAwareness,
  LoroCursorPlugin,
  LoroSyncPlugin,
  LoroUndoPlugin,
  undo,
  redo,
} from "loro-prosemirror";
import { LoroDoc } from "loro-crdt";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";

const doc = new LoroDoc();
const awareness = new CursorAwareness(doc.peerIdStr);
const plugins = [
  ...pmPlugins,
  LoroSyncPlugin({ doc }),
  LoroUndoPlugin({ doc }),
  keymap({
    "Mod-z": undo,
    "Mod-y": redo,
    "Mod-Shift-z": redo,
  }),
  LoroCursorPlugin(awareness, {}),
];
const editor = new EditorView(editorDom, {
  state: EditorState.create({ doc, plugins }),
});
```

### CodeMirror Binding

The [loro-codemirror](https://github.com/loro-dev/loro-codemirror) package provides integration between Loro and CodeMirror 6, a versatile code editor. It supports:

- Document state synchronization
- Cursor awareness
- Undo/Redo functionality

```ts
import { EditorState } from "@codemirror/state";
import { EditorView } from "@codemirror/view";
import { LoroExtensions } from "loro-codemirror";
import { Awareness, LoroDoc, UndoManager } from "loro-crdt";

const doc = new LoroDoc();
const awareness = new Awareness(doc.peerIdStr);
const undoManager = new UndoManager(doc, {});

new EditorView({
    state: EditorState.create({
        extensions: [
            // ... other extensions
            LoroExtensions(
                doc,
                {
                    awareness: awareness,
                    user: { name: "Bob", colorClassName: "user1" },
                },
                undoManager,
            ),
        ],
    }),
    parent: document.querySelector("#editor")!,
});
```

## LoroText vs String

It's important to understand that LoroText is very different from using a regular string type. So the following code has different merge results:

Using `LoroText`:

```ts
const doc = new LoroDoc();
doc.setPeerId("0");
doc.getText("text").insert(0, "Hello");
const doc2 = new LoroDoc();
doc2.setPeerId("1");
doc2.getText("text").insert(0, "World");
doc.import(doc2.export({ mode: "update" }));
console.log(doc.getText("text").toString()); // "HelloWorld"
```

Using `String`:

```ts
const doc = new LoroDoc();
doc.setPeerId("0");
doc.getMap("map").set("text", "Hello");
const doc2 = new LoroDoc();
doc2.setPeerId("1");
doc2.getMap("map").set("text", "World");
doc.import(doc2.export({ mode: "update" }));
console.log(doc.getMap("map").get("text")); // "World"
```

### Merge Semantics

Unlike LoroMap which uses Last-Write-Wins (LWW) semantics, LoroText is designed to preserve edits. Here's how they differ:

When user A and user B make concurrent edits to the same text:
- LoroText will merge both users' edits in sequence, preserving both changes
- LoroMap will use LWW semantics, keeping only one user's changes

### When to Use String in LoroMap

There are specific scenarios where using a string in LoroMap (with LWW semantics) might be more appropriate than using LoroText:

- **URLs**: When dealing with hyperlinks, automatic merging could result in invalid URLs. In this case, it's better to use LoroMap's LWW semantics to ensure the URL remains valid.
- **Hash String**: When handling hash string, LWW semantics are more appropriate to maintain data accuracy and consistency.

## Rich Text Config

To use rich text in Loro, you need to specify the expanding behaviors for each
format first. When we insert new text at the format boundaries, they define
whether the inserted text should inherit the format.

There are four kinds of expansion behaviors:

- `after`(default): when inserting text right after the given range, the mark
  will be expanded to include the inserted text
- `before`: when inserting text right before the given range, the mark will be
  expanded to include the inserted text
- `none`: the mark will not be expanded to include the inserted text at the
  boundaries
- `both`: when inserting text either right before or right after the given
  range, the mark will be expanded to include the inserted text

### Example

```ts
const doc = new LoroDoc();
doc.configTextStyle({
  bold: { expand: "after" },
  link: { expand: "before" },
});
const text = doc.getText("text");
text.insert(0, "Hello World!");
text.mark({ start: 0, end: 5 }, "bold", true);
expect(text.toDelta()).toStrictEqual([
  {
    insert: "Hello",
    attributes: {
      bold: true,
    },
  },
  {
    insert: " World!",
  },
] as Delta<string>[]);

// " Test" will inherit the bold style because `bold` is configured to expand forward
text.insert(5, " Test");
expect(text.toDelta()).toStrictEqual([
  {
    insert: "Hello Test",
    attributes: {
      bold: true,
    },
  },
  {
    insert: " World!",
  },
] as Delta<string>[]);
```

## Methods

### `insert(pos: number, s: string)`

Insert text at the given pos.

### `delete(pos: number, len: number)`

Delete text at the given range.

### `slice(start: number, end: number): string`

Get a string slice.

### `toString(): string`

Get the plain text value.

### `charAt(pos: number): char`

Get the character at the given position.

### `splice(pos: number, len: number, text: string): string`

Delete and return the string at the given range and insert a string at the same
position.

### `length(): number`

Get the length of text

### `getCursor(pos: number, side: Side): Cursor | undefined`

Get the cursor at the given position.

### `toDelta(): Delta<string>[]`

Get the rich text value. It's in
[Quill's Delta format](https://quilljs.com/docs/delta/).

### `mark(range: {start: number, end: number}, key: string, value: any): void`

Mark the given range with a key-value pair.

### `unmark(range: {start: number, end: number}, key: string): void`

Remove key-value pairs in the given range with the given key.

### `update(text: string)`

Update the current text based on the provided text.

### `applyDelta(delta: Delta<string>[]): void`

Change the state of this text by delta.

If a delta item is `insert`, it should include all the attributes of the
inserted text. Loro's rich text CRDT may make the inserted text inherit some
styles when you use the `insert` method directly. However, when you use
`applyDelta` if some attributes are inherited from CRDT but not included in the
delta, they will be removed.

Another special property of `applyDelta` is if you format an attribute for
ranges out of the text length, Loro will insert new lines to fill the gap first.
It's useful when you build the binding between Loro and rich text editors like
Quill, which might assume there is always a newline at the end of the text
implicitly.

```ts
const doc = new LoroDoc();
const text = doc.getText("text");
doc.configTextStyle({ bold: { expand: "after" } });

text.insert(0, "Hello World!");
text.mark({ start: 0, end: 5 }, "bold", true);
const delta = text.toDelta();
const text2 = doc.getText("text2");
text2.applyDelta(delta);
expect(text2.toDelta()).toStrictEqual(delta);
```

### `subscribe(f: (event: Listener)): number`

This method returns a number that can be used to remove the subscription.

The text event is in `Delta<string>[]` format. It can be used to bind the rich
text editor. It has the same type as the arg of `applyDelta`, so the following
example works:

```ts
(async () => {
  const doc1 = new LoroDoc();
  doc1.configTextStyle({
    link: { expand: "none" },
    bold: { expand: "after" },
  });
  const text1 = doc1.getText("text");
  const doc2 = new LoroDoc();
  doc2.configTextStyle({
    link: { expand: "none" },
    bold: { expand: "after" },
  });
  const text2 = doc2.getText("text");
  text1.subscribe((e) => {
    for (const event of e.events) {
      const d = event.diff as TextDiff;
      text2.applyDelta(d.diff);
    }
  });
  text1.insert(0, "foo");
  text1.mark({ start: 0, end: 3 }, "link", true);
  doc1.commit();
  await new Promise((r) => setTimeout(r, 1));
  expect(text2.toDelta()).toStrictEqual(text1.toDelta());
  text1.insert(3, "baz");
  doc1.commit();
  await new Promise((r) => setTimeout(r, 1));
  expect(text2.toDelta()).toStrictEqual([
    { insert: "foo", attributes: { link: true } },
    { insert: "baz" },
  ]);
  expect(text2.toDelta()).toStrictEqual(text1.toDelta());
  text1.mark({ start: 2, end: 5 }, "bold", true);
  doc1.commit();
  await new Promise((r) => setTimeout(r, 1));
  expect(text2.toDelta()).toStrictEqual(text1.toDelta());
})();
```
