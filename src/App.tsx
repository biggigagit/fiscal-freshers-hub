
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import AnalyticsView from "./components/analytics/AnalyticsView";
import TransactionForm from "./components/transactions/TransactionForm";
import AuthForms from "./components/auth/AuthForms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Auth Routes */}
          <Route path="/login" element={<AuthForms formType="login" />} />
          <Route path="/signup" element={<AuthForms formType="signup" />} />
          
          {/* App Routes */}
          <Route path="/home" element={<Layout><Dashboard /></Layout>} />
          <Route path="/transactions" element={<Layout><TransactionForm /></Layout>} />
          <Route path="/analytics" element={<Layout><AnalyticsView /></Layout>} />
          <Route path="/settings" element={<Layout><div className="text-white p-6">Settings page content will go here</div></Layout>} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
