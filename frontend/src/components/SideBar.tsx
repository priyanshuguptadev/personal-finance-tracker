import { HomeIcon, IndianRupeeIcon } from "lucide-react";
export default function SideBar() {
  return (
    <div className="w-64 bg-slate-800 p-6 hidden md:block">
      <div className="flex items-center mb-8">
        <span className="text-xl font-semibold">
          T <IndianRupeeIcon className="inline-block m-0" /> ACKER
        </span>
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
