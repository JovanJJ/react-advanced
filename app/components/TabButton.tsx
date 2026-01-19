"use client";

import { useTransition } from "react";

type Props = {
  children: React.ReactNode;
  isActive: boolean;
  onClick: () => void;
};

export default function TabButton({ children, isActive, onClick }: Props) {
  const [, startTransition] = useTransition();
  return (
    <button
      className={`${
        isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
      } rounded-lg px-4 py-2 font-semibold transition-colors hover:bg-blue-400 hover:text-white`}
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
    >
      {children}
    </button>
  );
}
