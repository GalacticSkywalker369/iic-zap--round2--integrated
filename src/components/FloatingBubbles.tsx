import { useState } from "react";
import { MessageCircle, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FloatingBubblesProps {
  selectedLanguage: string;
}

export function FloatingBubbles({ selectedLanguage }: FloatingBubblesProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const getText = () => {
    switch (selectedLanguage) {
      case 'hi':
        return {
          chatbot: 'AI चैटबॉट',
          advisors: 'सलाहकारों से बात करें',
          close: 'बंद करें'
        };
      default:
        return {
          chatbot: 'AI Chatbot',
          advisors: 'Talk to Advisors',
          close: 'Close'
        };
    }
  };

  const text = getText();

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-4">
      {/* Close Button */}
      <div className="flex justify-end">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => setIsVisible(false)}
          className="rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* AI Chatbot Bubble */}
      <Card className="bubble animate-float" style={{ animationDelay: '0s' }}>
        <Button 
          variant="ghost" 
          className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-transparent"
          onClick={() => {
            // TODO: Open chatbot
            console.log('Opening AI Chatbot');
          }}
        >
          <MessageCircle className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium text-foreground">{text.chatbot}</span>
        </Button>
      </Card>

      {/* Talk to Advisors Bubble */}
      <Card className="bubble animate-float" style={{ animationDelay: '1s' }}>
        <Button 
          variant="ghost" 
          className="flex flex-col items-center gap-2 p-4 h-auto hover:bg-transparent"
          onClick={() => {
            // TODO: Open advisors page
            console.log('Opening Talk to Advisors');
          }}
        >
          <Users className="h-8 w-8 text-primary" />
          <span className="text-sm font-medium text-foreground">{text.advisors}</span>
        </Button>
      </Card>
    </div>
  );
}