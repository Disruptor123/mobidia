
import React from 'react';
import { ArrowRight, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  // TODO: Configure wallet connection logic here
  const handleLaunchApp = () => {
    console.log("Launch App clicked - configure wallet integration here");
    // Add wallet connection logic here before redirecting to dashboard
    window.location.href = '/dashboard';
  };

  // TODO: Configure wallet connection logic here  
  const handleConnectWallet = () => {
    console.log("Connect Wallet clicked - configure wallet integration here");
    // Add wallet connection logic here
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      <div className="container mx-auto max-w-6xl text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-6">
            <Zap className="w-4 h-4 text-yellow-400 mr-2" />
            <span className="text-white/90 text-sm">Revolutionary Mobile Data Economy</span>
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent animate-fade-in leading-tight" style={{animationDelay: '0.1s'}}>
          Turn Your Unused Data
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Into Digital Currency
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in" style={{animationDelay: '0.2s'}}>
          The first onchain mobile data wallet where bandwidth becomes currency. 
          Sell leftover GBs, earn from data mining, and participate in the decentralized mobile economy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in" style={{animationDelay: '0.3s'}}>
          {/* Launch App Button - TODO: Configure wallet integration */}
          <Button 
            onClick={handleLaunchApp}
            size="lg" 
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 px-8 py-4 text-lg font-semibold"
          >
            Launch App
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-4 text-lg">
            Learn More
          </Button>
        </div>

        {/* Trust Indicators */}
        <div className="flex items-center justify-center gap-6 mt-12 animate-fade-in" style={{animationDelay: '0.4s'}}>
          <div className="flex items-center gap-2 text-white/60">
            <Shield className="w-5 h-5 text-green-400" />
            <span>ZK-Proof Security</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span>Smart Contract Escrow</span>
          </div>
          <div className="flex items-center gap-2 text-white/60">
            <Shield className="w-5 h-5 text-blue-400" />
            <span>Decentralized Network</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
