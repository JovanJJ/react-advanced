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

  const [rawData, setRawData] = useState(serverData ?? null);


  const { data: swrData, isLoading: swrLoading, isValidating } = useSWR(
    mode === "swr" ? swrKey : null,
    (url) => fetch(url).then((r) => r.json()),
    {
      revalidateOnFocus: false,
      fallbackData: mode === "swr" ? serverData ?? undefined : undefined,

      revalidateOnMount: true
    }
  );


  const list = useMemo(() => {
    if (mode === "without" || mode === "cached") return rawData;
    return swrData ?? null;
  }, [mode, rawData, swrData]);

  const effective = list;
  const loading = mode === "swr" ? swrLoading : false;
  const updating = mode === "swr" && isValidating && !swrLoading;


  async function refresh() {
    if (mode === "swr") {
      await globalMutate(swrKey);
    } else {

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

            await fetch("/api/random-posts/clear-cache", { method: "POST" });
            if (mode === "swr") {

              await globalMutate(swrKey);
            } else if (mode === "cached") {

              router.refresh();
            }
          }}
          className="rounded bg-red-600 px-3 py-1.5 text-white hover:bg-red-500">

          Clear cache
        </button>
        {loading && <span className="text-gray-500">Loading…</span>}
        {!loading && updating && <span className="text-gray-500">Updating…</span>}
      </div>

      <div className="rounded-md border bg-[#2A2A2A]">
        <div className="border-b px-3 py-2 text-sm text-gray-500">
          Items ({effective?.length ?? 0})
        </div>
        <ul className="divide-y">
          {(effective ?? []).map((p) =>
            <li key={p.id} className="px-3 py-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-100">{p.title}</span>

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
