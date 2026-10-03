import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

function sample(t: number) {
  const rr = 0.86;
  const phase = ((t % rr) + rr) % rr - 0.16;
  let v = 0;
  v += 0.12 * Math.exp(-((phase + 0.18) ** 2) / (2 * 0.016 ** 2));
  v += -0.1 * Math.exp(-((phase + 0.03) ** 2) / (2 * 0.006 ** 2));
  v += 1.05 * Math.exp(-(phase ** 2) / (2 * 0.007 ** 2));
  v += -0.28 * Math.exp(-((phase - 0.032) ** 2) / (2 * 0.01 ** 2));
  v += 0.28 * Math.exp(-((phase - 0.2) ** 2) / (2 * 0.038 ** 2));
  return v;
}

export function Waveform({
  className,
  running = true,
  accent = false,
}: {
  className?: string;
  running?: boolean;
  accent?: boolean;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const gridRef = useRef<SVGPathElement>(null);
  const pathRef = useRef<SVGPolylineElement>(null);
  const headRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    const grid = gridRef.current;
    const path = pathRef.current;
    const head = headRef.current;
    if (!svg || !grid || !path || !head) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let elapsed = 1.6;
    let last = performance.now();

    const paint = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      if (running && !reduce) elapsed += dt / 1000;

      const w = Math.max(32, svg.clientWidth);
      const h = Math.max(24, svg.clientHeight);
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

      const step = 16;
      let gridD = "";
      for (let x = 0; x <= w; x += step) gridD += `M${x} 0 V${h} `;
      for (let y = 0; y <= h; y += step) gridD += `M0 ${y} H${w} `;
      grid.setAttribute("d", gridD.trim());

      const mid = h * 0.58;
      const amp = h * 0.32;
      const windowSec = 2.4;
      const n = Math.max(2, Math.floor(w));
      const pts: string[] = [];
      for (let i = 0; i <= n; i++) {
        const x = (i / n) * w;
        const t = elapsed - windowSec + (i / n) * windowSec;
        const y = mid - sample(t) * amp;
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      path.setAttribute("points", pts.join(" "));
      head.setAttribute("cx", String(w - 8));
      head.setAttribute("cy", String(mid - sample(elapsed) * amp));
      head.setAttribute("opacity", running && !reduce ? "1" : "0");

      if (running && !reduce) raf = requestAnimationFrame(paint);
    };

    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, [running, accent]);

  const stroke = accent ? "var(--color-primary-foreground)" : "var(--color-ecg)";
  const grid = accent ? "rgb(247 243 234 / 0.12)" : "var(--color-gridline)";

  return (
    <svg ref={svgRef} className={cn("h-full w-full", className)} aria-hidden preserveAspectRatio="none">
      <path ref={gridRef} fill="none" stroke={grid} strokeWidth="1" />
      <polyline ref={pathRef} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <circle ref={headRef} r="3" fill={stroke} />
    </svg>
  );
}
