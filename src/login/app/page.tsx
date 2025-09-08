"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe, Wheat, Mail, Phone, User, Key, Eye, EyeOff, Home } from "lucide-react"

const indianLanguages = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिन्दी (Hindi)" },
  { code: "bn", name: "বাংলা (Bengali)" },
  { code: "te", name: "తెలుగు (Telugu)" },
  { code: "mr", name: "मराठी (Marathi)" },
  { code: "ta", name: "தமிழ் (Tamil)" },
  { code: "gu", name: "ગુજરાતી (Gujarati)" },
  { code: "ur", name: "اردو (Urdu)" },
  { code: "kn", name: "ಕನ್ನಡ (Kannada)" },
  { code: "ml", name: "മലയാളം (Malayalam)" },
  { code: "or", name: "ଓଡ଼ିଆ (Odia)" },
  { code: "pa", name: "ਪੰਜਾਬੀ (Punjabi)" },
  { code: "as", name: "অসমীয়া (Assamese)" },
  { code: "mai", name: "मैथिली (Maithili)" },
  { code: "sa", name: "संस्कृत (Sanskrit)" },
  { code: "ne", name: "नेपाली (Nepali)" },
  { code: "ks", name: "कश्मीरी (Kashmiri)" },
  { code: "sd", name: "سنڌي (Sindhi)" },
  { code: "doi", name: "डोगरी (Dogri)" },
  { code: "mni", name: "মৈতৈলোন্ (Manipuri)" },
  { code: "kok", name: "कोंकणी (Konkani)" },
  { code: "sat", name: "ᱥᱟᱱᱛᱟᱲᱤ (Santali)" },
  { code: "bo", name: "བོད་སྐད (Tibetan)" },
  { code: "brx", name: "बड़ो (Bodo)" },
  { code: "mz", name: "Mizo" },
  { code: "kha", name: "Khasi" },
  { code: "grt", name: "Garo" },
  { code: "lus", name: "Lushai" },
]

const translations = {
  en: {
    title: "Farm Sarathi",
    loginTitle: "Login To Your Account",
    username: "Username",
    usernameTab: "Username",
    mobileTab: "Mobile OTP",
    usernameOrEmail: "Username Or Email",
    enterUsername: "Enter Your Username Or Email",
    password: "Password",
    enterPassword: "Enter Your Password",
    enterCaptcha: "Enter Captcha",
    mobileNumber: "Mobile Number",
    sendOtp: "Send OTP",
    otpSent: "OTP Sent ✓",
    enterOtp: "Enter OTP",
    enterOtpPlaceholder: "Enter 6-Digit OTP",
    continueWithGoogle: "Continue With Google",
    login: "Login",
    forgotPassword: "Forgot Password",
    dontHaveAccount: "Don't Have An Account?",
    signUpHere: "Sign Up Here",
    backToHome: "Back To Home",
  },
  hi: {
    title: "फार्म सारथी",
    loginTitle: "अपने खाते में लॉगिन करें",
    username: "उपयोगकर्ता नाम",
    usernameTab: "उपयोगकर्ता नाम",
    mobileTab: "मोबाइल OTP",
    usernameOrEmail: "उपयोगकर्ता नाम या ईमेल",
    enterUsername: "अपना उपयोगकर्ता नाम या ईमेल दर्ज करें",
    password: "पासवर्ड",
    enterPassword: "अपना पासवर्ड दर्ज करें",
    enterCaptcha: "कैप्चा दर्ज करें",
    mobileNumber: "मोबाइल नंबर",
    sendOtp: "OTP भेजें",
    otpSent: "OTP भेजा गया ✓",
    enterOtp: "OTP दर्ज करें",
    enterOtpPlaceholder: "6-अंकीय OTP दर्ज करें",
    continueWithGoogle: "Google के साथ जारी रखें",
    login: "लॉगिन",
    forgotPassword: "पासवर्ड भूल गए",
    dontHaveAccount: "खाता नहीं है?",
    signUpHere: "यहाँ साइन अप करें",
    backToHome: "होम पर वापस जाएं",
  },
}

export default function LoginPage() {
  const [selectedLanguage, setSelectedLanguage] = useState("en")
  const [otpSent, setOtpSent] = useState(false)
  const [usernameCaptcha, setUsernameCaptcha] = useState("")
  const [mobileCaptcha, setMobileCaptcha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [mobile, setMobile] = useState("")
  const [otp, setOtp] = useState("")

  const t = (key: string) => {
    return (
      translations[selectedLanguage as keyof typeof translations]?.[key as keyof typeof translations.en] ||
      translations.en[key as keyof typeof translations.en]
    )
  }

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    console.log("[v0] Language changed to:", language)
  }

  const handleUsernameCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsernameCaptcha(e.target.value)
  }

  const handleMobileCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMobileCaptcha(e.target.value)
  }

  const handleSendOtp = () => {
    if (mobile) {
      setOtpSent(true)
      console.log("[v0] OTP sent to:", mobile)
    }
  }

  const handleLogin = () => {
    console.log("[v0] Login attempt with:", { username, password, usernameCaptcha })
    window.location.href = "/dashboard"
  }

  const handleMobileLogin = () => {
    console.log("[v0] Mobile login attempt with:", { mobile, otp, mobileCaptcha })
    window.location.href = "/dashboard"
  }

  const handleGoogleLogin = () => {
    console.log("[v0] Google login initiated")
    // Add Google OAuth logic here
  }

  const handleBackToHome = () => {
    console.log("[v0] Navigating back to home")
    // Add navigation logic here
    window.location.href = "/"
  }

  const handleSignUp = () => {
    console.log("[v0] Navigating to sign up")
    // Add navigation to sign up page
    window.location.href = "/signup"
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/agricultural-background.jpg')`,
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-br from-[#369042]/80 via-[#a1cc33]/40 to-[#ffca53]/60" />
      <div className="absolute inset-0 bg-gradient-to-tl from-[#F9FB90]/30 via-transparent to-[#369042]/50" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute top-6 left-6 z-20 flex flex-col space-y-4">
        <Select value={selectedLanguage} onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-52 bg-card/90 backdrop-blur-xl border-border/40 text-card-foreground shadow-lg hover:bg-card/95 transition-all duration-300">
            <Globe className="w-6 h-6 mr-2 text-primary" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-card/95 backdrop-blur-xl border-border/40 shadow-xl max-h-60 overflow-y-auto">
            {indianLanguages.map((lang) => (
              <SelectItem
                key={lang.code}
                value={lang.code}
                className="text-card-foreground hover:bg-primary/10 focus:bg-primary/10"
              >
                {lang.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          onClick={handleBackToHome}
          variant="outline"
          className="w-52 bg-card/90 backdrop-blur-xl border-border/40 text-card-foreground shadow-lg hover:bg-card/95 transition-all duration-300 justify-start"
        >
          <Home className="w-6 h-6 mr-2 text-primary" />
          {t("backToHome")}
        </Button>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md bg-card/85 backdrop-blur-xl border-border/40 shadow-2xl animate-fade-in">
          <CardHeader className="text-center space-y-4 pb-6">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="p-2 rounded-full bg-primary/10 animate-pulse-glow">
                <Wheat className="w-8 h-8 text-primary" />
              </div>
              <h1 className="text-2xl font-bold text-card-foreground bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {t("title")}
              </h1>
            </div>
            <CardTitle className="text-xl text-card-foreground font-semibold">{t("loginTitle")}</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <Tabs defaultValue="username" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 bg-muted/60 backdrop-blur-sm p-1 rounded-lg">
                <TabsTrigger
                  value="username"
                  className="text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Mail className="w-3 h-3 mr-1" />
                  {t("usernameTab")}
                </TabsTrigger>
                <TabsTrigger
                  value="mobile"
                  className="text-xs font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300"
                >
                  <Phone className="w-3 h-3 mr-1" />
                  {t("mobileTab")}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="username" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-card-foreground font-medium">
                    {t("usernameOrEmail")}
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#369042] rounded-sm flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <Input
                      id="username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={t("enterUsername")}
                      className="bg-input/95 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300 pl-12"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-card-foreground font-medium">
                    {t("password")}
                  </Label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-[#369042] rounded-sm flex items-center justify-center">
                      <Key className="w-4 h-4 text-white" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={t("enterPassword")}
                      className="bg-input/95 border-border/50 text-card-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300 pl-12 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="captcha-input" className="text-card-foreground font-medium">
                    {t("enterCaptcha")}
                  </Label>
                  <div className="flex space-x-3">
                    <div className="flex-1 bg-[#ffca53] border border-border/50 rounded-md p-3 text-center font-mono text-lg font-bold text-black tracking-wider">
                      7K9M3
                    </div>
                    <Input
                      id="captcha-input"
                      type="text"
                      placeholder={t("enterCaptcha")}
                      maxLength={5}
                      value={usernameCaptcha}
                      onChange={handleUsernameCaptchaChange}
                      className="flex-1 bg-input/95 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300 text-center font-mono tracking-wider"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="mobile" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-card-foreground font-medium">
                    {t("mobileNumber")}
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="bg-input/95 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300"
                  />
                </div>
                <Button
                  onClick={handleSendOtp}
                  variant="outline"
                  className="w-full bg-secondary/20 border-secondary/50 text-secondary-foreground hover:bg-secondary/30 hover:border-secondary transition-all duration-300"
                  disabled={otpSent || !mobile}
                >
                  {otpSent ? t("otpSent") : t("sendOtp")}
                </Button>
                {otpSent && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="otp" className="text-card-foreground font-medium">
                      {t("enterOtp")}
                    </Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      placeholder={t("enterOtpPlaceholder")}
                      maxLength={6}
                      className="bg-input/95 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300 text-center text-lg tracking-widest"
                    />
                  </div>
                )}
                {otpSent && (
                  <div className="space-y-2 animate-fade-in">
                    <Label htmlFor="mobile-captcha-input" className="text-card-foreground font-medium">
                      {t("enterCaptcha")}
                    </Label>
                    <div className="flex space-x-3">
                      <div className="flex-1 bg-[#ffca53] border border-border/50 rounded-md p-3 text-center font-mono text-lg font-bold text-black tracking-wider">
                        7K9M3
                      </div>
                      <Input
                        id="mobile-captcha-input"
                        type="text"
                        placeholder={t("enterCaptcha")}
                        maxLength={5}
                        value={mobileCaptcha}
                        onChange={handleMobileCaptchaChange}
                        className="flex-1 bg-input/95 border-border/50 text-card-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20 transition-all duration-300 text-center font-mono tracking-wider"
                      />
                    </div>
                  </div>
                )}
              </TabsContent>
            </Tabs>

            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border/40" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or</span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                className="w-full bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                {t("continueWithGoogle")}
              </Button>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl font-semibold py-3"
            >
              {t("login")}
            </Button>

            <div className="text-center space-y-2">
              <a
                href="#"
                className="text-sm text-red-600 hover:text-red-500 transition-colors duration-300 font-medium hover:underline"
              >
                {t("forgotPassword")}
              </a>
              <p className="text-sm text-muted-foreground">
                {t("dontHaveAccount")}{" "}
                <a
                  href="#"
                  onClick={handleSignUp}
                  className="text-primary hover:text-primary/80 transition-colors duration-300 font-medium hover:underline"
                >
                  {t("signUpHere")}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
