import { useState } from "react";
import { AlertTriangle, Clock, TrendingDown, FileX, ChevronRight, X, MessageCircle, Mail } from "lucide-react";
import { Station } from "@/types/database";
import { useParameters } from "@/contexts/ParametersContext";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface AlertsPanelProps {
  stations: Station[];
  onStationSelect: (stationId: string) => void;
  onHighlightStations: (stationIds: string[]) => void;
}

export default function AlertsPanel({ stations, onStationSelect, onHighlightStations }: AlertsPanelProps) {
  const { notifications, mouvements } = useParameters();
  const [isOpen, setIsOpen] = useState(false);
  const [activeAlert, setActiveAlert] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  // Get stations with low CA based on real movement data
  const getStationsWithLowCash = () => {
    return stations.filter(station => {
      const stationMouvements = mouvements.filter(m => m.station_id === station.id && m.type === "entree");
      const latestMouvement = stationMouvements[stationMouvements.length - 1];
      return latestMouvement && latestMouvement.montant < 50000; // Less than 50K MAD
    });
  };

  // Get stations with brutal variation based on real movement data
  const getStationsWithBrutalVariation = () => {
    return stations.filter(station => {
      const stationMouvements = mouvements
        .filter(m => m.station_id === station.id && m.type === "entree")
        .sort((a, b) => b.date_mouvement.localeCompare(a.date_mouvement));
      if (stationMouvements.length < 2) return false;
      
      const latest = stationMouvements[0];
      const previous = stationMouvements[1];
      const variation = ((latest.montant - previous.montant) / previous.montant) * 100;
      
      return variation <= -30; // 30% drop or more
    });
  };

  // Get stations without recent movements
  const getStationsWithoutMovement = () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    return stations.filter(station => {
      const stationMouvements = mouvements.filter(m => m.station_id === station.id);
      const hasRecentMovement = stationMouvements.some(m => m.date_mouvement >= yesterdayStr);
      return !hasRecentMovement;
    });
  };

  // Get stations with anomalies from notifications
  const getStationsWithAnomaly = () => {
    const anomalyNotifications = notifications.filter(n => 
      n.type === "alert" && n.station_id && n.message.toLowerCase().includes('anomalie')
    );
    const stationIds = anomalyNotifications.map(n => n.station_id!);
    return stations.filter(s => stationIds.includes(s.id));
  };

  const alerts = [
    {
      id: "low_cash",
      title: "CA faible < 50K MAD",
      icon: TrendingDown,
      color: "text-red-600",
      bgColor: "bg-red-50",
      stations: getStationsWithLowCash(),
      description: "Stations avec des mouvements inférieurs à 50K MAD"
    },
    {
      id: "brutal_variation",
      title: "Variation brutale -30%",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      stations: getStationsWithBrutalVariation(),
      description: "Chute de montant significative vs mouvement précédent"
    },
    {
      id: "no_movement",
      title: "Mouvement absent",
      icon: FileX,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
      stations: getStationsWithoutMovement(),
      description: "Stations sans mouvement récent"
    },
    {
      id: "anomaly",
      title: "Anomalies détectées",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      stations: getStationsWithAnomaly(),
      description: "Anomalies signalées dans les notifications"
    }
  ];

  const totalAlerts = alerts.reduce((sum, alert) => sum + alert.stations.length, 0);
  const criticalNotifications = notifications.filter(n => n.priority === "critical" && !n.is_read).length;

  const handleAlertClick = (alert: any) => {
    setActiveAlert(activeAlert === alert.id ? null : alert.id);
    onHighlightStations(alert.stations.map((s: Station) => s.id));
  };

  const handleStationClick = (stationId: string) => {
    onStationSelect(stationId);
    setIsOpen(false);
  };

  const handleContactStation = (station: Station) => {
    setSelectedStation(station);
  };

  return (
    <>
      {/* Alert Trigger Button */}
      <div className="absolute top-4 right-4 z-30">
        <button
          onClick={() => setIsOpen(true)}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg shadow-lg transition-all duration-200 ${
            totalAlerts > 0 || criticalNotifications > 0
              ? "bg-red-500 hover:bg-red-600 text-white animate-pulse" 
              : "bg-white hover:bg-gray-50 text-gray-700"
          }`}
        >
          <AlertTriangle className={`w-5 h-5 ${totalAlerts > 0 || criticalNotifications > 0 ? "text-white" : "text-gray-500"}`} />
          <span className="font-semibold">
            {totalAlerts > 0 || criticalNotifications > 0 
              ? `${totalAlerts + criticalNotifications} Alertes` 
              : "Aucune alerte"}
          </span>
        </button>
      </div>

      {/* Alert Panel Slide */}
      <div className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-red-50">
            <h2 className="text-lg font-semibold text-gray-900">Alertes Métier</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 hover:bg-red-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Critical Notifications */}
          {criticalNotifications > 0 && (
            <div className="p-4 bg-red-100 border-b">
              <div className="flex items-center space-x-2 text-red-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">{criticalNotifications} notification(s) critique(s)</span>
              </div>
            </div>
          )}

          {/* Alerts List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => handleAlertClick(alert)}
                  className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${alert.bgColor}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <alert.icon className={`w-5 h-5 ${alert.color}`} />
                      <div>
                        <p className="font-medium text-gray-900">{alert.title}</p>
                        <p className="text-sm text-gray-600">{alert.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        alert.stations.length > 0 ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-600"
                      }`}>
                        {alert.stations.length}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${
                        activeAlert === alert.id ? "rotate-90" : ""
                      }`} />
                    </div>
                  </div>
                </button>

                {/* Stations List */}
                {activeAlert === alert.id && alert.stations.length > 0 && (
                  <div className="border-t border-gray-200 bg-white">
                    {alert.stations.map(station => (
                      <div key={station.id} className="p-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => handleStationClick(station.id)}
                            className="flex-1 text-left hover:bg-gray-50 p-2 rounded transition-colors"
                          >
                            <div>
                              <p className="font-medium text-gray-900">{station.nom}</p>
                              <p className="text-sm text-gray-600">
                                {station.gerant?.nom_complet || 'Gérant non assigné'} • {station.societe?.nom || 'Société inconnue'}
                              </p>
                              {alert.id === "low_cash" && (
                                <p className="text-xs text-red-600">
                                  Dernier mouvement: {mouvements.filter(m => m.station_id === station.id && m.type === "entree").slice(-1)[0]?.montant.toLocaleString() || 0} MAD
                                </p>
                              )}
                            </div>
                          </button>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleContactStation(station)}
                                className="ml-2 flex items-center space-x-1"
                              >
                                <MessageCircle className="w-4 h-4" />
                                <span>Contact</span>
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Contacter la station {station.nom}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <h4 className="font-medium mb-2">Message prérédigé :</h4>
                                  <p className="text-sm text-gray-700">
                                    "Bonjour, nous avons détecté une anomalie dans les données de votre station. 
                                    Pouvez-vous nous fournir des explications sur cet écart ? Merci."
                                  </p>
                                </div>
                                <div className="flex space-x-3">
                                  <Button 
                                    className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => {
                                      alert('Simulation : Message WhatsApp envoyé !');
                                    }}
                                  >
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    WhatsApp
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="flex-1"
                                    onClick={() => {
                                      alert('Simulation : Email envoyé !');
                                    }}
                                  >
                                    <Mail className="w-4 h-4 mr-2" />
                                    Email
                                  </Button>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Real Notifications Display */}
            {notifications.filter(n => !n.is_read).length > 0 && (
              <div className="border border-gray-200 rounded-lg p-4 bg-blue-50">
                <h3 className="font-semibold text-blue-900 mb-2">Notifications récentes</h3>
                <div className="space-y-2">
                  {notifications.filter(n => !n.is_read).slice(0, 3).map(notification => (
                    <div key={notification.id} className="text-sm">
                      <p className="font-medium text-blue-800">{notification.title}</p>
                      <p className="text-blue-600">{notification.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
