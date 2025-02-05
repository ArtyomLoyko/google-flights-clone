type Itinerary = {
  id: string;
  price: {
    raw: number;
    formatted: string;
  };
  legs: Leg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: {
    isChangeAllowed: boolean;
    isPartiallyChangeable: boolean;
    isCancellationAllowed: boolean;
    isPartiallyRefundable: boolean;
  };
  eco?: {
    ecoContenderDelta: number;
  };
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};

type Leg = {
  id: string;
  origin: Location;
  destination: Location;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: {
    marketing: Carrier[];
    operationType: string;
  };
  segments: Segment[];
};

type Location = {
  id: string;
  name: string;
  displayCode: string;
  city?: string;
  isHighlighted?: boolean;
};

type Carrier = {
  id: number;
  logoUrl: string;
  name: string;
};

type Segment = {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Airline;
  operatingCarrier: Airline;
};

type FlightPlace = {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
};

type Airline = {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
};

export type FlightData = {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
  };
};

export type SearchFlightsParams = {
  originSkyId: string
  destinationSkyId: string
  originEntityId: string
  destinationEntityId: string
  departDate: string
  returnDate?: string
  adults: number
  cabinClass: string
}

export type Airport = {
  presentation: {
    title: string
    suggestionTitle: string
    subtitle: string
  }
  navigation: {
    entityId: string
    entityType: string
    localizedName: string
    relevantFlightParams: {
      skyId: string
      entityId: string
      flightPlaceType: string
      localizedName: string
    }
  }
}

export type AirportData = {
  status: boolean;
  timestamp: number;
  data: Airport[]
};