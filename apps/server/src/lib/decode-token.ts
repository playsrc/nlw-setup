import jwt from "jsonwebtoken";
import { prisma } from "./prisma";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export async function decodeToken(token: string) {
  const decodedType = z.object({
    id: z.string().cuid(),
    iat: z.number(),
    exp: z.number(),
  });

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);

    const { id } = decodedType.parse(decoded);

    const user = await prisma.user.findFirst({ where: { id: id } });

    return user;
  } catch (error: any) {
    throw new TRPCError({ code: "FORBIDDEN", message: error?.message });
  }
}
