
import React, { useState } from 'react';
import { User, Shield, Settings, Wallet, Award, Key } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/Navbar';

const Profile = () => {
  const [zkDataSharing, setZkDataSharing] = useState(true);
  const [profile, setProfile] = useState({
    name: 'Anonymous User',
    role: 'Miner',
    walletAddress: '0x1234...5678'
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Profile</h1>
          <p className="text-white/70">Manage your identity and privacy preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* DID/Wallet Profile */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-400" />
              <h2 className="text-xl font-bold text-white">Identity</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white/70">Display Name</Label>
                <Input 
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  className="bg-white/10 border-white/20 text-white mt-1"
                />
              </div>
              
              <div>
                <Label className="text-white/70">Wallet Address</Label>
                <div className="flex items-center gap-2 mt-1">
                  <Input 
                    value={profile.walletAddress}
                    readOnly
                    className="bg-white/5 border-white/20 text-white/60"
                  />
                  <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <Key className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="text-white/70">DID Status</Label>
                <div className="flex items-center justify-between mt-1 p-3 bg-white/5 rounded-lg">
                  <span className="text-white">Decentralized Identity</span>
                  <span className="text-green-400 text-sm">Verified</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Role & Permissions */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-yellow-400" />
              <h2 className="text-xl font-bold text-white">Role & Permissions</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label className="text-white/70">Primary Role</Label>
                <select 
                  value={profile.role}
                  onChange={(e) => setProfile({...profile, role: e.target.value})}
                  className="w-full mt-1 p-2 bg-white/10 border border-white/20 rounded-lg text-white"
                >
                  <option value="Miner">Data Miner</option>
                  <option value="Seller">Bandwidth Seller</option>
                  <option value="Voter">DAO Voter</option>
                  <option value="All">All Roles</option>
                </select>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span className="text-white">Data Mining</span>
                  </div>
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4 text-blue-400" />
                    <span className="text-white">Bandwidth Trading</span>
                  </div>
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-purple-400" />
                    <span className="text-white">DAO Voting</span>
                  </div>
                  <span className="text-green-400 text-sm">Enabled</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Privacy Settings */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h2 className="text-xl font-bold text-white">Privacy Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">ZK Data Sharing</h3>
                    <p className="text-white/60 text-sm">Share data with zero-knowledge proofs</p>
                  </div>
                  <Switch
                    checked={zkDataSharing}
                    onCheckedChange={setZkDataSharing}
                  />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Anonymous Trading</h3>
                    <p className="text-white/60 text-sm">Hide identity in marketplace</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">DAO Visibility</h3>
                    <p className="text-white/60 text-sm">Show voting activity publicly</p>
                  </div>
                  <Switch />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Location Sharing</h3>
                    <p className="text-white/60 text-sm">Share location data for rewards</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Usage Analytics</h3>
                    <p className="text-white/60 text-sm">Share app usage patterns</p>
                  </div>
                  <Switch />
                </div>
                
                <Separator className="bg-white/10" />
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-medium">Marketing Communications</h3>
                    <p className="text-white/60 text-sm">Receive updates and offers</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
          </Card>

          {/* Account Actions */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6 lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Settings className="w-6 h-6 text-orange-400" />
              <h2 className="text-xl font-bold text-white">Account Actions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Export Data
              </Button>
              
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Download Reports
              </Button>
              
              <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10">
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
