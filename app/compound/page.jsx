import CompoundTabsDemo from "../components/compound/CompoundTabsDemo";
import CodeBlock from "../components/CodeBlock";

const compoundSample = `import { createContext, useContext, useState } from "react";

const TabsContext = createContext();
function Tabs({ children, value, onChange }) {
  return (
    <TabsContext.Provider value={{ value, setValue: onChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}
function TabList({ children }) {
  return <div>{children}</div>;
}
function Tab({ value, children }) {
  const ctx = useContext(TabsContext);
  const selected = ctx.value === value;
  return <button onClick={() => ctx.setValue(value)}>{children}</button>;
}
function TabPanel({ value, children }) {
  const ctx = useContext(TabsContext);
  return ctx.value === value ? <div>{children}</div> : null;
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
`;

const vanillaSample = `import { useState } from "react";

export default function VanillaTabs() {
  const [tab, setTab] = useState("one");
  return (
    <div>
      <div>
        <button onClick={() => setTab("one")}>Tab One</button>
        <button onClick={() => setTab("two")}>Tab Two</button>
      </div>
      {tab === "one" && <div>This is Tab One content.</div>}
      {tab === "two" && <div>This is Tab Two content.</div>}
    </div>
  );
}
`;

export default function CompoundPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Compound Components</h1>
      <p className="mb-6 max-w-prose text-gray-600 text-sm">
        Compound components let you build flexible, declarative APIs for UI primitives like Tabs, Accordions, etc.
        Compare a compound Tabs implementation to a vanilla approach.
      </p>
      <div className="rounded-lg bg-white p-6 shadow mb-6" style={{ contain: 'content' }}>
        <CompoundTabsDemo />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CodeBlock title="Compound Tabs" code={compoundSample} />
        <CodeBlock title="Vanilla Tabs" code={vanillaSample} />
      </div>
    </div>);

}