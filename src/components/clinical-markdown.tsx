import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const SECTION_LABELS = [
  "Visual Analysis",
  "Clinical Interpretation",
  "Clinical Synthesis",
  "Recommendations",
  "Impression",
  "Assessment",
  "Plan",
  "Findings",
  "Diagnosis",
  "Summary",
  "Concurrence",
  "Risk Assessment",
];

function inlineFormat(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith("*") && part.endsWith("*")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    if (part.startsWith("`") && part.endsWith("`")) {
      return (
        <code key={i} className="rounded-sm bg-secondary px-1 py-0.5 font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderBlocks(source: string) {
  const lines = source.replace(/\r\n/g, "\n").split("\n");
  const nodes: ReactNode[] = [];
  let buffer: string[] = [];
  let list: { ordered: boolean; items: string[] } | null = null;
  let key = 0;

  const flushP = () => {
    const text = buffer.join(" ").trim();
    buffer = [];
    if (!text) return;
    nodes.push(
      <p key={key++} className="text-pretty">
        {inlineFormat(text)}
      </p>,
    );
  };

  const flushList = () => {
    if (!list || list.items.length === 0) return;
    const Tag = list.ordered ? "ol" : "ul";
    nodes.push(
      <Tag key={key++} className={list.ordered ? "list-decimal" : "list-disc"}>
        {list.items.map((item, i) => (
          <li key={i}>{inlineFormat(item)}</li>
        ))}
      </Tag>,
    );
    list = null;
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) {
      flushP();
      flushList();
      continue;
    }
    const heading = /^(#{1,3})\s+(.+)$/.exec(line);
    if (heading) {
      flushP();
      flushList();
      const level = heading[1].length;
      const Tag = (level === 1 ? "h2" : "h3") as "h2" | "h3";
      nodes.push(
        <Tag key={key++} className={level === 1 ? "font-display text-xl font-semibold tracking-tight" : undefined}>
          {heading[2]}
        </Tag>,
      );
      continue;
    }
    const ul = /^[-*]\s+(.+)$/.exec(line);
    if (ul) {
      flushP();
      if (!list || list.ordered) {
        flushList();
        list = { ordered: false, items: [] };
      }
      list.items.push(ul[1]);
      continue;
    }
    const ol = /^\d+[.)]\s+(.+)$/.exec(line);
    if (ol) {
      flushP();
      if (!list || !list.ordered) {
        flushList();
        list = { ordered: true, items: [] };
      }
      list.items.push(ol[1]);
      continue;
    }
    flushList();
    buffer.push(line);
  }
  flushP();
  flushList();
  return nodes;
}

function splitLabeled(source: string) {
  const re = new RegExp(`(?:^|\\n)\\s*(${SECTION_LABELS.join("|")})\\s*[:\\-–]\\s*`, "gi");
  const matches = [...source.matchAll(re)];
  if (matches.length === 0) return null;
  const sections: { title: string; body: string }[] = [];
  const lead = source.slice(0, matches[0].index).trim();
  if (lead) sections.push({ title: "Overview", body: lead });
  matches.forEach((match, i) => {
    const start = (match.index ?? 0) + match[0].length;
    const end = i + 1 < matches.length ? (matches[i + 1].index ?? source.length) : source.length;
    sections.push({ title: match[1], body: source.slice(start, end).trim() });
  });
  return sections.filter((s) => s.body);
}

export function ClinicalMarkdown({ text, className }: { text: string; className?: string }) {
  if (!text?.trim()) {
    return <p className="text-sm text-muted-foreground">No narrative was returned.</p>;
  }

  if (/^#{1,3}\s/m.test(text)) {
    return <div className={cn("report-prose", className)}>{renderBlocks(text)}</div>;
  }

  const labeled = splitLabeled(text);
  if (labeled && labeled.length > 1) {
    return (
      <div className={cn("grid gap-4", className)}>
        {labeled.map((section) => (
          <section key={section.title} className="rounded-lg bg-secondary/50 p-4">
            <h3 className="font-display text-base font-semibold tracking-tight">{section.title}</h3>
            <div className="report-prose mt-1">{renderBlocks(section.body)}</div>
          </section>
        ))}
      </div>
    );
  }

  return <div className={cn("report-prose", className)}>{renderBlocks(text)}</div>;
}
