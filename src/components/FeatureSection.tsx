import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Bot, Users, Clock, Sprout } from "lucide-react";

interface FeatureSectionProps {
  selectedLanguage: string;
}

export function FeatureSection({ selectedLanguage }: FeatureSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const getFeatures = () => {
    switch (selectedLanguage) {
      case 'hi':
        return [
          {
            icon: Bot,
            title: 'AI सहायता',
            description: 'आर्टिफिशियल इंटेलिजेंस के साथ व्यक्तिगत खेती की सलाह प्राप्त करें'
          },
          {
            icon: Users,
            title: 'विशेषज्ञ सलाह',
            description: 'अनुभवी कृषि विशेषज्ञों से सीधी सलाह लें'
          },
          {
            icon: Clock,
            title: 'सही समय पर सलाह',
            description: 'फसल के चक्र के अनुसार सही समय पर मार्गदर्शन प्राप्त करें'
          },
          {
            icon: Sprout,
            title: 'कृषि प्रबंधन',
            description: 'अपनी कृषि गतिविधियों को बेहतर तरीके से व्यवस्थित करें'
          }
        ];
      default:
        return [
          {
            icon: Bot,
            title: 'AI Assistance',
            description: 'Get personalized farming advice powered by artificial intelligence'
          },
          {
            icon: Users,
            title: 'Expert Advisory',
            description: 'Connect directly with experienced agricultural experts'
          },
          {
            icon: Clock,
            title: 'Right Time Guidance',
            description: 'Receive timely guidance based on crop cycles and seasons'
          },
          {
            icon: Sprout,
            title: 'Manage Agriculture',
            description: 'Organize and optimize your agricultural activities effectively'
          }
        ];
    }
  };

  const features = getFeatures();

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {selectedLanguage === 'hi' ? 'हमारी विशेषताएं' : 'Our Features'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {selectedLanguage === 'hi' 
              ? 'आधुनिक तकनीक और पारंपरिक ज्ञान का संयोजन' 
              : 'Combining modern technology with traditional agricultural wisdom'
            }
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`feature-block fade-in-up`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}