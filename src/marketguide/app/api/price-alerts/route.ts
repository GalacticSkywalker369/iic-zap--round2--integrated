import { type NextRequest, NextResponse } from "next/server"

interface PriceAlert {
  id: string
  crop: string
  location: string
  targetPrice: number
  email: string
  createdAt: string
}

// In-memory storage (in production, use a database)
const priceAlerts: PriceAlert[] = []

export async function POST(request: NextRequest) {
  try {
    const { crop, location, targetPrice, email } = await request.json()

    const alert: PriceAlert = {
      id: Math.random().toString(36).substr(2, 9),
      crop,
      location,
      targetPrice: Number(targetPrice),
      email,
      createdAt: new Date().toISOString(),
    }

    priceAlerts.push(alert)

    return NextResponse.json({
      success: true,
      message: "Price alert created successfully",
      alertId: alert.id,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to create price alert",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ alerts: priceAlerts })
}
