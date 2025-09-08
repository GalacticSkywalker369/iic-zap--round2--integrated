import React from 'react';
import { User, Calendar, ArrowRight, Heart, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Organic Farming: My 10-Year Journey",
      excerpt: "Sharing my experience transitioning from conventional to organic farming and the challenges I overcame.",
      author: "Rajesh Kumar",
      location: "Punjab",
      avatar: "/api/placeholder/40/40",
      date: "2 days ago",
      likes: 24,
      comments: 8,
      category: "Organic Farming",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Maximizing Wheat Yield with Smart Irrigation",
      excerpt: "How I increased my wheat production by 30% using precision irrigation techniques and soil monitoring.",
      author: "Priya Sharma",
      location: "Haryana",
      avatar: "/api/placeholder/40/40",
      date: "5 days ago",
      likes: 31,
      comments: 12,
      category: "Technology",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Fighting Pest Attacks: Natural Solutions",
      excerpt: "Effective biological pest control methods that saved my crops without harmful chemicals.",
      author: "Mohan Singh",
      location: "Uttar Pradesh",
      avatar: "/api/placeholder/40/40",
      date: "1 week ago",
      likes: 18,
      comments: 6,
      category: "Pest Control",
      readTime: "4 min read"
    },
    {
      id: 4,
      title: "Government Schemes That Changed My Life",
      excerpt: "How I leveraged various agricultural subsidies and schemes to modernize my farming operations.",
      author: "Sunita Patel",
      location: "Gujarat",
      avatar: "/api/placeholder/40/40",
      date: "1 week ago",
      likes: 42,
      comments: 15,
      category: "Government Schemes",
      readTime: "6 min read"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Organic Farming': return 'bg-farm-secondary/20 text-green-700 border-farm-secondary/30';
      case 'Technology': return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
      case 'Pest Control': return 'bg-red-500/20 text-red-700 border-red-500/30';
      case 'Government Schemes': return 'bg-farm-accent/20 text-orange-700 border-farm-accent/30';
      default: return 'bg-muted';
    }
  };

  return (
    <section id="blog" className="py-20 bg-gradient-to-br from-farm-secondary/5 via-farm-light/10 to-farm-highlight/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 brand-gradient">
            Farmer Stories & Advice
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Learn from fellow farmers' experiences, success stories, and practical advice
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="feature-card shadow-elegant hover:shadow-2xl cursor-pointer group animate-slide-up"
              style={{animationDelay: `${0.1 * index}s`}}
            >
              <div className="flex items-start gap-4 mb-4">
                <Avatar className="w-12 h-12 border-2 border-primary/20">
                  <AvatarImage src={post.avatar} alt={post.author} />
                  <AvatarFallback className="bg-farm-light text-farm-primary font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-primary">{post.author}</h4>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{post.location}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <Badge className={`${getCategoryColor(post.category)} text-xs`}>
                  {post.category}
                </Badge>
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1 hover:text-primary transition-colors cursor-pointer">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="group-hover:bg-primary group-hover:text-primary-foreground transition-all hover-lift"
                >
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
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
            View All Stories
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;


