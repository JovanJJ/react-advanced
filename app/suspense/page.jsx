import Link from "next/link";
import SuspenseServerExample from "../components/suspense/SuspenseServerExample";

export default function SuspensePage({
  searchParams


}) {
  const mode = searchParams?.mode === "without" ? "without" : "with";
  const tab = `suspense/${mode}`;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Suspense</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/suspense?mode=with"
          className={`${
          mode === "with" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-400 hover:text-white`
          }>
          
          1. With Suspense (server streaming)
        </Link>
        <Link
          href="/suspense?mode=without"
          className={`${
          mode === "without" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"} rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-400 hover:text-white`
          }>
          
          2. Without Suspense (no streaming)
        </Link>
      </div>

      <div className="rounded-lg bg-white p-6 shadow-md" style={{ contain: "content" }}>
        <SuspenseServerExample tab={tab} />
      </div>
    </div>);

}