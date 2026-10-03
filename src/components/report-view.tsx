import { Copy, Printer } from "lucide-react";
import { toast } from "sonner";
import { ClinicalMarkdown } from "@/components/clinical-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { normalizeRiskPercent, type DiagnosisResult } from "@/lib/api";
import { cn } from "@/lib/utils";

function riskVariant(label?: string, pct?: number | null) {
  const l = (label ?? "").toLowerCase();
  if (l.includes("high") || (pct ?? 0) >= 70) return "high" as const;
  if (l.includes("low") || (pct ?? 100) <= 30) return "low" as const;
  return "mid" as const;
}

function RiskDial({ value, label }: { value: number; label?: string }) {
  const r = 54;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const variant = riskVariant(label, value);
  const color =
    variant === "high" ? "var(--color-risk-high)" : variant === "low" ? "var(--color-risk-low)" : "var(--color-risk-mid)";

  return (
    <div className="flex items-center gap-4">
      <svg viewBox="0 0 140 140" className="size-28 shrink-0" aria-hidden>
        <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-secondary)" strokeWidth="10" />
        <circle
          cx="70"
          cy="70"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 70 70)"
        />
        <text
          x="70"
          y="74"
          textAnchor="middle"
          className="tabular-nums"
          fontSize="28"
          fontWeight="600"
          fill="currentColor"
        >
          {Math.round(value)}
        </text>
      </svg>
      <div>
        <p className="text-xs tracking-wide text-muted-foreground uppercase">TabFM risk</p>
        <div className="mt-1 flex items-center gap-2">
          <p className="font-display text-2xl font-semibold tracking-tight">{label || "Unlabeled"}</p>
          <Badge variant={variant}>{Math.round(value)}%</Badge>
        </div>
        <p className="mt-1 max-w-xs text-sm text-muted-foreground">
          Statistical estimate from the tabular foundation model, not a diagnosis.
        </p>
      </div>
    </div>
  );
}

function toMarkdown(result: DiagnosisResult) {
  if (result.kind === "analyze") {
    return `# ECG analysis\n\n${result.ecg_report}\n\n## Raw visual findings\n\n${result.raw_visual_findings}\n`;
  }
  const up = result.upstream_findings;
  return `# Clinical report\n\n${result.clinical_report}\n\n## Upstream findings\n\n- TabFM: ${up.tabfm_label ?? "—"} (${up.tabfm_risk ?? "—"})\n- GemmaECG-Vision: ${up.gemma_ecg ?? "—"}\n`;
}

export function ReportView({ result }: { result: DiagnosisResult }) {
  const risk = result.kind === "predict" ? normalizeRiskPercent(result.upstream_findings.tabfm_risk) : null;
  const engineered =
    result.kind === "predict" && result.upstream_findings.engineered_metrics
      ? Object.entries(result.upstream_findings.engineered_metrics)
      : [];

  return (
    <article className="print-sheet grid gap-6">
      <div className="flex flex-wrap items-start justify-between gap-3 no-print">
        <div>
          <p className="text-xs tracking-wide text-muted-foreground uppercase">
            {result.kind === "predict" ? "Holistic multimodal diagnosis" : "Specialized ECG analysis"}
          </p>
          <h2 className="font-display text-2xl font-semibold tracking-tight">Clinical report</h2>
        </div>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={async () => {
              await navigator.clipboard.writeText(toMarkdown(result));
              toast.success("Report copied");
            }}
          >
            <Copy />
            Copy
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={() => window.print()}>
            <Printer />
            Print
          </Button>
        </div>
      </div>

      {result.kind === "predict" && risk !== null ? (
        <div className="rounded-xl bg-secondary/50 p-5">
          <RiskDial value={risk} label={result.upstream_findings.tabfm_label} />
        </div>
      ) : null}

      <ClinicalMarkdown
        text={result.kind === "predict" ? result.clinical_report : result.ecg_report}
        className="text-sm"
      />

      {result.kind === "predict" && result.upstream_findings.gemma_ecg ? (
        <>
          <Separator />
          <section>
            <h3 className="font-display text-lg font-semibold tracking-tight">GemmaECG-Vision</h3>
            <p className="mt-2 text-sm leading-relaxed text-pretty">{result.upstream_findings.gemma_ecg}</p>
          </section>
        </>
      ) : null}

      {result.kind === "analyze" && result.raw_visual_findings ? (
        <>
          <Separator />
          <section>
            <h3 className="font-display text-lg font-semibold tracking-tight">Raw visual findings</h3>
            <p className="mt-2 text-sm leading-relaxed text-pretty">{result.raw_visual_findings}</p>
          </section>
        </>
      ) : null}

      {engineered.length > 0 ? (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {engineered.map(([key, val]) => (
            <div key={key} className="rounded-lg bg-secondary/50 px-3 py-2">
              <p className="text-xs text-muted-foreground">{key.replaceAll("_", " ")}</p>
              <p className="font-mono text-sm tabular-nums">
                {typeof val === "number" ? val.toFixed(val > 10 ? 1 : 3) : String(val)}
              </p>
            </div>
          ))}
        </div>
      ) : null}

      <p className={cn("text-xs text-muted-foreground")}>
        Assistive research output. Not a medical diagnosis, and not a substitute for a licensed clinician.
      </p>
    </article>
  );
}
