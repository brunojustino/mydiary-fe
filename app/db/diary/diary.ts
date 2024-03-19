import type { Diary } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import db from "@/app/db";

import { cache } from "react";

export const getDiaryByDate = cache(async (date: string) => {
  const tasks = await db.diary.findMany({
    where: {
      createdAt: {
        gte: new Date(date),
      },
    },
  });
  return tasks;
});

export const getDiaryByDateAndUserId = cache(
  async (date: string, userId: string) => {
    try {
      const diaryEntry = await db.diary.findFirst({
        where: {
          userId: userId,
          date: date,
        },
      });
      return diaryEntry;
    } catch (error) {
      console.error("Error fetching diary entry:", error);
      throw error;
    }
  }
);

export const upsertDiaryEntry = cache(
  async (userId: string, content: string, date: string) => {
    try {
      const diaryEntry = await db.diary.upsert({
        where: { userId, date: date },
        update: { content },
        create: { userId, content, date },
      });
      return diaryEntry;
    } catch (error) {
      console.error("Error upserting diary entry:", error);
      throw error;
    }
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
