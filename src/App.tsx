
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Layout from "./components/layout/Layout";
import Dashboard from "./components/dashboard/Dashboard";
import AnalyticsView from "./components/analytics/AnalyticsView";
import TransactionForm from "./components/transactions/TransactionForm";
import AuthForms from "./components/auth/AuthForms";
import Settings from "./pages/Settings";

const queryClient = new QueryClient();

const App = () => {
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const openTransactionForm = () => setIsTransactionFormOpen(true);
  const closeTransactionForm = () => setIsTransactionFormOpen(false);

  return (
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
            <Route path="/transactions" element={
              <Layout>
                <>
                  <div className="p-6">
                    <h1 className="text-2xl font-bold text-white mb-4">Transactions</h1>
                    <button 
                      onClick={openTransactionForm}
                      className="bg-fiscal-purple-500 text-white px-4 py-2 rounded-lg hover:bg-fiscal-purple-600"
                    >
                      Add New Transaction
                    </button>
                  </div>
                  <TransactionForm isOpen={isTransactionFormOpen} onClose={closeTransactionForm} />
                </>
              </Layout>
            } />
            <Route path="/analytics" element={<Layout><AnalyticsView /></Layout>} />
            <Route path="/settings" element={<Layout><Settings /></Layout>} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
