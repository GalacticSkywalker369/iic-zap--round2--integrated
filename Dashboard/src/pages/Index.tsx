import React from 'react';
import Header from '@/components/Header';
import NavigationBar from '@/components/NavigationBar';
import HeroSection from '@/components/HeroSection';
import FeatureBlocks from '@/components/FeatureBlocks';
import TodoSection from '@/components/TodoSection';
import CalendarMapSection from '@/components/CalendarMapSection';
import BlogSection from '@/components/BlogSection';
import NewsSection from '@/components/NewsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavigationBar />
      <main>
        <HeroSection />
        <FeatureBlocks />
        <TodoSection />
        <CalendarMapSection />
        <BlogSection />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
