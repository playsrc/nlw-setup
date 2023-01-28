import { router } from "../lib/trpc";

import { habitsRouter } from "./habits";
import { notificationRouter } from "./notifications";

export const appRouter = router({
  habits: habitsRouter,
  notifications: notificationRouter,
});

export type AppRouter = typeof appRouter;
