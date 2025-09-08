import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const footerLinks = {
    'Quick Links': [
      { label: 'Home', href: '/' },
      { label: 'About Us', href: '/about' },
      { label: 'Services', href: '/services' },
      { label: 'Contact', href: '/contact' }
    ],
    'Resources': [
      { label: 'Crop Guide', href: '/crops' },
      { label: 'Market Prices', href: '/market' },
      { label: 'Weather', href: '/weather' },
      { label: 'Government Schemes', href: '/schemes' }
    ],
    'Support': [
      { label: 'Help Center', href: '/help' },
      { label: 'FAQs', href: '/faq' },
      { label: 'Community', href: '/community' },
      { label: 'Expert Support', href: '/expert-support' }
    ],
    'Legal': [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Disclaimer', href: '/disclaimer' }
    ]
  } as const;

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-green-600 via-green-500 to-emerald-600 text-white relative overflow-hidden">
      {/* Green gradient banner overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-500/30 to-emerald-500/20"></div>
      <div className="relative z-10">
      <div className="container mx-auto px-4">
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <h2 className="text-4xl font-bold mb-3 text-white">
                  FarmAssist
                </h2>
                <p className="text-farm-light text-lg leading-relaxed">
                  Empowering farmers with intelligent agricultural solutions, 
                  expert guidance, and cutting-edge technology for sustainable farming.
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-farm-light">
                  <Mail className="h-5 w-5" />
                  <span>support@farmassist.com</span>
                </div>
                <div className="flex items-center gap-3 text-farm-light">
                  <Phone className="h-5 w-5" />
                  <span>+91 1800-FARM-HELP</span>
                </div>
                <div className="flex items-center gap-3 text-farm-light">
                  <MapPin className="h-5 w-5" />
                  <span>Agricultural Innovation Hub, New Delhi</span>
                </div>
              </div>

              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    size="sm"
                    className="w-10 h-10 p-0 border border-white/20 hover:bg-white/10 hover:border-white/40 hover:scale-110 transition-all"
                    asChild
                  >
                    <a href={social.href} aria-label={social.label}>
                      <social.icon className="h-5 w-5" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-4 text-white">
                  {category}
                </h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-farm-light hover:text-white transition-colors hover:underline"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="py-8 border-t border-white/20">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold mb-3 text-white">
              Stay Updated with FarmAssist
            </h3>
            <p className="text-farm-light mb-6">
              Get the latest agricultural news, tips, and exclusive offers directly in your inbox.
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:border-white/40 transition-colors"
              />
              <Button className="px-6 py-3 bg-farm-accent hover:bg-farm-accent/90 text-farm-primary font-semibold rounded-xl transition-all hover:scale-105">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="py-6 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-farm-light">
              © {new Date().getFullYear()} FarmAssist. All rights reserved. 
              <span className="ml-2">Empowering Agriculture Through Technology.</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-farm-light">
              <span>Made with ❤️ for Farmers</span>
              <span>•</span>
              <span>Version 2.0</span>
            </div>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;


