import sql from "@/app/api/utils/sql";

export async function POST(request, { params }) {
  try {
    const { id } = params;

    // Get IP address from request headers
    const forwarded = request.headers.get("x-forwarded-for");
    const ipAddress = forwarded ? forwarded.split(",")[0] : "unknown";

    // Check if chart exists
    const chart = await sql`
      SELECT id FROM shared_charts WHERE id = ${id}
    `;

    if (chart.length === 0) {
      return Response.json(
        { success: false, error: "Chart not found" },
        { status: 404 },
      );
    }

    // Check if user already upvoted
    const existingUpvote = await sql`
      SELECT id FROM chart_upvotes 
      WHERE shared_chart_id = ${id} AND ip_address = ${ipAddress}
    `;

    if (existingUpvote.length > 0) {
      return Response.json(
        { success: false, error: "Already upvoted" },
        { status: 400 },
      );
    }

    // Add upvote
    await sql.transaction([
      sql`
        INSERT INTO chart_upvotes (shared_chart_id, ip_address)
        VALUES (${id}, ${ipAddress})
      `,
      sql`
        UPDATE shared_charts 
        SET upvotes = upvotes + 1
        WHERE id = ${id}
      `,
    ]);

    // Get updated upvote count
    const updated = await sql`
      SELECT upvotes FROM shared_charts WHERE id = ${id}
    `;

    return Response.json({
      success: true,
      data: { upvotes: updated[0].upvotes },
    });
  } catch (error) {
    console.error("Error upvoting chart:", error);
    return Response.json(
      { success: false, error: "Failed to upvote chart" },
      { status: 500 },
    );
  }
}
