import { type NextRequest, NextResponse } from "next/server"

interface ConnectionRequest {
  id: string
  requesterName: string
  requesterPhone: string
  requesterEmail: string
  targetType: "buyer" | "seller"
  targetName: string
  crop: string
  message: string
  status: "pending" | "accepted" | "declined"
  createdAt: string
}

const connections: ConnectionRequest[] = []

export async function POST(request: NextRequest) {
  try {
    const { requesterName, requesterPhone, requesterEmail, targetType, targetName, crop, message } =
      await request.json()

    const connection: ConnectionRequest = {
      id: Math.random().toString(36).substr(2, 9),
      requesterName,
      requesterPhone,
      requesterEmail,
      targetType,
      targetName,
      crop,
      message,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    connections.push(connection)

    return NextResponse.json({
      success: true,
      message: "Connection request sent successfully",
      connectionId: connection.id,
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to send connection request",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({ connections })
}
