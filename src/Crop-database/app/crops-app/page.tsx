"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Leaf,
  MapPin,
  Droplets,
  Sun,
  Thermometer,
  Sprout,
  Shield,
  Upload,
  Mic,
  MicOff,
  ImageIcon,
} from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
  type?: "text" | "image" | "audio"
}

interface QuickInfoOption {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  query: string
}

const mockCropResponses: Record<string, string> = {
  location:
    "Based on your location, I can provide specific crop recommendations, seasonal planting schedules, and local climate considerations for optimal growing conditions.",
  nutrients:
    "Essential nutrients for crops include Nitrogen (N) for leaf growth, Phosphorus (P) for root development, and Potassium (K) for overall plant health. Secondary nutrients include Calcium, Magnesium, and Sulfur.",
  fertilizers:
    "Choose fertilizers based on soil tests and crop needs. Organic options include compost and manure, while synthetic fertilizers provide precise nutrient ratios like 10-10-10 or 20-20-20.",
  pesticides:
    "Integrated Pest Management (IPM) combines biological, cultural, and chemical controls. Use pesticides as a last resort, following label instructions and considering beneficial insects.",
  seasons:
    "Planting seasons vary by crop and location. Cool-season crops (lettuce, peas) grow in spring/fall, while warm-season crops (tomatoes, corn) thrive in summer.",
  environmental:
    "Optimal growing conditions include proper temperature ranges, humidity levels, soil pH (6.0-7.0 for most crops), and adequate air circulation.",
  water:
    "Most crops need 1-2 inches of water per week. Deep, infrequent watering encourages root development. Monitor soil moisture and adjust based on weather conditions.",
  chakraai:
    "ChakraAI integration provides advanced crop analysis using machine learning to identify diseases, pests, and nutritional deficiencies from images and environmental data.",
  default:
    "I'm your comprehensive crops assistant! I can help with planting, growing, pest management, and harvesting guidance. Upload images for visual analysis or ask specific questions about your crops.",
}

const quickInfoOptions: QuickInfoOption[] = [
  {
    id: "location",
    title: "Location-Based Growing",
    subtitle: "Climate and regional recommendations",
    icon: <MapPin className="h-5 w-5" />,
    query: "location",
  },
  {
    id: "nutrients",
    title: "Crop Nutrients",
    subtitle: "Essential nutrient requirements",
    icon: <Sprout className="h-5 w-5" />,
    query: "nutrients",
  },
  {
    id: "fertilizers",
    title: "Fertilizer Guide",
    subtitle: "Organic and synthetic options",
    icon: <Shield className="h-5 w-5" />,
    query: "fertilizers",
  },
  {
    id: "pesticides",
    title: "Pest Management",
    subtitle: "Safe and effective control methods",
    icon: <Shield className="h-5 w-5" />,
    query: "pesticides",
  },
  {
    id: "seasons",
    title: "Seasonal Planting",
    subtitle: "Optimal planting schedules",
    icon: <Sun className="h-5 w-5" />,
    query: "seasons",
  },
  {
    id: "environmental",
    title: "Growing Conditions",
    subtitle: "Temperature, humidity, and pH",
    icon: <Thermometer className="h-5 w-5" />,
    query: "environmental",
  },
  {
    id: "water",
    title: "Water Requirements",
    subtitle: "Irrigation and moisture management",
    icon: <Droplets className="h-5 w-5" />,
    query: "water",
  },
  {
    id: "chakraai",
    title: "ChakraAI Analysis",
    subtitle: "AI-powered crop diagnostics",
    icon: <Leaf className="h-5 w-5" />,
    query: "chakraai",
  },
]

export default function CropsApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the Crops Assistant! I can help with crop identification, growing guidance, pest management, and more. Upload images for analysis or ask questions about your crops.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async (text: string, type: "text" | "image" | "audio" = "text") => {
    if (!text.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text,
      isUser: true,
      timestamp: new Date(),
      type,
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Only call Gemini for text questions; keep mock for non-text demo events
    if (type !== "text") {
      const botMessage: Message = {
        id: userMessage.id + 1,
        text: mockCropResponses.default,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
      return
    }

    try {
      setIsLoading(true)
      const apiBase = (import.meta as any)?.env?.VITE_API_BASE || ""
      const res = await fetch(`${apiBase}/api/gemini`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: text }),
      })
      if (!res.ok) {
        const errText = await res.text().catch(() => "")
        throw new Error(`Request failed: ${res.status} ${errText}`)
      }
      const data: { answer: string } = await res.json()
      const botMessage: Message = {
        id: userMessage.id + 1,
        text: data.answer?.trim() || "I couldn't generate a response.",
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } catch (e: any) {
      const lowerText = text.toLowerCase()
      let response = mockCropResponses.default
      for (const [key, value] of Object.entries(mockCropResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          response = value
          break
        }
      }
      const botMessage: Message = {
        id: userMessage.id + 1,
        text: `${response}\n\n(Note: Live AI response failed: ${e?.message || e})`,
        isUser: false,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickInfo = (query: string) => {
    handleSendMessage(query)
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleSendMessage(`Uploaded image: ${file.name} for crop analysis`, "image")
    }
  }

  const toggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false)
        handleSendMessage("Voice message recorded for crop consultation", "audio")
      }, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#369042]/10 via-background to-[#a1cc33]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-2 w-16 bg-gradient-to-r from-[#369042] to-[#a1cc33] rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent tracking-tight">
              CROPS
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-[#369042] to-[#a1cc33] w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Advanced crop identification, growing guidance, and agricultural intelligence
          </p>
        </div>

        {/* Enhanced Chatbot Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover:shadow-2xl transition-all duration-300">
          <CardHeader className="bg-gradient-to-r from-[#369042]/5 to-[#a1cc33]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-[#369042]/10 rounded-lg">
                <Leaf className="h-6 w-6 text-[#369042]" />
              </div>
              <span className="text-[#369042]">Crops Assistant with ChakraAI</span>
            </CardTitle>
            <CardDescription className="text-base">
              Upload images, record voice messages, or type questions about crops, growing, and farming
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Chat Messages */}
              <ScrollArea className="h-96 w-full border-2 border-[#369042]/20 rounded-xl p-4 bg-gradient-to-b from-[#D9E5B3]/10 to-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                          message.isUser
                            ? "bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white"
                            : "bg-white border border-[#369042]/20 text-gray-800"
                        }`}
                      >
                        {message.type && message.type !== "text" && (
                          <div className="flex items-center gap-2 mb-2 opacity-70">
                            {message.type === "image" && <ImageIcon className="h-4 w-4" />}
                            {message.type === "audio" && <Mic className="h-4 w-4" />}
                            <span className="text-xs capitalize">{message.type}</span>
                          </div>
                        )}
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

              {/* Enhanced Input Section */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Input
                    placeholder="Ask about crops, upload images, or record voice messages..."
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
                    className="shrink-0 h-12 w-12 bg-gradient-to-r from-[#369042] to-[#a1cc33] hover:from-[#a1cc33] hover:to-[#369042] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>

                {/* Media Input Controls */}
                <div className="flex gap-3 justify-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-[#369042]/30 text-[#369042] hover:bg-[#369042]/10 transition-all duration-300 hover:scale-105"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Image
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={toggleRecording}
                    className={`border-[#369042]/30 transition-all duration-300 hover:scale-105 ${
                      isRecording ? "bg-red-500 text-white hover:bg-red-600" : "text-[#369042] hover:bg-[#369042]/10"
                    }`}
                  >
                    {isRecording ? <MicOff className="h-4 w-4 mr-2" /> : <Mic className="h-4 w-4 mr-2" />}
                    {isLoading ? "Thinking..." : isRecording ? "Recording..." : "Voice Input"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Information Bubbles */}
        <div className="space-y-6 mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent mb-6">
            Quick Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickInfoOptions.map((option, index) => (
              <Card
                key={option.id}
                className="cursor-pointer border-2 border-transparent hover:border-[#369042]/30 bg-gradient-to-br from-white to-[#D9E5B3]/20 shadow-lg backdrop-blur-sm group transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => handleQuickInfo(option.query)}
              >
                <CardHeader className="pb-4">
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className={`p-3 rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 bg-[#369042]/10 text-[#369042]`}
                    >
                      {option.icon}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-semibold text-gray-800 group-hover:text-[#369042] transition-colors duration-300">
                        {option.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-gray-600 mt-1">{option.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#369042]/30 bg-gradient-to-br from-[#369042]/10 to-[#a1cc33]/10"
            onClick={() => (window.location.href = "/hyroponics")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#369042]/20 rounded-xl">
                  <Droplets className="h-8 w-8 text-[#369042]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#369042] mb-2">HYDROPONICS</h3>
                  <p className="text-gray-600">Soilless growing systems and techniques</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#a1cc33]/30 bg-gradient-to-br from-[#a1cc33]/10 to-[#ffca53]/10"
            onClick={() => (window.location.href = "/plants")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#a1cc33]/20 rounded-xl">
                  <Leaf className="h-8 w-8 text-[#a1cc33]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#a1cc33] mb-2">PLANTS</h3>
                  <p className="text-gray-600">Flowers, herbs, shrubs, trees, and roots</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#ffca53]/30 bg-gradient-to-br from-[#ffca53]/10 to-[#D9E5B3]/10"
            onClick={() => (window.location.href = "/soil-analysis")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#ffca53]/20 rounded-xl">
                  <MapPin className="h-8 w-8 text-[#ffca53]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#ffca53] mb-2">KNOW ABOUT YOUR SOILS</h3>
                  <p className="text-gray-600">Location-based soil analysis and recommendations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className="cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl border-2 border-transparent hover:border-[#F9FB80]/30 bg-gradient-to-br from-[#F9FB80]/10 to-[#D9E5B3]/10"
            onClick={() => (window.location.href = "/farming-methods")}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-4 bg-[#F9FB80]/20 rounded-xl">
                  <Sprout className="h-8 w-8 text-[#369042]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#369042] mb-2">FARMING METHODS</h3>
                  <p className="text-gray-600">Compare techniques and cost analysis</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
