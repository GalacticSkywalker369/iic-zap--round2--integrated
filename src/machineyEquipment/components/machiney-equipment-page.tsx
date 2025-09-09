"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Star, Phone, Mail, MapPin, Tractor, Wrench, Zap, Award, Users, TrendingUp } from "lucide-react"

interface Machinery {
  id: string
  name: string
  category: string
  price: string
  image: string
  description: string
  suitableFor: string[]
  rating: number
  reviews: number
}

interface Dealer {
  id: string
  name: string
  contact: string
  email: string
  location: string
  rating: number
  specialties: string[]
  discount: number
}

const machineryData: Machinery[] = [
  {
    id: "1",
    name: "John Deere 6120M Tractor",
    category: "Tractors",
    price: "$85,000 - $95,000",
    image: "/modern-green-tractor-in-field.jpg",
    description: "Versatile utility tractor perfect for medium-scale farming operations",
    suitableFor: ["Wheat", "Corn", "Soybeans", "Cotton"],
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Case IH Axial-Flow 250 Series",
    category: "Harvesters",
    price: "$450,000 - $520,000",
    image: "/red-combine-harvester-in-wheat-field.jpg",
    description: "High-capacity combine harvester with advanced grain handling",
    suitableFor: ["Wheat", "Barley", "Rice", "Canola"],
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "Kubota M7-172 Premium",
    category: "Tractors",
    price: "$120,000 - $135,000",
    image: "/orange-kubota-tractor-with-implements.jpg",
    description: "Premium tractor with advanced hydraulics and precision farming capabilities",
    suitableFor: ["Vegetables", "Fruits", "Specialty Crops"],
    rating: 4.7,
    reviews: 156,
  },
  {
    id: "4",
    name: "New Holland T8.435",
    category: "Tractors",
    price: "$180,000 - $200,000",
    image: "/blue-new-holland-tractor-plowing-field.jpg",
    description: "High-horsepower tractor for large-scale farming operations",
    suitableFor: ["Corn", "Soybeans", "Sugar Beets"],
    rating: 4.6,
    reviews: 98,
  },
  {
    id: "5",
    name: "Fendt IDEAL 10T",
    category: "Harvesters",
    price: "$580,000 - $650,000",
    image: "/green-fendt-combine-harvester.jpg",
    description: "Premium combine harvester with intelligent automation",
    suitableFor: ["Wheat", "Corn", "Soybeans", "Sunflower"],
    rating: 4.9,
    reviews: 67,
  },
  {
    id: "6",
    name: "Massey Ferguson 8S.265",
    category: "Tractors",
    price: "$160,000 - $175,000",
    image: "/red-massey-ferguson-tractor.jpg",
    description: "Efficient and reliable tractor with modern technology",
    suitableFor: ["Mixed Farming", "Livestock", "Hay Production"],
    rating: 4.5,
    reviews: 143,
  },
]

const dealersData: Dealer[] = [
  {
    id: "1",
    name: "AgriTech Solutions",
    contact: "+91 93726 49385",
    email: "sales@agritech.com",
    location: "Jaipur, rajasthan",
    rating: 4.8,
    specialties: ["John Deere", "Case IH", "New Holland"],
    discount: 8,
  },
  {
    id: "2",
    name: "bharat Farm Equipment",
    contact: "+91 904582 92047",
    email: "info@midwestfarm.com",
    location: "New delhi",
    rating: 4.9,
    specialties: ["Kubota", "Massey Ferguson", "Fendt"],
    discount: 12,
  },
  {
    id: "3",
    name: "Tirupati Equipment Co.",
    contact: "+91 9273947329",
    email: "contact@prairieequip.com",
    location: "Chennai, Tamil nadu",
    rating: 4.7,
    specialties: ["Case IH", "New Holland", "John Deere"],
    discount: 6,
  },
]

export function MachineryEquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [userStreak, setUserStreak] = useState(50)
  const [userRewards, setUserRewards] = useState(1250)
  const [selectedMachinery, setSelectedMachinery] = useState<Machinery | null>(null)

  const categories = ["All", "Tractors", "Harvesters", "Implements", "Irrigation"]

  const filteredMachinery =
    selectedCategory === "All" ? machineryData : machineryData.filter((item) => item.category === selectedCategory)

  const getDiscountPercentage = (streak: number) => {
    if (streak >= 100) return 15
    if (streak >= 75) return 10
    if (streak >= 50) return 5
    if (streak >= 25) return 3
    return 0
  }

  const discountPercentage = getDiscountPercentage(userStreak)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Tractor className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">AgriMachinery</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-accent/20 px-3 py-2 rounded-lg">
                <Award className="h-5 w-5 text-accent" />
                <span className="text-sm font-medium">{userStreak} Day Streak</span>
                <Badge variant="secondary">{discountPercentage}% OFF</Badge>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/20 px-3 py-2 rounded-lg">
                <Star className="h-5 w-5 text-secondary" />
                <span className="text-sm font-medium">{userRewards} Rewards</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-balance">
            Premium Agricultural Machinery & Equipment
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Discover the perfect machinery for your farming needs. Connect with trusted dealers, read reviews, and get
            exclusive discounts based on your activity rewards.
          </p>
        </section>

        {/* User Rewards Dashboard */}
        <Card className="mb-8 bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Your Rewards Dashboard
            </CardTitle>
            <CardDescription>Keep using our platform to unlock better discounts!</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{userStreak}</div>
                <div className="text-sm text-muted-foreground">Day Streak</div>
                <Progress value={(userStreak / 100) * 100} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{userRewards}</div>
                <div className="text-sm text-muted-foreground">Reward Points</div>
                <Progress value={(userRewards / 2000) * 100} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">{discountPercentage}%</div>
                <div className="text-sm text-muted-foreground">Current Discount</div>
                <Badge variant="outline" className="mt-2">
                  Active
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="transition-all duration-200 hover:scale-105"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Machinery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredMachinery.map((machinery) => (
            <Card
              key={machinery.id}
              className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50 hover:border-primary/50"
              onClick={() => setSelectedMachinery(machinery)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={machinery.image || "/placeholder.svg"}
                  alt={machinery.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                  {machinery.category}
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">{machinery.name}</CardTitle>
                <CardDescription className="text-sm">{machinery.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-primary">{machinery.price}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="text-sm font-medium">{machinery.rating}</span>
                    <span className="text-xs text-muted-foreground">({machinery.reviews})</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1 mb-3">
                  {machinery.suitableFor.slice(0, 3).map((crop) => (
                    <Badge key={crop} variant="secondary" className="text-xs">
                      {crop}
                    </Badge>
                  ))}
                </div>
                <Button className="w-full group-hover:bg-primary/90 transition-colors">View Details</Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dealers Section */}
        <section className="mb-12">
          <h3 className="text-3xl font-bold text-center mb-8 text-foreground">Connect with Trusted Dealers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dealersData.map((dealer) => (
              <Card
                key={dealer.id}
                className="group transition-all duration-300 hover:scale-105 hover:shadow-xl border-border/50 hover:border-secondary/50"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                      {dealer.name}
                    </CardTitle>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="text-sm font-medium">{dealer.rating}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{dealer.location}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1">
                      {dealer.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge className="bg-accent text-accent-foreground">{dealer.discount}% Extra Discount</Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Phone className="h-4 w-4 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <Mail className="h-4 w-4 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center group transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Wrench className="h-12 w-12 text-primary mx-auto mb-4 group-hover:rotate-12 transition-transform" />
              <CardTitle>Expert Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Get professional guidance from agricultural machinery experts
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Users className="h-12 w-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <CardTitle>Verified Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Read authentic reviews from real farmers and agricultural professionals
              </p>
            </CardContent>
          </Card>

          <Card className="text-center group transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <Zap className="h-12 w-12 text-accent mx-auto mb-4 group-hover:animate-pulse transition-all" />
              <CardTitle>Instant Connect</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-pretty">
                Connect instantly with dealers and get quotes within minutes
              </p>
            </CardContent>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Tractor className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">AgriMachinery</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Connecting farmers with the best agricultural machinery since 2020
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
