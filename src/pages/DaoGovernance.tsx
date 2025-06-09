
import React, { useState } from 'react';
import { Vote, Award, Plus, FileText, TrendingUp, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';

const DaoGovernance = () => {
  const [userTokens] = useState(1250);
  const [governanceScore] = useState(87);

  const activeProposals = [
    {
      id: 1,
      title: "Increase Data Mining Rewards by 15%",
      description: "Proposal to boost ZK mining rewards to attract more participants and improve network security.",
      author: "0x7890...abcd",
      votesFor: 12500,
      votesAgainst: 3200,
      totalVotes: 15700,
      endTime: "2 days",
      status: "Active",
      stakeCost: 100,
      category: "Rewards"
    },
    {
      id: 2,
      title: "New Privacy Features Implementation",
      description: "Add advanced privacy controls and enhanced ZK-proof generation for better user protection.",
      author: "0x1234...efgh",
      votesFor: 8900,
      votesAgainst: 6100,
      totalVotes: 15000,
      endTime: "5 days",
      status: "Active",
      stakeCost: 150,
      category: "Development"
    },
    {
      id: 3,
      title: "Partnership with Telecom Operators",
      description: "Establish formal partnerships with major telecom operators to expand bandwidth marketplace.",
      author: "0x5678...ijkl",
      votesFor: 18200,
      votesAgainst: 2800,
      totalVotes: 21000,
      endTime: "1 day",
      status: "Passing",
      stakeCost: 200,
      category: "Partnerships"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">DAO Governance</h1>
          <p className="text-white/70">Participate in Mobidia DAO decisions and shape the future</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Governance Stats */}
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Vote className="w-5 h-5 text-blue-400" />
              <span className="text-white font-medium">Your Tokens</span>
            </div>
            <p className="text-2xl font-bold text-white">{userTokens.toLocaleString()}</p>
            <p className="text-white/60 text-sm">MBD Voting Power</p>
          </Card>
          
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-medium">Governance Score</span>
            </div>
            <p className="text-2xl font-bold text-white">{governanceScore}</p>
            <p className="text-white/60 text-sm">Participation Level</p>
          </Card>
          
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="w-5 h-5 text-green-400" />
              <span className="text-white font-medium">Active Proposals</span>
            </div>
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-white/60 text-sm">Awaiting Your Vote</p>
          </Card>
          
          <Card className="bg-black/40 backdrop-blur-md border-white/10 p-4">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">Votes Cast</span>
            </div>
            <p className="text-2xl font-bold text-white">24</p>
            <p className="text-white/60 text-sm">This Month</p>
          </Card>
        </div>

        <Tabs defaultValue="active" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="bg-black/40 border-white/10">
              <TabsTrigger value="active" className="data-[state=active]:bg-white/20">
                Active Proposals
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-white/20">
                Voting History
              </TabsTrigger>
              <TabsTrigger value="create" className="data-[state=active]:bg-white/20">
                Create Proposal
              </TabsTrigger>
            </TabsList>
            
            <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              New Proposal
            </Button>
          </div>

          <TabsContent value="active" className="space-y-4">
            {activeProposals.map((proposal) => (
              <Card key={proposal.id} className="bg-black/40 backdrop-blur-md border-white/10 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-bold text-white">{proposal.title}</h3>
                      <Badge variant={proposal.status === 'Passing' ? 'default' : 'secondary'}>
                        {proposal.status}
                      </Badge>
                      <Badge variant="outline" className="border-white/20 text-white/70">
                        {proposal.category}
                      </Badge>
                    </div>
                    <p className="text-white/70 mb-3">{proposal.description}</p>
                    <div className="flex items-center gap-4 text-sm text-white/60">
                      <span>By: {proposal.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        Ends in {proposal.endTime}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">For: {proposal.votesFor.toLocaleString()}</span>
                    <span className="text-red-400">Against: {proposal.votesAgainst.toLocaleString()}</span>
                  </div>
                  <Progress 
                    value={(proposal.votesFor / proposal.totalVotes) * 100} 
                    className="h-2"
                  />
                  <p className="text-white/60 text-sm">
                    Total votes: {proposal.totalVotes.toLocaleString()} | Stake required: {proposal.stakeCost} MBD
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <Button 
                    className="bg-green-600 hover:bg-green-700 flex-1"
                    disabled={userTokens < proposal.stakeCost}
                  >
                    Vote For
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-red-500/50 text-red-400 hover:bg-red-500/10 flex-1"
                    disabled={userTokens < proposal.stakeCost}
                  >
                    Vote Against
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    <FileText className="w-4 h-4 mr-2" />
                    Details
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Your Voting History</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Bandwidth Fee Reduction</p>
                    <p className="text-white/60 text-sm">Voted: For • 3 days ago</p>
                  </div>
                  <Badge className="bg-green-600">Passed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">New Mining Algorithm</p>
                    <p className="text-white/60 text-sm">Voted: Against • 1 week ago</p>
                  </div>
                  <Badge variant="secondary">Failed</Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <p className="text-white font-medium">Treasury Allocation</p>
                    <p className="text-white/60 text-sm">Voted: For • 2 weeks ago</p>
                  </div>
                  <Badge className="bg-green-600">Passed</Badge>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="create" className="space-y-4">
            <Card className="bg-black/40 backdrop-blur-md border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Create New Proposal</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm">Proposal Title</label>
                  <input 
                    type="text" 
                    className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50"
                    placeholder="Enter proposal title..."
                  />
                </div>
                
                <div>
                  <label className="text-white/70 text-sm">Description</label>
                  <textarea 
                    className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 h-32"
                    placeholder="Describe your proposal in detail..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm">Category</label>
                    <select className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white">
                      <option>Development</option>
                      <option>Rewards</option>
                      <option>Partnerships</option>
                      <option>Treasury</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="text-white/70 text-sm">Minimum Stake (MBD)</label>
                    <input 
                      type="number" 
                      className="w-full mt-1 p-3 bg-white/10 border border-white/20 rounded-lg text-white"
                      placeholder="100"
                    />
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 flex-1">
                    Submit Proposal (500 MBD)
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Preview
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DaoGovernance;
