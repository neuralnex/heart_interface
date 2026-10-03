export const SEX_OPTIONS = ["Male", "Female"] as const;
export const ETHNICITY_OPTIONS = [
  "Caucasian",
  "African American",
  "Hispanic",
  "Asian",
  "Other",
] as const;
export const YES_NO = ["Yes", "No"] as const;
export const RESTING_ECG_OPTIONS = [
  "Normal",
  "ST-T Abnormality",
  "Left Ventricular Hypertrophy",
] as const;
export const SLOPE_OPTIONS = ["Upsloping", "Flat", "Downsloping"] as const;
export const THAL_OPTIONS = ["Normal", "Fixed", "Reversible"] as const;
export const SMOKING_OPTIONS = ["Never", "Former", "Current"] as const;
export const ALCOHOL_OPTIONS = ["None", "Light", "Moderate", "Heavy"] as const;
export const ACTIVITY_OPTIONS = ["Low", "Moderate", "High"] as const;
export const DIET_OPTIONS = ["Poor", "Fair", "Good", "Excellent"] as const;
export const STRESS_OPTIONS = ["Low", "Moderate", "High"] as const;

export type Metrics = {
  age: number;
  sex: (typeof SEX_OPTIONS)[number];
  ethnicity: (typeof ETHNICITY_OPTIONS)[number];
  blood_pressure: string;
  heart_rate: number;
  cholesterol: number;
  fasting_blood_sugar: number;
  diabetes: (typeof YES_NO)[number];
  bmi: number;
  resting_ecg: (typeof RESTING_ECG_OPTIONS)[number];
  oldpeak: number;
  slope: (typeof SLOPE_OPTIONS)[number];
  major_vessels: number;
  thalassemia: (typeof THAL_OPTIONS)[number];
  smoking: (typeof SMOKING_OPTIONS)[number];
  alcohol_consumption: (typeof ALCOHOL_OPTIONS)[number];
  physical_activity: (typeof ACTIVITY_OPTIONS)[number];
  sleep_duration: number;
  diet_quality: (typeof DIET_OPTIONS)[number];
  stress_level: (typeof STRESS_OPTIONS)[number];
  sedentary_lifestyle: (typeof YES_NO)[number];
};

export const SAMPLE_HIGH_RISK: Metrics = {
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
  sedentary_lifestyle: "Yes",
};

export const SAMPLE_LOW_RISK: Metrics = {
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
  oldpeak: 0.2,
  slope: "Upsloping",
  major_vessels: 0,
  thalassemia: "Normal",
  smoking: "Never",
  alcohol_consumption: "Light",
  physical_activity: "High",
  sleep_duration: 7.5,
  diet_quality: "Good",
  stress_level: "Low",
  sedentary_lifestyle: "No",
};

export type FieldKind = "number" | "select" | "bp";

export type FieldDef = {
  key: keyof Metrics;
  label: string;
  kind: FieldKind;
  unit?: string;
  hint?: string;
  min?: number;
  max?: number;
  step?: number;
  options?: readonly string[];
};

export type FieldGroup = {
  id: string;
  title: string;
  blurb: string;
  fields: FieldDef[];
};

export const FIELD_GROUPS: FieldGroup[] = [
  {
    id: "demo",
    title: "Demographics",
    blurb: "Age, sex, and ancestry used by the tabular foundation model.",
    fields: [
      { key: "age", label: "Age", kind: "number", unit: "years", min: 1, max: 120, step: 1 },
      { key: "sex", label: "Sex", kind: "select", options: SEX_OPTIONS },
      { key: "ethnicity", label: "Ethnicity", kind: "select", options: ETHNICITY_OPTIONS },
    ],
  },
  {
    id: "vitals",
    title: "Vitals & labs",
    blurb: "Resting vitals and metabolic markers.",
    fields: [
      { key: "blood_pressure", label: "Blood pressure", kind: "bp", unit: "mmHg", hint: "Systolic / diastolic" },
      { key: "heart_rate", label: "Heart rate", kind: "number", unit: "bpm", min: 30, max: 220, step: 1 },
      { key: "cholesterol", label: "Total cholesterol", kind: "number", unit: "mg/dL", min: 50, max: 500, step: 1 },
      {
        key: "fasting_blood_sugar",
        label: "Fasting glucose",
        kind: "number",
        unit: "mg/dL",
        min: 40,
        max: 400,
        step: 1,
      },
      { key: "diabetes", label: "Diabetes", kind: "select", options: YES_NO },
      { key: "bmi", label: "BMI", kind: "number", unit: "kg/m²", min: 10, max: 60, step: 0.1 },
    ],
  },
  {
    id: "cardiac",
    title: "Cardiac metrics",
    blurb: "Exercise ECG and angiographic features.",
    fields: [
      { key: "resting_ecg", label: "Resting ECG", kind: "select", options: RESTING_ECG_OPTIONS },
      { key: "oldpeak", label: "Oldpeak", kind: "number", unit: "mm", min: 0, max: 10, step: 0.1, hint: "ST depression" },
      { key: "slope", label: "ST slope", kind: "select", options: SLOPE_OPTIONS },
      { key: "major_vessels", label: "Major vessels", kind: "number", min: 0, max: 3, step: 1, hint: "0–3 by fluoroscopy" },
      { key: "thalassemia", label: "Thalassemia", kind: "select", options: THAL_OPTIONS },
    ],
  },
  {
    id: "life",
    title: "Lifestyle",
    blurb: "Modifiable risk context for the synthesis report.",
    fields: [
      { key: "smoking", label: "Smoking", kind: "select", options: SMOKING_OPTIONS },
      { key: "alcohol_consumption", label: "Alcohol", kind: "select", options: ALCOHOL_OPTIONS },
      { key: "physical_activity", label: "Activity", kind: "select", options: ACTIVITY_OPTIONS },
      { key: "sleep_duration", label: "Sleep", kind: "number", unit: "hours", min: 0, max: 14, step: 0.5 },
      { key: "diet_quality", label: "Diet", kind: "select", options: DIET_OPTIONS },
      { key: "stress_level", label: "Stress", kind: "select", options: STRESS_OPTIONS },
      { key: "sedentary_lifestyle", label: "Sedentary", kind: "select", options: YES_NO },
    ],
  },
];

export function parseBloodPressure(value: string): { sys: string; dia: string } {
  const [sys = "", dia = ""] = value.split("/");
  return { sys, dia };
}

export function joinBloodPressure(sys: string, dia: string): string {
  return `${sys}/${dia}`;
}

export function validateMetrics(m: Metrics): string[] {
  const errors: string[] = [];
  if (!Number.isFinite(m.age) || m.age < 1 || m.age > 120) errors.push("Age must be between 1 and 120.");
  const { sys, dia } = parseBloodPressure(m.blood_pressure);
  const s = Number(sys);
  const d = Number(dia);
  if (!Number.isFinite(s) || !Number.isFinite(d) || s < 60 || s > 260 || d < 30 || d > 160) {
    errors.push("Blood pressure must look like 120/80.");
  }
  if (s <= d) errors.push("Systolic pressure should be higher than diastolic.");
  if (!Number.isFinite(m.heart_rate) || m.heart_rate < 30 || m.heart_rate > 220) {
    errors.push("Heart rate is out of range.");
  }
  if (!Number.isFinite(m.bmi) || m.bmi < 10 || m.bmi > 60) errors.push("BMI is out of range.");
  if (!Number.isFinite(m.major_vessels) || m.major_vessels < 0 || m.major_vessels > 3) {
    errors.push("Major vessels must be 0–3.");
  }
  return errors;
}
