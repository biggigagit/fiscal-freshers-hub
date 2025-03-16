
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, ChevronDown, PanelRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your financial assistant. Ask me any finance-related questions, and I'll help you out.",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample suggestions
  const suggestions = [
    "How can I save more money?",
    "What's the 50/30/20 budget rule?",
    "How to reduce my monthly expenses?",
    "Explain emergency funds",
    "Best investment strategies for beginners?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const generateBotResponse = (userMessage: string): Promise<string> => {
    // Simulate API call delay
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock responses based on keywords
        if (userMessage.toLowerCase().includes('save') || userMessage.toLowerCase().includes('saving')) {
          resolve("To save more money, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Automate your savings by setting up automatic transfers to a separate account on payday. Also, track your expenses to identify areas where you can cut back.");
        } else if (userMessage.toLowerCase().includes('invest') || userMessage.toLowerCase().includes('investment')) {
          resolve("For beginners, consider starting with index funds or ETFs that track the market. They offer diversification and lower fees. You might also look into robo-advisors which automatically manage your investments. Remember to invest for the long term and don't try to time the market.");
        } else if (userMessage.toLowerCase().includes('budget') || userMessage.toLowerCase().includes('spending')) {
          resolve("Creating a budget is key to financial health. Track your income and expenses, categorize spending, and set realistic goals. There are many apps that can help automate this process. Review your budget regularly and adjust as needed. Remember that a budget isn't restrictive - it's a plan that gives you control!");
        } else if (userMessage.toLowerCase().includes('debt') || userMessage.toLowerCase().includes('loan')) {
          resolve("When tackling debt, consider either the avalanche method (paying off highest interest debt first) or the snowball method (paying off smallest debts first). Make minimum payments on all debts, then put extra money toward your target debt. Consider consolidating high-interest debts to lower your overall interest rate.");
        } else if (userMessage.toLowerCase().includes('emergency') || userMessage.toLowerCase().includes('fund')) {
          resolve("An emergency fund is money set aside for unexpected expenses like medical bills or car repairs. Aim to save 3-6 months of living expenses. Start small if you need to - even $500-$1000 can help with minor emergencies. Keep this money in a separate, easily accessible account like a high-yield savings account.");
        } else {
          resolve("That's a great question about personal finance. While I'm just a demo chatbot, a fully implemented version would search the web for the most up-to-date information to help you make informed financial decisions. Is there anything specific about your finances you'd like to know more about?");
        }
      }, 1500);
    });
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Generate bot response
      const botResponse = await generateBotResponse(userMessage.text);
      
      // Add bot response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I couldn't process your request. Please try again.",
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const toggleMinimize = () => {
    setMinimized(!minimized);
  };

  if (!isOpen) return null;

  return (
    <div 
      className={cn(
        "fixed z-40 transition-all duration-300 ease-in-out backdrop-blur-md",
        minimized 
          ? "bottom-6 right-6 w-auto h-auto" 
          : "top-16 bottom-0 right-0 w-80 lg:w-96 border-l border-white/10 bg-secondary/70"
      )}
    >
      {minimized ? (
        <button 
          onClick={toggleMinimize}
          className="p-3 rounded-full bg-fiscal-purple-600 text-white shadow-lg hover:bg-fiscal-purple-500 transition-colors animate-pulse-glow"
        >
          <Bot size={24} />
        </button>
      ) : (
        <>
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <div className="flex items-center space-x-2">
              <Bot size={20} className="text-fiscal-purple-400" />
              <span className="font-medium">Financial Assistant</span>
            </div>
            <div className="flex items-center space-x-1">
              <button 
                onClick={toggleMinimize}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <ChevronDown size={18} />
              </button>
              <button 
                onClick={onClose}
                className="p-1.5 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[calc(100%-144px)]">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={cn(
                  "flex items-start space-x-2 animate-fade-in",
                  message.sender === 'user' ? 'justify-end' : ''
                )}
              >
                {message.sender === 'bot' && (
                  <div className="w-8 h-8 rounded-full bg-fiscal-purple-800/40 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={16} className="text-fiscal-purple-400" />
                  </div>
                )}
                
                <div 
                  className={cn(
                    "rounded-2xl py-2 px-4 max-w-[80%]",
                    message.sender === 'user' 
                      ? 'bg-fiscal-purple-600 text-white rounded-tr-none' 
                      : 'bg-secondary/80 text-white rounded-tl-none'
                  )}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-[10px] text-right mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
                
                {message.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-fiscal-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <User size={16} className="text-white" />
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-fiscal-purple-800/40 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot size={16} className="text-fiscal-purple-400" />
                </div>
                <div className="bg-secondary/80 text-white rounded-2xl rounded-tl-none py-3 px-4">
                  <Loader2 size={16} className="animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggestions */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-white/10">
              <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-xs bg-secondary/80 hover:bg-white/10 text-gray-300 hover:text-white px-3 py-1.5 rounded-full transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input area */}
          <div className="border-t border-white/10 p-3 absolute bottom-0 left-0 right-0">
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me about finance..."
                className="w-full bg-secondary/80 border border-white/10 rounded-lg pl-4 pr-12 py-3 resize-none text-sm focus:outline-none focus:ring-1 focus:ring-fiscal-purple-500 text-white"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim() || isLoading}
                className={cn(
                  "absolute right-3 top-1/2 transform -translate-y-1/2 p-1.5 rounded-lg transition-colors",
                  input.trim() && !isLoading 
                    ? "bg-fiscal-purple-600 hover:bg-fiscal-purple-500 text-white" 
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                )}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
