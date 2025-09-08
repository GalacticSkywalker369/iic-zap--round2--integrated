import { type NextRequest, NextResponse } from "next/server"

const cropProfitData = {
  wheat: { costPerQuintal: 1800, marketPrice: 2150, profitMargin: 0.15 },
  rice: { costPerQuintal: 1600, marketPrice: 1890, profitMargin: 0.12 },
  cotton: { costPerQuintal: 4500, marketPrice: 5200, profitMargin: 0.18 },
  sugarcane: { costPerQuintal: 280, marketPrice: 350, profitMargin: 0.2 },
  maize: { costPerQuintal: 1400, marketPrice: 1650, profitMargin: 0.14 },
}

export async function POST(request: NextRequest) {
  try {
    const { crop, quantity } = await request.json()

    const cropData = cropProfitData[crop.toLowerCase() as keyof typeof cropProfitData]

    if (!cropData) {
      return NextResponse.json(
        {
          success: false,
          message: "Crop data not available",
        },
        { status: 400 },
      )
    }

    const totalCost = cropData.costPerQuintal * quantity
    const totalRevenue = cropData.marketPrice * quantity
    const profit = totalRevenue - totalCost
    const profitPercentage = (profit / totalCost) * 100

    return NextResponse.json({
      success: true,
      data: {
        crop,
        quantity,
        totalCost,
        totalRevenue,
        profit,
        profitPercentage: Math.round(profitPercentage * 100) / 100,
        marketPrice: cropData.marketPrice,
        costPerQuintal: cropData.costPerQuintal,
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to calculate profit",
      },
      { status: 500 },
    )
  }
}
