"use server";

// Server action to save a comment (simulated delay & id assignment)
export async function saveComment(text) {
  await new Promise((r) => setTimeout(r, 900));
  // In a real app you'd persist to DB here
  return {
    id: Math.random().toString(36).slice(2),
    text
  };
}
export async function saveCommentFail(_text) {
  await new Promise((r) => setTimeout(r, 900));
  throw new Error("Simulated failure while saving comment");
}
