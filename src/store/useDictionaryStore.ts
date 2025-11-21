// src/store/useDictionaryStore.ts
import { create } from "zustand";

interface DictionaryState {
  word: string;
  setWord: (w: string) => void;
}

export const useDictionaryStore = create<DictionaryState>((set) => ({
  word: "",
  setWord: (w) => set({ word: w }),
}));
