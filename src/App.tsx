import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { SearchPage } from "./pages/search-page"
import { ResultsPage } from "./pages/results-page"
import { BrowserRouter, Routes, Route } from "react-router-dom"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/search" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}