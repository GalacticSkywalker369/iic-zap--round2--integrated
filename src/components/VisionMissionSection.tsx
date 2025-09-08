import { Card } from "@/components/ui/card";
import { Eye, Target, Users, Lightbulb } from "lucide-react";

interface VisionMissionSectionProps {
  selectedLanguage: string;
}

export function VisionMissionSection({ selectedLanguage }: VisionMissionSectionProps) {
  const getContent = () => {
    switch (selectedLanguage) {
      case 'hi':
        return {
          vision: {
            title: 'हमारा विज़न',
            content: 'प्रत्येक किसान को आधुनिक तकनीक और AI की मदद से सशक्त बनाना, जिससे वे अपनी फसल की गुणवत्ता और पैदावार में सुधार कर सकें। हमारा लक्ष्य है कि हर किसान तक विश्वसनीय और समय पर कृषि सलाह पहुंचे।',
            points: [
              'डिजिटल कृषि क्रांति का नेतृत्व',
              'पारंपरिक ज्ञान और आधुनिक तकनीक का मेल',
              'सभी किसानों के लिए समान अवसर'
            ]
          },
          mission: {
            title: 'हमारा मिशन',
            content: 'AI-आधारित सलाह, विशेषज्ञ मार्गदर्शन, और डेटा-संचालित समाधानों के माध्यम से भारतीय कृषि को आगे बढ़ाना। हम किसानों को बेहतर निर्णय लेने में मदद करते हैं और उनकी आय बढ़ाने में योगदान देते हैं।',
            points: [
              'वैज्ञानिक पद्धति पर आधारित कृषि सलाह',
              'फसल की गुणवत्ता और उत्पादकता में वृद्धि',
              'टिकाऊ कृषि पद्धतियों को बढ़ावा'
            ]
          },
          about: {
            title: 'हमारे बारे में',
            content: 'AgriAdvisor एक अग्रणी कृषि तकनीक प्लेटफॉर्म है जो किसानों को आर्टिफिशियल इंटेलिजेंस और मशीन लर्निंग की शक्ति से जोड़ता है। 2024 में स्थापित, हमने हजारों किसानों की मदद की है।'
          },
          impact: {
            title: 'हमारा प्रभाव',
            content: 'आज तक 50,000+ किसानों ने हमारी सेवाओं का लाभ उठाया है, जिससे उनकी औसत आय में 35% की वृद्धि हुई है।'
          }
        };
      default:
        return {
          vision: {
            title: 'Our Vision',
            content: 'To empower every farmer with modern technology and AI assistance, enabling them to improve crop quality and yield. Our goal is to ensure reliable and timely agricultural advice reaches every farmer.',
            points: [
              'Leading the digital agriculture revolution',
              'Bridging traditional wisdom with modern technology',
              'Equal opportunities for all farmers'
            ]
          },
          mission: {
            title: 'Our Mission',
            content: 'To advance Indian agriculture through AI-powered advice, expert guidance, and data-driven solutions. We help farmers make better decisions and contribute to increasing their income.',
            points: [
              'Scientific method-based agricultural advice',
              'Improving crop quality and productivity',
              'Promoting sustainable farming practices'
            ]
          },
          about: {
            title: 'About Us',
            content: 'AgriAdvisor is a leading agricultural technology platform that connects farmers with the power of Artificial Intelligence and Machine Learning. Established in 2024, we have helped thousands of farmers.'
          },
          impact: {
            title: 'Our Impact',
            content: 'Over 50,000+ farmers have benefited from our services, resulting in an average income increase of 35%.'
          }
        };
    }
  };

  const content = getContent();

  return (
    <>
      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-background to-secondary/20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="bg-primary/10 p-4 rounded-full">
                <Users className="h-12 w-12 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {content.about.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {content.about.content}
            </p>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-primary/10 p-3 rounded-full">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-4xl font-bold text-primary">
                  {content.vision.title}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {content.vision.content}
              </p>
              <ul className="space-y-3">
                {content.vision.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="feature-block">
              <div className="h-64 bg-gradient-to-br from-primary/10 to-primary-light/10 rounded-lg flex items-center justify-center">
                <Lightbulb className="h-24 w-24 text-primary opacity-50" />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-gradient-to-b from-background to-nature-green/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <Card className="feature-block md:order-2">
              <div className="h-64 bg-gradient-to-br from-accent/10 to-accent-yellow/10 rounded-lg flex items-center justify-center">
                <Target className="h-24 w-24 text-accent opacity-50" />
              </div>
            </Card>
            <div className="md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-accent/10 p-3 rounded-full">
                  <Target className="h-8 w-8 text-accent" />
                </div>
                <h2 className="text-4xl font-bold text-primary">
                  {content.mission.title}
                </h2>
              </div>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {content.mission.content}
              </p>
              <ul className="space-y-3">
                {content.mission.points.map((point, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0" />
                    <span className="text-foreground">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 bg-gradient-to-b from-nature-green/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-6">
              {content.impact.title}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-12">
              {content.impact.content}
            </p>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <Card className="feature-block text-center">
                <div className="text-4xl font-bold text-primary mb-2">50,000+</div>
                <div className="text-muted-foreground">
                  {selectedLanguage === 'hi' ? 'किसान सेवित' : 'Farmers Served'}
                </div>
              </Card>
              <Card className="feature-block text-center">
                <div className="text-4xl font-bold text-accent mb-2">35%</div>
                <div className="text-muted-foreground">
                  {selectedLanguage === 'hi' ? 'आय में वृद्धि' : 'Income Increase'}
                </div>
              </Card>
              <Card className="feature-block text-center">
                <div className="text-4xl font-bold text-primary-light mb-2">24/7</div>
                <div className="text-muted-foreground">
                  {selectedLanguage === 'hi' ? 'सहायता उपलब्ध' : 'Support Available'}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}