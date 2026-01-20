import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-200">React Examples</h1>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <li className="group">
          <Link href="/react-basics" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">React Basics</div>
            <div className="text-sm text-gray-400">Essential hooks: useState, useEffect, useRef, useContext.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/deferred" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">useDeferredValue</div>
            <div className="text-sm text-gray-400">Keep input responsive while heavy updates lag behind.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/transition" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">useTransition</div>
            <div className="text-sm text-gray-400">Defer non-urgent updates like large list renders.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/profiler" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Profiler</div>
            <div className="text-sm text-gray-400">Measure renders and see the impact of memoization.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/suspense" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Suspense</div>
            <div className="text-sm text-gray-400">Show fallbacks during async work with boundaries.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/caching" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Caching</div>
            <div className="text-sm text-gray-400">Compare no-store, SWR stale-while-revalidate, and server fetch cache.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/lazy" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Lazy Loading</div>
            <div className="text-sm text-gray-400">react.lazy & dynamic() to split heavy code paths.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/websocket" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">WebSocket</div>
            <div className="text-sm text-gray-400">Real-time echo using custom hook.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/optimistic" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">useOptimistic</div>
            <div className="text-sm text-gray-400">Instant UI updates before server confirmation.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/action-state" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">useActionState</div>
            <div className="text-sm text-gray-400">Form state & errors via server actions.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/portals" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Portals</div>
            <div className="text-sm text-gray-400">Render modals/tooltips outside parent DOM hierarchy.</div>
          </Link>
        </li>
        <li className="group">
          <Link href="/compound" className="border border-gray-700 block rounded-lg bg-[#2A2A2A] p-6 shadow hover:shadow-md transition-all group-hover:scale-105">
            <div className="text-lg font-semibold text-gray-200">Compound Components</div>
            <div className="text-sm text-gray-400">Flexible UI primitives (Tabs, etc) with declarative APIs.</div>
          </Link>
        </li>
      </ul>
      {null}
    </div>);

}
