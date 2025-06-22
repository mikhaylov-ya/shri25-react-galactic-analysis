import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Analysis } from '../../analysis/model/store';

export type HistoryItem = {
  id: string;
  filename: string;
  results: Analysis;
  status: 'success' | 'failure';
  date: string;
};

type HistoryState = {
  history: HistoryItem[];
  addHistory: (item: HistoryItem) => void;
  clearHistory: () => void;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (item) =>
        set((state) => ({ history: [item, ...state.history] })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'csv-history',
    }
  )
);
