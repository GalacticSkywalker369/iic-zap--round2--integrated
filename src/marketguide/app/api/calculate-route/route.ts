import { type NextRequest, NextResponse } from "next/server"

// Indian cities with coordinates for distance calculation
const INDIAN_CITIES = {
  Delhi: { lat: 28.6139, lng: 77.209 },
  Mumbai: { lat: 19.076, lng: 72.8777 },
  Bangalore: { lat: 12.9716, lng: 77.5946 },
  Chennai: { lat: 13.0827, lng: 80.2707 },
  Kolkata: { lat: 22.5726, lng: 88.3639 },
  Hyderabad: { lat: 17.385, lng: 78.4867 },
  Pune: { lat: 18.5204, lng: 73.8567 },
  Ahmedabad: { lat: 23.0225, lng: 72.5714 },
  Jaipur: { lat: 26.9124, lng: 75.7873 },
  Lucknow: { lat: 26.8467, lng: 80.9462 },
  Kanpur: { lat: 26.4499, lng: 80.3319 },
  Nagpur: { lat: 21.1458, lng: 79.0882 },
  Indore: { lat: 22.7196, lng: 75.8577 },
  Bhopal: { lat: 23.2599, lng: 77.4126 },
  Patna: { lat: 25.5941, lng: 85.1376 },
  Vadodara: { lat: 22.3072, lng: 73.1812 },
  Ghaziabad: { lat: 28.6692, lng: 77.4538 },
  Agra: { lat: 27.1767, lng: 78.0081 },
  Nashik: { lat: 19.9975, lng: 73.7898 },
  Faridabad: { lat: 28.4089, lng: 77.3178 },
}

// Major agricultural markets
const AGRICULTURAL_MARKETS = [
  "Delhi Azadpur Mandi",
  "Mumbai Vashi APMC",
  "Bangalore KR Market",
  "Chennai Koyambedu Market",
  "Kolkata Sealdah Market",
  "Hyderabad Gaddiannaram",
  "Pune Market Yard",
  "Ahmedabad Jamalpur Market",
  "Jaipur Muhana Mandi",
  "Lucknow Yahiyaganj Mandi",
]

function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371 // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

function findNearestCity(location: string): string {
  const cities = Object.keys(INDIAN_CITIES)
  const normalizedLocation = location.toLowerCase().trim()

  // Exact match
  const exactMatch = cities.find((city) => city.toLowerCase() === normalizedLocation)
  if (exactMatch) return exactMatch

  // Partial match
  const partialMatch = cities.find(
    (city) => city.toLowerCase().includes(normalizedLocation) || normalizedLocation.includes(city.toLowerCase()),
  )
  if (partialMatch) return partialMatch

  // Default to Delhi if no match found
  return "Delhi"
}

export async function POST(request: NextRequest) {
  try {
    const { from, to } = await request.json()

    if (!from || !to) {
      return NextResponse.json({ error: "Both pickup and destination locations are required" }, { status: 400 })
    }

    // Find nearest cities
    const fromCity = findNearestCity(from)
    const toCity = findNearestCity(to)

    const fromCoords = INDIAN_CITIES[fromCity as keyof typeof INDIAN_CITIES]
    const toCoords = INDIAN_CITIES[toCity as keyof typeof INDIAN_CITIES]

    // Calculate distance
    const distance = calculateDistance(fromCoords.lat, fromCoords.lng, toCoords.lat, toCoords.lng)

    // Calculate duration (assuming average speed of 50 km/h)
    const durationHours = distance / 50
    const hours = Math.floor(durationHours)
    const minutes = Math.round((durationHours - hours) * 60)

    // Calculate cost (₹15 per km base rate + fuel + tolls)
    const baseCost = distance * 15
    const fuelCost = distance * 8 // ₹8 per km for fuel
    const tollCost = distance > 100 ? Math.floor(distance / 100) * 200 : 0 // ₹200 per 100km for tolls
    const totalCost = Math.round(baseCost + fuelCost + tollCost)

    // Find markets on route (simplified - just pick random markets)
    const marketsOnRoute = AGRICULTURAL_MARKETS.sort(() => 0.5 - Math.random()).slice(0, 3)

    return NextResponse.json({
      success: true,
      route: {
        from: fromCity,
        to: toCity,
        distance: `${Math.round(distance)} km`,
        duration: hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`,
        cost: totalCost.toString(),
        marketsOnRoute,
      },
    })
  } catch (error) {
    console.error("Route calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate route" }, { status: 500 })
  }
}
