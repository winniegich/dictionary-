import { useEffect, useState } from "react";
import { useDictionaryStore } from "../store/useDictionaryStore";
import type { DictionaryWord, Meaning, Definition, Phonetic } from "../types/dictionary";

export default function WordCard() {
  const { word } = useDictionaryStore();

  const [data, setData] = useState<DictionaryWord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (!word) return;

    const fetchWord = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const res = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!res.ok) throw new Error();

        const result: DictionaryWord[] = await res.json();
        setData(result[0]);
      } catch {
        setIsError(true);
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWord();
  }, [word]);

  if (!word) return null;
  if (isLoading) return <p className="text-center text-gray-600">Loading...</p>;
  if (isError || !data)
    return <p className="text-center text-red-600">Word not found. Check spelling.</p>;

  const playAudio = () => {
    const url = data.phonetics?.find((p: Phonetic) => p.audio)?.audio;
    if (url) new Audio(url).play();
  };

  return (
    <div className="mt-6 flex flex-col gap-4">

      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{data.word}</h2>
          {data.phonetics?.[0]?.text && (
            <p className="text-gray-500">{data.phonetics[0].text}</p>
          )}
        </div>

        {data.phonetics?.find((p: Phonetic) => p.audio) && (
          <button
            onClick={playAudio}
            className="text-2xl hover:opacity-70"
            title="Play pronunciation"
          >
            🔊
          </button>
        )}
      </div>

      {data.meanings.map((meaning: Meaning, idx: number) => (
        <div key={idx} className="border border-gray-300 p-4 rounded-xl bg-gray-50 shadow-sm">
          <p className="text-blue-700 font-semibold italic">
            {meaning.partOfSpeech}
          </p>

          {meaning.definitions.slice(0, 3).map((def: Definition, i: number) => (
            <div key={i} className="mt-3">
              <p className="text-gray-800">
                {i + 1}. {def.definition}
              </p>

              {def.example && (
                <p className="text-gray-500 italic mt-1 ml-4">"{def.example}"</p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}


