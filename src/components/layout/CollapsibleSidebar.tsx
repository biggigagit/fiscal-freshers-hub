
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Wallet,
  BarChart3,
  Newspaper,
  Settings,
  LogOut,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarFooter, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton, 
  SidebarProvider,
  useSidebar
} from '@/components/ui/sidebar';

interface CollapsibleSidebarProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  onLogout: () => void;
}

const navigation = [
  { name: 'Dashboard', href: '/home', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: Wallet },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  { name: 'News & Tips', href: '/news', icon: Newspaper },
  { name: 'Settings', href: '/settings', icon: Settings },
];

// Toggle button that will be shown when sidebar is collapsed
const SidebarToggle = () => {
  const { state, toggleSidebar } = useSidebar();
  
  return (
    <button
      onClick={toggleSidebar}
      className="fixed bottom-4 left-4 z-50 p-2 rounded-full bg-fiscal-purple-600 text-white shadow-lg hover:bg-fiscal-purple-700 transition-colors"
    >
      {state === "collapsed" ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
    </button>
  );
};

const CollapsibleSidebar = ({ user, onLogout }: CollapsibleSidebarProps) => {
  const location = useLocation();
  
  return (
    <>
      <Sidebar className="border-white/10">
        <SidebarHeader className="p-4">
          <Link to="/home" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-fiscal-purple-600 flex items-center justify-center animate-pulse-glow">
              <span className="text-white font-bold">FF</span>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-fiscal-purple-300">
              Fiscal Freshers
            </span>
          </Link>
        </SidebarHeader>
        
        <SidebarContent>
          <SidebarMenu>
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={isActive}
                    tooltip={item.name}
                  >
                    <Link to={item.href} className={cn(
                      isActive && "text-fiscal-purple-400"
                    )}>
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarContent>
        
        <SidebarFooter className="border-t border-white/10">
          <div className="flex items-center p-4">
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
              onClick={onLogout}
              className="ml-2 p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut size={18} />
            </button>
          </div>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarToggle />
    </>
  );
};

export { CollapsibleSidebar, SidebarProvider };
