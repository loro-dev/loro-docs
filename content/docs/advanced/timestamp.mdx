# Storing Timestamps

You can enable timestamp recording through `setRecordTimestamp`, allowing Unix timestamps to be logged in each `Change`. Consequently, these timestamps will be preserved in exported `Updates` or `Snapshots`.

Enabling this feature affects the merge behavior of `Changes`, as `Changes` with too long a time gap cannot share the same timestamp. In such cases, you can adjust the mergeable duration range using `setChangeMergeInterval`, with a default setting of 1,000,000, equating to a 1000s threshold for merging `Changes`.

> Each insertion or deletion by the user generates an `op`, and multiple consecutive `op`s can merge into a larger `Change`. `Change`s log a `Timestamp`, but each `Change` can only associate with one `Timestamp`. Hence, if the time gap is too wide, merging `Changes` becomes impractical. However, treating each Change as new based on slight timestamp differences (e.g., key presses milliseconds apart) introduces significant additional overhead for each Change. Therefore, users can customize the `change merge interval` according to their needs.

Note that these settings do not persist in exported `Updates` or `Snapshots`. Thus, if custom configurations are required, they must be reapplied upon each initialization of `LoroDoc`. Without timestamp recording enabled, the `Timestamp` defaults to the current maximum known `Timestamp`.
