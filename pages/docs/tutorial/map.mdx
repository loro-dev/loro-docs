---
keywords: "map crdt, last write win, key value, conflict"
description: "how to use loro map crdt and show all APIs of loro map crdt."
---

# Map

Loro's Map uses LWW (Last-Write-Wins) semantics. When concurrent edits conflict, it compares Lamport logic timestamps to determine the winner.

Here is how to use it:

```ts
const docA = new LoroDoc();
docA.setPeerId("0");
const docB = new LoroDoc();
docB.setPeerId("1");

const mapA = docA.getMap("map");
const mapB = docB.getMap("map");

mapA.set("a", 1);
const textB = mapB.setContainer("a", new LoroText());
textB.insert(0, "Hi");

console.log(docA.toJSON()); // OUTPUT: { map: { a: 1 } }
console.log(docB.toJSON()); // OUTPUT: { map: { a: "Hi" } }

docA.import(docB.export({ mode: "snapshot" }));
docB.import(docA.export({ mode: "snapshot" }));

// docB wins because it has the larger peerId, thus the larger logical timestamp
console.log(docA.toJSON()); // OUTPUT: { map: { a: "Hi" } }
console.log(docB.toJSON()); // OUTPUT: { map: { a: "Hi" } }
```

> **Note**: When calling `map.set(key, value)` on a LoroMap, if `map.get(key)` already returns `value`, the operation will be a no-op (no operation recorded).
