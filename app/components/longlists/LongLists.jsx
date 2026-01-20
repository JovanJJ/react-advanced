"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import LongListTab from "./LongListTab";



const items = Array.from({ length: 30000 }, (_, i) => ({
  id: i,
  name: `Item #${i + 1}`
}));





export default function LongLists({ tab }) {
  const [, sub = "without"] = tab.split("/");
  const mode = sub || "without";

  const [isPending, startTransition] = useTransition();
  const [performanceLog, setPerformanceLog] = useState("");
  const startTimeRef = useRef(null);
  // Filter demo states: immediate input vs. deferred applied filter
  const [filterInput, setFilterInput] = useState("");
  const [filter, setFilter] = useState("");
  // const [filteredItems, setFilteredItems] = useState(items);


  useEffect(() => {
    startTimeRef.current = null;
    // setFilterInput("");
    // setFilter("");
    setPerformanceLog("");
    setFilterInput("");
    setFilter("");
  }, [mode]);


  const filteredItems = useMemo(() => {
    if (!filter) {
      return items;
    }
    const q = filter.toLowerCase();
    const filterFunction = (name) => {
      const s = name.toLowerCase();
      return s.includes(q);
    };
    return items.filter((it) => filterFunction(it.name));
  }, [filter]);

  const handleFilterChange = (e) => {
    const next = e.target.value;
    setFilterInput(next); // urgent update stays responsive
    if (mode === "with") {
      startTransition(() => setFilter(next)); // defer heavy list update
    } else {
      setFilter(next); // blocks in "without"
    }
  };


  return (
    <div>
            <div className="mb-6">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                    Filter list by text (useTransition keeps typing responsive)
                </label>
                <input
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          type="text"
          value={filterInput}
          onChange={handleFilterChange}
          placeholder="Type to filter..." />
        
                <p className="mt-2 text-sm text-gray-500">Applied filter: <span className="text-gray-700">{filter || "(none)"}</span></p>
            </div>

            <LongListTab mode={mode} items={filteredItems} />
            {performanceLog &&
      <p className="mt-4 text-sm text-gray-500">{performanceLog}</p>
      }
        </div>);

}