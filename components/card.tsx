import React from "react";

export function Card(props: { name: string; note: React.ReactNode }) {
  return (
    <div className="dark:text-gray-100 dark:bg-stone-900 dark:border-stone-800 border-stone-200 border bg-slate-50 rounded-lg px-6 pt-4 pb-6 cursor-default">
      <h3 className="text-lg font-bold mb-3">{props.name}</h3>
      <div className="text-gray-600 dark:text-gray-400 text-md">
        {props.note}
      </div>
    </div>
  );
}
