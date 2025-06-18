
import { useParameters } from "@/contexts/ParametersContext";

export default function CAStatsCard() {
  const { mouvements } = useParameters();

  // Calculate real CA from movement data instead of reports
  const totalCA = mouvements
    .filter(m => m.type === "entree")
    .reduce((sum, mouvement) => sum + mouvement.montant, 0);
  
  // Get movements sorted by date for trend calculation
  const sortedMouvements = [...mouvements]
    .filter(m => m.type === "entree")
    .sort((a, b) => a.date_mouvement.localeCompare(b.date_mouvement));
  
  // Calculate current and previous period CA based on date ranges
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
  const fourteenDaysAgo = new Date(today);
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  
  const currentPeriodMouvements = sortedMouvements.filter(m => {
    const movementDate = new Date(m.date_mouvement);
    return movementDate >= sevenDaysAgo;
  });
  
  const previousPeriodMouvements = sortedMouvements.filter(m => {
    const movementDate = new Date(m.date_mouvement);
    return movementDate >= fourteenDaysAgo && movementDate < sevenDaysAgo;
  });
  
  const currentCA = currentPeriodMouvements.reduce((sum, mouvement) => sum + mouvement.montant, 0);
  const previousCA = previousPeriodMouvements.reduce((sum, mouvement) => sum + mouvement.montant, 0);
  
  const variation = previousCA > 0 ? ((currentCA - previousCA) / previousCA) * 100 : 0;

  // Calculate average daily CA
  const avgDailyCA = currentPeriodMouvements.length > 0 ? currentCA / Math.max(currentPeriodMouvements.length, 1) : 0;

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  return (
    <div className="col-span-2 bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-500">Chiffre d'Affaires</div>
        <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
          variation >= 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {variation >= 0 ? '+' : ''}{variation.toFixed(1)}% vs période précédente
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="text-3xl font-bold text-gray-900">{formatMAD(totalCA)}</span>
        <span className="text-sm text-gray-400">/total</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-4 pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-400">Période actuelle (7j)</p>
          <p className="text-lg font-semibold text-gray-900">{formatMAD(currentCA)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400">Moyenne quotidienne</p>
          <p className="text-lg font-semibold text-gray-900">{formatMAD(avgDailyCA)}</p>
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-400">
        Basé sur {mouvements.filter(m => m.type === "entree").length} mouvement{mouvements.filter(m => m.type === "entree").length > 1 ? 's' : ''} • Mise à jour : {new Date().toLocaleDateString('fr-FR')}
      </div>
    </div>
  );
}
