"use client";
import { useOptimistic, useState } from "react";
import { saveComment, saveCommentFail, type CommentRecord } from "./actions";

type Comment = CommentRecord & { pending?: boolean };

const initial: Comment[] = [
  { id: "a1", text: "First post!" },
  { id: "b2", text: "Optimistic UI feels instant." },
];

export default function OptimisticComments() {
  const [comments, setComments] = useState<Comment[]>(initial);
  const [simulateError, setSimulateError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [optimisticComments, addOptimistic] = useOptimistic<Comment[], Comment>(
    comments,
    (state, newComment) => [...state, newComment]
  );


  async function handleSubmit(formData: FormData) {
    const text = String(formData.get("text") || "").trim();
    if (!text) return;
    setError(null);
    const tempId = `temp-${Date.now()}`;
    // 1) Apply optimistic UI state immediately
    addOptimistic({ id: tempId, text, pending: true });
    try {
      // 2) Perform server action (may fail depending on toggle)
      const saved = simulateError ? await saveCommentFail(text) : await saveComment(text);
      // 3) On success, commit to authoritative state
      setComments((prev) => [...prev, saved]);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      // 4) On error, roll back the optimistic item from the committed state
      let msg = "Failed to save comment";
      if (e instanceof Error) msg = e.message;
      setError(msg);
      setComments((prev) => prev);
      // Note: The optimistic list still shows the pending item; we can optionally
      // instruct the user that it wasn't saved.
    }
  }

  return (
    <div className="space-y-4 text-sm text-black">
      <form action={handleSubmit} className="flex gap-2">
        <input
          name="text"
            placeholder="Add comment..."
          className="flex-1 rounded border bg-white text-gray-900 placeholder-gray-400 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded bg-gray-900 px-4 py-2 text-white text-sm font-medium hover:bg-gray-800"
        >
          Post
        </button>
      </form>
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 text-[12px] text-gray-700">
          <input
            type="checkbox"
            checked={simulateError}
            onChange={(e) => setSimulateError(e.target.checked)}
            className="h-4 w-4"
          />
          Simulate server error
        </label>
        {error && <span className="text-[12px] text-red-600">{error}</span>}
      </div>
      <ul className="space-y-2">
        {optimisticComments.map((c) => (
          <li
            key={c.id}
            className={`rounded border px-3 py-2 bg-gray-50 ${
              c.pending ? "opacity-60 italic animate-pulse" : ""
            }`}
          >
            {c.text}
            {c.pending && (
              <span className="ml-2 text-[10px] text-gray-500">
                {simulateError ? "(failed, not saved)" : "(saving...)"}
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="text-[11px] text-gray-500">
        Stored comments: {comments.length} (UI shows optimistic entries immediately)
      </div>
      <p className="text-[11px] text-gray-500 max-w-prose">
        When &quot;Simulate server error&quot; is enabled, we still add the comment optimistically
        to the list, but the server action throws. This demonstrates that
        <code className="mx-1">useOptimistic</code> only affects the rendered optimistic state.
        The authoritative state (<code className="mx-1">comments</code>) isn&apos;t updated, so the
        persisted count doesn&apos;t change. You can show a toast/error and decide whether to
        keep or remove the optimistic item.
      </p>
    </div>
  );
}
