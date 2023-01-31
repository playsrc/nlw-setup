import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { protectedProcedure, publicProcedure, router } from "../lib/trpc";

export const usersRouter = router({
  register: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, email, password } = input;

      const registeredUser = await prisma.user.findFirst({
        where: { email: email },
      });

      if (registeredUser) {
        throw new TRPCError({
          code: "CONFLICT",
          message: "Usuário já cadastrado.",
        });
      }

      const encryptedPassword = await bcrypt.hash(password, 10);

      await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: encryptedPassword,
        },
      });

      ctx.res.status(201);
    }),

  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input;

      const user = await prisma.user.findFirst({
        where: { email: email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Usuário inexistente.",
        });
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Credenciais inválidas.",
        });
      }

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.REFRESH_TOKEN_SECRET!,
        { expiresIn: "1d" }
      );

      const accessToken = jwt.sign(
        { id: user.id },
        process.env.ACCESS_TOKEN_SECRET!,
        {
          expiresIn: "1m",
        }
      );

      await prisma.user.update({
        where: { id: user.id },
        data: { refresh_token: refreshToken },
      });

      ctx.res.cookie("jwt", refreshToken, {
        maxAge: 24 * 60 * 60 * 1000, // 24 horas
        sameSite: "none",
        secure: true,
        httpOnly: true,
      });

      return accessToken;
    }),

  refreshToken: protectedProcedure.query(({ ctx }) => {
    const { req, user } = ctx;

    if (req.cookies.jwt !== user.refresh_token) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const accessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "1m",
      }
    );

    return accessToken;
  }),

  me: protectedProcedure.query(({ ctx }) => {
    const { id, name, email } = ctx.user;
    return { id, name, email };
  }),
});
