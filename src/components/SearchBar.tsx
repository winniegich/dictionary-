import { useState } from "react";
import { useDictionaryStore } from "../store/useDictionaryStore";

export default function SearchBar() {
  const [input, setInput] = useState("");
  const { setWord, recentSearches } = useDictionaryStore();

  const handleSearch = () => {
    if (input.trim() !== "") {
      setWord(input.trim());
    }
  };

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search for a word..."
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button
          onClick={handleSearch}
          className="bg-black text-white px-6 py-2 rounded-lg text-sm hover:bg-gray-800"
        >
          Search
        </button>
      </div>

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="mt-4">
          <p className="font-medium text-gray-700">Recent Searches:</p>
          <ul className="list-disc pl-5 mt-1 text-gray-800 space-y-1">
            {recentSearches.map((item, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => {
                  setInput(item);
                  setWord(item);
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}



