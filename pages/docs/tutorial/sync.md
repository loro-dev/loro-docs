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

### Sync Strategies

1. **First Sync** (Initial synchronization between peers):
   - New peers can exchange their [Version Vectors](/docs/tutorial/version) to determine missing updates
   - Use `doc.export({ mode: "update", from: versionVector })` to get updates since the peer's last known state.
     You may as well send the whole history by `doc.export({ mode: "update" })` as shown in the example above.
   - Example shows basic first sync scenario

2. **Realtime Sync** (Continuous updates):
   - Subscribe to local updates
   - Broadcast updates directly to all other peers
   - No need for version comparison after initial sync
   - As long as updates reach all peers, consistency is maintained

### Example

Here's how two peers can establish realtime sync when one comes online with offline changes:

1. Both peers exchange their version information
2. Each peer shares their missing updates:
   - `doc2` gets updates it's missing from `doc1`
   - `doc1` gets updates it's missing from `doc2`
3. Both peers establish realtime sync to stay connected

```ts
const doc1 = new LoroDoc();
doc1.getText("text").insert(0, "Hello");
// Peer2 joins the network
const doc2 = new LoroDoc();
// ... doc2 may import its local snapshot

// 1. Exchange version information
const peer2Version = doc2.oplogVersion();
const peer1Version = doc1.oplogVersion();

// 2. Request missing updates from existing peers
const missingOps = doc1.export({ 
  mode: "update",
  from: peer2Version 
});
doc2.import(missingOps);
const missingOps2 = doc2.export({
  mode: "update",
  from: peer1Version,
});
doc1.import(missingOps2);

// 3. Establish realtime sync
doc2.subscribeLocalUpdates((update) => {
  // websocket.send(update);
});
doc1.subscribeLocalUpdates((update) => {
  // websocket.send(update);
});

// Now both peers are in sync and can collaborate
```
