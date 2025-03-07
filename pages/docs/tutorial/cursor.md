---
keywords: "cursor, crdts, multi-player, awareness, position, loro"
description: "How to use Loro to implement cursor position in real-time collaboration"
---

# Cursor

Cursor is an independently storable entity, meaning it can store content separately from the Loro document. It is used to stably represent positions within structures such as Text, List, or MovableList. Cursors can be utilized to represent collaborative cursor positions, highlight ranges, or comment ranges.

## Motivation

Using "index" to denote cursor positions can be unstable, as positions may shift with document edits. To reliably represent a position or range within a document, it is more effective to leverage the unique ID of each item/character in a List CRDT or Text CRDT.

## Updating Cursors

Loro optimizes State metadata by not storing the IDs of deleted elements. This approach, while efficient, complicates tracking cursor positions since they rely on these IDs for precise locations within the document. The solution recalculates position by replaying relevant history to update stable positions accurately. To minimize the performance impact of history replay, the system updates cursor info to reference only the IDs of currently present elements, thereby reducing the need for replay.

Each position has a "Side" information, indicating the actual cursor position is on the left, right, or directly in the center of the target ID.

Note: In JavaScript, the offset returned when querying a Stable Position is based on the UTF-16 index.

## Example

```ts
const loro = new LoroDoc();
const list = loro.getList("list");
list.insert(0, "a");
const pos0 = list.getCursor(0);
list.insert(1, "b");
{
  const ans = loro.getCursorPos(pos0!);
  expect(ans.offset).toEqual(0);
  expect(ans.side).toEqual(0);
  expect(ans.update).toBeUndefined();
}
list.insert(0, "c");
{
  const ans = loro.getCursorPos(pos0!);
  expect(ans.offset).toEqual(1);
  expect(ans.side).toEqual(0);
  expect(ans.update).toBeUndefined();
}
list.delete(1, 1);
{
  const ans = loro.getCursorPos(pos0!);
  expect(ans.offset).toEqual(1);
  expect(ans.side).toEqual(-1);
  expect(ans.update).toBeDefined();
}
```
