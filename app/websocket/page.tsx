"use client";
import WebsocketDemo from "../components/websocket/WebsocketDemo";

export default function WebsocketPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">WebSocket (useWebsocket)</h1>
      <p className="mb-6 max-w-prose text-gray-600 text-sm">
        Simple echo chat using the <code>useWebsocket</code> hook and a public echo server
        (wss://echo.websocket.org). Type a message and send to see the echoed
        response appear in the log.
      </p>
      <div className="rounded-lg bg-white p-6 shadow" style={{ contain: 'content' }}>
        <WebsocketDemo />
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1 mt-2">
          <h2 className="text-xl font-semibold mb-2 text-black">useWebsocket Hook Reference</h2>
          <pre className="bg-gray-100 text-black p-4 rounded text-xs overflow-x-auto">
            {`
import { useState } from "react";
import { useEffect, useRef } from "react";

type MessageEvent = {
  data: string;
};

type WebSocketHook = {
    sendMessage: (message: string) => void;
    messages: string[];
    error: Error | null;
};

export function useWebsocket(url: string): WebSocketHook {
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connected");
    };

    ws.onmessage = (event: MessageEvent) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    ws.onerror = (event) => {
      setError(new Error("WebSocket error"));
      console.error("WebSocket error", event);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message: string) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket is not open. Unable to send message.");
    }
  };

  return { sendMessage, messages, error };
}
              `}
          </pre>
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-2 text-black">Usage Example</h2>
          <pre className="bg-gray-100 text-black p-4 rounded text-xs overflow-x-auto">
            {`
import { useWebsocket } from "../lib/hooks/useWebsocket";

export default function WebsocketUsageExample() {
  const { sendMessage, messages, error } = useWebsocket("wss://echo.websocket.org");
  const [input, setInput] = useState("");

  return (
    <div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={() => sendMessage(input)}>Send</button>
      <div>
        <h3>Messages:</h3>
        <ul>
          {messages.map((msg, idx) => (
            <li key={idx}>{msg}</li>
          ))}
        </ul>
        {error && <div className="text-red-500">Error: {error.message}</div>}
      </div>
    </div>
  );
}
`}
          </pre>
        </div>
      </div>
    </div>
  );
}
