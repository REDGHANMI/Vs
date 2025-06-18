
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ParametersProvider } from "@/contexts/ParametersContext";
import Index from "./pages/Index";
import ParametersPage from "./pages/ParametersPage";
import ParametersPageEnhanced from "./pages/ParametersPageEnhanced";
import ExpensesPage from "./pages/ExpensesPage";
import ProfitLossPage from "./pages/ProfitLossPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ParametersProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/parameters" element={<ParametersPage />} />
            <Route path="/parameters-enhanced" element={<ParametersPageEnhanced />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/profit-loss" element={<ProfitLossPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ParametersProvider>
  </QueryClientProvider>
);

export default App;
