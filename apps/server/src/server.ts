import * as trpcExpress from "@trpc/server/adapters/express";
import express from "express";
import { createContext } from "./lib/trpc";
import { appRouter } from "./routers/_app";
import cors from "cors";
import cookieParser from "cookie-parser";

import * as dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(
  "/api",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(3001, "0.0.0.0", () => {
  console.log(`HTTP Server running on http://localhost:3001`);
});
