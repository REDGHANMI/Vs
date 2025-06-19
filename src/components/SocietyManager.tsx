
import { Building2, Fuel, TrendingUp, Database } from "lucide-react";
import { useParameters } from "@/contexts/ParametersContext";
import { mockRapportsStationsEnriched } from '@/data/mockRapportsStationsEnriched';
import { mockStocksCiterneEnriched } from '@/data/mockStocksCiterneEnriched';

interface SocietyManagerProps {
  selectedSociety: string;
  onSocietyChange: (society: string) => void;
}

export default function SocietyManager({ selectedSociety, onSocietyChange }: SocietyManagerProps) {
  const { societes, stations } = useParameters();

  const getSocietyStats = (societeId: string) => {
    const societyStations = stations.filter(s => s.societe_id === societeId);
    
    // Enhanced stats calculation with better mock data integration
    const stationMockIds = ['sta_001', 'sta_002', 'sta_003'];
    const mockReports = mockRapportsStationsEnriched.filter(rapport => 
      stationMockIds.includes(rapport.station_uuid)
    );

    const mockStocks = mockStocksCiterneEnriched.filter(stock => 
      mockReports.some(rapport => rapport.uuid === stock.rapport_uuid)
    );

    // Calculate average tank fill rate from mock data
    let averageFillRate = 0;
    if (mockStocks.length > 0) {
      const totalStock = mockStocks.reduce((sum, stock) => sum + stock.stock_fin, 0);
      const totalCapacity = mockStocks.reduce((sum, stock) => sum + stock.capacite_max, 0);
      averageFillRate = totalCapacity > 0 ? (totalStock / totalCapacity) * 100 : 0;
    }

    return {
      stationsCount: societyStations.length,
      fillRate: Math.round(averageFillRate * 10) / 10,
      hasData: mockStocks.length > 0
    };
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-3">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {societes.map((societe, index) => {
          const stats = getSocietyStats(societe.id);
          const isActive = selectedSociety === societe.id;

          return (
            <button
              key={societe.id}
              type="button"
              onClick={() => onSocietyChange(isActive ? "all" : societe.id)}
              className={`w-full flex items-center gap-3 bg-gray-50 rounded-xl border
                transition-all shadow-sm px-4 py-3 h-auto
                hover:shadow-lg cursor-pointer relative
                ${isActive ? "ring-2 ring-blue-400 border-blue-200 bg-blue-50 shadow-md" : "border-gray-200 hover:border-blue-200"}`}
              style={{ 
                borderLeft: `4px solid ${societe.couleur_theme || '#213385'}`,
                background: isActive 
                  ? `linear-gradient(135deg, ${societe.couleur_theme}08 0%, ${societe.couleur_theme}03 100%)`
                  : undefined
              }}
            >
              {/* Logo section */}
              <div className="flex-shrink-0">
                {societe.logo_url ? (
                  <img 
                    src={societe.logo_url} 
                    alt={societe.nom}
                    className="w-10 h-10 rounded-lg object-contain bg-white border border-gray-200 p-1 shadow-sm"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <div 
                  className={`w-10 h-10 rounded-lg bg-gradient-to-br flex items-center justify-center shadow-sm ${societe.logo_url ? 'hidden' : ''}`}
                  style={{ 
                    background: `linear-gradient(135deg, ${societe.couleur_theme || '#213385'} 0%, ${societe.couleur_theme || '#213385'}80 100%)`
                  }}
                >
                  <Building2 className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content section */}
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 
                    className="font-bold text-sm"
                    style={{ color: societe.couleur_theme || '#213385' }}
                  >
                    {societe.nom}
                  </h3>
                </div>
                
                <div className="text-gray-800 font-semibold text-base mb-1">
                  {stats.stationsCount} station{stats.stationsCount > 1 ? 's' : ''}
                </div>
                
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1">
                    <Database className="w-3 h-3 text-gray-500" />
                    <span className="text-gray-600">
                      {stats.hasData 
                        ? `Taux cuve: ${stats.fillRate}%`
                        : 'Données simulées'
                      }
                    </span>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
