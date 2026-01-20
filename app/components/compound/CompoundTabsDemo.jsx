"use client";

import { createContext, useContext, useState } from "react";






const TabsContext = createContext(undefined);

function Tabs({ children, value, onChange }) {
  return (
    <TabsContext.Provider value={{ value, setValue: onChange }}>
      <div>{children}</div>
    </TabsContext.Provider>);

}

function TabList({ children }) {
  return <div className="flex gap-2 mb-2">{children}</div>;
}

function Tab({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("Tab must be used within Tabs");
  const selected = ctx.value === value;
  return (
    <button
      className={`px-4 py-2 rounded font-semibold transition-colors ${selected ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-blue-400 hover:text-white"}`}
      onClick={() => ctx.setValue(value)}
      id={`tab-${value}`}>
      
      {children}
    </button>);

}

function TabPanel({ value, children }) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error("TabPanel must be used within Tabs");
  const selected = ctx.value === value;
  return selected ?
  <div
    className="p-4 bg-[#1F1F1F] rounded border mt-2 text-gray-100"
    role="tabpanel"
    id={`tabpanel-${value}`}>
    
      {children}
    </div> :
  null;
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
    </Tabs>);

}
