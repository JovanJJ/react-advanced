"use client";
import { useState, useTransition } from "react";
import { increment, type CounterState } from "./actions";

export default function ManualForm() {
  const [state, setState] = useState<CounterState>({ count: 0 });
  const [isPending, startTransition] = useTransition();

  async function onSubmit(formData: FormData) {
    startTransition(async () => {
      const res = await increment(state, formData);
      setState(res);
    });
  }

  return (
    <form action={onSubmit} className="space-y-4 text-sm">
      <div className="flex items-end gap-3">
        <label className="flex flex-col text-xs font-medium text-gray-600">
          Step (&lt;=5)
          <input
            type="number"
            name="step"
            min={1}
            max={10}
            defaultValue={1}
            className="mt-1 w-24 rounded border bg-white text-gray-900 placeholder-gray-400 px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-500 disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Increment"}
        </button>
      </div>
      <div className="rounded border bg-gray-50 p-3">
        <div className="font-semibold mb-1 text-black">Result</div>
        <div className="text-[13px] text-black">
          Count: <span className="font-mono">{state.count}</span>
        </div>
        {state.message && !state.error && (
          <div className="mt-1 text-[11px] text-green-600">{state.message}</div>
        )}
        {state.error && (
          <div className="mt-1 text-[11px] text-red-600">Error: {state.error}</div>
        )}
        {isPending && (
          <div className="mt-1 text-[11px] text-gray-500 animate-pulse">Processing on server...</div>
        )}
      </div>
    </form>
  );
}
