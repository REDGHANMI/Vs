import { useState } from "react";
import { TrendingUp, Fuel, FileText, Database } from "lucide-react";
import { Station } from "@/types/database";
import { useParameters } from "@/contexts/ParametersContext";
import { mockRapportsStationsEnriched } from '@/data/mockRapportsStationsEnriched';
import { mockStocksCiterneEnriched } from '@/data/mockStocksCiterneEnriched';
import PeriodeSelector, { PeriodeType } from './reports/PeriodeSelector';

interface KpiHeaderProps {
  stations: Station[];
  selectedSociety: string;
  onSocietyChange: (society: string) => void;
  onHighlightStations: (stationIds: string[]) => void;
}

export default function KpiHeader({ stations, selectedSociety, onSocietyChange, onHighlightStations }: KpiHeaderProps) {
  const { societes } = useParameters();
  const [selectedPeriode, setSelectedPeriode] = useState<PeriodeType>('mois');

  // Get period dates
  const getPeriodDates = (periode: PeriodeType, isComparison = false) => {
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const currentDate = now.getDate();

    switch (periode) {
      case 'mois':
        if (isComparison) {
          const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
          const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
          return {
            start: new Date(prevYear, prevMonth, 1),
            end: new Date(prevYear, prevMonth + 1, 0)
          };
        } else {
          return {
            start: new Date(currentYear, currentMonth, 1),
            end: new Date(currentYear, currentMonth, currentDate)
          };
        }
      case 'trimestre':
        const currentQuarter = Math.floor(currentMonth / 3);
        if (isComparison) {
          const prevQuarter = currentQuarter === 0 ? 3 : currentQuarter - 1;
          const prevYear = currentQuarter === 0 ? currentYear - 1 : currentYear;
          return {
            start: new Date(prevYear, prevQuarter * 3, 1),
            end: new Date(prevYear, (prevQuarter + 1) * 3, 0)
          };
        } else {
          return {
            start: new Date(currentYear, currentQuarter * 3, 1),
            end: new Date(currentYear, currentMonth, currentDate)
          };
        }
      case 'annee':
        if (isComparison) {
          return {
            start: new Date(currentYear - 1, 0, 1),
            end: new Date(currentYear - 1, currentMonth, currentDate)
          };
        } else {
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

  // Create mapping between mock station IDs and real station names
  const getStationMappingByName = () => {
    const mapping: { [key: string]: string } = {};
    
    // Map mock station IDs to real station IDs based on names
    const mockToRealMapping = {
      'sta_001': 'S/S HAY INARA',
      'sta_002': 'S/S CALIFORNIE', 
      'sta_003': 'S/S HASSAN II'
    };

    Object.entries(mockToRealMapping).forEach(([mockId, stationName]) => {
      const realStation = stations.find(s => s.nom === stationName);
      if (realStation) {
        mapping[mockId] = realStation.id;
      }
    });

    console.log('Station ID mapping:', mapping);
    return mapping;
  };

  // Calculate KPIs from real reports data with proper station mapping
  const calculateKpisFromReports = (startDate: Date, endDate: Date, societeId?: string) => {
    console.log('=== KPI CALCULATION DEBUG ===');
    console.log('Selected society:', societeId);
    console.log('Date range:', startDate, 'to', endDate);
    
    // Get station mapping
    const stationMapping = getStationMappingByName();
    
    // Filter stations based on society selection
    let filteredStations = stations;
    if (societeId && societeId !== 'all') {
      filteredStations = stations.filter(station => station.societe_id === societeId);
      console.log('Filtered stations for society:', filteredStations.map(s => ({ id: s.id, nom: s.nom, societe_id: s.societe_id })));
    }

    // Get the real station IDs we need to look for
    const targetStationIds = filteredStations.map(s => s.id);
    console.log('Target station IDs:', targetStationIds);

    // Find mock station IDs that correspond to our real stations
    const mockStationIds: string[] = [];
    Object.entries(stationMapping).forEach(([mockId, realId]) => {
      if (targetStationIds.includes(realId)) {
        mockStationIds.push(mockId);
      }
    });
    console.log('Corresponding mock station IDs:', mockStationIds);

    // Filter reports based on the mock station IDs and date range
    let filteredReports = mockRapportsStationsEnriched.filter(rapport => {
      const reportDate = new Date(rapport.date_rapport);
      const isInPeriod = reportDate >= startDate && reportDate <= endDate;
      const belongsToTargetStation = mockStationIds.includes(rapport.station_uuid);
      
      console.log('Report:', rapport.uuid, 'Station:', rapport.station_uuid, 'Date:', reportDate, 'In period:', isInPeriod, 'Belongs to target:', belongsToTargetStation);
      
      return isInPeriod && belongsToTargetStation;
    });

    console.log('Filtered reports count:', filteredReports.length);
    console.log('Filtered reports:', filteredReports.map(r => ({ uuid: r.uuid, station: r.station_uuid, ca: r.total_ca, volume: r.total_tonnage })));

    const caTotal = filteredReports.reduce((sum, r) => sum + r.total_ca, 0);
    const volumeTotal = filteredReports.reduce((sum, r) => sum + r.total_tonnage, 0);

    console.log('Calculated CA Total:', caTotal);
    console.log('Calculated Volume Total:', volumeTotal);

    // Calculate average tank fill rate from stocks_citernes
    const reportUuids = filteredReports.map(r => r.uuid);
    
    // Get relevant stock data
    const relevantStocks = mockStocksCiterneEnriched.filter(stock => 
      reportUuids.includes(stock.rapport_uuid)
    );

    console.log('Relevant stocks found:', relevantStocks.length);

    let tauxMoyenRemplissage = 0;
    if (relevantStocks.length > 0) {
      // Group by report and calculate fill rates
      const reportStocks: { [key: string]: typeof relevantStocks } = {};
      
      relevantStocks.forEach(stock => {
        if (!reportStocks[stock.rapport_uuid]) reportStocks[stock.rapport_uuid] = [];
        reportStocks[stock.rapport_uuid].push(stock);
      });

      let totalFillRate = 0;
      let reportCount = 0;

      Object.keys(reportStocks).forEach(reportUuid => {
        const reportStockData = reportStocks[reportUuid];
        if (reportStockData.length > 0) {
          // Calculate total for this report
          const totalStock = reportStockData.reduce((sum, stock) => sum + stock.stock_fin, 0);
          const totalCapacity = reportStockData.reduce((sum, stock) => sum + stock.capacite_max, 0);
          
          if (totalCapacity > 0) {
            const reportFillRate = (totalStock / totalCapacity) * 100;
            totalFillRate += reportFillRate;
            reportCount++;
          }
        }
      });

      if (reportCount > 0) {
        tauxMoyenRemplissage = totalFillRate / reportCount;
      }
    }

    console.log('Calculated average fill rate:', tauxMoyenRemplissage);

    const result = {
      caTotal,
      volumeTotal,
      tauxMoyenRemplissage,
      nombreRapports: filteredReports.length
    };

    console.log('=== FINAL KPI RESULT ===', result);
    return result;
  };

  const currentPeriod = getPeriodDates(selectedPeriode, false);
  const comparisonPeriod = getPeriodDates(selectedPeriode, true);

  const currentKpis = calculateKpisFromReports(currentPeriod.start, currentPeriod.end, selectedSociety);
  const comparisonKpis = calculateKpisFromReports(comparisonPeriod.start, comparisonPeriod.end, selectedSociety);

  // Calculate variations
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
    return `${amount.toFixed(0)}`;
  };

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) {
      return `${(volume / 1000000).toFixed(1)}M`;
    } else if (volume >= 1000) {
      return `${(volume / 1000).toFixed(1)}K`;
    }
    return `${volume.toFixed(0)}`;
  };

  // Stations requiring action (no recent reports)  
  const getStationsWithIssues = () => {
    let targetStations = stations;
    if (selectedSociety !== "all") {
      targetStations = stations.filter(station => station.societe_id === selectedSociety);
    }
    
    // Use the mapping to check for reports
    const stationMapping = getStationMappingByName();
    const reverseMapping: { [key: string]: string } = {};
    Object.entries(stationMapping).forEach(([mockId, realId]) => {
      reverseMapping[realId] = mockId;
    });

    return targetStations.filter(station => {
      const mockStationId = reverseMapping[station.id];
      if (!mockStationId) return true; // No mapping = no reports
      
      const stationReports = mockRapportsStationsEnriched.filter(r => r.station_uuid === mockStationId);
      return stationReports.length === 0;
    });
  };

  const stationsWithIssues = getStationsWithIssues();

  const handleCriticalIssuesClick = () => {
    onHighlightStations(stationsWithIssues.map(s => s.id));
  };

  // Get selected society data for logo display
  const selectedSocietyData = selectedSociety !== "all" 
    ? societes.find(s => s.id === selectedSociety)
    : null;

  return (
    <div className="bg-white border-b border-gray-200">
      {/* NOUVEAU: Header compact avec filtre de période déplacé */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold text-gray-900">PETROMIN Dashboard</h1>
              {selectedSocietyData?.logo_url && (
                <img 
                  src={selectedSocietyData.logo_url} 
                  alt={selectedSocietyData.nom}
                  className="h-6 w-6 rounded object-contain bg-white border border-gray-200"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
            </div>
            <div className="text-sm text-gray-500">
              Supervision Opérationnelle Multi-Stations
              {selectedSocietyData && (
                <span className="ml-2 font-medium" style={{ color: selectedSocietyData.couleur_theme }}>
                  • {selectedSocietyData.nom}
                </span>
              )}
            </div>
          </div>

          {/* DÉPLACÉ: Filtre de période + SAP Logo sur la même ligne */}
          <div className="flex items-center space-x-6">
            <PeriodeSelector 
              selectedPeriode={selectedPeriode}
              onPeriodeChange={setSelectedPeriode}
            />
            <img 
              src="https://sharpthinkit.com/wp-content/uploads/2023/09/SAP-Business-One-Cloud-01-edited.png"
              alt="SAP Business One"
              className="h-8 w-auto"
            />
          </div>
        </div>

        {/* KPI Cards - TAILLE RÉDUITE ET RAPPROCHÉES */}
        <div className="grid grid-cols-4 gap-4 mt-3">
          {/* CA Total */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-600 mb-1">Chiffre d'Affaires</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-xl font-bold text-blue-900">{formatMAD(currentKpis.caTotal)}</p>
                  <span className="text-xs text-blue-700 font-medium">MAD</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${calculateVariation(currentKpis.caTotal,   comparisonKpis.caTotal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateVariation(currentKpis.caTotal, comparisonKpis.caTotal) >= 0 ? '+' : ''}{calculateVariation(currentKpis.caTotal, comparisonKpis.caTotal).toFixed(1)}%
                  </span>
                  <span className="text-xs text-blue-500 ml-1">vs précédente</span>
                </div>
              </div>
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
          </div>

          {/* Volume Total */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-3 border border-orange-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-600 mb-1">Volume Vendu</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-xl font-bold text-orange-900">{formatVolume(currentKpis.volumeTotal)}</p>
                  <span className="text-xs text-orange-700 font-medium">Litres</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${calculateVariation(currentKpis.volumeTotal, comparisonKpis.volumeTotal) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateVariation(currentKpis.volumeTotal, comparisonKpis.volumeTotal) >= 0 ? '+' : ''}{calculateVariation(currentKpis.volumeTotal, comparisonKpis.volumeTotal).toFixed(1)}%
                  </span>
                  <span className="text-xs text-orange-500 ml-1">vs précédente</span>
                </div>
              </div>
              <Fuel className="w-6 h-6 text-orange-500" />
            </div>
          </div>

          {/* Taux Moyen de Remplissage */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-3 border border-green-200 hover:shadow-lg transition-all duration-200">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-green-600 mb-1">Taux Moyen Remplissage</p>
                <div className="flex items-baseline space-x-2">
                  <p className="text-xl font-bold text-green-900">{currentKpis.tauxMoyenRemplissage.toFixed(1)}</p>
                  <span className="text-xs text-green-700 font-medium">%</span>
                </div>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${calculateVariation(currentKpis.tauxMoyenRemplissage, comparisonKpis.tauxMoyenRemplissage) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {calculateVariation(currentKpis.tauxMoyenRemplissage, comparisonKpis.tauxMoyenRemplissage) >= 0 ? '+' : ''}{calculateVariation(currentKpis.tauxMoyenRemplissage, comparisonKpis.tauxMoyenRemplissage).toFixed(1)}%
                  </span>
                  <span className="text-xs text-green-500 ml-1">vs précédente</span>
                </div>
              </div>
              <Database className="w-6 h-6 text-green-500" />
            </div>
          </div>

          {/* Stations Action Requise */}
          <div 
            onClick={handleCriticalIssuesClick}
            className={`cursor-pointer bg-gradient-to-r rounded-xl p-3 border hover:shadow-lg transition-all duration-200 ${
              stationsWithIssues.length > 0 
                ? 'from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200' 
                : 'from-gray-50 to-gray-100 border-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className={`text-sm font-medium ${stationsWithIssues.length > 0 ? 'text-red-600' : 'text-gray-600'} mb-1`}>
                  Stations à Suivre
                </p>
                <div className="flex items-baseline space-x-2">
                  <p className={`text-xl font-bold ${stationsWithIssues.length > 0 ? 'text-red-900' : 'text-gray-900'}`}>
                    {stationsWithIssues.length}
                  </p>
                  <span className={`text-xs ${stationsWithIssues.length > 0 ? 'text-red-700' : 'text-gray-700'} font-medium`}>
                    {stationsWithIssues.length > 0 ? 'Sans rapport' : 'Toutes OK'}
                  </span>
                </div>
                <p className={`text-xs ${stationsWithIssues.length > 0 ? 'text-red-500' : 'text-gray-500'} mt-1`}>
                  {stationsWithIssues.length > 0 ? 'Cliquez pour localiser' : 'Surveillance active'}
                </p>
              </div>
              <FileText className={`w-6 h-6 ${stationsWithIssues.length > 0 ? 'text-red-500' : 'text-gray-400'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
