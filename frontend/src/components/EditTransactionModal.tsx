import { useState, useEffect } from "react";
import {
  X,
  Calendar,
  IndianRupee,
  ChevronDown,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";

interface TransactionFormData {
  title: string;
  amount: string;
  type: "expense" | "income";
  category: string;
  date: string;
}

interface EditTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  initialData: TransactionFormData & { id: string };
}

const EditTransactionModal: React.FC<EditTransactionModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialData,
}) => {
  const [formData, setFormData] = useState<TransactionFormData>({
    title: "",
    amount: "",
    type: "expense",
    category: "Food & Dining",
    date: new Date().toISOString().split("T")[0],
  });

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const categories: string[] = [
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Education",
    "Travel",
    "Income",
    "Investment",
    "Other",
  ];
  useEffect(() => {
    if (initialData && isOpen) {
      setFormData({
        title: initialData.title,
        amount: Math.abs(parseFloat(initialData.amount.toString())).toString(),
        type:
          parseFloat(initialData.amount.toString()) < 0 ? "expense" : "income",
        category: initialData.category,
        date: initialData.date,
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (
    field: keyof TransactionFormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (message.type) {
      setMessage({ type: null, text: "" });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      amount: "",
      type: "expense",
      category: "Food & Dining",
      date: new Date().toISOString().split("T")[0],
    });
    setMessage({ type: null, text: "" });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: null, text: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/${initialData.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            amount:
              formData.type === "expense"
                ? -1 * parseFloat(formData.amount)
                : parseFloat(formData.amount),
            category: formData.category,
            date: formData.date,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update transaction");
      }

      setMessage({
        type: "success",
        text: "Transaction updated successfully!",
      });

      setTimeout(() => {
        resetForm();
        onClose();
        onSuccess?.();
      }, 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "Failed to update transaction. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleClose}
      />
      <div className="relative bg-slate-800 rounded-xl p-8 w-full max-w-2xl mx-4 shadow-2xl border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl font-bold text-white">Edit Transaction</h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-white transition-colors p-1"
            type="button"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {message.type && (
          <div
            className={`mb-4 p-4 rounded-lg flex items-center space-x-3 ${
              message.type === "success"
                ? "bg-green-500/20 border border-green-500/30"
                : "bg-red-500/20 border border-red-500/30"
            }`}
          >
            {message.type === "success" ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <span
              className={`text-sm font-medium ${
                message.type === "success" ? "text-green-200" : "text-red-200"
              }`}
            >
              {message.text}
            </span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Transaction Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter transaction description"
                required
                disabled={isLoading}
                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Amount (₹)
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  placeholder="0.00"
                  required
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Transaction Type
              </label>
              <div className="relative">
                <select
                  value={formData.type}
                  onChange={(e) =>
                    handleInputChange(
                      "type",
                      e.target.value as "expense" | "income"
                    )
                  }
                  disabled={isLoading}
                  className="appearance-none w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  disabled={isLoading}
                  className="appearance-none w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {categories.map((category: string) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Date
            </label>
            <div className="relative max-w-xs">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                disabled={isLoading}
                className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:outline-none transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-slate-600 hover:bg-slate-500 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 py-3 px-4 bg-green-500 hover:bg-green-600 text-black font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Transaction"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransactionModal;
