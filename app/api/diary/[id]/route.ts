import { NextRequest, NextResponse } from "next/server";

import db from "@/app/db"; // Import Prisma Client
import type { Diary as Diary } from "@prisma/client";

export type TaskResponseBodyGet =
  | {
      error: string;
    }
  | {
      diary: Diary[];
    };
export type TaskResponseBodyPut =
  | {
      error: string;
    }
  | {
      diary: Diary;
    };
export type TaskResponseBodyDelete =
  | {
      error: string;
    }
  | {
      diary: Diary;
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
    const diary = await db.diary.findMany({
      where: {
        createdAt: {
          // Specify the date range to match tasks created on the given date
          gte: new Date(startDate),
          lt: new Date(endDate),
        },
      },
    });

    // If tasks are found, return them
    if (diary.length > 0) {
      return NextResponse.json({ diary: diary });
    } else {
      return NextResponse.json({ diary: [] });
    }
  } catch (error) {
    console.error("Error fetching diary:", error);
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
    return NextResponse.json({ error: "diary id not found" }, { status: 404 });
  }
  const body = await req.json();

  const updatedDiary = await db.diary.update({
    where: { id: id },
    data: {
      content: body.description,
    },
  });
  return NextResponse.json({ diary: updatedDiary });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Record<string, string> }
): Promise<NextResponse<TaskResponseBodyDelete>> {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ error: "Diary id not found" }, { status: 404 });
  }
  const deletedDiary = await db.diary.delete({ where: { id: id } });
  return NextResponse.json({ diary: deletedDiary });
}
