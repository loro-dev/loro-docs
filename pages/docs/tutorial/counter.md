---
keywords: "counter crdt"
description: "how to use loro counter crdt and show all APIs of loro counter crdt."
---

# Counter

Loro's Counter will add up all the applied values, and supports integers and floating point numbers.

Here is how to use it:

```ts
const doc = new LoroDoc();
const counter = doc.getCounter("counter");
counter.increment(1);
counter.increment(2);
counter.decrement(1);
expect(counter.value).toBe(2);
```
