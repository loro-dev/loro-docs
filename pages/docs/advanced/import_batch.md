# Batch Import

## Performance Differences and Their Causes

When importing multiple updates into a document, using `doc.importBatch(updates)` is significantly faster than importing updates individually. This performance difference stems from how data merging is handled in each approach.

```ts
import { LoroDoc } from "loro-crdt";

const doc = new LoroDoc();
doc.getText("text").update("Hello");
const update1 = doc.export({ mode: "update" });
const version = doc.version();
doc.getText("text").update("Hello World");
const update2 = doc.export({ mode: "update", from: version });

const newDoc1 = new LoroDoc();
newDoc1.importBatch([update1, update2]); // faster

const newDoc2 = new LoroDoc();
for (const update of [update1, update2]) { // slower
  newDoc2.import(update);
}
```

### Key Advantages of Import Batch

#### 1. Single Diff Calculation

The most significant advantage is that import batch performs only one diff calculation. In contrast, each individual import follows these steps:

- Merge remote updates into local history
- Calculate document state changes from the current version to the merged version
- Apply the diff to the current document state

This diff calculation has fixed overhead costs that accumulate with each import. But `doc.importBatch(...)` only performs one diff calculation, which is faster than multiple individual diff calculations.

#### 2. Reduced Communication Overhead

Import batch also results in more concise events. Each individual import generates a new event, but `doc.importBatch(...)` generates only a single event that contains all the changes.
