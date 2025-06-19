
import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, Fuel, Package, CreditCard, FileText } from 'lucide-react';
import PeriodeSelector, { PeriodeType } from './PeriodeSelector';
import KpiCard from './KpiCard';
import { mockRapportsStationsEnriched } from '@/data/mockRapportsStationsEnriched';
import { mockStationsEnriched } from '@/data/mockStationsEnriched';

interface ReportsKpiSectionProps {
  selectedSociety?: string;
}

interface KpiData {
  caTotal: number;
  volumeTotal: number;
  ventesNonCarburant: number;
  percentageCredit: number;
  nombreRapports: number;
}

export default function ReportsKpiSection({ selectedSociety }: ReportsKpiSectionProps) {
  const [selectedPeriode, setSelectedPeriode] = useState<PeriodeType>('mois');

  // Calculer les KPIs pour une période donnée
  const calculateKpis = (startDate: Date, endDate: Date, societeId?: string): KpiData => {
    let filteredReports = mockRapportsStationsEnriched.filter(rapport => {
      const reportDate = new Date(rapport.date_rapport);
      const isInPeriod = reportDate >= startDate && reportDate <= endDate;
      
      if (!isInPeriod) return false;
      
      // Filtre par société si spécifiée
      if (societeId && societeId !== 'all') {
        const station = mockStationsEnriched.find(s => s.id === rapport.station_uuid);
        return station?.societe_id === societeId;
      }
      
      return true;
    });

    const caTotal = filteredReports.reduce((sum, r) => sum + r.total_ca, 0);
    const volumeTotal = filteredReports.reduce((sum, r) => sum + r.total_tonnage, 0);
    const ventesNonCarburant = filteredReports.reduce((sum, r) => sum + (r.total_non_carburant || 0), 0);
    
    const totalCredit = filteredReports.reduce((sum, r) => sum + (r.total_vente_credit || 0), 0);
    const totalComptant = filteredReports.reduce((sum, r) => sum + (r.total_vente_comptant || 0), 0);
    const percentageCredit = totalComptant + totalCredit > 0 
      ? (totalCredit / (totalCredit + totalComptant)) * 100 
      : 0;

    return {
      caTotal,
      volumeTotal,
      ventesNonCarburant,
      percentageCredit,
      nombreRapports: filteredReports.length
    };
  };

  // Calculer les dates selon la période sélectionnée
  const getPeriodDates = (periode: PeriodeType, isComparison = false) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    switch (periode) {
      case 'mois':
        if (isComparison) {
          // Mois précédent
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return {
            start: new Date(prevYear, prevMonth, 1),
            end: new Date(prevYear, prevMonth + 1, 0)
          };
        } else {
          // Mois courant
          return {
            start: new Date(currentYear, currentMonth, 1),
            end: new Date(currentYear, currentMonth, currentDate)
          };
        }

      case 'trimestre':
        const currentQuarter = Math.floor(currentMonth / 3);
        if (isComparison) {
          // Trimestre précédent
          const prevQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
          const prevYear = currentQuarter === 0 ? currentYear - 1 : currentYear;
          return {
            start: new Date(prevYear, prevQuarter * 3, 1),
            end: new Date(prevYear, (prevQuarter + 1) * 3, 0)
          };
        } else {
          // Trimestre courant
          return {
            start: new Date(currentYear, currentQuarter * 3, 1),
            end: new Date(currentYear, currentMonth, currentDate)
          };
        }

      case 'annee':
        if (isComparison) {
          // Même période année N-1
          return {
            start: new Date(currentYear - 1, 0, 1),
            end: new Date(currentYear - 1, currentMonth, currentDate)
          };
        } else {
          // Année courante (janvier à maintenant)
          return {
            start: new Date(currentYear, 0, 1),
            end: new Date(currentYear, currentMonth, currentDate)
          };
        }

      default:
        return {
          start: new Date(currentYear, currentMonth, 1),
          end: new Date(currentYear, currentMonth, currentDate)
        };
    }
  };

  // Calculer les KPIs actuels et de comparaison
  const currentPeriod = getPeriodDates(selectedPeriode, false);
  const comparisonPeriod = getPeriodDates(selectedPeriode, true);

  const currentKpis = useMemo(() => 
    calculateKpis(currentPeriod.start, currentPeriod.end, selectedSociety),
    [currentPeriod.start, currentPeriod.end, selectedSociety]
  );

  const comparisonKpis = useMemo(() => 
    calculateKpis(comparisonPeriod.start, comparisonPeriod.end, selectedSociety),
    [comparisonPeriod.start, comparisonPeriod.end, selectedSociety]
  );

  // Calculer les variations
  const calculateVariation = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return ((current - previous) / previous) * 100;
  };

  const formatMAD = (amount: number) => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(1)}K`;
    }
    return amount.toFixed(0);
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return volume.toFixed(0);
  };

  return (
    <div className="space-y-6">
      <PeriodeSelector 
        selectedPeriode={selectedPeriode}
        onPeriodeChange={setSelectedPeriode}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
        <KpiCard
          title="CA Total"
          value={formatMAD(currentKpis.caTotal)}
          unit="MAD"
          variation={calculateVariation(currentKpis.caTotal, comparisonKpis.caTotal)}
          icon={DollarSign}
        />

        <KpiCard
          title="Volume Total Vendu"
          value={formatVolume(currentKpis.volumeTotal)}
          unit="L"
          variation={calculateVariation(currentKpis.volumeTotal, comparisonKpis.volumeTotal)}
          icon={Fuel}
        />

        <KpiCard
          title="Ventes Non Carburant"
          value={formatMAD(currentKpis.ventesNonCarburant)}
          unit="MAD"
          variation={calculateVariation(currentKpis.ventesNonCarburant, comparisonKpis.ventesNonCarburant)}
          icon={Package}
        />

        <KpiCard
          title="% Ventes à Crédit"
          value={currentKpis.percentageCredit}
          unit="%"
          variation={calculateVariation(currentKpis.percentageCredit, comparisonKpis.percentageCredit)}
          icon={CreditCard}
          isPercentage={true}
        />

        <KpiCard
          title="Nombre de Rapports"
          value={currentKpis.nombreRapports}
          variation={calculateVariation(currentKpis.nombreRapports, comparisonKpis.nombreRapports)}
          icon={FileText}
        />
      </div>
    </div>
  );
}
