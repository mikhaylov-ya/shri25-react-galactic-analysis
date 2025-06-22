import { create } from 'zustand';

type Civilisation = "monsters" | "blobs" | "humans";
export type Analysis = {
  average_spend_galactic: number
  total_spend_galactic: number
  rows_affected: number
  big_spent_at: number | null
  big_spent_value: number | null
  less_spent_at: number | null
  less_spent_value: number | null
  big_spent_civ: Civilisation
  less_spent_civ: Civilisation
}
type AnalysisStatus = "success" | "failed" | "parsing" | "init";

type AnalysisState = {
  results: null | Analysis;
  status: AnalysisStatus
  setStatus: (status: AnalysisStatus) => void
  setResults: (res: Analysis) => void;
};

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isLoading: false,
  results: null,
  status: "init",
  setResults: (results) => { set({ results }) },
  setStatus: (status) => set({ status }),
}));
