
import React, { useState } from 'react';
import { Wifi, TrendingUp, Coins, Users, Play, Pause, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [isMiningActive, setIsMiningActive] = useState(true);
  const [zkMiningEnabled, setZkMiningEnabled] = useState(true);
  const [bandwidthBalance, setBandwidthBalance] = useState({ unused: 15.2, used: 8.8, tradable: 12.0 });
  const [tokenBalance, setTokenBalance] = useState(1247);
  const [weeklyEarnings, setWeeklyEarnings] = useState(142);
  const { toast } = useToast();

  const handleSellLendBandwidth = () => {
    toast({
      title: "Bandwidth Marketplace",
      description: "Redirecting to bandwidth marketplace...",
    });
    window.location.href = '/marketplace';
  };

  const handleToggleMining = () => {
    setIsMiningActive(!isMiningActive);
    toast({
      title: isMiningActive ? "Mining Stopped" : "Mining Started",
      description: isMiningActive ? "ZK mining has been paused" : "ZK mining is now active",
    });
  };

  const handleClaimRewards = () => {
    const rewardAmount = 23;
    setTokenBalance(prev => prev + rewardAmount);
    toast({
      title: "Rewards Claimed!",
      description: `Successfully claimed ${rewardAmount} MBD tokens`,
    });
  };

  const handleViewVote = () => {
    toast({
      title: "DAO Governance",
      description: "Redirecting to governance page...",
    });
    window.location.href = '/dao-governance';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">Dashboard</h1>
          <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.1s'}}>Manage your bandwidth and earnings</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bandwidth Wallet */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wifi className="w-5 h-5 text-blue-400" />
                Bandwidth Wallet
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-white/80">
                  <span>Balance (Unused GBs):</span>
                  <span className="text-green-400 font-semibold">{bandwidthBalance.unused} GB</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Used:</span>
                  <span className="text-orange-400 font-semibold">{bandwidthBalance.used} GB</span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Tradable:</span>
                  <span className="text-blue-400 font-semibold">{bandwidthBalance.tradable} GB</span>
                </div>
              </div>
              <Button 
                onClick={handleSellLendBandwidth}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
              >
                Sell / Lend Bandwidth
              </Button>
            </CardContent>
          </Card>

          {/* Data Mining Rewards */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                Data Mining Rewards
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-white/80">
                  <span>ZK Mining Enabled:</span>
                  <span className={`font-semibold ${zkMiningEnabled ? 'text-green-400' : 'text-red-400'}`}>
                    {zkMiningEnabled ? 'Yes' : 'No'}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Current Session:</span>
                  <span className={`font-semibold ${isMiningActive ? 'text-green-400' : 'text-yellow-400'}`}>
                    {isMiningActive ? 'Active' : 'Idle'}
                  </span>
                </div>
                <div className="flex justify-between text-white/80">
                  <span>Earnings This Week:</span>
                  <span className="text-blue-400 font-semibold">{weeklyEarnings} MBD</span>
                </div>
              </div>
              <Button 
                onClick={handleToggleMining}
                className={`w-full ${isMiningActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'}`}
              >
                {isMiningActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isMiningActive ? 'Stop Mining' : 'Start Mining'}
              </Button>
            </CardContent>
          </Card>

          {/* Token Balance & Earnings */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Coins className="w-5 h-5 text-yellow-400" />
                Token Balance & Earnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{tokenBalance} MBD</div>
                <div className="text-white/60 text-sm">Wallet Balance</div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Daily:</span>
                  <span className="text-green-400">+23 MBD</span>
                </div>
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Weekly:</span>
                  <span className="text-green-400">+{weeklyEarnings} MBD</span>
                </div>
                <div className="flex justify-between text-white/80 text-sm">
                  <span>Monthly:</span>
                  <span className="text-green-400">+589 MBD</span>
                </div>
              </div>
              <Button 
                onClick={handleClaimRewards}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700"
              >
                Claim Rewards
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* DAO Notices / Voting Proposals */}
        <Card className="mt-6 bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              DAO Notices / Voting Proposals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">Proposal #12: Bandwidth Pricing Algorithm Update</h4>
                    <p className="text-white/70 text-sm">Implementing dynamic pricing based on network demand...</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 mt-1" />
                </div>
              </div>
              <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-white font-medium">Proposal #11: ZK-Proof Mining Rewards Increase</h4>
                    <p className="text-white/70 text-sm">Increasing rewards for data contributors by 15%...</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-purple-400 mt-1" />
                </div>
              </div>
            </div>
            <Button 
              onClick={handleViewVote}
              className="w-full mt-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700"
            >
              View & Vote
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
