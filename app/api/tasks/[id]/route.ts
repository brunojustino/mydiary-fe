import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db"; // Import Prisma Client
import type { Tasks } from "@prisma/client";

export type TaskResponseBodyGet =
  | {
      error: string;
    }
  | {
      tasks: Tasks[];
    };
export type TaskResponseBodyPut =
  | {
      error: string;
    }
  | {
      task: Tasks;
    };
export type TaskResponseBodyDelete =
  | {
      error: string;
    }
  | {
      task: Tasks;
    };

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<TaskResponseBodyGet>> {
  const dateString = params.id;

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
    // Fetch tasks based on the createdAt date
    const tasks = await db.tasks.findMany({
      where: {
        createdAt: {
          // Specify the date range to match tasks created on the given date
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
    });

    // If tasks are found, return them
    if (tasks.length > 0) {
      return NextResponse.json({ tasks: tasks });
    } else {
      return NextResponse.json(
        { error: "No tasks found for the given date" },
        { status: 404 }
      );
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
): Promise<NextResponse<TaskResponseBodyPut>> {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Task id not found" }, { status: 404 });
  }
  const body = await req.json();

  const updatedTask = await db.tasks.update({
    where: { id: id },
    data: {
      description: body.description,
      completed: body.completed,
    },
  });
  return NextResponse.json({ task: updatedTask });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<TaskResponseBodyDelete>> {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Task id not found" }, { status: 404 });
  }
  const deletedTask = await db.tasks.delete({ where: { id: id } });
  return NextResponse.json({ task: deletedTask });
}
