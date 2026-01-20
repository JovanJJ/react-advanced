"use client";

import useSWR, { mutate as globalMutate } from "swr";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";



function InnerClient({
  mode,
  swrKey,
  serverData




}) {
  const router = useRouter();
  // Data always comes from the server for initial render
  const [rawData, setRawData] = useState(serverData ?? null);

  // SWR path
  const { data: swrData, isLoading: swrLoading, isValidating } = useSWR(
    mode === "swr" ? swrKey : null,
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnFocus: false,
      fallbackData: mode === "swr" ? serverData ?? undefined : undefined,
      // Show stale server data first, then revalidate on mount
      revalidateOnMount: true
    }
  );

  // SWR = "stale-while-revalidate": instantly show the last cached value (stale)
  // while revalidating in the background. Here we seed the cache with serverData (fallbackData)
  // so the UI renders immediately, then it re-fetches and updates when fresh data arrives.
  // Base list for each mode
  const list = useMemo(() => {
    if (mode === "without" || mode === "cached") return rawData;
    return swrData ?? null;
  }, [mode, rawData, swrData]);

  const effective = list;
  const loading = mode === "swr" ? swrLoading : false;
  const updating = mode === "swr" && isValidating && !swrLoading;

  // Refresh button behavior:
  // - without: do a fresh no-store fetch and replace the list
  // - cached: no-op (kept simple; uses server-side Next fetch cache)
  // - swr: trigger a revalidation (stale is shown instantly; updated once fetch completes)
  async function refresh() {
    if (mode === "swr") {
      await globalMutate(swrKey);
    } else {
      // For without/cached, server controls data; refresh the page
      router.refresh();
    }
  }

  return (
    <div className="space-y-4">
        <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
                <ul className="list-disc space-y-1 pl-5">
            <li>Without caching: client fetch on mount; shows loading and refetches (fresh data).</li>
            <li>Cached (no SWR): server renders cached data (Next.js fetch cache). Use Clear cache to force fresh data.</li>
            <li>With SWR caching: client caching and revalidation. Should be showing stale data and then revalidating</li>
                </ul>
            </div>

            <div className="flex items-center gap-2">
                <button onClick={refresh} disabled={mode === "cached"} className={`rounded px-3 py-1.5 text-white ${mode === "cached" ? "bg-gray-400 cursor-not-allowed" : "bg-gray-900 hover:bg-gray-800"}`}>
                    Refresh
                </button>
                <button
          onClick={async () => {
            // Clears server cache for the tagged fetches
            await fetch("/api/random-posts/clear-cache", { method: "POST" });
            if (mode === "swr") {
              // Revalidate SWR after server cache is cleared
              await globalMutate(swrKey);
            } else if (mode === "cached") {
              // Refresh the page to re-render server components with fresh data
              router.refresh();
            }
          }}
          className="rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-500">
          
                    Clear cache
                </button>
                {loading && <span className="text-gray-500">Loading…</span>}
                {!loading && updating && <span className="text-gray-500">Updating…</span>}
            </div>

            <div className="rounded-md border bg-white">
                <div className="border-b px-3 py-2 text-sm text-gray-500">
                    Items ({effective?.length ?? 0})
                </div>
                <ul className="divide-y">
                    {(effective ?? []).map((p) =>
          <li key={p.id} className="px-3 py-2">
                            <div className="flex items-center justify-between">
                                <span className="text-gray-900">{p.title}</span>
                                {/* no optimistic badge in this demo */}
                            </div>
                        </li>
          )}
                    {!effective?.length && !loading &&
          <li className="px-3 py-6 text-center text-sm text-gray-500">No items</li>
          }
                </ul>
            </div>
        </div>);

}

export default function CachingDemoClient(props) {
  return <InnerClient {...props} />;
}