import { useMutation } from "@tanstack/react-query";

export function useShareToGallery({ onSuccess, onError }) {
  return useMutation({
    mutationFn: async ({
      userChartId,
      title,
      description,
      creatorName,
      creatorHandle,
    }) => {
      const response = await fetch("/api/gallery/share", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userChartId,
          title,
          description,
          creatorName,
          creatorHandle,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to share to gallery");
      }
      return response.json();
    },
    onSuccess,
    onError,
  });
}
