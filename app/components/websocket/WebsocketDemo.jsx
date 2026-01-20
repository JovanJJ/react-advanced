"use client";
import { useState, useEffect, useRef } from "react";
import { useWebsocket } from "../../lib/hooks/useWebsocket";

export default function WebsocketDemo() {
  // Public echo server. Reliable and CORS-friendly.
  const url = "wss://echo.websocket.org";
  const { sendMessage, messages, error } = useWebsocket(url);
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    // auto-scroll to bottom when new message arrives
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="space-y-4 text-sm">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage(input.trim());
          setInput("");
        }}
        className="flex gap-2">
        
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type message..."
          className="flex-1 rounded border bg-white text-gray-900 placeholder-gray-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500" />
        
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-500 disabled:opacity-50"
          disabled={!input.trim()}>
          
          Send
        </button>
      </form>
      <div className="text-[11px] text-gray-500">Connected to: {url}</div>
      {error && <div className="text-xs text-red-600">Error: {error.message}</div>}
      <div
        ref={listRef}
        className="h-56 overflow-auto rounded border bg-gray-50 p-2 text-[12px] leading-relaxed text-gray-800">
        
        {messages.length === 0 &&
        <div className="text-gray-400">No messages yet. Send one!</div>
        }
        {messages.map((m, i) =>
        <div key={i} className="mb-1 whitespace-pre-wrap break-words text-gray-900">
            <span className="font-mono text-[10px] text-gray-400 mr-1">{i + 1}.</span>
            {m}
          </div>
        )}
      </div>
    </div>);

}