import CachingDemoClient from "./CachingDemoClient";

const SWR_KEY = "/api/random-posts";

export default async function CachingDemoServer({
  mode


}) {

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ||
    (typeof window !== 'undefined' ? window.location.origin : '') ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');


  const url = baseUrl ? `${baseUrl}${SWR_KEY}` : SWR_KEY;

  const fetchOptions =
    mode === "without" ?
      { cache: "no-store", next: { tags: ["random-posts"] } } :
      { cache: "force-cache", next: { tags: ["random-posts"] } };

  let serverData = null;


  if (baseUrl) {
    try {
      const res = await fetch(url, fetchOptions);
      if (res.ok) serverData = await res.json();
    } catch (error) {
      console.error('Failed to fetch data:', error);
      // serverData remains null, component will handle gracefully
    }
  }

  return <CachingDemoClient mode={mode} swrKey={SWR_KEY} serverData={serverData} />;
}
