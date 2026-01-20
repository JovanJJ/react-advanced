"use client";

import React from "react";

export default function CodeBlock({ title, code }) {
  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch {

      // no-op
    }
  };
  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
        <button
          onClick={onCopy}
          className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-600 hover:text-white">

          Copy
        </button>
      </div>
      <pre className="overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100">
        <code>{code}</code>
      </pre>
    </div>);

}
