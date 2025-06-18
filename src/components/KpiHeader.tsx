
import { useState } from "react";
import { Search, TrendingUp, CreditCard, AlertTriangle, Fuel, FileText } from "lucide-react";
import { Station } from "@/types/database";
import { useParameters } from "@/contexts/ParametersContext";

interface KpiHeaderProps {
  stations: Station[];
  selectedSociety: string;
  onSocietyChange: (society: string) => void;
  onHighlightStations: (stationIds: string[]) => void;
}

export default function KpiHeader({ stations, selectedSociety, onSocietyChange, onHighlightStations }: KpiHeaderProps) {
  const { mouvements, societes } = useParameters();
  const [searchTerm, setSearchTerm] = useState("");

  // Calculer les KPIs basés sur les mouvements réels
  const stationIds = stations.map(s => s.id);
  const relevantMouvements = mouvements.filter(m => stationIds.includes(m.station_id));
  const entreeMovements = relevantMouvements.filter(m => m.type === "entree");

  const totalCA = entreeMovements.reduce((sum, mouvement) => sum + mouvement.montant, 0);
  const totalEspeces = entreeMovements
    .filter(m => m.mode_paiement === "espece")
    .reduce((sum, mouvement) => sum + mouvement.montant, 0);
  const totalTPE = entreeMovements
    .filter(m => m.mode_paiement === "carte")
    .reduce((sum, mouvement) => sum + mouvement.montant, 0);

  // Estimated volume based on movements
  const totalVolume = entreeMovements.length * 1000; // Estimate 1000L per movement

  // Stations avec problèmes (pas de mouvements récents ou montants faibles)
  const stationsWithCriticalIssues = stations.filter(station => {
    const stationMouvements = mouvements.filter(m => m.station_id === station.id && m.type === "entree");
    return stationMouvements.length === 0 || 
           stationMouvements.some(m => m.montant < 10000);
  });

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  const handleCriticalIssuesClick = () => {
    onHighlightStations(stationsWithCriticalIssues.map(s => s.id));
  };

  // Get selected society data for logo display
  const selectedSocietyData = selectedSociety !== "all" 
    ? societes.find(s => s.id === selectedSociety)
    : null;

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl font-bold text-gray-900">PETROMIN Dashboard</h1>
            {selectedSocietyData?.logo_url && (
              <img 
                src={selectedSocietyData.logo_url} 
                alt={selectedSocietyData.nom}
                className="h-8 w-8 rounded object-contain bg-white border border-gray-200"
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

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher une station..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent w-64"
            />
          </div>

          {/* SAP Logo */}
          <img 
            src="https://sharpthinkit.com/wp-content/uploads/2023/09/SAP-Business-One-Cloud-01-edited.png"
            alt="SAP Business One"
            className="h-8 w-auto"
          />
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-5 gap-4">
        {/* CA Total */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600">CA Total</p>
              <p className="text-2xl font-bold text-blue-900">{formatMAD(totalCA)}</p>
              <p className="text-xs text-blue-500">Mouvements entrée</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Volume Estimé */}
        <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-orange-600">Volume Estimé</p>
              <p className="text-2xl font-bold text-orange-900">{(totalVolume / 1000).toFixed(0)}K L</p>
              <p className="text-xs text-orange-500">Estimé sur mouvements</p>
            </div>
            <Fuel className="w-8 h-8 text-orange-500" />
          </div>
        </div>

        {/* Encaissement Espèces */}
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-green-600">Espèces</p>
              <p className="text-2xl font-bold text-green-900">{formatMAD(totalEspeces)}</p>
              <p className="text-xs text-green-500">Paiements cash</p>
            </div>
            <CreditCard className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Paiements TPE */}
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-600">Paiements TPE</p>
              <p className="text-2xl font-bold text-purple-900">{formatMAD(totalTPE)}</p>
              <p className="text-xs text-purple-500">{totalCA > 0 ? Math.round((totalTPE / totalCA) * 100) : 0}% du CA</p>
            </div>
            <CreditCard className="w-8 h-8 text-purple-500" />
          </div>
        </div>

        {/* Stations Action Requise - Cliquable */}
        <div 
          onClick={handleCriticalIssuesClick}
          className={`cursor-pointer bg-gradient-to-r rounded-xl p-4 border hover:shadow-lg transition-all duration-200 ${
            stationsWithCriticalIssues.length > 0 
              ? 'from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-200' 
              : 'from-gray-50 to-gray-100 border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${stationsWithCriticalIssues.length > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                Action Requise
              </p>
              <p className={`text-2xl font-bold ${stationsWithCriticalIssues.length > 0 ? 'text-red-900' : 'text-gray-900'}`}>
                {stationsWithCriticalIssues.length}
              </p>
              <p className={`text-xs ${stationsWithCriticalIssues.length > 0 ? 'text-red-500' : 'text-gray-500'}`}>
                {stationsWithCriticalIssues.length > 0 ? 'Cliquez pour localiser' : 'Aucune intervention'}
              </p>
            </div>
            <div className="flex flex-col items-center">
              <AlertTriangle className={`w-6 h-6 ${stationsWithCriticalIssues.length > 0 ? 'text-red-500 animate-pulse' : 'text-gray-400'}`} />
              <FileText className={`w-2 h-2 ${stationsWithCriticalIssues.length > 0 ? 'text-red-400' : 'text-gray-300'}`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
