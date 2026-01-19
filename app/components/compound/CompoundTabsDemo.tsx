"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type TabsContextType = {
  value: string;
  setValue: (v: string) => void;
};

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function Tabs({ children, value, onChange }: { children: ReactNode; value: string; onChange: (v: string) => void }) {
  return (
    <TabsContext.Provider value={{ value, setValue: onChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }: { children: ReactNode }) {
  return <div className="flex gap-2 mb-2">{children}</div>;
}

function Tab({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used within Tabs");
  const selected = ctx.value === value;
  return (
    <button
      className={`px-4 py-2 rounded font-semibold transition-colors ${selected ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white"}`}
      onClick={() => ctx.setValue(value)}
      id={`tab-${value}`}
    >
      {children}
    </button>
  );
}

function TabPanel({ value, children }: { value: string; children: ReactNode }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be used within Tabs");
  const selected = ctx.value === value;
  return selected ? (
    <div
      className="p-4 bg-gray-50 rounded border mt-2 text-black"
      role="tabpanel"
      id={`tabpanel-${value}`}
    >
      {children}
    </div>
  ) : null;
}

export default function CompoundTabsDemo() {
  const [tab, setTab] = useState("one");
  return (
    <Tabs value={tab} onChange={setTab}>
      <TabList>
        <Tab value="one">Tab One</Tab>
        <Tab value="two">Tab Two</Tab>
      </TabList>
      <TabPanel value="one">This is Tab One content.</TabPanel>
      <TabPanel value="two">This is Tab Two content.</TabPanel>
    </Tabs>
  );
}
