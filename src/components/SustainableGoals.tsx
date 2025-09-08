import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import sdgWheel from "@/assets/sdg-wheel.jpg";

interface SustainableGoalsProps {
  selectedLanguage: string;
}

export function SustainableGoals({ selectedLanguage }: SustainableGoalsProps) {
  const [currentLinkIndex, setCurrentLinkIndex] = useState(0);

  const getLinks = () => {
    switch (selectedLanguage) {
      case 'hi':
        return [
          { name: 'राष्ट्रीय खाद्य सुरक्षा मिशन', code: 'NFSM', url: '#' },
          { name: 'प्रधानमंत्री फसल बीमा योजना', code: 'PMFBY', url: '#' },
          { name: 'मृदा स्वास्थ्य कार्ड', code: 'SHC', url: '#' },
          { name: 'राष्ट्रीय बागवानी बोर्ड', code: 'NHB', url: '#' },
          { name: 'कृषि अवसंरचना फंड', code: 'AIF', url: '#' },
          { name: 'मूल्य निगरानी प्रभाग', code: 'PDMC', url: '#' }
        ];
      default:
        return [
          { name: 'National Food Security Mission', code: 'NFSM', url: '#' },
          { name: 'Pradhan Mantri Fasal Bima Yojana', code: 'PMFBY', url: '#' },
          { name: 'Soil Health Card', code: 'SHC', url: '#' },
          { name: 'National Horticulture Board', code: 'NHB', url: '#' },
          { name: 'Agriculture Infrastructure Fund', code: 'AIF', url: '#' },
          { name: 'Price Monitoring Division', code: 'PDMC', url: '#' }
        ];
    }
  };

  const links = getLinks();

  // Auto-scroll links
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLinkIndex((prev) => (prev + 1) % links.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [links.length]);

  const scrollToNext = () => {
    setCurrentLinkIndex((prev) => (prev + 1) % links.length);
  };

  const scrollToPrev = () => {
    setCurrentLinkIndex((prev) => (prev - 1 + links.length) % links.length);
  };

  return (
    <section className="py-32 bg-gradient-to-b from-nature-green/30 to-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8">
            {selectedLanguage === 'hi' ? 'सतत विकास लक्ष्य' : 'Sustainable Development Goals'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {selectedLanguage === 'hi' 
              ? 'विश्व खाद्य मंच और सतत विकास लक्ष्यों के साथ मिलकर कृषि क्षेत्र में सुधार लाना हमारा मिशन है' 
              : 'Our mission is to collaborate with World Food Forum and SDGs to transform the agricultural sector'
            }
          </p>
        </div>

        {/* SDG Block with Image */}
        <Card className="relative overflow-hidden mb-16 hover-lift group h-96">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${sdgWheel})` }}
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-forest-green/70 to-golden-yellow/70" />
          
          {/* Glass morphism effect */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
          
          <div className="relative p-12 text-center h-full flex flex-col justify-center">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
              {selectedLanguage === 'hi' ? 'विश्व खाद्य मंच 2024' : 'World Food Forum 2024'}
            </h3>
            <p className="text-white/90 text-xl mb-8 max-w-3xl mx-auto drop-shadow-md">
              {selectedLanguage === 'hi' 
                ? 'SDG 2: भूख समाप्त करना, खाद्य सुरक्षा प्राप्त करना और पोषण में सुधार' 
                : 'SDG 2: End hunger, achieve food security and improved nutrition'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                <span className="text-white font-medium text-lg drop-shadow-sm">Zero Hunger</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                <span className="text-white font-medium text-lg drop-shadow-sm">Climate Action</span>
              </div>
              <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full border border-white/30 hover:bg-white/30 transition-all duration-300">
                <span className="text-white font-medium text-lg drop-shadow-sm">Sustainable Agriculture</span>
              </div>
            </div>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
        </Card>

        {/* Important Links with Scrolling */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold gradient-text mb-8">
            {selectedLanguage === 'hi' ? 'महत्वपूर्ण लिंक्स' : 'Important Links'}
          </h3>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <Button
            onClick={scrollToPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 bg-gradient-to-r from-golden-yellow to-sunshine-yellow hover:from-honey-yellow hover:to-bright-yellow shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={scrollToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full w-12 h-12 bg-gradient-to-r from-golden-yellow to-sunshine-yellow hover:from-honey-yellow hover:to-bright-yellow shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Links Container */}
          <div className="overflow-hidden mx-16">
            <div 
              className="flex transition-transform duration-500 ease-out gap-4"
              style={{ 
                transform: `translateX(-${currentLinkIndex * (100 / Math.min(links.length, 4))}%)`,
                width: `${Math.max(100, (links.length / 4) * 100)}%`
              }}
            >
              {links.map((link, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`h-auto p-6 flex flex-col items-center gap-3 transition-all duration-500 border-2 hover-lift min-w-0 flex-1 ${
                    index === currentLinkIndex 
                      ? 'bg-gradient-to-br from-lime-green/20 to-golden-yellow/20 border-golden-yellow shadow-xl scale-105' 
                      : 'hover:bg-gradient-to-br hover:from-emerald-green/10 hover:to-honey-yellow/10 hover:border-lime-green'
                  }`}
                  onClick={() => window.open(link.url, '_blank')}
                >
                  <span className="font-bold text-primary text-2xl">{link.code}</span>
                  <span className="text-sm text-center text-muted-foreground leading-tight font-medium">
                    {link.name}
                  </span>
                  <ExternalLink className="h-4 w-4 opacity-70" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}