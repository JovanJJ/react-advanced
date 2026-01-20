"use server";

export async function increment(state, formData) {
  const stepRaw = formData.get("step");
  const step = Number(stepRaw ?? 1) || 1;
  await new Promise((r) => setTimeout(r, 900));
  if (step > 5) {
    return {
      ...state,
      error: "Step too large (max 5)",
      message: undefined
    };
  }
  const next = state.count + step;
  return {
    count: next,
    message: `Incremented by ${step}`
  };
}