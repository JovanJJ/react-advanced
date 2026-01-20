"use client";

import { useTransition } from "react";







export default function TabButton({ children, isActive, onClick }) {
  const [, startTransition] = useTransition();
  return (
    <button
      className={`${isActive ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-200"} rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-500 hover:text-white`
      }
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}>

      {children}
    </button>);

}
