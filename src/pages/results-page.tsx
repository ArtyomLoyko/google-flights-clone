import { useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { searchFlights } from '@/services/api'
import { SearchResults } from '@/components/search-results'

export function ResultsPage() {
  const [searchParams] = useSearchParams()

  const query = useQuery({
    queryKey: ['flights', Object.fromEntries(searchParams)],
    queryFn: () =>
      searchFlights({
        originSkyId: searchParams.get('from') || '',
        destinationSkyId: searchParams.get('to') || '',
        originEntityId: searchParams.get('originEntityId') || '',
        destinationEntityId: searchParams.get('destinationEntityId') || '',
        departDate: searchParams.get('depart') || '',
        returnDate: searchParams.get('return') || undefined,
        adults: Number.parseInt(searchParams.get('passengers') || '1'),
        cabinClass: searchParams.get('class') || 'economy',
      }),
  })

  return (
    <main className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-8'>
        <SearchResults
          isLoading={query.isLoading}
          isError={query.isError}
          data={query.data}
        />
      </div>
    </main>
  )
}
