import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { CalendarIcon, Plane, MapPin, Users } from "lucide-react"
import { format } from "date-fns"
import { AirportSelect } from "./airport-select"

interface SelectedAirport {
  skyId: string
  entityId: string
}

export function SearchForm() {
  const navigate = useNavigate()
  const [departure, setDeparture] = useState<SelectedAirport | null>(null)
  const [destination, setDestination] = useState<SelectedAirport | null>(null)
  const [departureDate, setDepartureDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()
  const [passengers, setPassengers] = useState("1")
  const [tripType, setTripType] = useState("round")
  const [cabinClass, setCabinClass] = useState("economy")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (!departure || !destination || !departureDate) return

    const searchParams = new URLSearchParams({
      from: departure.skyId,
      to: destination.skyId,
      originEntityId: departure.entityId,
      destinationEntityId: destination.entityId,
      depart: format(departureDate, "yyyy-MM-dd"),
      ...(returnDate && { return: format(returnDate, "yyyy-MM-dd") }),
      passengers,
      class: cabinClass,
      type: tripType,
    })
    navigate(`/search?${searchParams.toString()}`)
  }

  const handleDepartureChange = (airport: SelectedAirport | null) => {
    setDeparture(airport)
  }

  const handleDestinationChange = (airport: SelectedAirport | null) => {
    setDestination(airport)
  }

  return (
    <Card className="max-w-4xl mx-auto p-6">
      <form onSubmit={handleSearch} className="space-y-6">
        <div className="flex gap-4 flex-wrap md:flex-nowrap">
          <Select value={tripType} onValueChange={setTripType}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Trip type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="round">Round trip</SelectItem>
              <SelectItem value="one">One way</SelectItem>
            </SelectContent>
          </Select>

          <Select value={passengers} onValueChange={setPassengers}>
            <SelectTrigger className="w-[160px]">
              <Users className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Passengers" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "passenger" : "passengers"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={cabinClass} onValueChange={setCabinClass}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Cabin class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="economy">Economy</SelectItem>
              <SelectItem value="premium">Premium Economy</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="first">First Class</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr,1fr]">
          <AirportSelect
            value={departure?.skyId || ""}
            onChange={handleDepartureChange}
            placeholder="From where?"
            icon={<Plane className="h-4 w-4" />}
          />

          <AirportSelect
            value={destination?.skyId || ""}
            onChange={handleDestinationChange}
            placeholder="Where to?"
            icon={<MapPin className="h-4 w-4" />}
          />

          <div className="flex gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={`w-full justify-start text-left font-normal ${!departureDate && "text-muted-foreground"}`}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {departureDate ? format(departureDate, "PPP") : "Departure date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar mode="single" selected={departureDate} onSelect={setDepartureDate} initialFocus />
              </PopoverContent>
            </Popover>

            {tripType === "round" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={`w-full justify-start text-left font-normal ${!returnDate && "text-muted-foreground"}`}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {returnDate ? format(returnDate, "PPP") : "Return date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                </PopoverContent>
              </Popover>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <Button type="submit" size="lg" className="px-8" disabled={!departure || !destination || !departureDate}>
            Search flights
          </Button>
        </div>
      </form>
    </Card>
  )
}

