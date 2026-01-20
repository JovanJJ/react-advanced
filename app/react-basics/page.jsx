"use client";

import { useState, useEffect, useRef } from "react";
import CodeBlock from "../components/CodeBlock";
import { BasicThemeProvider, useBasicTheme } from "../components/react-basics/BasicThemeContext";

function UseStateExample() {
    const [count, setCount] = useState(0);

    return (
        <div className="rounded-lg border border-gray-700 bg-[#2A2A2A] p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold text-gray-200">1. useState</h3>
            <p className="mb-4 text-gray-400">
                <code>useState</code>  useState is used to store and update data that changes over time and causes the component to re-render.
            </p>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => setCount(count - 1)}
                    className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-red-500"
                >
                    Decrement
                </button>
                <span className="text-2xl font-bold text-gray-100">{count}</span>
                <button
                    onClick={() => setCount(count + 1)}
                    className="rounded-lg bg-green-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-green-500"
                >
                    Increment
                </button>
            </div>

            <CodeBlock
                title="useState Example"
                code={`const [count, setCount] = useState(0);
// ...
<button onClick={() => setCount(count + 1)}>Increment</button>`}
            />
        </div>
    );
}

function UseEffectExample() {
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        // This runs after render
        const handleResize = () => setWindowWidth(window.innerWidth);

        // Set initial value
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup function (runs on unmount or before next effect)
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty dependency array = run once on mount

    return (
        <div className="rounded-lg border border-gray-700 bg-[#2A2A2A] p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold text-gray-200">2. useEffect</h3>
            <p className="mb-4 text-gray-400">
                <code>useEffect</code> useEffect is used to run code after a component renders, such as fetching data or reacting to state changes.
            </p>

            <div className="rounded bg-gray-800 p-4 text-gray-200">
                Window Width: <span className="font-bold text-blue-400">{windowWidth}px</span>
                <p className="mt-2 text-sm text-gray-500">(Resize your browser window to see this update)</p>
            </div>

            <CodeBlock
                title="useEffect Example"
                code={`useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);`}
            />
        </div>
    );
}

function UseRefExample() {
    const inputRef = useRef(null);

    const focusInput = () => {
        // Access the DOM node directly
        inputRef.current?.focus();
    };

    return (
        <div className="rounded-lg border border-gray-700 bg-[#2A2A2A] p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold text-gray-200">3. useRef</h3>
            <p className="mb-4 text-gray-400">
                <code>useRef</code> useRef is used to keep a value or access a DOM element without causing the component to re-render. It returns a mutable object with a .current property that persists between re-renders.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Focus me with the button..."
                    className="rounded border border-gray-600 bg-gray-800 px-4 py-2 text-gray-200 focus:border-blue-500 focus:outline-none"
                />
                <button
                    onClick={focusInput}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-500"
                >
                    Focus Input
                </button>
            </div>

            <CodeBlock
                title="useRef Example"
                code={`const inputRef = useRef(null);
// ...
<input ref={inputRef} />
<button onClick={() => inputRef.current.focus()}>Focus</button>`}
            />
        </div>
    );
}

function ThemeToggleComponent() {
    const { theme, toggleTheme } = useBasicTheme();

    return (
        <div
            className={`mt-4 rounded p-4 transition-colors ${theme === 'light' ? 'bg-gray-200 text-gray-800' : 'bg-gray-800 text-gray-100'
                }`}
        >
            <p className="mb-2 font-medium">Current local theme: {theme}</p>
            <button
                onClick={toggleTheme}
                className="rounded border border-gray-500 px-3 py-1 text-sm hover:bg-opacity-80"
            >
                Toggle Local Theme
            </button>
        </div>
    );
}

function UseContextExample() {
    return (
        <div className="rounded-lg border border-gray-700 bg-[#2A2A2A] p-6 shadow-md">
            <h3 className="mb-2 text-xl font-semibold text-gray-200">4. useContext</h3>
            <p className="mb-4 text-gray-400">
                <code>useContext</code> useContext is used to access data from a React context anywhere in your component without passing props manually.
            </p>

            {/* Provider wraps the part of the tree that needs access */}
            <BasicThemeProvider>
                <ThemeToggleComponent />
            </BasicThemeProvider>

            <CodeBlock
                title="useContext Example"
                code={`// 1. Create Context
const ThemeContext = createContext(null);

// 2. Consume Context
const { theme } = useContext(ThemeContext);`}
            />
        </div>
    );
}

export default function ReactBasicsPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="mb-2 text-3xl font-bold text-gray-100">React Basics</h1>
                <p className="text-gray-400">
                    Essential hooks that every React developer uses daily.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <UseStateExample />
                <UseEffectExample />
                <UseRefExample />
                <UseContextExample />
            </div>
        </div>
    );
}
