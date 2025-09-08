import React from 'react';
import { Calendar, AlertTriangle, TrendingUp, Award, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NewsSection = () => {
  const alerts = [
    {
      id: 1,
      type: 'warning',
      title: 'Pest Alert: Brown Plant Hopper',
      message: 'High infestation reported in Punjab rice fields. Take immediate preventive measures.',
      region: 'Punjab',
      date: 'Today'
    },
    {
      id: 2,
      type: 'info',
      title: 'Weather Advisory',
      message: 'Heavy rainfall expected in next 3 days. Protect your harvest and stored crops.',
      region: 'Haryana',
      date: 'Today'
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: 'New AI-Powered Crop Disease Detection App Launched',
      excerpt: 'Government introduces revolutionary mobile app that can identify plant diseases using smartphone camera with 95% accuracy.',
      category: 'Innovation',
      date: '2 hours ago',
      image: '/api/placeholder/300/200',
      source: 'Agricultural News Today',
      trending: true
    },
    {
      id: 2,
      title: 'PM-KISAN Scheme Extended: ₹6000 Annual Support Continues',
      excerpt: 'Government announces extension of direct cash transfer scheme for farmers, benefiting over 12 crore farmers nationwide.',
      category: 'Government Schemes',
      date: '6 hours ago',
      image: '/api/placeholder/300/200',
      source: 'Ministry of Agriculture',
      trending: false
    },
    {
      id: 3,
      title: 'Record Wheat Prices: MSP Increased by 8.5%',
      excerpt: 'Minimum Support Price for wheat raised to ₹2,125 per quintal, providing better returns to farmers.',
      category: 'Market',
      date: '1 day ago',
      image: '/api/placeholder/300/200',
      source: 'Market Watch',
      trending: true
    },
    {
      id: 4,
      title: 'Organic Farming Subsidy Doubled for Small Farmers',
      excerpt: 'New policy doubles financial assistance for organic certification and inputs for farmers with less than 2 hectares.',
      category: 'Schemes',
      date: '2 days ago',
      image: '/api/placeholder/300/200',
      source: 'Farm Policy India',
      trending: false
    },
    {
      id: 5,
      title: 'Breakthrough in Drought-Resistant Crop Varieties',
      excerpt: 'Scientists develop new rice and wheat varieties that can survive with 30% less water while maintaining yield.',
      category: 'Research',
      date: '3 days ago',
      image: '/api/placeholder/300/200',
      source: 'Agricultural Research',
      trending: true
    },
    {
      id: 6,
      title: 'FarmAssist Partners with 1000+ Cooperatives',
      excerpt: 'Major expansion in rural connectivity as digital farming platform reaches milestone partnership.',
      category: 'Technology',
      date: '1 week ago',
      image: '/api/placeholder/300/200',
      source: 'Tech Agriculture',
      trending: false
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Innovation': return <Award className="h-4 w-4" />;
      case 'Government Schemes': return <Award className="h-4 w-4" />;
      case 'Market': return <TrendingUp className="h-4 w-4" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Innovation': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'Government Schemes': return 'bg-farm-accent/20 text-orange-700 border-farm-accent/30';
      case 'Market': return 'bg-green-500/20 text-green-700 border-green-500/30';
      case 'Research': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Technology': return 'bg-indigo-500/20 text-indigo-700 border-indigo-500/30';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="news" className="py-20 bg-gradient-to-br from-background to-farm-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient">
            News & Events
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Stay updated with latest agricultural news, innovations, and important alerts
          </p>
        </div>

        <div className="mb-12 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-orange-600">
            <AlertTriangle className="h-6 w-6" />
            Important Alerts
          </h3>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <Alert key={alert.id} className="border-orange-200 bg-orange-50/50 animate-pulse-glow">
                <AlertTriangle className="h-4 w-4 text-orange-600" />
                <AlertDescription>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-orange-800 mb-1">{alert.title}</div>
                      <div className="text-orange-700">{alert.message}</div>
                      <div className="text-sm text-orange-600 mt-2">
                        {alert.region} • {alert.date}
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                      View Details
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {newsItems.map((news, index) => (
            <article
              key={news.id}
              className="feature-card shadow-elegant hover:shadow-2xl cursor-pointer group animate-slide-up"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                <div className="w-full h-full bg-gradient-to-br from-farm-light/30 to-farm-accent/30 flex items-center justify-center">
                  <span className="text-4xl opacity-50">📰</span>
                </div>
                {news.trending && (
                  <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>

              <div className="flex items-center justify-between mb-3">
                <Badge className={`${getCategoryColor(news.category)} text-xs flex items-center gap-1`}>
                  {getCategoryIcon(news.category)}
                  {news.category}
                </Badge>
                <span className="text-xs text-muted-foreground">{news.date}</span>
              </div>

              <h3 className="text-lg font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                {news.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {news.excerpt}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-xs text-muted-foreground">{news.source}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all hover-lift"
                >
                  Read More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="px-8 py-4 text-lg hover-lift glow-primary transition-bounce"
          >
            View All News
            <ExternalLink className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;


