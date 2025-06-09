
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Tokenomics from '../components/Tokenomics';
import DataMining from '../components/DataMining';
import Footer from '../components/Footer';
import AnimatedBackground from '../components/AnimatedBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10">
        <Header />
        <Hero />
        <Features />
        <DataMining />
        <Tokenomics />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
