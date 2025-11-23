import type { DictionaryWord } from "../types/dictionary";

export async function fetchWord(word: string): Promise<DictionaryWord> {
  if (!word) throw new Error("No word provided");

  const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);

  if (!res.ok) {
    // keep the error so react-query treats it as an error
    throw new Error("Word not found");
  }

  const data = (await res.json()) as DictionaryWord[];
  if (!Array.isArray(data) || !data[0]) throw new Error("Invalid response");
  return data[0];
}
