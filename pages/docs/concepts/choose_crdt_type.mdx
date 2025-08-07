---
keywords: "crdt, crdts, application, data model, concurrent, conflict"
description: "Loro supports many CRDT types. You need to choose the correct type to model the data based on the algorithm semantics."
---

# How to Choose the Right CRDT Types

Choosing the right CRDT type means understanding their potential behavior in concurrent editing situations and judging whether such behavior is acceptable for your application.

For text, you can choose to represent it directly as a Value on a Map (where the Value can be a string type), or you can choose to use a Text CRDT. For the former, each operation completely overwrites the previous one, so if A and B make concurrent modifications, only one of their edits will remain in the end. For the latter, the CRDT will retain all concurrent insertions by both people, and concurrent deletions are combined to complete the deletion. For most text box edits, you might prefer the latter. But for something like editing a link, you might want to use the former.

For Lists, concurrently removing the same element and inserting a single element creates a new element, differentiating from the semantics of Set on a Map (we may consider providing a list set method in the future). For representing coordinates, it's better to use a Map rather than a List. If you represent coordinates as [x, y], and the A client updates the y coordinate by deleting the y element and reinserting a new y_a, and the B client also deletes y and inserts y_b, then after merging, the array will become [x, y_a, y_b], which does not conform to the user's schema. Using a Map can prevent this problem.
