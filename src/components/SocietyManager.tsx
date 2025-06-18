
import { Building2, Fuel, TrendingUp } from "lucide-react";
import { useParameters } from "@/contexts/ParametersContext";

interface SocietyManagerProps {
  selectedSociety: string;
  onSocietyChange: (society: string) => void;
}

export default function SocietyManager({ selectedSociety, onSocietyChange }: SocietyManagerProps) {
  const { societes, stations, mouvements } = useParameters();

  const getSocietyStats = (societeId: string) => {
    const societyStations = stations.filter(s => s.societe_id === societeId);
    const societyMouvements = mouvements.filter(m => 
      m.type === "entree" && societyStations.some(s => s.id === m.station_id)
    );
    
    const totalCA = societyMouvements.reduce((sum, mouvement) => sum + mouvement.montant, 0);
    
    return {
      stationsCount: societyStations.length,
      estimateCA: `~${(totalCA / 1000).toFixed(1)}K MAD`,
      estimateVol: `~${societyStations.length * 5000}L` // Estimated volume based on stations
    };
  };

  const getSocietyColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800 border-blue-200",
      "bg-green-100 text-green-800 border-green-200", 
      "bg-purple-100 text-purple-800 border-purple-200"
    ];
    return colors[index % colors.length];
  };

  const getSocietyIconColor = (index: number) => {
    const colors = ["text-blue-500", "text-green-500", "text-purple-500"];
    return colors[index % colors.length];
  };

  return (
    <div className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {societes.map((societe, index) => {
          const stats = getSocietyStats(societe.id);
          const isActive = selectedSociety === societe.id;

          return (
            <button
              key={societe.id}
              type="button"
              onClick={() => onSocietyChange(isActive ? "all" : societe.id)}
              className={`w-full flex flex-col items-start bg-gray-50 rounded-lg border
                transition-all shadow-sm px-5 py-3 h-full min-h-[90px]
                hover:shadow-md cursor-pointer relative
                ${isActive ? "ring-2 ring-blue-400 border-blue-200 bg-blue-50 shadow" : "border-gray-200 hover:border-blue-200"}`}
              style={{ minHeight: 80 }}
            >
              <div className="flex items-center mb-1">
                <Building2 className={`w-5 h-5 ${getSocietyIconColor(index)}`} />
                <span className={`ml-2 px-2 py-0.5 rounded border ${getSocietyColor(index)} font-semibold text-xs`}>
                  {societe.nom}
                </span>
              </div>
              <div className="text-gray-800 font-semibold text-lg">{stats.stationsCount} stations</div>
              <div className="flex items-center gap-6 text-xs text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  <span>{stats.estimateCA}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Fuel className="w-4 h-4" />
                  <span>{stats.estimateVol}</span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
