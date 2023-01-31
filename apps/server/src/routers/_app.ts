import { router } from "../lib/trpc";

import { habitsRouter } from "./habits";
import { notificationRouter } from "./notifications";
import { usersRouter } from "./users";

export const appRouter = router({
  users: usersRouter,
  habits: habitsRouter,
  notifications: notificationRouter,
});

export type AppRouter = typeof appRouter;
