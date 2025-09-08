import React, { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const HeroSection = () => {
  const [chatInput, setChatInput] = useState('');

  const quickChatBubbles = [
    'What crops to plant this season?',
    'Weather forecast for farming',
    'Best fertilizers available',
    'Market prices today',
    'Pest control solutions',
    'Government schemes for farmers'
  ];

  const handleChatSubmit = (query: string) => {
    window.open(`/chatbot?query=${encodeURIComponent(query)}`, '_blank');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-farm-light/20 via-transparent to-farm-highlight/20"></div>
      <div className="absolute top-10 left-10 w-72 h-72 bg-farm-primary/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-farm-accent/10 rounded-full blur-3xl animate-float" style={{animationDelay: '2s'}}></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-12 animate-slide-up">
            <h1 className="text-6xl md:text-8xl font-extrabold mb-6 bg-gradient-to-r from-[#369042] via-[#a1cc33] to-[#FFCA53] bg-clip-text text-transparent tracking-tight animate-pulse-glow">
              FarmAssist
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Your Intelligent Agricultural Companion - Get Expert Advice, Market Insights & More
            </p>
          </div>

          <div className="max-w-2xl mx-auto mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="relative">
              <div className="feature-card p-8 shadow-elegant border border-primary/20 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <MessageCircle className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold">Ask FarmAssist Anything</h3>
                </div>
                
                <div className="flex gap-3">
                  <Input
                    placeholder="Type your farming question here..."
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleChatSubmit(chatInput)}
                    className="flex-1 h-12 text-base transition-smooth focus:shadow-brand"
                  />
                  <Button 
                    onClick={() => handleChatSubmit(chatInput)}
                    className="h-12 px-6 transition-bounce hover-lift glow-primary"
                    disabled={!chatInput.trim()}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="animate-slide-up" style={{animationDelay: '0.4s'}}>
            <h3 className="text-lg font-semibold mb-6 text-muted-foreground">Quick Questions</h3>
            <div className="flex flex-wrap gap-3 justify-center max-w-4xl mx-auto">
              {quickChatBubbles.map((bubble, index) => (
                <button
                  key={index}
                  onClick={() => handleChatSubmit(bubble)}
                  className="chat-bubble text-sm border border-primary/30 bg-background/60"
                  style={{animationDelay: `${0.1 * index}s`}}
                >
                  {bubble}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;


