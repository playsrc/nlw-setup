import { inferAsyncReturnType, initTRPC, TRPCError } from "@trpc/server";
import { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import { decodeToken } from "./decode-token";

export async function createContext({ req, res }: CreateExpressContextOptions) {
  async function getUserFromHeader() {
    if (req.headers.authorization) {
      const user = await decodeToken(req.headers.authorization.split(" ")[1]);
      return user;
    }
    return null;
  }
  const user = await getUserFromHeader();

  return { req, res, user };
}

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create();

export const middleware = t.middleware;
export const router = t.router;

const isAuthed = middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Acesso não autorizado.",
    });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
