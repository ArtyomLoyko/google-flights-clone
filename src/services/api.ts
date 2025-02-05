import { AirportData, FlightData, SearchFlightsParams } from "@/lib/types"

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY
const API_HOST = import.meta.env.VITE_RAPIDAPI_HOST

export async function searchAirports(
  query: string
): Promise<AirportData> {
  const response = await fetch(
    `https://${API_HOST}/api/v1/flights/searchAirport?query=${encodeURIComponent(
      query
    )}`,
    {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export async function searchFlights(
  params: SearchFlightsParams
): Promise<FlightData> {
  const response = await fetch(
    `https://${API_HOST}/api/v1/flights/searchFlights?` +
      new URLSearchParams({
        originSkyId: params.originSkyId,
        destinationSkyId: params.destinationSkyId,
        originEntityId: params.originEntityId,
        destinationEntityId: params.destinationEntityId,
        date: params.departDate,
        ...(params.returnDate && { returnDate: params.returnDate }),
        adults: params.adults.toString(),
        cabinClass: params.cabinClass,
      }),
    {
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': API_HOST,
      },
    }
  )

  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}
