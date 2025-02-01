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
  from: docA.oplogVersion(),
});
docA.import(missingOps);

expect(docA.toJSON()).toStrictEqual({
  list: ["A", "C"],
});
expect(docA.toJSON()).toStrictEqual(docB.toJSON());
```

## Real-time Collaboration

Due to CRDT properties, document consistency is guaranteed when peers receive the same updates, regardless of order or duplicates.

- First Sync: Initial synchronization between peers (done in the example above)
- Real-time Sync (shown in the example below):
  - Subscribe to local updates
  - Broadcast updates directly to all the other peers
  - No need for version comparison
  - As long as updates reach all peers, consistency is maintained

Example: 

```ts 
const docA = new LoroDoc();
const docB = new LoroDoc();
// Assume docA and docB finished the first sync

docA.subscribeLocalUpdates((update) => {
  // simulate sending update to docB
  docB.import(update);
});

docB.subscribeLocalUpdates((update) => {
  // simulate sending update to docA
  docA.import(update);
});

docA.getText("text").insert(0, "Hello");
docA.commit();
await Promise.resolve(); // await the event to be emitted
console.log(docB.toJSON());
// { text: "Hello" }
```
