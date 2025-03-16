
import React, { useState } from 'react';
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

const Dashboard = () => {
  const [showTransactionForm, setShowTransactionForm] = useState(false);

  // Mock data with Indian Rupees
  const balanceData = {
    currentBalance: 15420.50,
    income: 25000,
    expenses: 9579.50,
    savingsGoal: 50000,
    savings: 12500
  };

  const spendingData = [
    { name: 'Rent/PG', value: 5000, color: '#8b5cf6' },
    { name: 'Food & Dining', value: 1800, color: '#06b6d4' },
    { name: 'Transport', value: 800, color: '#f43f5e' },
    { name: 'Entertainment', value: 1200, color: '#fb923c' },
    { name: 'Shopping', value: 500, color: '#34d399' },
    { name: 'Other', value: 279.50, color: '#94a3b8' }
  ];

  const monthlyData = [
    { month: 'Jan', income: 23000, expenses: 8500 },
    { month: 'Feb', income: 23500, expenses: 9000 },
    { month: 'Mar', income: 24000, expenses: 8200 },
    { month: 'Apr', income: 24500, expenses: 8800 },
    { month: 'May', income: 25000, expenses: 9579.50 },
    { month: 'Jun', income: 0, expenses: 0 },
  ];

  const recentTransactions = [
    { id: 1, name: 'PG Rent', amount: -5000, category: 'Housing', date: '2023-05-01', icon: Home },
    { id: 2, name: 'Swiggy Order', amount: -450, category: 'Food', date: '2023-05-03', icon: Utensils },
    { id: 3, name: 'Stipend', amount: 25000, category: 'Income', date: '2023-05-05', icon: DollarSign },
    { id: 4, name: 'Cafe Coffee Day', amount: -280, category: 'Food', date: '2023-05-07', icon: Coffee },
    { id: 5, name: 'Myntra Purchase', amount: -1200, category: 'Shopping', date: '2023-05-10', icon: ShoppingBag },
  ];

  const upcomingBills = [
    { id: 1, name: 'Mobile Recharge', amount: 349, dueDate: '2023-06-15' },
    { id: 2, name: 'Netflix Subscription', amount: 199, dueDate: '2023-06-20' },
    { id: 3, name: 'Electricity Bill', amount: 850, dueDate: '2023-06-25' },
  ];

  // Helper function to format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(amount);
  };

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
            <span className="text-fiscal-teal flex items-center">
              <TrendingUp size={16} className="mr-1" /> 12%
            </span>
            <span className="text-gray-400 ml-2">from last month</span>
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
              <TrendingUp size={16} className="mr-1" /> 2%
            </span>
            <span className="text-gray-400 ml-2">from last month</span>
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
              <TrendingDown size={16} className="mr-1" /> 5%
            </span>
            <span className="text-gray-400 ml-2">from last month</span>
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
                style={{ width: `${savingsProgress}%` }}
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
            <select className="bg-secondary/70 border border-white/10 rounded-lg px-3 py-1 text-sm">
              <option>Last 6 Months</option>
              <option>Last 3 Months</option>
              <option>Last Year</option>
            </select>
          </div>
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
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                  formatter={(value) => [`$${value}`, '']}
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
        </div>

        {/* Spending Categories Pie Chart */}
        <div className="dashboard-card">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-medium">Spending Categories</h3>
            <select className="bg-secondary/70 border border-white/10 rounded-lg px-3 py-1 text-sm">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
            </select>
          </div>
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
                  formatter={(value) => [`$${value}`, 'Amount']}
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
        </div>
      </div>

      {/* Recent Transactions and Upcoming Bills */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="dashboard-card lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Recent Transactions</h3>
            <button 
              onClick={() => setShowTransactionForm(true)}
              className="flex items-center text-sm text-fiscal-purple-400 hover:text-fiscal-purple-300"
            >
              <Plus size={18} className="mr-1" /> Add New
            </button>
          </div>
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
          <button className="w-full mt-4 py-2 border border-white/10 rounded-lg text-sm text-gray-400 hover:bg-white/5 transition-colors">
            View All Transactions
          </button>
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
      {showTransactionForm && (
        <TransactionForm 
          isOpen={showTransactionForm} 
          onClose={() => setShowTransactionForm(false)} 
        />
      )}
    </div>
  );
};

export default Dashboard;
