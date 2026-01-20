"use client";
import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";


export default function HeavyWidget({ variant }) {
  const canvasRef = useRef(null);
  const chartRef = useRef(null);
  const [points, setPoints] = useState(25);
  const [seed, setSeed] = useState(0);

  // Generate synthetic dataset
  function genData() {
    const labels = [];
    const data = [];
    for (let i = 0; i < points; i++) {
      labels.push(String(i + 1));
      // vary with seed so rerender shows change
      data.push(Math.sin((i + seed) / 3) * 20 + 50 + Math.random() * 5);
    }
    return { labels, data };
  }

  useEffect(() => {
    if (!canvasRef.current) return;
    const { labels, data } = genData();
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(canvasRef.current, {
      type: "line",

      data: {
        labels,
        datasets: [
        {
          label: "Synthetic Series",
          data,
          tension: 0.35,
          fill: false,
          borderColor: variant === "lazy" ? "#2563eb" : "#dc2626",
          backgroundColor: variant === "lazy" ? "#2563eb" : "#dc2626",
          pointRadius: 2
        }]

      },
      options: {
        responsive: false,
        animation: { duration: 350 },
        plugins: { legend: { display: false } },
        scales: { y: { ticks: { color: "#555" } }, x: { ticks: { color: "#555" } } }
      }
    });
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, seed, variant]);

  return (
    <div className="space-y-2 text-[13px]">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-sm">HeavyWidget ({variant})</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPoints((n) => Math.min(200, n + 25))}
            className="rounded bg-gray-900 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-gray-800">
            
            Add points
          </button>
          <button
            onClick={() => setSeed((s) => s + 1)}
            className="rounded bg-blue-600 px-2.5 py-1 text-[11px] font-medium text-white hover:bg-blue-600">
            
            New data
          </button>
        </div>
      </div>
      <p className="text-[11px] leading-snug text-gray-500 max-w-prose">
        Imports <code>chart.js</code> to add bundle weight. Use <code>Add points</code> to grow series, <code>New data</code> to regenerate.
      </p>
      <div className="rounded border bg-[#2A2A2A] p-2">
        <canvas ref={canvasRef} className="" style={{ height: '100px' }} />
      </div>
      <div className="text-[10px] text-gray-400">pts={points} seed={seed}</div>
    </div>);

}
