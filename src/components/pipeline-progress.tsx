import { Check, LoaderCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Waveform } from "@/components/waveform";
import { formatElapsed } from "@/lib/utils";
import type { Mode } from "@/lib/api";

type Stage = { at: number; label: string; detail: string };

const PREDICT_STAGES: Stage[] = [
  { at: 0, label: "Upload", detail: "Sending the tracing and the clinical chart." },
  { at: 4, label: "GemmaECG-Vision", detail: "Reading 12-lead morphology on the GPU." },
  { at: 18, label: "Google TabFM", detail: "In-context risk from labs, vitals, and history." },
  { at: 28, label: "BioMistral", detail: "One Groq call writes the note. The 7B weights stay off the GPU." },
];

const ANALYZE_STAGES: Stage[] = [
  { at: 0, label: "Upload", detail: "Sending the 12-lead image to the vision stack." },
  { at: 8, label: "GemmaECG-Vision", detail: "Extracting rhythm, QRS, ST, and axis findings." },
  { at: 35, label: "BioMistral", detail: "Turning raw findings into a cardiology-style report via Groq." },
  { at: 75, label: "Review pass", detail: "Still generating — large models often need 45–90 seconds." },
];

function activeIndex(stages: Stage[], elapsedSec: number) {
  let idx = 0;
  for (let i = 0; i < stages.length; i++) {
    if (elapsedSec >= stages[i].at) idx = i;
  }
  return idx;
}

export function PipelineProgress({ mode, elapsedMs }: { mode: Mode; elapsedMs: number }) {
  const stages = mode === "predict" ? PREDICT_STAGES : ANALYZE_STAGES;
  const elapsedSec = elapsedMs / 1000;
  const current = activeIndex(stages, elapsedSec);
  const expected = 70;
  const pct = Math.min(92, (elapsedSec / expected) * 100);

  return (
    <div className="grid gap-5">
      <div className="overflow-hidden rounded-xl bg-ecg-paper">
        <div className="h-28">
          <Waveform running accent={false} />
        </div>
      </div>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-display text-xl font-semibold tracking-tight">Reading the heart</p>
          <p className="text-sm text-muted-foreground">
            {mode === "predict"
              ? "Full pipeline — vision and tabular risk on the GPU, then BioMistral on Groq."
              : "ECG-only path — vision extraction, then a structured report."}
          </p>
        </div>
        <p className="font-mono text-sm tabular-nums text-muted-foreground">
          {formatElapsed(elapsedMs)}
          {mode === "predict" ? " / 7:00" : ""}
        </p>
      </div>
      <Progress value={pct} />
      <ol className="grid gap-3">
        {stages.map((stage, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={stage.label} className="flex gap-3">
              <span
                className={
                  done
                    ? "mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
                    : active
                      ? "mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/15 text-primary"
                      : "mt-0.5 flex size-6 items-center justify-center rounded-full bg-secondary text-muted-foreground"
                }
              >
                {done ? <Check className="size-3.5" /> : active ? <LoaderCircle className="size-3.5 animate-spin" /> : null}
              </span>
              <div>
                <p className={active ? "text-sm font-medium" : "text-sm text-muted-foreground"}>{stage.label}</p>
                <p className="text-xs text-muted-foreground">{stage.detail}</p>
              </div>
            </li>
          );
        })}
      </ol>
      {elapsedSec > 20 ? (
        <p className="text-xs text-muted-foreground">
          {mode === "predict" && elapsedSec > 90
            ? "Still writing the note. Leave this tab open — the safety window is 7 minutes. Refreshing starts the GPU job over."
            : "The ECG model may still be loading if the engine was idle. BioMistral itself is a short Groq call."}
        </p>
      ) : null}
    </div>
  );
}
