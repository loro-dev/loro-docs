# Container ID

A Container ID is a unique identifier that comes in two forms:

- Root Container: Composed of a type and root name
- Normal Container: Created through user operations, composed of an ID and type

**Rust `ContainerID`**

```rust
pub enum ContainerID {
    Root {
        name: InternalString,
        container_type: ContainerType,
    },
    Normal {
        peer: PeerID,
        counter: Counter,
        container_type: ContainerType,
    },
}
```

**TypeScript `ContainerID`**

```typescript
export type ContainerID =
  | `cid:root-${string}:${ContainerType}`
  | `cid:${number}@${PeerID}:${ContainerType}`;
```

1. **Root Containers**
   - Created implicitly when accessing a root container for the first time
     (e.g., calling `doc.getText("text")`). No operation is generated in the
     history.
   - Uniquely identified by a string name and container type

2. **Normal Containers**
   - Created explicitly through operations like `insertContainer` or
     `createNode`
   - Generated automatically when applying operations that create child
     containers
   - Contains the Operation ID of its creation within its Container ID

## Container Overwrites

When initializing child containers in parallel, overwrites can occur instead of
automatic merging. For example:

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

This behavior poses a significant risk of data loss if the editing history is
not preserved. Even when the complete history is available and allows for data
recovery, the recovery process can be complex.

<aside>
By default, Loro and Automerge preserve the whole editing history in a directed
acyclic graph like Git.
</aside>

When a container holds substantial data or serves as the primary storage for
document content, overwriting it can lead to the unintended hiding/loss of
critical information. For this reason, it is essential to implement careful and
systematic container initialization practices to prevent such issues.

### Best Practices

1. When containers might be initialized concurrently, prefer initializing them
   at the root level rather than as nested containers

2. When using map containers:
   - If possible, initialize all child containers during the map container's
     initialization
   - Avoid concurrent creation of child containers with the same key in the map
     container to prevent overwrites

The overwrite behavior occurs because parallel creation of child containers
results in different container IDs, preventing automatic merging of their
contents.
