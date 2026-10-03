import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const t0 = Date.now();
        try {
          const res = await fetch("https://nexusbert-heart.hf.space/openapi.json", {
            method: "GET",
            signal: AbortSignal.timeout(12_000),
          });
          return Response.json({
            ok: res.ok,
            status: res.status,
            latencyMs: Date.now() - t0,
          });
        } catch {
          return Response.json({ ok: false, latencyMs: Date.now() - t0 });
        }
      },
    },
  },
});
