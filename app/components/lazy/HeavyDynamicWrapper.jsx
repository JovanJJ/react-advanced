"use client";
import dynamic from "next/dynamic";
import React from "react";

const HeavyDynamic = dynamic(() => import("@/app/components/lazy/HeavyWidget"), {
  loading: () => <div className="text-sm text-gray-500">Loading dynamic module…</div>,
  ssr: false
});

export default function HeavyDynamicWrapper() {
  return <HeavyDynamic variant="dynamic" />;
}