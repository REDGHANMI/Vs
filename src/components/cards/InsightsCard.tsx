
import { useParameters } from "@/contexts/ParametersContext";

export default function InsightsCard() {
  const { mouvements, stations } = useParameters();

  // Analyser les données des mouvements pour générer des insights
  const analyzeData = () => {
    const entreeMovements = mouvements.filter(m => m.type === "entree");
    if (entreeMovements.length === 0) return null;

    // Trouver la station avec le plus grand CA
    const stationCA = entreeMovements.reduce((acc, mouvement) => {
      const stationName = stations.find(s => s.id === mouvement.station_id)?.nom || "Station inconnue";
      acc[stationName] = (acc[stationName] || 0) + Number(mouvement.montant);
      return acc;
    }, {} as Record<string, number>);

    const topStation = Object.entries(stationCA)
      .sort(([,a], [,b]) => Number(b) - Number(a))[0];

    // Vérifier les stations avec de faibles revenus
    const lowPerformingStations = Object.entries(stationCA)
      .filter(([, ca]) => Number(ca) < 50000)
      .map(([stationName]) => stationName);

    return {
      topStation: topStation?.[0],
      topCA: topStation?.[1],
      lowStations: lowPerformingStations
    };
  };

  const insights = analyzeData();

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col min-h-[125px]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-600">Insights</div>
        <span className="bg-blue-100 px-2 py-0.5 rounded text-blue-500 text-xs font-semibold">Nouveau</span>
      </div>
      <div className="text-gray-800 text-sm mt-1">
        {insights ? (
          <>
            Top performance : <span className="font-bold text-green-500">{insights.topStation}</span> avec {(Number(insights.topCA) / 1000).toFixed(1)}K MAD. <br />
            {insights.lowStations.length > 0 && (
              <>A surveiller : performance faible sur {insights.lowStations[0]}.</>
            )}
          </>
        ) : (
          <>
            Aucune donnée disponible pour générer des insights. <br />
            Ajoutez des mouvements pour voir les analyses.
          </>
        )}
      </div>
    </div>
  );
}
