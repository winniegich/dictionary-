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
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-lg">
      <input
        type="text"
        className="border border-gray-300 rounded-lg px-4 py-2 w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Enter a word..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-blue-600"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
