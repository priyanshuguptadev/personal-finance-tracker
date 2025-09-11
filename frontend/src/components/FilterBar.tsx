import { useState } from "react";
import { Filter, X } from "lucide-react";

interface FilterBarProps {
  onFilterChange: (filters: FilterState) => void;
  loading?: boolean;
}

interface FilterState {
  category: string | null;
  type: string | null;
  sortOrder: "asc" | "desc";
}

const FilterBar: React.FC<FilterBarProps> = ({ onFilterChange, loading }) => {
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    type: null,
    sortOrder: "desc",
  });
  const [isExpanded, setIsExpanded] = useState(false);

  const categories = [
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

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const clearFilters = () => {
    const resetFilters = {
      category: null,
      type: null,
      sortOrder: "desc" as const,
    };
    setFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  const hasActiveFilters = filters.category || filters.type;

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <span className="text-white font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="bg-green-500 text-xs text-black px-2 py-1 rounded-full">
              {(filters.category ? 1 : 0) + (filters.type ? 1 : 0)} active
            </span>
          )}
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-slate-400 hover:text-white transition-colors"
          disabled={loading}
        >
          {isExpanded ? "Hide" : "Show"} Filters
        </button>
      </div>
      {isExpanded && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Category
              </label>
              <select
                value={filters.category || ""}
                onChange={(e) =>
                  handleFilterChange({
                    category: e.target.value || null,
                  })
                }
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Type
              </label>
              <select
                value={filters.type || ""}
                onChange={(e) =>
                  handleFilterChange({
                    type: e.target.value || null,
                  })
                }
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50"
              >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Sort by Date
              </label>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleFilterChange({
                    sortOrder: e.target.value as "asc" | "desc",
                  })
                }
                disabled={loading}
                className="w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white text-sm focus:border-green-500 focus:outline-none transition-colors disabled:opacity-50"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={clearFilters}
                disabled={!hasActiveFilters || loading}
                className="w-full px-3 py-2 bg-slate-600 hover:bg-slate-500 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </button>
            </div>
          </div>
          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-600">
              <span className="text-sm text-slate-400">Active filters:</span>
              {filters.category && (
                <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-md flex items-center">
                  Category: {filters.category}
                  <button
                    onClick={() => handleFilterChange({ category: null })}
                    className="ml-1 hover:text-green-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.type && (
                <span className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-md flex items-center">
                  Type: {filters.type}
                  <button
                    onClick={() => handleFilterChange({ type: null })}
                    className="ml-1 hover:text-blue-100"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;
