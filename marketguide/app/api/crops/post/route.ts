import { type NextRequest, NextResponse } from "next/server"

interface CropListing {
  id: string
  farmerName: string
  phone: string
  crop: string
  quantity: number
  pricePerQuintal: number
  location: string
  harvestDate: string
  description: string
  status: "available" | "sold" | "reserved"
  createdAt: string
}

const cropListings: CropListing[] = []

export async function POST(request: NextRequest) {
  try {
    const { farmerName, phone, crop, quantity, pricePerQuintal, location, harvestDate, description } =
      await request.json()

    const listing: CropListing = {
      id: Math.random().toString(36).substr(2, 9),
      farmerName,
      phone,
      crop,
      quantity: Number(quantity),
      pricePerQuintal: Number(pricePerQuintal),
      location,
      harvestDate,
      description,
      status: "available",
      createdAt: new Date().toISOString(),
    }

    cropListings.push(listing)

    return NextResponse.json({
      success: true,
      message: "Crop listing created successfully",
      listingId: listing.id,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create crop listing",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ listings: cropListings })
}
