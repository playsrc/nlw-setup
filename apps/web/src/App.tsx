import "./lib/dayjs";
import "./styles/global.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { trpc } from "./utils/trpc";

// navigator.serviceWorker
//   .register("service-worker.js")
//   .then(async (serviceWorker) => {
//     let subscription = await serviceWorker.pushManager.getSubscription();

//     if (!subscription) {
//       const publicKeyResponse = await api.get("/push/public_key");

//       subscription = await serviceWorker.pushManager.subscribe({
//         userVisibleOnly: true,
//         applicationServerKey: publicKeyResponse.data.publicKey,
//       });
//     }

//     await api.post("/push/register", {
//       subscription,
//     });

//     await api.post("/push/send", {
//       subscription,
//     });
//   });

export function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3001/api",
        }),
      ],
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="w-full max-w-5xl px-6 flex flex-col gap-16">
            <Header />
            <SummaryTable />
          </div>
        </div>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
