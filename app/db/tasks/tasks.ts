import type { Tasks } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import db from "@/app/db";

import { cache } from "react";

export const getTasksByDate = cache(async (date: string) => {
  const tasks = await db.tasks.findMany({
    where: {
      createdAt: {
        gte: new Date(date),
      },
    },
  });
  return tasks;
});

export const getTasksByDateAndUserId = cache(
  async (date: string, userId: string) => {
    const month = parseInt(date.substring(0, 2));
    const day = parseInt(date.substring(2, 4));
    const year = parseInt(date.substring(4));

    const startDate = new Date(year, month - 1, day);
    const endDate = new Date(year, month - 1, day + 1);
    const tasks = await db.tasks.findMany({
      where: {
        createdAt: {
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
        userId: userId,
      },
    });
    return tasks;
  }
);

export const createTasks = async (
  description: string,
  date: string,
  userId: string
) => {
  const task = await db.tasks.create({
    data: {
      description,
      createdAt: new Date(date),
      userId,
    },
  });
  return task;
};

export const updateTasksById = cache(
  async (description: string, taskId: string) => {
    const tasks = await db.tasks.update({
      where: {
        id: taskId,
      },
      data: {
        description,
        updatedAt: new Date(),
      },
    });
    return tasks;
  }
);

export const deleteTaskById = cache(async (id: string) => {
  const tasks = await db.tasks.delete({
    where: {
      id: id,
    },
  });
  return tasks;
});
