import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/db"; // Import Prisma Client

export const dynamic = "force-dynamic";
export async function GET(req: NextApiRequest, response: NextApiResponse) {
  const res = await db.tasks.findMany({});
  return Response.json(res);
}

//TODO create task based on the selected date

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();
  const description = body.description;
  const userId = body.userId;
  const createdAt = body.createdAt;

  console.log(createdAt);

  try {
    const res = await db.tasks.create({
      data: {
        description,
        userId,
        createdAt,
      },
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
