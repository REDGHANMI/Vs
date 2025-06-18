
import { Notification } from '@/types/database';

export const mockNotifications: Notification[] = [
  {
    id: "notif_001",
    type: "alert",
    title: "Station sans rapport",
    message: "La station Hay Riad n'a pas transmis son rapport quotidien",
    station_id: "sta_001",
    societe_id: "soc_001",
    priority: "high",
    is_read: false,
    created_at: "2025-01-16T08:30:00Z"
  },
  {
    id: "notif_002",
    type: "warning",
    title: "Variation CA inhabituelle",
    message: "Baisse de 35% du CA par rapport à hier",
    station_id: "sta_002",
    societe_id: "soc_001",
    priority: "medium",
    is_read: false,
    created_at: "2025-01-16T09:15:00Z"
  },
  {
    id: "notif_003",
    type: "alert",
    title: "Anomalie stock",
    message: "Retour cuve supérieur aux sorties - vérification nécessaire",
    station_id: "sta_001",
    societe_id: "soc_001",
    priority: "critical",
    is_read: false,
    created_at: "2025-01-16T10:45:00Z"
  },
  {
    id: "notif_004",
    type: "info",
    title: "Nouveau prix carburant",
    message: "Mise à jour des prix effective pour toutes les stations",
    societe_id: "soc_001",
    priority: "low",
    is_read: true,
    created_at: "2025-01-15T14:20:00Z"
  },
  {
    id: "notif_005",
    type: "success",
    title: "Rapport validé",
    message: "Rapport quotidien de la station Maarif validé avec succès",
    station_id: "sta_002",
    societe_id: "soc_001",
    priority: "low",
    is_read: true,
    created_at: "2025-01-15T18:30:00Z"
  }
];
