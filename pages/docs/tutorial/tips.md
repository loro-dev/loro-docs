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
