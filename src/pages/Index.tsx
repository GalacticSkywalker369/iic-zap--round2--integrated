import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { FloatingBubbles } from "@/components/FloatingBubbles";
import { FeatureSection } from "@/components/FeatureSection";
import { VisionMissionSection } from "@/components/VisionMissionSection";
import { ActionBlocks } from "@/components/ActionBlocks";
import { TestimonialSection } from "@/components/TestimonialSection";
import { SustainableGoals } from "@/components/SustainableGoals";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  // Add scroll animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Observe all fade-in-up elements
    const elements = document.querySelectorAll('.fade-in-up');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleLanguageChange = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <Header 
        selectedLanguage={selectedLanguage}
        onLanguageChange={handleLanguageChange}
      />

      {/* Hero Section */}
      <HeroSection selectedLanguage={selectedLanguage} />

      {/* Floating Action Bubbles */}
      <FloatingBubbles selectedLanguage={selectedLanguage} />

      {/* Features Section */}
      <FeatureSection selectedLanguage={selectedLanguage} />

      {/* Vision, Mission, About & Impact */}
      <VisionMissionSection selectedLanguage={selectedLanguage} />

      {/* Action Blocks - Ask, Learn, Grow, Thrive */}
      <ActionBlocks selectedLanguage={selectedLanguage} />

      {/* Testimonials & Salient Features */}
      <TestimonialSection selectedLanguage={selectedLanguage} />

      {/* Sustainable Goals & Important Links */}
      <SustainableGoals selectedLanguage={selectedLanguage} />

      {/* Footer */}
      <Footer selectedLanguage={selectedLanguage} />
    </div>
  );
};

export default Index;
