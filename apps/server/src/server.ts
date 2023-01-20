import fastify from "fastify";
import cors from "@fastify/cors";
import { appRoutes } from "./lib/routes";

const app = fastify();

app.register(cors);
app.register(appRoutes);

app.listen({ port: 3001, host: "10.0.0.104" }).then(() => {
  console.log(`HTTP Server running on http://localhost:3001`);
});
