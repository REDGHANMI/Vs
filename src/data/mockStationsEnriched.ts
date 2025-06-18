
import { Station } from "@/types/database";
import { mockStationsConsolidees } from './mockExtendedEntities';

export interface StationEnriched extends Station {
  photo_url?: string;
  date_ouverture?: string;
  statut?: "operationnel" | "maintenance" | "ferme" | "construction";
}

export const mockStationsEnriched: StationEnriched[] = mockStationsConsolidees.map(station => ({
  ...station,
  photo_url: station.id === "sta_001" ? 
    "https://prod.cdn-medias.jeuneafrique.com/cdn-cgi/image/q=auto,f=auto,metadata=none,width=1280,height=720,fit=cover/https://prod.cdn-medias.jeuneafrique.com/medias/2025/05/09/jad20250509-eco-maroc-bataille-juridique-petromin.jpg" :
    station.id === "sta_002" ? 
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=400&fit=crop" :
    station.id === "sta_003" ?
    "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=800&h=400&fit=crop" :
    station.id === "sta_004" ?
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&h=400&fit=crop" :
    station.id === "sta_005" ?
    "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=800&h=400&fit=crop" :
    station.id === "sta_006" ?
    "https://images.unsplash.com/photo-1460574283810-2aab119d8511?w=800&h=400&fit=crop" :
    station.id === "sta_007" ?
    "https://images.unsplash.com/photo-1487252665478-49b61b47f302?w=800&h=400&fit=crop" :
    station.id === "sta_008" ?
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=400&fit=crop" :
    "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=400&fit=crop",
  date_ouverture: station.id === "sta_001" ? "2018-12-30" : 
                  station.id === "sta_002" ? "2020-03-14" : 
                  station.id === "sta_003" ? "2019-06-15" :
                  station.id === "sta_004" ? "2017-07-10" :
                  station.id === "sta_005" ? "2023-09-26" :
                  station.id === "sta_006" ? "2018-12-03" :
                  station.id === "sta_007" ? "2015-07-23" :
                  station.id === "sta_008" ? "2020-01-01" :
                  "2021-01-15",
  statut: station.active ? "operationnel" : "maintenance"
}));
