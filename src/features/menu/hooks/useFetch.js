import { useState, useEffect } from "react";

export function useFetch(url, fallbackUrl = "/menu.json") {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setError(null);

    async function doFetch() {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (active) setData(json);
      } catch (primaryErr) {
        // If primary URL (like local .NET backend) failed and fallback exists, try fallback
        if (fallbackUrl && fallbackUrl !== url) {
          try {
            const fallbackRes = await fetch(fallbackUrl);
            if (!fallbackRes.ok) throw new Error("HTTP " + fallbackRes.status);
            const fallbackJson = await fallbackRes.json();
            if (active) setData(fallbackJson);
            return;
          } catch (fallbackErr) {
            if (active) setError(fallbackErr.message);
          }
        } else {
          if (active) setError(primaryErr.message);
        }
      } finally {
        if (active) setIsLoading(false);
      }
    }

    doFetch();

    return () => {
      active = false;
    }; // cleanup
  }, [url, fallbackUrl]);

  return { data, isLoading, error };
}
