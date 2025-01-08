---
keywords: "loro-crdt, build collaboration software, local-first, operation transform, crdts, ot"
description: "How to use Loro to build real-time or asynchronous collaboration software."
---

# Getting Started

You can use Loro in your application by using:

- [`loro-crdt`](https://www.npmjs.com/package/loro-crdt) NPM package
- [`loro`](https://crates.io/crates/loro) Rust crate
- [`loro-swift`](https://github.com/loro-dev/loro-swift) Swift package
- You can also find a list of examples in
  [Loro examples in Deno](https://github.com/loro-dev/loro-examples-deno).

The following guide will use `loro-crdt` js package as the example.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/loro-basic-test?file=test%2Floro-sync.test.ts)

## Install

```bash
npm install loro-crdt

# Or
pnpm install loro-crdt

# Or
yarn add loro-crdt
```

If you're using `Vite`, you should add the following to your vite.config.ts:

```ts no-run
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
  plugins: [...otherConfigures, wasm(), topLevelAwait()],
});
```

If you're using `Next.js`, you should add the following to your next.config.js:

```js no-run
module.exports = {
  webpack: function (config) {
    config.experiments = {
      layers: true,
      asyncWebAssembly: true,
    };
    return config;
  },
};
```

You can also use Loro directly in the browser via ESM imports. Here's a minimal
example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>ESM Module Example</title>
  </head>

  <body>
    <div id="app"></div>
    <script type="module">
      import init, {
        LoroDoc,
      } from "https://cdn.jsdelivr.net/npm/loro-crdt@1.0.9/web/index.js";

      init().then(() => {
        const doc = new LoroDoc();
        const text = doc.getText("text");
      });
    </script>
  </body>
</html>
```

## Introduction

It is well-known that syncing data/building realtime collaborative apps is
challenging, especially when devices can be offline or part of a peer-to-peer
network. Loro simplifies this process for you.

After you model your app state by Loro, syncing is simple:

```ts
const docA = new LoroDoc();
const docB = new LoroDoc();

//...operations on docA and docB

// Assume docA and docB are two Loro documents in two different devices
const bytesA = docA.export({ mode: "update" });
// send bytes to docB by any method
docB.import(bytesA);
// docB is now updated with all the changes from docA

const bytesB = docB.export({ mode: "update" });
// send bytes to docA by any method
docA.import(bytesB);
// docA and docB are now in sync, they have the same state
```

Saving your app state is also straightforward:

```ts
const doc = new LoroDoc();
doc.getText("text").insert(0, "Hello world!");
const bytes = doc.export({ mode: "snapshot" });
// Bytes can be saved to local storage, database, or sent over the network
```

Loading your app state:

```ts no_run
const newDoc = new LoroDoc();
newDoc.import(bytes);
```

Loro also makes it easy for you to time travel the history and add version
control to your app. [Learn more about time travel](/docs/tutorial/time_travel).

```ts no_run
doc.checkout(version); // Checkout the doc to the given version
```

Loro is compatible with the JSON schema. If you can model your app state with
JSON, you probably can sync your app with Loro. Because we need to adhere to the
JSON schema, using a number as a key in a Map is not permitted, and cyclic links
should be avoided.

```ts no_run
doc.toJSON(); // Get the JSON representation of the doc
```

## Entry Point: LoroDoc

LoroDoc is the entry point for using Loro. You must create a Doc to use Map,
List, Text, and other types and to complete data synchronization.

```ts
const doc = new LoroDoc();
const text: LoroText = doc.getText("text");
text.insert(0, "Hello world!");
console.log(doc.toJSON()); // { "text": "Hello world!" }
```

## Container

We refer to CRDT types such as `List`, `Map`, `Tree`, `MovableList`, and `Text`
as `Container`s.

Here are their basic operations:

```ts
const doc = new LoroDoc();
const list: LoroList = doc.getList("list");
list.insert(0, "A");
list.insert(1, "B");
list.insert(2, "C");

const map: LoroMap = doc.getMap("map");
// map can only has string key
map.set("key", "value");
expect(doc.toJSON()).toStrictEqual({
  list: ["A", "B", "C"],
  map: { key: "value" },
});

// delete 2 element at index 0
list.delete(0, 2);
expect(doc.toJSON()).toStrictEqual({
  list: ["C"],
  map: { key: "value" },
});

// Insert a text container to the list
const text = list.insertContainer(0, new LoroText());
text.insert(0, "Hello");
text.insert(0, "Hi! ");

expect(doc.toJSON()).toStrictEqual({
  list: ["Hi! Hello", "C"],
  map: { key: "value" },
});

// Insert a list container to the map
const list2 = map.setContainer("test", new LoroList());
list2.insert(0, 1);
expect(doc.toJSON()).toStrictEqual({
  list: ["Hi! Hello", "C"],
  map: { key: "value", test: [1] },
});
```

## Save and Load

To save the document, use `doc.export({mode: "snapshot"})` to get its binary
form. To open it again, use `doc.import(data)` to load this binary data.

```ts
const doc = new LoroDoc();
doc.getText("text").insert(0, "Hello world!");
const data = doc.export({ mode: "snapshot" });

const newDoc = new Loro();
newDoc.import(data);
expect(newDoc.toJSON()).toStrictEqual({
  text: "Hello world!",
});
```

Exporting the entire document on each keypress is inefficient. Instead, use
`doc.export({mode: "update", from: VersionVector})` to obtain binary data for
operations since the last export.

```ts
const doc = new LoroDoc();
doc.getText("text").insert(0, "Hello world!");
const data = doc.export({ mode: "snapshot" });
let lastSavedVersion = doc.version();
doc.getText("text").insert(0, "✨");
const update0 = doc.export({ mode: "update", from: lastSavedVersion });
lastSavedVersion = doc.version();
doc.getText("text").insert(0, "😶‍🌫️");
const update1 = doc.export({ mode: "update", from: lastSavedVersion });

{
  /**
   * You can import the snapshot and the updates to get the latest version of the document.
   */

  // import the snapshot
  const newDoc = new LoroDoc();
  newDoc.import(data);
  expect(newDoc.toJSON()).toStrictEqual({
    text: "Hello world!",
  });

  // import update0
  newDoc.import(update0);
  expect(newDoc.toJSON()).toStrictEqual({
    text: "✨Hello world!",
  });

  // import update1
  newDoc.import(update1);
  expect(newDoc.toJSON()).toStrictEqual({
    text: "😶‍🌫️✨Hello world!",
  });
}

{
  /**
   * You may also import them in a batch
   */
  const newDoc = new LoroDoc();
  newDoc.importUpdateBatch([update1, update0, data]);
  expect(newDoc.toJSON()).toStrictEqual({
    text: "😶‍🌫️✨Hello world!",
  });
}
```

If updates accumulate, exporting a new snapshot can quicken import times and
decrease the overall size of the exported data.

You can store the binary data exported from Loro wherever you prefer.

## Sync

Two documents with concurrent edits can be synchronized by just two message
exchanges.

Below is an example of synchronization between two documents:

```ts
const docA = new LoroDoc();
const docB = new LoroDoc();
const listA: LoroList = docA.getList("list");
listA.insert(0, "A");
listA.insert(1, "B");
listA.insert(2, "C");
// B import the ops from A
const data: Uint8Array = docA.export({ mode: "update" });
// The data can be sent to B through the network
docB.import(data);
expect(docB.toJSON()).toStrictEqual({
  list: ["A", "B", "C"],
});

const listB: LoroList = docB.getList("list");
listB.delete(1, 1);

// `doc.export({mode: "update", from: version})` can encode all the ops from the version to the latest version
// `version` is the version vector of another document
const missingOps = docB.export({
  mode: "update",
  from: docA.version(),
});
docA.import(missingOps);

expect(docA.toJSON()).toStrictEqual({
  list: ["A", "C"],
});
expect(docA.toJSON()).toStrictEqual(docB.toJSON());
```

## Event

You can subscribe to the event from `Container`s.

`LoroText` and `LoroList` can receive updates in
[Quill Delta](https://quilljs.com/docs/delta/) format.

The events will be emitted after a transaction is committed. A transaction is
committed when:

- `doc.commit()` is called.
- `doc.export(mode)` is called.
- `doc.import(data)` is called.
- `doc.checkout(version)` is called.

Below is an example of rich text event:

```ts
// The code is from https://github.com/loro-dev/loro-examples-deno
const doc = new LoroDoc();
const text = doc.getText("text");
text.insert(0, "Hello world!");
doc.commit();
let ran = false;
text.subscribe((e) => {
  for (const event of e.events) {
    if (event.diff.type === "text") {
      expect(event.diff.diff).toStrictEqual([
        {
          retain: 5,
          attributes: { bold: true },
        },
      ]);
      ran = true;
    }
  }
});
text.mark({ start: 0, end: 5 }, "bold", true);
doc.commit();
await new Promise((r) => setTimeout(r, 1));
expect(ran).toBeTruthy();
```

The types of events are defined as follows:

```ts
export interface LoroEvent {
  /**
   * The container ID of the event's target.
   */
  target: ContainerID;
  diff: Diff;
  /**
   * The absolute path of the event's emitter, which can be an index of a list container or a key of a map container.
   */
  path: Path;
}

export type Path = (number | string | TreeID)[];

export type Diff = ListDiff | TextDiff | MapDiff | TreeDiff | CounterDiff;

export type ListDiff = {
  type: "list";
  diff: Delta<Value[]>[];
};

export type TextDiff = {
  type: "text";
  diff: Delta<string>[];
};

export type MapDiff = {
  type: "map";
  updated: Record<string, Value | undefined>;
};

export type TreeDiffItem =
  | {
    target: TreeID;
    action: "create";
    parent: TreeID | undefined;
    index: number;
    fractionalIndex: string;
  }
  | {
    target: TreeID;
    action: "delete";
    oldParent: TreeID | undefined;
    oldIndex: number;
  }
  | {
    target: TreeID;
    action: "move";
    parent: TreeID | undefined;
    index: number;
    fractionalIndex: string;
    oldParent: TreeID | undefined;
    oldIndex: number;
  };

export type TreeDiff = {
  type: "tree";
  diff: TreeDiffItem[];
};

export type CounterDiff = {
  type: "counter";
  increment: number;
};

export type Delta<T> =
  | {
    insert: T;
    attributes?: { [key in string]: {} };
    retain?: undefined;
    delete?: undefined;
  }
  | {
    delete: number;
    attributes?: undefined;
    retain?: undefined;
    insert?: undefined;
  }
  | {
    retain: number;
    attributes?: { [key in string]: {} };
    delete?: undefined;
    insert?: undefined;
  };
```
