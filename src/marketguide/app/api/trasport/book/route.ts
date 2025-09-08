import { type NextRequest, NextResponse } from "next/server"

interface TransportBooking {
  id: string
  farmerName: string
  phone: string
  pickup: string
  destination: string
  crop: string
  quantity: number
  preferredDate: string
  status: "pending" | "confirmed" | "completed"
  createdAt: string
}

const bookings: TransportBooking[] = []

export async function POST(request: NextRequest) {
  try {
    const { farmerName, phone, pickup, destination, crop, quantity, preferredDate } = await request.json()

    const booking: TransportBooking = {
      id: Math.random().toString(36).substr(2, 9),
      farmerName,
      phone,
      pickup,
      destination,
      crop,
      quantity: Number(quantity),
      preferredDate,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    bookings.push(booking)

    return NextResponse.json({
      success: true,
      message: "Transport booking created successfully",
      bookingId: booking.id,
      estimatedCost: quantity * 50, // ₹50 per quintal
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ bookings })
}
