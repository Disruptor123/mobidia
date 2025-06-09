
import React from 'react';
import { ArrowRight, Smartphone, Globe, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        {/* Hero Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span className="text-white/90 text-sm font-medium">Turn Your Unused Data Into Digital Gold</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Onchain Mobile Data Wallet
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed">
          Transform unused mobile data into tradable bandwidth currency. Sell, lend, and monetize your leftover GBs using smart contracts while earning from anonymized data contributions.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
            <Globe className="w-5 h-5 text-green-400" />
            <span className="text-white/90 text-sm">Global Bandwidth Trading</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 text-sm">ZK-Proof Data Mining</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
            <Smartphone className="w-5 h-5 text-purple-400" />
            <span className="text-white/90 text-sm">Smart Contract Automation</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg">
            Launch App
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
            View Docs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">$2.5M+</div>
            <div className="text-white/60 text-sm">Data Value Traded</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <div className="text-white/60 text-sm">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">1.2TB</div>
            <div className="text-white/60 text-sm">Data Exchanged</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">98.5%</div>
            <div className="text-white/60 text-sm">Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
