import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db"; // Import Prisma Client
import type { Expenses } from "@prisma/client";
import {
  updateExpensesById,
  deleteExpenseById,
  getExpensesByDateAndUserId,
} from "@/app/db/expenses/expenses";

export type ExpenseResponseBodyGet =
  | {
      error: string;
    }
  | {
      expenses: Expenses[];
    };
export type ExpenseResponseBodyPut =
  | {
      error: string;
    }
  | {
      expense: Expenses;
    };
export type ExpenseResponseBodyDelete =
  | {
      error: string;
    }
  | {
      expense: Expenses;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<ExpenseResponseBodyGet>> {
  const dateString = request.nextUrl.searchParams.get("date");
  console.log("datestring - " + dateString);
  // const dateString = params.id;
  const userId = params.id;
  // const dateParams = request.nextUrl.searchParams.get("date");

  if (!dateString) {
    return NextResponse.json({ error: "Date not provided" }, { status: 400 });
  }

  const month = parseInt(dateString.substring(0, 2));
  const day = parseInt(dateString.substring(2, 4));
  const year = parseInt(dateString.substring(4));

  // Construct a Date object
  const startDate = new Date(year, month - 1, day);
  const endDate = new Date(year, month - 1, day + 1);

  if (isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
  }

  try {
    const expenses = await getExpensesByDateAndUserId(dateString, userId);

    // If tasks are found, return them
    if (expenses.length > 0) {
      return NextResponse.json({ expenses: expenses });
    } else {
      return NextResponse.json({ expenses: [] });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<ExpenseResponseBodyPut>> {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Expense id not found" },
      { status: 404 }
    );
  }
  const body = await req.json();

  const updatedExpense = await updateExpensesById(
    body.description,
    body.value,
    body.paid,
    id
  );
  return NextResponse.json({ expense: updatedExpense });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<ExpenseResponseBodyDelete>> {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: "Expense id not found" },
      { status: 404 }
    );
  }
  const deletedExpense = await db.expenses.delete({ where: { id: id } });
  return NextResponse.json({ expense: deletedExpense });
}
