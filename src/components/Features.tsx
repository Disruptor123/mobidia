
import React from 'react';
import { Smartphone, ArrowRightLeft, Shield, Coins, Users, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Features = () => {
  const features = [
    {
      icon: ArrowRightLeft,
      title: "Bandwidth Trading",
      description: "Convert unused mobile data into tradable bandwidth currency. Set your prices and terms.",
      color: "text-blue-400"
    },
    {
      icon: Smartphone,
      title: "Smart Contracts",
      description: "Automated lending and selling of leftover GBs through secure blockchain contracts.",
      color: "text-purple-400"
    },
    {
      icon: Shield,
      title: "ZK-Proof Privacy",
      description: "Share anonymized mobile data with zero-knowledge proofs maintaining complete privacy.",
      color: "text-green-400"
    },
    {
      icon: Coins,
      title: "Token Rewards",
      description: "Earn tokens proportionally for data contributions, referrals, and DAO participation.",
      color: "text-yellow-400"
    },
    {
      icon: Users,
      title: "DAO Governance",
      description: "Participate in Mobidia's decentralized governance and shape the platform's future.",
      color: "text-cyan-400"
    },
    {
      icon: TrendingUp,
      title: "Data Monetization",
      description: "Generate passive income from location patterns and usage statistics sold to telecoms.",
      color: "text-pink-400"
    }
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            Revolutionary Features
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Experience the future of mobile data with our cutting-edge blockchain technology
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 group animate-fade-in" 
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-white/10 ${feature.color} group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-white ml-4">{feature.title}</h3>
                </div>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
