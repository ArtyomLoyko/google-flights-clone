import { SearchForm } from "@/components/search-form"

export function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        <div className="relative">
          <img
            src="https://www.gstatic.com/travel-frontend/animation/hero/flights_nc_4.svg"
            alt="Winter landscape with mountains"
            className="absolute inset-0 w-full h-[500px] object-cover opacity-50 pointer-events-none"
          />
          <div className="relative z-10 pt-[300px]">
            <h1 className="text-5xl font-bold text-center mb-12">Flights</h1>
            <SearchForm />
          </div>
        </div>
      </div>
    </main>
  )
}

