import { useState } from "react";
import { useEffect, useRef } from "react";
export function useWebsocket(url) {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  const wsRef = useRef(null);
  useEffect(() => {
    const ws = new WebSocket(url);
    wsRef.current = ws;
    ws.onopen = () => {
      console.log("WebSocket connected");
    };
    ws.onmessage = (event) => {
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
  const sendMessage = (message) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(message);
    } else {
      console.warn("WebSocket is not open. Unable to send message.");
    }
  };
  return {
    sendMessage,
    messages,
    error
  };
}
