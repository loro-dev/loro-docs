# Event Handling in Loro

Loro implements an event system to track changes in the document. This section
explains when events are emitted and how transactions work in Loro.

## Event Emission Points

Events in Loro are emitted whenever the internal document state changes. This
mechanism allows application-level derived states to automatically synchronize
with changes in the document state.

1. **Local Operations**: For local operations (like insertions or deletions on
   text), the operations are first placed in a pending state within an internal
   transaction.

2. **Transaction Commit**: When a transaction is committed, all pending
   operations collectively emit their corresponding events. This transaction
   commit occurs in two scenarios:

   - When `LoroDoc.commit()` is explicitly called
   - Automatically before an import or export operation

   Note that events are emitted asynchronously after a microtask. If you need to handle events immediately after a commit, you should await a microtask:

```javascript
const doc = new LoroDoc();
doc.subscribe((event) => {
   console.log("Event:", event);
});

const text = doc.getText("text");
text.insert(0, "Hello");
doc.commit();
// Event hasn't been emitted yet
await Promise.resolve();
// Now the event has been emitted
```

3. **Import**: When importing changes from a remote source using the `import()`
   method, respective events are emitted. This allows the local document to
   react to changes made by other peers.

```javascript no_run
const doc = new LoroDoc();
doc.subscribe((event) => {
   console.log("Event:", event);
});

doc.import(remoteChanges); // This will trigger events after a microtask
await Promise.resolve();   // Wait for events to be emitted
```

4. **Version Checkout**: When you switch document state to a different version
   using `doc.checkout(frontiers)`, Loro emits an event to reflect this change.
   Like other events, these are also emitted after a microtask.

```javascript
const doc = new LoroDoc();
const frontiers = doc.frontiers();
doc.checkout(frontiers);   // This will trigger events after a microtask
await Promise.resolve();   // Wait for events to be emitted
```

## Transaction Behavior

Transactions in Loro primarily serve to bundle related operations and emit their
events together as a cohesive unit. This is useful in several scenarios:

1. **Related Local Operations**: When performing multiple local operations that
   are logically connected, you may want them to:
   - Share the same commit message
   - Have the same timestamp
   - Move together during undo/redo operations

2. **Event Handling**: Applications often benefit from receiving related changes
   as a single batch rather than individual updates. Transactions facilitate
   this by:
   - Allowing you to set an origin identifier during commit
   - Including this origin value in the emitted events
   - Enabling better event filtering and processing based on the origin

<aside>
Operations within a transaction are not immediately committed to the internal
oplog. They are only committed when the transaction itself is committed.
However, in order to make it easier to use and compare versions, uncommitted
operations will also directly update the version.
</aside>

## Triggering a Commit

There are several ways to trigger a commit:

1. **Explicit Commit**: Directly calling the `commit()` method on the Loro
   document.

   ```javascript
   const doc = new LoroDoc();
   const text = doc.getText("myText");
   text.insert(0, "Hello, Loro!");
   doc.commit(); // This commits pending operations and emits events
   ```

2. **Before Import/Export**: A commit is automatically triggered before
   executing an import operation.

   ```javascript
   const doc1 = new LoroDoc();
   doc1.setPeerId(1);
   const doc2 = new LoroDoc();
   doc2.setPeerId(2);

   // Some ops on doc1 and doc2
   doc1.getText("text").insert(0, "Alice");
   doc2.getText("text").insert(0, "Hello, Loro!");
   console.log(doc1.version().toJSON()); // Map(0) {}
   console.log(doc2.version().toJSON()); // Map(0) {}
   const updates = doc1.export({ mode: "snapshot" });
   doc2.import(updates); // This first commits any pending operations in doc2
   console.log(doc2.version().toJSON()); // Map(2) { "1" => 5, "2" => 12 }
   console.log(doc1.version().toJSON()); // Map(2) { "1" => 5 }
   ```

## Transactions in Loro

It's important to note that Loro's concept of a transaction differs from
traditional database transactions:

- Loro transactions do not have ACID properties.
- They primarily serve as event wrappers.
- There is no rollback mechanism if an operation fails.
