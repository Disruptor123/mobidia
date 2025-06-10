
import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, Zap, Shield, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import Navbar from '../components/Navbar';

const BandwidthMarketplace = () => {
  const [showSellForm, setShowSellForm] = useState(false);
  const [sellAmount, setSellAmount] = useState('');
  const [sellPrice, setSellPrice] = useState('');
  const [sellDuration, setSellDuration] = useState('');
  const [gbBalance, setGbBalance] = useState({ available: 15.2, listed: 9.0, reserved: 2.0 });
  const [activeListings, setActiveListings] = useState([
    { id: 1, amount: '5.2 GB', price: '12 MBD/GB', duration: '7 days', status: 'Active' },
    { id: 2, amount: '3.8 GB', price: '15 MBD/GB', duration: '3 days', status: 'Active' },
  ]);
  const [incomingOffers, setIncomingOffers] = useState([
    { id: 1, buyer: '0x1234...5678', amount: '2.0 GB', offer: '25 MBD', duration: '1 day' },
    { id: 2, buyer: '0x9876...5432', amount: '4.5 GB', offer: '60 MBD', duration: '5 days' },
  ]);
  const { toast } = useToast();

  const availableOffers = [
    { id: 1, seller: '0xabcd...efgh', amount: '10.0 GB', price: '10 MBD/GB', duration: '14 days', rating: 4.8 },
    { id: 2, seller: '0x5678...1234', amount: '7.5 GB', price: '13 MBD/GB', duration: '7 days', rating: 4.9 },
    { id: 3, seller: '0x9999...8888', amount: '15.2 GB', price: '9 MBD/GB', duration: '30 days', rating: 4.7 },
  ];

  const handleCreateListing = () => {
    if (!sellAmount || !sellPrice || !sellDuration) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const newListing = {
      id: activeListings.length + 1,
      amount: `${sellAmount} GB`,
      price: `${sellPrice} MBD/GB`,
      duration: `${sellDuration} days`,
      status: 'Active'
    };

    setActiveListings([...activeListings, newListing]);
    setGbBalance(prev => ({
      ...prev,
      available: prev.available - parseFloat(sellAmount),
      listed: prev.listed + parseFloat(sellAmount)
    }));

    setSellAmount('');
    setSellPrice('');
    setSellDuration('');
    setShowSellForm(false);

    toast({
      title: "Listing Created",
      description: `Successfully listed ${sellAmount} GB for ${sellPrice} MBD/GB`,
    });
  };

  const handleManageListing = (listingId: number) => {
    toast({
      title: "Manage Listing",
      description: `Managing listing #${listingId}`,
    });
  };

  const handleAcceptOffer = (offerId: number) => {
    const offer = incomingOffers.find(o => o.id === offerId);
    if (offer) {
      setIncomingOffers(incomingOffers.filter(o => o.id !== offerId));
      toast({
        title: "Offer Accepted",
        description: `Accepted offer for ${offer.amount} from ${offer.buyer}`,
      });
    }
  };

  const handleDeclineOffer = (offerId: number) => {
    const offer = incomingOffers.find(o => o.id === offerId);
    if (offer) {
      setIncomingOffers(incomingOffers.filter(o => o.id !== offerId));
      toast({
        title: "Offer Declined",
        description: `Declined offer from ${offer.buyer}`,
      });
    }
  };

  const handleBuyBandwidth = (offer: any) => {
    toast({
      title: "Purchase Initiated",
      description: `Purchasing ${offer.amount} from ${offer.seller}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2 animate-fade-in">Bandwidth Marketplace</h1>
          <p className="text-white/70 animate-fade-in" style={{animationDelay: '0.1s'}}>
            Trade your unused bandwidth with others in the network
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User GB Balance & Sell Form */}
          <div className="lg:col-span-1 space-y-6">
            {/* GB Balance */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="text-white">Your GB Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-white/80">
                    <span>Available:</span>
                    <span className="text-green-400 font-semibold">{gbBalance.available} GB</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Listed:</span>
                    <span className="text-blue-400 font-semibold">{gbBalance.listed} GB</span>
                  </div>
                  <div className="flex justify-between text-white/80">
                    <span>Reserved:</span>
                    <span className="text-orange-400 font-semibold">{gbBalance.reserved} GB</span>
                  </div>
                </div>
                <Button 
                  onClick={() => setShowSellForm(!showSellForm)}
                  className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Sell GB
                </Button>
              </CardContent>
            </Card>

            {/* Sell GB Form */}
            {showSellForm && (
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-white">Sell GB Form</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="amount" className="text-white/80">Amount (GB)</Label>
                    <Input 
                      id="amount"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      placeholder="e.g., 5.0"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="price" className="text-white/80">Price (MBD per GB)</Label>
                    <Input 
                      id="price"
                      value={sellPrice}
                      onChange={(e) => setSellPrice(e.target.value)}
                      placeholder="e.g., 12"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="duration" className="text-white/80">Duration (days)</Label>
                    <Input 
                      id="duration"
                      value={sellDuration}
                      onChange={(e) => setSellDuration(e.target.value)}
                      placeholder="e.g., 7"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                    <div className="text-white/80 text-sm mb-1">Smart Contract Preview:</div>
                    <div className="text-white text-sm">
                      • Amount: {sellAmount || '0'} GB<br/>
                      • Total: {sellAmount && sellPrice ? (parseFloat(sellAmount) * parseFloat(sellPrice)).toFixed(1) : '0'} MBD<br/>
                      • Escrow: Auto-release on completion
                    </div>
                  </div>
                  <Button 
                    onClick={handleCreateListing}
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-600"
                  >
                    Create Listing
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search and Filters */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.3s'}}>
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Input 
                      placeholder="Search listings..."
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                  <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white/80 hover:bg-white/10">
                    <Search className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Active Listings */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.4s'}}>
              <CardHeader>
                <CardTitle className="text-white">Your Active Listings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {activeListings.map((listing) => (
                    <div key={listing.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">{listing.amount}</div>
                          <div className="text-white/70 text-sm">{listing.price} • {listing.duration}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm">{listing.status}</span>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white/80"
                            onClick={() => handleManageListing(listing.id)}
                          >
                            Manage
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Incoming Offers */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.5s'}}>
              <CardHeader>
                <CardTitle className="text-white">Incoming Offers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {incomingOffers.map((offer) => (
                    <div key={offer.id} className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-white font-medium">{offer.buyer}</div>
                          <div className="text-white/70 text-sm">
                            Wants {offer.amount} for {offer.offer} • {offer.duration}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => handleAcceptOffer(offer.id)}
                          >
                            Accept
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white/80"
                            onClick={() => handleDeclineOffer(offer.id)}
                          >
                            Decline
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Offers */}
            <Card className="bg-white/10 backdrop-blur-sm border-white/20 animate-fade-in" style={{animationDelay: '0.6s'}}>
              <CardHeader>
                <CardTitle className="text-white">Available Bandwidth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {availableOffers.map((offer) => (
                    <div key={offer.id} className="p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Zap className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-medium">{offer.amount}</span>
                            <Shield className="w-4 h-4 text-green-400" />
                            <span className="text-white/70 text-sm">★ {offer.rating}</span>
                          </div>
                          <div className="text-white/70 text-sm mb-2">
                            Seller: {offer.seller}
                          </div>
                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-blue-400">{offer.price}</span>
                            <span className="text-white/70 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {offer.duration}
                            </span>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                          onClick={() => handleBuyBandwidth(offer)}
                        >
                          <ArrowUpRight className="w-4 h-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BandwidthMarketplace;
