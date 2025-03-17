
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot, User, ChevronDown, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

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

interface SerperResponse {
  organic: Array<{
    title: string;
    link: string;
    snippet: string;
  }>;
  answerBox?: {
    answer?: string;
    snippet?: string;
  };
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
  const [apiKey, setApiKey] = useState<string | null>(localStorage.getItem('serperApiKey'));
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Sample suggestions
  const suggestions = [
    "How can I save more money?",
    "What's the 50/30/20 budget rule?",
    "How to reduce my monthly expenses?",
    "Explain emergency funds",
    "Best investment strategies for beginners in India?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const searchWithSerper = async (query: string): Promise<string> => {
    try {
      if (!apiKey) {
        throw new Error('No API key provided');
      }
      
      const response = await fetch('https://google.serper.dev/search', {
        method: 'POST',
        headers: {
          'X-API-KEY': apiKey,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          q: `${query} financial advice india`,
          gl: 'in', // Set region to India
          hl: 'en' // Language: English
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Serper API error:', errorData);
        throw new Error(`Failed to fetch search results: ${response.status} ${response.statusText}`);
      }

      const data: SerperResponse = await response.json();
      
      // Extract answer from answerBox if available
      if (data.answerBox && (data.answerBox.answer || data.answerBox.snippet)) {
        return data.answerBox.answer || data.answerBox.snippet || '';
      }
      
      // Otherwise, compile info from organic results
      if (data.organic && data.organic.length > 0) {
        let result = "Based on my search, here's what I found:\n\n";
        
        // Take the first 2-3 results for a concise answer
        const topResults = data.organic.slice(0, 2);
        
        topResults.forEach(item => {
          result += `${item.snippet}\n\n`;
        });
        
        result += "I hope this helps with your question about personal finance!";
        return result;
      }
      
      return "I couldn't find specific information about that. Could you try rephrasing your question?";
    } catch (error) {
      console.error('Error searching with Serper:', error);
      return generateFallbackResponse(query);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    // Fallback responses when API fails
    if (userMessage.toLowerCase().includes('save') || userMessage.toLowerCase().includes('saving')) {
      return "To save more money, try the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Automate your savings by setting up automatic transfers to a separate account on payday. Also, track your expenses to identify areas where you can cut back.";
    } else if (userMessage.toLowerCase().includes('invest') || userMessage.toLowerCase().includes('investment')) {
      return "For beginners in India, consider starting with index funds or ETFs that track the Nifty or Sensex. For tax benefits, look into ELSS funds which have a 3-year lock-in but offer tax deductions under Section 80C. Platforms like Zerodha or Groww make investing accessible for young adults.";
    } else if (userMessage.toLowerCase().includes('budget') || userMessage.toLowerCase().includes('spending')) {
      return "Creating a budget is key to financial health. For a 22-year-old in India, track income from internships or entry-level jobs, categorize spending into essentials like rent, food, and transportation, then set realistic goals. Apps like ET Money or Walnut can help automate this process.";
    } else if (userMessage.toLowerCase().includes('debt') || userMessage.toLowerCase().includes('loan')) {
      return "When tackling debt, consider either the avalanche method (paying off highest interest debt first) or the snowball method (paying off smallest debts first). For education loans in India, remember that interest paid is tax-deductible under Section 80E without any upper limit.";
    } else if (userMessage.toLowerCase().includes('emergency') || userMessage.toLowerCase().includes('fund')) {
      return "As a young professional in India, aim to build an emergency fund covering 3-6 months of expenses. Start with ₹50,000-₹1,00,000 for immediate emergencies. Keep this money in a separate, easily accessible account like a high-yield savings account or liquid fund for better returns than a regular savings account.";
    } else {
      return "That's a great question about personal finance. I'd like to search for the most up-to-date information to help you, but I'm currently using my offline knowledge. For the most accurate advice tailored to your situation in India, consider consulting with a financial advisor.";
    }
  };

  const handleSaveApiKey = () => {
    if (apiKey) {
      localStorage.setItem('serperApiKey', apiKey);
      setShowApiKeyInput(false);
      toast({
        title: "API Key saved",
        description: "Your Serper API key has been saved for this session.",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // If no API key is set, show the API key input
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }
    
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
      // Generate bot response using Serper API
      const botResponse = await searchWithSerper(userMessage.text);
      
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
      
      toast({
        title: "Connection error",
        description: "Could not retrieve financial information. Using offline mode.",
        variant: "destructive",
      });
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
          
          {/* API Key Modal */}
          {showApiKeyInput && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4">
              <div className="bg-sidebar rounded-lg p-6 w-full max-w-sm">
                <h3 className="text-lg font-semibold mb-4">Enter Serper API Key</h3>
                <p className="text-sm text-gray-400 mb-4">
                  To enable real-time financial information, please enter your Serper API key. 
                  You can get one from <a href="https://serper.dev" target="_blank" rel="noopener noreferrer" className="text-fiscal-purple-400 underline">serper.dev</a>.
                </p>
                <input
                  type="text"
                  value={apiKey || ''}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your Serper API key"
                  className="w-full p-2 mb-4 bg-sidebar-accent border border-white/10 rounded-md text-white"
                />
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => setShowApiKeyInput(false)}
                    className="px-4 py-2 rounded-md bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveApiKey}
                    className="px-4 py-2 rounded-md bg-fiscal-purple-600 text-white hover:bg-fiscal-purple-500 transition-colors"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          )}
          
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
