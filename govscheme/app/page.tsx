"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Globe,
  Sprout,
  Droplets,
  Shield,
  Tractor,
  CreditCard,
  Warehouse,
  Leaf,
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Download,
  BookmarkPlus,
  Calculator,
  ChevronRight,
  Star,
  Users,
  TrendingUp,
} from "lucide-react"

const translations = {
  English: {
    title: "Government Schemes & Support",
    backToDashboard: "Back to Dashboard",
    featuredSchemes: "Featured Government Schemes",
    featuredDescription:
      "Discover the most popular and beneficial schemes currently available for farmers across India",
    schemesByCategory: "Schemes by Category",
    categoryDescription: "Explore government schemes organized by different agricultural sectors and needs",
    mspRates: "MSP Rates & Direct Benefits",
    mspDescription: "Current Minimum Support Prices and direct benefit transfer schemes",
    subsidyCalculator: "Subsidy Calculator",
    calculatorDescription: "Calculate your approximate subsidy amount based on crop type and acreage",
    successStories: "Success Stories",
    successDescription: "Real farmers sharing their success with government schemes",
    helpAssistance: "Help & Assistance",
    helpDescription: "Get support and answers to your questions about government schemes",
    applyNow: "Apply Now",
    trending: "Trending",
    department: "Department",
    deadline: "Deadline",
    irrigation: "Irrigation",
    insurance: "Insurance",
    subsidy: "Subsidy",
    loans: "Loans",
    organic: "Organic",
    logistics: "Logistics",
    calculateSubsidy: "Calculate Subsidy",
    estimatedSubsidy: "Estimated Subsidy",
    downloadEstimate: "Download Estimate PDF",
    readFullStory: "Read Full Story",
    callHelpline: "Call Helpline",
    whatsapp: "WhatsApp",
    email: "Email",
    nearestCenter: "Nearest Center",
    quickLinks: "Quick Links",
    governmentLinks: "Government Links",
    support: "Support",
    connectWithUs: "Connect With Us",
    copyright: "© 2024 Government of India. All rights reserved. | Developed for Farmer Welfare",
  },
  Hindi: {
    title: "सरकारी योजनाएं और सहायता",
    backToDashboard: "डैशबोर्ड पर वापस जाएं",
    featuredSchemes: "प्रमुख सरकारी योजनाएं",
    featuredDescription: "भारत भर के किसानों के लिए वर्तमान में उपलब्ध सबसे लोकप्रिय और लाभकारी योजनाओं की खोज करें",
    schemesByCategory: "श्रेणी के अनुसार योजनाएं",
    categoryDescription: "विभिन्न कृषि क्षेत्रों और आवश्यकताओं के अनुसार व्यवस्थित सरकारी योजनाओं का अन्वेषण करें",
    mspRates: "एमएसपी दरें और प्रत्यक्ष लाभ",
    mspDescription: "वर्तमान न्यूनतम समर्थन मूल्य और प्रत्यक्ष लाभ हस्तांतरण योजनाएं",
    subsidyCalculator: "सब्सिडी कैलकुलेटर",
    calculatorDescription: "फसल के प्रकार और क्षेत्रफल के आधार पर अपनी अनुमानित सब्सिडी राशि की गणना करें",
    successStories: "सफलता की कहानियां",
    successDescription: "वास्तविक किसान सरकारी योजनाओं के साथ अपनी सफलता साझा कर रहे हैं",
    helpAssistance: "सहायता और सहायता",
    helpDescription: "सरकारी योजनाओं के बारे में अपने प्रश्नों का समर्थन और उत्तर प्राप्त करें",
    applyNow: "अभी आवेदन करें",
    trending: "ट्रेंडिंग",
    department: "विभाग",
    deadline: "अंतिम तिथि",
    irrigation: "सिंचाई",
    insurance: "बीमा",
    subsidy: "सब्सिडी",
    loans: "ऋण",
    organic: "जैविक",
    logistics: "रसद",
    calculateSubsidy: "सब्सिडी की गणना करें",
    estimatedSubsidy: "अनुमानित सब्सिडी",
    downloadEstimate: "अनुमान पीडीएफ डाउनलोड करें",
    readFullStory: "पूरी कहानी पढ़ें",
    callHelpline: "हेल्पलाइन कॉल करें",
    whatsapp: "व्हाट्सऐप",
    email: "ईमेल",
    nearestCenter: "निकटतम केंद्र",
    quickLinks: "त्वरित लिंक",
    governmentLinks: "सरकारी लिंक",
    support: "सहायता",
    connectWithUs: "हमसे जुड़ें",
    copyright: "© 2024 भारत सरकार। सभी अधिकार सुरक्षित। | किसान कल्याण के लिए विकसित",
  },
  // Adding more languages for demonstration - in a real app, you'd have all 28 languages
  Tamil: {
    title: "அரசு திட்டங்கள் மற்றும் ஆதரவு",
    backToDashboard: "டாஷ்போர்டுக்கு திரும்பு",
    featuredSchemes: "சிறப்பு அரசு திட்டங்கள்",
    featuredDescription:
      "இந்தியா முழுவதும் உள்ள விவசாயிகளுக்கு தற்போது கிடைக்கும் மிகவும் பிரபலமான மற்றும் பயனுள்ள திட்டங்களைக் கண்டறியுங்கள்",
    schemesByCategory: "வகை வாரியான திட்டங்கள்",
    categoryDescription: "பல்வேறு விவசாய துறைகள் மற்றும் தேவைகளின் அடிப்படையில் ஒழுங்கமைக்கப்பட்ட அரசு திட்டங்களை ஆராயுங்கள்",
    mspRates: "MSP விகிதங்கள் மற்றும் நேரடி பலன்கள்",
    mspDescription: "தற்போதைய குறைந்தபட்ச ஆதரவு விலைகள் மற்றும் நேரடி பலன் பரிமாற்ற திட்டங்கள்",
    subsidyCalculator: "மானியம் கணக்கிடுபவர்",
    calculatorDescription: "பயிர் வகை மற்றும் பரப்பளவின் அடிப்படையில் உங்கள் தோராயமான மானிய தொகையைக் கணக்கிடுங்கள்",
    successStories: "வெற்றிக் கதைகள்",
    successDescription: "உண்மையான விவசாயிகள் அரசு திட்டங்களுடன் தங்கள் வெற்றியைப் பகிர்ந்து கொள்கிறார்கள்",
    helpAssistance: "உதவி மற்றும் உதவி",
    helpDescription: "அரசு திட்டங்கள் பற்றிய உங்கள் கேள்விகளுக்கு ஆதரவு மற்றும் பதில்களைப் பெறுங்கள்",
    applyNow: "இப்போது விண்ணப்பிக்கவும்",
    trending: "டிரெண்டிங்",
    department: "துறை",
    deadline: "கடைசி தேதி",
    irrigation: "நீர்ப்பாசனம்",
    insurance: "காப்பீடு",
    subsidy: "மானியம்",
    loans: "கடன்கள்",
    organic: "இயற்கை",
    logistics: "தளவாடங்கள்",
    calculateSubsidy: "மானியத்தைக் கணக்கிடுங்கள்",
    estimatedSubsidy: "மதிப்பிடப்பட்ட மானியம்",
    downloadEstimate: "மதிப்பீடு PDF பதிவிறக்கம்",
    readFullStory: "முழு கதையைப் படியுங்கள்",
    callHelpline: "உதவி எண்ணை அழைக்கவும்",
    whatsapp: "வாட்ஸ்அப்",
    email: "மின்னஞ்சல்",
    nearestCenter: "அருகிலுள்ள மையம்",
    quickLinks: "விரைவு இணைப்புகள்",
    governmentLinks: "அரசு இணைப்புகள்",
    support: "ஆதரவு",
    connectWithUs: "எங்களுடன் இணைக்கவும்",
    copyright: "© 2024 இந்திய அரசு. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை. | விவசாயி நலனுக்காக உருவாக்கப்பட்டது",
  },
}

export default function GovernmentSchemesPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("English")
  const [activeSection, setActiveSection] = useState("")
  const [subsidyAmount, setSubsidyAmount] = useState(0)
  const [cropType, setCropType] = useState("")
  const [acreage, setAcreage] = useState("")

  const t = translations[selectedLanguage as keyof typeof translations] || translations.English

  const languages = [
    "English",
    "Hindi",
    "Marathi",
    "Tamil",
    "Telugu",
    "Bengali",
    "Punjabi",
    "Gujarati",
    "Kannada",
    "Malayalam",
    "Odia",
    "Assamese",
    "Urdu",
    "Sanskrit",
    "Kashmiri",
    "Sindhi",
    "Nepali",
    "Konkani",
    "Manipuri",
    "Bodo",
    "Dogri",
    "Maithili",
    "Santali",
    "Ho",
    "Khasi",
    "Garo",
    "Mizo",
    "Tripuri",
  ]

  const featuredSchemes = [
    {
      title: "PM-KISAN Samman Nidhi",
      description: "Direct income support of ₹6,000 per year to small and marginal farmers",
      department: "Ministry of Agriculture & Farmers Welfare",
      deadline: "Ongoing Registration",
      image: "/pm-kisan-scheme.jpg",
      applyLink: "https://pmkisan.gov.in/",
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Comprehensive crop insurance scheme covering pre-sowing to post-harvest losses",
      department: "Ministry of Agriculture & Farmers Welfare",
      deadline: "Seasonal Registration",
      image: "/fasal-bima-yojana.jpg",
      applyLink: "https://pmfby.gov.in/",
    },
    {
      title: "Kisan Credit Card",
      description: "Easy access to credit for farmers at subsidized interest rates up to ₹3 lakh",
      department: "Department of Financial Services",
      deadline: "Ongoing",
      image: "/farmer-with-credit-card.jpg",
      applyLink: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme",
    },
  ]

  const schemeCategories = {
    irrigation: [
      {
        name: "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        benefits: "90% subsidy on micro-irrigation",
        description: "Per Drop More Crop - water conservation initiative",
        applyLink: "https://pmksy.gov.in/",
      },
      {
        name: "Accelerated Irrigation Benefit Programme (AIBP)",
        benefits: "Central assistance for irrigation projects",
        description: "Fast-track completion of ongoing irrigation projects",
        applyLink: "https://jalshakti-dowr.gov.in/",
      },
      {
        name: "Command Area Development & Water Management",
        benefits: "Irrigation efficiency improvement",
        description: "Optimize water usage in command areas",
        applyLink: "https://jalshakti-dowr.gov.in/",
      },
    ],
    insurance: [
      {
        name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        benefits: "Premium subsidy up to 95%",
        description: "Comprehensive crop insurance against natural calamities",
        applyLink: "https://pmfby.gov.in/",
      },
      {
        name: "Weather Based Crop Insurance Scheme (WBCIS)",
        benefits: "Weather parameter based coverage",
        description: "Protection against adverse weather conditions",
        applyLink: "https://pmfby.gov.in/",
      },
      {
        name: "Coconut Palm Insurance Scheme (CPIS)",
        benefits: "Insurance for coconut palms",
        description: "Specific coverage for coconut farmers against natural disasters",
        applyLink: "https://coconutboard.gov.in/",
      },
    ],
    subsidy: [
      {
        name: "Sub-Mission on Agricultural Mechanization (SMAM)",
        benefits: "40-50% subsidy on farm machinery",
        description: "Promote farm mechanization for higher productivity",
        applyLink: "https://agrimachinery.nic.in/",
      },
      {
        name: "National Mission on Oilseeds and Oil Palm (NMOOP)",
        benefits: "Seed subsidy and technical support",
        description: "Increase oilseed production and reduce import dependency",
        applyLink: "https://nmoop.gov.in/",
      },
      {
        name: "Rashtriya Krishi Vikas Yojana (RKVY)",
        benefits: "State plan scheme funding",
        description: "Comprehensive agricultural development program",
        applyLink: "https://rkvy.nic.in/",
      },
    ],
    loans: [
      {
        name: "Kisan Credit Card (KCC)",
        benefits: "7% interest rate with 3% subvention",
        description: "Flexible credit facility for agricultural needs",
        applyLink: "https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme",
      },
      {
        name: "Agriculture Infrastructure Fund (AIF)",
        benefits: "3% interest subvention",
        description: "₹1 lakh crore fund for post-harvest infrastructure",
        applyLink: "https://www.nabard.org/content1.aspx?id=797",
      },
      {
        name: "Interest Subvention Scheme for Short Term Crop Loans",
        benefits: "4% effective interest rate",
        description: "Reduced cost of agricultural credit for farmers",
        applyLink: "https://www.nabard.org/",
      },
    ],
    organic: [
      {
        name: "Paramparagat Krishi Vikas Yojana (PKVY)",
        benefits: "₹50,000 per hectare for 3 years",
        description: "Promote organic farming through traditional methods",
        applyLink: "https://pgsindia-ncof.gov.in/",
      },
      {
        name: "Mission Organic Value Chain Development (MOVCD)",
        benefits: "End-to-end organic value chain support",
        description: "Organic production to consumption linkage",
        applyLink: "https://pgsindia-ncof.gov.in/",
      },
      {
        name: "National Programme for Organic Production (NPOP)",
        benefits: "Organic certification support",
        description: "Facilitate organic certification for farmers",
        applyLink: "https://www.apeda.gov.in/apedawebsite/organic/Organic_Products.htm",
      },
    ],
    logistics: [
      {
        name: "Gramin Bhandaran Yojana",
        benefits: "25% subsidy on storage construction",
        description: "Rural warehouse construction for farmers",
        applyLink: "https://www.nabard.org/",
      },
      {
        name: "Private Entrepreneurs Guarantee (PEG) Scheme",
        benefits: "Bank guarantee for storage",
        description: "Encourage private sector participation in storage",
        applyLink: "https://fci.gov.in/",
      },
      {
        name: "Integrated Cold Chain and Value Addition Infrastructure",
        benefits: "35% subsidy on cold storage",
        description: "Reduce post-harvest losses through cold chain",
        applyLink: "https://mofpi.gov.in/",
      },
    ],
  }

  const mspCrops = [
    { crop: "Paddy (Common)", rate: "₹2,300/quintal" },
    { crop: "Paddy (Grade A)", rate: "₹2,320/quintal" },
    { crop: "Wheat", rate: "₹2,425/quintal" },
    { crop: "Jowar (Hybrid)", rate: "₹3,225/quintal" },
    { crop: "Bajra", rate: "₹2,625/quintal" },
    { crop: "Maize", rate: "₹2,225/quintal" },
    { crop: "Arhar (Tur)", rate: "₹7,550/quintal" },
    { crop: "Moong", rate: "₹8,682/quintal" },
    { crop: "Urad", rate: "₹7,400/quintal" },
    { crop: "Cotton (Medium Staple)", rate: "₹7,121/quintal" },
    { crop: "Sugarcane", rate: "₹340/quintal" },
    { crop: "Groundnut", rate: "₹6,377/quintal" },
  ]

  const successStories = [
    {
      name: "Ramesh Kumar",
      location: "Punjab",
      story: "Increased income by 300% using PMKSY drip irrigation subsidy and reduced water usage by 40%",
      image: "/happy-indian-farmer.jpg",
    },
    {
      name: "Sunita Devi",
      location: "Maharashtra",
      story: "Started organic farming with PKVY scheme, now earning ₹2 lakh annually from 2 acres",
      image: "/female-indian-farmer.jpg",
    },
    {
      name: "Arjun Singh",
      location: "Rajasthan",
      story: "Built cold storage facility with 35% subsidy, serving 200+ farmers in the region",
      image: "/farmer-with-storage-facility.jpg",
    },
  ]

  const calculateSubsidy = () => {
    if (!cropType || !acreage) return

    const subsidyRates = {
      Rice: 2000,
      Wheat: 1800,
      Cotton: 2500,
      Sugarcane: 3000,
      Maize: 1500,
    }

    const rate = subsidyRates[cropType as keyof typeof subsidyRates] || 1000
    const amount = Number.parseFloat(acreage) * rate
    setSubsidyAmount(amount)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(sectionId)
    }
  }

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="animate-slide-in-left">
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t.backToDashboard}
            </Button>
          </div>

          <div className="text-center animate-fade-in-up">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent">
              {t.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
              <SelectTrigger className="w-40 animate-slide-in-left">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </header>

      {/* Quick Navigation */}
      <nav className="sticky top-16 z-40 bg-muted/50 backdrop-blur border-b border-border">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { id: "featured", label: t.featuredSchemes, icon: Star },
              { id: "categories", label: t.schemesByCategory, icon: Sprout },
              { id: "msp", label: t.mspRates, icon: TrendingUp },
              { id: "calculator", label: t.subsidyCalculator, icon: Calculator },
              { id: "success", label: t.successStories, icon: Users },
              { id: "help", label: t.helpAssistance, icon: Phone },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className="whitespace-nowrap hover:bg-accent hover:text-accent-foreground transition-all duration-300"
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Featured Schemes */}
      <section id="featured" className="py-12 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#369042] to-[#a1cc33] bg-clip-text text-transparent">
              {t.featuredSchemes}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.featuredDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featuredSchemes.map((scheme, index) => (
              <Card
                key={index}
                className="hover-tilt overflow-hidden border-2 hover:border-[#a1cc33] hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative">
                  <img
                    src={scheme.image || "/placeholder.svg"}
                    alt={scheme.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <Badge className="absolute top-4 right-4 bg-[#ffca53] text-black">{t.trending}</Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{scheme.title}</CardTitle>
                  <CardDescription>{scheme.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>{t.department}:</strong> {scheme.department}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <strong>{t.deadline}:</strong> {scheme.deadline}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-[#369042] hover:bg-[#369042]/90 animate-glow"
                      onClick={() => window.open(scheme.applyLink, "_blank")}
                    >
                      {t.applyNow}
                    </Button>
                    <Button variant="outline" size="icon">
                      <BookmarkPlus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Schemes by Category */}
      <section id="categories" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.schemesByCategory}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.categoryDescription}</p>
          </div>

          <Tabs defaultValue="irrigation" className="animate-fade-in-up">
            <TabsList className="grid w-full grid-cols-6 mb-8">
              <TabsTrigger value="irrigation" className="flex items-center gap-2">
                <Droplets className="h-4 w-4" />
                {t.irrigation}
              </TabsTrigger>
              <TabsTrigger value="insurance" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                {t.insurance}
              </TabsTrigger>
              <TabsTrigger value="subsidy" className="flex items-center gap-2">
                <Tractor className="h-4 w-4" />
                {t.subsidy}
              </TabsTrigger>
              <TabsTrigger value="loans" className="flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                {t.loans}
              </TabsTrigger>
              <TabsTrigger value="organic" className="flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                {t.organic}
              </TabsTrigger>
              <TabsTrigger value="logistics" className="flex items-center gap-2">
                <Warehouse className="h-4 w-4" />
                {t.logistics}
              </TabsTrigger>
            </TabsList>

            {Object.entries(schemeCategories).map(([category, schemes]) => (
              <TabsContent key={category} value={category}>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {schemes.map((scheme, index) => (
                    <Card key={index} className="hover-tilt hover:border-[#a1cc33] transition-all duration-300">
                      <CardHeader>
                        <CardTitle className="text-lg">{scheme.name}</CardTitle>
                        <CardDescription>{scheme.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Badge variant="secondary" className="mb-4 bg-[#F9FB80] text-black">
                          {scheme.benefits}
                        </Badge>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-[#369042] hover:bg-[#369042]/90"
                            onClick={() => window.open(scheme.applyLink, "_blank")}
                          >
                            {t.applyNow}
                          </Button>
                          <Button variant="outline" size="sm">
                            <BookmarkPlus className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* MSP & Direct Benefits */}
      <section id="msp" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.mspRates}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.mspDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Current MSP Rates (2023-24)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="msp-rates">
                    <AccordionTrigger className="hover:text-primary">View MSP Rates for Major Crops</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        {mspCrops.map((crop, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                            <span className="font-medium">{crop.crop}</span>
                            <Badge variant="outline" className="bg-accent text-accent-foreground">
                              {crop.rate}
                            </Badge>
                          </div>
                        ))}
                      </div>
                      <Button className="w-full mt-4 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Download Full MSP List
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Direct Benefit Transfer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">PM-KISAN Scheme</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    ₹6,000 per year direct income support for small and marginal farmers
                  </p>
                  <Button size="sm" className="w-full">
                    Check Beneficiary Status
                  </Button>
                </div>
                <div className="p-4 bg-gradient-to-r from-accent/10 to-primary/10 rounded-lg">
                  <h4 className="font-semibold mb-2">PM Fasal Bima Yojana</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Comprehensive crop insurance with premium subsidy
                  </p>
                  <Button size="sm" variant="outline" className="w-full bg-transparent">
                    Apply for Insurance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Subsidy Calculator */}
      <section id="calculator" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.subsidyCalculator}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.calculatorDescription}</p>
          </div>

          <Card className="max-w-2xl mx-auto animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5 text-primary" />
                Calculate Your Subsidy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <Select value={cropType} onValueChange={setCropType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select crop type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Rice">Rice</SelectItem>
                      <SelectItem value="Wheat">Wheat</SelectItem>
                      <SelectItem value="Cotton">Cotton</SelectItem>
                      <SelectItem value="Sugarcane">Sugarcane</SelectItem>
                      <SelectItem value="Maize">Maize</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="acreage">Acreage (in acres)</Label>
                  <Input
                    id="acreage"
                    type="number"
                    placeholder="Enter acreage"
                    value={acreage}
                    onChange={(e) => setAcreage(e.target.value)}
                  />
                </div>
              </div>

              <Button onClick={calculateSubsidy} className="w-full animate-glow">
                {t.calculateSubsidy}
              </Button>

              {subsidyAmount > 0 && (
                <div className="p-6 bg-gradient-to-r from-accent/20 to-primary/20 rounded-lg text-center animate-fade-in-up">
                  <h3 className="text-2xl font-bold text-primary mb-2">
                    {t.estimatedSubsidy}: ₹{subsidyAmount.toLocaleString()}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    This is an approximate calculation. Actual subsidy may vary.
                  </p>
                  <Button variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    {t.downloadEstimate}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.successStories}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.successDescription}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {successStories.map((story, index) => (
              <Card
                key={index}
                className="hover-tilt text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader>
                  <img
                    src={story.image || "/placeholder.svg"}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <CardTitle className="text-lg">{story.name}</CardTitle>
                  <CardDescription>{story.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4 italic">"{story.story}"</p>
                  <Button variant="outline" size="sm">
                    {t.readFullStory}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Help & Assistance */}
      <section id="help" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4">{t.helpAssistance}</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">{t.helpDescription}</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  <AccordionItem value="faq-1">
                    <AccordionTrigger>How do I apply for PM-KISAN scheme?</AccordionTrigger>
                    <AccordionContent>
                      You can apply for PM-KISAN scheme online through the official portal or visit your nearest Common
                      Service Center (CSC) with required documents including Aadhaar card, bank account details, and
                      land records.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-2">
                    <AccordionTrigger>What documents are required for crop insurance?</AccordionTrigger>
                    <AccordionContent>
                      For crop insurance, you need Aadhaar card, bank account details, land ownership documents, sowing
                      certificate from village revenue officer, and previous year's insurance policy (if any).
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="faq-3">
                    <AccordionTrigger>How can I check my subsidy status?</AccordionTrigger>
                    <AccordionContent>
                      You can check your subsidy status online through the respective scheme portals using your
                      application number or Aadhaar number. You can also contact the helpline numbers provided.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card className="animate-fade-in-up">
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Button className="flex items-center gap-2 h-auto p-4 flex-col">
                    <Phone className="h-6 w-6" />
                    <span className="text-sm">{t.callHelpline}</span>
                    <span className="text-xs text-muted-foreground">1800-180-1551</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-auto p-4 flex-col bg-transparent">
                    <MessageCircle className="h-6 w-6" />
                    <span className="text-sm">{t.whatsapp}</span>
                    <span className="text-xs text-muted-foreground">Chat Support</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-auto p-4 flex-col bg-transparent">
                    <Mail className="h-6 w-6" />
                    <span className="text-sm">{t.email}</span>
                    <span className="text-xs text-muted-foreground">support@gov.in</span>
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 h-auto p-4 flex-col bg-transparent">
                    <MapPin className="h-6 w-6" />
                    <span className="text-sm">{t.nearestCenter}</span>
                    <span className="text-xs text-muted-foreground">Find Location</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#369042] text-white py-8 animate-fade-in-up">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-semibold mb-4">{t.quickLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="https://www.india.gov.in/topics/agriculture"
                    className="hover:text-[#ffca53] transition-colors"
                  >
                    All Schemes
                  </a>
                </li>
                <li>
                  <a
                    href="https://pmkisan.gov.in/BeneficiaryStatus.aspx"
                    className="hover:text-[#ffca53] transition-colors"
                  >
                    Application Status
                  </a>
                </li>
                <li>
                  <a href="https://www.india.gov.in/" className="hover:text-[#ffca53] transition-colors">
                    Document Upload
                  </a>
                </li>
                <li>
                  <a href="https://pgportal.gov.in/" className="hover:text-[#ffca53] transition-colors">
                    Grievance Portal
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.governmentLinks}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://agricoop.nic.in/" className="hover:text-[#ffca53] transition-colors">
                    Ministry of Agriculture
                  </a>
                </li>
                <li>
                  <a href="https://pmkisan.gov.in/" className="hover:text-[#ffca53] transition-colors">
                    PM-KISAN Portal
                  </a>
                </li>
                <li>
                  <a href="https://pmfby.gov.in/" className="hover:text-[#ffca53] transition-colors">
                    Crop Insurance Portal
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.india.gov.in/spotlight/kisan-credit-card-kcc-scheme"
                    className="hover:text-[#ffca53] transition-colors"
                  >
                    Kisan Credit Card
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.support}</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="https://www.india.gov.in/help" className="hover:text-[#ffca53] transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#help" className="hover:text-[#ffca53] transition-colors">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="https://www.india.gov.in/contact-us" className="hover:text-[#ffca53] transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="https://pgportal.gov.in/" className="hover:text-[#ffca53] transition-colors">
                    Feedback
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">{t.connectWithUs}</h3>
              <div className="flex gap-4">
                <Button size="icon" variant="secondary" onClick={() => window.open("tel:1800-180-1551")}>
                  <Phone className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => window.open("https://wa.me/918800180111")}>
                  <MessageCircle className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="secondary" onClick={() => window.open("mailto:support@pmkisan.gov.in")}>
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
