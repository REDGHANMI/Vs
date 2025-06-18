
import { useState, useMemo } from 'react';
import { generateProfitLossData } from '@/data/mockProfitLoss';

export const useProfitLossData = (initialPeriod: string = "2024-01") => {
  const [selectedPeriod, setSelectedPeriod] = useState(initialPeriod);
  const [selectedCompany, setSelectedCompany] = useState("all");

  const profitLossData = useMemo(() => {
    return generateProfitLossData(selectedPeriod);
  }, [selectedPeriod]);

  const totalProduits = useMemo(() => {
    return profitLossData.produits.reduce((sum, item) => sum + item.montant, 0);
  }, [profitLossData.produits]);

  const totalCharges = useMemo(() => {
    return profitLossData.charges.reduce((sum, item) => sum + item.montant, 0);
  }, [profitLossData.charges]);

  const resultatNet = useMemo(() => {
    return totalProduits - totalCharges;
  }, [totalProduits, totalCharges]);

  const margeNette = useMemo(() => {
    return totalProduits > 0 ? (resultatNet / totalProduits) * 100 : 0;
  }, [resultatNet, totalProduits]);

  const handleExportPDF = () => {
    console.log("Generating PDF for period:", selectedPeriod, "Company:", selectedCompany);
    alert(`PDF généré pour ${profitLossData.period} - Société: ${selectedCompany === "all" ? "Toutes" : selectedCompany}`);
  };

  return {
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
  };
};
