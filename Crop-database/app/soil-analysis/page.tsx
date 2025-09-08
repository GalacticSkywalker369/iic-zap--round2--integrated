"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, MapPin, Search, Loader2, Sprout, Droplets, Layers, FlaskConical, Recycle } from "lucide-react"

interface SoilAnalysis {
  location: string
  soilType: string
  description: string
  characteristics: {
    texture: string
    porosity: string
    pH: string
    drainage: string
  }
  suitableCrops: string[]
  recommendedFertilizers: string[]
  sideCrops: string[]
  improvements: string[]
}

interface SuggestionBubble {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  content: string[]
}

const mockSoilData: Record<string, SoilAnalysis> = {
  california: {
    location: "California",
    soilType: "Mediterranean Clay Loam",
    description:
      "Well-structured clay loam soil typical of Mediterranean climates, with good organic matter content and moderate drainage capabilities.",
    characteristics: {
      texture: "Clay Loam (35% clay, 40% silt, 25% sand)",
      porosity: "Medium porosity (45-50%)",
      pH: "Slightly alkaline (7.2-7.8)",
      drainage: "Moderate drainage with seasonal water retention",
    },
    suitableCrops: ["Grapes", "Olives", "Almonds", "Tomatoes", "Lettuce", "Broccoli"],
    recommendedFertilizers: ["Compost", "Sulfur (to lower pH)", "Phosphorus supplements", "Organic matter"],
    sideCrops: ["Clover", "Vetch", "Mustard", "Rye grass"],
    improvements: [
      "Add organic compost",
      "Install drainage systems",
      "Use cover crops",
      "Apply gypsum for clay structure",
    ],
  },
  texas: {
    location: "Texas",
    soilType: "Blackland Prairie Clay",
    description:
      "Heavy clay soil with high fertility but challenging drainage, characteristic of Texas blackland prairie regions.",
    characteristics: {
      texture: "Heavy Clay (60% clay, 30% silt, 10% sand)",
      porosity: "Low porosity (35-40%)",
      pH: "Neutral to slightly alkaline (7.0-7.5)",
      drainage: "Poor drainage, prone to waterlogging",
    },
    suitableCrops: ["Cotton", "Corn", "Sorghum", "Soybeans", "Winter wheat", "Sunflowers"],
    recommendedFertilizers: ["Nitrogen fertilizers", "Organic compost", "Gypsum", "Phosphorus"],
    sideCrops: ["Crimson clover", "Austrian winter peas", "Oats", "Annual ryegrass"],
    improvements: ["Improve drainage", "Add organic matter", "Use raised beds", "Apply gypsum regularly"],
  },
  florida: {
    location: "Florida",
    soilType: "Sandy Loam",
    description:
      "Well-draining sandy soil with low organic matter, typical of subtropical coastal regions with high leaching potential.",
    characteristics: {
      texture: "Sandy Loam (70% sand, 20% silt, 10% clay)",
      porosity: "High porosity (50-60%)",
      pH: "Slightly acidic (6.0-6.8)",
      drainage: "Excellent drainage, rapid water infiltration",
    },
    suitableCrops: ["Citrus fruits", "Strawberries", "Peppers", "Cucumbers", "Sweet corn", "Watermelons"],
    recommendedFertilizers: [
      "Slow-release fertilizers",
      "Organic compost",
      "Lime (to raise pH)",
      "Potassium supplements",
    ],
    sideCrops: ["Bahia grass", "Cowpeas", "Sunn hemp", "Crimson clover"],
    improvements: ["Add organic matter frequently", "Use mulching", "Install irrigation", "Apply lime as needed"],
  },
}

export default function SoilAnalysisPage() {
  const [location, setLocation] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [soilAnalysis, setSoilAnalysis] = useState<SoilAnalysis | null>(null)
  const [selectedBubble, setSelectedBubble] = useState<string | null>(null)

  const handleAnalyze = () => {
    if (!location.trim()) return

    setIsAnalyzing(true)

    // Simulate AI analysis
    setTimeout(() => {
      const locationKey = location.toLowerCase()
      let analysis = mockSoilData["california"] // default

      if (locationKey.includes("texas") || locationKey.includes("dallas") || locationKey.includes("houston")) {
        analysis = mockSoilData["texas"]
      } else if (locationKey.includes("florida") || locationKey.includes("miami") || locationKey.includes("orlando")) {
        analysis = mockSoilData["florida"]
      } else if (
        locationKey.includes("california") ||
        locationKey.includes("los angeles") ||
        locationKey.includes("san francisco")
      ) {
        analysis = mockSoilData["california"]
      }

      setSoilAnalysis(analysis)
      setIsAnalyzing(false)
    }, 2000)
  }

  const suggestionBubbles: SuggestionBubble[] = [
    {
      id: "crops",
      title: "Suitable Crops",
      subtitle: "Best crops for your soil type",
      icon: <Sprout className="h-5 w-5" />,
      color: "#369042",
      content: soilAnalysis?.suitableCrops || [],
    },
    {
      id: "texture",
      title: "Soil Texture & Porosity",
      subtitle: "Physical soil characteristics",
      icon: <Layers className="h-5 w-5" />,
      color: "#a1cc33",
      content: soilAnalysis
        ? [
            `Texture: ${soilAnalysis.characteristics.texture}`,
            `Porosity: ${soilAnalysis.characteristics.porosity}`,
            `pH Level: ${soilAnalysis.characteristics.pH}`,
            `Drainage: ${soilAnalysis.characteristics.drainage}`,
          ]
        : [],
    },
    {
      id: "fertilizers",
      title: "Recommended Fertilizers",
      subtitle: "Nutrients to improve soil quality",
      icon: <FlaskConical className="h-5 w-5" />,
      color: "#ffca53",
      content: soilAnalysis?.recommendedFertilizers || [],
    },
    {
      id: "sideCrops",
      title: "Cover & Side Crops",
      subtitle: "Crops for soil nutrient recovery",
      icon: <Recycle className="h-5 w-5" />,
      color: "#d9e5b3",
      content: soilAnalysis?.sideCrops || [],
    },
    {
      id: "improvements",
      title: "Soil Improvements",
      subtitle: "Ways to enhance soil quality",
      icon: <Droplets className="h-5 w-5" />,
      color: "#f9fb80",
      content: soilAnalysis?.improvements || [],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffca53]/10 via-background to-[#d9e5b3]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="border-[#ffca53]/30 hover:border-[#ffca53] hover:bg-[#ffca53]/10"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: "#ffca53" }} />
            </Button>
            <div className="h-2 w-16 bg-gradient-to-r from-[#ffca53] to-[#d9e5b3] rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#ffca53] to-[#d9e5b3] bg-clip-text text-transparent tracking-tight">
              SOIL ANALYSIS
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-[#ffca53] to-[#d9e5b3] w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            AI-powered soil analysis and agricultural recommendations for your location
          </p>
        </div>

        {/* Location Input Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-[#ffca53]/5 to-[#d9e5b3]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-[#ffca53]/10 rounded-lg">
                <MapPin className="h-7 w-7" style={{ color: "#ffca53" }} />
              </div>
              <span className="text-[#b8860b] font-bold">Enter Your Location</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter your city, state, or region to get detailed soil analysis and crop recommendations
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  placeholder="Enter your location (e.g., California, Texas, Florida)..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAnalyze()
                    }
                  }}
                  className="pl-10 border-2 border-[#ffca53]/30 focus:border-[#ffca53] rounded-xl h-14 text-base"
                  disabled={isAnalyzing}
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!location.trim() || isAnalyzing}
                className="h-14 px-8 bg-[#ffca53] hover:bg-[#d9e5b3] text-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Analyze Soil
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Soil Analysis Results */}
        {soilAnalysis && (
          <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r from-[#ffca53]/5 to-[#d9e5b3]/5 rounded-t-lg">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <div className="p-2 bg-[#ffca53]/10 rounded-lg">
                  <Layers className="h-7 w-7" style={{ color: "#ffca53" }} />
                </div>
                <span className="text-[#b8860b] font-bold">Soil Analysis Results</span>
              </CardTitle>
              <CardDescription className="text-base">AI-powered analysis for {soilAnalysis.location}</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{soilAnalysis.soilType}</h3>
                  <p className="text-gray-600 leading-relaxed">{soilAnalysis.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Soil Characteristics:</h4>
                    <div className="space-y-2">
                      {Object.entries(soilAnalysis.characteristics).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-2 bg-gray-50 rounded-lg">
                          <span className="font-medium text-gray-700 capitalize">{key}:</span>
                          <span className="text-gray-600">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-800">Quick Overview:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <Badge className="p-3 justify-center" style={{ backgroundColor: "#36904215", color: "#369042" }}>
                        {soilAnalysis.suitableCrops.length} Suitable Crops
                      </Badge>
                      <Badge className="p-3 justify-center" style={{ backgroundColor: "#ffca5315", color: "#ffca53" }}>
                        {soilAnalysis.recommendedFertilizers.length} Fertilizers
                      </Badge>
                      <Badge className="p-3 justify-center" style={{ backgroundColor: "#d9e5b315", color: "#a1cc33" }}>
                        {soilAnalysis.sideCrops.length} Cover Crops
                      </Badge>
                      <Badge className="p-3 justify-center" style={{ backgroundColor: "#f9fb8015", color: "#369042" }}>
                        {soilAnalysis.improvements.length} Improvements
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Suggestion Bubbles */}
        {soilAnalysis && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#ffca53] to-[#d9e5b3] bg-clip-text text-transparent mb-6">
              Detailed Recommendations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestionBubbles.map((bubble) => (
                <Card
                  key={bubble.id}
                  className={`cursor-pointer hover-lift border-2 border-transparent hover:border-[${bubble.color}]/30 bg-gradient-to-br from-white to-[${bubble.color}]/10 shadow-xl backdrop-blur-sm group transition-all duration-300 ${
                    selectedBubble === bubble.id ? `border-[${bubble.color}] shadow-2xl` : ""
                  }`}
                  onClick={() => setSelectedBubble(selectedBubble === bubble.id ? null : bubble.id)}
                >
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-4 mb-3">
                      <div
                        className="p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110"
                        style={{
                          backgroundColor: `${bubble.color}20`,
                          color: bubble.color,
                        }}
                      >
                        {bubble.icon}
                      </div>
                      <div className="flex-1">
                        <CardTitle
                          className="text-lg font-bold transition-colors duration-300"
                          style={{ color: bubble.color }}
                        >
                          {bubble.title}
                        </CardTitle>
                        <CardDescription className="text-sm text-gray-600 mt-1">{bubble.subtitle}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    {selectedBubble === bubble.id && bubble.content.length > 0 && (
                      <div className="space-y-2 mt-4 p-4 bg-gray-50 rounded-lg">
                        {bubble.content.map((item, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: bubble.color }}></div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Badge
                      className="mt-3 transition-all duration-300 group-hover:scale-105"
                      style={{
                        backgroundColor: `${bubble.color}15`,
                        color: bubble.color,
                        borderColor: `${bubble.color}30`,
                      }}
                    >
                      {selectedBubble === bubble.id ? "Hide details" : "View details"}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Getting Started Message */}
        {!soilAnalysis && (
          <Card className="shadow-xl border-0 bg-gradient-to-r from-[#ffca53]/10 to-[#d9e5b3]/10 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="space-y-4">
                <div className="p-4 bg-[#ffca53]/20 rounded-full w-fit mx-auto">
                  <MapPin className="h-12 w-12" style={{ color: "#ffca53" }} />
                </div>
                <h3 className="text-2xl font-bold text-gray-800">Ready to Analyze Your Soil?</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  Enter your location above to get detailed soil analysis including soil type, texture, porosity,
                  suitable crops, recommended fertilizers, and cover crops for nutrient recovery. Our AI will provide
                  personalized recommendations based on your region's soil characteristics.
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-6">
                  {["California", "Texas", "Florida", "New York", "Illinois"].map((loc) => (
                    <Button
                      key={loc}
                      variant="outline"
                      size="sm"
                      onClick={() => setLocation(loc)}
                      className="border-[#ffca53]/30 hover:border-[#ffca53] hover:bg-[#ffca53]/10"
                    >
                      Try {loc}
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
