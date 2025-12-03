import { useMutation } from "@tanstack/react-query";

export function useSaveChart() {
  return useMutation({
    mutationFn: async (chartConfig) => {
      const response = await fetch("/api/charts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(chartConfig),
      });
      if (!response.ok) {
        throw new Error("Failed to save chart configuration");
      }
      return response.json();
    },
    onSuccess: () => {
      console.log("Chart configuration saved successfully");
    },
    onError: (error) => {
      console.error("Failed to save chart configuration:", error);
    },
  });
}
