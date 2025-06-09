
import React from 'react';
import { PieChart, Users, Gift, Coins } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Tokenomics = () => {
  const tokenDistribution = [
    { category: "Data Contributors", percentage: 40, color: "bg-blue-500", description: "Rewards for sharing anonymized mobile data" },
    { category: "Bandwidth Traders", percentage: 25, color: "bg-purple-500", description: "Sellers and lenders of unused data plans" },
    { category: "DAO Participants", percentage: 20, color: "bg-green-500", description: "Governance participation and voting rewards" },
    { category: "Referrals & Community", percentage: 10, color: "bg-yellow-500", description: "Community growth and referral bonuses" },
    { category: "Development Fund", percentage: 5, color: "bg-pink-500", description: "Platform development and maintenance" }
  ];

  const rewardStructure = [
    {
      icon: Users,
      title: "Data Contributors",
      description: "Earn 0.1-2.5 MBD tokens per data point based on value and rarity",
      color: "text-blue-400"
    },
    {
      icon: Coins,
      title: "Bandwidth Sellers",
      description: "Receive 95% of sale price + bonus tokens for high-volume trading",
      color: "text-purple-400"
    },
    {
      icon: Gift,
      title: "DAO Governance",
      description: "Monthly rewards for proposal creation, voting, and committee participation",
      color: "text-green-400"
    }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent animate-fade-in">
            Tokenomics
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto animate-fade-in" style={{animationDelay: '0.2s'}}>
            Fair distribution model that rewards all participants in the Mobidia ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Token Distribution */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center animate-fade-in" style={{animationDelay: '0.4s'}}>
                <PieChart className="w-6 h-6 mr-2 text-yellow-400" />
                Token Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenDistribution.map((item, index) => (
                <div key={index} className="space-y-2 animate-fade-in" style={{animationDelay: `${0.5 + index * 0.1}s`}}>
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium animate-fade-in" style={{animationDelay: `${0.6 + index * 0.1}s`}}>{item.category}</span>
                    <span className="text-white/80 animate-fade-in" style={{animationDelay: `${0.7 + index * 0.1}s`}}>{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out animate-pulse`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-sm animate-fade-in" style={{animationDelay: `${0.8 + index * 0.1}s`}}>{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Token Utility */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="text-2xl text-white animate-fade-in" style={{animationDelay: '0.5s'}}>MBD Token Utility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 animate-fade-in" style={{animationDelay: '0.6s'}}>
                  <h4 className="text-white font-semibold mb-2 animate-fade-in" style={{animationDelay: '0.7s'}}>Governance Rights</h4>
                  <p className="text-white/70 text-sm animate-fade-in" style={{animationDelay: '0.8s'}}>Vote on protocol upgrades, fee structures, and ecosystem direction</p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 animate-fade-in" style={{animationDelay: '0.7s'}}>
                  <h4 className="text-white font-semibold mb-2 animate-fade-in" style={{animationDelay: '0.8s'}}>Trading Fees</h4>
                  <p className="text-white/70 text-sm animate-fade-in" style={{animationDelay: '0.9s'}}>Pay reduced fees for bandwidth trading with MBD tokens</p>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20 animate-fade-in" style={{animationDelay: '0.8s'}}>
                  <h4 className="text-white font-semibold mb-2 animate-fade-in" style={{animationDelay: '0.9s'}}>Staking Rewards</h4>
                  <p className="text-white/70 text-sm animate-fade-in" style={{animationDelay: '1s'}}>Stake tokens to earn additional yield and boost data mining rewards</p>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20 animate-fade-in" style={{animationDelay: '0.9s'}}>
                  <h4 className="text-white font-semibold mb-2 animate-fade-in" style={{animationDelay: '1s'}}>Premium Features</h4>
                  <p className="text-white/70 text-sm animate-fade-in" style={{animationDelay: '1.1s'}}>Access advanced analytics, priority support, and exclusive features</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Structure */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rewardStructure.map((reward, index) => (
            <Card 
              key={index} 
              className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300 animate-fade-in"
              style={{animationDelay: `${1.2 + index * 0.1}s`}}
            >
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-lg bg-white/10 ${reward.color} mb-4`}>
                  <reward.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 animate-fade-in" style={{animationDelay: `${1.3 + index * 0.1}s`}}>{reward.title}</h3>
                <p className="text-white/70 text-sm animate-fade-in" style={{animationDelay: `${1.4 + index * 0.1}s`}}>{reward.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
