import OptimisticComments from "../components/optimistic/OptimisticComments";

export default function OptimisticPage() {
  return (
    <div>
      <h1 className="mb-4 text-3xl font-bold text-gray-800">useOptimistic</h1>
      <p className="mb-6 max-w-prose text-gray-600 text-sm">
        Demonstrates <code>useOptimistic</code> for instant UI feedback while a comment
        save action (with artificial delay) runs on the server. Pending comments fade
        until confirmed.
      </p>
      <div className="rounded-lg bg-white p-6 shadow" style={{ contain: 'content' }}>
        <OptimisticComments />
      </div>
    </div>);

}