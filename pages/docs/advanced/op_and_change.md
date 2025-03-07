# Operations and Change

In Loro, every basic operation such as setting a key-value pair on a Map, adding
a list item, or inserting/deleting a character in text is considered an
individual op. (Don't worry about the cost, in Loro's internal memory
representation and export format, consecutive ops are merged into a larger op,
such as consecutive text insertions and deletions.)

One or more local consecutive `Op`s constitute a `Change`, which includes the
following information:

- ID: ID of the Change is essentially the first op's ID
- Timestamp: An optional timestamp, which can be enabled with
  `setRecordTimestamp(true)`. If not enabled, there is no extra storage
  overhead.
- Dependency IDs: Used to represent the causal order, the Op IDs that the
  current Change directly depends on.
- Commit Message: An optional commit message (WIP not yet released); when not
  enabled, there is no extra storage overhead.

Each time `doc.commit()` is called, a new `Change` is generated, which will be
merged with the previous local `Change` as much as possible to reduce the amount
of metadata that needs to be stored.

> Note: Each time you export, a `doc.commit()` is implicitly performed by the
> Loro Doc.

Unlike a Git commit, Loro's Change can be merged; it is neither atomic nor
indivisible. This design allows Loro to better accommodate real-time
collaboration scenarios (where each keystroke would have its own `doc.commit()`,
which would be hugely costly if not merged) and asynchronous collaboration
scenarios (like Git, which combines many modifications to form one).

## When a New Change is Formed

> Note: You may not need to understand the content of this section, and the
> content may change in future versions. Unless you want to understand Loro's
> internal implementation or want to achieve more extreme performance
> optimization.

By default, each commit-generated `Change` will merge with the previous local
`Change`. However, there are exceptions in several cases:

- The current Change depends on a Change from a different peer. This occurs when
  local operations build upon recently applied remote operations. For example,
  deleting a character sequence that was just inserted by a remote peer. These
  causal relationships form a DAG (Directed Acyclic Graph). After importing
  remote updates, the next local Change will have new dependency IDs,
  necessitating a separate Change.
- When `setRecordTimestamp(true)` is set, if the time interval between
  successive Changes exceeds the "change merge interval" (default duration
  1000s).
- When the current Change has a different commit message from the previous
  Change by the same peer.

## Example

```ts
import { Change, LoroDoc } from "npm:loro-crdt@1.0.0-beta.5";

const docA = new LoroDoc();
docA.setPeerId("0");
const textA = docA.getText("text");
// This create 3 operations
textA.insert(0, "123");
// This create a new Change
docA.commit();
// This create 2 operations
textA.insert(0, "ab");
// This will NOT create a new Change
docA.commit();

{
  const changeMap: Map<`${number}`, Change[]> = docA.getAllChanges();
  console.log(changeMap);
  // Output:
  //
  // Map(1) {
  //   "0" => [
  //     {
  //       lamport: 0,
  //       length: 5,
  //       peer: "0",
  //       counter: 0,
  //       deps: [],
  //       timestamp: 0
  //     }
  //   ]
  // }
}

// Create docB from doc
const docB = LoroDoc.fromSnapshot(docA.export({ mode: "snapshot" }));
docB.setPeerId("1");
const textB = docB.getText("text");
// This create 2 operations
textB.insert(0, "cd");

// Import the Change from docB to doc
const bytes = docB.export({ mode: "update" }); // Exporting has implicit commit
docA.import(bytes);

// This create 1 operations
textA.insert(0, "1");
// Because doc import a Change from docB, it will create a new Change for
// new commit to record this causal order
docA.commit();
{
  const changeMap: Map<`${number}`, Change[]> = docA.getAllChanges();
  console.log(changeMap);
  // Output:
  //
  // Map(2) {
  //   "0" => [
  //     {
  //       lamport: 0,
  //       length: 5,
  //       peer: "0",
  //       counter: 0,
  //       deps: [],
  //       timestamp: 0
  //     },
  //     {
  //       lamport: 7,
  //       length: 1,
  //       peer: "0",
  //       counter: 5,
  //       deps: [ { peer: "1", counter: 1 } ],
  //       timestamp: 0
  //     }
  //   ],
  //   "1" => [
  //     {
  //       lamport: 5,
  //       length: 2,
  //       peer: "1",
  //       counter: 0,
  //       deps: [ { peer: "0", counter: 4 } ],
  //       timestamp: 0
  //     }
  //   ]
  // }
}
```
