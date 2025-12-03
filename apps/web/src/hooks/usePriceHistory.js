import { useQuery } from "@tanstack/react-query";

export function usePriceHistory(symbol, timeRange) {
  return useQuery({
    queryKey: ["priceHistory", symbol, timeRange],
    queryFn: async () => {
      const url = new URL(
        `/api/crypto/${symbol}/history`,
        window.location.origin,
      );
      url.searchParams.set("timeRange", timeRange);

      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch price history: ${response.status} ${errorText}`,
        );
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3, // Retry 3 times on failure
  });
}
