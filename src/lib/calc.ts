export type Unit = "ng" | "nmol";

export interface CalcInputs {
  unit: Unit;
  currentLevel: number;
  targetLevel: number;
  weight: number;
  days: number;
  showMicrograms: boolean;
}

export interface CalcResults {
  dailyInitialDose_IU: number;
  dailyInitialDose_ug: string;
  dailyMaintenance_IU: number;
  dailyMaintenance_ug: string;
  isTargetTooLow: boolean;
  isWeightOutOfRange: boolean;
  days: number;
}

export function calculate(inputs: CalcInputs): CalcResults {
  const unitFactor = inputs.unit === "ng" ? 1 : 2.5;
  const currentLevel_ng = inputs.currentLevel / unitFactor;
  const targetLevel_ng = inputs.targetLevel / unitFactor;
  const isTargetTooLow = targetLevel_ng <= currentLevel_ng;
  const isWeightOutOfRange = inputs.weight < 40 || inputs.weight > 300;

  const totalInitialDose_IU = isTargetTooLow
    ? 0
    : (targetLevel_ng - currentLevel_ng) * inputs.weight * 100;
  const dailyInitialDose_IU = Math.ceil(totalInitialDose_IU / inputs.days);
  const dailyInitialDose_ug = (dailyInitialDose_IU / 40).toFixed(1);

  const dailyMaintenance_IU = Math.ceil(
    (0.24 * targetLevel_ng * (inputs.weight / 70) * 10000) / 30
  );
  const dailyMaintenance_ug = (dailyMaintenance_IU / 40).toFixed(1);

  return {
    dailyInitialDose_IU,
    dailyInitialDose_ug,
    dailyMaintenance_IU,
    dailyMaintenance_ug,
    isTargetTooLow,
    isWeightOutOfRange,
    days: inputs.days,
  };
}

export function convertValue(value: number, from: Unit, to: Unit): number {
  if (from === to) return value;
  if (from === "ng" && to === "nmol") return Math.round(value * 2.5);
  return Math.round(value / 2.5);
}
