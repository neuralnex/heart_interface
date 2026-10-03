import { createFileRoute } from "@tanstack/react-router";
import { proxyToEngine } from "@/lib/engine-proxy";

export const Route = createFileRoute("/api/predict")({
  server: {
    handlers: {
      POST: async ({ request }) => proxyToEngine("/predict", request),
    },
  },
});
