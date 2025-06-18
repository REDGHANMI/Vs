
import { ArrowLeft, Download, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface ProfitLossHeaderProps {
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
  selectedCompany: string;
  onCompanyChange: (company: string) => void;
  onExportPDF: () => void;
}

export default function ProfitLossHeader({
  selectedPeriod,
  onPeriodChange,
  selectedCompany,
  onCompanyChange,
  onExportPDF
}: ProfitLossHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au tableau de bord
            </Button>
            <div className="h-6 w-px bg-gray-300" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Compte de Résultat</h1>
              <p className="text-sm text-gray-600">Analyse des performances financières</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedCompany} onValueChange={onCompanyChange}>
              <SelectTrigger className="w-48">
                <Building2 className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les sociétés</SelectItem>
                <SelectItem value="petromin-casa">PETROMIN Casa</SelectItem>
                <SelectItem value="petromin-rabat">PETROMIN Rabat</SelectItem>
                <SelectItem value="petromin-marrakech">PETROMIN Marrakech</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedPeriod} onValueChange={onPeriodChange}>
              <SelectTrigger className="w-48">
                <Calendar className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024-01">Janvier 2024</SelectItem>
                <SelectItem value="2023-12">Décembre 2023</SelectItem>
                <SelectItem value="2023-11">Novembre 2023</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" onClick={onExportPDF} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Exporter PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
