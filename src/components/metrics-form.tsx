import type { ReactNode } from "react";
import { FIELD_GROUPS, joinBloodPressure, parseBloodPressure, type FieldDef, type Metrics } from "@/lib/metrics";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function FieldShell({ field, children }: { field: FieldDef; children: ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={field.key} className="text-xs text-muted-foreground">
        {field.label}
        {field.unit ? <span className="ml-1 font-normal">({field.unit})</span> : null}
      </Label>
      {children}
      {field.hint ? <p className="text-xs text-muted-foreground">{field.hint}</p> : null}
    </div>
  );
}

function FieldControl({
  field,
  value,
  disabled,
  onChange,
}: {
  field: FieldDef;
  value: Metrics[keyof Metrics];
  disabled?: boolean;
  onChange: (key: keyof Metrics, value: string | number) => void;
}) {
  if (field.kind === "select") {
    return (
      <FieldShell field={field}>
        <Select value={String(value)} disabled={disabled} onValueChange={(v) => onChange(field.key, v)}>
          <SelectTrigger id={field.key} className="bg-card">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(field.options ?? []).map((opt) => (
              <SelectItem key={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FieldShell>
    );
  }

  if (field.kind === "bp") {
    const { sys, dia } = parseBloodPressure(String(value));
    return (
      <FieldShell field={field}>
        <div className="grid grid-cols-2 gap-2">
          <Input
            id={field.key}
            inputMode="numeric"
            value={sys}
            disabled={disabled}
            placeholder="Sys"
            onChange={(e) => onChange(field.key, joinBloodPressure(e.target.value.replace(/[^\d]/g, ""), dia))}
          />
          <Input
            inputMode="numeric"
            value={dia}
            disabled={disabled}
            placeholder="Dia"
            onChange={(e) => onChange(field.key, joinBloodPressure(sys, e.target.value.replace(/[^\d]/g, "")))}
          />
        </div>
      </FieldShell>
    );
  }

  return (
    <FieldShell field={field}>
      <Input
        id={field.key}
        type="number"
        inputMode="decimal"
        min={field.min}
        max={field.max}
        step={field.step}
        value={Number.isFinite(Number(value)) ? String(value) : ""}
        disabled={disabled}
        onChange={(e) => {
          const n = e.target.value === "" ? Number.NaN : Number(e.target.value);
          onChange(field.key, n);
        }}
      />
    </FieldShell>
  );
}

export function MetricsForm({
  value,
  onChange,
  disabled,
}: {
  value: Metrics;
  onChange: (next: Metrics) => void;
  disabled?: boolean;
}) {
  const setField = (key: keyof Metrics, next: string | number) => {
    onChange({ ...value, [key]: next });
  };

  return (
    <div className="grid gap-5">
      {FIELD_GROUPS.map((group) => (
        <section key={group.id} className="rounded-xl bg-secondary/40 p-4">
          <div className="mb-3">
            <h3 className="font-display text-base font-semibold tracking-tight">{group.title}</h3>
            <p className="text-xs text-muted-foreground">{group.blurb}</p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {group.fields.map((field) => (
              <FieldControl
                key={field.key}
                field={field}
                value={value[field.key]}
                disabled={disabled}
                onChange={setField}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
