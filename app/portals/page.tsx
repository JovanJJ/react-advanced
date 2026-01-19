import PortalDemo from "../components/portals/PortalDemo";
import CodeBlock from "../components/CodeBlock";

const portalSample = `function usePortal(id = "portal-root") {
  // ...creates or finds a DOM node
}

function ModalWithPortal({ open, onClose, children }) {
  const portalRoot = usePortal();
  if (!open) return null;
  return ReactDOM.createPortal(
    <div>...</div>,
    portalRoot
  );
}`;

const noPortalSample = `function ModalNoPortal({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div>...</div>
  );
}`;

export default function PortalsPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">Portals</h1>
      <p className="mb-6 max-w-prose text-gray-600 text-sm">
        Compare rendering a modal with and without <code>usePortal</code> (ReactDOM.createPortal).
        Portals let you render children outside the parent DOM hierarchy, useful for modals, tooltips, etc.
      </p>
      <div className="rounded-lg bg-white p-6 shadow mb-6" style={{contain:'content'}}>
        <PortalDemo />
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <CodeBlock title="With usePortal" code={portalSample} />
        <CodeBlock title="Without usePortal" code={noPortalSample} />
      </div>
    </div>
  );
}
