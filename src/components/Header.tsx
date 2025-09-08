import { useState } from "react";
import { LanguageSelector } from "./LanguageSelector";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  selectedLanguage: string;
  onLanguageChange: (languageCode: string) => void;
}

const navigationItems = [
  { key: 'about', en: 'About Us', hi: 'हमारे बारे में' },
  { key: 'vision', en: 'Our Vision', hi: 'हमारा विज़न' },
  { key: 'mission', en: 'Our Mission', hi: 'हमारा मिशन' },
  { key: 'impact', en: 'Impact', hi: 'प्रभाव' },
];

export function Header({ selectedLanguage, onLanguageChange }: HeaderProps) {
  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const getText = (key: string) => {
    const item = navigationItems.find(item => item.key === key);
    return item ? item[selectedLanguage as keyof typeof item] || item.en : '';
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with Globe */}
          <div className="flex items-center gap-4">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
            />
            <div className="text-xl font-bold text-primary">
              {selectedLanguage === 'hi' ? 'कृषि सलाहकार' : 'AgriAdvisor'}
            </div>
          </div>

          {/* Navigation + Login */}
          <div className="hidden md:flex items-center gap-4 mr-4">
            <nav className="flex items-center gap-6">
              {navigationItems.map((item) => (
                <Button
                  key={item.key}
                  variant="ghost"
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => scrollToSection(item.key)}
                >
                  {getText(item.key)}
                </Button>
              ))}
            </nav>
            <Button asChild>
              <a href="/login">{selectedLanguage === 'hi' ? 'लॉगिन' : 'Login'}</a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}