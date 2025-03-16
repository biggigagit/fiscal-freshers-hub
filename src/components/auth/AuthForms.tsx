
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { User, Lock, Mail, ArrowRight, Loader2 } from 'lucide-react';

export const SignInForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock authentication - in a real app, you'd call an API
    setTimeout(() => {
      if (email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      } else {
        toast({
          title: "Login failed",
          description: "Please check your credentials and try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 glass-card rounded-2xl space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Welcome Back</h2>
        <p className="text-gray-400 text-sm">Sign in to continue to your account</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-primary pl-10 w-full"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
            <button type="button" className="text-xs text-fiscal-purple-400 hover:text-fiscal-purple-300 transition-colors">
              Forgot Password?
            </button>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-primary pl-10 w-full"
              required
            />
          </div>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-fiscal-purple-700 to-fiscal-purple-500 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mr-2" />
          ) : (
            <>
              Sign In <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export const SignUpForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Mock signup - in a real app, you'd call an API
    setTimeout(() => {
      if (name && email && password) {
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/home');
        toast({
          title: "Account created!",
          description: "Welcome to Fiscal Freshers.",
        });
      } else {
        toast({
          title: "Signup failed",
          description: "Please fill in all fields and try again.",
          variant: "destructive"
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="w-full max-w-md p-8 glass-card rounded-2xl space-y-6 animate-scale-in">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">Create Account</h2>
        <p className="text-gray-400 text-sm">Sign up and start managing your finances</p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-300">Full Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="input-primary pl-10 w-full"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="input-primary pl-10 w-full"
              required
            />
          </div>
        </div>
        
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-300">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-primary pl-10 w-full"
              required
            />
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Password must be at least 8 characters long
          </p>
        </div>
        
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-fiscal-purple-700 to-fiscal-purple-500 text-white p-3 rounded-lg font-medium flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-70"
        >
          {isLoading ? (
            <Loader2 size={20} className="animate-spin mr-2" />
          ) : (
            <>
              Create Account <ArrowRight size={18} className="ml-2" />
            </>
          )}
        </button>
      </form>
    </div>
  );
};
