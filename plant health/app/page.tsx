"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Leaf, Bug, Stethoscope, Pill, Heart } from "lucide-react"

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

const mockResponses: Record<string, string> = {
  "plant disease":
    "Common plant diseases include fungal infections like powdery mildew, bacterial diseases like fire blight, and viral infections. Early detection through leaf discoloration, wilting, or unusual growth patterns is key to effective treatment.",
  "general plant health":
    "Maintaining optimal plant health requires proper watering (1-2 inches per week), adequate sunlight (6-8 hours for most crops), balanced nutrition (NPK fertilizers), and regular monitoring for pests and diseases.",
  "pest identification":
    "Common agricultural pests include aphids (small green/black insects), spider mites (tiny red dots), caterpillars (leaf damage), and thrips (silver streaks on leaves). Use integrated pest management for sustainable control.",
  "disease diagnosis":
    "Disease diagnosis involves examining symptoms: yellowing leaves may indicate nutrient deficiency or root rot, brown spots suggest fungal infection, wilting could mean bacterial disease or water stress. Proper identification is crucial for treatment.",
  "treatment recommendations":
    "Treatment depends on the specific issue: fungal diseases respond to copper-based fungicides, bacterial infections may require antibiotic sprays, pest control uses beneficial insects or targeted pesticides, and nutrient deficiencies need specific fertilizers.",
  default:
    "I can help you with plant health questions! Ask me about diseases, pests, treatments, or general plant care. You can also use the quick chat options below for common topics.",
}

const quickChatOptions: QuickChatOption[] = [
  {
    id: "disease",
    title: "Plant Disease",
    subtitle: "Identify and treat plant diseases",
    icon: <Leaf className="h-5 w-5" />,
    query: "plant disease",
  },
  {
    id: "health",
    title: "General Plant Health",
    subtitle: "Overall plant care and maintenance",
    icon: <Heart className="h-5 w-5" />,
    query: "general plant health",
  },
  {
    id: "pest",
    title: "Pest Identification & Control",
    subtitle: "Identify and manage plant pests",
    icon: <Bug className="h-5 w-5" />,
    query: "pest identification",
  },
  {
    id: "diagnosis",
    title: "Disease Diagnosis",
    subtitle: "Diagnose plant health issues",
    icon: <Stethoscope className="h-5 w-5" />,
    query: "disease diagnosis",
  },
  {
    id: "treatment",
    title: "Treatment Recommendations",
    subtitle: "Get treatment suggestions",
    icon: <Pill className="h-5 w-5" />,
    query: "treatment recommendations",
  },
]

export default function PlantHealthApp() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your plant health assistant. How can I help you today?",
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
      let response = mockResponses.default

      // Check for keywords in the message
      for (const [key, value] of Object.entries(mockResponses)) {
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
    <div className="min-h-screen bg-gradient-to-br from-brand-light-green/20 via-background to-brand-light-yellow/10 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="h-2 w-16 gradient-brand rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold gradient-brand-text tracking-tight">Plant Health</h1>
          </div>
          <div className="h-px gradient-brand w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Advanced crop monitoring and plant health diagnostics
          </p>
        </div>

        {/* Chatbot Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-brand-green-primary/5 to-brand-green-secondary/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-brand-green-primary/10 rounded-lg">
                <Leaf className="h-6 w-6 brand-green-primary" />
              </div>
              <span className="brand-green-primary">Plant Health Assistant</span>
            </CardTitle>
            <CardDescription className="text-base">
              Ask questions about plant diseases, pests, treatments, and general plant care
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Chat Messages */}
              <ScrollArea className="h-80 w-full border-2 border-brand-green-primary/20 rounded-xl p-4 bg-gradient-to-b from-brand-light-green/5 to-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-md ${
                          message.isUser
                            ? "bg-brand-green-primary text-white"
                            : "bg-white border border-brand-green-primary/20 text-gray-800"
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
                  placeholder="Ask about plant health, diseases, pests, or treatments..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  className="flex-1 border-2 border-brand-green-primary/30 focus:border-brand-green-primary rounded-xl h-12 text-base"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  size="icon"
                  className="shrink-0 h-12 w-12 bg-brand-green-primary hover:bg-brand-green-secondary rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Chat Bubbles */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold gradient-brand-text mb-6">Quick Chat Topics</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickChatOptions.map((option, index) => (
              <Card
                key={option.id}
                className="cursor-pointer hover-lift border-2 border-transparent hover:border-brand-green-primary/30 bg-gradient-to-br from-white to-brand-light-green/20 shadow-lg backdrop-blur-sm group"
                onClick={() => handleQuickChat(option.query)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-xl shadow-md transition-all duration-300 group-hover:scale-110 ${
                        index === 0
                          ? "bg-brand-green-primary/10 brand-green-primary"
                          : index === 1
                            ? "bg-brand-green-secondary/10 brand-green-secondary"
                            : index === 2
                              ? "bg-brand-yellow/10 brand-yellow"
                              : index === 3
                                ? "bg-brand-green-primary/10 brand-green-primary"
                                : "bg-brand-green-secondary/10 brand-green-secondary"
                      }`}
                    >
                      {option.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg font-semibold text-gray-800 group-hover:brand-green-primary transition-colors duration-300">
                        {option.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">{option.subtitle}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Badge
                    variant="secondary"
                    className="text-xs bg-brand-green-primary/10 brand-green-primary border-brand-green-primary/20 group-hover:bg-brand-green-primary group-hover:text-white transition-all duration-300"
                  >
                    Click to ask
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
