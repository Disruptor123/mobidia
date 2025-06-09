
import React from 'react';
import { Database, Lock, Globe, Zap } from 'lucide-react';

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

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.1s'}}>
              <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in" style={{animationDelay: '0.2s'}}>Zero-Knowledge Privacy</h3>
                <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.3s'}}>Share location patterns and usage statistics without revealing personal information through advanced ZK-proof technology.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in" style={{animationDelay: '0.4s'}}>Valuable Data Insights</h3>
                <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.5s'}}>Your anonymized data helps telecoms and researchers improve services while you earn proportional rewards.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <div className="p-3 rounded-lg bg-green-500/20 text-green-400">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in" style={{animationDelay: '0.6s'}}>Global Network Effect</h3>
                <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.7s'}}>Join a worldwide network of data contributors creating the largest mobile usage dataset ever assembled.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 animate-fade-in" style={{animationDelay: '0.7s'}}>
              <div className="p-3 rounded-lg bg-yellow-500/20 text-yellow-400">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2 animate-fade-in" style={{animationDelay: '0.8s'}}>Instant Rewards</h3>
                <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.9s'}}>Receive tokens immediately upon data contribution with transparent, algorithmic distribution.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-black/40 backdrop-blur-sm rounded-lg border border-white/20 animate-fade-in" style={{animationDelay: '1s'}}>
            <p className="text-white/80 text-center animate-fade-in" style={{animationDelay: '1.1s'}}>
              <strong className="text-white">Privacy Guarantee:</strong> All data is processed through zero-knowledge proofs. Your personal information never leaves your device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataMining;
