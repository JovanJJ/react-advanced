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