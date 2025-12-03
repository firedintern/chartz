import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      crypto_symbol,
      chart_type = "line",
      color_scheme = "gradient1",
      show_grid = true,
      time_range = "7d",
      background_theme = "light",
      chart_title,
    } = body;

    // Validate required fields
    if (!crypto_symbol) {
      return Response.json(
        { success: false, error: "Cryptocurrency symbol is required" },
        { status: 400 },
      );
    }

    // Check if cryptocurrency exists
    const cryptoExists = await sql`
      SELECT symbol FROM cryptocurrencies WHERE symbol = ${crypto_symbol.toUpperCase()}
    `;

    if (cryptoExists.length === 0) {
      return Response.json(
        { success: false, error: "Cryptocurrency not found" },
        { status: 404 },
      );
    }

    // Insert chart configuration
    const chartConfig = await sql`
      INSERT INTO user_charts (
        crypto_symbol,
        chart_type,
        color_scheme,
        show_grid,
        time_range,
        background_theme,
        chart_title
      ) VALUES (
        ${crypto_symbol.toUpperCase()},
        ${chart_type},
        ${color_scheme},
        ${show_grid},
        ${time_range},
        ${background_theme},
        ${chart_title || null}
      )
      RETURNING *
    `;

    return Response.json({
      success: true,
      data: chartConfig[0],
    });
  } catch (error) {
    console.error("Error saving chart configuration:", error);
    return Response.json(
      { success: false, error: "Failed to save chart configuration" },
      { status: 500 },
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const crypto_symbol = searchParams.get("crypto_symbol");

    let query = `
      SELECT 
        uc.*,
        c.name as crypto_name
      FROM user_charts uc
      JOIN cryptocurrencies c ON uc.crypto_symbol = c.symbol
    `;

    const params = [];

    if (crypto_symbol) {
      query += ` WHERE uc.crypto_symbol = $1`;
      params.push(crypto_symbol.toUpperCase());
    }

    query += ` ORDER BY uc.created_at DESC`;

    const charts = await sql(query, params);

    return Response.json({
      success: true,
      data: charts,
    });
  } catch (error) {
    console.error("Error fetching chart configurations:", error);
    return Response.json(
      { success: false, error: "Failed to fetch chart configurations" },
      { status: 500 },
    );
  }
}
