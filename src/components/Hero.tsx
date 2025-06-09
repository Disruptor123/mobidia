
import React from 'react';
import { ArrowRight, Smartphone, Globe, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-6xl mx-auto">
        {/* Hero Badge */}
        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8 animate-fade-in">
          <Smartphone className="w-5 h-5 text-blue-400" />
          <span className="text-white/90 text-sm font-medium animate-fade-in" style={{animationDelay: '0.1s'}}>Turn Your Unused Data Into Digital Gold</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight animate-scale-in">
          Onchain Mobile Data Wallet
        </h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-4xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.3s'}}>
          Transform unused mobile data into tradable bandwidth currency. Sell, lend, and monetize your leftover GBs using smart contracts while earning from anonymized data contributions.
        </p>

        {/* Feature Highlights */}
        <div className="flex flex-wrap justify-center gap-6 mb-12 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 animate-fade-in" style={{animationDelay: '0.6s'}}>
            <Globe className="w-5 h-5 text-green-400" />
            <span className="text-white/90 text-sm animate-fade-in" style={{animationDelay: '0.7s'}}>Global Bandwidth Trading</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 animate-fade-in" style={{animationDelay: '0.8s'}}>
            <Coins className="w-5 h-5 text-yellow-400" />
            <span className="text-white/90 text-sm animate-fade-in" style={{animationDelay: '0.9s'}}>ZK-Proof Data Mining</span>
          </div>
          <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2 animate-fade-in" style={{animationDelay: '1s'}}>
            <Smartphone className="w-5 h-5 text-purple-400" />
            <span className="text-white/90 text-sm animate-fade-in" style={{animationDelay: '1.1s'}}>Smart Contract Automation</span>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center animate-fade-in" style={{animationDelay: '1.2s'}}>
          <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg">
            Launch App
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-4xl mx-auto animate-fade-in" style={{animationDelay: '1.4s'}}>
          <div className="text-center animate-fade-in" style={{animationDelay: '1.5s'}}>
            <div className="text-3xl font-bold text-white mb-2 animate-fade-in" style={{animationDelay: '1.6s'}}>$2.5M+</div>
            <div className="text-white/60 text-sm animate-fade-in" style={{animationDelay: '1.7s'}}>Data Value Traded</div>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '1.6s'}}>
            <div className="text-3xl font-bold text-white mb-2 animate-fade-in" style={{animationDelay: '1.7s'}}>50K+</div>
            <div className="text-white/60 text-sm animate-fade-in" style={{animationDelay: '1.8s'}}>Active Users</div>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '1.7s'}}>
            <div className="text-3xl font-bold text-white mb-2 animate-fade-in" style={{animationDelay: '1.8s'}}>1.2TB</div>
            <div className="text-white/60 text-sm animate-fade-in" style={{animationDelay: '1.9s'}}>Data Exchanged</div>
          </div>
          <div className="text-center animate-fade-in" style={{animationDelay: '1.8s'}}>
            <div className="text-3xl font-bold text-white mb-2 animate-fade-in" style={{animationDelay: '1.9s'}}>98.5%</div>
            <div className="text-white/60 text-sm animate-fade-in" style={{animationDelay: '2s'}}>Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
