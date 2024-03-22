import type { Expenses } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import db from "@/app/db";

import { cache } from "react";

export const getExpensesByDate = cache(async (date: string) => {
  const expenses = await db.expenses.findMany({
    where: {
      createdAt: {
        gte: new Date(date),
      },
    },
  });
  return expenses;
});

export const getExpensesByDateAndUserId = cache(
  async (date: string, userId: string) => {
    const month = parseInt(date.substring(0, 2));
    const day = parseInt(date.substring(2, 4));
    const year = parseInt(date.substring(4));

    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(year, month - 1, day + 1);
    const expenses = await db.expenses.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
        userId: userId,
      },
    });
    return expenses;
  }
);

export const createExpenses = async (
  description: string,
  value: number,
  date: string,
  userId: string
) => {
  const expense = await db.expenses.create({
    data: {
      description,
      value,
      createdAt: new Date(date),
      userId,
    },
  });
  return expense;
};

export const updateExpensesById = cache(
  async (
    description: string,
    value: number,
    paid: boolean,
    expenseId: string
  ) => {
    const expenses = await db.expenses.update({
      where: {
        id: expenseId,
      },
      data: {
        description,
        value,
        paid,
        updatedAt: new Date(),
      },
    });
    return expenses;
  }
);

export const deleteExpenseById = cache(async (id: string) => {
  const expenses = await db.expenses.delete({
    where: {
      id: id,
    },
  });
  return expenses;
});
