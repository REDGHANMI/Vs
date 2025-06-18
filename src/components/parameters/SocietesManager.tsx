
import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useParameters } from "@/contexts/ParametersContext";
import SocieteForm from "./SocieteForm";
import { Societe } from "@/types/database";

export default function SocietesManager() {
  const { societes, deleteSociete, loading } = useParameters();
  const [editingSociete, setEditingSociete] = useState<Societe | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (societe: Societe) => {
    setEditingSociete(societe);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingSociete(null);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingSociete(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette société ?")) {
      try {
        await deleteSociete(id);
      } catch (error) {
        console.error('Error deleting societe:', error);
      }
    }
  };

  if (loading) {
    return <div>Chargement des sociétés...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">Sociétés</h3>
          <p className="text-sm text-gray-600">Gérez les sociétés du système</p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle société
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {societes.map((societe) => (
          <Card key={societe.id}>
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{societe.nom}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">
                      {societe.code}
                    </code>
                    <Badge variant={societe.active ? "default" : "secondary"}>
                      {societe.active ? "Active" : "Inactive"}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">
                  Créée le {new Date(societe.created_at).toLocaleDateString('fr-FR')}
                </span>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(societe)}
                    className="h-8 w-8 p-0"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(societe.id)}
                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {societes.length === 0 && (
        <Card className="p-8">
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune société</h3>
            <p className="text-gray-600 mb-4">
              Commencez par créer votre première société.
            </p>
            <Button onClick={handleAdd} className="flex items-center gap-2 mx-auto">
              <Plus className="w-4 h-4" />
              Créer une société
            </Button>
          </div>
        </Card>
      )}

      {showForm && (
        <SocieteForm
          societe={editingSociete}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
