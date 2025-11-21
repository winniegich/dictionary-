// src/components/WordCard.tsx
import { useQuery } from "@tanstack/react-query";
import { fetchWord } from "../api/dictionary";
import { useDictionaryStore } from "../store/useDictionaryStore";
import type { DictionaryWord } from "../types/dictionary";

export default function WordCard() {
  const word = useDictionaryStore((s) => s.word);

  const { data, isLoading, isError } = useQuery<DictionaryWord>({
    queryKey: ["dictionary", word],
    queryFn: () => fetchWord(word),
    enabled: !!word,
    staleTime: 1000 * 60 * 5, // optional: 5 minutes cache
  });

  if (!word) return null;
  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError || !data) return <p className="text-center mt-4">Word not found.</p>;

  const playAudio = () => {
    const audioUrl = data.phonetics?.find((p) => p.audio)?.audio;
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="bg-white shadow-md rounded p-4 max-w-xl mx-auto mt-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{data.word}</h2>
        <button onClick={playAudio} className="text-blue-500">🔊</button>
      </div>

      {data.phonetics?.[0]?.text && (
        <p className="text-gray-500">{data.phonetics[0].text}</p>
      )}

      {data.meanings.map((meaning, idx) => (
        <section key={idx} className="mt-3">
          <p className="font-semibold">{meaning.partOfSpeech}</p>

          {meaning.definitions.map((def, i) => (
            <div key={i} className="pl-4 mt-1">
              <p>• {def.definition}</p>
              {def.example && (
                <p className="italic text-gray-600">Example: {def.example}</p>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
