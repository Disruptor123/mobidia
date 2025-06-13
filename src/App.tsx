
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import BandwidthMarketplace from "./pages/BandwidthMarketplace";
import DataMining from "./pages/DataMining";
import Profile from "./pages/Profile";
import DaoGovernance from "./pages/DaoGovernance";
import NotFound from "./pages/NotFound";
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { WagmiProvider } from 'wagmi'
import { arbitrum, mainnet, polygon } from 'wagmi/chains'
const queryClient = new QueryClient();

const projectId = '4a8a24d94e714b4a3640be30ac65b887'
const metadata = {
  name: 'AppKit',
  description: 'AppKit Example',
  url: 'https://web3modal.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet, arbitrum, polygon]
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
})

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  metadata,
  enableAnalytics: true,
})
const App = () => (
  <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/marketplace" element={<BandwidthMarketplace />} />
          <Route path="/data-mining" element={<DataMining />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/dao-governance" element={<DaoGovernance />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </WagmiProvider>
);

export default App;
