import { Suspense } from "react";
import CodeBlock from "../CodeBlock";







function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function DataBlock() {
  await delay(1500);
  return (
    <div className="rounded border border-gray-700 bg-[#2A2A2A] p-4 text-gray-200">
      <div className="text-lg font-semibold">Data loaded (server)</div>
      <div className="mt-1 text-sm text-gray-400">Matches fallback layout to minimize CLS.</div>
    </div>);

}

function PlaceholderBlock() {
  return (
    <div className="rounded border border-gray-700 bg-[#2A2A2A] p-4 text-gray-200">
      <div className="text-lg font-semibold opacity-60">Data loading…</div>
      <div className="mt-1 min-h-6 text-sm text-gray-400 opacity-50">Default text with lower opacity to reduce layout shift.</div>
    </div>);

}

export default function SuspenseServerExample({ tab }) {
  const [, sub = "without"] = tab.split("/");
  const mode = sub === "with" ? "with" : "without";

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-blue-800 bg-blue-900 p-3 text-sm text-blue-100">
        <div className="font-semibold">Server-Side Suspense allows React to wait for data fetching on the server before sending the HTML to the client, so the page can render fully or partially with a loading fallback.</div>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>With Suspense</strong>: React can render part of the page while waiting for some components or data, then replace the fallback with the real content.
          </li>
          <li>
            <strong>Without Suspense</strong>: The server must wait for all data before rendering anything, which can make the page load slower.
          </li>
          <li>
            The fallback matches the final block’s layout and uses lower opacity to lower CLS.
          </li>
        </ul>
      </div>

      {mode === "with" ?
        <Suspense fallback={<PlaceholderBlock />}>
          <DataBlock />
        </Suspense> :

        <DataBlock />
      }

      <div className="mt-6">
        <CodeBlock
          title="Parent (server page) with Suspense boundary + size-matched fallback"
          code={[
            'import { Suspense } from "react";',
            '',
            'function PlaceholderBlock() {',
            '  return (',
            '    <div className="rounded border p-4">',
            '      <div className="text-lg font-semibold opacity-60">Data loading…</div>',
            '      <div className="mt-1 min-h-6 text-sm opacity-50">Default text to reduce CLS.</div>',
            '    </div>',
            '  );',
            '}',
            '',
            'export default function Page() {',
            '  return (',
            '    <Suspense fallback={<PlaceholderBlock />}>',
            '      <DataBlock />',
            '    </Suspense>',
            '  );',
            '}'].
            join('\n')} />

        <CodeBlock
          title="Async server child (streams when awaited)"
          code={[
            'async function DataBlock() {',
            '  await new Promise(r => setTimeout(r, 1500));',
            '  return (',
            '    <div className="rounded border p-4">',
            '      <div className="text-lg font-semibold">Data loaded (server)</div>',
            '      <div className="mt-1 text-sm text-gray-400">Matches fallback layout to lower CLS.</div>',
            '    </div>',
            '  );',
            '}'].
            join('\n')} />

      </div>
    </div>);

}
