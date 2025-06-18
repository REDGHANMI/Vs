
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ProfitLossSummaryCardsProps {
  totalProduits: number;
  totalCharges: number;
  resultatNet: number;
  margeNette: number;
}

export default function ProfitLossSummaryCards({
  totalProduits,
  totalCharges,
  resultatNet,
  margeNette
}: ProfitLossSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <Card className="border-0 shadow-lg bg-gradient-to-br from-green-500 to-green-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm font-medium">Total Produits</p>
              <p className="text-2xl font-bold">{totalProduits.toLocaleString()} DH</p>
            </div>
            <TrendingUp className="w-8 h-8 text-green-200" />
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg bg-gradient-to-br from-red-500 to-red-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm font-medium">Total Charges</p>
              <p className="text-2xl font-bold">{totalCharges.toLocaleString()} DH</p>
            </div>
            <TrendingDown className="w-8 h-8 text-red-200" />
          </div>
        </CardContent>
      </Card>

      <Card className={`border-0 shadow-lg ${resultatNet >= 0 ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-gradient-to-br from-orange-500 to-orange-600'} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`${resultatNet >= 0 ? 'text-emerald-100' : 'text-orange-100'} text-sm font-medium`}>Résultat Net</p>
              <p className="text-2xl font-bold">{resultatNet.toLocaleString()} DH</p>
            </div>
            <DollarSign className={`w-8 h-8 ${resultatNet >= 0 ? 'text-emerald-200' : 'text-orange-200'}`} />
          </div>
        </CardContent>
      </Card>

      <Card className={`border-0 shadow-lg ${margeNette >= 0 ? 'bg-gradient-to-br from-blue-500 to-blue-600' : 'bg-gradient-to-br from-purple-500 to-purple-600'} text-white`}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className={`${margeNette >= 0 ? 'text-blue-100' : 'text-purple-100'} text-sm font-medium`}>Marge Nette</p>
              <p className="text-2xl font-bold">{margeNette.toFixed(1)}%</p>
            </div>
            <TrendingUp className={`w-8 h-8 ${margeNette >= 0 ? 'text-blue-200' : 'text-purple-200'}`} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
