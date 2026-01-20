import Link from "next/link";
import CachingDemoServer from "../components/caching/CachingDemoServer";

export default async function CachingPage({
  searchParams


}) {


  const mode = searchParams?.mode ?? "swr";

  const Tab = ({ m, children }) => {
    const active = mode === m;
    return (
      <Link
        href={`/caching?mode=${m}`}
        className={`rounded-md px-3 py-1.5 text-sm ${active ? "bg-gray-900 text-white" : "bg-gray-700 text-gray-100 hover:bg-gray-300"}`
        }>
        
                {children}
            </Link>);

  };

  return (
    <div className="space-y-6">
            <div>
                <h1 className="mb-2 text-3xl font-bold">Caching</h1>
                <p className="text-gray-400">
                    Posts contrasted without caching, with SWR client caching, and server cached (Next.js fetch cache).
                </p>
            </div>

            <div className="flex gap-2">
                <Tab m="without">1. Without caching</Tab>
                <Tab m="swr">2. With SWR caching</Tab>
                <Tab m="cached">3. Cached (no SWR)</Tab>
            </div>

            <div className="rounded-lg bg-[#2A2A2A] p-6 shadow-md" style={{ contain: "content" }}>
                <CachingDemoServer mode={mode} />
            </div>
        </div>);

}
