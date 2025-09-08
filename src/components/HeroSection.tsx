import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import heroBackground from "@/assets/hero-agriculture-bg.jpg";

interface HeroSectionProps {
  selectedLanguage: string;
}

export function HeroSection({ selectedLanguage }: HeroSectionProps) {
  const getHeroText = () => {
    switch (selectedLanguage) {
      case 'hi':
        return {
          title: 'कृषि सलाहकार',
          subtitle: 'आधुनिक तकनीक के साथ खेती',
          description: 'AI-आधारित सलाह और विशेषज्ञ मार्गदर्शन के साथ अपनी फसल की पैदावार बढ़ाएं',
          cta: 'शुरू करें'
        };
      default:
        return {
          title: 'FarmAssist',
          subtitle: 'Empowering Farmers with Technology',
          description: 'Get AI-powered insights and expert guidance to maximize your crop yields',
          cta: 'Get Started'
        };
    }
  };

  const heroText = getHeroText();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 gradient-text animate-fade-in-up">
          {heroText.title}
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4 opacity-90">
          {heroText.subtitle}
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-80 max-w-2xl mx-auto">
          {heroText.description}
        </p>
        <Button 
          size="lg" 
          className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-4 text-lg font-semibold"
        >
          {heroText.cta}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <ArrowDown className="h-6 w-6" />
      </div>
    </section>
  );
}