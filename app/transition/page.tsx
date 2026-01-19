"use client";

import { useState } from "react";
import TabButton from "../components/TabButton";
import LongLists from "../components/longlists/LongLists";

export default function TransitionPage() {
  const [tab, setTab] = useState("longlists/without");
  const [contentTab, setContentTab] = useState(tab);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">useTransition</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <TabButton
          isActive={tab === "longlists/without"}
          onClick={() => {
            setTab("longlists/without");
            setContentTab("longlists/without");
          }}
        >
          1. Blocking UI (render all)
        </TabButton>
        <TabButton
          isActive={tab === "longlists/with"}
          onClick={() => {
            setTab("longlists/with");
            setContentTab("longlists/with");
          }}
        >
          2. Non-Blocking UI (useTransition)
        </TabButton>
        <TabButton
          isActive={tab === "longlists/virtualized"}
          onClick={() => {
            setTab("longlists/virtualized");
            setContentTab("longlists/virtualized");
          }}
        >
          3. Virtualized List
        </TabButton>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md" style={{ contain: "content" }}>
        <LongLists tab={contentTab} />
      </div>
    </div>
  );
}
