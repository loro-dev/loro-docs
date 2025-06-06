# Getting Started with LoroDoc

LoroDoc is the main entry point for almost all Loro functionality. It serves as a container manager and coordinator that provides:

1. **Container Management**: Create and manage different types of CRDT containers (Text, List, Map, Tree, MovableList)
2. **Version Control**: Track document history, checkout versions, and manage branches
3. **Event System**: Subscribe to changes at both document and container levels
4. **Import/Export**: Save and load documents/updates in various formats

## Basic Usage

First, let's create a new LoroDoc instance:

```typescript
import { LoroDoc } from "loro-crdt";

// Create a new document with a random peer ID
const doc = new LoroDoc();

// Or set a specific peer ID
doc.setPeerId("1");

// Create containers
const text = doc.getText("text");
const list = doc.getList("list");
const map = doc.getMap("map");
const tree = doc.getTree("tree");
const movableList = doc.getMovableList("tasks");
```

To model a document with the following format:

```json
{
  "meta": {
    "title": "Document Title",
    "createdBy": "Author"
  },
  "content": "Article",
  "comments": [
    {
      "user": "userId",
      "comment": "comment"
    }
  ]
}
```

```ts
const doc = new LoroDoc();
const meta = doc.getMap("meta");
meta.set("title", "Document Title");
meta.set("createdBy", "Author");
doc.getText("content").insert(0, "Article");
const comments = doc.getList("comments");
const comment1 = comments.insertContainer(0, new LoroMap());
comment1.set("user", "userId");
comment1.set("comment", "comment");
```

## Container Types

LoroDoc supports several container types:

1. **Text** - For rich text editing
2. **List** - For ordered collections
3. **Map** - For key-value pairs
4. **Tree** - For hierarchical data structures
5. **MovableList** - For lists with movable items

Let's look at how to use each type:

### Text Container

```typescript
const doc = new LoroDoc();
const text = doc.getText("text");
text.insert(0, "Hello");
text.insert(5, " World!");
console.log(text.toString()); // "Hello World!"

// Rich text support
doc.configTextStyle({
  bold: { expand: "after" },
  link: { expand: "none" }
});
text.mark({ start: 0, end: 5 }, "bold", true);
```

### List Container

```typescript
const doc = new LoroDoc();
const list = doc.getList("list");
list.insert(0, "first");
list.insert(1, "second");
console.log(list.toArray()); // ["first", "second"]

// Nested containers
const nestedText = list.insertContainer(2, new LoroText());
nestedText.insert(0, "nested text");
```

### Map Container

```typescript
const doc = new LoroDoc();
const map = doc.getMap("map");
map.set("name", "John");
map.set("age", 30);
console.log(map.get("name")); // "John"

// Nested containers
const userText = map.setContainer("bio", new LoroText());
userText.insert(0, "Software Engineer");
```

### Tree Container

```typescript
const doc = new LoroDoc();
const tree = doc.getTree("tree");
const root = tree.createNode();
root.data.set("name", "Root");

const child1 = root.createNode();
child1.data.set("name", "Child 1");

const child2 = root.createNode();
child2.data.set("name", "Child 2");
```

### MovableList Container

```typescript
const doc = new LoroDoc();
const movableList = doc.getMovableList("tasks");
movableList.insert(0, "Task 1");
movableList.insert(1, "Task 2");
movableList.move(0, 1); // Move Task 1 after Task 2
```

## Collaboration Features

LoroDoc can be used for real-time collaboration. Here's how to sync changes between peers:

```typescript
// First peer
const doc1 = new LoroDoc();
doc1.setPeerId("1");
const text1 = doc1.getText("text");

// Second peer
const doc2 = new LoroDoc();
doc2.setPeerId("2");
const text2 = doc2.getText("text");

// Set up two-way sync
doc1.subscribeLocalUpdates((updates) => {
  doc2.import(updates);
});

doc2.subscribeLocalUpdates((updates) => {
  doc1.import(updates);
});

// Now changes in doc1 will be reflected in doc2 and vice versa
text1.insert(0, "Hello");
doc1.commit();
await Promise.resolve(); // await for the event to be emitted
text2.insert(5, " World!");
doc2.commit();
```

## Undo/Redo Support

Loro provides built-in undo/redo functionality:

```typescript
import { UndoManager, LoroDoc } from "loro-crdt";

const doc = new LoroDoc();
const undoManager = new UndoManager(doc, {
  maxUndoSteps: 100,
  mergeInterval: 1000
});

const text = doc.getText("text");
// Make some changes
text.insert(0, "Hello");
doc.commit();

// Undo the changes
if (undoManager.canUndo()) {
  undoManager.undo();
}

// Redo the changes
if (undoManager.canRedo()) {
  undoManager.redo();
}
```

## Exporting and Importing

You can save and load the document state:

```typescript
const doc = new LoroDoc();
// Export the document
const snapshot = doc.export({ mode: "snapshot" });

// Create a new document from the snapshot
const newDoc = LoroDoc.fromSnapshot(snapshot);

const doc2 = new LoroDoc();
// Or import into an existing document
doc2.import(snapshot);
```

### Shallow Import/Export

Shallow import/export is a feature that allows you to create and share document snapshots without including the complete history. This is particularly useful for:

1. Reducing the size of exported data
2. Sharing the document with others without revealing the complete history
3. Speedup the import/export process

Here's how to use shallow export:

```typescript
const doc = new LoroDoc();
// Export a shallow snapshot that only include the history since `doc.oplogFrontiers()` 
// It works like `git clone --depth=1`, where the exported data only contain the most recent ops.
const shallowSnapshot = doc.export({ 
  mode: "shallow-snapshot", 
  frontiers: doc.oplogFrontiers() 
});

// Check if a document is shallow
const isShallow = doc.isShallow();

// Get the version since which the history is available
const sinceVersion = doc.shallowSinceVV();
// Or get it in frontiers format
const sinceFrontiers = doc.shallowSinceFrontiers();
```

Note: A shallow document only contains history after a certain version point. Operations before the shallow start point are not included, but the document remains fully functional for collaboration.

### Redacting Sensitive Content

Loro allows you to redact specific segments of document history while preserving the rest. This is particularly useful when:

1. A user accidentally pastes sensitive information (like passwords or API keys) into the document
2. You need to remove just the sensitive part of the history while keeping older and newer edits intact
3. You want to share document history with sensitive segments sanitized

Here's how to use the redaction functionality:

```typescript
const doc = new LoroDoc();
doc.setPeerId("1");

// Create some content to be redacted
const text = doc.getText("text");
text.insert(0, "Sensitive information");
doc.commit();

const map = doc.getMap("map");
map.set("password", "secret123");
map.set("public", "public information");
doc.commit();

// Export JSON updates
const jsonUpdates = doc.exportJsonUpdates();

// Define version range to redact (redact the text content)
const versionRange = {
  "1": [0, 21]  // Redact the "Sensitive information"
};

// Apply redaction
const redactedJson = redactJsonUpdates(jsonUpdates, versionRange);

// Create a new document with redacted content
const redactedDoc = new LoroDoc();
redactedDoc.importJsonUpdates(redactedJson);

// The text content is now redacted with replacement characters
console.log(redactedDoc.getText("text").toString());
// Outputs: "���������������������"

// Map operations after the redacted range remain intact
console.log(redactedDoc.getMap("map").get("password")); // "secret123"
console.log(redactedDoc.getMap("map").get("public"));   // "public information"
```

Redaction applies these rules to preserve document structure while removing sensitive content:
- Preserves delete and move operations
- Replaces text insertion content with Unicode replacement characters '�'
- Substitutes list and map insert values with null
- Maintains structure of nested containers
- Replaces text mark values with null
- Preserves map keys and text annotation keys

Note that redaction doesn't remove the operations completely - it just replaces the sensitive content with placeholders. If you need to completely remove portions of history, see the section on shallow snapshots in the [Tips](./tips.md) section.

#### Important: Synchronization Considerations

Both redaction and shallow snapshots maintain future synchronization consistency, but your application is responsible for ensuring all peers get the sanitized version. Otherwise, old instances of the document with sensitive information will still exist on other peers.

## Event Subscription

Subscribe to changes in the document:

```typescript
const doc = new LoroDoc();
doc.subscribe((event) => {
  console.log("Document changed:", event);
});

const text = doc.getText("text");
// Container-specific subscription
text.subscribe((event) => {
  console.log("Text changed:", event);
});
```

### Event Emission

Events in LoroDoc are emitted only after a transaction is committed, and importantly, the events are emitted after a microtask. This means you need to await a microtask if you want to handle the events immediately after a commit.

1. Explicitly calling `doc.commit()`:
```typescript
const doc = new LoroDoc();
const text = doc.getText("text");

// Subscribe to changes
doc.subscribe((event) => {
  console.log("Change event:", event);
});

text.insert(0, "Hello"); // No event emitted yet
doc.commit(); // Event will be emitted after a microtask

// If you need to wait for the event:
await Promise.resolve(); // Now the event has been emitted
```

2. Implicitly through certain operations:
```typescript no_run
const doc = new LoroDoc();
const text = doc.getText("text");

// These operations trigger implicit commits:
doc.export({ mode: "snapshot" }); // Implicit commit
doc.import(someData);            // Implicit commit
doc.checkout(someVersion);       // Implicit commit
```

You can also specify additional information when committing:
```typescript no_run
doc.commit({
  origin: "user-edit",      // Mark the event source
  message: "Add greeting",  // Like a git commit message
  timestamp: Date.now()     // Custom timestamp
});
await Promise.resolve();    // Wait for event if needed
```

Note: Multiple operations before a `commit` are batched into a single event. This helps reduce event overhead and provides atomic changes. The event will still be emitted after a microtask, regardless of whether the commit was explicit or implicit.

## Version Control and History

LoroDoc provides powerful version control features that allow you to track and manage document history:

### Version Representation

Loro uses two ways to represent versions:

1. **Version Vector**: A map from peer ID to counter
```typescript
const doc = new LoroDoc();
// Get current version vector
const vv = doc.version();

// Get oplog version vector (latest known version)
const oplogVv = doc.oplogVersion();
```

2. **Frontiers**: A list of operation IDs that represent the latest operations from each peer. This is compacter than version vector. In most of the cases, it only has 1 element.
```typescript
const doc = new LoroDoc();
doc.setPeerId("0");
doc.getMap("map").set("text", "Hello");
// Get current frontiers
const frontiers = doc.frontiers();

// Get oplog frontiers (latest known version)
const oplogFrontiers = doc.oplogFrontiers(); // { "0": 0 }
```

### Checkout and Time Travel

You can navigate through document history using checkout:

```typescript
const doc = new LoroDoc();
// Save current version
const frontiers = doc.frontiers();
const text = doc.getText("text");

// Make some changes
text.insert(0, "Hello World!");

// Checkout to previous version
doc.checkout(frontiers);

// Return to latest version
doc.checkoutToLatest();
// or
doc.attach();
```

Note: After checkout, the document enters "detached" mode. In this mode:
- The document is not editable by default
- Import operations are recorded but not applied to the document state
- You need to call `attach()` or `checkoutToLatest()` to go back to the latest version and make it editable again

### Detached Mode

The document enters "detached" mode after a `checkout` operation or when explicitly calling `doc.detach()`. In detached mode, the document state is not synchronized with the latest version in the OpLog.

```typescript
const doc = new LoroDoc();
// Check if document is in detached mode
console.log(doc.isDetached()); // false

// Explicitly detach the document
doc.detach();
console.log(doc.isDetached()); // true

// Return to attached mode
doc.attach();
console.log(doc.isDetached()); // false
```

By default, editing is disabled in detached mode. However, you can enable it:

```typescript
const doc = new LoroDoc();
// Enable editing in detached mode
doc.setDetachedEditing(true);
console.log(doc.isDetachedEditingEnabled()); // true
```

#### Key Behaviors in Detached Mode

1. **Import Operations**

   - Operations imported via `doc.import()` are recorded in the OpLog
   - These operations are not applied to the document state until checkout

```typescript
const oldDoc = new LoroDoc();
oldDoc.getMap("map").set("name", "John");
const updates = oldDoc.export({ mode: "update" });
const doc = new LoroDoc();
// In detached mode
doc.import(updates); // Updates are stored but not applied
doc.checkoutToLatest(); // Now updates are applied
```

2. **Version Management**
   - Each checkout uses a different PeerID to prevent conflicts
   - The document maintains two version states:
```typescript
const doc = new LoroDoc();
// Current state version
const stateVersion = doc.version();
// Latest known version in OpLog
const latestVersion = doc.oplogVersion();
```

3. **Forking**
   - You can create a new document at a specific version:

```typescript
const doc = new LoroDoc();
doc.setPeerId("0");
doc.getText("text").insert(0, "Hello");
// Fork at current frontiers
const forkedDoc = doc.fork();
// Or fork at specific frontiers
const forkedAtVersion = doc.forkAt([{ peer: "0", counter: 1 }]);
console.log(forkedAtVersion.getText("text").toString()); // "He"
```

#### Common Use Cases

1. **Time Travel and History Review**

```typescript no_run
const doc = new LoroDoc();
// Save current version
const frontiers = doc.frontiers();

// Make changes
text.insert(0, "New content");

// Review previous version
doc.checkout(frontiers);

// Return to latest version
doc.checkoutToLatest();
```

2. **Branching**

```typescript no_run
const doc = new LoroDoc();
// Enable detached editing
doc.setDetachedEditing(true);

// Create a branch
const branch = doc.fork();

// Make changes in branch
const branchText = branch.getText("text");
branchText.insert(0, "Branch changes");
```

## Subscription and Sync

### Local Updates Subscription

Subscribe to local changes for syncing between peers:

```typescript
const doc = new LoroDoc();
// Subscribe to local updates
const unsubscribe = doc.subscribeLocalUpdates((updates) => {
  // Send updates to other peers
  otherDoc.import(updates);
});

// Later, unsubscribe when needed
unsubscribe();
```

### Document Events

Subscribe to all document changes. The event may be triggered by local operations, importing updates, or switching to another version.

```typescript
const doc = new LoroDoc();
doc.subscribe((event: LoroEventBatch) => {
  console.log("Event triggered by:", event.by); // "local" | "import" | "checkout"
  console.log("Event origin:", event.origin);
  
  for (const e of event.events) {
    console.log("Target container:", e.target);
    console.log("Path:", e.path);
    console.log("Changes:", e.diff);
  }
});
```

### Container-specific Events

Subscribe to changes in specific containers:

```typescript
const doc = new LoroDoc();
const text = doc.getText("text");
text.subscribe((event: LoroEventBatch) => {
  // Handle text-specific changes
  console.log("Text changed:", event);
});

const list = doc.getList("list");
list.subscribe((event: LoroEventBatch) => {
  // Handle list-specific changes
  console.log("List changed:", event);
});
```

## Advanced Features

### Cursor Support

Loro provides stable cursor position tracking that remains valid across concurrent edits:

```typescript
const doc = new LoroDoc();
const text = doc.getText("text");
text.insert(0, "123");

// Get cursor at position with side (-1, 0, or 1)
const cursor = text.getCursor(0, 0);
if (cursor) {
  // Get current cursor position
  const pos = doc.getCursorPos(cursor);
  console.log(pos.offset); // Current position
  console.log(pos.side);   // Cursor side
  
  // Cursor position updates automatically with concurrent edits
  text.insert(0, "abc");
  const newPos = doc.getCursorPos(cursor);
  console.log(newPos.offset); // Position updated
}
```

### Change Tracking

Track and analyze document changes:

```typescript
const doc = new LoroDoc();
doc.setPeerId("1");
doc.getText("text").insert(0, "Hello");
doc.commit();
// Get number of changes and operations
console.log(doc.changeCount());  // Number of changes
console.log(doc.opCount());      // Number of operations

// Get all changes
const changes = doc.getAllChanges();
for (const [peer, peerChanges] of changes.entries()) {
  for (const change of peerChanges) {
    console.log("Change:", {
      peer: change.peer,
      counter: change.counter,
      lamport: change.lamport,
      timestamp: change.timestamp,
      message: change.message
    });
  }
}

// Get specific change
const changeId = { peer: "1", counter: 0 };
const change = doc.getChangeAt(changeId);

// Get operations in a change
const ops = doc.getOpsInChange(changeId);

// Track change ancestors
doc.travelChangeAncestors([changeId], (change) => {
  console.log("Ancestor change:", change);
  return true; // continue traversal
});

// Get modified containers in a change
const modifiedContainers = doc.getChangedContainersIn(changeId, 1);
```

### Advanced Import/Export

Loro supports various import and export modes:

```typescript
// Export modes
const doc = new LoroDoc();
const previousVersion = doc.version();
doc.getText("text").insert(0, "Hello");
const snapshot = doc.export({ mode: "snapshot" });
const updates = doc.export({ mode: "update", from: previousVersion });
const shallowSnapshot = doc.export({ 
  mode: "shallow-snapshot", 
  frontiers: doc.oplogFrontiers() 
});
const rangeUpdates = doc.export({
  mode: "updates-in-range",
  spans: [{ id: { peer: "1", counter: 0 }, len: 10 }]
});

// Import with status tracking
const status = doc.import(updates);
console.log("Successfully imported:", status.success);
console.log("Pending imports:", status.pending);

// Batch import
const status2 = doc.importBatch([snapshot, updates]);

// Import JSON updates
const jsonStatus = doc.importJsonUpdates({
  schema_version: 1,
  start_version: new Map([["1", 0]]),
  peers: ["1"],
  changes: []
});
```

### Path and Value Access

Access document content through paths:

```typescript
const doc = new LoroDoc();
// Get value or container by path
const value = doc.getByPath("map/key");
const container = doc.getByPath("list");

// Get path to a container
const path = doc.getPathToContainer("cid:root-list:List");

// JSONPath support
const results = doc.JSONPath("$.list[*]");

// Get shallow values (container IDs instead of resolved values)
const shallowDoc = doc.getShallowValue();
console.log(shallowDoc); // { list: 'cid:root-list:List', ... }

// Custom JSON serialization
const json = doc.toJsonWithReplacer((key, value) => {
  if (value instanceof LoroText) {
    return value.toDelta();
  }
  return value;
});
```

### Debug and Metadata

Access debug information and metadata:

```typescript
import { setDebug, LoroDoc, decodeImportBlobMeta } from "loro-crdt";

const doc = new LoroDoc();
// Enable debug info
setDebug();
const blob = doc.export({ mode: "update" });
// Get import blob metadata
const metadata = decodeImportBlobMeta(blob, true);
console.log({
  startTimestamp: metadata.startTimestamp,
  endTimestamp: metadata.endTimestamp,
  mode: metadata.mode,
  changeNum: metadata.changeNum
});
```
