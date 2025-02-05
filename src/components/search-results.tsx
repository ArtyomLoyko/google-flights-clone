import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { FlightData } from "@/lib/types"

interface SearchResultsProps {
  isLoading: boolean
  isError: boolean
  data?: FlightData
}

export function SearchResults({ isLoading, isError, data }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading flight results. Please try again.</p>
      </div>
    )
  }

  if (!data?.data?.itineraries?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No flights found for your search criteria.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {data.data.itineraries.map((itinerary) => (
        <Card key={itinerary.id} className="p-6">
          <div className="flex flex-wrap gap-6 justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center bg-blue-50 rounded-lg">
                <img
                  src={itinerary.legs[0].carriers.marketing[0].logoUrl || "/placeholder.svg"}
                  alt={itinerary.legs[0].carriers.marketing[0].name}
                  className="h-8 w-8 object-contain"
                />
              </div>
              <div>
                <div className="font-semibold">
                  {new Date(itinerary.legs[0].departure).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  –
                  {new Date(itinerary.legs[0].arrival).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
                <div className="text-muted-foreground">
                  {itinerary.legs[0].carriers.marketing[0].name} •{Math.floor(itinerary.legs[0].durationInMinutes / 60)}
                  h{itinerary.legs[0].durationInMinutes % 60}m •
                  {itinerary.legs[0].stopCount === 0
                    ? "Nonstop"
                    : `${itinerary.legs[0].stopCount} stop${itinerary.legs[0].stopCount > 1 ? "s" : ""}`}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div>
                <div className="text-xl font-semibold">{itinerary.price.formatted}</div>
                <div className="text-sm text-muted-foreground">
                  {itinerary.legs.length > 1 ? "Round trip" : "One way"}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

