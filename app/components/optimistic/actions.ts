"use server";
// Server action to save a comment (simulated delay & id assignment)
export type CommentRecord = { id: string; text: string };

export async function saveComment(text: string): Promise<CommentRecord> {
  await new Promise((r) => setTimeout(r, 900));
  // In a real app you'd persist to DB here
  return { id: Math.random().toString(36).slice(2), text };
}

export async function saveCommentFail(_text: string): Promise<never> {
  await new Promise((r) => setTimeout(r, 900));
  throw new Error("Simulated failure while saving comment");
}
