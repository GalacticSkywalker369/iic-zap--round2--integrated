import React from 'react';
import Header from '@/dashboard/components/Header';
import NavigationBar from '@/dashboard/components/NavigationBar';
import HeroSection from '@/dashboard/components/HeroSection';
import FeatureBlocks from '@/dashboard/components/FeatureBlocks';
import TodoSection from '@/dashboard/components/TodoSection';
import CalendarMapSection from '@/dashboard/components/CalendarMapSection';
import BlogSection from '@/dashboard/components/BlogSection';
import NewsSection from '@/dashboard/components/NewsSection';
import Footer from '@/dashboard/components/Footer';

const DashboardIndex = () => {
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

export default DashboardIndex;


