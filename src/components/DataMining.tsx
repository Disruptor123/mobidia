
import React from 'react';
import { Database, Lock, Globe, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DataMining = () => {
  return (
    <section id="data-mining" className="py-20 px-4 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent animate-fade-in">
            Onchain Data Mining DAO
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Contribute anonymized mobile data through ZK-proofs and earn tokens while maintaining complete privacy
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Zero-Knowledge Privacy</h3>
                <p className="text-white/70">Share location patterns and usage statistics without revealing personal information through advanced ZK-proof technology.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Valuable Data Insights</h3>
                <p className="text-white/70">Your anonymized data helps telecoms and researchers improve services while you earn proportional rewards.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Global Network Effect</h3>
                <p className="text-white/70">Join a worldwide network of data contributors creating the largest mobile usage dataset ever assembled.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Instant Rewards</h3>
                <p className="text-white/70">Receive tokens immediately upon data contribution with transparent, algorithmic distribution.</p>
              </div>
            </div>
          </div>

          <Card className="bg-black/60 backdrop-blur-sm border-white/20 p-8 animate-fade-in" style={{animationDelay: '0.5s'}}>
            <CardContent className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4">Data Contribution Stats</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Daily Contributors</span>
                  <span className="text-2xl font-bold text-white">12,543</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Total Data Points</span>
                  <span className="text-2xl font-bold text-white">2.8M+</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Average Daily Earnings</span>
                  <span className="text-2xl font-bold text-green-400">$12.50</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-white/80">Privacy Score</span>
                  <span className="text-2xl font-bold text-purple-400">100%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
                <p className="text-white/80 text-sm">
                  <strong className="text-white">Privacy Guarantee:</strong> All data is processed through zero-knowledge proofs. Your personal information never leaves your device.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default DataMining;
