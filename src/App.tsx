import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardIndex from "./dashboard/pages/Index";
import MarketPage from "./marketguide/components/market-page";
import NotFound from "./pages/NotFound";
import LoginPage from "./login/app/page.tsx"; 
import GovernmentSchemesPage from "./govscheme/app/page.tsx";
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage/>} /> 
          <Route path="/dashboard" element={<DashboardIndex />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/schemes" element={<GovernmentSchemesPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
