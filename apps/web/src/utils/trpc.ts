// utils/trpc.ts
import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "../../../server/src/routers/_app";

export const trpc = createTRPCReact<AppRouter>();
