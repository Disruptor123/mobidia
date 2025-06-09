
import React from 'react';
import { PieChart, Users, Gift, Coins, TrendingUp } from 'lucide-react';
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
      icon: TrendingUp,
      title: "Bandwidth Sellers",
      description: "Receive 95% of sale price + bonus tokens for high-volume trading",
      color: "text-purple-400"
    },
    {
      icon: Coins,
      title: "DAO Governance",
      description: "Monthly rewards for proposal creation, voting, and committee participation",
      color: "text-green-400"
    },
    {
      icon: Gift,
      title: "Referral Program",
      description: "10% of referee's earnings for 6 months + one-time bonus",
      color: "text-yellow-400"
    }
  ];

  return (
    <section id="tokenomics" className="py-20 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Tokenomics
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Fair distribution model that rewards all participants in the Mobidia ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Token Distribution */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white flex items-center">
                <PieChart className="w-6 h-6 mr-2 text-yellow-400" />
                Token Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tokenDistribution.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-medium">{item.category}</span>
                    <span className="text-white/80">{item.percentage}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div 
                      className={`${item.color} h-2 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-white/60 text-sm">{item.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Token Utility */}
          <Card className="bg-white/5 backdrop-blur-sm border-white/10">
            <CardHeader>
              <CardTitle className="text-2xl text-white">MBD Token Utility</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                  <h4 className="text-white font-semibold mb-2">Governance Rights</h4>
                  <p className="text-white/70 text-sm">Vote on protocol upgrades, fee structures, and ecosystem direction</p>
                </div>

                <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                  <h4 className="text-white font-semibold mb-2">Trading Fees</h4>
                  <p className="text-white/70 text-sm">Pay reduced fees for bandwidth trading with MBD tokens</p>
                </div>

                <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="text-white font-semibold mb-2">Staking Rewards</h4>
                  <p className="text-white/70 text-sm">Stake tokens to earn additional yield and boost data mining rewards</p>
                </div>

                <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <h4 className="text-white font-semibold mb-2">Premium Features</h4>
                  <p className="text-white/70 text-sm">Access advanced analytics, priority support, and exclusive features</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rewardStructure.map((reward, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className={`inline-flex p-3 rounded-lg bg-white/10 ${reward.color} mb-4`}>
                  <reward.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{reward.title}</h3>
                <p className="text-white/70 text-sm">{reward.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Total Supply Info */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-white/20 max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">MBD Token Supply</h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">1B</div>
                  <div className="text-white/80">Total Supply</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">2%</div>
                  <div className="text-white/80">Annual Inflation</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
