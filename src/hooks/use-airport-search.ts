import { useState, useEffect } from "react"
import { useQuery } from "@tanstack/react-query"
import { searchAirports } from "@/services/api"

export function useAirportSearch(query: string) {
  const [debouncedQuery, setDebouncedQuery] = useState(query)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  }, [query])

  return useQuery({
    queryKey: ["airports", debouncedQuery],
    queryFn: () => searchAirports(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
    staleTime: 1000 * 60 * 5,
  })
}

