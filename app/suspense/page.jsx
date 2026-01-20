import Link from "next/link";
import SuspenseServerExample from "../components/suspense/SuspenseServerExample";

export default async function SuspensePage({
  searchParams,
}) {
  const resolvedParams = await searchParams;
  const mode = resolvedParams?.mode === "without" ? "without" : "with";
  const tab = `suspense/${mode}`;

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-gray-200">Suspense</h1>
      <div className="mb-6 flex flex-wrap gap-3">
        <Link
          href="/suspense?mode=with"
          className={`${mode === "with" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"} rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-500 hover:text-white`
          }>

          1. With Suspense (server streaming)
        </Link>
        <Link
          href="/suspense?mode=without"
          className={`${mode === "without" ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"} rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-500 hover:text-white`
          }>

          2. Without Suspense (no streaming)
        </Link>
      </div>

      <div className="rounded-lg bg-[#2A2A2A] p-6 shadow-md" style={{ contain: "content" }}>
        <SuspenseServerExample tab={tab} />
      </div>
    </div>);

}
