import { Plus } from "lucide-react";
import StatsCard from "./StatsCard";
import TransactionsDisplay from "./Transactions";
import FilterBar from "./FilterBar";
import { useEffect, useState } from "react";
import SideBar from "./SideBar";
import AddTransactionModal from "./AddTransactionModal";

interface FilterState {
  category: string | null;
  type: string | null;
  sortOrder: "asc" | "desc";
}

const FinanceTracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<FilterState>({
    category: null,
    type: null,
    sortOrder: "desc",
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const buildQueryString = (filters: FilterState) => {
    const params = new URLSearchParams();

    if (filters.category) {
      params.append("category", filters.category);
    }

    if (filters.type) {
      params.append("type", filters.type);
    }

    params.append("sortOrder", filters.sortOrder);

    return params.toString();
  };

  const fetchTransactions = async (filters?: FilterState) => {
    try {
      setLoading(true);
      setError(null);

      const filtersToUse = filters || currentFilters;
      const queryString = buildQueryString(filtersToUse);
      const url = `${import.meta.env.VITE_API_URL}/transactions/${
        queryString ? `?${queryString}` : ""
      }`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        const transformedTransactions = data.transactions.map(
          (transaction: any) => ({
            id: transaction._id,
            date: new Date(transaction.date).toISOString().split("T")[0],
            title: transaction.title,
            category: transaction.category,
            amount: transaction.amount,
          })
        );

        setTransactions(transformedTransactions);

        const balance = data.summary.totalIncome - data.summary.totalExpenses;
        setSummary({
          ...data.summary,
          balance,
        });
      } else {
        throw new Error("API returned unsuccessful response");
      }
    } catch (err: any) {
      setError(err.message);
      console.error("Error fetching transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters: FilterState) => {
    setCurrentFilters(newFilters);
    fetchTransactions(newFilters);
  };

  const handleTransactionSuccess = () => {
    console.log("Transaction added successfully, refreshing data...");
    fetchTransactions();
  };

  if (loading && transactions.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p>Loading transactions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white flex">
      <SideBar />

      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Home</h1>
          <button
            className="bg-green-500 hover:bg-green-600 text-black font-medium p-2 md:py-2 md:px-4 md:rounded-full transition-colors flex items-center rounded-lg"
            onClick={() => setIsModelOpen(true)}
          >
            <Plus className="w-4 h-4 md:mr-2" />
            <span className="hidden md:block">Add Transaction</span>
          </button>
        </div>

        <AddTransactionModal
          isOpen={isModelOpen}
          onClose={() => setIsModelOpen(false)}
          onSuccess={handleTransactionSuccess}
        />

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded mb-6">
            <p>Error loading data: {error}</p>
            <button
              onClick={() => fetchTransactions()}
              className="mt-2 text-sm underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}
        <StatsCard
          totalExpenses={summary.totalExpenses}
          totalIncome={summary.totalIncome}
        />

        <FilterBar onFilterChange={handleFilterChange} loading={loading} />

        {loading ? (
          <div className="bg-slate-800 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto mb-4"></div>
            <p className="text-slate-400">Filtering transactions...</p>
          </div>
        ) : (
          <TransactionsDisplay
            onTransactionUpdate={() => fetchTransactions()}
            transactions={transactions}
          />
        )}
      </div>
    </div>
  );
};

export default FinanceTracker;
