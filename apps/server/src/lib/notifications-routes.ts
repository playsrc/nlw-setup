import { FastifyInstance } from "fastify";
import WebPush from "web-push";
import { z } from "zod";

const privateKey = "J0o7Jhy24Se18uKlzIgKQiqoUG2ucfTKZcRly1ez9ng";
const publicKey =
  "BHaAgL5vUWS4kTRBPd1wn2-C_MkEVL_Y0nOugQ8IUYylKvHUwFADn9oqnLQ50oEVrV8jvBrvH5yGd6hfjyfkW5o";

WebPush.setVapidDetails("https://localhost:3001", publicKey, privateKey);

export async function notificationRoutes(app: FastifyInstance) {
  app.get("/push/public_key", () => {
    return {
      publicKey,
    };
  });

  app.post("/push/register", async (request, reply) => {
    console.log(request.body);

    return reply.status(201).send();
  });

  app.post("/push/send", async (request, reply) => {
    const sendPushBody = z.object({
      subscription: z.object({
        endpoint: z.string(),
        keys: z.object({
          p256dh: z.string(),
          auth: z.string(),
        }),
      }),
    });

    const { subscription } = sendPushBody.parse(request.body);

    // setTimeout(() => {
    //   WebPush.sendNotification(subscription, "Hello from backend");
    // }, 5000);

    WebPush.sendNotification(subscription, "Hello from backend");

    return reply.status(201).send();
  });
}
