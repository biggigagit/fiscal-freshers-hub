
import React, { useState } from 'react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';
import { Calendar, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

// Mock prediction data
const predictionData = {
  nextMonth: {
    predictedExpenses: 10250,
    predictedIncome: 25500,
    savingsPotential: 15250,
    confidence: 85,
    expenseBreakdown: [
      { category: 'Rent/PG', amount: 5000, change: 0 },
      { category: 'Food & Dining', amount: 1950, change: 8.3 },
      { category: 'Transport', amount: 850, change: 6.2 },
      { category: 'Entertainment', amount: 1280, change: 6.7 },
      { category: 'Shopping', amount: 600, change: 20 },
      { category: 'Other', amount: 570, change: 104 }
    ]
  }
};

const AnalyticsView = () => {
  const [timeframe, setTimeframe] = useState('3month');
  
  // Mock data
  const monthlyData = {
    '3month': [
      { month: 'Mar', income: 24000, expenses: 8200, savings: 15800 },
      { month: 'Apr', income: 24500, expenses: 8800, savings: 15700 },
      { month: 'May', income: 25000, expenses: 9580, savings: 15420 },
    ],
    '6month': [
      { month: 'Dec', income: 22500, expenses: 7800, savings: 14700 },
      { month: 'Jan', income: 23000, expenses: 8500, savings: 14500 },
      { month: 'Feb', income: 23500, expenses: 9000, savings: 14500 },
      { month: 'Mar', income: 24000, expenses: 8200, savings: 15800 },
      { month: 'Apr', income: 24500, expenses: 8800, savings: 15700 },
      { month: 'May', income: 25000, expenses: 9580, savings: 15420 },
    ],
    '1year': [
      { month: 'Jun', income: 20000, expenses: 7500, savings: 12500 },
      { month: 'Jul', income: 20000, expenses: 7800, savings: 12200 },
      { month: 'Aug', income: 20500, expenses: 8200, savings: 12300 },
      { month: 'Sep', income: 21000, expenses: 7800, savings: 13200 },
      { month: 'Oct', income: 21500, expenses: 7500, savings: 14000 },
      { month: 'Nov', income: 22000, expenses: 7600, savings: 14400 },
      { month: 'Dec', income: 22500, expenses: 7800, savings: 14700 },
      { month: 'Jan', income: 23000, expenses: 8500, savings: 14500 },
      { month: 'Feb', income: 23500, expenses: 9000, savings: 14500 },
      { month: 'Mar', income: 24000, expenses: 8200, savings: 15800 },
      { month: 'Apr', income: 24500, expenses: 8800, savings: 15700 },
      { month: 'May', income: 25000, expenses: 9580, savings: 15420 },
    ]
  };

  const categoryData = [
    { category: 'Rent/PG', amount: 5000, percentage: 52 },
    { category: 'Food & Dining', amount: 1800, percentage: 19 },
    { category: 'Transport', amount: 800, percentage: 8 },
    { category: 'Entertainment', amount: 1200, percentage: 13 },
    { category: 'Shopping', amount: 500, percentage: 5 },
    { category: 'Other', amount: 280, percentage: 3 }
  ];

  const savingsTrendData = [
    { month: 'Dec', amount: 14700 },
    { month: 'Jan', amount: 14500 },
    { month: 'Feb', amount: 14500 },
    { month: 'Mar', amount: 15800 },
    { month: 'Apr', amount: 15700 },
    { month: 'May', amount: 15420 },
  ];

  const COLORS = ['#8b5cf6', '#06b6d4', '#f43f5e', '#fb923c', '#34d399', '#94a3b8'];

  const spendingHabitsData = [
    { subject: 'Morning', amount: 1200 },
    { subject: 'Afternoon', amount: 1800 },
    { subject: 'Evening', amount: 2500 },
    { subject: 'Night', amount: 1500 },
    { subject: 'Weekend', amount: 3800 },
    { subject: 'Weekday', amount: 5780 },
  ];

  // Helper function to format currency in Indian Rupees
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-1">Financial Analytics</h2>
          <p className="text-gray-400">Track your financial progress and predict future expenses</p>
        </div>
        <div className="flex items-center space-x-2">
          <select 
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-secondary/70 border border-white/10 rounded-lg px-4 py-2 text-sm"
          >
            <option value="3month">Last 3 Months</option>
            <option value="6month">Last 6 Months</option>
            <option value="1year">Last Year</option>
          </select>
        </div>
      </div>

      {/* Income, Expenses and Savings Trends */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium">Financial Overview</h3>
          <div className="flex items-center text-sm text-gray-400">
            <Calendar size={16} className="mr-2" />
            {timeframe === '3month' ? 'Last 3 Months' : timeframe === '6month' ? 'Last 6 Months' : 'Last Year'}
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData[timeframe as keyof typeof monthlyData]}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
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
              <Legend iconType="circle" />
              <Line 
                type="monotone" 
                dataKey="income" 
                stroke="#8b5cf6" 
                strokeWidth={3}
                dot={{ fill: '#8b5cf6', r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                name="Income"
              />
              <Line 
                type="monotone" 
                dataKey="expenses" 
                stroke="#f43f5e" 
                strokeWidth={3}
                dot={{ fill: '#f43f5e', r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                name="Expenses"
              />
              <Line 
                type="monotone" 
                dataKey="savings" 
                stroke="#0d9488" 
                strokeWidth={3}
                dot={{ fill: '#0d9488', r: 6 }}
                activeDot={{ r: 8, strokeWidth: 2 }}
                name="Savings"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Categories and Predictions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Expense distribution */}
        <div className="dashboard-card">
          <h3 className="text-lg font-medium mb-6">Expense Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="amount"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
            <div className="space-y-3">
              {categoryData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{formatCurrency(item.amount)}</p>
                    <p className="text-xs text-gray-400">{item.percentage}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right column - ML Prediction */}
        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium">Next Month Prediction</h3>
            <span className="px-2 py-1 rounded bg-fiscal-purple-800/40 text-fiscal-purple-300 text-xs font-medium">
              {predictionData.nextMonth.confidence}% Confidence
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="stat-card">
              <p className="text-xs text-gray-400">Predicted Expenses</p>
              <p className="text-xl font-bold">{formatCurrency(predictionData.nextMonth.predictedExpenses)}</p>
              <div className="flex items-center text-fiscal-rose text-xs">
                <ArrowUpRight size={14} className="mr-1" />
                <span>+7.1% from current</span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-xs text-gray-400">Predicted Income</p>
              <p className="text-xl font-bold">{formatCurrency(predictionData.nextMonth.predictedIncome)}</p>
              <div className="flex items-center text-fiscal-teal text-xs">
                <ArrowUpRight size={14} className="mr-1" />
                <span>+1.9% from current</span>
              </div>
            </div>
            
            <div className="stat-card">
              <p className="text-xs text-gray-400">Savings Potential</p>
              <p className="text-xl font-bold">{formatCurrency(predictionData.nextMonth.savingsPotential)}</p>
              <div className="flex items-center text-fiscal-rose text-xs">
                <ArrowDownRight size={14} className="mr-1" />
                <span>-1.2% from current</span>
              </div>
            </div>
          </div>
          
          <h4 className="text-sm font-medium text-gray-300 mb-3">Predicted Expense Breakdown</h4>
          <div className="space-y-3">
            {predictionData.nextMonth.expenseBreakdown.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm">{item.category}</span>
                </div>
                <div className="text-right flex items-center">
                  <p className="text-sm font-medium mr-3">{formatCurrency(item.amount)}</p>
                  {item.change !== 0 && (
                    <div className={`flex items-center text-xs ${item.change > 0 ? 'text-fiscal-rose' : 'text-fiscal-teal'}`}>
                      {item.change > 0 ? (
                        <ArrowUpRight size={12} className="mr-0.5" />
                      ) : (
                        <ArrowDownRight size={12} className="mr-0.5" />
                      )}
                      <span>{Math.abs(item.change)}%</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Spending Habits */}
        <div className="dashboard-card">
          <h3 className="text-lg font-medium mb-6">Spending Habits</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={spendingHabitsData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8' }} />
                <PolarRadiusAxis tick={{ fill: '#94a3b8' }} />
                <Radar
                  name="Amount Spent"
                  dataKey="amount"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.3}
                />
                <Tooltip
                  formatter={(value) => [`$${value}`, 'Amount Spent']}
                  contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                  itemStyle={{ color: '#fff' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Savings Trend */}
        <div className="dashboard-card">
          <h3 className="text-lg font-medium mb-6">Savings Trend</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={savingsTrendData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
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
                  formatter={(value) => [`$${value}`, 'Savings']}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar 
                  dataKey="amount" 
                  fill="#0d9488" 
                  radius={[4, 4, 0, 0]}
                  name="Savings"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsView;
