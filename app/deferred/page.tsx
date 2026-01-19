"use client";

import { useState } from "react";
import TabButton from "../components/TabButton";
import DeferredLists from "../components/deferred/DeferredLists";

export default function DeferredPage() {
  const [tab, setTab] = useState("deferred/without");
  const [contentTab, setContentTab] = useState(tab);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">useDeferredValue</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <TabButton
          isActive={tab === "deferred/without"}
          onClick={() => {
            setTab("deferred/without");
            setContentTab("deferred/without");
          }}
        >
          1. Without useDeferredValue
        </TabButton>
        <TabButton
          isActive={tab === "deferred/with"}
          onClick={() => {
            setTab("deferred/with");
            setContentTab("deferred/with");
          }}
        >
          2. With useDeferredValue
        </TabButton>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md" style={{ contain: "content" }}>
        <DeferredLists tab={contentTab} />
      </div>
    </div>
  );
}
