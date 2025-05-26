# Tips and Tricks


##### `LoroDoc` will be initialized with a new random PeerID each time

<details>
<summary>What if I need to set the initial state?</summary>

If your document requires an initial state, you should not edit the document to achieve this state right 
after creating it with new LoroDoc(). This approach can cause problems - each time someone opens the document, 
new operations with different PeerIDs would be added just to set up the initial state.

The better approach is to initialize your document by loading the same Snapshot. This ensures all users start 
from an identical baseline without generating unnecessary operations.
</details>

---

##### Be careful when using `doc.setPeerId(newId)`

When using `setPeerId`, you must avoid having two parallel peers use the same PeerId. This can cause serious consistency problems in your application.

<details>
<summary>Why</summary>

It's because Loro determines whether an operation has already been included by checking its operation ID. Since operation IDs are composed of `PeerId + Counter`, duplicate PeerIds can easily lead to duplicate operation IDs. During synchronization, Loro might incorrectly assume certain operations have already been processed, resulting in document inconsistency across peers.
</details>

<details>
<summary>How to reuse PeerIds safely</summary>

Be careful when reusing PeerIds (this optimization is often unnecessary). You should not assign a fixed PeerId to a user, as one user might use multiple devices. Similarly, you shouldn't assign a fixed PeerId to a device, because even on a single browser, multiple tabs might open the same document simultaneously.

If you must reuse PeerIds, you need to carefully manage your local PeerId cache with proper locking mechanisms. This would allow only one tab to "take" a specific PeerId, while other tabs use random IDs. The PeerId should be returned to the cache when no longer in use.
</details>

---

##### Root containers don't need operations to be initialized

Root Containers are created implicitly in Loro. This means that when you call `doc.getText("text")`, no new operations appear in the LoroDoc history, and there are no operations that need to be synchronized with other peers.

This behavior contrasts with non-root containers. For example, when you execute `doc.getMap("meta").setContainer("text", new LoroText())`, it generates an operation to insert the LoroText container into the map. 

---

##### When initializing child containers of LoroMap in parallel, overwrites can occur instead of automatic merging.

<details>
<summary>Why this happens</summary>

This happens because parallel creation of child containers results in different container IDs, preventing automatic merging of their contents. When a container holds substantial data or serves as the primary storage for document content, overwriting it can lead to unintended hiding or loss of critical information.

```typescript
const doc = new LoroDoc();
const map = doc.getMap("map");

// Parallel initialization of child containers
const docB = doc.fork();
const textA = doc.getMap("map").setContainer("text", new LoroText());
textA.insert(0, "A");
const textB = docB.getMap("map").setContainer("text", new LoroText());
textB.insert(0, "B");

doc.import(docB.export({ mode: "update" }));
// Result: Either { "meta": { "text": "A" } } or { "meta": { "text": "B" } }
```
</details>

<details>
<summary>Best practices for container initialization</summary>

1. When using map containers:
   - If possible, initialize all child containers during the map container's initialization
   - Avoid concurrent creation of child containers with the same key in the map container to prevent overwrites
2. If it's impossible to initialize all child containers when the map container is initialized, prefer initializing them at the root level rather than as nested containers.
    - You can use `doc.getMap("user." + userId)` instead of `doc.getMap("user").getOrCreateContainer(userId, new LoroMap())` to avoid this problem.
</details>

---

##### Use redaction to safely share document history

There are times when users might accidentally paste sensitive information (like API keys, passwords, or personal data) into a collaborative document. When this happens, you need a way to remove just that sensitive content from the document history without compromising the rest of the document's integrity.

<details>
<summary>How to safely redact sensitive content</summary>

Loro provides a `redactJsonUpdates` function that allows you to selectively redact operations within specific version ranges.

For example, if a user accidentally pastes a password or API key into a document:

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

// You can also redact specific map entries
const versionRange2 = {
  "1": [21, 22]  // Redact the "secret123" password
};

const redactedJson2 = redactJsonUpdates(jsonUpdates, versionRange2);
const redactedDoc2 = new LoroDoc();
redactedDoc2.importJsonUpdates(redactedJson2);

console.log(redactedDoc2.getMap("map").get("password")); // null
console.log(redactedDoc2.getMap("map").get("public"));   // "public information"
```

This approach is safer than manually editing document content because:

1. It maintains document structure and CRDT consistency
2. It keeps key metadata like operation IDs and dependencies intact
3. It allows concurrent editing to continue working after redaction
4. It selectively redacts only specific operations, not the entire document

The redaction process follows these rules:
- Preserves delete, tree move, and list move operations
- Replaces text insertion content with Unicode replacement characters '�' 
- Substitutes list and map insert values with null
- Maintains structure of child containers
- Replaces text mark values with null
- Preserves map keys and text annotation keys

**Important**: Your application needs to ensure that all peers receive the redacted version, otherwise the original document with sensitive information will still exist on other peers.

</details>

---

##### Use shallow snapshots to completely remove old history

When you need to completely remove ALL history older than a certain version point, shallow snapshots provide the solution.

<details>
<summary>How to remove old history with shallow snapshots</summary>

Shallow snapshots create a new document that preserves the current state but completely eliminates all history before a specified point, similar to Git's shallow clone functionality.

```typescript
const doc = new LoroDoc();
doc.setPeerId("1");

// Old history - will be completely removed
const text = doc.getText("text");
text.insert(0, "This document has a long history with many edits");
doc.commit();
text.insert(0, "Including some potentially sensitive information. ");
doc.commit();

// More recent history - will be preserved
text.delete(11, 55); // Remove the middle part
text.insert(11, "with sanitized history");
doc.commit();

// Create a sanitized version that removes ALL history before current point
const sanitizedSnapshot = doc.export({ 
  mode: "shallow-snapshot", 
  frontiers: doc.oplogFrontiers() 
});

// Create a new document from the sanitized snapshot
const sanitizedDoc = new LoroDoc();
sanitizedDoc.import(sanitizedSnapshot);

// The document has the final state
console.log(sanitizedDoc.getText("text").toString());
// Outputs: "Including with sanitized history"

// But ALL history before the snapshot point is completely removed
console.log(sanitizedDoc.isShallow()); // true
console.log(sanitizedDoc.shallowSinceFrontiers()); // Shows the starting point
```

This approach is useful for:

1. Completely removing all old history that might contain various sensitive information
2. Significantly reducing document size by eliminating unnecessary history
3. Creating clean document instances after certain milestones
4. Ensuring old operations cannot be recovered or examined

Compared to redaction:
- Shallow snapshots completely remove all operations before a version point
- Redaction selectively replaces just specific content with placeholders

**Important**: While both methods maintain future synchronization consistency, your application must distribute the sanitized document to all peers. Otherwise, the original document with sensitive information will still exist on other clients.

**When to use each approach**:
- Use **redaction** when you need to sanitize specific operations (like an accidental password paste) while preserving older history
- Use **shallow snapshots** when you want to completely eliminate all history before a certain point

</details>

---

##### You can store mappings between LoroDoc's peerIds and user IDs in the document itself

Use `doc.subscribeFirstCommitFromPeer(listener)` to associate peer information with user identities when a peer first interacts with the document.

<details>
<summary>How to track peer-to-user mappings</summary>

This functionality is essential for building user-centric features in collaborative applications. You often need bidirectional mapping between user IDs and peer IDs:

- **Finding all edits by a user**: When you need to retrieve all document edits made by a specific user ID, you must first find all peer IDs associated with that user
- **Showing edit attribution**: When displaying which user edited a piece of text, you need to map from the peer ID (stored in the operation) back to the user ID for display

This hook provides an ideal point to associate peer information (such as author identity) with the document. The listener is triggered on the first commit from each peer, allowing you to store user metadata within the document itself.

```typescript
const doc = new LoroDoc();
doc.setPeerId(0);
doc.subscribeFirstCommitFromPeer((e) => {
  doc.getMap("users").set(e.peer, "user-" + e.peer);
});
doc.getList("list").insert(0, 100);
doc.commit();
expect(doc.getMap("users").get("0")).toBe("user-0");
```

This approach allows you to:

1. Automatically track which peers have contributed to the document
2. Store user metadata (names, emails, etc.) alongside the document
3. Build features like author attribution, presence indicators, or edit history

The mapping is stored within the document, so it automatically synchronizes across all peers and persists with the document's state.

</details>

---

##### You can use https://loro.dev/llms-full.txt to prompt your AI

When working with AI assistants or language models on Loro-related tasks, you can use these URLs to provide comprehensive context about Loro's capabilities and API:

- `https://loro.dev/llms-full.txt` - All the documentation in one file
- `https://loro.dev/llms.txt` - An overview of Loro website
