interface Props {
  totalIncome: Number;
  totalExpenses: Number;
}

export default function StatsCard({ totalExpenses, totalIncome }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-slate-400 text-sm mb-2">Income</h3>
        <p className="text-3xl font-bold text-green-500">
          ₹{totalIncome.toString()}
        </p>
      </div>
      <div className="bg-slate-800 p-6 rounded-lg">
        <h3 className="text-slate-400 text-sm mb-2">Expenses</h3>
        <p className="text-3xl font-bold text-red-400">
          ₹{totalExpenses.toString()}
        </p>
      </div>
    </div>
  );
}
