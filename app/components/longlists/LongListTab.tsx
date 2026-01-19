"use client";

import { FC } from "react";
import { Virtuoso } from "react-virtuoso";
import ListItem from "./ListItem";

type Mode = "without" | "with" | "virtualized";

interface LongListTabProps {
    mode: Mode;
    items: ReadonlyArray<{ id: number; name: string }>;
}

const ITEM_COUNT = 30000;

const headings: Record<Mode, string> = {
    without: "1. Blocking UI (Slow Render)",
    with: "2. Non-Blocking UI (with useTransition)",
    virtualized: "3. Virtualized List (Fast Render)",
};

const descriptions: Record<Mode, string> = {
    without:
        `Renders ${ITEM_COUNT.toLocaleString()} items directly. The UI may freeze because the main thread is busy during rendering.`,
    with:
        `Uses useTransition to avoid blocking urgent interactions. The app stays responsive, but still renders all ${ITEM_COUNT.toLocaleString()} DOM nodes.`,
    virtualized:
        `Uses react-virtuoso to render only visible items, making it fast and memory-efficient.`,
};


// Simple heavy list (no memo)
const HeavyList = function HeavyList({ items }: { items: ReadonlyArray<{ id: number; name: string }> }) {
    return (
        <div className="max-h-96 overflow-y-auto">
            {items.map((item) => (
                <ListItem key={item.id} item={item} />
            ))}
        </div>
    );
};



const LongListTab: FC<LongListTabProps> = ({ mode, items }) => {
    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-700">{headings[mode]}</h2>
            <p className="mb-4 text-gray-600">{descriptions[mode]}</p>


            {mode === "virtualized" ? (
                <Virtuoso
                    style={{ height: 400 }}
                    totalCount={items.length}
                    itemContent={(index: number) => <ListItem item={items[index]} />}
                />
            ) : (
                <HeavyList items={items} />
            )}

            {/* <CodeBlock code={codeSamples[mode]} /> */}
        </div>
    );
};

export default LongListTab;
