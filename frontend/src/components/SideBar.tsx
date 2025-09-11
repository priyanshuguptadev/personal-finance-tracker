import { HomeIcon } from "lucide-react";
export default function SideBar() {
  return (
    <div className="w-64 bg-slate-800 p-6 hidden md:block">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
          <span className="text-black font-bold text-sm">F</span>
        </div>
        <span className="text-xl font-semibold">Finance Tracker</span>
      </div>
      <nav className="space-y-2">
        <div className="flex items-center p-3 rounded-lg cursor-pointer transition-colors bg-slate-700 text-white">
          <HomeIcon className="w-5 h-5 mr-3" />
          <span>Home</span>
        </div>
      </nav>
    </div>
  );
}
