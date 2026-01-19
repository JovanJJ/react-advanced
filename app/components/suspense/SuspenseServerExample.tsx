import { Suspense } from "react";
import CodeBlock from "../CodeBlock";

type Mode = "without" | "with";

interface Props {
    tab: string; // "suspense/without" | "suspense/with"
}

function delay(ms: number) {
    return new Promise((res) => setTimeout(res, ms));
}

async function DataBlock() {
    await delay(1500);
    return (
        <div className="rounded border border-gray-200 bg-white p-4 text-gray-800">
            <div className="text-lg font-semibold">Data loaded (server)</div>
            <div className="mt-1 text-sm text-gray-600">Matches fallback layout to minimize CLS.</div>
        </div>
    );
}

function PlaceholderBlock() {
    return (
        <div className="rounded border border-gray-200 bg-white p-4 text-gray-800">
            <div className="text-lg font-semibold opacity-60">Data loading…</div>
            <div className="mt-1 min-h-6 text-sm text-gray-600 opacity-50">Default text with lower opacity to reduce layout shift.</div>
        </div>
    );
}

export default function SuspenseServerExample({ tab }: Props) {
    const [, sub = "without"] = tab.split("/");
    const mode: Mode = sub === "with" ? "with" : "without";

    return (
        <div className="space-y-4">
            <div className="rounded-md border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                <div className="font-semibold">Server-side Suspense</div>
                <ul className="list-disc space-y-1 pl-5">
                    <li>
                        <strong>With Suspense</strong>: the page starts streaming immediately and this block arrives later.
                    </li>
                    <li>
                        <strong>Without Suspense</strong>: the server waits before rendering this block (no streaming for this part).
                    </li>
                    <li>
                        The fallback matches the final block’s layout and uses lower opacity to lower CLS.
                    </li>
                </ul>
            </div>

            {mode === "with" ? (
                <Suspense fallback={<PlaceholderBlock />}>
                    <DataBlock />
                </Suspense>
            ) : (
                <DataBlock />
            )}

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
                                '}',
                            ].join('\n')}
                        />
                        <CodeBlock
                            title="Async server child (streams when awaited)"
                            code={[
                                'async function DataBlock() {',
                                '  await new Promise(r => setTimeout(r, 1500));',
                                '  return (',
                                '    <div className="rounded border p-4">',
                                '      <div className="text-lg font-semibold">Data loaded (server)</div>',
                                '      <div className="mt-1 text-sm text-gray-600">Matches fallback layout to lower CLS.</div>',
                                '    </div>',
                                '  );',
                                '}',
                            ].join('\n')}
                        />
                    </div>
        </div>
    );
}
