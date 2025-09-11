import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import EditTransactionModal from "./EditTransactionModal";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionsDisplayProps {
  transactions: Transaction[];
  onTransactionUpdate?: () => void;
}

export default function TransactionsDisplay({
  transactions,
  onTransactionUpdate,
}: TransactionsDisplayProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const formatAmount = (amount: number) => {
    const isPositive = amount >= 0;
    const formatted = Math.abs(amount).toLocaleString("en-IN", {
      maximumFractionDigits: 2,
      minimumFractionDigits: 2,
    });
    return `${isPositive ? "+" : "-"}₹${formatted}`;
  };

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      Income: "bg-green-500 text-white",
      "Food & Dining": "bg-blue-500 text-white",
      Transportation: "bg-yellow-500 text-black",
      Shopping: "bg-purple-500 text-white",
      Entertainment: "bg-orange-500 text-white",
      "Bills & Utilities": "bg-red-500 text-white",
      Healthcare: "bg-pink-500 text-white",
      Education: "bg-indigo-500 text-white",
      Travel: "bg-teal-500 text-white",
      Investment: "bg-cyan-500 text-white",
      Other: "bg-gray-500 text-white",
    };
    return colors[category] || "bg-gray-400 text-black";
  };

  const handleEdit = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/transactions/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      onTransactionUpdate?.();
    } catch (err) {
      alert("Failed to delete transaction. Please try again.");
      console.error("Delete error:", err);
    }
  };

  const handleModalClose = () => {
    setEditModalOpen(false);
    setSelectedTransaction(null);
  };

  const handleUpdateSuccess = () => {
    onTransactionUpdate?.();
  };

  return (
    <>
      <div className="bg-slate-800 rounded-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-white">
            Recent Transactions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-slate-400 text-sm mb-4">
            <div className="hidden md:block">Date</div>
            <div>Description</div>
            <div className="hidden md:block">Category</div>
            <div className="text-right">Amount</div>
            <div className="hidden md:block text-center">Actions</div>
          </div>
          {transactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-slate-400">No transactions found</p>
            </div>
          ) : (
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center py-3 border-b border-slate-700 hover:bg-slate-700/30 transition-colors"
                >
                  <div className="text-slate-300 hidden md:block">
                    {new Date(transaction.date).toLocaleDateString("en-IN")}
                  </div>
                  <div className="text-white">{transaction.title}</div>
                  <div className="hidden md:block">
                    <span
                      className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(
                        transaction.category
                      )}`}
                    >
                      {transaction.category}
                    </span>
                  </div>
                  <div
                    className={`text-right font-medium ${
                      transaction.amount >= 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {formatAmount(transaction.amount)}
                  </div>
                  <div className="hidden md:flex justify-center space-x-2">
                    <button
                      className="p-1 rounded hover:bg-slate-600 transition-colors"
                      title="Edit Transaction"
                      onClick={() => handleEdit(transaction)}
                    >
                      <Pencil className="w-4 h-4 text-slate-400 hover:text-white" />
                    </button>
                    <button
                      className="p-1 rounded hover:bg-red-600 transition-colors"
                      title="Delete Transaction"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-200" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {selectedTransaction && (
        <EditTransactionModal
          isOpen={editModalOpen}
          onClose={handleModalClose}
          onSuccess={handleUpdateSuccess}
          initialData={{
            id: selectedTransaction.id,
            title: selectedTransaction.title,
            amount: selectedTransaction.amount.toString(),
            type: selectedTransaction.amount < 0 ? "expense" : "income",
            category: selectedTransaction.category,
            date: selectedTransaction.date,
          }}
        />
      )}
    </>
  );
}
