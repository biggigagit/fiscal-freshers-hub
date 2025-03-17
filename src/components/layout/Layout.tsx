
import React, { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Bell,
  User,
  Search,
  Menu,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Chatbot from '../chatbot/Chatbot';
import { CollapsibleSidebar, SidebarProvider } from './CollapsibleSidebar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  // Mock user data
  const user = {
    name: 'Alex Johnson',
    email: 'alex@example.com',
    avatar: 'https://ui-avatars.com/api/?name=Alex+Johnson&background=6d28d9&color=fff'
  };

  const toggleChatbot = () => setChatbotOpen(!chatbotOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleLogout = () => {
    // In a real app, handle logout logic here
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  return (
    <SidebarProvider defaultOpen={!window.matchMedia('(max-width: 768px)').matches}>
      <div className="min-h-screen bg-background text-foreground flex overflow-hidden w-full">
        {/* Mobile menu button */}
        <div className="fixed top-4 left-4 z-50 md:hidden">
          <button
            className="p-2 rounded-lg bg-fiscal-purple-800/70 text-white hover:bg-fiscal-purple-700/80 transition-colors backdrop-blur-md"
            onClick={toggleMobileMenu}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Sidebar - Mobile menu will use the Sheet component from shadcn */}
        <div className={cn(
          "md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity",
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}>
          <div className={cn(
            "fixed inset-y-0 left-0 w-64 bg-sidebar border-r border-white/10 transition-transform",
            mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}>
            <CollapsibleSidebar 
              user={user} 
              onLogout={handleLogout} 
            />
          </div>
        </div>

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <CollapsibleSidebar 
            user={user} 
            onLogout={handleLogout} 
          />
        </div>

        {/* Main content */}
        <div className="flex-1 relative">
          {/* Top bar */}
          <div className="h-16 flex items-center justify-end px-4 lg:px-8 border-b border-white/10 backdrop-blur-md bg-secondary/30 fixed top-0 right-0 left-0 z-10">
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
    </SidebarProvider>
  );
};

export default Layout;
