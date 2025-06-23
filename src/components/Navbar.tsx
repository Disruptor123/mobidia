import React, { useState, useEffect } from 'react';
import { Menu, X, Wifi, Shield, TrendingUp, User, Clock, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAccount } from 'wagmi';
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { address, isConnecting} = useAccount();
    useEffect(() => {
        if (address && !isConnecting && location.pathname === '/') {
      navigate('/dashboard');
    }
  }, [address, isConnecting, location.pathname, navigate]);
  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Bandwidth Marketplace', href: '/marketplace', icon: TrendingUp },
    { name: 'Data Mining', href: '/data-mining', icon: Shield },
    { name: 'Profile', href: '/profile', icon: User },
    { name: 'DAO Governance', href: '/dao-governance', icon: Clock },
  ];
  return (
    <nav className="bg-black/20 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative">
              <Wifi className="w-8 h-8 text-blue-400" />
              <Shield className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Mobidia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet Button - TODO: Configure wallet integration */}
          <div className="hidden md:block">
            <button onClick={() => navigate}><w3m-button /></button>  
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
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                );
              })}
              {/* Mobile Connect Wallet Button - TODO: Configure wallet integration */}
              <button onClick={() => navigate('/dashboard')}><w3m-button /></button>  
            
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
