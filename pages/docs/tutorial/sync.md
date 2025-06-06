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

## Understanding the `import()` Return Value

The `import()` method in Loro's JavaScript/WASM binding returns an object that provides feedback on the import operation. This object, let's call it `ImportStatusJS`, has the following structure:

```typescript
interface ImportStatusJS {
  success: PeerVersionRange;
  pending?: PeerVersionRange; // Optional: only present if there are pending operations
}

interface PeerVersionRange {
  [peerId: string]: {
    start: number; // Start counter (inclusive)
    end: number;   // End counter (exclusive)
  };
}
```

### Fields Explained:

1.  **`success`** (Object, `PeerVersionRange`)
    *   **Description**: This field is always present and details the ranges of operations (changes) that were successfully imported and applied to the Loro document.
    *   **Structure**: It's an object where:
        *   Each **key** is a `string` representing a `PeerID` (the unique identifier of a collaborator or a source of changes).
        *   Each **value** is an object `{ start: number, end: number }` defining a continuous range of operation counters for that specific peer.
            *   `start`: The starting counter of the successfully imported range (inclusive).
            *   `end`: The ending counter of the successfully imported range (exclusive). This means operations from `start` up to, but not including, `end` were processed.
    *   **Purpose**: Helps understand which parts of the provided update data have been integrated into the local document's state.
    *   **Example**:
        ```javascript
        // Assuming importResult is the return value of doc.import(bytes)
        console.log(importResult.success);
        // Example output:
        // {
        //   "clientA_peerId": { "start": 0, "end": 50 },
        //   "server_peerId": { "start": 120, "end": 150 }
        // }
        // This means operations from clientA (counters 0-49) and
        // operations from server (counters 120-149) were successfully imported.
        ```

2.  **`pending`** (Object, `PeerVersionRange`, optional)
    *   **Description**: This field is only present if some operations from the imported data could not be applied because they depend on other operations that Loro has not seen yet (i.e., their causal dependencies are missing). It details these "pending" operation ranges.
    *   **Structure**: Identical to the `success` field. An object mapping `PeerID` strings to `{ start: number, end: number }` counter ranges.
    *   **Purpose**: Informs the application that certain changes are known but are "on hold" awaiting their prerequisites. To apply these pending changes, the missing prerequisite operations must be imported first. This is crucial for maintaining data consistency in collaborative scenarios.
    *   **Example**:
        ```javascript
        // Assuming importResult is the return value of doc.import(bytes)
        if (importResult.pending) {
          console.log(importResult.pending);
          // Example output:
          // {
          //   "clientA_peerId": { "start": 50, "end": 60 },
          //   "clientB_peerId": { "start": 10, "end": 25 }
          // }
          // This means operations from clientA (counters 50-59) and
          // operations from clientB (counters 10-24) are pending due to missing dependencies.
        }
        ```

### How to Use This Information:

*   Check the `success` field to confirm which updates were applied.
*   If the `pending` field exists and is not empty, it signals that further updates (dependencies) are required to fully integrate all known changes. Your application might need to fetch or request these missing updates from other peers or a central server.
