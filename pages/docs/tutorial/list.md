---
keywords: "list crdt, movable list, move element, cursor, awareness"
description: "how to use loro list and movable list crdt and show all APIs of loro list and movable crdt."
---

# List and Movable List

Loro supports two types of lists: `List` and `MovableList`. The `List` is a
standard list that supports Insert and Delete operations. In contrast, the
`MovableList` supports additional Set and Move operations.

Using a combination of insert and delete operations, one can simulate set and
move operations on a `List`. However, this approach fails in concurrent editing
scenarios. For example, if the same element is set or moved concurrently, the
simulation would result in the deletion of the original element and the
insertion of two new elements, which does not meet expectations.

The `MovableList` addresses these issues by ensuring that set and move
operations do not lead to such problems, though it incurs additional overheads.
Specifically, when performing only insertions/deletions, the `MovableList` is
approximately 80% slower in encode/decode and consumes about 50% more memory
compared to the `List`.

Both `List` and `MovableList` utilize the
[_Fugue_](https://arxiv.org/abs/2305.00583) to achieve _maximal
non-interleaving_. Additionally, `MovableList` uses the algorithm from
[_Moving Elements in List CRDTs_](https://martin.kleppmann.com/2020/04/27/papoc-list-move.html)
to implement the move operation.

## Basic Usage

### List

```ts
const docA = new LoroDoc();
docA.setPeerId("1");
const listA = docA.getList("list");
listA.push(0);
listA.push(1);
listA.push(2);
const bytes: Uint8Array = docA.export({ mode: "snapshot" });

const docB = Loro.fromSnapshot(bytes);
docB.setPeerId("2");
const listB = docB.getList("list");
{
  // Concurrently docA and docB update element at index 2
  // docA updates it to 8
  // docB updates it to 9
  // docA.toJSON() should return { list: [0, 1, 8] }
  // docB.toJSON() should return { list: [0, 1, 9] }
  listB.delete(2, 1);
  listB.insert(2, 9);
  expect(docB.toJSON()).toStrictEqual({ list: [0, 1, 9] });
  listA.delete(2, 1);
  listA.insert(2, 8);
  expect(docA.toJSON()).toStrictEqual({ list: [0, 1, 8] });
}

{
  // Merge docA and docB
  docA.import(docB.export({ mode: "update", from: docA.version() }));
  docB.import(docA.export({ mode: "update", from: docB.version() }));
}

expect(docA.toJSON()).toStrictEqual({ list: [0, 1, 8, 9] });
expect(docB.toJSON()).toStrictEqual({ list: [0, 1, 8, 9] });
```

### MovableList

```ts
const docA = new LoroDoc();
docA.setPeerId("1");
const listA = docA.getMovableList("list");
listA.push(0);
listA.push(1);
listA.push(2);
const bytes: Uint8Array = docA.export({ mode: "snapshot" });

const docB = Loro.fromSnapshot(bytes);
docB.setPeerId("2");
const listB = docB.getMovableList("list");
{
  // Concurrently docA and docB update element at index 2
  // docA updates it to 8
  // docB updates it to 9
  // docA.toJSON() should return { list: [0, 1, 8] }
  // docB.toJSON() should return { list: [0, 1, 9] }
  listA.set(2, 8);
  expect(docA.toJSON()).toStrictEqual({ list: [0, 1, 8] });
  listB.set(2, 9);
  expect(docB.toJSON()).toStrictEqual({ list: [0, 1, 9] });
}

{
  // Merge docA and docB
  docA.import(docB.export({ mode: "update", from: docA.version() }));
  docB.import(docA.export({ mode: "update", from: docB.version() }));
}

// Converge to [0, 1, 9] because docB has larger peerId thus larger logical time
expect(docA.toJSON()).toStrictEqual({ list: [0, 1, 9] });
expect(docB.toJSON()).toStrictEqual({ list: [0, 1, 9] });

{
  // Concurrently docA and docB move element at index 0
  // docA moves it to 2
  // docB moves it to 1
  // docA.toJSON() should return { list: [1, 9, 0] }
  // docB.toJSON() should return { list: [1, 0, 9] }
  listA.move(0, 2);
  listB.move(0, 1);
  expect(docA.toJSON()).toStrictEqual({ list: [1, 9, 0] });
  expect(docB.toJSON()).toStrictEqual({ list: [1, 0, 9] });
}

{
  // Merge docA and docB
  docA.import(docB.export({ mode: "update", from: docA.version() }));
  docB.import(docA.export({ mode: "update", from: docB.version() }));
}

// Converge to [1, 0, 9] because docB has larger peerId thus larger logical time
expect(docA.toJSON()).toStrictEqual({ list: [1, 0, 9] });
expect(docB.toJSON()).toStrictEqual({ list: [1, 0, 9] });
```

## Using Cursor on List

The Cursor on a List changes with the list's modifications. If new elements are
inserted in front of it, it moves to the right. If elements in front are
deleted, it moves to the left. If elements are inserted or deleted behind it, it
remains stationary.

If you use a List to represent paragraphs in an article, you can use a Cursor to
stably represent the selection range on the paragraph.

```ts
import {
  Cursor,
  LoroDoc,
  LoroList,
  LoroMovableList,
  LoroText,
} from "loro-crdt";

const doc = new LoroDoc();
doc.setPeerId("1");
const list = doc.getList("list");
list.push("Hello");
list.push("World");
const cursor = list.getCursor(1)!;
console.log(cursor.pos()); // OUTPUT: { peer: "1", counter: 1 }

const encodedCursor: Uint8Array = cursor.encode();
const exported: Uint8Array = doc.export({ mode: "snapshot" });

// Sending the exported snapshot and the encoded cursor to peer 2
// Peer 2 will decode the cursor and get the position of the cursor in the list
// Peer 2 will then insert "Hello" at the beginning of the list

const docB = new LoroDoc();
docB.setPeerId("2");
const listB = docB.getList("list");
docB.import(exported);
listB.insert(0, "Foo");
console.log(docB.toJSON()); // OUTPUT: { list: ["Foo", "Hello", "World"] }
const cursorB = Cursor.decode(encodedCursor);
{
  // The cursor position is shifted to the right by 1
  const pos = docB.getCursorPos(cursorB);
  console.log(pos.offset); // OUTPUT: 2
}
listB.insert(1, "Bar");
console.log(docB.toJSON()); // OUTPUT: { list: ["Foo", "Bar", "Hello", "World"] }
{
  // The cursor position is shifted to the right by 1
  const pos = docB.getCursorPos(cursorB);
  console.log(pos.offset); // OUTPUT: 3
}
listB.delete(3, 1);
console.log(docB.toJSON()); // OUTPUT: { list: ["Foo", "Bar", "Hello"] }
{
  // The position the cursor points to is now deleted,
  // but it should still get the position
  const pos = docB.getCursorPos(cursorB);
  console.log(pos.offset); // OUTPUT: 3

  // It will also offer an update on the cursor position.
  //
  // Because the old cursor position is deleted, `doc.getCursorPos()` will slow down over time.
  // Internally, it needs to traverse the related history to find the correct position for a deleted
  // cursor position.
  //
  // After refreshing the cursor, the performance of `doc.getCursorPos()` will improve.
  console.log(pos.update); // OUTPUT: { peer: "2", counter: 1 }
  const newCursor: Cursor = pos.update!;

  // The new cursor position is undefined because the cursor is at the end of the list
  console.log(newCursor.pos()); // OUTPUT: undefined
  // The side is 1 because the cursor is at the right end of the list
  console.log(newCursor.side()); // OUTPUT: 1

  const newPos = docB.getCursorPos(newCursor);
  // The offset doesn't change
  console.log(newPos.offset); // OUTPUT: 3
  // The update is undefined because the cursor no longer needs to be updated
  console.log(newPos.update); // OUTPUT: undefined
}
```
