import SearchBar from "./components/SearchBar";
import WordCard from "./components/WordCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
  
        <header className="text-center mt-6 mb-10">
          <h1 className="text-4xl font-bold text-blue-900 mb-2">
            📖 My Friendly Dictionary
          </h1>
          <p className="text-gray-700 text-lg">
            Type a word and discover its meaning, phonetics, and examples
          </p>
        </header>

        <SearchBar />
        <WordCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
