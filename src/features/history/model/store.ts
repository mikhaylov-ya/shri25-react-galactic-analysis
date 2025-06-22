import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Analysis } from '../../analysis/model/store';

export type HistoryItem = {
  id: string;
  filename: string;
  results: Analysis;
  status: 'success' | 'failed';
  date: Date;
};

type HistoryState = {
  history: HistoryItem[];
  addHistory: (item: Omit<HistoryItem, 'id'>) => void;
  removeHistoryItem: (id: string) => void;
  clearHistory: () => void;
};

const generateId = (): string => {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
};

export const useHistoryStore = create<HistoryState>()(
  persist(
    (set) => ({
      history: [],
      addHistory: (item) =>
        set((state) => ({
          history: [{ id: generateId(), ...item }, ...state.history],
        })),
      removeHistoryItem: (id) =>
        set((state) => ({
          history: state.history.filter((item) => item.id !== id),
        })),
      clearHistory: () => set({ history: [] }),
    }),
    {
      name: 'csv-history',
    }
  )
);

export const historyStore = {
  getState: useHistoryStore.getState,
  setState: useHistoryStore.setState,
};
