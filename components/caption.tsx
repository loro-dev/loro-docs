import React, { PropsWithChildren } from "react";

export default function Caption({ children }: PropsWithChildren) {
  return (
    <div className="ml-1 mt-2 text-gray-400 text-sm caption">{children}</div>
  );
}
