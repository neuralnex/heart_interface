import { createFileRoute } from "@tanstack/react-router";
import { proxyToEngine } from "@/lib/engine-proxy";

export const Route = createFileRoute("/api/analyze-ecg")({
  server: {
    handlers: {
      POST: async ({ request }) => proxyToEngine("/analyze-ecg", request),
    },
  },
});
