
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useProfitLossData } from "@/hooks/useProfitLossData";
import ProfitLossHeader from "@/components/profit-loss/ProfitLossHeader";
import ProfitLossSummaryCards from "@/components/profit-loss/ProfitLossSummaryCards";
import ProfitLossSection from "@/components/profit-loss/ProfitLossSection";
import ProfitLossResult from "@/components/profit-loss/ProfitLossResult";
import ProfitLossDetailsSidebar from "@/components/profit-loss/ProfitLossDetailsSidebar";

export default function ProfitLossPage() {
  const {
    selectedPeriod,
    setSelectedPeriod,
    selectedCompany,
    setSelectedCompany,
    profitLossData,
    totalProduits,
    totalCharges,
    resultatNet,
    margeNette,
    handleExportPDF
  } = useProfitLossData();

  const [sidebarData, setSidebarData] = useState<any>(null);

  const handleShowDetails = (item: any, type: "produit" | "charge") => {
    setSidebarData({
      category: item.poste,
      categoryType: type,
      totalAmount: item.montant,
      percentage: item.pourcentage,
      details: item.details || [],
      isOpen: true
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <ProfitLossHeader
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        selectedCompany={selectedCompany}
        onCompanyChange={setSelectedCompany}
        onExportPDF={handleExportPDF}
      />

      <div className="max-w-7xl mx-auto p-6">
        <ProfitLossSummaryCards
          totalProduits={totalProduits}
          totalCharges={totalCharges}
          resultatNet={resultatNet}
          margeNette={margeNette}
        />

        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="text-xl">Compte de Résultat - {profitLossData.period}</CardTitle>
            <CardDescription>
              Détail des produits et charges de la période
              {selectedCompany !== "all" && ` - ${selectedCompany}`}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-8">
              <ProfitLossSection
                title="PRODUITS D'EXPLOITATION"
                items={profitLossData.produits}
                total={totalProduits}
                type="produit"
                onShowDetails={handleShowDetails}
              />

              <ProfitLossSection
                title="CHARGES D'EXPLOITATION"
                items={profitLossData.charges}
                total={totalCharges}
                type="charge"
                onShowDetails={handleShowDetails}
              />

              <ProfitLossResult
                resultatNet={resultatNet}
                margeNette={margeNette}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {sidebarData && (
        <ProfitLossDetailsSidebar
          isOpen={sidebarData.isOpen}
          onClose={() => setSidebarData(null)}
          category={sidebarData.category}
          categoryType={sidebarData.categoryType}
          totalAmount={sidebarData.totalAmount}
          percentage={sidebarData.percentage}
          details={sidebarData.details}
        />
      )}
    </div>
  );
}
