import type { Metrics } from "@/lib/metrics";

export const ENGINE_URL = "https://nexusbert-heart.hf.space";

export type Mode = "predict" | "analyze";

export type PredictResult = {
  kind: "predict";
  clinical_report: string;
  upstream_findings: {
    gemma_ecg?: string;
    tabfm_risk?: number;
    tabfm_label?: string;
    engineered_metrics?: Record<string, number>;
    [key: string]: unknown;
  };
  raw: unknown;
};

export type AnalyzeResult = {
  kind: "analyze";
  ecg_report: string;
  raw_visual_findings: string;
  raw: unknown;
};

export type DiagnosisResult = PredictResult | AnalyzeResult;

export type EngineHealth = {
  ok: boolean;
  status?: number;
  latencyMs: number;
};

export class EngineError extends Error {
  status: number;
  constructor(message: string, status = 500) {
    super(message);
    this.name = "EngineError";
    this.status = status;
  }
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : value == null ? "" : String(value);
}

function parseBody(text: string): unknown {
  const trimmed = text.trim();
  if (!trimmed) return {};
  try {
    return JSON.parse(trimmed);
  } catch {
    return { text: trimmed };
  }
}

function detailMessage(payload: unknown, fallback: string): string {
  const rec = asRecord(payload);
  if (!rec) return fallback;
  if (typeof rec.error === "string" && rec.error) return rec.error;
  if (typeof rec.message === "string" && rec.message) return rec.message;
  const detail = rec.detail;
  if (typeof detail === "string" && detail) return detail;
  if (Array.isArray(detail) && detail.length > 0) {
    return detail
      .map((item) => {
        const row = asRecord(item);
        return row && typeof row.msg === "string" ? row.msg : String(item);
      })
      .join(" ");
  }
  return fallback;
}

export function normalizeRiskPercent(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  const pct = value <= 1 && value >= 0 ? value * 100 : value;
  return Math.max(0, Math.min(100, pct));
}

export function parsePredict(payload: unknown): PredictResult {
  const rec = asRecord(payload) ?? {};
  const upstream = asRecord(rec.upstream_findings) ?? {};
  const report =
    asString(rec.clinical_report) ||
    asString(rec.report) ||
    asString(rec.ecg_report) ||
    (typeof payload === "string" ? payload : "");
  return {
    kind: "predict",
    clinical_report: report,
    upstream_findings: {
      gemma_ecg: asString(upstream.gemma_ecg) || undefined,
      tabfm_risk: typeof upstream.tabfm_risk === "number" ? upstream.tabfm_risk : undefined,
      tabfm_label: asString(upstream.tabfm_label) || undefined,
      engineered_metrics: asRecord(upstream.engineered_metrics) as Record<string, number> | undefined,
      ...upstream,
    },
    raw: payload,
  };
}

export function parseAnalyze(payload: unknown): AnalyzeResult {
  const rec = asRecord(payload) ?? {};
  return {
    kind: "analyze",
    ecg_report: asString(rec.ecg_report) || asString(rec.clinical_report) || asString(rec.report),
    raw_visual_findings: asString(rec.raw_visual_findings) || asString(rec.gemma_ecg),
    raw: payload,
  };
}

async function postForm(path: string, form: FormData, signal: AbortSignal): Promise<unknown> {
  const res = await fetch(path, {
    method: "POST",
    body: form,
    signal,
    headers: { Accept: "application/json" },
  });
  const text = await res.text();
  const payload = parseBody(text);
  if (!res.ok) {
    throw new EngineError(
      detailMessage(
        payload,
        res.status === 504
          ? "The diagnostic engine timed out before BioMistral finished the note. Wait a moment, then try once — do not stack retries."
          : res.status === 502 || res.status === 503
            ? "The diagnostic engine is waking or unreachable. Wait a moment and retry."
            : `Engine returned ${res.status}.`,
      ),
      res.status,
    );
  }
  return payload;
}

export async function runPredict(
  file: File,
  metrics: Metrics,
  signal: AbortSignal,
): Promise<PredictResult> {
  const form = new FormData();
  form.set("metrics", JSON.stringify(metrics));
  form.set("file", file, file.name || "ecg.jpg");
  return parsePredict(await postForm("/api/predict", form, signal));
}

export async function runAnalyze(file: File, signal: AbortSignal): Promise<AnalyzeResult> {
  const form = new FormData();
  form.set("file", file, file.name || "ecg.jpg");
  return parseAnalyze(await postForm("/api/analyze-ecg", form, signal));
}

export async function fetchEngineHealth(): Promise<EngineHealth> {
  try {
    const res = await fetch("/api/health", { method: "GET" });
    const payload = asRecord(await res.json());
    return {
      ok: Boolean(payload?.ok),
      status: typeof payload?.status === "number" ? payload.status : undefined,
      latencyMs: typeof payload?.latencyMs === "number" ? payload.latencyMs : 0,
    };
  } catch {
    return { ok: false, latencyMs: 0 };
  }
}

export async function loadSampleEcg(): Promise<File> {
  const res = await fetch("/sample-ecg.jpg");
  if (!res.ok) throw new Error("Could not load the sample tracing.");
  const blob = await res.blob();
  return new File([blob], "sample-12-lead-ecg.jpg", { type: "image/jpeg" });
}
