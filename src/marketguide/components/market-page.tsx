"use client"

import { motion } from "framer-motion"
import farmerBg from "@/marketguide/public/images/farmer-background.jpg"
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  TrendingUp,
  MapPin,
  Users,
  Calculator,
  Truck,
  FileText,
  Star,
  ChevronRight,
  Bell,
  Plus,
  Globe,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

const languages = [
  { code: "en", name: "English", native: "English" },
  { code: "hi", name: "Hindi", native: "हिंदी" },
  { code: "bn", name: "Bengali", native: "বাংলা" },
  { code: "te", name: "Telugu", native: "తెలుగు" },
  { code: "mr", name: "Marathi", native: "मराठी" },
  { code: "ta", name: "Tamil", native: "தமிழ்" },
  { code: "gu", name: "Gujarati", native: "ગુજરાતી" },
  { code: "ur", name: "Urdu", native: "اردو" },
  { code: "kn", name: "Kannada", native: "ಕನ್ನಡ" },
  { code: "ml", name: "Malayalam", native: "മലയാളം" },
  { code: "or", name: "Odia", native: "ଓଡ଼ିଆ" },
  { code: "pa", name: "Punjabi", native: "ਪੰਜਾਬੀ" },
  { code: "as", name: "Assamese", native: "অসমীয়া" },
  { code: "mai", name: "Maithili", native: "मैथिली" },
  { code: "mag", name: "Magahi", native: "मगही" },
  { code: "bho", name: "Bhojpuri", native: "भोजपुरी" },
  { code: "raj", name: "Rajasthani", native: "राजस्थानी" },
  { code: "chhg", name: "Chhattisgarhi", native: "छत्तीसगढ़ी" },
  { code: "hne", name: "Haryanvi", native: "हरियाणवी" },
  { code: "gom", name: "Konkani", native: "कोंकणी" },
  { code: "tcy", name: "Tulu", native: "ತುಳು" },
  { code: "new", name: "Newari", native: "नेवारी" },
  { code: "bpy", name: "Bishnupriya", native: "বিষ্ণুপ্রিয়া" },
  { code: "sat", name: "Santali", native: "ᱥᱟᱱᱛᱟᱲᱤ" },
  { code: "mni", name: "Manipuri", native: "মৈতৈলোন্" },
  { code: "lus", name: "Mizo", native: "Mizo ṭawng" },
  { code: "kha", name: "Khasi", native: "Khasi" },
  { code: "grt", name: "Garo", native: "Garo" },
]

const translations = {
  en: {
    title: "Market Guide",
    subtitle: "Real Market Insights",
    quickNav: {
      prices: "Prices",
      buyers: "Buyers",
      calculator: "Calculator",
      transport: "Transport",
      schemes: "Schemes",
    },
    livePrices: "Live Crop Prices",
    setPriceAlert: "Set Price Alert",
    buyersSellers: "Buyers & Sellers",
    demandForecast: "Demand Forecast & Profitability",
    logistics: "Logistics & Transportation",
    mspSchemes: "MSP & Government Schemes",
    community: "Community Reviews",
  },
  hi: {
    title: "बाजार गाइड",
    subtitle: "वास्तविक बाजार अंतर्दृष्टि",
    quickNav: {
      prices: "कीमतें",
      buyers: "खरीदार",
      calculator: "कैलकुलेटर",
      transport: "परिवहन",
      schemes: "योजनाएं",
    },
    livePrices: "लाइव फसल कीमतें",
    setPriceAlert: "मूल्य अलर्ट सेट करें",
    buyersSellers: "खरीदार और विक्रेता",
    demandForecast: "मांग पूर्वानुमान और लाभप्रदता",
    logistics: "रसद और परिवहन",
    mspSchemes: "एमएसपी और सरकारी योजनाएं",
    community: "समुदायिक समीक्षा",
  },
  // Add more languages as needed
}

const cropPrices = [
  { crop: "Wheat", location: "Mandi Gobindgarh, Punjab", price: "₹2,275/quintal", change: "+1.2%", msp: "₹2,275" },
  { crop: "Rice (Basmati)", location: "Karnal, Haryana", price: "₹4,200/quintal", change: "+2.8%", msp: "₹2,320" },
  { crop: "Cotton (Medium)", location: "Rajkot, Gujarat", price: "₹6,800/quintal", change: "-0.8%", msp: "₹6,620" },
  { crop: "Sugarcane", location: "Muzaffarnagar, UP", price: "₹380/quintal", change: "+4.2%", msp: "₹340" },
  { crop: "Soybean", location: "Indore, MP", price: "₹4,750/quintal", change: "+1.5%", msp: "₹4,600" },
  { crop: "Maize", location: "Davangere, Karnataka", price: "₹2,150/quintal", change: "+0.9%", msp: "₹2,090" },
  { crop: "Groundnut", location: "Rajkot, Gujarat", price: "₹6,500/quintal", change: "+3.1%", msp: "₹6,377" },
  { crop: "Onion", location: "Nashik, Maharashtra", price: "₹2,800/quintal", change: "+15.2%", msp: "₹2,530" },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      duration: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
}

const buyersSellers = [
  {
    name: "AgriCorp Ltd",
    type: "Buyer",
    crop: "Wheat",
    quantity: "500 tons",
    location: "Delhi NCR",
    contact: "+91-9876543210",
  },
  {
    name: "Green Harvest Co",
    type: "Seller",
    crop: "Basmati Rice",
    quantity: "200 tons",
    location: "Karnal, Haryana",
    contact: "+91-9876543211",
  },
  {
    name: "FarmFresh Exports",
    type: "Buyer",
    crop: "Cotton",
    quantity: "300 tons",
    location: "Mumbai Port",
    contact: "+91-9876543212",
  },
  {
    name: "Organic Grains Ltd",
    type: "Buyer",
    crop: "Soybean",
    quantity: "150 tons",
    location: "Indore, MP",
    contact: "+91-9876543213",
  },
  {
    name: "Krishi Mandal",
    type: "Seller",
    crop: "Groundnut",
    quantity: "100 tons",
    location: "Rajkot, Gujarat",
    contact: "+91-9876543214",
  },
]

const reviews = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    text: "This platform helped me get 15% better prices for my wheat crop! Got ₹2,400/quintal vs local rate of ₹2,100.",
    location: "Ludhiana, Punjab",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    text: "The demand forecasting feature is incredibly accurate. Predicted cotton price rise 2 weeks before it happened.",
    location: "Ahmedabad, Gujarat",
  },
  {
    name: "Amit Singh",
    rating: 4,
    text: "Great logistics support, saved me ₹8,000 in transportation costs for 50 quintals of rice.",
    location: "Patna, Bihar",
  },
]

const quickNavItems = [
  { label: "Prices", icon: TrendingUp, href: "prices" },
  { label: "Buyers", icon: Users, href: "buyers" },
  { label: "Calculator", icon: Calculator, href: "calculator" },
  { label: "Transport", icon: Truck, href: "transport" },
  { label: "Schemes", icon: FileText, href: "schemes" },
]

export default function MarketPage() {
  const [currentLanguage, setCurrentLanguage] = useState("en")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [profitInput, setProfitInput] = useState("")
  const [selectedCrop, setSelectedCrop] = useState("")
  const [isCalculating, setIsCalculating] = useState(false)
  const [profitResult, setProfitResult] = useState<any>(null)

  const [priceAlertOpen, setPriceAlertOpen] = useState(false)
  const [transportBookingOpen, setTransportBookingOpen] = useState(false)
  const [cropPostingOpen, setCropPostingOpen] = useState(false)
  const [connectModalOpen, setConnectModalOpen] = useState(false)
  const [selectedBuyerSeller, setSelectedBuyerSeller] = useState<any>(null)

  const [routeInfo, setRouteInfo] = useState({
    distance: "",
    duration: "",
    cost: "",
  })

  const [routeFrom, setRouteFrom] = useState("")
  const [routeTo, setRouteTo] = useState("")
  const [isCalculatingRoute, setIsCalculatingRoute] = useState(false)
  const [marketsOnRoute, setMarketsOnRoute] = useState<string[]>([])

  const { toast } = useToast()
  const t = translations[currentLanguage as keyof typeof translations] || translations.en

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleProfitCalculation = async () => {
    if (!profitInput || !selectedCrop) {
      toast({
        title: "Missing Information",
        description: "Please enter quantity and select a crop",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)
    try {
      const response = await fetch("/api/profit-calculator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop: selectedCrop, quantity: Number(profitInput) }),
      })

      const data = await response.json()

      if (data.success) {
        setProfitResult(data.data)
        toast({
          title: "Calculation Complete",
          description: `Estimated profit: ₹${data.data.profit.toLocaleString()}`,
        })
      } else {
        toast({
          title: "Calculation Failed",
          description: data.message,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to calculate profit",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const handlePriceAlert = async (formData: FormData) => {
    try {
      const response = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          crop: formData.get("crop"),
          location: formData.get("location"),
          targetPrice: formData.get("targetPrice"),
          email: formData.get("email"),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Price Alert Set",
          description: "You'll be notified when the price reaches your target",
        })
        setPriceAlertOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to set price alert",
        variant: "destructive",
      })
    }
  }

  const handleTransportBooking = async (formData: FormData) => {
    try {
      const response = await fetch("/api/transport/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerName: formData.get("farmerName"),
          phone: formData.get("phone"),
          pickup: formData.get("pickup"),
          destination: formData.get("destination"),
          crop: formData.get("crop"),
          quantity: formData.get("quantity"),
          preferredDate: formData.get("preferredDate"),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Booking Confirmed",
          description: `Transport booked! Estimated cost: ₹${data.estimatedCost}`,
        })
        setTransportBookingOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to book transport",
        variant: "destructive",
      })
    }
  }

  const handleCropPosting = async (formData: FormData) => {
    try {
      const response = await fetch("/api/crops/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          farmerName: formData.get("farmerName"),
          phone: formData.get("phone"),
          crop: formData.get("crop"),
          quantity: formData.get("quantity"),
          pricePerQuintal: formData.get("pricePerQuintal"),
          location: formData.get("location"),
          harvestDate: formData.get("harvestDate"),
          description: formData.get("description"),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Crop Listed",
          description: "Your crop has been posted successfully",
        })
        setCropPostingOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post crop",
        variant: "destructive",
      })
    }
  }

  const handleConnect = async (formData: FormData) => {
    try {
      const response = await fetch("/api/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requesterName: formData.get("requesterName"),
          requesterPhone: formData.get("requesterPhone"),
          requesterEmail: formData.get("requesterEmail"),
          targetType: selectedBuyerSeller?.type?.toLowerCase(),
          targetName: selectedBuyerSeller?.name,
          crop: selectedBuyerSeller?.crop,
          message: formData.get("message"),
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: "Connection Request Sent",
          description: "The buyer/seller will be notified of your interest",
        })
        setConnectModalOpen(false)
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send connection request",
        variant: "destructive",
      })
    }
  }

  const calculateRoute = async () => {
    if (!routeFrom.trim() || !routeTo.trim()) {
      toast({
        title: "Missing Information",
        description: "Please enter both pickup and destination locations",
        variant: "destructive",
      })
      return
    }

    setIsCalculatingRoute(true)
    try {
      const response = await fetch("/api/calculate-route", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: routeFrom,
          to: routeTo,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setRouteInfo({
          distance: data.route.distance,
          duration: data.route.duration,
          cost: data.route.cost,
        })
        setMarketsOnRoute(data.route.marketsOnRoute)
        toast({
          title: "Route Calculated",
          description: `Route from ${data.route.from} to ${data.route.to} calculated successfully`,
        })
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Calculation Failed",
        description: "Unable to calculate route. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCalculatingRoute(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative py-20 px-6 overflow-hidden min-h-[60vh] flex items-center"
      >
        <div className="absolute inset-0">
          <img src={farmerBg} alt="Farmer in field" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#369042]/80 via-[#a1cc33]/70 to-[#FFCA53]/60"></div>
        </div>

        <div className="absolute top-6 right-6 z-20">
          <div className="relative">
            <Button
              variant="outline"
              className="border-white/30 text-white hover:bg-white/20 bg-white/10 backdrop-blur-sm"
              onMouseEnter={() => setShowLanguageDropdown(true)}
              onMouseLeave={() => setShowLanguageDropdown(false)}
            >
              <Globe className="w-4 h-4 mr-2" />
              {languages.find((lang) => lang.code === currentLanguage)?.native}
            </Button>

            {showLanguageDropdown && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border max-h-80 overflow-y-auto z-30"
                onMouseEnter={() => setShowLanguageDropdown(true)}
                onMouseLeave={() => setShowLanguageDropdown(false)}
              >
                <div className="grid grid-cols-2 gap-1 p-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setCurrentLanguage(lang.code)
                        setShowLanguageDropdown(false)
                        toast({
                          title: "Language Changed",
                          description: `Switched to ${lang.native}`,
                        })
                      }}
                      className={`text-left p-2 rounded hover:bg-gray-100 text-sm ${
                        currentLanguage === lang.code ? "bg-[#369042] text-white" : "text-gray-700"
                      }`}
                    >
                      <div className="font-medium">{lang.native}</div>
                      <div className="text-xs opacity-70">{lang.name}</div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <div className="text-left max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-6xl font-bold mb-4 bg-gradient-to-r from-white via-[#F9FB80] to-[#FFCA53] bg-clip-text text-transparent"
            >
              {t.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-white/90 mb-8 font-medium"
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {quickNavItems.map((item, index) => (
                <motion.button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "#FFCA53",
                    color: "#369042",
                  }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:shadow-lg border border-white/30 cursor-pointer"
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {t.quickNav[item.label.toLowerCase() as keyof typeof t.quickNav]}
                  </span>
                </motion.button>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.header>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-6 space-y-16 pb-16"
      >
        <motion.section variants={itemVariants} className="space-y-6" id="prices">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-[#369042]" />
              <h2 className="text-3xl font-bold text-[#369042]">{t.livePrices}</h2>
            </div>
            <Dialog open={priceAlertOpen} onOpenChange={setPriceAlertOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-[#FFCA53] to-[#F9FB80] hover:from-[#F9FB80] hover:to-[#FFCA53] text-[#369042] font-semibold">
                  <Bell className="w-4 h-4 mr-2" />
                  {t.setPriceAlert}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.setPriceAlert}</DialogTitle>
                </DialogHeader>
                <form action={handlePriceAlert} className="space-y-4">
                  <Select name="crop" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input name="location" placeholder="Location" required />
                  <Input name="targetPrice" type="number" placeholder="Target price (₹/quintal)" required />
                  <Input name="email" type="email" placeholder="Your email" required />
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white">
                    Set Alert
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Card className="overflow-hidden shadow-lg border-0 bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold">Crop</th>
                      <th className="px-6 py-4 text-left font-semibold">Market & Location</th>
                      <th className="px-6 py-4 text-left font-semibold">Current Price</th>
                      <th className="px-6 py-4 text-left font-semibold">MSP</th>
                      <th className="px-6 py-4 text-left font-semibold">Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cropPrices.map((item, index) => (
                      <motion.tr
                        key={index}
                        whileHover={{
                          backgroundColor: "#FFCA53",
                          color: "#369042",
                          boxShadow: "0 4px 20px rgba(255, 202, 83, 0.3)",
                        }}
                        transition={{ duration: 0.3 }}
                        className="border-b border-gray-100 cursor-pointer"
                      >
                        <td className="px-6 py-4 font-medium">{item.crop}</td>
                        <td className="px-6 py-4 text-sm">{item.location}</td>
                        <td className="px-6 py-4 font-semibold">{item.price}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">₹{item.msp}</td>
                        <td
                          className={`px-6 py-4 font-medium ${item.change.startsWith("+") ? "text-green-600" : "text-red-600"}`}
                        >
                          {item.change}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Buyers & Sellers */}
        <motion.section variants={itemVariants} className="space-y-6" id="buyers">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-8 h-8 text-[#369042]" />
            <h2 className="text-3xl font-bold text-[#369042]">{t.buyersSellers}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {buyersSellers.map((item, index) => (
              <motion.div
                key={index}
                whileHover={{
                  rotateY: 5,
                  rotateX: 5,
                  scale: 1.05,
                  boxShadow: "0 20px 40px rgba(255, 202, 83, 0.4)",
                  backgroundColor: "#FFCA53",
                }}
                transition={{ duration: 0.3 }}
                className="group"
              >
                <Card className="h-full border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-[#369042] text-lg">{item.name}</CardTitle>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        item.type === "Buyer"
                          ? "bg-gradient-to-r from-[#FFCA53] to-[#F9FB80] text-[#369042]"
                          : "bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white"
                      }`}
                    >
                      {item.type}
                    </span>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-gray-600">
                      <strong>Crop:</strong> {item.crop}
                    </p>
                    <p className="text-gray-600">
                      <strong>Quantity:</strong> {item.quantity}
                    </p>
                    <p className="text-gray-600">
                      <strong>Location:</strong> {item.location}
                    </p>
                    <p className="text-gray-600 text-sm">
                      <strong>Contact:</strong> {item.contact}
                    </p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="pt-4"
                    >
                      <Button
                        onClick={() => {
                          setSelectedBuyerSeller(item)
                          setConnectModalOpen(true)
                        }}
                        className="w-full bg-gradient-to-r from-[#FFCA53] to-[#F9FB80] hover:from-[#F9FB80] hover:to-[#FFCA53] text-[#369042] font-semibold border-0 shadow-md"
                      >
                        Connect Now
                        <ChevronRight className="w-4 h-4 ml-2" />
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center"
          >
            <Dialog open={cropPostingOpen} onOpenChange={setCropPostingOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-[#369042] hover:bg-[#a1cc33] text-white font-semibold px-8 py-3 shadow-lg border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Post Your Crop
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Post Your Crop</DialogTitle>
                </DialogHeader>
                <form action={handleCropPosting} className="space-y-4">
                  <Input name="farmerName" placeholder="Your name" required />
                  <Input name="phone" placeholder="Phone number" required />
                  <Select name="crop" required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="wheat">Wheat</SelectItem>
                      <SelectItem value="rice">Rice</SelectItem>
                      <SelectItem value="cotton">Cotton</SelectItem>
                      <SelectItem value="sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="maize">Maize</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input name="quantity" type="number" placeholder="Quantity (quintals)" required />
                  <Input name="pricePerQuintal" type="number" placeholder="Price per quintal (₹)" required />
                  <Input name="location" placeholder="Location" required />
                  <Input name="harvestDate" type="date" placeholder="Harvest date" required />
                  <Textarea name="description" placeholder="Additional details" />
                  <Button type="submit" className="w-full bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white">
                    Post Crop
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.section>

        {/* Demand Forecast & Profitability */}
        <motion.section variants={itemVariants} className="space-y-6" id="calculator">
          <div className="flex items-center gap-3 mb-6">
            <Calculator className="w-8 h-8 text-[#369042]" />
            <h2 className="text-3xl font-bold text-[#369042]">{t.demandForecast}</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="text-[#369042]">Market Demand Forecast</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Wheat (Next 30 days)</span>
                      <span className="font-semibold text-green-600">↗ High Demand</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Rice (Next 30 days)</span>
                      <span className="font-semibold text-yellow-600">→ Stable</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Cotton (Next 30 days)</span>
                      <span className="font-semibold text-green-600">↗ Growing</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
              <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
                <CardHeader>
                  <CardTitle className="text-[#369042]">Profit Calculator</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select crop" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="wheat">Wheat</SelectItem>
                        <SelectItem value="rice">Rice</SelectItem>
                        <SelectItem value="cotton">Cotton</SelectItem>
                        <SelectItem value="sugarcane">Sugarcane</SelectItem>
                        <SelectItem value="maize">Maize</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      placeholder="Enter crop quantity (quintals)"
                      value={profitInput}
                      onChange={(e) => setProfitInput(e.target.value)}
                      className={`border-2 transition-all duration-300 ${
                        isCalculating
                          ? "border-[#F9FB80] shadow-lg shadow-[#F9FB80]/30"
                          : "border-gray-200 focus:border-[#FFCA53]"
                      }`}
                    />
                    <Button
                      onClick={handleProfitCalculation}
                      disabled={isCalculating}
                      className={`w-full transition-all duration-500 ${
                        isCalculating
                          ? "bg-gradient-to-r from-[#F9FB80] to-[#FFCA53] shadow-lg shadow-[#F9FB80]/50"
                          : "bg-gradient-to-r from-[#FFCA53] to-[#F9FB80] hover:from-[#F9FB80] hover:to-[#FFCA53]"
                      } text-[#369042] font-semibold`}
                    >
                      {isCalculating ? "Calculating..." : "Calculate Profit"}
                    </Button>
                    {profitResult && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-4 bg-gradient-to-r from-[#369042]/10 to-[#a1cc33]/10 rounded-lg space-y-2"
                      >
                        <p className="text-[#369042] font-semibold">
                          Total Cost: ₹{profitResult.totalCost.toLocaleString()}
                        </p>
                        <p className="text-[#369042] font-semibold">
                          Total Revenue: ₹{profitResult.totalRevenue.toLocaleString()}
                        </p>
                        <p className="text-[#369042] font-bold text-lg">
                          Net Profit: ₹{profitResult.profit.toLocaleString()} ({profitResult.profitPercentage}%)
                        </p>
                      </motion.div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6" id="transport">
          <div className="flex items-center gap-3 mb-6">
            <Truck className="w-8 h-8 text-[#369042]" />
            <h2 className="text-3xl font-bold text-[#369042]">{t.logistics}</h2>
          </div>
          <motion.div
            whileHover={{
              scale: 1.02,
              boxShadow: "0 25px 50px rgba(54, 144, 66, 0.2)",
            }}
            transition={{ duration: 0.5 }}
            className="group"
          >
            <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 overflow-hidden">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold text-[#369042]">Smart Route Planning</h3>
                      <p className="text-gray-600 leading-relaxed">
                        AI-powered logistics optimization to reduce transportation costs and delivery time. Connect with
                        verified transporters in your area.
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-[#a1cc33]" />
                          <span className="text-sm text-gray-600">Real-time GPS tracking</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Truck className="w-4 h-4 text-[#a1cc33]" />
                          <span className="text-sm text-gray-600">Verified transport partners</span>
                        </div>
                      </div>
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Dialog open={transportBookingOpen} onOpenChange={setTransportBookingOpen}>
                          <DialogTrigger asChild>
                            <Button className="bg-[#369042] hover:bg-[#a1cc33] text-white font-semibold px-6 py-3 shadow-lg border-0">
                              Book Transport
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Book Transport</DialogTitle>
                            </DialogHeader>
                            <form action={handleTransportBooking} className="space-y-4">
                              <Input name="farmerName" placeholder="Your name" required />
                              <Input name="phone" placeholder="Phone number" required />
                              <Input name="pickup" placeholder="Pickup location" required />
                              <Input name="destination" placeholder="Destination" required />
                              <Select name="crop" required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select crop" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="wheat">Wheat</SelectItem>
                                  <SelectItem value="rice">Rice</SelectItem>
                                  <SelectItem value="cotton">Cotton</SelectItem>
                                  <SelectItem value="sugarcane">Sugarcane</SelectItem>
                                  <SelectItem value="maize">Maize</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input name="quantity" type="number" placeholder="Quantity (quintals)" required />
                              <Input name="preferredDate" type="date" placeholder="Preferred date" required />
                              <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white"
                              >
                                Book Now
                              </Button>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </motion.div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-[#369042]">Route Information</h4>
                      {routeInfo.distance && (
                        <div className="bg-gradient-to-r from-[#369042]/10 to-[#a1cc33]/10 rounded-lg p-4 space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Distance:</span>
                            <span className="font-semibold text-[#369042]">{routeInfo.distance}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-semibold text-[#369042]">{routeInfo.duration}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Est. Cost:</span>
                            <span className="font-semibold text-[#FFCA53]">{routeInfo.cost}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold text-[#369042]">Interactive Route Map</h4>
                    <div className="bg-gradient-to-br from-green-50 to-yellow-50 rounded-lg p-6 border-2 border-[#369042]/20">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#369042]">From (Pickup Location)</label>
                            <input
                              type="text"
                              placeholder="Enter pickup location (e.g., Delhi, Mumbai, Bangalore)"
                              value={routeFrom}
                              onChange={(e) => setRouteFrom(e.target.value)}
                              className="w-full p-3 border border-[#369042]/30 rounded-lg focus:ring-2 focus:ring-[#369042] focus:border-transparent"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-[#369042]">To (Destination)</label>
                            <input
                              type="text"
                              placeholder="Enter destination (e.g., Chennai, Kolkata, Pune)"
                              value={routeTo}
                              onChange={(e) => setRouteTo(e.target.value)}
                              className="w-full p-3 border border-[#369042]/30 rounded-lg focus:ring-2 focus:ring-[#369042] focus:border-transparent"
                            />
                          </div>
                          <Button
                            onClick={calculateRoute}
                            disabled={isCalculatingRoute}
                            className="w-full bg-gradient-to-r from-[#369042] to-[#a1cc33] hover:from-[#2d7235] hover:to-[#8fb82a] text-white"
                          >
                            {isCalculatingRoute ? "Calculating..." : "Calculate Route"}
                          </Button>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-[#369042]/20">
                          <h5 className="font-semibold text-[#369042] mb-3">Route Information</h5>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Distance:</span>
                              <span className="font-medium">{routeInfo.distance || "Enter locations"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Duration:</span>
                              <span className="font-medium">{routeInfo.duration || "Enter locations"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Est. Cost:</span>
                              <span className="font-medium text-[#369042]">
                                {routeInfo.cost ? `₹${routeInfo.cost}` : "Enter locations"}
                              </span>
                            </div>
                          </div>

                          <div className="mt-4 p-3 bg-gradient-to-r from-[#369042]/10 to-[#a1cc33]/10 rounded-lg">
                            <div className="flex items-center gap-2 text-sm text-[#369042]">
                              <div className="w-2 h-2 bg-[#369042] rounded-full"></div>
                              <span>Major Markets on Route</span>
                            </div>
                            <div className="mt-2 text-xs text-gray-600 space-y-1">
                              {marketsOnRoute.length > 0 ? (
                                marketsOnRoute.map((market, index) => <div key={index}>• {market}</div>)
                              ) : (
                                <div>• Calculate route to see markets</div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants} className="space-y-6" id="schemes">
          <div className="flex items-center gap-3 mb-6">
            <FileText className="w-8 h-8 text-[#369042]" />
            <h2 className="text-3xl font-bold text-[#369042]">{t.mspSchemes}</h2>
          </div>
          <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
            <CardContent className="p-6">
              <Accordion type="single" collapsible className="space-y-2">
                <AccordionItem value="msp" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-[#369042] font-semibold hover:no-underline">
                    Minimum Support Price (MSP) 2024-25 - Kharif Season
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <h4 className="font-semibold text-[#369042] mb-2">Cereals</h4>
                        <p>
                          <strong>Paddy (Common):</strong> ₹2,300/quintal
                        </p>
                        <p>
                          <strong>Paddy (Grade A):</strong> ₹2,320/quintal
                        </p>
                        <p>
                          <strong>Jowar (Hybrid):</strong> ₹3,180/quintal
                        </p>
                        <p>
                          <strong>Bajra:</strong> ₹2,500/quintal
                        </p>
                        <p>
                          <strong>Maize:</strong> ₹2,090/quintal
                        </p>
                        <p>
                          <strong>Ragi:</strong> ₹3,846/quintal
                        </p>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-[#369042] mb-2">Cash Crops</h4>
                        <p>
                          <strong>Cotton (Medium Staple):</strong> ₹6,620/quintal
                        </p>
                        <p>
                          <strong>Cotton (Long Staple):</strong> ₹7,020/quintal
                        </p>
                        <p>
                          <strong>Sugarcane:</strong> ₹340/quintal
                        </p>
                        <p>
                          <strong>Groundnut:</strong> ₹6,377/quintal
                        </p>
                        <p>
                          <strong>Sunflower Seed:</strong> ₹6,760/quintal
                        </p>
                        <p>
                          <strong>Soybean (Yellow):</strong> ₹4,600/quintal
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> MSP is announced by the Government of India to ensure farmers get
                        remunerative prices. Procurement is done through agencies like FCI, NAFED, and state agencies.
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="rabi-msp" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-[#369042] font-semibold hover:no-underline">
                    Rabi Crops MSP 2024-25
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <p>
                          <strong>Wheat:</strong> ₹2,275/quintal
                        </p>
                        <p>
                          <strong>Barley:</strong> ₹1,850/quintal
                        </p>
                        <p>
                          <strong>Gram:</strong> ₹5,440/quintal
                        </p>
                        <p>
                          <strong>Masur (Lentil):</strong> ₹6,425/quintal
                        </p>
                      </div>
                      <div className="space-y-2">
                        <p>
                          <strong>Rapeseed & Mustard:</strong> ₹5,650/quintal
                        </p>
                        <p>
                          <strong>Safflower:</strong> ₹5,650/quintal
                        </p>
                        <p>
                          <strong>Toria:</strong> ₹5,625/quintal
                        </p>
                        <p>
                          <strong>Onion:</strong> ₹2,530/quintal
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="schemes" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-[#369042] font-semibold hover:no-underline">
                    Major Government Schemes for Farmers
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-[#369042] pl-4">
                        <h4 className="font-semibold text-[#369042]">PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)</h4>
                        <p className="text-sm mb-1">₹6,000 annual income support in 3 installments of ₹2,000 each</p>
                        <p className="text-xs text-gray-500">
                          Beneficiaries: 11+ crore farmers | Budget: ₹60,000 crores (2024-25)
                        </p>
                      </div>

                      <div className="border-l-4 border-[#a1cc33] pl-4">
                        <h4 className="font-semibold text-[#369042]">PMFBY (Pradhan Mantri Fasal Bima Yojana)</h4>
                        <p className="text-sm mb-1">Crop insurance with premium: 2% for Kharif, 1.5% for Rabi crops</p>
                        <p className="text-xs text-gray-500">
                          Coverage: Up to sum insured amount | Claims: ₹1,07,059 crores paid (2023-24)
                        </p>
                      </div>

                      <div className="border-l-4 border-[#FFCA53] pl-4">
                        <h4 className="font-semibold text-[#369042]">Soil Health Card Scheme</h4>
                        <p className="text-sm mb-1">Free soil testing every 2 years with nutrient recommendations</p>
                        <p className="text-xs text-gray-500">Target: 24 crore farmers | Cards issued: 22+ crore</p>
                      </div>

                      <div className="border-l-4 border-[#369042] pl-4">
                        <h4 className="font-semibold text-[#369042]">PM-KUSUM (Solar Agriculture Scheme)</h4>
                        <p className="text-sm mb-1">Solar pumps and grid-connected solar power plants for farmers</p>
                        <p className="text-xs text-gray-500">Target: 25.75 lakh solar pumps | Subsidy: Up to 60%</p>
                      </div>

                      <div className="border-l-4 border-[#a1cc33] pl-4">
                        <h4 className="font-semibold text-[#369042]">Kisan Credit Card (KCC)</h4>
                        <p className="text-sm mb-1">
                          Easy credit access with 4% interest rate (3% with prompt repayment)
                        </p>
                        <p className="text-xs text-gray-500">
                          Active cards: 7+ crore | Credit limit: Up to ₹3 lakh without collateral
                        </p>
                      </div>

                      <div className="border-l-4 border-[#FFCA53] pl-4">
                        <h4 className="font-semibold text-[#369042]">e-NAM (National Agriculture Market)</h4>
                        <p className="text-sm mb-1">Online trading platform connecting 1,361 mandis across India</p>
                        <p className="text-xs text-gray-500">
                          Registered farmers: 1.77+ crore | Trade value: ₹2,77,000+ crores
                        </p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="subsidies" className="border border-gray-200 rounded-lg px-4">
                  <AccordionTrigger className="text-[#369042] font-semibold hover:no-underline">
                    Input Subsidies & Support
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pt-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-[#369042]">Fertilizer Subsidy</h4>
                          <p className="text-sm">Urea: ₹266/bag subsidy | DAP: ₹1,350/bag subsidy</p>
                          <p className="text-xs text-gray-500">Total allocation: ₹1,75,100 crores (2024-25)</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#369042]">Seed Subsidy</h4>
                          <p className="text-sm">50% subsidy on certified seeds for small farmers</p>
                          <p className="text-xs text-gray-500">25% for other farmers</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <h4 className="font-semibold text-[#369042]">Machinery Subsidy</h4>
                          <p className="text-sm">40-50% subsidy on farm equipment for SC/ST farmers</p>
                          <p className="text-xs text-gray-500">25-40% for general category farmers</p>
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#369042]">Drip Irrigation</h4>
                          <p className="text-sm">55% subsidy under PMKSY scheme</p>
                          <p className="text-xs text-gray-500">Up to ₹40,000 per hectare</p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </motion.section>

        {/* Community Section */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-8 h-8 text-[#369042]" />
            <h2 className="text-3xl font-bold text-[#369042]">{t.community}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(54, 144, 66, 0.15)" }}
              >
                <Card className="border-0 shadow-lg bg-gradient-to-br from-white to-gray-50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFCA53] text-[#FFCA53]" />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                    <div>
                      <p className="font-semibold text-[#369042]">- {review.name}</p>
                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </motion.div>

      {/* Connection Modal */}
      <Dialog open={connectModalOpen} onOpenChange={setConnectModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Connect with {selectedBuyerSeller?.name}</DialogTitle>
          </DialogHeader>
          <form action={handleConnect} className="space-y-4">
            <Input name="requesterName" placeholder="Your name" required />
            <Input name="requesterPhone" placeholder="Your phone number" required />
            <Input name="requesterEmail" placeholder="Your email" required />
            <Textarea name="message" placeholder="Message (optional)" />
            <Button type="submit" className="w-full bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white">
              Send Connection Request
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-[#369042] to-[#a1cc33] text-white py-12 mt-16"
      >
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h3 className="text-2xl font-bold mb-4">AI Farmer Advisory System</h3>
          <p className="text-green-100 mb-6">Empowering farmers with intelligent market insights</p>
          <div className="flex justify-center gap-6">
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#369042] bg-transparent"
              onClick={() =>
                toast({ title: "Contact Support", description: "Support team will contact you within 24 hours" })
              }
            >
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-[#369042] bg-transparent"
              onClick={() => toast({ title: "Download App", description: "App download link sent to your device" })}
            >
              Download App
            </Button>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
