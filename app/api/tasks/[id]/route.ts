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

export async function GET(
  request: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<TaskResponseBodyGet>> {
  const id = params.id;
  const newTask = await db.tasks.findUnique({ where: { id: id } });

  if (!newTask) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }
  return NextResponse.json({ task: newTask });
}

export async function PATCH(req: NextRequest, response: NextResponse) {
  const res = await db.tasks.findMany();
  return Response.json(res);
}

export async function DELETE(req: NextRequest, response: NextResponse) {
  const res = await db.tasks.findMany();
  return Response.json(res);
}
