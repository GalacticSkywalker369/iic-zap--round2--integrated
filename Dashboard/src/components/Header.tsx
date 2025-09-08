import React, { useState } from 'react';
import { Globe, Mic, Menu, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const Header = () => {
  const [isMicActive, setIsMicActive] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const languages = [
    'English', 'हिंदी (Hindi)', 'বাংলা (Bengali)', 'தமிழ் (Tamil)', 
    'తెలుగు (Telugu)', 'ગુજરાતી (Gujarati)', 'मराठी (Marathi)',
    'ਪੰਜਾਬੀ (Punjabi)', 'ಕನ್ನಡ (Kannada)', 'മലയാളം (Malayalam)'
  ];

  return (
    <header className="w-full bg-background/80 backdrop-blur-md border-b shadow-brand sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left section - Language selector */}
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="nav-item bg-card/50"
                >
                  <Globe className="h-5 w-5 mr-2" />
                  {selectedLanguage}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2 bg-card/95 backdrop-blur-md border shadow-elegant">
                <div className="grid gap-1">
                  <h3 className="font-semibold text-sm mb-2 text-primary">Select Language</h3>
                  {languages.map((lang) => (
                    <Button
                      key={lang}
                      variant="ghost"
                      size="sm"
                      className={`justify-start text-sm transition-smooth ${
                        lang === selectedLanguage ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
                      }`}
                      onClick={() => setSelectedLanguage(lang)}
                    >
                      {lang}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>

            {/* Mic button */}
            <Button
              variant={isMicActive ? "default" : "ghost"}
              size="sm"
              className={`nav-item transition-smooth ${
                isMicActive ? 'glow-primary animate-pulse-glow' : ''
              }`}
              onClick={() => setIsMicActive(!isMicActive)}
            >
              <Mic className={`h-5 w-5 ${isMicActive ? 'text-primary-foreground' : ''}`} />
              {isMicActive && <span className="ml-2 text-sm">Listening...</span>}
            </Button>
          </div>

          {/* Right section - Sidebar trigger */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="nav-item">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-80 bg-card/95 backdrop-blur-md">
              <div className="flex flex-col gap-6 mt-8">
                <div className="text-center">
                  <h2 className="text-2xl font-bold brand-gradient">FarmAssist</h2>
                  <p className="text-muted-foreground mt-2">Your Agricultural Companion</p>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    variant="ghost" 
                    className="justify-start p-4 h-auto hover-lift"
                    onClick={() => window.open('/profile', '_blank')}
                  >
                    <User className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Profile</div>
                      <div className="text-sm text-muted-foreground">Manage your account</div>
                    </div>
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="justify-start p-4 h-auto hover-lift"
                    onClick={() => window.open('/settings', '_blank')}
                  >
                    <Settings className="h-5 w-5 mr-3" />
                    <div className="text-left">
                      <div className="font-medium">Settings</div>
                      <div className="text-sm text-muted-foreground">App preferences</div>
                    </div>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;