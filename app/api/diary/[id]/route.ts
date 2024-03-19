import { NextRequest, NextResponse } from "next/server";

import db from "@/app/db"; // Import Prisma Client
import type { Diary } from "@prisma/client";
import {
  getDiaryByDateAndUserId,
  upsertDiaryEntry,
} from "@/app/db/diary/diary";

export type DiaryResponseBodyGet =
  | {
      error: string;
    }
  | {
      diary: Diary | null;
    };
export type DiaryResponseBodyPut =
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
): Promise<NextResponse<DiaryResponseBodyGet>> {
  const dateString = request.nextUrl.searchParams.get("date");
  const userId = params.id;

  if (!dateString) {
    return NextResponse.json({ error: "Date not provided" }, { status: 400 });
  }

  try {
    // Fetch tasks based on the createdAt date
    const diary = await getDiaryByDateAndUserId(dateString, userId);

    return NextResponse.json({ diary });
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
): Promise<NextResponse<DiaryResponseBodyPut>> {
  const dateString = req.nextUrl.searchParams.get("date");
  const userId = params.id;
  const body = await req.json();
  const content = body.content;

  if (!dateString) {
    return NextResponse.json({ error: "Date not provided" }, { status: 400 });
  }
  try {
    const diaryEntry = await upsertDiaryEntry(userId, content, dateString);
    if (!diaryEntry) {
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    } else {
      return NextResponse.json({ diary: diaryEntry });
    }
  } catch (error) {
    console.error("Error upserting diary entry:", error);
    throw error;
  }
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
