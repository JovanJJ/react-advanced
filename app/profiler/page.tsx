"use client";

import { useState } from "react";
import TabButton from "../components/TabButton";
import ProfilerSimple from "../components/profiler/ProfilerSimple";

export default function ProfilerPage() {
  const [tab, setTab] = useState("profiler-simple/without");
  const [contentTab, setContentTab] = useState(tab);

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Profiler</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <TabButton
          isActive={tab === "profiler-simple/without"}
          onClick={() => {
            setTab("profiler-simple/without");
            setContentTab("profiler-simple/without");
          }}
        >
          1. Profiler Simple: Without optimizations
        </TabButton>
        <TabButton
          isActive={tab === "profiler-simple/with"}
          onClick={() => {
            setTab("profiler-simple/with");
            setContentTab("profiler-simple/with");
          }}
        >
          2. Profiler Simple: With memo + useMemo + useCallback
        </TabButton>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md" style={{ contain: "content" }}>
        <ProfilerSimple tab={contentTab} />
      </div>
    </div>
  );
}
