import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/db"; // Import Prisma Client
import { createExpenses } from "@/app/db/expenses/expenses";

export const dynamic = "force-dynamic";
export async function GET(req: NextApiRequest, response: NextApiResponse) {
  const res = await db.expenses.findMany({});
  return Response.json(res);
}

//TODO create task based on the selected date

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();
  const description = body.description;
  const value = body.value;
  const userId = body.userId;
  const createdAt = body.createdAt;

  try {
    const expense = await createExpenses(description, value, createdAt, userId);
    return Response.json(expense);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
