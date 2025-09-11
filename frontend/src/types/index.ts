export interface Transaction {
  _id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionFormData {
  title: string;
  amount: number;
  date: string;
  category: string;
}

export interface FilterState {
  category: string | null;
  type: "income" | "expense" | null;
  sortOrder: "asc" | "desc";
}

export interface Summary {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  count: number;
}
