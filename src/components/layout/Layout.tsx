
import React, { useState, ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ChevronLeft,
  LayoutDashboard,
  Wallet,
  BarChart3,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  User,
  Search
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Chatbot from '../chatbot/Chatbot';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6d28d9&color=fff'
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/home', icon: LayoutDashboard },
    { name: 'Transactions', href: '/transactions', icon: Wallet },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'News & Tips', href: '/news', icon: Newspaper },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleChatbot = () => setChatbotOpen(!chatbotOpen);

  const handleLogout = () => {
    // In a real app, handle logout logic here
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex overflow-hidden">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <button
          className="p-2 rounded-lg bg-fiscal-purple-800/70 text-white hover:bg-fiscal-purple-700/80 transition-colors backdrop-blur-md"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 bg-sidebar transition-transform duration-300 ease-in-out transform lg:translate-x-0 border-r border-white/10",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <Link to="/home" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-fiscal-purple-600 flex items-center justify-center animate-pulse-glow">
                <span className="text-white font-bold">FF</span>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-fiscal-purple-300">
                Fiscal Freshers
              </span>
            </Link>
          </div>
          
          <div className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-none">
            <nav className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                      isActive 
                        ? "bg-fiscal-purple-500/20 text-white" 
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <item.icon 
                      className={cn(
                        "mr-3 h-5 w-5 transition-colors",
                        isActive ? "text-fiscal-purple-400" : "text-gray-400"
                      )} 
                    />
                    <span>{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-1.5 h-5 rounded-full bg-fiscal-purple-500" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="p-4 mt-auto border-t border-white/10">
            <div className="flex items-center">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-10 w-10 rounded-full mr-3 border border-white/20"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user.name}</p>
                <p className="text-xs text-gray-400 truncate">{user.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className={cn(
        "flex-1 transition-all duration-300 relative",
        sidebarOpen ? "lg:ml-64 ml-0" : "ml-0"
      )}>
        {/* Top bar */}
        <div className="h-16 flex items-center justify-between px-4 lg:px-8 border-b border-white/10 backdrop-blur-md bg-secondary/30 fixed top-0 right-0 left-0 z-10 lg:left-64">
          {/* Page title */}
          <div className="flex items-center">
            <h1 className="text-lg font-medium">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
          </div>
          
          {/* Search bar and actions */}
          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-lg bg-secondary/50 border border-white/10 focus:outline-none focus:ring-1 focus:ring-fiscal-purple-500 text-white text-sm w-60"
              />
            </div>
            
            <button className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-fiscal-purple-500"></span>
            </button>
            
            <button 
              onClick={toggleChatbot}
              className={cn(
                "p-2 rounded-lg transition-colors",
                chatbotOpen 
                  ? "bg-fiscal-purple-600 text-white" 
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              <User size={20} />
            </button>
          </div>
        </div>
        
        {/* Page content */}
        <main className="pt-16 min-h-screen">
          <div className="container py-8 max-w-7xl mx-auto animate-fade-in">
            {children}
          </div>
        </main>

        {/* Chatbot */}
        <Chatbot isOpen={chatbotOpen} onClose={toggleChatbot} />
      </div>
    </div>
  );
};

export default Layout;
