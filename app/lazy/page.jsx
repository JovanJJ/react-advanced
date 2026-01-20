"use client";
import React, { Suspense, useState } from "react";

// React.lazy example (heavy chunk only fetched when rendered)
const HeavyReactLazy = React.lazy(() => import("@/app/components/lazy/HeavyWidget"));
// Dynamic client-only wrapper (ssr:false internally)
import HeavyDynamicWrapper from "../components/lazy/HeavyDynamicWrapper";

export default function LazyPage() {
  const [showLazyExample, setShowLazyExample] = useState(false);
  const [showDynamicExample, setShowDynamicExample] = useState(false);

  return (
    <div className="space-y-8">
            <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-100">Lazy Loading</h1>
                <p className="text-gray-400 max-w-2xl">
                    Demonstrates <code>React.lazy</code> with <code>Suspense</code> and Next.js <code>dynamic()</code> for code splitting a heavy component.
                    The heavy widget (Chart.js) is only downloaded once you click the load buttons below.
                </p>
            </div>

            {/* React.lazy section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-100">1. React.lazy + Suspense</h2>
                <p className="text-gray-400 text-sm max-w-prose">
                    Uses <code>React.lazy</code>. Chunk is fetched only after you click &quot;Load React.lazy example&quot;. While it loads, the Suspense fallback appears.
                </p>
                <div className="rounded-lg border bg-[#2A2A2A] p-4 shadow-sm min-h-40 flex flex-col gap-3 justify-center">
                    {!showLazyExample &&
          <button
            onClick={() => setShowLazyExample(true)}
            className="self-start rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            
                            Load React.lazy example
                        </button>
          }
                    {showLazyExample &&
          <Suspense
            fallback={<div className="animate-pulse text-gray-500">Loading (React.lazy)…</div>}>
            
                            <HeavyReactLazy variant="lazy" />
                        </Suspense>
          }
                </div>
            </section>

            {/* dynamic() section */}
            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-100">2. next/dynamic()</h2>
                <p className="text-gray-400 text-sm max-w-prose">
                    Uses <code>dynamic()</code> with <code>ssr: false</code>. The heavy client-only chunk is fetched when you click the button.
                </p>
                <div className="rounded-lg border bg-[#2A2A2A] p-4 shadow-sm min-h-40 flex flex-col gap-3 justify-center">
                    {!showDynamicExample &&
          <button
            onClick={() => setShowDynamicExample(true)}
            className="self-start rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600">
            
                            Load dynamic() example
                        </button>
          }
                    {showDynamicExample && <HeavyDynamicWrapper />}
                </div>
            </section>

            <section className="space-y-4">
                <h2 className="text-xl font-semibold text-gray-100">Why both?</h2>
                <ul className="list-disc pl-5 text-sm text-gray-300 space-y-1">
                    <li>
                        <code>React.lazy</code>: Framework-agnostic & Suspense-first. Good when you can stream or show a boundary fallback.
                    </li>
                    <li>
                        <code>dynamic()</code>: Next.js helper for client-only libs (e.g. Chart.js), custom loading components, and disabling SSR.
                    </li>
                </ul>
                <div className="rounded bg-gray-100 p-3 text-xs text-gray-400">
                    Tip: Open the Network tab, clear it, then click each load button to observe separate chunks downloading only on demand.
                </div>
            </section>
        </div>);

}
