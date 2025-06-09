
import React, { useState } from 'react';
import { Shield, Zap, Eye, FileText, Settings, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';

const DataMining = () => {
  const [zkMiningEnabled, setZkMiningEnabled] = useState(true);
  const [dataTypes, setDataTypes] = useState({
    location: true,
    usage: false,
    network: true,
    device: false
  });

  const handleDataTypeChange = (type: string, checked: boolean) => {
    setDataTypes(prev => ({ ...prev, [type]: checked }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Data Mining</h1>
          <p className="text-white/70">Manage data sharing for token rewards with zero-knowledge privacy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* ZK Mining Control */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Shield className="w-6 h-6 text-green-400" />
                <h2 className="text-xl font-bold text-white">ZK Mining Status</h2>
              </div>
              <Switch
                checked={zkMiningEnabled}
                onCheckedChange={setZkMiningEnabled}
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Status:</span>
                <span className={`font-semibold ${zkMiningEnabled ? 'text-green-400' : 'text-red-400'}`}>
                  {zkMiningEnabled ? 'Active' : 'Idle'}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Session Duration:</span>
                <span className="text-white">2h 34m</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Proofs Generated:</span>
                <span className="text-white">147</span>
              </div>
              
              <Button 
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                onClick={() => setZkMiningEnabled(!zkMiningEnabled)}
              >
                <Zap className="w-4 h-4 mr-2" />
                {zkMiningEnabled ? 'Stop Mining' : 'Start Mining'}
              </Button>
            </div>
          </Card>

          {/* Token Earnings */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <DollarSign className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Mining Earnings</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-white/70">Today:</span>
                <span className="text-white font-semibold">+12.5 MBD</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">This Week:</span>
                <span className="text-white font-semibold">+87.3 MBD</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-white/70">Total Earned:</span>
                <span className="text-white font-semibold">+324.7 MBD</span>
              </div>
              
              <Separator className="bg-white/10" />
              
              <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700">
                Claim Rewards
              </Button>
            </div>
          </Card>

          {/* Data Types Shared */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Settings className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Data Types Shared</h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={dataTypes.location}
                    onCheckedChange={(checked) => handleDataTypeChange('location', checked as boolean)}
                  />
                  <span className="text-white">Location Data</span>
                </div>
                <span className="text-sm text-green-400">+2.5 MBD/day</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={dataTypes.usage}
                    onCheckedChange={(checked) => handleDataTypeChange('usage', checked as boolean)}
                  />
                  <span className="text-white">Usage Patterns</span>
                </div>
                <span className="text-sm text-green-400">+1.8 MBD/day</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={dataTypes.network}
                    onCheckedChange={(checked) => handleDataTypeChange('network', checked as boolean)}
                  />
                  <span className="text-white">Network Quality</span>
                </div>
                <span className="text-sm text-green-400">+3.2 MBD/day</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox 
                    checked={dataTypes.device}
                    onCheckedChange={(checked) => handleDataTypeChange('device', checked as boolean)}
                  />
                  <span className="text-white">Device Metrics</span>
                </div>
                <span className="text-sm text-green-400">+1.2 MBD/day</span>
              </div>
            </div>
          </Card>

          {/* ZK Proofs Viewer */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-6 h-6 text-purple-400" />
              <h2 className="text-xl font-bold text-white">ZK Proofs</h2>
            </div>
            
            <div className="space-y-3">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">Proof #147</span>
                  <span className="text-green-400 text-xs">Verified</span>
                </div>
                <p className="text-white/60 text-xs mt-1">Location data batch - 2 minutes ago</p>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">Proof #146</span>
                  <span className="text-green-400 text-xs">Verified</span>
                </div>
                <p className="text-white/60 text-xs mt-1">Network quality batch - 5 minutes ago</p>
              </div>
              
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-white text-sm">Proof #145</span>
                  <span className="text-yellow-400 text-xs">Pending</span>
                </div>
                <p className="text-white/60 text-xs mt-1">Usage patterns batch - 7 minutes ago</p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full mt-4 border-white/20 text-white hover:bg-white/10">
              <Eye className="w-4 h-4 mr-2" />
              View All Proofs
            </Button>
          </Card>
        </div>

        {/* DAO Terms & Disclosure */}
        <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-6 h-6 text-orange-400" />
            <h2 className="text-xl font-bold text-white">Privacy & Terms</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <FileText className="w-4 h-4 mr-2" />
              DAO Terms & Conditions
            </Button>
            
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
              <Shield className="w-4 h-4 mr-2" />
              Data Buyer Disclosure
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataMining;
