
import { useState } from "react";
import { Plus, Edit, Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParameters } from "@/contexts/ParametersContext";
import StationForm from "./StationForm";
import { Station } from "@/types/database";

export default function StationsManager() {
  const { stations, societes, gerants, deleteStation } = useParameters();
  const [editingStation, setEditingStation] = useState<Station | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [filterSociete, setFilterSociete] = useState<string>("all");

  const filteredStations = filterSociete === "all" 
    ? stations 
    : stations.filter(s => s.societe_id === filterSociete);

  const getSocieteName = (societeId: string) => {
    return societes.find(s => s.id === societeId)?.nom || "Société inconnue";
  };

  const getGerantName = (gerantId: string) => {
    return gerants.find(g => g.id === gerantId)?.nom_complet || "Gérant non assigné";
  };

  const handleEdit = (station: Station) => {
    setEditingStation(station);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingStation(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingStation(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette station ?")) {
      deleteStation(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestion des Stations</h3>
          <p className="text-sm text-gray-600">
            Gérez les stations-service. {filteredStations.length} station(s) affichée(s).
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={filterSociete} onValueChange={setFilterSociete}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filtrer par société" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Toutes les sociétés</SelectItem>
              {societes.map(societe => (
                <SelectItem key={societe.id} value={societe.id}>
                  {societe.nom}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleAdd} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Nouvelle station
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredStations.map((station) => (
          <Card key={station.id}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-50 rounded-lg">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold">{station.nom}</h4>
                  <p className="text-sm text-gray-600">
                    Code: {station.code_station} • {getSocieteName(station.societe_id)}
                  </p>
                  <p className="text-sm text-gray-500">
                    Gérant: {getGerantName(station.gerant_id)}
                  </p>
                  <p className="text-xs text-gray-500">
                    Mise en service: {station.date_mise_en_service ? new Date(station.date_mise_en_service).toLocaleDateString() : "Non définie"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={station.active ? "default" : "secondary"}>
                  {station.active ? "Active" : "Inactive"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEdit(station)}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDelete(station.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {showForm && (
        <StationForm
          station={editingStation}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
