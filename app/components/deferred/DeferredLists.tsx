"use client";

import { useDeferredValue, useMemo, useState } from "react";
import DeferredListTab from "./DeferredListTab";

type Mode = "without" | "with";

const items = Array.from({ length: 30000 }, (_, i) => ({
  id: i,
  name: `Item #${i + 1}`,
}));

interface DeferredListsProps {
  tab: string; // "deferred/without" | "deferred/with"
}

export default function DeferredLists({ tab }: DeferredListsProps) {
  const [, sub = "without"] = tab.split("/");
  const mode = (sub as Mode) || "without";

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
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Filter list by text {mode === "with" ? "(useDeferredValue)" : "(no deferred)"}
        </label>
        <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type to filter... 1 to 30000"
        />
        <p className="mt-2 text-sm text-gray-500">
          Applied filter: <span className="text-gray-700">{effectiveQuery || "(none)"}</span>
        </p>
        {isStale && (
          <p className="mt-1 text-xs text-gray-500">Updating list…</p>
        )}
      </div>

      <DeferredListTab mode={mode} items={filtered} isStale={isStale} />
    </div>
  );
}
