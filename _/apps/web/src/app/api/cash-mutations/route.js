import sql from "@/app/api/utils/sql";

// Create cash mutation
export async function POST(request) {
  try {
    const { account_id, transaction_id, type, amount, description, previous_balance, new_balance } = await request.json();

    if (!account_id || !type || !amount) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    const result = await sql`
      INSERT INTO cash_mutations (account_id, transaction_id, type, amount, description, previous_balance, new_balance)
      VALUES (${account_id}, ${transaction_id || null}, ${type}, ${amount}, ${description || null}, ${previous_balance || null}, ${new_balance || null})
      RETURNING id, account_id, transaction_id, type, amount, description, previous_balance, new_balance, created_at
    `;

    return Response.json(result[0], { status: 201 });
  } catch (error) {
    console.error("Error creating cash mutation:", error);
    return Response.json({ error: "Failed to create cash mutation" }, { status: 500 });
  }
}

// Get cash mutations for account
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const account_id = url.searchParams.get("account_id");
    const limit = url.searchParams.get("limit") || 100;
    const offset = url.searchParams.get("offset") || 0;

    if (!account_id) {
      return Response.json({ error: "account_id is required" }, { status: 400 });
    }

    const mutations = await sql`
      SELECT id, account_id, transaction_id, type, amount, description, previous_balance, new_balance, created_at
      FROM cash_mutations
      WHERE account_id = ${parseInt(account_id)}
      ORDER BY created_at DESC
      LIMIT ${parseInt(limit)} OFFSET ${parseInt(offset)}
    `;

    return Response.json(mutations);
  } catch (error) {
    console.error("Error fetching cash mutations:", error);
    return Response.json({ error: "Failed to fetch cash mutations" }, { status: 500 });
  }
}
