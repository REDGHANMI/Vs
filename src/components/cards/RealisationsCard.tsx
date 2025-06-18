
import { useParameters } from "@/contexts/ParametersContext";

export default function RealisationsCard() {
  const { mouvements, stations } = useParameters();

  const getRecentActivities = () => {
    const activities = [];
    
    // Activités basées sur les mouvements récents
    if (mouvements.length > 0) {
      const latestMouvement = mouvements[mouvements.length - 1];
      const stationName = stations.find(s => s.id === latestMouvement.station_id)?.nom;
      activities.push(`- Mouvement enregistré (${stationName})`);
    }

    // Activités basées sur les stations actives
    const activeStations = stations.filter(s => s.active);
    if (activeStations.length > 0) {
      activities.push(`- ${activeStations.length} stations opérationnelles`);
    }

    // Activités de maintenance simulées
    const maintenanceMouvements = mouvements.filter(m => m.categorie === "maintenance");
    if (maintenanceMouvements.length > 0) {
      activities.push(`- ${maintenanceMouvements.length} opérations de maintenance`);
    }

    return activities.length > 0 ? activities : [
      "- Système opérationnel",
      "- Surveillance continue active", 
      "- Données synchronisées"
    ];
  };

  const activities = getRecentActivities();

  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-500">Réalisations</div>
        <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500 text-xs font-semibold">Mise à jour</span>
      </div>
      <ul className="mt-3 space-y-1 text-sm text-gray-700">
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
    </div>
  );
}
