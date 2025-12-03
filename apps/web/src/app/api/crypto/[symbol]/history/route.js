// Map of common symbols to CoinGecko IDs
const SYMBOL_TO_ID_MAP = {
  BTC: "bitcoin",
  ETH: "ethereum",
  USDT: "tether",
  BNB: "binancecoin",
  SOL: "solana",
  XRP: "ripple",
  USDC: "usd-coin",
  ADA: "cardano",
  AVAX: "avalanche-2",
  DOGE: "dogecoin",
  DOT: "polkadot",
  MATIC: "matic-network",
  LINK: "chainlink",
  UNI: "uniswap",
  ATOM: "cosmos",
  LTC: "litecoin",
  BCH: "bitcoin-cash",
  NEAR: "near",
  ALGO: "algorand",
  VET: "vechain",
};

export async function GET(request, { params }) {
  const { symbol } = params;
  const url = new URL(request.url);
  const timeRange = url.searchParams.get("timeRange") || "7d";

  try {
    const upperSymbol = symbol.toUpperCase();
    const coinId = SYMBOL_TO_ID_MAP[upperSymbol] || symbol.toLowerCase();

    console.log(
      `Fetching price history for ${upperSymbol} (${coinId}) - ${timeRange}`,
    );

    // Map time range to days
    const daysMap = {
      "24h": 1,
      "7d": 7,
      "30d": 30,
      "1y": 365,
    };
    const days = daysMap[timeRange] || 7;

    // Fetch both price history and OHLC data with proper headers
    const headers = {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    };

    const apiKey = process.env.COINGECKO_API_KEY;
    const keyParam = apiKey ? `&x_cg_demo_api_key=${apiKey}` : "";

    try {
      const [priceResponse, ohlcResponse] = await Promise.all([
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}${keyParam}`,
          { headers },
        ),
        fetch(
          `https://api.coingecko.com/api/v3/coins/${coinId}/ohlc?vs_currency=usd&days=${days}${keyParam}`,
          { headers },
        ),
      ]);

      console.log("Price response status:", priceResponse.status);
      console.log("OHLC response status:", ohlcResponse.status);

      if (!priceResponse.ok) {
        const errorText = await priceResponse.text();
        console.error("Price API error:", errorText);
        throw new Error(
          `Price API returned ${priceResponse.status}: ${errorText}`,
        );
      }

      if (!ohlcResponse.ok) {
        const errorText = await ohlcResponse.text();
        console.error("OHLC API error:", errorText);
        throw new Error(
          `OHLC API returned ${ohlcResponse.status}: ${errorText}`,
        );
      }

      const priceData = await priceResponse.json();
      const ohlcData = await ohlcResponse.json();

      console.log("Price data points:", priceData?.prices?.length || 0);
      console.log("OHLC data points:", ohlcData?.length || 0);

      // Format price history data
      const formattedPrices = priceData.prices.map(([timestamp, price]) => ({
        timestamp: new Date(timestamp).toISOString(),
        price,
      }));

      // Format OHLC data for candlestick charts
      const formattedOhlc = ohlcData.map(
        ([timestamp, open, high, low, close]) => ({
          timestamp: new Date(timestamp).toISOString(),
          open,
          high,
          low,
          close,
        }),
      );

      return Response.json({
        success: true,
        data: {
          symbol: upperSymbol,
          prices: formattedPrices,
          ohlc: formattedOhlc,
        },
      });
    } catch (apiError) {
      console.error(
        "CoinGecko API failed, using sample data:",
        apiError.message,
      );

      // Generate sample data as fallback
      const now = Date.now();
      const basePrice =
        upperSymbol === "BTC" ? 45000 : upperSymbol === "ETH" ? 2500 : 100;
      const dataPoints = days === 1 ? 24 : days * 4; // hourly for 24h, every 6h otherwise
      const interval = (days * 24 * 60 * 60 * 1000) / dataPoints;

      const formattedPrices = [];
      const formattedOhlc = [];

      for (let i = 0; i < dataPoints; i++) {
        const timestamp = new Date(
          now - (dataPoints - i) * interval,
        ).toISOString();
        const randomVariation = 1 + (Math.random() - 0.5) * 0.1; // ±5% variation
        const price = basePrice * randomVariation;

        formattedPrices.push({
          timestamp,
          price,
        });

        const open = price;
        const close = price * (1 + (Math.random() - 0.5) * 0.05);
        const high = Math.max(open, close) * (1 + Math.random() * 0.02);
        const low = Math.min(open, close) * (1 - Math.random() * 0.02);

        formattedOhlc.push({
          timestamp,
          open,
          high,
          low,
          close,
        });
      }

      return Response.json({
        success: true,
        data: {
          symbol: upperSymbol,
          prices: formattedPrices,
          ohlc: formattedOhlc,
        },
        note: "Using sample data - CoinGecko API unavailable",
      });
    }
  } catch (error) {
    console.error("Error fetching price history:", error);
    return Response.json(
      {
        success: false,
        error: error.message || "Failed to fetch price history",
      },
      { status: 500 },
    );
  }
}
