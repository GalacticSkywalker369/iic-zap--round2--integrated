import React from 'react';
import plantsImg from '@/assets/plants-bg.jpg';
import marketImg from '@/assets/market-guide-bg.jpg';
import resourcesImg from '@/assets/resources-bg.jpg';
import schemesImg from '@/assets/schemes-bg.jpg';
import calendarImg from '@/assets/calendar-bg.jpg';
import supportImg from '@/assets/support-bg.jpg';
import diseaseImg from '@/assets/disease-bg.jpg';
import monthlyImg from '@/assets/monthly-bg.jpg';

const FeatureBlocks = () => {
  const features = [
    {
      title: 'Plants & Crops',
      subtitle: 'Comprehensive crop information and guidance',
      image: plantsImg,
      url: '/plants'
    },
    {
      title: 'Market Guide',
      subtitle: 'Live market prices and selling opportunities',
      image: marketImg,
      url: '/market'
    },
    {
      title: 'Resources',
      subtitle: 'Agricultural tools and equipment guide',
      image: resourcesImg,
      url: '/resources'
    },
    {
      title: 'Government Schemes',
      subtitle: 'Available subsidies and support programs',
      image: schemesImg,
      url: '/schemes'
    },
    {
      title: 'Calendar & Reminders',
      subtitle: 'Smart farming schedule management',
      image: calendarImg,
      url: '/calendar'
    },
    {
      title: 'Expert Support',
      subtitle: '24/7 agricultural expert assistance',
      image: supportImg,
      url: '/support'
    },
    {
      title: 'Plant Disease',
      subtitle: 'Disease identification and treatment',
      image: diseaseImg,
      url: '/disease'
    },
    {
      title: 'Monthly Guidance',
      subtitle: 'Season-specific farming advice',
      image: monthlyImg,
      url: '/monthly'
    }
  ];

  const handleFeatureClick = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient">
            Explore Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover comprehensive agricultural solutions tailored for modern farming needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature.url)}
              className="feature-card cursor-pointer group overflow-hidden animate-slide-up"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-1 group-hover:text-farm-highlight transition-colors">
                    {feature.title}
                  </h3>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureBlocks;