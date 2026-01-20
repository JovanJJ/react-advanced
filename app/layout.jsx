'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export default function RootLayout({
  children
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>React Examples</title>
        <meta name="description" content="Advanced React Examples" />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="flex flex-col md:flex-row h-screen bg-[#1F1F1F] text-gray-100">

          <button
            onClick={toggleSidebar}
            className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#2A2A2A] rounded-lg border border-gray-700 hover:bg-[#333333] transition-colors"
            aria-label="Toggle menu">
            <svg
              className="w-6 h-6 text-gray-100"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor">
              {isSidebarOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>


          {isSidebarOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
              onClick={closeSidebar}
            />
          )}


          <aside className={`
            w-72 flex-shrink-0 bg-[#2A2A2A] p-6 shadow-md border-r border-gray-700 overflow-y-auto
            fixed md:relative inset-y-0 left-0 z-40
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <h1 className="mb-6 text-2xl font-bold text-gray-100 mt-12 md:mt-0">
              <Link href="/">React Learning</Link>
            </h1>
            <nav>
              <ul className="space-y-3">
                <li className="group">
                  <Link
                    href="/react-basics"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    1. React Basics (Hooks)
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/profiler"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    2. Profiler: useCallback, useMemo, React.memo
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/suspense"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    3. Suspense (data fetching)
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/lazy"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    4. Lazy Loading (react.lazy & dynamic)
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/optimistic"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    5. useOptimistic
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/deferred"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    6. useDeferredValue Hook
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/transition"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    7. useTransition Hook
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/caching"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    8. Caching (data fetching)
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/websocket"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    9. WebSocket (useWebsocket)
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/action-state"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    10. useActionState
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/portals"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    11. Portals
                  </Link>
                </li>
                <li className="group">
                  <Link
                    href="/compound"
                    className="border border-gray-700 block rounded-lg px-4 py-2 text-lg text-gray-300 transition-all hover:bg-[#333333] hover:text-white group-hover:scale-105"
                    onClick={closeSidebar}>
                    12. Compound Components
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-16 md:pt-8">
            {children}
          </main>
        </div>
      </body>
    </html>);
}
