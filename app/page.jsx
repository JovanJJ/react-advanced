import Link from "next/link";

export default function Home() {
  return (
    <div className="p-8">
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Advanced React Examples</h1>
      <p className="mb-6 text-gray-600">Pick a section from the sidebar to get started:</p>
      <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <li>
          <Link href="/deferred" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">useDeferredValue</div>
            <div className="text-sm text-gray-600">Keep input responsive while heavy updates lag behind.</div>
          </Link>
        </li>
        <li>
          <Link href="/transition" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">useTransition</div>
            <div className="text-sm text-gray-600">Defer non-urgent updates like large list renders.</div>
          </Link>
        </li>
        <li>
          <Link href="/profiler" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Profiler</div>
            <div className="text-sm text-gray-600">Measure renders and see the impact of memoization.</div>
          </Link>
        </li>
        <li>
          <Link href="/suspense" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Suspense</div>
            <div className="text-sm text-gray-600">Show fallbacks during async work with boundaries.</div>
          </Link>
        </li>
        <li>
          <Link href="/caching" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Caching</div>
            <div className="text-sm text-gray-600">Compare no-store, SWR stale-while-revalidate, and server fetch cache.</div>
          </Link>
        </li>
        <li>
          <Link href="/lazy" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Lazy Loading</div>
            <div className="text-sm text-gray-600">react.lazy & dynamic() to split heavy code paths.</div>
          </Link>
        </li>
        <li>
          <Link href="/websocket" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">WebSocket</div>
            <div className="text-sm text-gray-600">Real-time echo using custom hook.</div>
          </Link>
        </li>
        <li>
          <Link href="/optimistic" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">useOptimistic</div>
            <div className="text-sm text-gray-600">Instant UI updates before server confirmation.</div>
          </Link>
        </li>
        <li>
          <Link href="/action-state" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">useActionState</div>
            <div className="text-sm text-gray-600">Form state & errors via server actions.</div>
          </Link>
        </li>
        <li>
          <Link href="/portals" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Portals</div>
            <div className="text-sm text-gray-600">Render modals/tooltips outside parent DOM hierarchy.</div>
          </Link>
        </li>
        <li>
          <Link href="/compound" className="block rounded-lg bg-white p-6 shadow hover:shadow-md">
            <div className="text-lg font-semibold text-gray-800">Compound Components</div>
            <div className="text-sm text-gray-600">Flexible UI primitives (Tabs, etc) with declarative APIs.</div>
          </Link>
        </li>
      </ul>
  {null}
    </div>);

}