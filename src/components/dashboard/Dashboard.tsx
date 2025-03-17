
import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  PiggyBank, 
  Calendar, 
  ChevronRight, 
  Plus, 
  CreditCard, 
  Wallet, 
  Gift, 
  ShoppingBag, 
  Coffee, 
  Home,
  Utensils,
  Smartphone,
  BookOpen,
  Music
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import TransactionForm from '../transactions/TransactionForm';
import { useTransactions } from '@/App';

const Dashboard = () => {
  const { transactions, openTransactionForm, isTransactionFormOpen, closeTransactionForm } = useTransactions();
  
  // Helper function to format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

  // Calculate balances from transactions
  const balanceData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    let income = 0;
    let expenses = 0;
    
    // Filter transactions for current month
    const currentMonthTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    // Calculate income and expenses
    currentMonthTransactions.forEach(transaction => {
      if (transaction.type === 'income') {
        income += transaction.amount;
      } else {
        expenses += transaction.amount;
      }
    });
    
    const currentBalance = transactions.reduce((total, transaction) => {
      return transaction.type === 'income' 
        ? total + transaction.amount 
        : total - transaction.amount;
    }, 0);
    
    return {
      currentBalance,
      income,
      expenses,
      savingsGoal: 50000,
      savings: income - expenses > 0 ? income - expenses : 0
    };
  }, [transactions]);

  // Generate spending category data
  const spendingData = useMemo(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Get all expense transactions for current month
    const currentMonthExpenses = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      return transaction.type === 'expense' && 
             transactionDate.getMonth() === currentMonth && 
             transactionDate.getFullYear() === currentYear;
    });
    
    // Group by category and sum amounts
    const categoryTotals: Record<string, number> = {};
    
    currentMonthExpenses.forEach(transaction => {
      if (categoryTotals[transaction.category]) {
        categoryTotals[transaction.category] += transaction.amount;
      } else {
        categoryTotals[transaction.category] = transaction.amount;
      }
    });
    
    // Generate chart data with colors
    const colors = ['#8b5cf6', '#06b6d4', '#f43f5e', '#fb923c', '#34d399', '#94a3b8'];
    
    return Object.entries(categoryTotals).map(([category, value], index) => ({
      name: category,
      value,
      color: colors[index % colors.length]
    }));
  }, [transactions]);

  // Generate monthly trends data
  const monthlyData = useMemo(() => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Initialize data for last 6 months
    const data = [];
    for (let i = 5; i >= 0; i--) {
      let month = currentMonth - i;
      let year = currentYear;
      
      if (month < 0) {
        month += 12;
        year -= 1;
      }
      
      data.push({
        month: monthNames[month],
        income: 0,
        expenses: 0,
        actualMonth: month,
        actualYear: year
      });
    }
    
    // Calculate income and expenses for each month
    transactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const transactionMonth = transactionDate.getMonth();
      const transactionYear = transactionDate.getFullYear();
      
      const monthData = data.find(d => 
        d.actualMonth === transactionMonth && d.actualYear === transactionYear
      );
      
      if (monthData) {
        if (transaction.type === 'income') {
          monthData.income += transaction.amount;
        } else {
          monthData.expenses += transaction.amount;
        }
      }
    });
    
    // Clean up the data by removing actualMonth and actualYear which were just for calculations
    return data.map(({ month, income, expenses }) => ({ month, income, expenses }));
  }, [transactions]);

  // Get recent transactions
  const recentTransactions = useMemo(() => {
    // Sort transactions by date (newest first)
    const sorted = [...transactions].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Take most recent 5
    return sorted.slice(0, 5).map(transaction => {
      // Determine icon based on category
      let Icon = DollarSign;
      
      if (transaction.category === 'Housing' || transaction.category === 'Rent/PG') {
        Icon = Home;
      } else if (transaction.category === 'Food & Dining' || transaction.category === 'Food') {
        Icon = Utensils;
      } else if (transaction.category === 'Shopping') {
        Icon = ShoppingBag;
      } else if (transaction.category === 'Transport') {
        Icon = CreditCard;
      } else if (transaction.category === 'Entertainment') {
        Icon = Music;
      } else if (transaction.category.includes('Coffee') || transaction.category.includes('Cafe')) {
        Icon = Coffee;
      }
      
      return {
        id: transaction.id,
        name: transaction.description,
        amount: transaction.type === 'income' ? transaction.amount : -transaction.amount,
        category: transaction.category,
        date: transaction.date,
        icon: Icon
      };
    });
  }, [transactions]);

  // Mock upcoming bills (this would normally come from a separate bills feature)
  const upcomingBills = [
    { id: 1, name: 'Mobile Recharge', amount: 349, dueDate: '2023-06-15' },
    { id: 2, name: 'Netflix Subscription', amount: 199, dueDate: '2023-06-20' },
    { id: 3, name: 'Electricity Bill', amount: 850, dueDate: '2023-06-25' },
  ];

  // Format date helper
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-IN', {
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  // Calculate savings progress
  const savingsProgress = (balanceData.savings / balanceData.savingsGoal) * 100;

  return (
    <div className="space-y-8">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="dashboard-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400">Current Balance</p>
              <h3 className="text-2xl font-bold">{formatCurrency(balanceData.currentBalance)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-fiscal-purple-800/40">
              <Wallet className="h-5 w-5 text-fiscal-purple-400" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className={`${balanceData.currentBalance >= 0 ? 'text-fiscal-teal' : 'text-fiscal-rose'} flex items-center`}>
              {balanceData.currentBalance >= 0 ? <TrendingUp size={16} className="mr-1" /> : <TrendingDown size={16} className="mr-1" />}
              {Math.abs(balanceData.currentBalance) > 0 ? 'Active' : 'No change'}
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400">Monthly Income</p>
              <h3 className="text-2xl font-bold">{formatCurrency(balanceData.income)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-fiscal-teal-dark/40">
              <DollarSign className="h-5 w-5 text-fiscal-teal-light" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-fiscal-teal flex items-center">
              <TrendingUp size={16} className="mr-1" /> Active
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400">Monthly Expenses</p>
              <h3 className="text-2xl font-bold">{formatCurrency(balanceData.expenses)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-fiscal-rose-dark/40">
              <CreditCard className="h-5 w-5 text-fiscal-rose-light" />
            </div>
          </div>
          <div className="flex items-center text-sm">
            <span className="text-fiscal-rose flex items-center">
              <TrendingUp size={16} className="mr-1" /> Active
            </span>
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-400">Savings Goal</p>
              <h3 className="text-2xl font-bold">{formatCurrency(balanceData.savings)}</h3>
            </div>
            <div className="p-3 rounded-lg bg-fiscal-purple-800/40">
              <PiggyBank className="h-5 w-5 text-fiscal-purple-400" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress</span>
              <span className="text-white">{savingsProgress.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-secondary rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-fiscal-purple-700 to-fiscal-purple-500 h-2 rounded-full"
                style={{ width: `${Math.min(savingsProgress, 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts and Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Income/Expense Chart */}
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Income vs Expenses</h3>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span className="text-sm text-gray-400">Last 6 Months</span>
            </div>
          </div>
          {monthlyData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={monthlyData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#e11d48" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#e11d48" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" tick={{ fill: '#94a3b8' }} axisLine={{ stroke: 'rgba(255,255,255,0.1)' }} />
                  <YAxis 
                    tick={{ fill: '#94a3b8' }} 
                    axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                    tickFormatter={(value) => `₹${value}`}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                    itemStyle={{ color: '#fff' }}
                    formatter={(value) => [`₹${value}`, '']}
                    labelStyle={{ color: '#94a3b8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="income" 
                    stroke="#8b5cf6" 
                    fill="url(#colorIncome)" 
                    activeDot={{ r: 6 }}
                    name="Income"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#e11d48" 
                    fill="url(#colorExpenses)"
                    name="Expenses"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-80 text-center">
              <p className="text-gray-400 mb-4">No transaction data available yet</p>
              <button 
                onClick={openTransactionForm}
                className="px-4 py-2 bg-fiscal-purple-500 text-white rounded-lg hover:bg-fiscal-purple-600 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Transaction
              </button>
            </div>
          )}
        </div>

        {/* Spending Categories Pie Chart */}
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Spending Categories</h3>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2 text-gray-400" />
              <span className="text-sm text-gray-400">This Month</span>
            </div>
          </div>
          {spendingData.length > 0 ? (
            <>
              <div className="h-60 mb-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={spendingData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={false}
                    >
                      {spendingData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`₹${value}`, 'Amount']}
                      contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {spendingData.map((category, index) => (
                  <div key={index} className="flex items-center text-xs">
                    <div className="h-3 w-3 rounded-full mr-1" style={{ backgroundColor: category.color }}></div>
                    <span className="text-gray-300 truncate">{category.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-60 text-center">
              <p className="text-gray-400 mb-4">No expense data available yet</p>
              <button 
                onClick={openTransactionForm}
                className="px-4 py-2 bg-fiscal-purple-500 text-white rounded-lg hover:bg-fiscal-purple-600 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Expense
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions and Upcoming Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <button 
              onClick={openTransactionForm}
              className="flex items-center text-sm text-fiscal-purple-400 hover:text-fiscal-purple-300"
            >
              <Plus size={18} className="mr-1" /> Add New
            </button>
          </div>
          {recentTransactions.length > 0 ? (
            <div className="space-y-1">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="flex items-center">
                    <div className={`p-2 rounded-lg mr-3 ${transaction.amount > 0 ? 'bg-fiscal-teal-dark/30' : 'bg-fiscal-rose-dark/30'}`}>
                      <transaction.icon size={18} className={transaction.amount > 0 ? 'text-fiscal-teal' : 'text-fiscal-rose'} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{transaction.name}</p>
                      <p className="text-xs text-gray-400">{transaction.category} • {formatDate(transaction.date)}</p>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${transaction.amount > 0 ? 'text-fiscal-teal' : 'text-fiscal-rose'}`}>
                    {transaction.amount > 0 ? '+' : ''}{formatCurrency(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <p className="text-gray-400 mb-4">No transactions recorded yet</p>
              <button 
                onClick={openTransactionForm}
                className="px-4 py-2 bg-fiscal-purple-500 text-white rounded-lg hover:bg-fiscal-purple-600 transition-colors flex items-center"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Transaction
              </button>
            </div>
          )}
          {recentTransactions.length > 0 && (
            <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
              View All Transactions
            </button>
          )}
        </div>

        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Upcoming Bills</h3>
            <button className="text-sm text-fiscal-purple-400 hover:text-fiscal-purple-300">View All</button>
          </div>
          <div className="space-y-4">
            {upcomingBills.map((bill) => (
              <div key={bill.id} className="p-3 border border-white/10 rounded-lg hover:bg-white/5 transition-colors">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-medium">{bill.name}</h4>
                  <span className="font-semibold">{formatCurrency(bill.amount)}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={14} className="mr-1" />
                    Due {formatDate(bill.dueDate)}
                  </div>
                  <button className="text-fiscal-purple-400 hover:text-fiscal-purple-300 flex items-center">
                    Pay Now <ChevronRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
            Add Bill Reminder
          </button>
        </div>
      </div>

      {/* Transaction Form Modal */}
      <TransactionForm 
        isOpen={isTransactionFormOpen} 
        onClose={closeTransactionForm} 
      />
    </div>
  );
};

export default Dashboard;
