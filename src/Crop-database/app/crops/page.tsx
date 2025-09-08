"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Leaf,
  Upload,
  Mic,
  MapPin,
  Droplets,
  Sun,
  Thermometer,
  Sprout,
  Bug,
  TreePine,
  FlaskConical,
  Tractor,
  Beaker,
} from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
  image?: string
}

interface QuickChatOption {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  query: string
}

interface OptionBox {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  bgColor: string
}

const mockCropResponses: Record<string, string> = {
  location:
    "Most crops grow best in temperate climates with well-drained soil. Consider your USDA hardiness zone, average rainfall, and frost dates when selecting crops for your location.",
  nutrients:
    "Essential nutrients for crops include Nitrogen (N) for leaf growth, Phosphorus (P) for root development, and Potassium (K) for overall plant health. Secondary nutrients include Calcium, Magnesium, and Sulfur.",
  fertilizers:
    "Choose fertilizers based on soil tests. Organic options include compost, manure, and bone meal. Synthetic fertilizers provide quick nutrient release with NPK ratios like 10-10-10 for balanced feeding.",
  pesticides:
    "Integrated Pest Management (IPM) combines biological, cultural, and chemical controls. Use organic pesticides like neem oil first, then targeted synthetic options if needed.",
  season:
    "Crop timing depends on your climate zone. Cool-season crops (lettuce, peas) grow in spring/fall, while warm-season crops (tomatoes, peppers) need summer heat.",
  weather:
    "Monitor temperature, humidity, and precipitation. Most vegetables need 1-2 inches of water weekly and temperatures between 60-80°F for optimal growth.",
  environment:
    "Provide adequate sunlight (6-8 hours for most crops), proper spacing for air circulation, and protection from strong winds. Consider companion planting benefits.",
  water:
    "Water requirements vary by crop. Deep, infrequent watering encourages root development. Use drip irrigation or soaker hoses for efficient water delivery.",
  default:
    "I can help you with crop information! Ask about growing conditions, nutrients, pests, or use the quick chat options below. You can also upload images or use voice input.",
}

const quickChatOptions: QuickChatOption[] = [
  {
    id: "location",
    title: "Growing Location",
    subtitle: "Best regions and climate zones",
    icon: <MapPin className="h-5 w-5" />,
    query: "location",
  },
  {
    id: "nutrients",
    title: "Nutrient Requirements",
    subtitle: "Essential nutrients for healthy growth",
    icon: <Sprout className="h-5 w-5" />,
    query: "nutrients",
  },
  {
    id: "fertilizers",
    title: "Best Fertilizers",
    subtitle: "Organic and synthetic options",
    icon: <FlaskConical className="h-5 w-5" />,
    query: "fertilizers",
  },
  {
    id: "pesticides",
    title: "Pest Control",
    subtitle: "Safe and effective treatments",
    icon: <Bug className="h-5 w-5" />,
    query: "pesticides",
  },
  {
    id: "season",
    title: "Growing Season",
    subtitle: "Optimal planting and harvest times",
    icon: <Sun className="h-5 w-5" />,
    query: "season",
  },
  {
    id: "weather",
    title: "Weather Conditions",
    subtitle: "Temperature and climate needs",
    icon: <Thermometer className="h-5 w-5" />,
    query: "weather",
  },
  {
    id: "environment",
    title: "Environmental Settings",
    subtitle: "Sunlight, spacing, and conditions",
    icon: <TreePine className="h-5 w-5" />,
    query: "environment",
  },
  {
    id: "water",
    title: "Water Requirements",
    subtitle: "Irrigation and watering schedules",
    icon: <Droplets className="h-5 w-5" />,
    query: "water",
  },
]

const optionBoxes: OptionBox[] = [
  {
    id: "hydroponics",
    title: "HYDROPONICS",
    subtitle: "Soilless growing systems and techniques",
    icon: <Droplets className="h-8 w-8" />,
    color: "#369042",
    bgColor: "from-[#369042]/10 to-[#369042]/5",
  },
  {
    id: "plants",
    title: "PLANTS",
    subtitle: "Flowers, herbs, shrubs, trees, roots",
    icon: <Leaf className="h-8 w-8" />,
    color: "#a1cc33",
    bgColor: "from-[#a1cc33]/10 to-[#a1cc33]/5",
  },
  {
    id: "soil",
    title: "KNOW ABOUT YOUR SOILS",
    subtitle: "Soil analysis and recommendations",
    icon: <Beaker className="h-8 w-8" />,
    color: "#ffca53",
    bgColor: "from-[#ffca53]/10 to-[#ffca53]/5",
  },
  {
    id: "farming",
    title: "FARMING METHODS",
    subtitle: "Modern agricultural techniques",
    icon: <Tractor className="h-8 w-8" />,
    color: "#d9e5b3",
    bgColor: "from-[#d9e5b3]/20 to-[#d9e5b3]/10",
  },
]

export default function CropsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the Crops Assistant! I can help you identify crops, provide growing information, and answer questions about agriculture. You can type, upload images, or use voice input.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isRecording, setIsRecording] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = (text: string, image?: string) => {
    if (!text.trim() && !image) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: text || "Image uploaded",
      isUser: true,
      timestamp: new Date(),
      image: image,
    }

    setMessages((prev) => [...prev, userMessage])

    // Generate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase()
      let response = mockCropResponses.default

      // Check for keywords in the message
      for (const [key, value] of Object.entries(mockCropResponses)) {
        if (key !== "default" && lowerText.includes(key)) {
          response = value
          break
        }
      }

      // Special response for image uploads
      if (image && !text.trim()) {
        response =
          "I can see your crop image! Based on the visual characteristics, this appears to be a healthy plant. For specific identification and care recommendations, please describe what you're seeing or ask specific questions about growing conditions."
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string
        handleSendMessage("", imageUrl)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleVoiceInput = () => {
    setIsRecording(!isRecording)
    // Mock voice input - in real implementation, would use Web Speech API
    if (!isRecording) {
      setTimeout(() => {
        setInputValue("What are the best growing conditions for tomatoes?")
        setIsRecording(false)
      }, 2000)
    }
  }

  const handleOptionClick = (optionId: string) => {
    // Navigate to specific sections - would use router in real implementation
    if (optionId === "hydroponics") {
      window.location.href = "/hydroponics"
    } else if (optionId === "plants") {
      window.location.href = "/plants"
    } else if (optionId === "soil") {
      window.location.href = "/soil-analysis"
    } else if (optionId === "farming") {
      window.location.href = "/farming-methods"
    } else {
      console.log(`[v0] Navigating to ${optionId} section`)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d9e5b3]/20 via-background to-[#f9fb80]/10 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-2 w-16 gradient-brand rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold gradient-brand-text tracking-tight">CROPS</h1>
          </div>
          <div className="h-px gradient-brand w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Advanced crop identification, growing guidance, and agricultural intelligence
          </p>
        </div>

        {/* Main Chatbot Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-[#369042]/5 to-[#a1cc33]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-[#369042]/10 rounded-lg">
                <Leaf className="h-6 w-6" style={{ color: "#369042" }} />
              </div>
              <span style={{ color: "#369042" }}>Crops Intelligence Assistant</span>
            </CardTitle>
            <CardDescription className="text-base">
              Upload images, use voice input, or type questions about crop identification and growing
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Chat Messages */}
              <ScrollArea className="h-96 w-full border-2 border-[#369042]/20 rounded-xl p-4 bg-gradient-to-b from-[#d9e5b3]/5 to-transparent">
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
                        {message.image && (
                          <img
                            src={message.image || "/placeholder.svg"}
                            alt="Uploaded crop"
                            className="max-w-full h-32 object-cover rounded-lg mb-2"
                          />
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

              {/* Input Section */}
              <div className="flex gap-3">
                <Input
                  placeholder="Ask about crops, growing conditions, or upload an image..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  className="flex-1 border-2 border-[#369042]/30 focus:border-[#369042] rounded-xl h-12 text-base"
                />

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />

                <Button
                  onClick={() => fileInputRef.current?.click()}
                  size="icon"
                  variant="outline"
                  className="shrink-0 h-12 w-12 border-2 border-[#a1cc33]/30 hover:border-[#a1cc33] hover:bg-[#a1cc33]/10 rounded-xl"
                >
                  <Upload className="h-5 w-5" style={{ color: "#a1cc33" }} />
                </Button>

                <Button
                  onClick={handleVoiceInput}
                  size="icon"
                  variant="outline"
                  className={`shrink-0 h-12 w-12 border-2 rounded-xl transition-all duration-300 ${
                    isRecording
                      ? "border-red-500 bg-red-50 animate-pulse"
                      : "border-[#ffca53]/30 hover:border-[#ffca53] hover:bg-[#ffca53]/10"
                  }`}
                >
                  <Mic
                    className={`h-5 w-5 ${isRecording ? "text-red-500" : ""}`}
                    style={{ color: isRecording ? "#ef4444" : "#ffca53" }}
                  />
                </Button>

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
        <div className="mb-8">
          <h2 className="text-3xl font-bold gradient-brand-text mb-6">Quick Information</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickChatOptions.map((option, index) => (
              <Card
                key={option.id}
                className="cursor-pointer hover-lift border-2 border-transparent hover:border-[#369042]/30 bg-gradient-to-br from-white to-[#d9e5b3]/20 shadow-lg backdrop-blur-sm group transition-all duration-300"
                onClick={() => handleQuickChat(option.query)}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className="p-3 rounded-xl mx-auto mb-3 w-fit transition-all duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${["#369042", "#a1cc33", "#ffca53", "#d9e5b3"][index % 4]}15`,
                      color: ["#369042", "#a1cc33", "#ffca53", "#d9e5b3"][index % 4],
                    }}
                  >
                    {option.icon}
                  </div>
                  <h3 className="font-semibold text-sm text-gray-800 group-hover:text-[#369042] transition-colors duration-300">
                    {option.title}
                  </h3>
                  <p className="text-xs text-gray-600 mt-1">{option.subtitle}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Option Boxes */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold gradient-brand-text mb-6">Explore More</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {optionBoxes.map((option) => (
              <Card
                key={option.id}
                className={`cursor-pointer hover-lift border-2 border-transparent hover:border-[${option.color}]/30 bg-gradient-to-br ${option.bgColor} shadow-xl backdrop-blur-sm group transition-all duration-300`}
                onClick={() => handleOptionClick(option.id)}
              >
                <CardContent className="p-8">
                  <div className="flex items-center gap-6">
                    <div
                      className="p-4 rounded-2xl shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${option.color}20`,
                        color: option.color,
                      }}
                    >
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <h3
                        className="text-2xl font-bold mb-2 transition-colors duration-300"
                        style={{ color: option.color }}
                      >
                        {option.title}
                      </h3>
                      <p className="text-gray-600 text-base">{option.subtitle}</p>
                      <Badge
                        className="mt-3 transition-all duration-300 group-hover:scale-105"
                        style={{
                          backgroundColor: `${option.color}15`,
                          color: option.color,
                          borderColor: `${option.color}30`,
                        }}
                      >
                        Click to explore
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
