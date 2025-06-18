
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between px-8 py-5 border-b border-border bg-white/80 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <img
          src="https://sharpthinkit.com/wp-content/uploads/2025/04/cloud-b1-1024x768.png"
          alt="Logo PETROMIN"
          className="h-8 w-8 object-contain mr-3 rounded-full border bg-white"
        />
        <div>
          <div className="font-semibold">Bienvenue</div>
          <div className="text-sm text-gray-400 leading-none">LoadGasoil / Multi Sites</div>
        </div>
      </div>
      <h1 className="font-bold text-2xl hidden xl:block">Suivi des Stations et KPI</h1>
      <div className="flex items-center gap-3">
        {/* Select station placeholder */}
        <select className="border border-border rounded-lg px-3 py-1 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-300">
          <option>Station 1</option>
          <option>Station 2</option>
          <option>Station 3</option>
        </select>
        <div className="relative ml-2">
          <Input
            placeholder="Recherche…"
            className="pl-9 pr-3 bg-white rounded-lg shadow-inner border"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400 pointer-events-none" />
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-600 ml-2 shadow">
          A
        </div>
      </div>
    </header>
  );
}
