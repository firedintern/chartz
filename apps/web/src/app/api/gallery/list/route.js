import sql from "@/app/api/utils/sql";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const sort = searchParams.get("sort") || "new"; // new, trending, top
    const limit = parseInt(searchParams.get("limit") || "50");

    let query = `
      SELECT 
        sc.id,
        sc.user_chart_id,
        sc.creator_name,
        sc.creator_handle,
        sc.title,
        sc.description,
        sc.upvotes,
        sc.views,
        sc.is_featured,
        sc.created_at,
        uc.crypto_symbol,
        uc.chart_type,
        uc.color_scheme,
        uc.time_range,
        uc.background_theme,
        uc.show_grid,
        c.name as crypto_name,
        c.logo_url as crypto_logo,
        c.current_price
      FROM shared_charts sc
      JOIN user_charts uc ON sc.user_chart_id = uc.id
      JOIN cryptocurrencies c ON uc.crypto_symbol = c.symbol
      WHERE 1=1
    `;

    const params = [];

    // Add sorting
    if (sort === "trending") {
      // Trending = upvotes in last 7 days
      query += ` AND sc.created_at >= NOW() - INTERVAL '7 days'
                 ORDER BY sc.upvotes DESC, sc.created_at DESC`;
    } else if (sort === "top") {
      query += ` ORDER BY sc.upvotes DESC, sc.created_at DESC`;
    } else {
      query += ` ORDER BY sc.created_at DESC`;
    }

    query += ` LIMIT $${params.length + 1}`;
    params.push(limit);

    const charts = await sql(query, params);

    return Response.json({
      success: true,
      data: charts,
    });
  } catch (error) {
    console.error("Error fetching gallery charts:", error);
    return Response.json(
      { success: false, error: "Failed to fetch gallery charts" },
      { status: 500 },
    );
  }
}
