---
keywords: "crdt, crdts, difficulty, synchronization"
description: "When Not to Rely on CRDTs"
---

# When Not to Rely on CRDTs

If there are no concurrent operations, CRDTs and other solutions don't differ
much. In handling concurrent editing, CRDTs use predefined algorithms to ensure
strong eventual consistency (i.e., if multiple people receive the same set of
Ops, they will see the same content). Furthermore, some CRDT algorithms make the
merge results as close to user expectations as possible.

However, its problems include:

- Difficulty in maintaining user-defined invariants. For instance, in a meeting
  room reservation scenario, a room can only be booked once. But if CRDTs
  represent the reservation status, multiple people booking the same room
  simultaneously may all see a successful operation, but in reality, only one
  person will have the reservation after synchronization. Thus, other systems
  are needed to maintain these invariants.
- Automatic merged results of concurrent edits may violate the schema. For
  example, automatically merged code edits may not comply with the code's syntax
  structure, requiring human intervention to adjust. The requirement that a
  `<figure>` can only contain one `<caption>` might also be violated in
  concurrent editing (two people inserting a new `<caption>` concurrently). For
  such scenarios, this issue can be ignored, or `<caption>` can be represented
  differently (changing `<caption>` from a List element to a Register on a
  separate Map can prevent this problem).

CRDTs alone may not solve all problems in these scenarios. If maintaining these
invariants is crucial for your application, you might need to combine CRDTs with
centralized solutions for synchronization. Alternatively, you can implement an
additional layer on top of the CRDT that derives a view conforming to the
correct schema or maintaining the required invariants, using the CRDT state as
the source of truth. This approach can ensure consistency across clients, but
its suitability depends on your specific use case and user expectations.

When merging edits from a peer that has been offline for a long time, extensive
changes may result in an automatically merged state that doesn't meet
expectations. If your application cannot tolerate such merge results, you
shouldn't rely solely on CRDT's automatic merging. Instead, detect these
situations of long-term concurrent edits and provide a diff view to users,
allowing them to resolve conflicts manually. Fortunately, Loro's internal
architecture supports implementing such manual conflict resolution logic.
