/**
 * 재련 관련 타입 정의
 */

export interface RefineTableData {
  baseProb: number;
  amount: Record<string, number>;
  breath: Record<string, [number, number]>;
}

export interface RefineTable {
  baseProb: number;
  additionalProb: number;
  janginMultiplier: number;
  amount: Record<string, number>;
  breath: Record<string, [number, number]>;
}
