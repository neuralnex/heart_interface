import { useEffect, useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Activity, AlertCircle, Clock3, HeartPulse } from "lucide-react";
import { toast } from "sonner";
import { EcgDropzone } from "@/components/ecg-dropzone";
import { MetricsForm } from "@/components/metrics-form";
import { PipelineProgress } from "@/components/pipeline-progress";
import { ReportView } from "@/components/report-view";
import { Waveform } from "@/components/waveform";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  EngineError,
  fetchEngineHealth,
  loadSampleEcg,
  runAnalyze,
  runPredict,
  type DiagnosisResult,
  type EngineHealth,
  type Mode,
} from "@/lib/api";
import { SAMPLE_HIGH_RISK, SAMPLE_LOW_RISK, validateMetrics, type Metrics } from "@/lib/metrics";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [mode, setMode] = useState<Mode>("predict");
  const [metrics, setMetrics] = useState<Metrics>(SAMPLE_HIGH_RISK);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "running" | "success" | "error">("idle");
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [health, setHealth] = useState<EngineHealth | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const startedAt = useRef(0);

  useEffect(() => {
    let cancelled = false;
    void fetchEngineHealth().then((h) => {
      if (!cancelled) setHealth(h);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const id = window.setInterval(() => setElapsed(Date.now() - startedAt.current), 250);
    return () => window.clearInterval(id);
  }, [status]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const running = status === "running";

  const applySample = async (next: Metrics) => {
    setMetrics(next);
    try {
      setFile(await loadSampleEcg());
      toast.message("Sample case loaded");
    } catch {
      toast.error("Could not load the sample tracing");
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
    abortRef.current = null;
    setStatus("idle");
    setElapsed(0);
  };

  const submit = async () => {
    if (!file) {
      setError("Attach a 12-lead ECG image first.");
      setStatus("error");
      return;
    }
    if (mode === "predict") {
      const issues = validateMetrics(metrics);
      if (issues.length) {
        setError(issues[0]);
        setStatus("error");
        return;
      }
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    startedAt.current = Date.now();
    setElapsed(0);
    setError(null);
    setResult(null);
    setStatus("running");

    try {
      const next =
        mode === "predict"
          ? await runPredict(file, metrics, controller.signal)
          : await runAnalyze(file, controller.signal);
      setResult(next);
      setStatus("success");
    } catch (err) {
      if (controller.signal.aborted) {
        setStatus("idle");
        return;
      }
      const message =
        err instanceof EngineError
          ? err.message
          : err instanceof Error
            ? err.message
            : "The diagnostic engine failed.";
      setError(message);
      setStatus("error");
    }
  };

  return (
    <div className="min-h-dvh">
      <header className="no-print border-b border-ink/10 bg-ink text-primary-foreground">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground">
              <HeartPulse className="size-5" />
            </span>
            <div>
              <p className="font-display text-xl font-semibold tracking-tight">Atria</p>
              <p className="text-xs text-primary-foreground/65">Heart disease diagnostic console</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="bg-primary-foreground/10 text-primary-foreground border-transparent">
              GemmaECG · TabFM · BioMistral
            </Badge>
            <EnginePill health={health} />
          </div>
        </div>
        <div className="h-10 overflow-hidden opacity-80">
          <Waveform running={!running} accent />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:py-8">
        <aside className="no-print grid gap-5 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight">Intake</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Two paths: a full multimodal read, or a rapid ECG-only report. ECG-only often needs about a minute. The full
              pipeline keeps a 7-minute safety window, but BioMistral writes the note on Groq so a warm engine should finish much sooner.
            </p>
          </div>

          <Tabs
            value={mode}
            onValueChange={(v) => {
              if (running) return;
              setMode(v as Mode);
            }}
          >
            <TabsList>
              <TabsTrigger value="predict">Full pipeline</TabsTrigger>
              <TabsTrigger value="analyze">ECG only</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="flex flex-wrap gap-2">
            <Button type="button" variant="outline" size="sm" disabled={running} onClick={() => void applySample(SAMPLE_HIGH_RISK)}>
              High-risk sample
            </Button>
            <Button type="button" variant="outline" size="sm" disabled={running} onClick={() => void applySample(SAMPLE_LOW_RISK)}>
              Low-risk sample
            </Button>
          </div>

          <EcgDropzone
            file={file}
            onFile={setFile}
            disabled={running}
            onLoadSample={async () => setFile(await loadSampleEcg())}
          />

          {mode === "predict" ? <MetricsForm value={metrics} onChange={setMetrics} disabled={running} /> : null}

          <Separator />

          {running ? (
            <Button type="button" variant="outline" onClick={cancel}>
              Cancel
            </Button>
          ) : (
            <Button type="button" size="lg" className="w-full" onClick={() => void submit()}>
              {mode === "predict" ? "Run full diagnosis" : "Analyze ECG"}
            </Button>
          )}
          <p className="text-xs text-muted-foreground">
            Research assistant only. Findings are not a diagnosis and must be reviewed by a clinician.
          </p>
        </aside>

        <section className="rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-6 print-sheet">
          {status === "running" ? (
            <PipelineProgress mode={mode} elapsedMs={elapsed} />
          ) : status === "success" && result ? (
            <ReportView result={result} />
          ) : status === "error" ? (
            <ErrorPanel message={error} onRetry={() => void submit()} />
          ) : (
            <EmptyState mode={mode} hasFile={Boolean(file)} />
          )}
        </section>
      </main>
    </div>
  );
}

function EnginePill({ health }: { health: EngineHealth | null }) {
  if (!health) {
    return (
      <Badge variant="outline" className="border-primary-foreground/20 text-primary-foreground/80">
        Engine…
      </Badge>
    );
  }
  return (
    <Badge
      variant="outline"
      className={
        health.ok
          ? "border-primary-foreground/20 text-primary-foreground"
          : "border-risk-high/40 text-primary-foreground"
      }
    >
      <span className={health.ok ? "mr-1.5 size-1.5 rounded-full bg-risk-low" : "mr-1.5 size-1.5 rounded-full bg-risk-mid"} />
      {health.ok ? "Engine reachable" : "Engine waking"}
    </Badge>
  );
}

function EmptyState({ mode, hasFile }: { mode: Mode; hasFile: boolean }) {
  return (
    <div className="grid min-h-80 place-content-center gap-4 py-8 text-center">
      <div className="mx-auto overflow-hidden rounded-xl bg-ecg-paper">
        <div className="h-28 w-full max-w-lg">
          <Waveform running />
        </div>
      </div>
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-2xl font-semibold tracking-tight">
          {hasFile ? "Ready to run" : "Waiting for a tracing"}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {hasFile
            ? mode === "predict"
              ? "The tracing is attached. Confirm the chart on the left, then run the full diagnosis. GemmaECG and TabFM use the GPU. BioMistral writes the note on Groq."
              : "The tracing is attached. Analyze ECG to generate a cardiology-style report — typically 45–90 seconds, longer if the GPU is waking."
            : mode === "predict"
              ? "Upload a 12-lead ECG and keep the chart on the left. GemmaECG-Vision and TabFM run on the GPU. BioMistral writes the report on Groq."
              : "Upload a 12-lead ECG. GemmaECG-Vision extracts findings; BioMistral turns them into a structured cardiology note."}
        </p>
      </div>
      <ul className="mx-auto grid max-w-md gap-2 text-left text-sm text-muted-foreground">
        <li className="flex gap-2">
          <Activity className="mt-0.5 size-4 shrink-0 text-primary" />
          Typical ECG-only reads take 45–90 seconds.
        </li>
        <li className="flex gap-2">
          <Clock3 className="mt-0.5 size-4 shrink-0 text-primary" />
          The full pipeline waits up to 7 minutes, but a warm run should return well before that.
        </li>
      </ul>
    </div>
  );
}

function ErrorPanel({ message, onRetry }: { message: string | null; onRetry: () => void }) {
  return (
    <div className="grid min-h-72 place-content-center gap-4 py-10 text-center">
      <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
        <AlertCircle className="size-6" />
      </span>
      <div className="mx-auto max-w-md">
        <h2 className="font-display text-2xl font-semibold tracking-tight">The engine did not finish</h2>
        <p className="mt-2 text-sm text-muted-foreground">{message || "Unexpected error."}</p>
      </div>
      <Button type="button" onClick={onRetry} className="mx-auto">
        Retry
      </Button>
    </div>
  );
}
