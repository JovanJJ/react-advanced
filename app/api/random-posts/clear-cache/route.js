import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
export async function POST(req) {
  // In a real app, you might clear a cache or reset some state here.
  // For this demo, we just return a success response.
  revalidateTag("random-posts");
  return NextResponse.json({
    success: true
  });
}
