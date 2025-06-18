
import { useState } from "react";
import { Plus, Edit, Trash2, MapPin, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParameters } from "@/contexts/ParametersContext";
import { Station } from "@/types/database";
import StationFormEnhanced from "./StationFormEnhanced";

export default function StationsManagerEnhanced() {
  const { stations, societes, deleteStation } = useParameters();
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredStations = stations.filter(station => {
    const matchesSearch = station.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (station.code_station && station.code_station.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && station.active) ||
                         (statusFilter === "inactive" && !station.active);
    return matchesSearch && matchesStatus;
  });

  const getSocieteName = (societeId: string) => {
    const societe = societes.find(s => s.id === societeId);
    return societe?.nom || "Société inconnue";
  };

  const handleAdd = () => {
    console.log("StationsManagerEnhanced: Clic sur nouveau station");
    setEditingStation(null);
    setShowForm(true);
  };

  const handleEdit = (station: Station) => {
    console.log("StationsManagerEnhanced: Clic sur modifier station", station.id);
    setEditingStation(station);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    console.log("StationsManagerEnhanced: Clic sur supprimer station", id);
    if (confirm("Êtes-vous sûr de vouloir supprimer cette station ?")) {
      deleteStation(id);
    }
  };

  const handleCloseForm = () => {
    console.log("StationsManagerEnhanced: Fermeture du formulaire");
    setShowForm(false);
    setEditingStation(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Gestion des Stations</h3>
          <p className="text-sm text-gray-600 mt-1">
            Interface avancée de gestion des stations-service. {filteredStations.length} station(s) affichée(s) sur {stations.length}.
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-green-600 hover:bg-green-700">
          <Plus className="w-4 h-4" />
          Nouvelle station
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom ou code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actives seulement</SelectItem>
              <SelectItem value="inactive">Inactives seulement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredStations.map((station) => (
          <Card key={station.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-green-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-green-50 rounded-lg flex-shrink-0">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg truncate">{station.nom}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{station.code_station || "N/A"}</code>
                      <Badge variant={station.active ? "default" : "secondary"} className="text-xs">
                        {station.active ? "Active" : "Inactive"}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Société:</span>
                    <p className="font-medium truncate">{getSocieteName(station.societe_id)}</p>
                  </div>
                  {station.ville && (
                    <div>
                      <span className="text-gray-500">Ville:</span>
                      <p className="font-medium truncate">{station.ville}</p>
                    </div>
                  )}
                  {station.adresse_complete && (
                    <div>
                      <span className="text-gray-500">Adresse:</span>
                      <p className="font-medium truncate">{station.adresse_complete}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500">
                    Créée le {new Date(station.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(station)}
                      className="h-8 w-8 p-0 hover:bg-green-50"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(station.id)}
                      className="h-8 w-8 p-0 hover:bg-red-50 text-red-600"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredStations.length === 0 && (
        <Card className="p-8">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune station trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Aucune station ne correspond à vos critères de recherche."
                : "Commencez par créer votre première station."
              }
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={handleAdd} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Créer une station
              </Button>
            )}
          </div>
        </Card>
      )}

      {showForm && (
        <StationFormEnhanced
          station={editingStation}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
