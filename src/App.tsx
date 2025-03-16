
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
import { Plus } from "lucide-react";

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
                    <div className="flex justify-between items-center mb-6">
                      <h1 className="text-2xl font-bold text-white">Transactions</h1>
                      <button 
                        onClick={openTransactionForm}
                        className="bg-fiscal-purple-500 hover:bg-fiscal-purple-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg transition-all duration-300 hover:shadow-fiscal-purple-400/20 hover:scale-105"
                      >
                        <Plus size={20} />
                        Add Transaction
                      </button>
                    </div>
                    
                    <div className="dashboard-card text-center py-20">
                      <img src="/placeholder.svg" alt="No transactions" className="w-24 h-24 mx-auto mb-6 opacity-30" />
                      <h3 className="text-xl font-semibold mb-2">No transactions yet</h3>
                      <p className="text-gray-400 mb-6">Add your first income or expense to start tracking</p>
                      <button 
                        onClick={openTransactionForm}
                        className="inline-flex items-center gap-2 bg-fiscal-purple-500 hover:bg-fiscal-purple-600 text-white px-6 py-3 rounded-lg shadow-lg transition-all duration-300"
                      >
                        <Plus size={20} />
                        Add Your First Transaction
                      </button>
                    </div>
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
