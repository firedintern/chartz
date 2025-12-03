import sql from "@/app/api/utils/sql";

export async function POST(request, { params }) {
  try {
    const { id } = params;

    // Increment view count
    await sql`
      UPDATE shared_charts 
      SET views = views + 1
      WHERE id = ${id}
    `;

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error tracking view:", error);
    return Response.json(
      { success: false, error: "Failed to track view" },
      { status: 500 },
    );
  }
}
