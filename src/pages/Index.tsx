
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, LockKeyhole, MessageSquare, Wallet } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="container px-4 py-24 mx-auto bg-hero-pattern">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
            <span className="text-fiscal-purple-400">Fiscal</span> Freshers
          </h1>
          <p className="text-xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: "100ms" }}>
            The smart finance tracker for students and young professionals
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "200ms" }}>
            <Link 
              to="/dashboard" 
              className="btn-primary inline-flex items-center gap-2 text-lg"
            >
              Get Started <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container px-4 py-16 mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-white">
          Smart Finance <span className="text-fiscal-purple-400">Made Simple</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="dashboard-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="w-16 h-16 bg-fiscal-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-8 h-8 text-fiscal-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Expenses</h3>
            <p className="text-gray-300">Log your transactions and see where your money is going</p>
          </div>
          
          {/* Feature 2 */}
          <div className="dashboard-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "400ms" }}>
            <div className="w-16 h-16 bg-fiscal-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <BarChart3 className="w-8 h-8 text-fiscal-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Smart Analytics</h3>
            <p className="text-gray-300">Get insights with detailed spending reports and visualizations</p>
          </div>
          
          {/* Feature 3 */}
          <div className="dashboard-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "500ms" }}>
            <div className="w-16 h-16 bg-fiscal-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <MessageSquare className="w-8 h-8 text-fiscal-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
            <p className="text-gray-300">Ask questions and get personalized financial advice</p>
          </div>
          
          {/* Feature 4 */}
          <div className="dashboard-card flex flex-col items-center text-center animate-fade-in" style={{ animationDelay: "600ms" }}>
            <div className="w-16 h-16 bg-fiscal-purple-600/20 rounded-full flex items-center justify-center mb-4">
              <LockKeyhole className="w-8 h-8 text-fiscal-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
            <p className="text-gray-300">Your financial data stays private and protected</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container px-4 py-16 mx-auto">
        <div className="bg-sidebar-accent rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to take control of your finances?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of students and young professionals who are mastering their money with Fiscal Freshers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup" className="btn-primary">Create Account</Link>
            <Link to="/login" className="btn-outline">Login</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="container px-4 py-8 mx-auto mt-16 border-t border-white/10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-fiscal-purple-400 font-semibold text-lg">Fiscal Freshers</p>
            <p className="text-sm text-gray-400">© 2023 All rights reserved</p>
          </div>
          <div className="flex gap-6">
            <a href="#" className="text-gray-400 hover:text-fiscal-purple-400 transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-400 hover:text-fiscal-purple-400 transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-400 hover:text-fiscal-purple-400 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
