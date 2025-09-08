"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Droplets, Leaf, Zap, TrendingUp, Shield, Clock, ArrowLeft } from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface QuickChatOption {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  query: string
}

const mockHydroponicsResponses: Record<string, string> = {
  setup:
    "Basic hydroponic setup requires a reservoir, growing medium (like perlite or rockwool), nutrient solution, pH testing kit, and proper lighting. Start with simple systems like Deep Water Culture (DWC) or Kratky method for beginners.",
  nutrients:
    "Hydroponic nutrients should contain NPK (Nitrogen-Phosphorus-Potassium) plus micronutrients like calcium, magnesium, iron, and trace elements. Maintain EC levels between 1.2-2.0 and pH between 5.5-6.5 for optimal uptake.",
  systems:
    "Popular hydroponic systems include DWC (Deep Water Culture), NFT (Nutrient Film Technique), Ebb and Flow, Drip Systems, and Aeroponics. Each has different complexity levels and crop suitability.",
  maintenance:
    "Daily tasks include checking pH and EC levels, monitoring water temperature (65-75°F), inspecting plants for pests/diseases, and ensuring proper lighting cycles. Weekly tasks include changing nutrient solutions and cleaning systems.",
  crops:
    "Best hydroponic crops for beginners include lettuce, spinach, herbs (basil, cilantro), tomatoes, peppers, and strawberries. Leafy greens are easiest, while fruiting plants require more advanced techniques.",
  troubleshooting:
    "Common issues include nutrient deficiencies (yellowing leaves), pH imbalances, root rot from poor oxygenation, algae growth from light exposure, and pest problems. Regular monitoring prevents most issues.",
  default:
    "I can help you with hydroponic farming questions! Ask about setup, nutrients, systems, maintenance, or use the quick chat options below.",
}

const quickChatOptions: QuickChatOption[] = [
  {
    id: "setup",
    title: "System Setup",
    subtitle: "Getting started with hydroponics",
    icon: <Droplets className="h-5 w-5" />,
    query: "setup",
  },
  {
    id: "nutrients",
    title: "Nutrient Solutions",
    subtitle: "Feeding your hydroponic plants",
    icon: <Leaf className="h-5 w-5" />,
    query: "nutrients",
  },
  {
    id: "systems",
    title: "Hydroponic Systems",
    subtitle: "Different growing methods",
    icon: <Zap className="h-5 w-5" />,
    query: "systems",
  },
  {
    id: "maintenance",
    title: "System Maintenance",
    subtitle: "Keeping your system healthy",
    icon: <Shield className="h-5 w-5" />,
    query: "maintenance",
  },
  {
    id: "crops",
    title: "Best Crops",
    subtitle: "What to grow hydroponically",
    icon: <TrendingUp className="h-5 w-5" />,
    query: "crops",
  },
  {
    id: "troubleshooting",
    title: "Troubleshooting",
    subtitle: "Solving common problems",
    icon: <Clock className="h-5 w-5" />,
    query: "troubleshooting",
  },
]

const advantages = [
  {
    title: "Faster Growth",
    description: "Plants grow 30-50% faster than soil-based agriculture due to optimal nutrient delivery",
    icon: <TrendingUp className="h-6 w-6" />,
  },
  {
    title: "Water Efficiency",
    description: "Uses 90% less water than traditional farming through recirculating systems",
    icon: <Droplets className="h-6 w-6" />,
  },
  {
    title: "Year-Round Production",
    description: "Climate-controlled environments enable continuous harvesting regardless of season",
    icon: <Clock className="h-6 w-6" />,
  },
  {
    title: "No Soil Required",
    description: "Eliminates soil-borne diseases and pests while maximizing space utilization",
    icon: <Shield className="h-6 w-6" />,
  },
  {
    title: "Higher Yields",
    description: "Produces 3-10 times more crops per square foot compared to traditional farming",
    icon: <Zap className="h-6 w-6" />,
  },
  {
    title: "Precise Control",
    description: "Complete control over nutrients, pH, lighting, and environmental conditions",
    icon: <Leaf className="h-6 w-6" />,
  },
]

export default function HydroponicsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to Hydroponics! I'm here to help you learn about soilless growing systems. Ask me about setup, nutrients, maintenance, or any hydroponic farming questions.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response = mockHydroponicsResponses.default

      // Check for keywords in the message
      for (const [key, value] of Object.entries(mockHydroponicsResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          response = value
          break
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
    }, 1000)

    setInputValue("")
  }

  const handleQuickChat = (query: string) => {
    handleSendMessage(query)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#369042]/10 via-background to-[#a1cc33]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="border-[#369042]/30 hover:border-[#369042] hover:bg-[#369042]/10"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: "#369042" }} />
            </Button>
            <div className="h-2 w-16 bg-gradient-to-r from-[#369042] to-[#a1cc33] rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent tracking-tight">
              HYDROPONICS
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-[#369042] to-[#a1cc33] w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Advanced soilless growing systems for modern agriculture
          </p>
        </div>

        {/* Introduction Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-[#369042]/5 to-[#a1cc33]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <div className="p-2 bg-[#369042]/10 rounded-lg">
                <Droplets className="h-7 w-7" style={{ color: "#369042" }} />
              </div>
              <span style={{ color: "#369042" }}>What is Hydroponics?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed text-gray-700 mb-4">
              Hydroponics is a method of growing plants without soil, using nutrient-rich water solutions to deliver
              essential minerals directly to plant roots. This innovative farming technique allows for precise control
              over growing conditions, resulting in faster growth, higher yields, and more efficient resource usage.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              From small home gardens to large commercial operations, hydroponic systems are revolutionizing agriculture
              by enabling year-round production in controlled environments, regardless of climate or soil conditions.
            </p>
          </CardContent>
        </Card>

        {/* Advantages Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent mb-6">
            Advantages of Hydroponic Farming
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {advantages.map((advantage, index) => (
              <Card
                key={index}
                className="hover-lift border-2 border-transparent hover:border-[#369042]/30 bg-gradient-to-br from-white to-[#369042]/5 shadow-lg backdrop-blur-sm group transition-all duration-300"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div
                      className="p-3 rounded-xl shadow-md transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${["#369042", "#a1cc33", "#ffca53"][index % 3]}15`,
                        color: ["#369042", "#a1cc33", "#ffca53"][index % 3],
                      }}
                    >
                      {advantage.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-[#369042] transition-colors duration-300">
                        {advantage.title}
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{advantage.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chatbot Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-[#369042]/5 to-[#a1cc33]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-[#369042]/10 rounded-lg">
                <Droplets className="h-6 w-6" style={{ color: "#369042" }} />
              </div>
              <span style={{ color: "#369042" }}>Hydroponics Assistant</span>
            </CardTitle>
            <CardDescription className="text-base">
              Get expert advice on hydroponic systems, nutrients, maintenance, and troubleshooting
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Chat Messages */}
              <ScrollArea className="h-80 w-full border-2 border-[#369042]/20 rounded-xl p-4 bg-gradient-to-b from-[#369042]/5 to-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                          message.isUser
                            ? "bg-[#369042] text-white"
                            : "bg-white border border-[#369042]/20 text-gray-800"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Input Section */}
              <div className="flex gap-3">
                <Input
                  placeholder="Ask about hydroponic systems, nutrients, maintenance, or troubleshooting..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  className="flex-1 border-2 border-[#369042]/30 focus:border-[#369042] rounded-xl h-12 text-base"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  size="icon"
                  className="shrink-0 h-12 w-12 bg-[#369042] hover:bg-[#a1cc33] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Chat Bubbles */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent mb-6">
            Quick Help Topics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickChatOptions.map((option, index) => (
              <Card
                key={option.id}
                className="cursor-pointer hover-lift border-2 border-transparent hover:border-[#369042]/30 bg-gradient-to-br from-white to-[#369042]/10 shadow-lg backdrop-blur-sm group transition-all duration-300"
                onClick={() => handleQuickChat(option.query)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className="p-3 rounded-xl mx-auto mb-3 w-fit transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${["#369042", "#a1cc33", "#ffca53"][index % 3]}15`,
                      color: ["#369042", "#a1cc33", "#ffca53"][index % 3],
                    }}
                  >
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800 group-hover:text-[#369042] transition-colors duration-300">
                    {option.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{option.subtitle}</p>
                  <Badge
                    className="mt-2 text-xs transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: `${["#369042", "#a1cc33", "#ffca53"][index % 3]}15`,
                      color: ["#369042", "#a1cc33", "#ffca53"][index % 3],
                      borderColor: `${["#369042", "#a1cc33", "#ffca53"][index % 3]}30`,
                    }}
                  >
                    Ask now
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
