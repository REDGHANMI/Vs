
import { useState } from "react";
import { Plus, Edit, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParameters } from "@/contexts/ParametersContext";
import GerantForm from "./GerantForm";
import { Gerant } from "@/types/database";

export default function GerantsManager() {
  const { gerants, deleteGerant, stations } = useParameters();
  const [editingGerant, setEditingGerant] = useState<Gerant | null>(null);
  const [showForm, setShowForm] = useState(false);

  const getStationsCount = (gerantId: string) => {
    return stations.filter(s => s.gerant_id === gerantId).length;
  };

  const handleEdit = (gerant: Gerant) => {
    setEditingGerant(gerant);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingGerant(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingGerant(null);
  };

  const handleDelete = (id: string) => {
    const stationsCount = getStationsCount(id);
    const confirmMessage = stationsCount > 0 
      ? `Ce gérant est assigné à ${stationsCount} station(s). Êtes-vous sûr de vouloir le supprimer ?`
      : "Êtes-vous sûr de vouloir supprimer ce gérant ?";
      
    if (confirm(confirmMessage)) {
      deleteGerant(id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Gestion des Gérants</h3>
          <p className="text-sm text-gray-600">
            Gérez les gérants des stations. {gerants.length} gérant(s) configuré(s).
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouveau gérant
        </Button>
      </div>

      <div className="grid gap-4">
        {gerants.map((gerant) => {
          const stationsCount = getStationsCount(gerant.id);
          
          return (
            <Card key={gerant.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{gerant.nom_complet}</h4>
                    <p className="text-sm text-gray-600">
                      Téléphone: {gerant.telephone}
                    </p>
                    <p className="text-sm text-gray-500">
                      {stationsCount} station(s) assignée(s)
                    </p>
                    <p className="text-xs text-gray-500">
                      Embauché le {gerant.date_embauche ? new Date(gerant.date_embauche).toLocaleDateString() : "Date inconnue"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={gerant.active ? "default" : "secondary"}>
                    {gerant.active ? "Actif" : "Inactif"}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(gerant)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(gerant.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {showForm && (
        <GerantForm
          gerant={editingGerant}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
