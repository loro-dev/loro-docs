---
keywords: "crdts, json, data model, document state, semantics"
description: "Everyone can effectively model the states and the updates of documents that conform to the JSON schema."
---

# Composing CRDTs

In Loro, you can build complex data structures using basic CRDTs such as List, MovableList, Map and Tree. These containers can include sub-containers, which in turn can contain more sub-containers, allowing for the composition of intricate data structures.

It's important to note that documents in Loro must adhere to a tree structure. This means that while a parent can have multiple children, each child is restricted to only one parent. Therefore, the document forms a tree rather than a graph (like a DAG).

By leveraging these fundamental CRDTs, you can effectively model the states and the updates of documents that conform to the JSON schema.

```ts
const doc = new LoroDoc();
const map = doc.getMap("map");
let callTimes = 0;
// Events from a child are propagated to all ancestor nodes.
map.subscribe((event) => {
  console.log(event);
  callTimes++;
});

// Create a sub container for map
// { map: { list: [] } }
const list = map.setContainer("list", new LoroList());
list.push(0);
list.push(1);

// Create a sub container for list
// { map: { list: [0, 1, LoroText] } }
const text = list.insertContainer(2, new LoroText());
expect(doc.toJSON()).toStrictEqual({ map: { list: [0, 1, ""] } });
{
  // Commit will trigger the event, because list is a sub container of map
  doc.commit();
  await new Promise((resolve) => setTimeout(resolve, 1));
  expect(callTimes).toBe(1);
}

text.insert(0, "Hello, ");
text.insert(7, "World!");
expect(doc.toJSON()).toStrictEqual({ map: { list: [0, 1, "Hello, World!"] } });
{
  // Commit will trigger the event, because text is a descendant of map
  doc.commit();
  await new Promise((resolve) => setTimeout(resolve, 1));
  expect(callTimes).toBe(2);
}
```
