import sql from "@/app/api/utils/sql";

export async function POST(request) {
  try {
    const { name, phone, email } = await request.json();

    if (!name) {
      return Response.json({ error: "Name is required" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO agents (name, phone, email)
      VALUES (${name}, ${phone || null}, ${email || null})
      RETURNING id, name, phone, email, created_at
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating agent:", error);
    return Response.json({ error: "Failed to create agent" }, { status: 500 });
  }
}

export async function GET(request, { params }) {
  try {
    const agents = await sql`SELECT id, name, phone, email, created_at FROM agents`;
    return Response.json(agents);
  } catch (error) {
    console.error("Error fetching agents:", error);
    return Response.json({ error: "Failed to fetch agents" }, { status: 500 });
  }
}
