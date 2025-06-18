
import { User } from '@/types/database';

export const mockUsers: User[] = [
  {
    id: "user_001",
    nom_complet: "Ahmed El Mansouri",
    email: "ahmed.elmansouri@petromin.ma",
    telephone: "+212661234567",
    role: "admin",
    societe_id: "soc_001",
    active: true,
    last_login: "2025-01-16T08:00:00Z",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "user_002",
    nom_complet: "Fatima Zahra Bennani",
    email: "fatima.bennani@petromin.ma",
    telephone: "+212662345678",
    role: "gestionnaire",
    societe_id: "soc_001",
    active: true,
    last_login: "2025-01-16T07:30:00Z",
    created_at: "2024-02-10T14:30:00Z"
  },
  {
    id: "user_003",
    nom_complet: "Mohamed Alaoui",
    email: "mohamed.alaoui@petromin.ma",
    telephone: "+212663456789",
    role: "operateur",
    societe_id: "soc_001",
    active: true,
    last_login: "2025-01-15T22:15:00Z",
    created_at: "2024-03-05T09:15:00Z"
  },
  {
    id: "user_004",
    nom_complet: "Laila Idrissi",
    email: "laila.idrissi@consultant.ma",
    telephone: "+212664567890",
    role: "consultant",
    active: true,
    last_login: "2025-01-14T16:45:00Z",
    created_at: "2024-06-20T11:00:00Z"
  }
];
