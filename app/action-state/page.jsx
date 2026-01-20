"use client";
import { useState } from "react";
import ActionStateForm from "../components/actionState/ActionStateForm";
import ManualForm from "../components/actionState/ManualForm";
import TabButton from "../components/TabButton";
import CodeBlock from "../components/CodeBlock";

const useActionStateSample = `"use client";
import { useActionState } from "react";
import { increment } from "./actions";

const initial = { count: 0 };

export default function ActionStateForm() {
  const [state, formAction, isPending] = useActionState(increment, initial);
  return (
    <form action={formAction}>
      {/* fields */}
      <button disabled={isPending}>Increment</button>
      <div>Count: {state.count}</div>
    </form>
  );
}`;

const manualSample = `"use client";
import { useState, useTransition } from "react";
import { increment } from "./actions";

export default function ManualForm() {
  const [state, setState] = useState({ count: 0 });
  const [isPending, startTransition] = useTransition();
  async function onSubmit(formData) {
    startTransition(async () => {
      const res = await increment(state, formData);
      setState(res);
    });
  }
  return (
    <form action={onSubmit}>
      {/* fields */}
      <button disabled={isPending}>Increment</button>
      <div>Count: {state.count}</div>
    </form>
  );
}`;

export default function ActionStatePage() {
  const [tab, setTab] = useState("with");
  const [contentTab, setContentTab] = useState(tab);

  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">useActionState</h1>
      <p className="mb-6 max-w-prose text-gray-600 text-sm">
        Compare a form implemented with <code>useActionState</code> vs a manual approach
        using <code>useState</code> + <code>useTransition</code>.
      </p>
      <div className="mb-4 flex flex-wrap gap-3">
        <TabButton
          isActive={tab === "with"}
          onClick={() => {
            setTab("with");
            setContentTab("with");
          }}>
          
          1. With useActionState
        </TabButton>
        <TabButton
          isActive={tab === "without"}
          onClick={() => {
            setTab("without");
            setContentTab("without");
          }}>
          
          2. Without useActionState
        </TabButton>
      </div>

      <div className="rounded-lg bg-white p-6 shadow" style={{ contain: "content" }}>
        {contentTab === "with" ? <ActionStateForm /> : <ManualForm />}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-6">
        <CodeBlock title="With useActionState" code={useActionStateSample} />
        <CodeBlock title="Manual (useState + useTransition)" code={manualSample} />
      </div>
    </div>);

}