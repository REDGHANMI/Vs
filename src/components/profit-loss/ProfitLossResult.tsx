
import { DollarSign } from "lucide-react";

interface ProfitLossResultProps {
  resultatNet: number;
  margeNette: number;
}

export default function ProfitLossResult({ resultatNet, margeNette }: ProfitLossResultProps) {
  return (
    <div className="border-t-2 border-gray-300 pt-6">
      <div className={`flex items-center justify-between p-6 rounded-lg border-2 ${resultatNet >= 0 ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200' : 'bg-gradient-to-r from-red-50 to-orange-50 border-red-200'} shadow-lg`}>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${resultatNet >= 0 ? 'bg-green-200' : 'bg-red-200'}`}>
            <DollarSign className={`w-6 h-6 ${resultatNet >= 0 ? 'text-green-700' : 'text-red-700'}`} />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${resultatNet >= 0 ? 'text-green-800' : 'text-red-800'}`}>
              RÉSULTAT NET D'EXPLOITATION
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Marge nette: {margeNette.toFixed(1)}%
            </p>
          </div>
        </div>
        <div className="text-right">
          <span className={`text-3xl font-bold ${resultatNet >= 0 ? 'text-green-800' : 'text-red-800'}`}>
            {resultatNet >= 0 ? '+' : ''}{resultatNet.toLocaleString()} DH
          </span>
        </div>
      </div>
    </div>
  );
}
