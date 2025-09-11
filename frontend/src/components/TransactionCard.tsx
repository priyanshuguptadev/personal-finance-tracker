import { Pencil, Trash2 } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
}

interface TransactionCardProps extends Transaction {
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string, title: string) => void;
}

export default function TransactionCard({
  id,
  title,
  amount,
  date,
  category,
  onEdit,
  onDelete,
}: TransactionCardProps) {
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
    return colors[category] || "bg-gray-300 text-black";
  };

  const handleEdit = () => {
    onEdit({ id, title, amount, date, category });
  };

  const handleDelete = () => {
    onDelete(id, title);
  };

  return (
    <div className="grid grid-cols-4 md:grid-cols-5 gap-4 items-center py-3 border-b border-slate-700 last:border-b-0 hover:bg-slate-700/30 transition-colors">
      <div className="text-slate-300">
        {new Date(date).toLocaleDateString("en-IN")}
      </div>
      <div className="text-white">{title}</div>
      <div className="hidden md:block">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${getCategoryColor(
            category
          )}`}
        >
          {category}
        </span>
      </div>
      <div
        className={`text-right font-medium ${
          amount > 0 ? "text-green-400" : "text-red-400"
        }`}
      >
        {amount > 0 ? "+" : ""}₹
        {Math.abs(amount).toLocaleString("en-IN", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
      <div className="hidden: md:flex justify-center space-x-2">
        <button
          onClick={handleEdit}
          className="p-1 rounded hover:bg-slate-600 transition-colors"
          title="Edit transaction"
        >
          <Pencil className="w-4 h-4 text-slate-400 hover:text-white" />
        </button>
        <button
          onClick={handleDelete}
          className="p-1 rounded hover:bg-red-600 transition-colors"
          title="Delete transaction"
        >
          <Trash2 className="w-4 h-4 text-red-400 hover:text-red-200" />
        </button>
      </div>
    </div>
  );
}
