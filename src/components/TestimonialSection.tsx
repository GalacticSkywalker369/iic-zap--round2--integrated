import { Card } from "@/components/ui/card";
import { Quote, Star, Database, Shield, Award, Users } from "lucide-react";
import salientFeaturesBg from "@/assets/salient-features-bg.jpg";

interface TestimonialSectionProps {
  selectedLanguage: string;
}

export function TestimonialSection({ selectedLanguage }: TestimonialSectionProps) {
  const getTestimonials = () => {
    switch (selectedLanguage) {
      case 'hi':
        return [
          {
            name: 'राजेश कुमार',
            location: 'पंजाब',
            text: 'AI सलाह की मदद से मेरी गेहूं की फसल में 30% वृद्धि हुई है। यह वेबसाइट वास्तव में किसानों के लिए वरदान है।',
            rating: 5
          },
          {
            name: 'सुनीता देवी',
            location: 'उत्तर प्रदेश',
            text: 'विशेषज्ञों से सीधी बात करने की सुविधा बहुत अच्छी है। मुझे अपनी सब्जियों की समस्याओं का तुरंत समाधान मिल जाता है।',
            rating: 5
          },
          {
            name: 'मुकेश पटेल',
            location: 'गुजरात',
            text: 'डेटा की पारदर्शिता और साक्ष्य-आधारित सुझाव इस प्लेटफॉर्म की सबसे बड़ी ताकत है।',
            rating: 4
          }
        ];
      default:
        return [
          {
            name: 'Rajesh Kumar',
            location: 'Punjab',
            text: 'With AI guidance, my wheat yield increased by 30%. This platform is truly a blessing for farmers.',
            rating: 5
          },
          {
            name: 'Sunita Devi',
            location: 'Uttar Pradesh', 
            text: 'The direct expert consultation feature is excellent. I get immediate solutions for my vegetable farming issues.',
            rating: 5
          },
          {
            name: 'Mukesh Patel',
            location: 'Gujarat',
            text: 'Data transparency and evidence-based recommendations are the greatest strengths of this platform.',
            rating: 4
          }
        ];
    }
  };

  const getFeatures = () => {
    switch (selectedLanguage) {
      case 'hi':
        return [
          {
            title: 'एकीकृत डेटाबेस',
            description: 'सभी कृषि डेटा एक स्थान पर',
            icon: Database
          },
          {
            title: 'डेटा की पारदर्शिता',
            description: 'स्पष्ट और विश्वसनीय जानकारी',
            icon: Shield
          },
          {
            title: 'साक्ष्य-आधारित परिणाम',
            description: 'वैज्ञानिक आधार पर सुझाव',
            icon: Award
          },
          {
            title: 'उपयोगकर्ता-अनुकूल',
            description: 'आसान और सुविधाजनक इंटरफेस',
            icon: Users
          }
        ];
      default:
        return [
          {
            title: 'Uniform Database',
            description: 'All agricultural data in one place',
            icon: Database
          },
          {
            title: 'Data Transparency',
            description: 'Clear and reliable information',
            icon: Shield
          },
          {
            title: 'Evidence-based Results',
            description: 'Scientifically backed recommendations',
            icon: Award
          },
          {
            title: 'User Friendly',
            description: 'Easy and convenient interface',
            icon: Users
          }
        ];
    }
  };

  const testimonials = getTestimonials();
  const features = getFeatures();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-nature-green/30">
      <div className="container mx-auto px-6">
        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
            {selectedLanguage === 'hi' ? 'किसानों की आवाज़' : 'Farmers Testimonials'}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="feature-block">
              <div className="relative">
                <Quote className="h-8 w-8 text-accent absolute -top-2 -left-2" />
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${
                        i < testimonial.rating ? 'text-accent-yellow fill-current' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Salient Features */}
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold gradient-text mb-12">
            {selectedLanguage === 'hi' ? 'मुख्य विशेषताएं' : 'Salient Features'}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="relative overflow-hidden group hover-lift h-64">
                {/* Background Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                  style={{ backgroundImage: `url(${salientFeaturesBg})` }}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-golden-yellow/80 to-lime-green/80 group-hover:from-honey-yellow/90 group-hover:to-emerald-green/90 transition-all duration-500" />
                
                {/* Glass morphism effect */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
                
                <div className="relative p-6 text-center h-full flex flex-col justify-center">
                  <div className="bg-white/20 backdrop-blur-md p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-8 w-8 text-white drop-shadow-lg" />
                  </div>
                  <h4 className="font-bold text-white text-xl mb-2 drop-shadow-lg">{feature.title}</h4>
                  <p className="text-white/90 text-sm drop-shadow-md">{feature.description}</p>
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:-translate-x-full transition-transform duration-700" />
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}