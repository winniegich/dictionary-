import { useState } from "react";
import { useDictionaryStore } from "../store/useDictionaryStore";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const setWord = useDictionaryStore((state) => state.setWord);

  const handleSearch = () => {
    if (input.trim() !== "") setWord(input.trim());
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full max-w-md mx-auto mt-10">
      <input
        type="text"
        className="border rounded px-3 py-2 w-full sm:w-auto"
        placeholder="Enter a word"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
