import CachingDemoClient from "./CachingDemoClient";

const SWR_KEY = "/api/random-posts";

export default async function CachingDemoServer({
    mode,
}: {
    mode: "without" | "swr" | "cached";
}) {
    // Modes overview:
    // - "without": no prefetch; the client fetches with cache: "no-store" and shows a loading state.
    // - "swr": we prefetch data to seed SWR via fallbackData so it can render instantly (stale),
    //           then SWR revalidates on the client.
    // - "cached": server fetch uses Next's enhanced fetch with cache: "force-cache", so the response
    //              is cached on the server and reused across requests until revalidated by Next.
    // Always fetch on the server and pass data down
    const url = "http://localhost:3000" + SWR_KEY;
    const fetchOptions =
        mode === "without"
            ? { cache: "no-store" as const, next: { tags: ["random-posts"] } }
            : { cache: "force-cache" as const, next: { tags: ["random-posts"] } };

    let serverData: { id: number | string; title: string }[] | null = null;
    const res = await fetch(url, fetchOptions);
    if (res.ok) serverData = await res.json();
    return <CachingDemoClient mode={mode} swrKey={SWR_KEY} serverData={serverData} />;
}
