import { db } from "@/app/db/index";

export async function GET(request: Request) {
  const user = await db.user.create({
    data: {
      name: "elsa",
      email: "elsa@prisma.io",
    },
  });
  return Response.json(user);
}
