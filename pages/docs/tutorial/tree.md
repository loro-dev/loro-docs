---
keywords: "tree crdt, move operation, fractional index, hierarchical, tree"
description: "how to use loro tree crdt and show all APIs of loro tree crdt."
---

# Tree

When it comes to utilizing hierarchical data structures and even performing operations across different levels of data, tree structures are of paramount importance. Loro implements the concept of a movable tree CRDT, based on the algorithm created by Kleppmann et al. in **_[A highly-available move operation for replicated trees](https://martin.kleppmann.com/2021/10/07/crdt-tree-move-operation.html)_**.

In addition to this, Loro further employs **Fractional Index** (an algorithm used in distributed systems to maintain the order of sequences) to sort each child node, ensuring that sibling nodes maintain an orderly sequence. As a result, Loro can provide APIs such as `moveAfter()` and `moveBefore()`. This is particularly useful when a custom-ordered hierarchical view is required.

## Node Data

Loro associates a [Map](https://www.loro.dev/docs/tutorial/map) with each tree node, serving as a data container for the node, allowing you to nest any data structure supported by Loro.

> Note: The associated Map Container is considered a child of the Tree Container within the Loro documentation hierarchy.

You can get the associated map by `.data` of the `LoroTreeNode` so you can invoke `set` or `setContainer` on the map to add some data or sub-containers to the tree node. For example:

```ts
import { Loro, LoroTree, LoroTreeNode, LoroMap, LoroList } from "loro-crdt";

let doc = new Loro();
let tree: LoroTree = doc.getTree("tree");
let node: LoroTreeNode = tree.createNode();
node.data.set("key", "value");
node.data.setContainer("list", new LoroList());
```

## Ordered Tree Nodes

In certain scenarios such as graphic design or file systems, where sibling nodes may also require a sequential relationship, we have introduced `Fractional Index` in Loro to support this capability. You can read more about `Fractional Index` in the [Figma blog](https://www.figma.com/blog/realtime-editing-of-ordered-sequences). In simple terms, `Fractional Index` assigns a sortable value to each object, and if a new insertion occurs between two objects, the `Fractional Index` of the new object will be between the left and right values. The rust-based `Fractional Index` [implementation of Drifting-in-Space](https://github.com/drifting-in-space/fractional_index) has good design and minimal document size growth in most cases. We forked it and made a simple extension for use in Loro.

Whenever a new tree node is created or a node is moved to a new position, Loro will generate a `Fractional Index` for the node based on its position to sort among sibling nodes. In collaborative environments, conflicts with `Fractional Indexes` can arise, such as different nodes having the same `Fractional Index` or the situation where the calculation of a new node's position results in the same `Fractional Index` on both sides. We will discuss the corresponding conflict resolution methods in detail in [the blog post](https://www.loro.dev/blog/movable-tree).

You should call `enable_fractional_index(jitter: number)` to enable `Fractional Index`.

> Note: Fractional Index has an interleaving issue, but we believe this is acceptable for tree structures.

## Events

There are three types of events in the tree structure: `Create`, `Move`, and `Delete`, as follows:

```typescript
export type TreeDiffItem =
  | {
      target: TreeID;
      action: "create";
      parent: TreeID | undefined;
      index: number;
      fractionalIndex: string;
    }
  | {
      target: TreeID;
      action: "delete";
      oldParent: TreeID | undefined;
      oldIndex: number;
    }
  | {
      target: TreeID;
      action: "move";
      parent: TreeID | undefined;
      index: number;
      fractionalIndex: string;
      oldParent: TreeID | undefined;
      oldIndex: number;
    };
```

Here, `index` and `fractionalIndex` represent the node's index and the hex string representation of the `Fractional Index`, respectively. Loro will emit events in the order of causality. The deletion event signifies that the target node, along with the entire subtree rooted at the target node, has been deleted. Deletion events for the child nodes are not emitted.

### Events of node's data

Since the data of the tree nodes is represented using `MapContainer`, each `MapContainer` associated with a tree node is a child of the `TreeContainer` in the document. If you modify the data of a tree node, you will receive an event from the `MapContainer`. However, the event path contains a element of `TreeID` to indicate which node's data has been altered.

## Retrieving All Nodes

There are multiple ways to retrieve all nodes from a `LoroTree`:

1. `nodes()`: Retrieves all `LoroTreeNode` instances from the current `LoroTree`, but this function does not guarantee the order of the nodes.
2. `roots()`: Retrieves all root nodes from the current `LoroTree`, with the root nodes being ordered. Subsequently, the `children()` method of `LoroTreeNode` can be used to perform a hierarchical traversal.
3. `toArray()`: Retrieves all node information in a hierarchical traversal order, where each node's data structure is as follows:

   ```ts no_run
   {
     id: TreeID;
     parent: TreeID | undefined;
     index: number;
     fractionalIndex: string;
     meta: LoroMap;
   }
   ```

4. `toJSON()`: The JSON representation of `toArray()`, where each node's `meta` is also recursively parsed into JSON format.

## Basic Usage

### Example

```ts
import { Loro, LoroTree, LoroTreeNode, LoroMap } from "loro-crdt";

let doc = new Loro();
let tree: LoroTree = doc.getTree("tree");
let root: LoroTreeNode = tree.createNode();
// By default, append to the end of the parent node's children list
let node = root.createNode();
// Specify the child's position
let node2 = root.createNode(0);
// Move the node to become a child of another node
node.move(node2);
// Specify the child's position within the new parent
node.move(node2, 0);
// Move the node to become the root node
node.move();
// Move the node to be positioned after another node
node.moveAfter(node2);
// Move the node to be positioned before another node
node.moveBefore(node2);
// Retrieve the index of the node within its parent's children
let index = node.index();
// Get the fractional index of the node
let fractionalIndex = node.fractionalIndex();
// Access the associated data map container
let nodeData: LoroMap = node.data;
```
