---
keywords: "loro, yjs, automerge, diamond-type, benchmark, document size, crdt"
description: "Comparing the document size of Loro and popular CRDTs"
---

# Document Size

In this benchmark, we use the Automerge paper dataset.

Source: https://github.com/automerge/automerge-perf/tree/master/edit-by-index

The dataset consists of:

- 182,315 single-character insertion operations
- 77,463 single-character deletion operations
- A total of 259,778 operations
- 104,852 characters in the final document

The first line of settings in the table below indicates configurations without
`gc` and `compress`.

| Settings             | loro-snapshot | loro-update | diamond-type | yrs    | automerge |
| -------------------- | ------------- | ----------- | ------------ | ------ | --------- |
| Default (no options) | 273561        | 251352      | 281042       | 226973 | 292742    |
| gc                   | x             | x           | 203564       | 159921 | x         |
| compress             | 132459        | 105724      | 150723       | 91777  | 129062    |
| gc & compress        | x             | x           | 106242       | 71033  | x         |

> The `x` in the table above signifies that the corresponding setting is not supported.

Loro also supports a shallow snapshot encoding format with gc capabilities by truncating the history. For details, see [the doc](/docs/tutorial/encoding).
If truncated from the latest version, the result will be:

| Settings | loro-shallow-snapshot |
| -------- | --------------------- |
| Default  | 63352                 |
| compress | 54517                 |
