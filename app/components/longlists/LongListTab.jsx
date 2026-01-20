"use client";


import { Virtuoso } from "react-virtuoso";
import ListItem from "./ListItem";








const ITEM_COUNT = 30000;

const headings = {
  without: "1. Blocking UI (Slow Render)",
  with: "2. Non-Blocking UI (with useTransition)",
  virtualized: "3. Virtualized List (Fast Render)"
};

const descriptions = {
  without:
  `Renders ${ITEM_COUNT.toLocaleString()} items directly. The UI may freeze because the main thread is busy during rendering.`,
  with:
  `Uses useTransition to avoid blocking urgent interactions. The app stays responsive, but still renders all ${ITEM_COUNT.toLocaleString()} DOM nodes.`,
  virtualized:
  `Uses react-virtuoso to render only visible items, making it fast and memory-efficient.`
};


// Simple heavy list (no memo)
const HeavyList = function HeavyList({ items }) {
  return (
    <div className="max-h-96 overflow-y-auto">
            {items.map((item) =>
      <ListItem key={item.id} item={item} />
      )}
        </div>);

};



const LongListTab = ({ mode, items }) => {
  return (
    <div>
            <h2 className="mb-4 text-2xl font-semibold text-gray-300">{headings[mode]}</h2>
            <p className="mb-4 text-gray-400">{descriptions[mode]}</p>


            {mode === "virtualized" ?
      <Virtuoso
        style={{ height: 400 }}
        totalCount={items.length}
        itemContent={(index) => <ListItem item={items[index]} />} /> :


      <HeavyList items={items} />
      }

            {/* <CodeBlock code={codeSamples[mode]} /> */}
        </div>);

};

export default LongListTab;
