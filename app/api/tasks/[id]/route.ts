import { NextRequest, NextResponse } from "next/server";
import db from "@/app/db"; // Import Prisma Client
import type { Tasks } from "@prisma/client";

export type TaskResponseBodyGet =
  | {
      error: string;
    }
  | {
      task: Tasks;
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
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Task id not found" }, { status: 404 });
  }
  const newTask = await db.tasks.findUnique({ where: { id: id } });

  if (!newTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ task: newTask });
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
