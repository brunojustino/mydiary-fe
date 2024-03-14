import type { Tasks } from "@prisma/client"; // Importing the Post type from the Prisma client library.
import db from "@/app/db";
import { notFound } from "next/navigation"; // Importing the notFound function from Next.js for handling 404 errors.

export async function fetchTasks(): Promise<Tasks[]> {
  // Function to fetch all posts from the database.
  return await db.tasks.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
}

export async function fetchTaskById(id: string): Promise<Tasks | null> {
  // Function to fetch a single post by its ID.
  const tasks = await db.tasks.findFirst({
    where: {
      id,
    },
  });

  if (!tasks) {
    notFound(); // If the post is not found, a 404 error is thrown.
  }

  return tasks;
}
