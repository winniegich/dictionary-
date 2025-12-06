import { create } from "zustand";

interface DictionaryState {
  word: string;
  recentSearches: string[];
  setWord: (word: string) => void;
}

export const useDictionaryStore = create<DictionaryState>((set) => ({
  word: "",
  recentSearches: [],

  setWord: (word: string) =>
    set((state) => ({
      word,
      recentSearches: state.recentSearches.includes(word)
        ? state.recentSearches // avoid duplicates
        : [word, ...state.recentSearches].slice(0, 5), // keep only latest 5 searches
    })),
}));
