import { useState } from "react";
import { Card } from "@/components/ui/card";
import { HelpCircle, BookOpen, TrendingUp, Target } from "lucide-react";
import askBg from "@/assets/ask-bg.jpg";
import learnBg from "@/assets/learn-bg.jpg";
import growBg from "@/assets/grow-bg.jpg";
import thriveBg from "@/assets/thrive-bg.jpg";

interface ActionBlocksProps {
  selectedLanguage: string;
}

export function ActionBlocks({ selectedLanguage }: ActionBlocksProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getBlocks = () => {
    switch (selectedLanguage) {
      case 'hi':
        return [
          {
            icon: HelpCircle,
            title: 'पूछें',
            description: 'अपनी कृषि संबंधी समस्याओं के लिए सवाल पूछें',
            color: 'from-golden-yellow to-sunshine-yellow',
            bgImage: askBg
          },
          {
            icon: BookOpen,
            title: 'सीखें',
            description: 'नई तकनीकों और बेहतर खेती के तरीकों को सीखें',
            color: 'from-lime-green to-emerald-green',
            bgImage: learnBg
          },
          {
            icon: TrendingUp,
            title: 'बढ़ें',
            description: 'अपनी फसल की पैदावार और गुणवत्ता में सुधार करें',
            color: 'from-forest-green to-nature-green',
            bgImage: growBg
          },
          {
            icon: Target,
            title: 'सफल हों',
            description: 'अपने कृषि लक्ष्यों को प्राप्त करें और समृद्ध बनें',
            color: 'from-honey-yellow to-bright-yellow',
            bgImage: thriveBg
          }
        ];
      default:
        return [
          {
            icon: HelpCircle,
            title: 'Ask',
            description: 'Get answers to your agricultural queries and challenges',
            color: 'from-golden-yellow to-sunshine-yellow',
            bgImage: askBg
          },
          {
            icon: BookOpen,
            title: 'Learn',
            description: 'Discover new techniques and best farming practices',
            color: 'from-lime-green to-emerald-green',
            bgImage: learnBg
          },
          {
            icon: TrendingUp,
            title: 'Grow',
            description: 'Improve your crop yield and quality with expert guidance',
            color: 'from-forest-green to-nature-green',
            bgImage: growBg
          },
          {
            icon: Target,
            title: 'Thrive',
            description: 'Achieve your agricultural goals and build prosperity',
            color: 'from-honey-yellow to-bright-yellow',
            bgImage: thriveBg
          }
        ];
    }
  };

  const blocks = getBlocks();

  return (
    <section className="py-32 bg-gradient-to-b from-secondary/20 to-background relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-8">
            {selectedLanguage === 'hi' ? 'आपकी कृषि यात्रा' : 'Your Agricultural Journey'}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {selectedLanguage === 'hi' 
              ? 'हमारे साथ अपनी कृषि यात्रा को नई ऊंचाइयों पर ले जाएं' 
              : 'Transform your agricultural journey with our comprehensive support system'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blocks.map((block, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden transition-all duration-700 cursor-pointer transform group h-80 ${
                hoveredIndex === index ? '-translate-y-6 scale-105 shadow-2xl' : 'shadow-xl hover:-translate-y-3'
              }`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: `url(${block.bgImage})` }}
              />
              
              {/* Gradient Overlay */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br ${block.color} opacity-70 transition-opacity duration-500 ${
                  hoveredIndex === index ? 'opacity-85' : ''
                }`}
              />
              
              {/* Glass morphism effect */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
              
              <div className="relative p-8 text-center h-full flex flex-col justify-center">
                <div className={`inline-flex p-6 rounded-full mb-6 bg-white/20 backdrop-blur-md mx-auto transition-all duration-500 ${
                  hoveredIndex === index ? 'animate-pulse-glow scale-110' : ''
                }`}>
                  <block.icon className="h-12 w-12 text-white drop-shadow-lg" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                  {block.title}
                </h3>
                <p className="text-white/90 text-lg leading-relaxed drop-shadow-md">
                  {block.description}
                </p>
              </div>
              
              {/* Shine effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full transition-transform duration-700 ${
                hoveredIndex === index ? '-translate-x-full' : ''
              }`} />
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}