"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Search, Tractor, Sprout, Users, DollarSign, FlaskConical, Leaf } from "lucide-react"

interface FarmingMethod {
  id: string
  name: string
  description: string
  suitableCrops: string[]
  setupCost: string
  laborRequirement: string
  fertilizerUsage: string
  nutrientEfficiency: string
  environmentalImpact: string
  advantages: string[]
  disadvantages: string[]
  color: string
}

interface CropRecommendation {
  crop: string
  bestMethods: FarmingMethod[]
  reasoning: string
}

const farmingMethods: FarmingMethod[] = [
  {
    id: "conventional",
    name: "Conventional Farming",
    description:
      "Traditional farming using synthetic fertilizers, pesticides, and modern machinery for large-scale production.",
    suitableCrops: ["Corn", "Wheat", "Soybeans", "Cotton", "Rice"],
    setupCost: "$2,000 - $5,000 per acre",
    laborRequirement: "Low to Medium (mechanized)",
    fertilizerUsage: "High (synthetic NPK fertilizers)",
    nutrientEfficiency: "Medium (some nutrient loss)",
    environmentalImpact: "Medium to High impact",
    advantages: ["High yields", "Cost-effective for large scale", "Established supply chains", "Predictable results"],
    disadvantages: ["Environmental concerns", "Soil degradation over time", "Chemical residues", "High input costs"],
    color: "#369042",
  },
  {
    id: "organic",
    name: "Organic Farming",
    description:
      "Sustainable farming without synthetic chemicals, focusing on soil health and natural pest management.",
    suitableCrops: ["Vegetables", "Fruits", "Herbs", "Grains", "Legumes"],
    setupCost: "$3,000 - $7,000 per acre",
    laborRequirement: "High (manual labor intensive)",
    fertilizerUsage: "Low (organic compost, manure)",
    nutrientEfficiency: "High (slow-release nutrients)",
    environmentalImpact: "Low impact (sustainable)",
    advantages: [
      "Environmentally friendly",
      "Premium market prices",
      "Soil health improvement",
      "No chemical residues",
    ],
    disadvantages: [
      "Lower initial yields",
      "Higher labor costs",
      "Certification requirements",
      "Pest management challenges",
    ],
    color: "#a1cc33",
  },
  {
    id: "precision",
    name: "Precision Agriculture",
    description: "Technology-driven farming using GPS, sensors, and data analytics for optimized resource application.",
    suitableCrops: ["Corn", "Soybeans", "Wheat", "Cotton", "Potatoes"],
    setupCost: "$5,000 - $15,000 per acre",
    laborRequirement: "Low (highly automated)",
    fertilizerUsage: "Optimized (variable rate application)",
    nutrientEfficiency: "Very High (precise application)",
    environmentalImpact: "Low to Medium impact",
    advantages: ["Maximum efficiency", "Reduced waste", "Data-driven decisions", "Environmental benefits"],
    disadvantages: [
      "High initial investment",
      "Technical expertise required",
      "Technology dependence",
      "Complex systems",
    ],
    color: "#ffca53",
  },
  {
    id: "vertical",
    name: "Vertical Farming",
    description: "Indoor farming in vertically stacked layers using controlled environment and artificial lighting.",
    suitableCrops: ["Leafy greens", "Herbs", "Strawberries", "Microgreens", "Tomatoes"],
    setupCost: "$10,000 - $40,000 per acre equivalent",
    laborRequirement: "Medium (specialized skills)",
    fertilizerUsage: "Low (hydroponic nutrients)",
    nutrientEfficiency: "Very High (recirculating systems)",
    environmentalImpact: "Low impact (no pesticides)",
    advantages: ["Year-round production", "No weather dependence", "High yields per sq ft", "No pesticides needed"],
    disadvantages: ["Very high setup costs", "High energy consumption", "Limited crop variety", "Technical complexity"],
    color: "#d9e5b3",
  },
  {
    id: "permaculture",
    name: "Permaculture",
    description:
      "Sustainable farming design mimicking natural ecosystems with diverse crops and minimal external inputs.",
    suitableCrops: ["Mixed vegetables", "Fruit trees", "Nuts", "Herbs", "Grains"],
    setupCost: "$1,500 - $4,000 per acre",
    laborRequirement: "High initially, Low maintenance",
    fertilizerUsage: "Very Low (natural cycling)",
    nutrientEfficiency: "High (natural nutrient cycling)",
    environmentalImpact: "Very Low impact (regenerative)",
    advantages: ["Self-sustaining", "Biodiversity enhancement", "Low ongoing costs", "Climate resilient"],
    disadvantages: [
      "Long establishment period",
      "Complex design needed",
      "Lower commercial yields",
      "Market limitations",
    ],
    color: "#f9fb80",
  },
]

const mockCropRecommendations: Record<string, CropRecommendation> = {
  tomatoes: {
    crop: "Tomatoes",
    bestMethods: [farmingMethods[1], farmingMethods[3], farmingMethods[2]], // organic, vertical, precision
    reasoning:
      "Tomatoes benefit from controlled environments and organic practices. Vertical farming offers year-round production, while organic farming provides premium market value.",
  },
  corn: {
    crop: "Corn",
    bestMethods: [farmingMethods[2], farmingMethods[0]], // precision, conventional
    reasoning:
      "Corn is ideal for precision agriculture due to large field sizes and technology compatibility. Conventional farming remains cost-effective for large-scale production.",
  },
  lettuce: {
    crop: "Lettuce",
    bestMethods: [farmingMethods[3], farmingMethods[1]], // vertical, organic
    reasoning:
      "Lettuce thrives in controlled vertical farming environments with consistent conditions. Organic production commands premium prices for leafy greens.",
  },
  herbs: {
    crop: "Herbs",
    bestMethods: [farmingMethods[1], farmingMethods[3], farmingMethods[4]], // organic, vertical, permaculture
    reasoning:
      "Herbs are perfect for organic and vertical farming due to high value per unit. Permaculture systems support diverse herb production naturally.",
  },
}

export default function FarmingMethodsPage() {
  const [searchCrop, setSearchCrop] = useState("")
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null)
  const [cropRecommendation, setCropRecommendation] = useState<CropRecommendation | null>(null)

  const handleSearch = () => {
    if (!searchCrop.trim()) return

    const cropKey = searchCrop.toLowerCase()
    let recommendation = mockCropRecommendations["tomatoes"] // default

    for (const [key, value] of Object.entries(mockCropRecommendations)) {
      if (cropKey.includes(key)) {
        recommendation = value
        break
      }
    }

    setCropRecommendation(recommendation)
  }

  const handleMethodSelect = (methodId: string) => {
    setSelectedMethod(selectedMethod === methodId ? null : methodId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d9e5b3]/10 via-background to-[#f9fb80]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="border-[#d9e5b3]/50 hover:border-[#a1cc33] hover:bg-[#a1cc33]/10"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: "#a1cc33" }} />
            </Button>
            <div className="h-2 w-16 bg-gradient-to-r from-[#d9e5b3] to-[#a1cc33] rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#d9e5b3] to-[#a1cc33] bg-clip-text text-transparent tracking-tight">
              FARMING METHODS
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-[#d9e5b3] to-[#a1cc33] w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Explore modern agricultural techniques and find the best farming method for your crops
          </p>
        </div>

        {/* Crop Search Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-[#d9e5b3]/10 to-[#a1cc33]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-[#a1cc33]/10 rounded-lg">
                <Search className="h-7 w-7" style={{ color: "#a1cc33" }} />
              </div>
              <span style={{ color: "#a1cc33" }}>Find Best Farming Method</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter a crop name to get personalized farming method recommendations with cost analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Sprout className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter crop name (e.g., tomatoes, corn, lettuce, herbs)..."
                  value={searchCrop}
                  onChange={(e) => setSearchCrop(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                  className="pl-10 border-2 border-[#a1cc33]/30 focus:border-[#a1cc33] rounded-xl h-14 text-base"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={!searchCrop.trim()}
                className="h-14 px-8 bg-[#a1cc33] hover:bg-[#369042] text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                Find Methods
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Crop Recommendations */}
        {cropRecommendation && (
          <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#a1cc33]/5 to-[#369042]/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-[#a1cc33]/10 rounded-lg">
                  <Leaf className="h-7 w-7" style={{ color: "#a1cc33" }} />
                </div>
                <span style={{ color: "#a1cc33" }}>Best Methods for {cropRecommendation.crop}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-600 leading-relaxed mb-6">{cropRecommendation.reasoning}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cropRecommendation.bestMethods.slice(0, 3).map((method, index) => (
                  <Card
                    key={method.id}
                    className="border-2 border-transparent hover:border-[#a1cc33]/30 bg-gradient-to-br from-white to-[#a1cc33]/5 shadow-lg hover-lift group transition-all duration-300"
                  >
                    <CardContent className="p-4 text-center">
                      <div
                        className="p-3 rounded-xl mx-auto mb-3 w-fit transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${method.color}15`,
                          color: method.color,
                        }}
                      >
                        <Tractor className="h-6 w-6" />
                      </div>
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{method.name}</h3>
                      <p className="text-sm text-gray-600 mb-3">{method.setupCost}</p>
                      <Badge
                        className="text-xs"
                        style={{
                          backgroundColor: `${method.color}15`,
                          color: method.color,
                          borderColor: `${method.color}30`,
                        }}
                      >
                        Rank #{index + 1}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Farming Methods Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#d9e5b3] to-[#a1cc33] bg-clip-text text-transparent mb-6">
            All Farming Methods
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {farmingMethods.map((method) => (
              <Card
                key={method.id}
                className={`cursor-pointer hover-lift border-2 border-transparent hover:border-[${method.color}]/30 bg-gradient-to-br from-white to-[${method.color}]/5 shadow-xl backdrop-blur-sm group transition-all duration-300 ${
                  selectedMethod === method.id ? `border-[${method.color}] shadow-2xl` : ""
                }`}
                onClick={() => handleMethodSelect(method.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${method.color}20`,
                        color: method.color,
                      }}
                    >
                      <Tractor className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <CardTitle
                        className="text-xl font-bold transition-colors duration-300"
                        style={{ color: method.color }}
                      >
                        {method.name}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">{method.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{method.setupCost}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{method.laborRequirement}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FlaskConical className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{method.fertilizerUsage}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-gray-500" />
                      <span className="text-sm text-gray-600">{method.nutrientEfficiency}</span>
                    </div>
                  </div>

                  {/* Suitable Crops */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">Suitable Crops:</p>
                    <div className="flex flex-wrap gap-1">
                      {method.suitableCrops.slice(0, 3).map((crop, index) => (
                        <Badge
                          key={index}
                          className="text-xs"
                          style={{
                            backgroundColor: `${method.color}15`,
                            color: method.color,
                            borderColor: `${method.color}30`,
                          }}
                        >
                          {crop}
                        </Badge>
                      ))}
                      {method.suitableCrops.length > 3 && (
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: `${method.color}10`,
                            color: method.color,
                            borderColor: `${method.color}20`,
                          }}
                        >
                          +{method.suitableCrops.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Detailed Information */}
                  {selectedMethod === method.id && (
                    <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Environmental Impact:</h4>
                        <p className="text-sm text-gray-600">{method.environmentalImpact}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Advantages:</h4>
                          <ul className="space-y-1">
                            {method.advantages.map((advantage, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: method.color }}></div>
                                {advantage}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Disadvantages:</h4>
                          <ul className="space-y-1">
                            {method.disadvantages.map((disadvantage, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                                {disadvantage}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  <Badge
                    className="mt-3 transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${method.color}15`,
                      color: method.color,
                      borderColor: `${method.color}30`,
                    }}
                  >
                    {selectedMethod === method.id ? "Hide details" : "View details"}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Getting Started Message */}
        {!cropRecommendation && (
          <Card className="mt-8 shadow-xl border-0 bg-gradient-to-r from-[#d9e5b3]/10 to-[#a1cc33]/5 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-[#a1cc33]/20 rounded-full w-fit mx-auto">
                  <Search className="h-12 w-12" style={{ color: "#a1cc33" }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Find Your Perfect Farming Method</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Search for your crop above to get personalized recommendations on the best farming methods, including
                  setup costs, labor requirements, fertilizer usage, and environmental impact analysis.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["Tomatoes", "Corn", "Lettuce", "Herbs", "Wheat"].map((crop) => (
                    <Button
                      key={crop}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchCrop(crop)}
                      className="border-[#a1cc33]/30 hover:border-[#a1cc33] hover:bg-[#a1cc33]/10"
                    >
                      Try {crop}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
