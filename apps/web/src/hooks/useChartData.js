import { useMemo } from "react";

export function useChartData(priceHistoryResponse, timeRange) {
  return useMemo(() => {
    if (!priceHistoryResponse?.success || !priceHistoryResponse?.data) {
      return { prices: [], ohlc: [] };
    }

    const { prices = [], ohlc = [] } = priceHistoryResponse.data;

    // Format price data for line/area charts
    const formattedPrices = prices.map((item) => {
      const date = new Date(item.timestamp);
      let formattedDate;

      switch (timeRange) {
        case "24h":
          formattedDate = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          break;
        case "7d":
        case "30d":
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          break;
        case "1y":
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          });
          break;
        default:
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
      }

      return {
        date: formattedDate,
        price: item.price,
        timestamp: item.timestamp,
      };
    });

    // Format OHLC data for candlestick charts
    const formattedOhlc = ohlc.map((item) => {
      const date = new Date(item.timestamp);
      let formattedDate;

      switch (timeRange) {
        case "24h":
          formattedDate = date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });
          break;
        case "7d":
        case "30d":
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
          break;
        case "1y":
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            year: "2-digit",
          });
          break;
        default:
          formattedDate = date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
      }

      return {
        date: formattedDate,
        open: item.open,
        high: item.high,
        low: item.low,
        close: item.close,
        timestamp: item.timestamp,
      };
    });

    console.log(
      "Chart data formatted:",
      formattedPrices.length,
      "price points,",
      formattedOhlc.length,
      "OHLC points",
    );
    return { prices: formattedPrices, ohlc: formattedOhlc };
  }, [priceHistoryResponse, timeRange]);
}
