"use client";

import React, { Profiler, memo, useCallback, useEffect, useMemo, useRef, useState } from "react";













const initialStats = { commitCount: 0, totalActualTime: 0, lastActualTime: 0 };

const StatsPanel = ({ statsRef }) => {
  const [view, setView] = useState(statsRef.current);
  const lastSeen = useRef(statsRef.current);
  useEffect(() => {
    const id = setInterval(() => {
      const cur = statsRef.current;
      // Only update when something actually changed
      if (
      cur.commitCount !== lastSeen.current.commitCount ||
      cur.totalActualTime !== lastSeen.current.totalActualTime ||
      cur.lastActualTime !== lastSeen.current.lastActualTime)
      {
        lastSeen.current = cur;
        setView({ ...cur });
      }
    }, 250);
    return () => clearInterval(id);
  }, [statsRef]);
  return (
    <div className="mt-4 grid grid-cols-3 gap-3 text-sm">
            <div className="rounded bg-gray-100 p-3">
                <div className="text-gray-400">Commits</div>
                <div className="text-xl font-semibold text-gray-200">{view.commitCount}</div>
            </div>
            <div className="rounded bg-gray-100 p-3">
                <div className="text-gray-400">Total render time (ms)</div>
                <div className="text-xl font-semibold text-gray-200">{view.totalActualTime.toFixed(1)}</div>
            </div>
            <div className="rounded bg-gray-100 p-3">
                <div className="text-gray-400">Last render (ms)</div>
                <div className="text-xl font-semibold text-gray-200">{view.lastActualTime.toFixed(1)}</div>
            </div>
            <div className="col-span-3">
                <button
          className="rounded bg-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-300"
          onClick={() => {statsRef.current = initialStats;lastSeen.current = initialStats;setView(initialStats);}}>
          
                    Reset profiler stats
                </button>
            </div>
        </div>);

};

const CodeBlock = ({ title, code }) => {
  const copy = async () => {
    try {await navigator.clipboard.writeText(code);} catch {}
  };
  return (
    <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
                <button onClick={copy} className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-300 hover:bg-gray-300">Copy</button>
            </div>
            <pre className="overflow-auto rounded-md bg-gray-900 p-4 text-xs text-gray-100"><code>{code}</code></pre>
        </div>);

};

// Small synthetic CPU work to make differences show up.
// Note: This runs INSIDE the profiled child, so Profiler measures it.
function expensiveCalc(x) {
  let acc = 0;
  for (let i = 0; i < 200000; i++) {
    acc = (acc * 31 + (x + i) % 97) % 1000003;
  }
  return acc;
}

// Child subtree being profiled. Changing `n` forces a re-render in both modes.
// In "with" mode, unrelated parent updates (Ping) should NOT re-render this child.
const DisplayRaw = ({ n, mode }) => {
  // Local child state: updating this re-renders ONLY the child
  const [pings, setPings] = useState(0);
  const [, force] = useState(0);
  const memoCount = useRef(0);
  const directCount = useRef(0);

  // Memoized compute runs only when `n` changes; we log via ref and flush after render
  const memoizedValue = useMemo(() => {
    if (mode === "with") {
      memoCount.current += 1;
      // eslint-disable-next-line no-console
      console.log(`[memo] compute for n=${n}`);
    }
    return expensiveCalc(n);
  }, [n, mode]);

  // Direct compute path logs on every render of the child in WITHOUT mode
  let directValue = null;
  if (mode !== "with") {
    directCount.current += 1;
    // eslint-disable-next-line no-console
    console.log(`[direct] compute for n=${n}${pings ? ` (ping ${pings})` : ""}`);
    directValue = expensiveCalc(n);
  }

  const value = mode === "with" ? memoizedValue : directValue;

  return (
    <div className="rounded border border-gray-700 p-4">
            <div className="mb-2 text-gray-100">Computed value: <span className="font-semibold">{value}</span></div>
            <div className="mb-1 text-sm text-gray-300">Child pings: {pings}</div>
            <div className="mb-3 text-xs text-gray-400">Counts — memo: {memoCount.current}, direct: {directCount.current}</div>
            <button className="rounded bg-gray-700 px-3 py-1 text-sm text-gray-200 hover:bg-gray-300" onClick={() => setPings((c) => c + 1)}>
                Update child (Ping)
            </button>
            <button
        className="ml-2 rounded bg-gray-700 px-3 py-1 text-sm text-gray-200 hover:bg-gray-300"
        onClick={() => {memoCount.current = 0;directCount.current = 0;force((v) => v + 1);}}>
        
                Reset counters
            </button>
        </div>);

};

const DisplayMemo = memo(DisplayRaw);

export default function ProfilerSimple({ tab }) {
  const [, sub = "without"] = tab.split("/");
  const mode = sub === "with" ? "with" : "without";

  const [n, setN] = useState(25);
  const [unrelated, setUnrelated] = useState(0);
  const statsRef = useRef(initialStats);


  const onRender = useCallback((id, phase, actualDuration) => {
    const s = statsRef.current;
    statsRef.current = {
      commitCount: s.commitCount + 1,
      totalActualTime: s.totalActualTime + actualDuration,
      lastActualTime: actualDuration
    };
  }, []);

  const Display = mode === "with" ? DisplayMemo : DisplayRaw;

  return (
    <div>
            {/* What this demo shows */}
            <div className="mb-4 rounded-md border border-blue-800 bg-blue-900 p-4 text-sm text-blue-100">
                <div className="mb-2 font-semibold">What this measures</div>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        The Profiler reports time React spent rendering the child subtree (not layout/paint).
                    </li>
                    <li>
                        Changing <code>n</code> makes the child recompute in both modes, so Last render grows in both.
                    </li>
                    <li>
                        The optimization prevents re-renders on unrelated parent updates: in &quot;`with&quot;, clicking Ping shouldn&apos;t change the child&apos;s metrics.
                    </li>
                </ul>
            </div>

            {/* Parent controls (this component) */}
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Parent: controls & profiler wrapper</div>
            <div className="mb-4 flex flex-wrap items-center gap-3">
                <label className="text-sm text-gray-300">Input (n)</label>
                <input
          type="range"
          min={1}
          max={100}
          value={n}
          onChange={(e) => setN(Number(e.target.value))} />
        
                <span className="text-sm text-gray-200">{n}</span>
                <button
          className="rounded bg-gray-700 px-3 py-2 text-sm text-gray-200 hover:bg-gray-300"
          onClick={() => setUnrelated((x) => x + 1)}>
          
                    Re-render parent (unrelated) — {unrelated}
                </button>

            </div>

            <div className="mb-2 text-sm text-gray-400">
                Mode: <span className="font-medium text-gray-200">{mode === "with" ? "With memo + useMemo + useCallback" : "Without optimizations"}</span>
            </div>

            {/* Child (profiled) */}
            <div className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">Child: profiled subtree</div>
            {/* Wrap only the child so the Profiler measures the child subtree's render time.
        - Changing n: child re-renders in BOTH modes (work is necessary).
        - Re-render parent: child only re-renders in WITHOUT mode; WITH mode skips thanks to React.memo.
        - Update child (Ping): always re-renders the child (it's local state), regardless of memo. */}
            <Profiler id={`simple-${mode}`} onRender={onRender}>
                <Display n={n} mode={mode} />
            </Profiler>

            <StatsPanel statsRef={statsRef} />

            {/* Code examples to clarify parent vs child */}
            <div className="mt-8">
                <CodeBlock
          title="Parent (ProfilerSimple): controls + Profiler wrapper"
          code={[
          'function ProfilerSimple() {',
          '  const [n, setN] = useState(25);',
          '  const [unrelated, setUnrelated] = useState(0);',
          '  const statsRef = useRef({ commitCount: 0, totalActualTime: 0, lastActualTime: 0 });',
          '  const onRender = useCallback((id, phase, actualDuration) => {',
          '    const s = statsRef.current;',
          '    statsRef.current = {',
          '      commitCount: s.commitCount + 1,',
          '      totalActualTime: s.totalActualTime + actualDuration,',
          '      lastActualTime: actualDuration,',
          '    };',
          '  }, []);',
          '',
          '  return (',
          '    <>',
          '      {/* Parent controls (unrelated update) */}',
          '      <input type="range" min={1} max={100} value={n} onChange={(e) => setN(+e.target.value)} />',
          '      <button onClick={() => setUnrelated((x) => x + 1)}>Re-render parent</button>',
          '',
          '      {/* Child subtree is profiled */}',
          '      <Profiler id="simple" onRender={onRender}>',
          '        <Display n={n} />',
          '      </Profiler>',
          '      <StatsPanel statsRef={statsRef} />',
          '    </>',
          '  );',
          '}'].
          join('\n')} />
        
                <CodeBlock
          title="Child (Display): heavy compute lives here"
          code={[
          'function Display({ n }: { n: number }) {',
          '  const [pings, setPings] = useState(0); // child-local state',
          '  const memoizedValue = useMemo(() => expensiveCalc(n), [n]);',
          '  const value = mode === "with" ? memoizedValue : expensiveCalc(n);',
          '',
          '  return (',
          '    <div>',
          '      <div>Computed value: {value}</div>',
          '      <div>Child pings: {pings}</div>',
          '      <button onClick={() => setPings(c => c + 1)}>Update child (Ping)</button>',
          '    </div>',
          '  );',
          '}',
          '',
          '// Optimized version used when mode === "with"',
          'const Display = React.memo(Display);'].
          join('\n')} />
        
            </div>
        </div>);

}
