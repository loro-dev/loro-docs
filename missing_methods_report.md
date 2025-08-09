# Missing Methods in API Documentation

This report compares the TypeScript definitions in `./node_modules/loro-crdt/nodejs/loro_wasm.d.ts` with the API documentation in `pages/docs/api/js.mdx` to identify methods that are defined but not documented.

## LoroDoc

### Missing Methods (from export class):
- `configDefaultTextStyle()` - Configures the default text style for the document
- `constructor()` - Constructor (typically not documented separately)
- `exportSnapshot()` - Export the snapshot of current version (deprecated, use `export({mode: "snapshot"})`)
- `free()` - Memory management method (WASM boundary)
- `getDeepValueWithID()` - Get deep value of the document with container id
- `importUpdateBatch()` - Import a batch of updates and snapshots (deprecated, use `importBatch`)

### Missing Static Methods:
- `static fromSnapshot(snapshot: Uint8Array)` - Create a loro document from the snapshot

### Missing Properties:
- `readonly peerId: bigint` - Peer ID of the current writer
- `readonly peerIdStr: PeerID` - Get peer id in decimal string

### Methods in MDX but not in export class (defined in interfaces):
- `getList()` - Get a LoroList by container id
- `getMap()` - Get a LoroMap by container id  
- `getTree()` - Get a LoroTree by container id
- `getMovableList()` - Get a LoroMovableList by container id
- `getContainerById()` - Get a container by its ID
- `diff()` - Calculate diff between two versions
- `exportJsonInIdSpan()` - Export JSON in ID span
- `exportJsonUpdates()` - Export updates in JSON format
- `subscribe()` - Subscribe to document changes
- `subscribeFirstCommitFromPeer()` - Subscribe to first commit from a peer
- `subscribeLocalUpdates()` - Subscribe to local updates
- `subscribePreCommit()` - Subscribe to pre-commit events
- `toJsonWithReplacer()` - Convert to JSON with replacer function

## LoroText

### Missing Methods:
- `charAt()` - Get character at position
- `constructor()` - Constructor
- `deleteUtf8()` - Delete UTF-8 bytes
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getEditorOf()` - Get editor of text
- `getShallowValue()` - Get shallow value
- `insertUtf8()` - Insert UTF-8 bytes
- `isAttached()` - Check if attached
- `isDeleted()` - Check if deleted
- `iter()` - Iterator for text
- `kind()` - Get container kind
- `parent()` - Get parent container
- `push()` - Push text content
- `slice()` - Slice text
- `splice()` - Splice text
- `toJSON()` - Convert to JSON

### Methods in MDX but not in export class:
- `getCursor()` - Get cursor position (defined in interface)
- `update()` - Update text content
- `updateByLine()` - Update text by line

## LoroList

### Missing Methods (from export class):
- `constructor()` - Constructor
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getShallowValue()` - Get shallow value
- `isAttached()` - Check if attached
- `isDeleted()` - Check if deleted
- `kind()` - Get container kind
- `parent()` - Get parent container
- `toJSON()` - Convert to JSON

### Methods in MDX but not in export class (defined in interfaces):
- `get()` - Get value at index
- `getCursor()` - Get cursor position
- `insert()` - Insert value at index
- `insertContainer()` - Insert container at index
- `length` - Get list length (property)
- `push()` - Push value to list
- `pushContainer()` - Push container to list
- `toArray()` - Convert to array

## LoroMap

### Missing Methods:
- `constructor()` - Constructor
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getShallowValue()` - Get shallow value
- `isAttached()` - Check if attached
- `isDeleted()` - Check if deleted
- `kind()` - Get container kind
- `parent()` - Get parent container
- `toJSON()` - Convert to JSON

### Methods in MDX but not in export class (defined in interfaces):
- `get()` - Get value by key
- `getOrCreateContainer()` - Get or create container
- `set()` - Set key-value pair
- `setContainer()` - Set container value
- `size` - Get map size (property)

## LoroTree

### Missing Methods:
- `constructor()` - Constructor
- `disableFractionalIndex()` - Disable fractional indexing
- `enableFractionalIndex()` - Enable fractional indexing
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getShallowValue()` - Get shallow value
- `isAttached()` - Check if attached
- `isDeleted()` - Check if deleted
- `isFractionalIndexEnabled()` - Check if fractional indexing is enabled
- `kind()` - Get container kind
- `parent()` - Get parent container
- `toJSON()` - Convert to JSON

### Methods in MDX but not in export class:
- `createNode()` - Create a new tree node
- `getNodeByID()` - Get node by its ID

## LoroTreeNode

### Missing Methods:
- `__getClassname()` - Internal class name getter
- `creationId()` - Get creation ID
- `creator()` - Get creator peer ID
- `free()` - Memory management
- `getLastMoveId()` - Get last move ID

### Methods/Properties in MDX but not in export class:
- `children` - Get child nodes (property)
- `createNode()` - Create child node
- `data` - Get node data (property)
- `move()` - Move node
- `parent` - Get parent node (property)

## LoroCounter

### Missing Methods:
- `constructor()` - Constructor
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getShallowValue()` - Get shallow value
- `isAttached()` - Check if attached
- `kind()` - Get container kind
- `parent()` - Get parent container
- `subscribe()` - Subscribe to changes

### Methods/Properties in MDX but not in export class:
- `value` - Get counter value (property)

## LoroMovableList

### Missing Methods:
- `clear()` - Clear the list
- `constructor()` - Constructor
- `delete()` - Delete elements
- `free()` - Memory management
- `getAttached()` - Get attached instance
- `getCreatorAt()` - Get creator at index
- `getLastEditorAt()` - Get last editor at index
- `getLastMoverAt()` - Get last mover at index
- `getShallowValue()` - Get shallow value
- `isAttached()` - Check if attached
- `isDeleted()` - Check if deleted
- `kind()` - Get container kind
- `parent()` - Get parent container
- `pop()` - Pop element from list
- `toJSON()` - Convert to JSON

### Methods in MDX but not in export class (defined in interfaces):
- `set()` - Set value at position
- `setContainer()` - Set container at position

## Summary

Many of the missing methods fall into these categories:

1. **Internal/WASM methods** (`free()`, `constructor()`, `__getClassname()`) - These are typically not user-facing and don't need documentation
2. **Deprecated methods** (`exportSnapshot()`, `importUpdateBatch()`) - Already have replacements documented
3. **Helper/utility methods** (`getAttached()`, `isAttached()`, `getShallowValue()`) - May be internal implementation details
4. **Common container methods** (`kind()`, `parent()`, `toJSON()`, `isDeleted()`) - Should probably be documented as they're part of the public API
5. **Interface-defined methods** - Many methods are defined in TypeScript interfaces rather than the export class, especially for containers like List and Map

The most important missing public API methods that should be documented are:
- `configDefaultTextStyle()` for LoroDoc
- `static fromSnapshot()` for LoroDoc  
- Common container methods like `toJSON()`, `parent()`, `kind()`
- Tree-specific methods like `enableFractionalIndex()`, `disableFractionalIndex()`, `isFractionalIndexEnabled()`
- Various metadata methods like `creationId()`, `creator()` for LoroTreeNode