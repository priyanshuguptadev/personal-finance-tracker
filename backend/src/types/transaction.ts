export interface ITransaction {
  title: string;
  amount: number;
  date: Date;
  category: string;
  type: "income" | "expense";
  userId?: string;
}

export interface TransactionCreateInput {
  title: string;
  amount: number;
  date: string | Date;
  category: string;
  type: "income" | "expense";
}

export interface TransactionUpdateInput {
  title?: string;
  amount?: number;
  date?: string | Date;
  category?: string;
  type?: "income" | "expense";
}
