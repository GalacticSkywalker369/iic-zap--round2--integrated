import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

interface FooterProps {
  selectedLanguage: string;
}

export function Footer({ selectedLanguage }: FooterProps) {
  const [currentUpdate, setCurrentUpdate] = useState(0);

  const getContent = () => {
    switch (selectedLanguage) {
      case 'hi':
        return {
          howItWorks: 'यह कैसे काम करता है',
          latestUpdates: 'नवीनतम अपडेट',
          updates: [
            'नई AI-आधारित मिट्टी परीक्षण सुविधा लॉन्च',
            'मानसून पूर्वानुमान सिस्टम अपडेट किया गया',
            'क्षेत्रीय भाषा समर्थन में सुधार',
            'नया मोबाइल ऐप बीटा संस्करण उपलब्ध'
          ],
          links: {
            aboutUs: 'हमारे बारे में',
            faqs: 'पूछे जाने वाले प्रश्न',
            help: 'मदद',
            contactUs: 'संपर्क करें',
            impact: 'प्रभाव',
            vision: 'विज़न',
            mission: 'मिशन',
            privacy: 'गोपनीयता नीति',
            terms: 'नियम और शर्तें'
          }
        };
      default:
        return {
          howItWorks: 'How It Works',
          latestUpdates: 'Latest Updates',
          updates: [
            'New AI-powered soil testing feature launched',
            'Monsoon prediction system updated',
            'Improved regional language support',
            'New mobile app beta version available'
          ],
          links: {
            aboutUs: 'About Us',
            faqs: 'FAQs',
            help: 'Help',
            contactUs: 'Contact Us',
            impact: 'Impact',
            vision: 'Vision',
            mission: 'Mission',
            privacy: 'Privacy Policy',
            terms: 'Terms & Conditions'
          }
        };
    }
  };

  const content = getContent();

  // Auto-scroll updates
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % content.updates.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [content.updates.length]);

  return (
    <footer className="bg-gradient-to-t from-forest-green/10 via-golden-yellow/5 to-background py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime-green/5 to-sunshine-yellow/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-golden-yellow via-lime-green to-emerald-green" />
      
      <div className="container mx-auto px-6 relative">
        {/* How It Works Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <Card className="relative overflow-hidden group hover-lift">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-green/20 to-golden-yellow/20 group-hover:from-lime-green/30 group-hover:to-sunshine-yellow/30 transition-all duration-500" />
            
            <div className="relative p-10 text-center">
              <h3 className="text-3xl font-bold gradient-text mb-8">
                {content.howItWorks}
              </h3>
              <div className="relative bg-gradient-to-br from-forest-green/10 to-honey-yellow/10 rounded-2xl overflow-hidden aspect-video mb-6 border-2 border-golden-yellow/20 hover:border-lime-green/40 transition-colors duration-300">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-transparent to-black/10">
                  <Button 
                    size="lg" 
                    className="rounded-full bg-gradient-to-r from-golden-yellow to-sunshine-yellow hover:from-honey-yellow hover:to-bright-yellow text-black font-bold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      // TODO: Play embedded video
                      console.log('Playing how it works video');
                    }}
                  >
                    <Play className="h-6 w-6 mr-2" />
                    {selectedLanguage === 'hi' ? 'वीडियो देखें' : 'Watch Video'}
                  </Button>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                {selectedLanguage === 'hi' 
                  ? 'जानें कि कैसे हमारा प्लेटफॉर्म आपकी कृषि यात्रा को आसान बनाता है'
                  : 'Learn how our platform simplifies your agricultural journey'
                }
              </p>
            </div>
          </Card>

          <Card className="relative overflow-hidden group hover-lift">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime-green/20 to-honey-yellow/20 group-hover:from-emerald-green/30 group-hover:to-golden-yellow/30 transition-all duration-500" />
            
            <div className="relative p-10">
              <h3 className="text-3xl font-bold gradient-text mb-8 text-center">
                {content.latestUpdates}
              </h3>
              <div className="space-y-4 h-48 overflow-hidden">
                {content.updates.map((update, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-700 transform border ${
                      index === currentUpdate 
                        ? 'bg-gradient-to-r from-golden-yellow/20 to-lime-green/20 translate-x-0 opacity-100 border-sunshine-yellow/30 shadow-lg scale-105' 
                        : 'translate-x-6 opacity-70 border-transparent hover:opacity-90 hover:translate-x-2'
                    }`}
                  >
                    <ArrowRight className={`h-5 w-5 flex-shrink-0 transition-colors duration-300 ${
                      index === currentUpdate ? 'text-forest-green' : 'text-primary'
                    }`} />
                    <span className={`text-sm font-medium transition-colors duration-300 ${
                      index === currentUpdate ? 'text-forest-green' : 'text-muted-foreground'
                    }`}>{update}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Footer Links */}
        <div className="border-t border-gradient-to-r from-golden-yellow/20 via-lime-green/20 to-emerald-green/20 pt-16">
          <div className="grid md:grid-cols-4 gap-10">
            <div className="group">
              <h4 className="font-bold text-2xl gradient-text mb-6">
                {selectedLanguage === 'hi' ? 'कंपनी' : 'Company'}
              </h4>
              <div className="space-y-3">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-golden-yellow transition-colors duration-300 hover:translate-x-2">
                  {content.links.aboutUs}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-lime-green transition-colors duration-300 hover:translate-x-2">
                  {content.links.vision}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-emerald-green transition-colors duration-300 hover:translate-x-2">
                  {content.links.mission}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-sunshine-yellow transition-colors duration-300 hover:translate-x-2">
                  {content.links.impact}
                </Button>
              </div>
            </div>

            <div className="group">
              <h4 className="font-bold text-2xl gradient-text mb-6">
                {selectedLanguage === 'hi' ? 'सहायता' : 'Support'}
              </h4>
              <div className="space-y-3">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-golden-yellow transition-colors duration-300 hover:translate-x-2">
                  {content.links.help}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-lime-green transition-colors duration-300 hover:translate-x-2">
                  {content.links.faqs}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-emerald-green transition-colors duration-300 hover:translate-x-2">
                  {content.links.contactUs}
                </Button>
              </div>
            </div>

            <div className="group">
              <h4 className="font-bold text-2xl gradient-text mb-6">
                {selectedLanguage === 'hi' ? 'कानूनी' : 'Legal'}
              </h4>
              <div className="space-y-3">
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-golden-yellow transition-colors duration-300 hover:translate-x-2">
                  {content.links.privacy}
                </Button>
                <Button variant="ghost" size="sm" className="justify-start p-0 h-auto text-lg hover:text-lime-green transition-colors duration-300 hover:translate-x-2">
                  {content.links.terms}
                </Button>
              </div>
            </div>

            <div className="group">
              <h4 className="font-bold text-2xl gradient-text mb-6">
                {selectedLanguage === 'hi' ? 'कृषि सलाहकार' : 'AgriAdvisor'}
              </h4>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {selectedLanguage === 'hi' 
                  ? 'तकनीक के साथ कृषि को सशक्त बनाना'
                  : 'Empowering agriculture with technology'
                }
              </p>
              <div className="bg-gradient-to-r from-golden-yellow/10 to-lime-green/10 p-4 rounded-lg border border-sunshine-yellow/20">
                <div className="text-sm font-medium">
                  © 2024 AgriAdvisor. {selectedLanguage === 'hi' ? 'सभी अधिकार सुरक्षित।' : 'All rights reserved.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}