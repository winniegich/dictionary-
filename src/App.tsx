// src/App.tsx
import SearchBar from "./components/SearchBar";
import WordCard from "./components/WordCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 p-4">
        <h1 className="text-3xl font-bold text-center mt-6">Dictionary App</h1>
        <SearchBar />
        <WordCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
