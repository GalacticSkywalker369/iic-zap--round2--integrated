"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Send, Leaf, ArrowLeft, Flower, TreePine, Sprout, Trees, Carrot } from "lucide-react"

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

interface PlantCategory {
  id: string
  title: string
  subtitle: string
  icon: React.ReactNode
  color: string
  bgColor: string
  description: string
  examples: string[]
}

const mockPlantResponses: Record<string, string> = {
  flowers:
    "Flowers are reproductive structures of plants that produce seeds. Popular garden flowers include roses, tulips, daisies, sunflowers, and marigolds. They require well-drained soil, adequate sunlight, and regular watering for optimal blooming.",
  herbs:
    "Herbs are plants valued for their culinary, medicinal, or aromatic properties. Common herbs include basil, rosemary, thyme, oregano, mint, and parsley. Most herbs prefer well-drained soil and full sun to partial shade.",
  shrubs:
    "Shrubs are woody plants smaller than trees, typically with multiple stems. Examples include azaleas, rhododendrons, boxwood, lavender, and hydrangeas. They provide structure to gardens and often require minimal maintenance once established.",
  trees:
    "Trees are large woody plants with a single main trunk. They include fruit trees (apple, cherry), shade trees (oak, maple), and evergreens (pine, spruce). Trees require deep watering, proper spacing, and occasional pruning.",
  roots:
    "Root vegetables grow underground and store nutrients in their roots. Examples include carrots, potatoes, radishes, beets, and turnips. They prefer loose, well-drained soil and consistent moisture for proper development.",
  default:
    "I can help you learn about different plant types! Select a category above or ask specific questions about flowers, herbs, shrubs, trees, or root vegetables.",
}

const plantCategories: PlantCategory[] = [
  {
    id: "flowers",
    title: "FLOWERS",
    subtitle: "Ornamental flowering plants",
    icon: <Flower className="h-8 w-8" />,
    color: "#a1cc33",
    bgColor: "from-[#a1cc33]/10 to-[#a1cc33]/5",
    description: "Beautiful flowering plants that add color and fragrance to gardens",
    examples: ["Roses", "Tulips", "Daisies", "Sunflowers", "Marigolds", "Petunias"],
  },
  {
    id: "herbs",
    title: "HERBS",
    subtitle: "Culinary and medicinal plants",
    icon: <Sprout className="h-8 w-8" />,
    color: "#369042",
    bgColor: "from-[#369042]/10 to-[#369042]/5",
    description: "Aromatic plants used for cooking, medicine, and natural remedies",
    examples: ["Basil", "Rosemary", "Thyme", "Oregano", "Mint", "Parsley"],
  },
  {
    id: "shrubs",
    title: "SHRUBS",
    subtitle: "Woody perennial plants",
    icon: <TreePine className="h-8 w-8" />,
    color: "#ffca53",
    bgColor: "from-[#ffca53]/10 to-[#ffca53]/5",
    description: "Medium-sized woody plants that provide structure and year-round interest",
    examples: ["Azaleas", "Rhododendrons", "Boxwood", "Lavender", "Hydrangeas", "Forsythia"],
  },
  {
    id: "trees",
    title: "TREES",
    subtitle: "Large woody plants",
    icon: <Trees className="h-8 w-8" />,
    color: "#d9e5b3",
    bgColor: "from-[#d9e5b3]/20 to-[#d9e5b3]/10",
    description: "Large plants that provide shade, fruit, and environmental benefits",
    examples: ["Oak", "Maple", "Apple", "Cherry", "Pine", "Birch"],
  },
  {
    id: "roots",
    title: "ROOT VEGETABLES",
    subtitle: "Underground growing crops",
    icon: <Carrot className="h-8 w-8" />,
    color: "#f9fb80",
    bgColor: "from-[#f9fb80]/20 to-[#f9fb80]/10",
    description: "Nutritious vegetables that develop their edible parts underground",
    examples: ["Carrots", "Potatoes", "Radishes", "Beets", "Turnips", "Sweet Potatoes"],
  },
]

export default function PlantsPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Welcome to the Plants section! I can help you learn about different types of plants including flowers, herbs, shrubs, trees, and root vegetables. Select a category or ask me any questions!",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
      let response = mockPlantResponses.default

      // Check for keywords in the message
      for (const [key, value] of Object.entries(mockPlantResponses)) {
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

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = plantCategories.find((cat) => cat.id === categoryId)
    if (category) {
      handleSendMessage(`Tell me about ${category.title.toLowerCase()}`)
    }
  }

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#a1cc33]/10 via-background to-[#d9e5b3]/5 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.history.back()}
              className="border-[#a1cc33]/30 hover:border-[#a1cc33] hover:bg-[#a1cc33]/10"
            >
              <ArrowLeft className="h-5 w-5" style={{ color: "#a1cc33" }} />
            </Button>
            <div className="h-2 w-16 bg-gradient-to-r from-[#a1cc33] to-[#369042] rounded-full shadow-lg"></div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#a1cc33] to-[#369042] bg-clip-text text-transparent tracking-tight">
              PLANTS
            </h1>
          </div>
          <div className="h-px bg-gradient-to-r from-[#a1cc33] to-[#369042] w-full opacity-60 shadow-sm"></div>
          <p className="text-lg text-muted-foreground mt-4 font-medium">
            Explore different types of plants: flowers, herbs, shrubs, trees, and root vegetables
          </p>
        </div>

        {/* Plant Categories Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#a1cc33] to-[#369042] bg-clip-text text-transparent mb-6">
            Plant Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plantCategories.map((category) => (
              <Card
                key={category.id}
                className={`cursor-pointer hover-lift border-2 border-transparent hover:border-[${category.color}]/30 bg-gradient-to-br ${category.bgColor} shadow-xl backdrop-blur-sm group transition-all duration-300 ${
                  selectedCategory === category.id ? `border-[${category.color}] shadow-2xl` : ""
                }`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className="p-3 rounded-xl shadow-lg transition-all duration-300 group-hover:scale-110"
                      style={{
                        backgroundColor: `${category.color}20`,
                        color: category.color,
                      }}
                    >
                      {category.icon}
                    </div>
                    <div className="flex-1">
                      <CardTitle
                        className="text-xl font-bold transition-colors duration-300"
                        style={{ color: category.color }}
                      >
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-sm text-gray-600 mt-1">{category.subtitle}</CardDescription>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed mb-3">{category.description}</p>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Examples:</p>
                    <div className="flex flex-wrap gap-1">
                      {category.examples.slice(0, 4).map((example, index) => (
                        <Badge
                          key={index}
                          className="text-xs transition-all duration-300 group-hover:scale-105"
                          style={{
                            backgroundColor: `${category.color}15`,
                            color: category.color,
                            borderColor: `${category.color}30`,
                          }}
                        >
                          {example}
                        </Badge>
                      ))}
                      {category.examples.length > 4 && (
                        <Badge
                          className="text-xs"
                          style={{
                            backgroundColor: `${category.color}10`,
                            color: category.color,
                            borderColor: `${category.color}20`,
                          }}
                        >
                          +{category.examples.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Chatbot Section */}
        <Card className="mb-8 shadow-xl border-0 bg-card/80 backdrop-blur-sm hover-lift">
          <CardHeader className="bg-gradient-to-r from-[#a1cc33]/5 to-[#369042]/5 rounded-t-lg">
            <CardTitle className="flex items-center gap-3 text-xl">
              <div className="p-2 bg-[#a1cc33]/10 rounded-lg">
                <Leaf className="h-6 w-6" style={{ color: "#a1cc33" }} />
              </div>
              <span style={{ color: "#a1cc33" }}>Plants Expert Assistant</span>
            </CardTitle>
            <CardDescription className="text-base">
              Get detailed information about different plant types, growing conditions, and care tips
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Chat Messages */}
              <ScrollArea className="h-80 w-full border-2 border-[#a1cc33]/20 rounded-xl p-4 bg-gradient-to-b from-[#a1cc33]/5 to-transparent">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-3 shadow-md transition-all duration-300 hover:shadow-lg ${
                          message.isUser
                            ? "bg-[#a1cc33] text-white"
                            : "bg-white border border-[#a1cc33]/20 text-gray-800"
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
                  placeholder="Ask about plant types, growing conditions, care tips, or specific plants..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage(inputValue)
                    }
                  }}
                  className="flex-1 border-2 border-[#a1cc33]/30 focus:border-[#a1cc33] rounded-xl h-12 text-base"
                />
                <Button
                  onClick={() => handleSendMessage(inputValue)}
                  size="icon"
                  className="shrink-0 h-12 w-12 bg-[#a1cc33] hover:bg-[#369042] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Questions */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-[#a1cc33] to-[#369042] bg-clip-text text-transparent mb-6">
            Quick Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              "What flowers bloom in spring?",
              "Which herbs are easiest to grow?",
              "How do I prune shrubs?",
              "When should I plant trees?",
              "What root vegetables grow in winter?",
              "How much sunlight do plants need?",
            ].map((question, index) => (
              <Card
                key={index}
                className="cursor-pointer hover-lift border-2 border-transparent hover:border-[#a1cc33]/30 bg-gradient-to-br from-white to-[#a1cc33]/10 shadow-lg backdrop-blur-sm group transition-all duration-300"
                onClick={() => handleQuickQuestion(question)}
              >
                <CardContent className="p-4 text-center">
                  <p className="text-sm font-medium text-gray-800 group-hover:text-[#a1cc33] transition-colors duration-300">
                    {question}
                  </p>
                  <Badge
                    className="mt-2 text-xs transition-all duration-300 group-hover:scale-105"
                    style={{
                      backgroundColor: "#a1cc3315",
                      color: "#a1cc33",
                      borderColor: "#a1cc3330",
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
