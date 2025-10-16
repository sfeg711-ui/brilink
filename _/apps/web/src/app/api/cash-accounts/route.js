import sql from "@/app/api/utils/sql";

// Create cash account
export async function POST(request) {
  try {
    const { agent_id, account_name, balance } = await request.json();

    if (!agent_id || !account_name) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO cash_accounts (agent_id, account_name, balance)
      VALUES (${agent_id}, ${account_name}, ${balance || 0})
      RETURNING id, agent_id, account_name, balance, created_at, updated_at
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating cash account:", error);
    return Response.json({ error: "Failed to create cash account" }, { status: 500 });
  }
}

// Get cash accounts by agent
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const agent_id = url.searchParams.get("agent_id");

    if (!agent_id) {
      return Response.json({ error: "agent_id is required" }, { status: 400 });
    }

    const accounts = await sql`
      SELECT id, agent_id, account_name, balance, created_at, updated_at
      FROM cash_accounts
      WHERE agent_id = ${parseInt(agent_id)}
      ORDER BY created_at DESC
    `;

    return Response.json(accounts);
  } catch (error) {
    console.error("Error fetching cash accounts:", error);
    return Response.json({ error: "Failed to fetch cash accounts" }, { status: 500 });
  }
}
