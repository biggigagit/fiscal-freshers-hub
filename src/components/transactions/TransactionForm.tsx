
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { X, Save, DollarSign, Calendar, Tag, FileText, Plus, Minus } from 'lucide-react';

interface TransactionFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionForm: React.FC<TransactionFormProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const { toast } = useToast();

  const categories = {
    expense: ['Rent/PG', 'Food & Dining', 'Transport', 'Entertainment', 'Shopping', 'Mobile & Internet', 'Education', 'Subscriptions', 'Health', 'Other'],
    income: ['Salary/Stipend', 'Freelance', 'Pocket Money', 'Gifts', 'Scholarships', 'Other']
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!amount || !category || !description || !date) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, you would save this to your database
    console.log({
      type,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      category,
      description,
      date,
    });

    toast({
      title: "Transaction saved",
      description: `Your ${type} has been recorded successfully.`,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass-card rounded-xl w-full max-w-md animate-scale-in">
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h3 className="text-lg font-semibold">Add New Transaction</h3>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Transaction Type Toggle */}
          <div className="flex bg-secondary/40 rounded-lg p-1">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                type === 'expense' 
                  ? 'bg-fiscal-rose text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setType('expense')}
            >
              <Minus size={16} className="mr-2" />
              Expense
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center transition-colors ${
                type === 'income' 
                  ? 'bg-fiscal-teal text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
              onClick={() => setType('income')}
            >
              <Plus size={16} className="mr-2" />
              Income
            </button>
          </div>
          
          {/* Amount Field */}
          <div className="space-y-1">
            <label htmlFor="amount" className="text-sm font-medium text-gray-300">
              Amount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gray-400">₹</span>
              </div>
              <input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="input-primary pl-10 w-full"
                required
              />
            </div>
          </div>
          
          {/* Category Field */}
          <div className="space-y-1">
            <label htmlFor="category" className="text-sm font-medium text-gray-300">
              Category
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Tag size={18} className="text-gray-400" />
              </div>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-primary pl-10 w-full appearance-none"
                required
              >
                <option value="" disabled>Select a category</option>
                {categories[type].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Description Field */}
          <div className="space-y-1">
            <label htmlFor="description" className="text-sm font-medium text-gray-300">
              Description
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <FileText size={18} className="text-gray-400" />
              </div>
              <input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What was this for?"
                className="input-primary pl-10 w-full"
                required
              />
            </div>
          </div>
          
          {/* Date Field */}
          <div className="space-y-1">
            <label htmlFor="date" className="text-sm font-medium text-gray-300">
              Date
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Calendar size={18} className="text-gray-400" />
              </div>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="input-primary pl-10 w-full"
                required
              />
            </div>
          </div>
          
          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              className={`w-full py-3 px-4 rounded-lg flex items-center justify-center font-medium ${
                type === 'expense'
                  ? 'bg-gradient-to-r from-fiscal-rose-dark to-fiscal-rose text-white'
                  : 'bg-gradient-to-r from-fiscal-teal-dark to-fiscal-teal text-white'
              }`}
            >
              <Save size={18} className="mr-2" />
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionForm;
