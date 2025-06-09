
import React from 'react';
import { Wifi, Shield, Twitter, Github, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black/40 backdrop-blur-sm border-t border-white/10 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Wifi className="w-8 h-8 text-blue-400" />
                <Shield className="w-4 h-4 text-green-400 absolute -top-1 -right-1" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Mobidia
              </span>
            </div>
            <p className="text-white/70 text-sm">
              Transform your unused mobile data into digital currency. The future of bandwidth trading is here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Bandwidth Trading</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Data Mining</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Smart Contracts</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">DAO Governance</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Documentation</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">API Reference</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Whitepaper</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Security Audit</a></li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="text-white font-semibold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Discord</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Telegram</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Blog</a></li>
              <li><a href="#" className="text-white/70 hover:text-white transition-colors text-sm">Newsletter</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm">
            © 2024 Mobidia. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
