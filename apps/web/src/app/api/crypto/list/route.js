import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    // Build API URL with optional API key
    const apiKey = process.env.COINGECKO_API_KEY;
    let apiUrl =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false&price_change_percentage=24h";

    if (apiKey) {
      apiUrl += `&x_cg_demo_api_key=${apiKey}`;
    }

    // Fetch real-time data from CoinGecko API
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`CoinGecko API error (${response.status}):`, errorText);
      throw new Error(`CoinGecko API error: ${response.status}`);
    }

    const coins = await response.json();

    // Transform CoinGecko data to our format
    const formattedCoins = coins.map((coin) => ({
      symbol: coin.symbol.toUpperCase(),
      name: coin.name,
      logo_url: coin.image,
      current_price: coin.current_price,
      price_change_24h: coin.price_change_percentage_24h,
      market_cap: coin.market_cap,
      volume_24h: coin.total_volume,
      circulating_supply: coin.circulating_supply,
      id: coin.id, // CoinGecko ID for fetching historical data
    }));

    return Response.json({
      success: true,
      data: formattedCoins,
    });
  } catch (error) {
    console.error("Error fetching crypto list:", error);

    // Fallback to sample data if API fails
    const sampleCoins = [
      {
        symbol: "BTC",
        name: "Bitcoin",
        logo_url:
          "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
        current_price: 45000,
        price_change_24h: 2.5,
        market_cap: 880000000000,
        volume_24h: 35000000000,
        circulating_supply: 19500000,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        logo_url:
          "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
        current_price: 2500,
        price_change_24h: 1.8,
        market_cap: 300000000000,
        volume_24h: 18000000000,
        circulating_supply: 120000000,
      },
      {
        symbol: "USDT",
        name: "Tether",
        logo_url:
          "https://assets.coingecko.com/coins/images/325/large/Tether.png",
        current_price: 1.0,
        price_change_24h: 0.01,
        market_cap: 95000000000,
        volume_24h: 50000000000,
        circulating_supply: 95000000000,
      },
      {
        symbol: "BNB",
        name: "BNB",
        logo_url:
          "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
        current_price: 310,
        price_change_24h: 3.2,
        market_cap: 48000000000,
        volume_24h: 1200000000,
        circulating_supply: 155000000,
      },
      {
        symbol: "SOL",
        name: "Solana",
        logo_url:
          "https://assets.coingecko.com/coins/images/4128/large/solana.png",
        current_price: 110,
        price_change_24h: -1.5,
        market_cap: 47000000000,
        volume_24h: 2500000000,
        circulating_supply: 427000000,
      },
      {
        symbol: "XRP",
        name: "XRP",
        logo_url:
          "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
        current_price: 0.52,
        price_change_24h: 0.8,
        market_cap: 28000000000,
        volume_24h: 1100000000,
        circulating_supply: 54000000000,
      },
      {
        symbol: "USDC",
        name: "USDC",
        logo_url:
          "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
        current_price: 1.0,
        price_change_24h: 0.0,
        market_cap: 26000000000,
        volume_24h: 6000000000,
        circulating_supply: 26000000000,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        logo_url:
          "https://assets.coingecko.com/coins/images/975/large/cardano.png",
        current_price: 0.62,
        price_change_24h: 4.1,
        market_cap: 22000000000,
        volume_24h: 580000000,
        circulating_supply: 35500000000,
      },
      {
        symbol: "AVAX",
        name: "Avalanche",
        logo_url:
          "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png",
        current_price: 38,
        price_change_24h: -2.3,
        market_cap: 14000000000,
        volume_24h: 680000000,
        circulating_supply: 368000000,
      },
      {
        symbol: "DOGE",
        name: "Dogecoin",
        logo_url:
          "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
        current_price: 0.095,
        price_change_24h: 1.2,
        market_cap: 13500000000,
        volume_24h: 850000000,
        circulating_supply: 142000000000,
      },
    ];

    return Response.json({
      success: true,
      data: sampleCoins,
      note: "Using sample data - CoinGecko API unavailable",
    });
  }
}
