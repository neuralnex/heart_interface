import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { o as require_jsx_runtime, r as Slot } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { a as ImagePlus, c as Clock3, d as Check, f as Activity, i as LoaderCircle, l as CircleAlert, o as HeartPulse, r as Printer, s as Copy, t as X, u as ChevronDown } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as SelectItemIndicator, c as SelectTrigger$1, i as SelectItem$1, l as SelectValue$1, n as SelectContent$1, o as SelectItemText, r as SelectIcon, s as SelectPortal, t as Select$1, u as SelectViewport } from "../_libs/@radix-ui/react-select+[...].mjs";
import { n as Root$1, t as Indicator } from "../_libs/radix-ui__react-progress.mjs";
import { t as Root$2 } from "../_libs/radix-ui__react-separator.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CU0Rn8Hl.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function formatElapsed(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	return `${Math.floor(total / 60)}:${(total % 60).toString().padStart(2, "0")}`;
}
function formatBytes(bytes) {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(1)} MB`;
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:not-disabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
			outline: "border border-border bg-card text-foreground hover:bg-accent",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
			ink: "bg-ink text-primary-foreground hover:bg-ink/90"
		},
		size: {
			default: "h-11 px-4",
			sm: "h-9 rounded-sm px-3 text-xs",
			lg: "h-12 rounded-lg px-5",
			icon: "size-11"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var ACCEPT = "image/jpeg,image/png,image/webp,image/jpg";
function EcgDropzone({ file, onFile, disabled, onLoadSample }) {
	const inputRef = (0, import_react.useRef)(null);
	const [drag, setDrag] = (0, import_react.useState)(false);
	const [loadingSample, setLoadingSample] = (0, import_react.useState)(false);
	const preview = (0, import_react.useMemo)(() => file ? URL.createObjectURL(file) : null, [file]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (preview) URL.revokeObjectURL(preview);
		};
	}, [preview]);
	const pick = (next) => {
		if (!next) return;
		if (!next.type.startsWith("image/") && !/\.(jpe?g|png|webp)$/i.test(next.name)) return;
		onFile(next);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled,
			onClick: () => inputRef.current?.click(),
			onDragOver: (e) => {
				e.preventDefault();
				if (!disabled) setDrag(true);
			},
			onDragLeave: () => setDrag(false),
			onDrop: (e) => {
				e.preventDefault();
				setDrag(false);
				pick(e.dataTransfer.files?.[0]);
			},
			className: cn("relative flex min-h-44 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 text-center transition-[border-color,background-color,box-shadow] duration-200", drag ? "border-primary bg-primary/5" : "border-border bg-card", disabled && "opacity-60"),
			children: [preview ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: preview,
				alt: "Uploaded 12-lead ECG",
				className: "ecg-frame max-h-56 w-full rounded-md object-contain"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-11 items-center justify-center rounded-lg bg-secondary text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-5" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 font-medium",
					children: "Drop a 12-lead ECG"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-xs text-sm text-muted-foreground",
					children: "JPG or PNG of a full tracing. The vision model reads waveform morphology from the image."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				ref: inputRef,
				type: "file",
				accept: ACCEPT,
				className: "hidden",
				disabled,
				onChange: (e) => pick(e.target.files?.[0])
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "outline",
				size: "sm",
				disabled: disabled || loadingSample,
				onClick: async () => {
					setLoadingSample(true);
					try {
						await onLoadSample();
					} finally {
						setLoadingSample(false);
					}
				},
				children: loadingSample ? "Loading sample…" : "Use sample tracing"
			}), file ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "min-w-0 flex-1 truncate text-xs text-muted-foreground",
				children: [
					file.name,
					" · ",
					formatBytes(file.size)
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "size-9",
				disabled,
				onClick: () => onFile(null),
				"aria-label": "Remove ECG",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
			})] }) : null]
		})]
	});
}
var SEX_OPTIONS = ["Male", "Female"];
var ETHNICITY_OPTIONS = [
	"Caucasian",
	"African American",
	"Hispanic",
	"Asian",
	"Other"
];
var YES_NO = ["Yes", "No"];
var RESTING_ECG_OPTIONS = [
	"Normal",
	"ST-T Abnormality",
	"Left Ventricular Hypertrophy"
];
var SLOPE_OPTIONS = [
	"Upsloping",
	"Flat",
	"Downsloping"
];
var THAL_OPTIONS = [
	"Normal",
	"Fixed",
	"Reversible"
];
var SMOKING_OPTIONS = [
	"Never",
	"Former",
	"Current"
];
var ALCOHOL_OPTIONS = [
	"None",
	"Light",
	"Moderate",
	"Heavy"
];
var ACTIVITY_OPTIONS = [
	"Low",
	"Moderate",
	"High"
];
var DIET_OPTIONS = [
	"Poor",
	"Fair",
	"Good",
	"Excellent"
];
var STRESS_OPTIONS = [
	"Low",
	"Moderate",
	"High"
];
var SAMPLE_HIGH_RISK = {
	age: 58,
	sex: "Male",
	ethnicity: "Caucasian",
	blood_pressure: "140/90",
	heart_rate: 75,
	cholesterol: 240,
	fasting_blood_sugar: 110,
	diabetes: "Yes",
	bmi: 28.5,
	resting_ecg: "Normal",
	oldpeak: 1.5,
	slope: "Flat",
	major_vessels: 2,
	thalassemia: "Fixed",
	smoking: "Former",
	alcohol_consumption: "Moderate",
	physical_activity: "Low",
	sleep_duration: 6.5,
	diet_quality: "Poor",
	stress_level: "High",
	sedentary_lifestyle: "Yes"
};
var SAMPLE_LOW_RISK = {
	age: 34,
	sex: "Female",
	ethnicity: "Asian",
	blood_pressure: "118/76",
	heart_rate: 62,
	cholesterol: 168,
	fasting_blood_sugar: 88,
	diabetes: "No",
	bmi: 22.4,
	resting_ecg: "Normal",
	oldpeak: .2,
	slope: "Upsloping",
	major_vessels: 0,
	thalassemia: "Normal",
	smoking: "Never",
	alcohol_consumption: "Light",
	physical_activity: "High",
	sleep_duration: 7.5,
	diet_quality: "Good",
	stress_level: "Low",
	sedentary_lifestyle: "No"
};
var FIELD_GROUPS = [
	{
		id: "demo",
		title: "Demographics",
		blurb: "Age, sex, and ancestry used by the tabular foundation model.",
		fields: [
			{
				key: "age",
				label: "Age",
				kind: "number",
				unit: "years",
				min: 1,
				max: 120,
				step: 1
			},
			{
				key: "sex",
				label: "Sex",
				kind: "select",
				options: SEX_OPTIONS
			},
			{
				key: "ethnicity",
				label: "Ethnicity",
				kind: "select",
				options: ETHNICITY_OPTIONS
			}
		]
	},
	{
		id: "vitals",
		title: "Vitals & labs",
		blurb: "Resting vitals and metabolic markers.",
		fields: [
			{
				key: "blood_pressure",
				label: "Blood pressure",
				kind: "bp",
				unit: "mmHg",
				hint: "Systolic / diastolic"
			},
			{
				key: "heart_rate",
				label: "Heart rate",
				kind: "number",
				unit: "bpm",
				min: 30,
				max: 220,
				step: 1
			},
			{
				key: "cholesterol",
				label: "Total cholesterol",
				kind: "number",
				unit: "mg/dL",
				min: 50,
				max: 500,
				step: 1
			},
			{
				key: "fasting_blood_sugar",
				label: "Fasting glucose",
				kind: "number",
				unit: "mg/dL",
				min: 40,
				max: 400,
				step: 1
			},
			{
				key: "diabetes",
				label: "Diabetes",
				kind: "select",
				options: YES_NO
			},
			{
				key: "bmi",
				label: "BMI",
				kind: "number",
				unit: "kg/m²",
				min: 10,
				max: 60,
				step: .1
			}
		]
	},
	{
		id: "cardiac",
		title: "Cardiac metrics",
		blurb: "Exercise ECG and angiographic features.",
		fields: [
			{
				key: "resting_ecg",
				label: "Resting ECG",
				kind: "select",
				options: RESTING_ECG_OPTIONS
			},
			{
				key: "oldpeak",
				label: "Oldpeak",
				kind: "number",
				unit: "mm",
				min: 0,
				max: 10,
				step: .1,
				hint: "ST depression"
			},
			{
				key: "slope",
				label: "ST slope",
				kind: "select",
				options: SLOPE_OPTIONS
			},
			{
				key: "major_vessels",
				label: "Major vessels",
				kind: "number",
				min: 0,
				max: 3,
				step: 1,
				hint: "0–3 by fluoroscopy"
			},
			{
				key: "thalassemia",
				label: "Thalassemia",
				kind: "select",
				options: THAL_OPTIONS
			}
		]
	},
	{
		id: "life",
		title: "Lifestyle",
		blurb: "Modifiable risk context for the synthesis report.",
		fields: [
			{
				key: "smoking",
				label: "Smoking",
				kind: "select",
				options: SMOKING_OPTIONS
			},
			{
				key: "alcohol_consumption",
				label: "Alcohol",
				kind: "select",
				options: ALCOHOL_OPTIONS
			},
			{
				key: "physical_activity",
				label: "Activity",
				kind: "select",
				options: ACTIVITY_OPTIONS
			},
			{
				key: "sleep_duration",
				label: "Sleep",
				kind: "number",
				unit: "hours",
				min: 0,
				max: 14,
				step: .5
			},
			{
				key: "diet_quality",
				label: "Diet",
				kind: "select",
				options: DIET_OPTIONS
			},
			{
				key: "stress_level",
				label: "Stress",
				kind: "select",
				options: STRESS_OPTIONS
			},
			{
				key: "sedentary_lifestyle",
				label: "Sedentary",
				kind: "select",
				options: YES_NO
			}
		]
	}
];
function parseBloodPressure(value) {
	const [sys = "", dia = ""] = value.split("/");
	return {
		sys,
		dia
	};
}
function joinBloodPressure(sys, dia) {
	return `${sys}/${dia}`;
}
function validateMetrics(m) {
	const errors = [];
	if (!Number.isFinite(m.age) || m.age < 1 || m.age > 120) errors.push("Age must be between 1 and 120.");
	const { sys, dia } = parseBloodPressure(m.blood_pressure);
	const s = Number(sys);
	const d = Number(dia);
	if (!Number.isFinite(s) || !Number.isFinite(d) || s < 60 || s > 260 || d < 30 || d > 160) errors.push("Blood pressure must look like 120/80.");
	if (s <= d) errors.push("Systolic pressure should be higher than diastolic.");
	if (!Number.isFinite(m.heart_rate) || m.heart_rate < 30 || m.heart_rate > 220) errors.push("Heart rate is out of range.");
	if (!Number.isFinite(m.bmi) || m.bmi < 10 || m.bmi > 60) errors.push("BMI is out of range.");
	if (!Number.isFinite(m.major_vessels) || m.major_vessels < 0 || m.major_vessels > 3) errors.push("Major vessels must be 0–3.");
	return errors;
}
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		type,
		className: cn("flex h-11 w-full rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm transition-[box-shadow,border-color] duration-150", "placeholder:text-muted-foreground", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:border-ring", "disabled:cursor-not-allowed disabled:opacity-50", "file:border-0 file:bg-transparent file:text-sm file:font-medium", className),
		ref,
		...props
	});
});
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-sm font-medium leading-none text-foreground peer-disabled:opacity-50", className),
	...props
}));
Label.displayName = Root.displayName;
var Select = Select$1;
var SelectValue = SelectValue$1;
var SelectTrigger = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectTrigger$1, {
	ref,
	className: cn("flex h-11 w-full items-center justify-between gap-2 rounded-md border border-input bg-card px-3 py-2 text-sm text-foreground shadow-sm", "focus:outline-none focus:ring-2 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50", "[&>span]:line-clamp-1", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectIcon, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4 opacity-60" })
	})]
}));
SelectTrigger.displayName = SelectTrigger$1.displayName;
var SelectContent = import_react.forwardRef(({ className, children, position = "popper", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectPortal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent$1, {
	ref,
	className: cn("relative z-50 max-h-72 min-w-32 overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1", className),
	position,
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectViewport, {
		className: cn("p-1", position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]"),
		children
	})
}) }));
SelectContent.displayName = SelectContent$1.displayName;
var SelectItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem$1, {
	ref,
	className: cn("relative flex w-full cursor-pointer select-none items-center rounded-sm py-2.5 pl-8 pr-3 text-sm outline-none", "focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex size-4 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemIndicator, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItemText, { children })]
}));
SelectItem.displayName = SelectItem$1.displayName;
function FieldShell({ field, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
				htmlFor: field.key,
				className: "text-xs text-muted-foreground",
				children: [field.label, field.unit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ml-1 font-normal",
					children: [
						"(",
						field.unit,
						")"
					]
				}) : null]
			}),
			children,
			field.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: field.hint
			}) : null
		]
	});
}
function FieldControl({ field, value, disabled, onChange }) {
	if (field.kind === "select") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
		field,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
			value: String(value),
			disabled,
			onValueChange: (v) => onChange(field.key, v),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
				id: field.key,
				className: "bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: (field.options ?? []).map((opt) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
				value: opt,
				children: opt
			}, opt)) })]
		})
	});
	if (field.kind === "bp") {
		const { sys, dia } = parseBloodPressure(String(value));
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
			field,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: field.key,
					inputMode: "numeric",
					value: sys,
					disabled,
					placeholder: "Sys",
					onChange: (e) => onChange(field.key, joinBloodPressure(e.target.value.replace(/[^\d]/g, ""), dia))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					inputMode: "numeric",
					value: dia,
					disabled,
					placeholder: "Dia",
					onChange: (e) => onChange(field.key, joinBloodPressure(sys, e.target.value.replace(/[^\d]/g, "")))
				})]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldShell, {
		field,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			id: field.key,
			type: "number",
			inputMode: "decimal",
			min: field.min,
			max: field.max,
			step: field.step,
			value: Number.isFinite(Number(value)) ? String(value) : "",
			disabled,
			onChange: (e) => {
				const n = e.target.value === "" ? NaN : Number(e.target.value);
				onChange(field.key, n);
			}
		})
	});
}
function MetricsForm({ value, onChange, disabled }) {
	const setField = (key, next) => {
		onChange({
			...value,
			[key]: next
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid gap-5",
		children: FIELD_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-xl bg-secondary/40 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-semibold tracking-tight",
					children: group.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: group.blurb
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-1 gap-3 sm:grid-cols-2",
				children: group.fields.map((field) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldControl, {
					field,
					value: value[field.key],
					disabled,
					onChange: setField
				}, field.key))
			})]
		}, group.id))
	});
}
var Progress = import_react.forwardRef(({ className, value, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$1, {
	ref,
	className: cn("relative h-1.5 w-full overflow-hidden rounded-full bg-secondary", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Indicator, {
		className: "h-full w-full flex-1 bg-primary transition-transform duration-500 ease-out",
		style: { transform: `translateX(-${100 - (value ?? 0)}%)` }
	})
}));
Progress.displayName = Root$1.displayName;
function sample(t) {
	const rr = .86;
	const phase = (t % rr + rr) % rr - .16;
	let v = 0;
	v += .12 * Math.exp(-((phase + .18) ** 2) / (2 * .016 ** 2));
	v += -.1 * Math.exp(-((phase + .03) ** 2) / (2 * .006 ** 2));
	v += 1.05 * Math.exp(-(phase ** 2) / (2 * .007 ** 2));
	v += -.28 * Math.exp(-((phase - .032) ** 2) / (2 * .01 ** 2));
	v += .28 * Math.exp(-((phase - .2) ** 2) / (2 * .038 ** 2));
	return v;
}
function Waveform({ className, running = true, accent = false }) {
	const svgRef = (0, import_react.useRef)(null);
	const gridRef = (0, import_react.useRef)(null);
	const pathRef = (0, import_react.useRef)(null);
	const headRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const svg = svgRef.current;
		const grid = gridRef.current;
		const path = pathRef.current;
		const head = headRef.current;
		if (!svg || !grid || !path || !head) return;
		const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		let raf = 0;
		let elapsed = 1.6;
		let last = performance.now();
		const paint = (now) => {
			const dt = Math.min(32, now - last);
			last = now;
			if (running && !reduce) elapsed += dt / 1e3;
			const w = Math.max(32, svg.clientWidth);
			const h = Math.max(24, svg.clientHeight);
			svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
			const step = 16;
			let gridD = "";
			for (let x = 0; x <= w; x += step) gridD += `M${x} 0 V${h} `;
			for (let y = 0; y <= h; y += step) gridD += `M0 ${y} H${w} `;
			grid.setAttribute("d", gridD.trim());
			const mid = h * .58;
			const amp = h * .32;
			const windowSec = 2.4;
			const n = Math.max(2, Math.floor(w));
			const pts = [];
			for (let i = 0; i <= n; i++) {
				const x = i / n * w;
				const y = mid - sample(elapsed - windowSec + i / n * windowSec) * amp;
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		ref: svgRef,
		className: cn("h-full w-full", className),
		"aria-hidden": true,
		preserveAspectRatio: "none",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				ref: gridRef,
				fill: "none",
				stroke: grid,
				strokeWidth: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
				ref: pathRef,
				fill: "none",
				stroke,
				strokeWidth: "2",
				strokeLinejoin: "round",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				ref: headRef,
				r: "3",
				fill: stroke
			})
		]
	});
}
var PREDICT_STAGES = [
	{
		at: 0,
		label: "Upload",
		detail: "Sending the tracing and the clinical chart."
	},
	{
		at: 4,
		label: "GemmaECG-Vision",
		detail: "Reading 12-lead morphology on the GPU."
	},
	{
		at: 18,
		label: "Google TabFM",
		detail: "In-context risk from labs, vitals, and history."
	},
	{
		at: 28,
		label: "BioMistral",
		detail: "One Groq call writes the note. The 7B weights stay off the GPU."
	}
];
var ANALYZE_STAGES = [
	{
		at: 0,
		label: "Upload",
		detail: "Sending the 12-lead image to the vision stack."
	},
	{
		at: 8,
		label: "GemmaECG-Vision",
		detail: "Extracting rhythm, QRS, ST, and axis findings."
	},
	{
		at: 35,
		label: "BioMistral",
		detail: "Turning raw findings into a cardiology-style report via Groq."
	},
	{
		at: 75,
		label: "Review pass",
		detail: "Still generating — large models often need 45–90 seconds."
	}
];
function activeIndex(stages, elapsedSec) {
	let idx = 0;
	for (let i = 0; i < stages.length; i++) if (elapsedSec >= stages[i].at) idx = i;
	return idx;
}
function PipelineProgress({ mode, elapsedMs }) {
	const stages = mode === "predict" ? PREDICT_STAGES : ANALYZE_STAGES;
	const elapsedSec = elapsedMs / 1e3;
	const current = activeIndex(stages, elapsedSec);
	const pct = Math.min(92, elapsedSec / 70 * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-hidden rounded-xl bg-ecg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
						running: true,
						accent: false
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-semibold tracking-tight",
					children: "Reading the heart"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: mode === "predict" ? "Full pipeline — vision and tabular risk on the GPU, then BioMistral on Groq." : "ECG-only path — vision extraction, then a structured report."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "font-mono text-sm tabular-nums text-muted-foreground",
					children: [formatElapsed(elapsedMs), mode === "predict" ? " / 7:00" : ""]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3",
				children: stages.map((stage, i) => {
					const done = i < current;
					const active = i === current;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: done ? "mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary text-primary-foreground" : active ? "mt-0.5 flex size-6 items-center justify-center rounded-full bg-primary/15 text-primary" : "mt-0.5 flex size-6 items-center justify-center rounded-full bg-secondary text-muted-foreground",
							children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }) : active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : null
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: active ? "text-sm font-medium" : "text-sm text-muted-foreground",
							children: stage.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: stage.detail
						})] })]
					}, stage.label);
				})
			}),
			elapsedSec > 20 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: mode === "predict" && elapsedSec > 90 ? "Still writing the note. Leave this tab open — the safety window is 7 minutes. Refreshing starts the GPU job over." : "The ECG model may still be loading if the engine was idle. BioMistral itself is a short Groq call."
			}) : null
		]
	});
}
var SECTION_LABELS = [
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
	"Risk Assessment"
];
function inlineFormat(text) {
	return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).map((part, i) => {
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: part.slice(2, -2) }, i);
		if (part.startsWith("*") && part.endsWith("*")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: part.slice(1, -1) }, i);
		if (part.startsWith("`") && part.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-sm bg-secondary px-1 py-0.5 font-mono text-xs",
			children: part.slice(1, -1)
		}, i);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, i);
	});
}
function renderBlocks(source) {
	const lines = source.replace(/\r\n/g, "\n").split("\n");
	const nodes = [];
	let buffer = [];
	let list = null;
	let key = 0;
	const flushP = () => {
		const text = buffer.join(" ").trim();
		buffer = [];
		if (!text) return;
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-pretty",
			children: inlineFormat(text)
		}, key++));
	};
	const flushList = () => {
		if (!list || list.items.length === 0) return;
		const Tag = list.ordered ? "ol" : "ul";
		nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			className: list.ordered ? "list-decimal" : "list-disc",
			children: list.items.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: inlineFormat(item) }, i))
		}, key++));
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
			const Tag = level === 1 ? "h2" : "h3";
			nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
				className: level === 1 ? "font-display text-xl font-semibold tracking-tight" : void 0,
				children: heading[2]
			}, key++));
			continue;
		}
		const ul = /^[-*]\s+(.+)$/.exec(line);
		if (ul) {
			flushP();
			if (!list || list.ordered) {
				flushList();
				list = {
					ordered: false,
					items: []
				};
			}
			list.items.push(ul[1]);
			continue;
		}
		const ol = /^\d+[.)]\s+(.+)$/.exec(line);
		if (ol) {
			flushP();
			if (!list || !list.ordered) {
				flushList();
				list = {
					ordered: true,
					items: []
				};
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
function splitLabeled(source) {
	const re = new RegExp(`(?:^|\\n)\\s*(${SECTION_LABELS.join("|")})\\s*[:\\-–]\\s*`, "gi");
	const matches = [...source.matchAll(re)];
	if (matches.length === 0) return null;
	const sections = [];
	const lead = source.slice(0, matches[0].index).trim();
	if (lead) sections.push({
		title: "Overview",
		body: lead
	});
	matches.forEach((match, i) => {
		const start = (match.index ?? 0) + match[0].length;
		const end = i + 1 < matches.length ? matches[i + 1].index ?? source.length : source.length;
		sections.push({
			title: match[1],
			body: source.slice(start, end).trim()
		});
	});
	return sections.filter((s) => s.body);
}
function ClinicalMarkdown({ text, className }) {
	if (!text?.trim()) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "No narrative was returned."
	});
	if (/^#{1,3}\s/m.test(text)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("report-prose", className),
		children: renderBlocks(text)
	});
	const labeled = splitLabeled(text);
	if (labeled && labeled.length > 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("grid gap-4", className),
		children: labeled.map((section) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-lg bg-secondary/50 p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-base font-semibold tracking-tight",
				children: section.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "report-prose mt-1",
				children: renderBlocks(section.body)
			})]
		}, section.title))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("report-prose", className),
		children: renderBlocks(text)
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground",
		secondary: "border-transparent bg-secondary text-secondary-foreground",
		outline: "border-border text-foreground",
		high: "border-transparent bg-risk-high/15 text-risk-high",
		mid: "border-transparent bg-risk-mid/15 text-risk-mid",
		low: "border-transparent bg-risk-low/15 text-risk-low",
		live: "border-transparent bg-primary/12 text-primary"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var Separator = import_react.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root$2, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-px w-full" : "h-full w-px", className),
	...props
}));
Separator.displayName = Root$2.displayName;
var EngineError = class extends Error {
	status;
	constructor(message, status = 500) {
		super(message);
		this.name = "EngineError";
		this.status = status;
	}
};
function asRecord(value) {
	return value !== null && typeof value === "object" && !Array.isArray(value) ? value : null;
}
function asString(value) {
	return typeof value === "string" ? value : value == null ? "" : String(value);
}
function parseBody(text) {
	const trimmed = text.trim();
	if (!trimmed) return {};
	try {
		return JSON.parse(trimmed);
	} catch {
		return { text: trimmed };
	}
}
function detailMessage(payload, fallback) {
	const rec = asRecord(payload);
	if (!rec) return fallback;
	if (typeof rec.error === "string" && rec.error) return rec.error;
	if (typeof rec.message === "string" && rec.message) return rec.message;
	const detail = rec.detail;
	if (typeof detail === "string" && detail) return detail;
	if (Array.isArray(detail) && detail.length > 0) return detail.map((item) => {
		const row = asRecord(item);
		return row && typeof row.msg === "string" ? row.msg : String(item);
	}).join(" ");
	return fallback;
}
function normalizeRiskPercent(value) {
	if (typeof value !== "number" || !Number.isFinite(value)) return null;
	const pct = value <= 1 && value >= 0 ? value * 100 : value;
	return Math.max(0, Math.min(100, pct));
}
function parsePredict(payload) {
	const rec = asRecord(payload) ?? {};
	const upstream = asRecord(rec.upstream_findings) ?? {};
	return {
		kind: "predict",
		clinical_report: asString(rec.clinical_report) || asString(rec.report) || asString(rec.ecg_report) || (typeof payload === "string" ? payload : ""),
		upstream_findings: {
			gemma_ecg: asString(upstream.gemma_ecg) || void 0,
			tabfm_risk: typeof upstream.tabfm_risk === "number" ? upstream.tabfm_risk : void 0,
			tabfm_label: asString(upstream.tabfm_label) || void 0,
			engineered_metrics: asRecord(upstream.engineered_metrics),
			...upstream
		},
		raw: payload
	};
}
function parseAnalyze(payload) {
	const rec = asRecord(payload) ?? {};
	return {
		kind: "analyze",
		ecg_report: asString(rec.ecg_report) || asString(rec.clinical_report) || asString(rec.report),
		raw_visual_findings: asString(rec.raw_visual_findings) || asString(rec.gemma_ecg),
		raw: payload
	};
}
async function postForm(path, form, signal) {
	const res = await fetch(path, {
		method: "POST",
		body: form,
		signal,
		headers: { Accept: "application/json" }
	});
	const payload = parseBody(await res.text());
	if (!res.ok) throw new EngineError(detailMessage(payload, res.status === 504 ? "The diagnostic engine timed out before BioMistral finished the note. Wait a moment, then try once — do not stack retries." : res.status === 502 || res.status === 503 ? "The diagnostic engine is waking or unreachable. Wait a moment and retry." : `Engine returned ${res.status}.`), res.status);
	return payload;
}
async function runPredict(file, metrics, signal) {
	const form = new FormData();
	form.set("metrics", JSON.stringify(metrics));
	form.set("file", file, file.name || "ecg.jpg");
	return parsePredict(await postForm("/api/predict", form, signal));
}
async function runAnalyze(file, signal) {
	const form = new FormData();
	form.set("file", file, file.name || "ecg.jpg");
	return parseAnalyze(await postForm("/api/analyze-ecg", form, signal));
}
async function fetchEngineHealth() {
	try {
		const payload = asRecord(await (await fetch("/api/health", { method: "GET" })).json());
		return {
			ok: Boolean(payload?.ok),
			status: typeof payload?.status === "number" ? payload.status : void 0,
			latencyMs: typeof payload?.latencyMs === "number" ? payload.latencyMs : 0
		};
	} catch {
		return {
			ok: false,
			latencyMs: 0
		};
	}
}
async function loadSampleEcg() {
	const res = await fetch("/sample-ecg.jpg");
	if (!res.ok) throw new Error("Could not load the sample tracing.");
	const blob = await res.blob();
	return new File([blob], "sample-12-lead-ecg.jpg", { type: "image/jpeg" });
}
function riskVariant(label, pct) {
	const l = (label ?? "").toLowerCase();
	if (l.includes("high") || (pct ?? 0) >= 70) return "high";
	if (l.includes("low") || (pct ?? 100) <= 30) return "low";
	return "mid";
}
function RiskDial({ value, label }) {
	const r = 54;
	const c = 2 * Math.PI * r;
	const offset = c * (1 - value / 100);
	const variant = riskVariant(label, value);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 140 140",
			className: "size-28 shrink-0",
			"aria-hidden": true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: "var(--color-secondary)",
					strokeWidth: "10"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "70",
					cy: "70",
					r,
					fill: "none",
					stroke: variant === "high" ? "var(--color-risk-high)" : variant === "low" ? "var(--color-risk-low)" : "var(--color-risk-mid)",
					strokeWidth: "10",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: offset,
					transform: "rotate(-90 70 70)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: "70",
					y: "74",
					textAnchor: "middle",
					className: "tabular-nums",
					fontSize: "28",
					fontWeight: "600",
					fill: "currentColor",
					children: Math.round(value)
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs tracking-wide text-muted-foreground uppercase",
				children: "TabFM risk"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-1 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: label || "Unlabeled"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
					variant,
					children: [Math.round(value), "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 max-w-xs text-sm text-muted-foreground",
				children: "Statistical estimate from the tabular foundation model, not a diagnosis."
			})
		] })]
	});
}
function toMarkdown(result) {
	if (result.kind === "analyze") return `# ECG analysis\n\n${result.ecg_report}\n\n## Raw visual findings\n\n${result.raw_visual_findings}\n`;
	const up = result.upstream_findings;
	return `# Clinical report\n\n${result.clinical_report}\n\n## Upstream findings\n\n- TabFM: ${up.tabfm_label ?? "—"} (${up.tabfm_risk ?? "—"})\n- GemmaECG-Vision: ${up.gemma_ecg ?? "—"}\n`;
}
function ReportView({ result }) {
	const risk = result.kind === "predict" ? normalizeRiskPercent(result.upstream_findings.tabfm_risk) : null;
	const engineered = result.kind === "predict" && result.upstream_findings.engineered_metrics ? Object.entries(result.upstream_findings.engineered_metrics) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "print-sheet grid gap-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3 no-print",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-wide text-muted-foreground uppercase",
					children: result.kind === "predict" ? "Holistic multimodal diagnosis" : "Specialized ECG analysis"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "Clinical report"
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: async () => {
							await navigator.clipboard.writeText(toMarkdown(result));
							toast.success("Report copied");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {}), "Copy"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => window.print(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Printer, {}), "Print"]
					})]
				})]
			}),
			result.kind === "predict" && risk !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-xl bg-secondary/50 p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskDial, {
					value: risk,
					label: result.upstream_findings.tabfm_label
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClinicalMarkdown, {
				text: result.kind === "predict" ? result.clinical_report : result.ecg_report,
				className: "text-sm"
			}),
			result.kind === "predict" && result.upstream_findings.gemma_ecg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "GemmaECG-Vision"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-pretty",
				children: result.upstream_findings.gemma_ecg
			})] })] }) : null,
			result.kind === "analyze" && result.raw_visual_findings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: "Raw visual findings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm leading-relaxed text-pretty",
				children: result.raw_visual_findings
			})] })] }) : null,
			engineered.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-2 sm:grid-cols-3",
				children: engineered.map(([key, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg bg-secondary/50 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: key.replaceAll("_", " ")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-sm tabular-nums",
						children: typeof val === "number" ? val.toFixed(val > 10 ? 1 : 3) : String(val)
					})]
				}, key))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("text-xs text-muted-foreground"),
				children: "Assistive research output. Not a medical diagnosis, and not a substitute for a licensed clinician."
			})
		]
	});
}
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-11 w-full items-center justify-center rounded-lg bg-secondary p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex h-9 flex-1 items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] duration-150", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", "data-[state=active]:bg-card data-[state=active]:text-foreground data-[state=active]:shadow-sm", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-4 focus-visible:outline-none", className),
	...props
}));
TabsContent.displayName = Content.displayName;
function Home() {
	const [mode, setMode] = (0, import_react.useState)("predict");
	const [metrics, setMetrics] = (0, import_react.useState)(SAMPLE_HIGH_RISK);
	const [file, setFile] = (0, import_react.useState)(null);
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [elapsed, setElapsed] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [health, setHealth] = (0, import_react.useState)(null);
	const abortRef = (0, import_react.useRef)(null);
	const startedAt = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetchEngineHealth().then((h) => {
			if (!cancelled) setHealth(h);
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (status !== "running") return;
		const id = window.setInterval(() => setElapsed(Date.now() - startedAt.current), 250);
		return () => window.clearInterval(id);
	}, [status]);
	(0, import_react.useEffect)(() => {
		return () => abortRef.current?.abort();
	}, []);
	const running = status === "running";
	const applySample = async (next) => {
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
			const next = mode === "predict" ? await runPredict(file, metrics, controller.signal) : await runAnalyze(file, controller.signal);
			setResult(next);
			setStatus("success");
		} catch (err) {
			if (controller.signal.aborted) {
				setStatus("idle");
				return;
			}
			const message = err instanceof EngineError ? err.message : err instanceof Error ? err.message : "The diagnostic engine failed.";
			setError(message);
			setStatus("error");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "no-print border-b border-ink/10 bg-ink text-primary-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-lg bg-primary/20 text-primary-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartPulse, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl font-semibold tracking-tight",
						children: "Atria"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-primary-foreground/65",
						children: "Heart disease diagnostic console"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "secondary",
						className: "bg-primary-foreground/10 text-primary-foreground border-transparent",
						children: "GemmaECG · TabFM · BioMistral"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnginePill, { health })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-10 overflow-hidden opacity-80",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, {
					running: !running,
					accent: true
				})
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:py-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print grid gap-5 rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-2xl font-semibold tracking-tight",
						children: "Intake"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Two paths: a full multimodal read, or a rapid ECG-only report. ECG-only often needs about a minute. The full pipeline keeps a 7-minute safety window, but BioMistral writes the note on Groq so a warm engine should finish much sooner."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
						value: mode,
						onValueChange: (v) => {
							if (running) return;
							setMode(v);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "predict",
							children: "Full pipeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
							value: "analyze",
							children: "ECG only"
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: running,
							onClick: () => void applySample(SAMPLE_HIGH_RISK),
							children: "High-risk sample"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							disabled: running,
							onClick: () => void applySample(SAMPLE_LOW_RISK),
							children: "Low-risk sample"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EcgDropzone, {
						file,
						onFile: setFile,
						disabled: running,
						onLoadSample: async () => setFile(await loadSampleEcg())
					}),
					mode === "predict" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricsForm, {
						value: metrics,
						onChange: setMetrics,
						disabled: running
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator, {}),
					running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						onClick: cancel,
						children: "Cancel"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "lg",
						className: "w-full",
						onClick: () => void submit(),
						children: mode === "predict" ? "Run full diagnosis" : "Analyze ECG"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Research assistant only. Findings are not a diagnosis and must be reviewed by a clinician."
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "rounded-2xl bg-card p-4 shadow-[var(--shadow-border)] sm:p-6 print-sheet",
				children: status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineProgress, {
					mode,
					elapsedMs: elapsed
				}) : status === "success" && result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportView, { result }) : status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorPanel, {
					message: error,
					onRetry: () => void submit()
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					mode,
					hasFile: Boolean(file)
				})
			})]
		})]
	});
}
function EnginePill({ health }) {
	if (!health) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: "border-primary-foreground/20 text-primary-foreground/80",
		children: "Engine…"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		variant: "outline",
		className: health.ok ? "border-primary-foreground/20 text-primary-foreground" : "border-risk-high/40 text-primary-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: health.ok ? "mr-1.5 size-1.5 rounded-full bg-risk-low" : "mr-1.5 size-1.5 rounded-full bg-risk-mid" }), health.ok ? "Engine reachable" : "Engine waking"]
	});
}
function EmptyState({ mode, hasFile }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-80 place-content-center gap-4 py-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto overflow-hidden rounded-xl bg-ecg-paper",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "h-28 w-full max-w-lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waveform, { running: true })
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: hasFile ? "Ready to run" : "Waiting for a tracing"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: hasFile ? mode === "predict" ? "The tracing is attached. Confirm the chart on the left, then run the full diagnosis. GemmaECG and TabFM use the GPU. BioMistral writes the note on Groq." : "The tracing is attached. Analyze ECG to generate a cardiology-style report — typically 45–90 seconds, longer if the GPU is waking." : mode === "predict" ? "Upload a 12-lead ECG and keep the chart on the left. GemmaECG-Vision and TabFM run on the GPU. BioMistral writes the report on Groq." : "Upload a 12-lead ECG. GemmaECG-Vision extracts findings; BioMistral turns them into a structured cardiology note."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "mx-auto grid max-w-md gap-2 text-left text-sm text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mt-0.5 size-4 shrink-0 text-primary" }), "Typical ECG-only reads take 45–90 seconds."]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "mt-0.5 size-4 shrink-0 text-primary" }), "The full pipeline waits up to 7 minutes, but a warm run should return well before that."]
				})]
			})
		]
	});
}
function ErrorPanel({ message, onRetry }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-72 place-content-center gap-4 py-10 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mx-auto flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleAlert, { className: "size-6" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: "The engine did not finish"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: message || "Unexpected error."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				onClick: onRetry,
				className: "mx-auto",
				children: "Retry"
			})
		]
	});
}
//#endregion
export { Home as component };
