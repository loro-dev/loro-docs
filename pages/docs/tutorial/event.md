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

## Subscribing to Specific Commit Events

Loro provides specialized subscription methods for scenarios where you need to react to specific moments in the commit lifecycle.

### `doc.subscribePreCommit(callback)`

- **Purpose**: This event is triggered *before* a transaction is committed. It provides an opportunity to perform validation or make last-minute changes to the operations within the current transaction before they are finalized. This can be crucial for ensuring data integrity or implementing custom pre-commit hooks.
- **Parameters**:
    - `callback: (event: PreCommitEvent) => void`: A function that will be called before a commit. The `event` object passed to the callback might contain information about the pending transaction, though the exact structure of `PreCommitEvent` should be checked in the API documentation for details.
- **Return Value**: A subscription ID that can be used to unsubscribe later using `doc.unsubscribe(subscriptionId)`.
- **Example**:

```javascript
const doc = new LoroDoc();
const text = doc.getText("content");

const subId = doc.subscribePreCommit(() => {
  console.log("A transaction is about to be committed.");
  const currentText = text.toString();
  if (currentText.includes("forbidden")) {
    // Example: Prevent commit if certain content is present
    // Note: Actual prevention/modification logic might be complex
    // and depend on how Loro handles changes within the callback.
    // For now, we'll just log.
    console.warn("Commit contains forbidden content!");
    // Potentially, you might modify 'text' here if allowed by Loro's transaction model,
    // or throw an error to signal issues, though error handling specifics
    // would depend on Loro's design.
  }
});

text.insert(0, "Initial content. ");
doc.commit(); // Triggers the preCommit callback

text.insert(text.length, "Adding some forbidden words.");
doc.commit(); // Triggers the preCommit callback, logs warning

// To stop listening
doc.unsubscribe(subId);
```

### `doc.subscribeFirstCommitFromPeer(callback)`

- **Purpose**: This event is triggered only when the *first* commit from a new remote peer is received and applied to the document. This is particularly useful for initializing peer-specific state or UI elements when a new collaborator joins or their initial changes are integrated. It helps in distinguishing the very first contribution of a peer from their subsequent updates.
- **Parameters**:
    - `callback: (event: FirstCommitFromPeerEvent) => void`: A function that will be called when the first commit from a new peer is processed. The `event` object would typically include the `peerId` of the new collaborator. Check the API documentation for the exact structure of `FirstCommitFromPeerEvent`.
- **Return Value**: A subscription ID that can be used to unsubscribe later using `doc.unsubscribe(subscriptionId)`.
- **Example**:

```javascript
const doc = new LoroDoc();
doc.setPeerId("localUser"); // Set our own peer ID

const peerStates = new Map();

const subId = doc.subscribeFirstCommitFromPeer((event) => {
  // Assuming event.peerId contains the ID of the new peer
  const newPeerId = event.peerId; // Replace with actual event property
  if (!peerStates.has(newPeerId)) {
    console.log(`First commit received from peer: ${newPeerId}. Initializing state.`);
    peerStates.set(newPeerId, { joinedAt: new Date(), messageCount: 1 });
    // Initialize UI elements or other state for this new peer
  } else {
    // This part should ideally not be reached if it's truly "first commit"
    // but included for robustness or if event semantics are slightly different.
    peerStates.get(newPeerId).messageCount++;
  }
});

// Simulate receiving changes from a remote peer
const docRemote = new LoroDoc();
docRemote.setPeerId("remotePeer1");
docRemote.getText("shared").insert(0, "Hello from remotePeer1");
const updates1 = docRemote.exportFrom(doc.version()); // Export changes

// Import the first commit from "remotePeer1"
doc.import(updates1); // Triggers subscribeFirstCommitFromPeer callback for "remotePeer1"

// Subsequent commits from the same peer should not trigger it again
docRemote.getText("shared").insert(19, " again!");
const updates2 = docRemote.exportFrom(doc.version());
doc.import(updates2); // Does NOT trigger the callback for "remotePeer1" again

// Simulate a second peer
const docRemote2 = new LoroDoc();
docRemote2.setPeerId("remotePeer2");
docRemote2.getText("shared").insert(0, "Greetings from remotePeer2");
const updates3 = docRemote2.exportFrom(doc.version());
doc.import(updates3); // Triggers subscribeFirstCommitFromPeer callback for "remotePeer2"

// To stop listening
doc.unsubscribe(subId);
```

## Transactions in Loro

It's important to note that Loro's concept of a transaction differs from
traditional database transactions:

- Loro transactions do not have ACID properties.
- They primarily serve as event wrappers.
- There is no rollback mechanism if an operation fails.
