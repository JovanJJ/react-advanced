import { cache } from "react";

export type Post = { id: number; title: string };

const posts: Post[] = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    title: `Post #${i + 1}`,
}));

function sample<T>(arr: T[], n: number): T[] {
    const copy = arr.slice();
    const result: T[] = [];
    const take = Math.min(n, copy.length);
    for (let i = 0; i < take; i++) {
        const idx = Math.floor(Math.random() * copy.length);
        result.push(copy[idx]);
        copy.splice(idx, 1);
    }
    return result;
}

async function computeRandomPosts(): Promise<Post[]> {
    await new Promise((r) => setTimeout(r, 800));
    return sample(posts, 8);
}

export async function getRandomPosts(): Promise<Post[]> {
    return computeRandomPosts();
}

