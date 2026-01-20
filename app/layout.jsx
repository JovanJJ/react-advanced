
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata = {
  title: "Advanced React Examples",
  description: "Advanced React Examples"
};

export default function RootLayout({
  children


}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex h-full bg-[#1F1F1F] text-gray-100">
          <aside className="w-72 flex-shrink-0 bg-[#2A2A2A] p-6 shadow-md border-r border-gray-700 ">
            <h1 className="mb-6 text-2xl font-bold text-gray-100">
              React Learning
            </h1>
            <nav className=" overflow-y-auto">
              <ul className="space-y-3">
                <li>
                  <Link href="/react-basics" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    1. React Basics (Hooks)
                  </Link>
                </li>
                <li>
                  <Link href="/profiler" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    2. Profiler: useCallback, useMemo, React.memo
                  </Link>
                </li>
                <li>
                  <Link href="/suspense" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    3. Suspense (data fetching)
                  </Link>
                </li>
                <li>
                  <Link href="/lazy" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    4. Lazy Loading (react.lazy & dynamic)
                  </Link>
                </li>
                <li>
                  <Link href="/optimistic" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    5. useOptimistic
                  </Link>
                </li>
                <li>
                  <Link href="/deferred" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    6. useDeferredValue Hook
                  </Link>
                </li>
                <li>
                  <Link href="/transition" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    7. useTransition Hook
                  </Link>
                </li>

                <li>
                  <Link href="/caching" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    8. Caching (data fetching)
                  </Link>
                </li>

                <li>
                  <Link href="/websocket" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    9. WebSocket (useWebsocket)
                  </Link>
                </li>

                <li>
                  <Link href="/action-state" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    10. useActionState
                  </Link>
                </li>
                <li>
                  <Link href="/portals" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    11. Portals
                  </Link>
                </li>
                <li>
                  <Link href="/compound" className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-colors hover:bg-[#333333] hover:text-white">
                    12. Compound Components
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>
          <main className="flex-1 overflow-y-auto p-8">{children}</main>
        </div>
      </body>
    </html>);

}
