import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchBar from "./components/SearchBar";
import WordCard from "./components/WordCard";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex justify-center items-start py-10 px-4">
        <div className="w-full max-w-xl">
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold text-blue-700">
              Simple Dictionary
            </h1>
            <p className="text-gray-600 mt-1">
              Search any word to see its meaning, usage, and phonetics
            </p>
          </header>

          <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col gap-6">
            <SearchBar />
            <WordCard />
          </div>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
