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
    staleTime: 1000 * 60 * 5, 
  });

  if (!word) return null;
  if (isLoading) return <p className="text-center mt-4">Loading...</p>;
  if (isError || !data) return <p className="text-center mt-4">Word not found.</p>;

  const playAudio = () => {
    const audioUrl = data.phonetics?.find((p) => p.audio)?.audio;
    if (audioUrl) new Audio(audioUrl).play();
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 max-w-2xl mx-auto mt-8 animate-fadeIn">
      
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-3xl font-bold text-gray-900">{data.word}</h2>
        <button
          onClick={playAudio}
          className="text-blue-500 hover:text-blue-700 text-2xl"
          title="Play pronunciation"
        >
          🔊
        </button>
      </div>

      {data.phonetics?.[0]?.text && (
        <p className="text-gray-500 italic mb-4">{data.phonetics[0].text}</p>
      )}

      {data.meanings.map((meaning, idx) => (
        <section key={idx} className="mt-4">
          <p className="font-semibold text-lg text-blue-700">{meaning.partOfSpeech}</p>
          {meaning.definitions.map((def, i) => (
            <div key={i} className="pl-4 mt-2">
              <p className="mb-1 text-gray-800">• {def.definition}</p>
              {def.example && (
                <p className="italic text-gray-500 mb-2">Example: {def.example}</p>
              )}
            </div>
          ))}
        </section>
      ))}
    </div>
  );
}
