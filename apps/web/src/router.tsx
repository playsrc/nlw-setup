import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";
import { trpc } from "./utils/trpc";

import Home from "./pages/Home";
import Login from "./pages/Login";
import App from "./pages/App";
import Register from "./pages/Register";

export default function Router() {
  const token = localStorage.getItem("token");
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3001/api",
          headers() {
            if (token) {
              return {
                Authorization: token,
              };
            }
            return {};
          },
        }),
      ],
    })
  );

  // const hasAuth = trpc.users.me.useQuery();
  // console.log(hasAuth);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/app"
              element={
                <ProtectedRoute>
                  <App />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<h1>404 - Página inexistente.</h1>} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const hasAuth = trpc.users.me.useQuery().isSuccess;
  console.log(hasAuth);
  if (!hasAuth) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}
