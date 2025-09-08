import React from 'react';
import { Button } from '@/components/ui/button';

const NavigationBar = () => {
  const navItems = [
    { label: 'Reminders', href: '#reminders' },
    { label: 'Community Feed', href: '#community' },
    { label: 'Blog', href: '#blog' },
    { label: 'News & Events', href: '#news' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="w-full bg-primary/5 backdrop-blur-sm border-b border-primary/10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {navItems.map((item) => (
            <Button
              key={item.label}
              variant="ghost"
              className="nav-item text-sm"
              onClick={() => scrollToSection(item.href)}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;