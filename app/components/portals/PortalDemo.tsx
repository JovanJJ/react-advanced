"use client";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";

function usePortal(id: string = "portal-root") {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    let el = document.getElementById(id);
    if (!el) {
      el = document.createElement("div");
      el.id = id;
      document.body.appendChild(el);
    }
    setContainer(el);
  }, [id]);
  return container;
}

function ModalWithPortal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  const portalRoot = usePortal();
  if (!open || !portalRoot) return null;
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] text-black">
        {children}
        <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white" onClick={onClose}>Close</button>
      </div>
    </div>,
    portalRoot
  );
}

function ModalNoPortal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded shadow-lg p-6 min-w-[300px] text-black">
        {children}
        <button className="mt-4 px-4 py-2 rounded bg-blue-600 text-white" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default function PortalDemo() {
  const [openPortal, setOpenPortal] = useState(false);
  const [openNoPortal, setOpenNoPortal] = useState(false);
  return (
    <div className="space-y-6">
      <div>
        <button className="px-4 py-2 rounded bg-blue-600 text-white mr-2" onClick={() => setOpenPortal(true)}>
          Open Modal (usePortal)
        </button>
        <button className="px-4 py-2 rounded bg-gray-600 text-white" onClick={() => setOpenNoPortal(true)}>
          Open Modal (no portal)
        </button>
      </div>
      <ModalWithPortal open={openPortal} onClose={() => setOpenPortal(false)}>
        <div className="text-lg font-semibold">This modal uses a Portal!</div>
      </ModalWithPortal>
      <ModalNoPortal open={openNoPortal} onClose={() => setOpenNoPortal(false)}>
        <div className="text-lg font-semibold">This modal does NOT use a Portal.</div>
      </ModalNoPortal>
    </div>
  );
}
