import WebPush from "web-push";
import { z } from "zod";
import { publicProcedure, router } from "../lib/trpc";

const privateKey = "J0o7Jhy24Se18uKlzIgKQiqoUG2ucfTKZcRly1ez9ng";
const publicKey =
  "BHaAgL5vUWS4kTRBPd1wn2-C_MkEVL_Y0nOugQ8IUYylKvHUwFADn9oqnLQ50oEVrV8jvBrvH5yGd6hfjyfkW5o";

WebPush.setVapidDetails("https://localhost:3001", publicKey, privateKey);

export const notificationRouter = router({
  publicKey: publicProcedure.query(() => {
    return {
      publicKey,
    };
  }),

  register: publicProcedure.mutation(({ ctx }) => {
    /**
     * TODO:
     * Associar ID do usuário que aceitou receber
     * notifications com o ID do usuário logado
     */

    ctx.res.status(201);
  }),

  send: publicProcedure
    .input(
      z.object({
        subscription: z.object({
          endpoint: z.string(),
          keys: z.object({
            p256dh: z.string(),
            auth: z.string(),
          }),
        }),
      })
    )
    .mutation(({ input, ctx }) => {
      const { subscription } = input;

      // setTimeout(() => {
      //   WebPush.sendNotification(subscription, "Hello from backend");
      // }, 5000);

      WebPush.sendNotification(subscription, "Hello from backend");

      ctx.res.status(201);
    }),
});
