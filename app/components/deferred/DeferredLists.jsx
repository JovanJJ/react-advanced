"use client";

import { useDeferredValue, useMemo, useState } from "react";
import DeferredListTab from "./DeferredListTab";



const items = Array.from({ length: 30000 }, (_, i) => ({
  id: i,
  name: `Item #${i + 1}`
}));





export default function DeferredLists({ tab }) {
  const [, sub = "without"] = tab.split("/");
  const mode = sub || "without";

  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const effectiveQuery = mode === "with" ? deferredQuery : query;
  const isStale = mode === "with" && deferredQuery !== query;

  const filtered = useMemo(() => {
    if (!effectiveQuery) return items;
    const q = effectiveQuery.toLowerCase();
    return items.filter((it) => it.name.toLowerCase().includes(q));
  }, [effectiveQuery]);

  return (
    <div>
      <div className="mb-6">
        <label className="mb-2 block text-sm font-medium text-gray-300">
          Filter list by text {mode === "with" ? "(useDeferredValue)" : "(no deferred)"}
        </label>
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-100 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to filter... 1 to 30000" />
        
        <p className="mt-2 text-sm text-gray-500">
          Applied filter: <span className="text-gray-300">{effectiveQuery || "(none)"}</span>
        </p>
        {isStale &&
        <p className="mt-1 text-xs text-gray-500">Updating list…</p>
        }
      </div>

      <DeferredListTab mode={mode} items={filtered} isStale={isStale} />
    </div>);

}
