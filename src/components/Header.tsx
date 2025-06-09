
import React, { useState } from 'react';
import { Menu, X, Wifi, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Wifi className="w-8 h-8 text-blue-400" />
              <Shield className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mobidia
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
            <a href="#data-mining" className="text-white/80 hover:text-white transition-colors">Data Mining</a>
            <a href="#tokenomics" className="text-white/80 hover:text-white transition-colors">Tokenomics</a>
            <a href="#docs" className="text-white/80 hover:text-white transition-colors">Docs</a>
          </nav>

          {/* Connect Wallet Button */}
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0">
              Connect Wallet
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <a href="#features" className="text-white/80 hover:text-white transition-colors">Features</a>
              <a href="#data-mining" className="text-white/80 hover:text-white transition-colors">Data Mining</a>
              <a href="#tokenomics" className="text-white/80 hover:text-white transition-colors">Tokenomics</a>
              <a href="#docs" className="text-white/80 hover:text-white transition-colors">Docs</a>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0 w-full mt-4">
                Connect Wallet
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
