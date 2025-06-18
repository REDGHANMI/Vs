
import { TrendingUp, TrendingDown, Eye, Fuel, DollarSign, FileText, Users, Wrench, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProfitLossItem } from "@/data/mockProfitLoss";

interface ProfitLossSectionProps {
  title: string;
  items: ProfitLossItem[];
  total: number;
  type: "produit" | "charge";
  onShowDetails: (item: ProfitLossItem, type: "produit" | "charge") => void;
}

const iconMap = {
  Fuel,
  DollarSign,
  FileText,
  Users,
  Wrench,
  Zap
};

export default function ProfitLossSection({
  title,
  items,
  total,
  type,
  onShowDetails
}: ProfitLossSectionProps) {
  const isProfit = type === "produit";
  const colorClass = isProfit ? "text-green-700" : "text-red-700";
  const bgClass = isProfit ? "bg-green-50" : "bg-red-50";
  const borderClass = isProfit ? "border-green-100" : "border-red-100";
  const hoverClass = isProfit ? "hover:bg-green-100" : "hover:bg-red-100";
  const iconBgClass = isProfit ? "bg-green-200" : "bg-red-200";
  const buttonHoverClass = isProfit ? "hover:bg-green-200" : "hover:bg-red-200";
  const badgeClass = isProfit ? "border-green-300" : "border-red-300";
  const TrendIcon = isProfit ? TrendingUp : TrendingDown;

  return (
    <div>
      <h3 className={`text-lg font-semibold ${colorClass} mb-4 flex items-center gap-2`}>
        <TrendIcon className="w-5 h-5" />
        {title}
        <Badge variant="outline" className={`${colorClass} ${badgeClass}`}>
          {total.toLocaleString()} DH
        </Badge>
      </h3>
      <div className="space-y-3">
        {items.map((item, index) => {
          const IconComponent = iconMap[item.icon as keyof typeof iconMap] || FileText;
          return (
            <div key={index} className={`flex items-center justify-between p-4 ${bgClass} rounded-lg border ${borderClass} ${hoverClass} transition-colors`}>
              <div className="flex items-center gap-3 flex-1">
                <div className={`p-2 ${iconBgClass} rounded-lg`}>
                  <IconComponent className={`w-5 h-5 ${colorClass}`} />
                </div>
                <span className="font-medium">{item.poste}</span>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className={colorClass}>
                  {item.pourcentage.toFixed(1)}%
                </Badge>
                <span className={`font-bold ${colorClass} w-32 text-right`}>
                  {item.montant.toLocaleString()} DH
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onShowDetails(item, type)}
                  className={`${buttonHoverClass} ${colorClass}`}
                >
                  <Eye className="w-4 h-4" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
