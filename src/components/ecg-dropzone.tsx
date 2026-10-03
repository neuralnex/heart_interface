import { useEffect, useMemo, useRef, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn, formatBytes } from "@/lib/utils";

const ACCEPT = "image/jpeg,image/png,image/webp,image/jpg";

export function EcgDropzone({
  file,
  onFile,
  disabled,
  onLoadSample,
}: {
  file: File | null;
  onFile: (file: File | null) => void;
  disabled?: boolean;
  onLoadSample: () => Promise<void>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);
  const [loadingSample, setLoadingSample] = useState(false);
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file]);

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const pick = (next: File | undefined | null) => {
    if (!next) return;
    if (!next.type.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(next.name)) return;
    onFile(next);
  };

  return (
    <div className="grid gap-3">
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          pick(e.dataTransfer.files?.[0]);
        }}
        className={cn(
          "relative flex min-h-44 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 text-center transition-[border-color,background-color,box-shadow] duration-200",
          drag ? "border-primary bg-primary/5" : "border-border bg-card",
          disabled && "opacity-60",
        )}
      >
        {preview ? (
          <img
            src={preview}
            alt="Uploaded 12-lead ECG"
            className="ecg-frame max-h-56 w-full rounded-md object-contain"
          />
        ) : (
          <>
            <span className="flex size-11 items-center justify-center rounded-lg bg-secondary text-primary">
              <ImagePlus className="size-5" />
            </span>
            <p className="mt-3 font-medium">Drop a 12-lead ECG</p>
            <p className="mt-1 max-w-xs text-sm text-muted-foreground">
              JPG or PNG of a full tracing. The vision model reads waveform morphology from the image.
            </p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT}
          className="hidden"
          disabled={disabled}
          onChange={(e) => pick(e.target.files?.[0])}
        />
      </button>
      <div className="flex flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled || loadingSample}
          onClick={async () => {
            setLoadingSample(true);
            try {
              await onLoadSample();
            } finally {
              setLoadingSample(false);
            }
          }}
        >
          {loadingSample ? "Loading sample…" : "Use sample tracing"}
        </Button>
        {file ? (
          <>
            <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground">
              {file.name} · {formatBytes(file.size)}
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="size-9"
              disabled={disabled}
              onClick={() => onFile(null)}
              aria-label="Remove ECG"
            >
              <X className="size-4" />
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
}
