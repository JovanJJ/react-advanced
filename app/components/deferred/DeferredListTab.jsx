"use client";


import ListItem from "../longlists/ListItem";









const headings = {
  without: "1. Without useDeferredValue (Blocking filtering)",
  with: "2. With useDeferredValue (Smoother typing)"
};

const descriptions = {
  without:
  "Applies the filter on every keystroke. Rendering a big list can block typing. 30,000 items is used in this demo.",
  with:
  "useDeferredValue lets typing stay responsive while the heavy list update lags behind. 30,000 items is used in this demo."
};

const HeavyList = ({ items }) =>
<div className="max-h-96 overflow-y-auto">
    {items.map((item) =>
  <ListItem key={item.id} item={item} />
  )}
  </div>;


const DeferredListTab = ({ mode, items, isStale }) => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-300">{headings[mode]}</h2>
      <p className="mb-4 text-gray-400">{descriptions[mode]}</p>
      {isStale &&
      <p className="mb-2 text-sm text-gray-500">List updating…</p>
      }
      <HeavyList items={items} />
      <div className="mt-6">
        <h3 className="mb-2 text-sm font-semibold text-gray-300">Code example</h3>
        <pre className="overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
          <code>{[
            '"use client";',
            '',
            'import { useDeferredValue, useMemo, useState } from "react";',
            '',
            'const items = Array.from({ length: 30000 }, (_, i) => ({ id: i, name: `Item #${i + 1}` }));',
            '',
            'export default function DeferredLists({ tab }) {',
            '  const [, sub = "without"] = tab.split("/");',
            '  const mode = sub === "with" ? "with" : "without";',
            '',
            '  const [query, setQuery] = useState("");',
            '  const deferredQuery = useDeferredValue(query);',
            '  const effectiveQuery = mode === "with" ? deferredQuery : query;',
            '',
            '  const filtered = useMemo(() => {',
            '    const q = effectiveQuery.toLowerCase();',
            '    return items.filter((it) => it.name.toLowerCase().includes(q));',
            '  }, [effectiveQuery]);',
            '',
            '  return (',
            '    <div>',
            '      <input value={query} onChange={(e) => setQuery(e.target.value)} />',
            '      <ul>',
            '        {filtered.map((it) => (<li key={it.id}>{it.name}</li>))}',
            '      </ul>',
            '    </div>',
            '  );',
            '}'].
            join('\n')}</code>
        </pre>
      </div>
    </div>);

};

export default DeferredListTab;
