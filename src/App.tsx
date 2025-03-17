import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, createContext, useContext } from "react";
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

export interface Transaction {
  id: string;
  type: 'expense' | 'income';
  amount: number;
  category: string;
  description: string;
  date: string;
}

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  isTransactionFormOpen: boolean;
  openTransactionForm: () => void;
  closeTransactionForm: () => void;
};

export const TransactionContext = createContext<TransactionContextType | null>(null);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};

const App = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      type: 'expense',
      amount: 2000,
      category: 'Food & Dining',
      description: 'Dinner with friends',
      date: '2023-11-15'
    },
    {
      id: '2',
      type: 'expense',
      amount: 1200,
      category: 'Transport',
      description: 'Uber rides',
      date: '2023-11-12'
    },
    {
      id: '3',
      type: 'income',
      amount: 15000,
      category: 'Salary/Stipend',
      description: 'November stipend',
      date: '2023-11-01'
    }
  ]);
  
  const [isTransactionFormOpen, setIsTransactionFormOpen] = useState(false);

  const openTransactionForm = () => setIsTransactionFormOpen(true);
  const closeTransactionForm = () => setIsTransactionFormOpen(false);
  
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction = {
      ...transaction,
      id: Date.now().toString()
    };
    
    setTransactions(prev => [...prev, newTransaction]);
    
    queryClient.invalidateQueries();
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TransactionContext.Provider 
        value={{ 
          transactions, 
          addTransaction,
          isTransactionFormOpen,
          openTransactionForm,
          closeTransactionForm
        }}
      >
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              
              <Route path="/login" element={<AuthForms formType="login" />} />
              <Route path="/signup" element={<AuthForms formType="signup" />} />
              
              <Route path="/home" element={<Layout><Dashboard /></Layout>} />
              <Route path="/transactions" element={
                <Layout>
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
                    
                    {transactions.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {transactions.map(transaction => (
                          <div key={transaction.id} className="dashboard-card">
                            <div className="flex justify-between items-center mb-2">
                              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                                transaction.type === 'income' ? 'bg-fiscal-teal/20 text-fiscal-teal' : 'bg-fiscal-rose/20 text-fiscal-rose'
                              }`}>
                                {transaction.type === 'income' ? 'Income' : 'Expense'}
                              </span>
                              <span className="text-gray-400 text-sm">{new Date(transaction.date).toLocaleDateString('en-IN')}</span>
                            </div>
                            <h3 className="text-lg font-semibold mb-1">{transaction.description}</h3>
                            <div className="flex justify-between items-center">
                              <span className="text-gray-400">{transaction.category}</span>
                              <span className={`text-xl font-bold ${
                                transaction.type === 'income' ? 'text-fiscal-teal' : 'text-fiscal-rose'
                              }`}>
                                {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
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
                    )}
                  </div>
                  <TransactionForm 
                    isOpen={isTransactionFormOpen} 
                    onClose={closeTransactionForm} 
                  />
                </Layout>
              } />
              <Route path="/analytics" element={<Layout><AnalyticsView /></Layout>} />
              <Route path="/settings" element={<Layout><Settings /></Layout>} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </TransactionContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
