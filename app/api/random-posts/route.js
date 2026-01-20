import { getRandomPosts } from "@/app/lib/randomPosts";
import { NextResponse } from "next/server";
export async function GET(req) {
  try {
    return NextResponse.json(await getRandomPosts());
  } catch (_e) {
    return NextResponse.json({
      error: "Failed to fetch posts"
    }, {
      status: 500
    });
  }
}
export async function POST(req) {
  // In a real app, you might clear a cache or reset some state here.
  // For this demo, we just return a success response.
  return NextResponse.json({
    success: true
  });
}