import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import DashboardIndex from "./dashboard/pages/Index";
import ChatbotPage from "./dashboard/pages/Chatbot";
import MarketPage from "./marketguide/components/market-page";
import NotFound from "./pages/NotFound";
import LoginPage from "./login/app/page.tsx"; 
import GovernmentSchemesPage from "./govscheme/app/page.tsx";
import PlantHealthApp from "./plant health/app/page";
import { MachineryEquipmentPage } from "./machineyEquipment/components/machiney-equipment-page";
import CropsPage from "./Crop-database/app/crops/page";
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
          <Route path="/chatbot" element={<ChatbotPage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/schemes" element={<GovernmentSchemesPage />} />
          <Route path="/plant-health" element={<PlantHealthApp />} />
          <Route path="/machinery" element={<MachineryEquipmentPage />} />
          <Route path="/crop-database" element={<CropsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
