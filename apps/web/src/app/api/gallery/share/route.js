import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const body = await request.json();
    const { userChartId, creatorName, creatorHandle, title, description } =
      body;

    // Validate required fields
    if (!userChartId || !title) {
      return Response.json(
        { success: false, error: "User chart ID and title are required" },
        { status: 400 },
      );
    }

    // Check if chart exists
    const chart = await sql`
      SELECT id FROM user_charts WHERE id = ${userChartId}
    `;

    if (chart.length === 0) {
      return Response.json(
        { success: false, error: "Chart not found" },
        { status: 404 },
      );
    }

    // Check if chart is already shared
    const existing = await sql`
      SELECT id FROM shared_charts WHERE user_chart_id = ${userChartId}
    `;

    if (existing.length > 0) {
      return Response.json(
        { success: false, error: "Chart already shared to gallery" },
        { status: 400 },
      );
    }

    // Share the chart
    const result = await sql`
      INSERT INTO shared_charts (
        user_chart_id,
        creator_name,
        creator_handle,
        title,
        description
      ) VALUES (
        ${userChartId},
        ${creatorName || null},
        ${creatorHandle || null},
        ${title},
        ${description || null}
      )
      RETURNING id
    `;

    return Response.json({
      success: true,
      data: { sharedChartId: result[0].id },
    });
  } catch (error) {
    console.error("Error sharing chart:", error);
    return Response.json(
      { success: false, error: "Failed to share chart" },
      { status: 500 },
    );
  }
}
