import { NextApiRequest, NextApiResponse } from "next";
import db from "@/app/db"; // Import Prisma Client

export const dynamic = "force-dynamic";
export async function GET(req: NextApiRequest, response: NextApiResponse) {
  const res = await db.tasks.findMany({});
  return Response.json(res);
}

export async function POST(req: Request, response: NextApiResponse) {
  const body = await req.json();
  const description = body.description;
  const userId = body.userId;

  try {
    const res = await db.tasks.create({
      data: {
        description,
        userId,
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
