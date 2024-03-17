import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/db"; // Import Prisma Client

export const dynamic = "force-dynamic";
export async function GET(req: NextApiRequest, response: NextApiResponse) {
  const res = await db.diary.findMany({});
  return Response.json(res);
}

//TODO create task based on the selected date

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();
  const content = body.content;
  const userId = body.userId;
  const createdAt = body.createdAt;

  try {
    // Perform an upsert operation
    const res = await db.diary.upsert({
      where: {
        id: userId,
      }, // Specify the unique identifier for the diary entry
      update: { content }, // Update the content if the entry exists
      create: { content, userId, createdAt }, // Create a new entry with the provided data if it doesn't exist
    });

    return Response.json(res);
  } catch (error: any) {
    console.error(error);
    return Response.json(
      {
        error: error.message,
      },
      { status: 400 }
    );
  }
}
