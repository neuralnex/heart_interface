const UPSTREAM = "https://nexusbert-heart.hf.space";
const DEADLINE_MS = {
  "/predict": 420_000,
  "/analyze-ecg": 180_000,
} as const;
const RETRY_STATUSES = new Set([502, 503, 504]);

function sleep(ms: number, signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    if (signal.aborted) {
      reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      return;
    }
    const t = setTimeout(resolve, ms);
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(t);
        reject(signal.reason ?? new DOMException("Aborted", "AbortError"));
      },
      { once: true },
    );
  });
}

function buildForm(file: File, metrics?: string) {
  const outbound = new FormData();
  outbound.set("file", file, file.name || "ecg.jpg");
  if (metrics) outbound.set("metrics", metrics);
  return outbound;
}

export async function proxyToEngine(path: "/predict" | "/analyze-ecg", incoming: Request): Promise<Response> {
  const form = await incoming.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "An ECG image file is required." }, { status: 400 });
  }

  const metrics = path === "/predict" ? form.get("metrics") : null;
  if (path === "/predict" && (typeof metrics !== "string" || !metrics.trim())) {
    return Response.json({ error: "Patient metrics JSON is required." }, { status: 400 });
  }

  const deadline = DEADLINE_MS[path];
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), deadline);
  incoming.signal.addEventListener("abort", () => controller.abort(), { once: true });

  const maxAttempts = path === "/predict" ? 1 : 3;
  try {
    let lastStatus = 502;
    let lastBody = "";
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (attempt > 0) {
        await sleep(7000 * attempt, controller.signal);
      }
      const outbound = buildForm(file, typeof metrics === "string" ? metrics : undefined);
      let res: Response;
      try {
        res = await fetch(`${UPSTREAM}${path}`, {
          method: "POST",
          body: outbound,
          signal: controller.signal,
          headers: { Accept: "application/json" },
        });
      } catch (err) {
        if (controller.signal.aborted) {
          return Response.json(
            {
              error:
                path === "/predict"
                  ? "The diagnostic engine did not finish within seven minutes. The GPU may still be busy — retry shortly."
                  : "The ECG analysis did not finish within three minutes. The GPU may still be waking — retry shortly.",
            },
            { status: 504 },
          );
        }
        lastBody = err instanceof Error ? err.message : "Network error";
        lastStatus = 502;
        continue;
      }

      const text = await res.text();
      if (res.ok) {
        return new Response(text, {
          status: 200,
          headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
        });
      }
      lastStatus = res.status;
      lastBody = text;
      if (!RETRY_STATUSES.has(res.status)) {
        return new Response(text || JSON.stringify({ error: `Engine returned ${res.status}` }), {
          status: res.status,
          headers: { "content-type": res.headers.get("content-type") ?? "application/json" },
        });
      }
    }
    return new Response(lastBody || JSON.stringify({ error: "Diagnostic engine unavailable." }), {
      status: lastStatus,
      headers: { "content-type": "application/json" },
    });
  } finally {
    clearTimeout(timer);
  }
}
