import sql from "@/app/api/utils/sql";

// Create transaction
export async function POST(request) {
  try {
    const { agent_id, type, description, amount } = await request.json();

    if (!agent_id || !type || !amount) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO transactions (agent_id, type, description, amount, status)
      VALUES (${agent_id}, ${type}, ${description || null}, ${amount}, 'completed')
      RETURNING id, agent_id, type, description, amount, status, created_at, updated_at
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating transaction:", error);
    return Response.json({ error: "Failed to create transaction" }, { status: 500 });
  }
}

// Get transactions by agent
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const agent_id = url.searchParams.get("agent_id");
    const limit = url.searchParams.get("limit") || 50;
    const offset = url.searchParams.get("offset") || 0;

    if (!agent_id) {
      return Response.json({ error: "agent_id is required" }, { status: 400 });
    }

    const transactions = await sql`
      SELECT id, agent_id, type, description, amount, status, created_at, updated_at
      FROM transactions
      WHERE agent_id = ${parseInt(agent_id)}
      ORDER BY created_at DESC
      LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
    `;

    return Response.json(transactions);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return Response.json({ error: "Failed to fetch transactions" }, { status: 500 });
  }
}
