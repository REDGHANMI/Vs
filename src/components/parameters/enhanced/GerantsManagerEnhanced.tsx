
import { useState } from "react";
import { Plus, Edit, Trash2, Users, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParameters } from "@/contexts/ParametersContext";
import { Gerant } from "@/types/database";
import GerantFormEnhanced from "./GerantFormEnhanced";

export default function GerantsManagerEnhanced() {
  const { gerants, deleteGerant } = useParameters();
  const [editingGerant, setEditingGerant] = useState<Gerant | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");
  const [posteFilter, setPosteFilter] = useState<"all" | "gerant" | "caissier" | "pompiste">("all");

  const filteredGerants = gerants.filter(gerant => {
    const matchesSearch = gerant.nom_complet.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gerant.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gerant.poste?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && gerant.actif) ||
                         (statusFilter === "inactive" && !gerant.actif);
    const matchesPoste = posteFilter === "all" ||
                        (posteFilter === "gerant" && gerant.est_responsable_station) ||
                        (posteFilter === "caissier" && gerant.poste?.toLowerCase().includes("caissier")) ||
                        (posteFilter === "pompiste" && gerant.poste?.toLowerCase().includes("pompiste"));
    return matchesSearch && matchesStatus && matchesPoste;
  });

  const formatCurrency = (amount?: number) => {
    if (!amount) return "Non défini";
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD' 
    }).format(amount);
  };

  const handleAdd = () => {
    console.log("GerantsManagerEnhanced: Clic sur nouveau salarié");
    setEditingGerant(null);
    setShowForm(true);
  };

  const handleEdit = (gerant: Gerant) => {
    console.log("GerantsManagerEnhanced: Clic sur modifier salarié", gerant.id);
    setEditingGerant(gerant);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    console.log("GerantsManagerEnhanced: Clic sur supprimer salarié", id);
    if (confirm("Êtes-vous sûr de vouloir supprimer ce salarié ?")) {
      deleteGerant(id);
    }
  };

  const handleCloseForm = () => {
    console.log("GerantsManagerEnhanced: Fermeture du formulaire");
    setShowForm(false);
    setEditingGerant(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Gestion des Salariés</h3>
          <p className="text-sm text-gray-600 mt-1">
            Interface avancée de gestion des salariés (gérants, caissiers, pompistes...). {filteredGerants.length} salarié(s) affiché(s) sur {gerants.length}.
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4" />
          Nouveau salarié
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Rechercher par nom, email ou poste..."
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
              <SelectItem value="active">Actifs seulement</SelectItem>
              <SelectItem value="inactive">Inactifs seulement</SelectItem>
            </SelectContent>
          </Select>
          <Select value={posteFilter} onValueChange={(value: any) => setPosteFilter(value)}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Tous les postes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les postes</SelectItem>
              <SelectItem value="gerant">Gérants</SelectItem>
              <SelectItem value="caissier">Caissiers</SelectItem>
              <SelectItem value="pompiste">Pompistes</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredGerants.map((gerant) => (
          <Card key={gerant.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-purple-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="p-3 bg-purple-50 rounded-lg flex-shrink-0">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg truncate">{gerant.nom_complet}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant={gerant.actif ? "default" : "secondary"} className="text-xs">
                        {gerant.actif ? "Actif" : "Inactif"}
                      </Badge>
                      {gerant.poste && (
                        <Badge variant="outline" className="text-xs">
                          {gerant.poste}
                        </Badge>
                      )}
                      {gerant.est_responsable_station && (
                        <Badge className="text-xs bg-orange-100 text-orange-700">
                          Responsable
                        </Badge>
                      )}
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                <div className="grid grid-cols-1 gap-3 text-sm">
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <p className="font-medium truncate">{gerant.email || "Non renseigné"}</p>
                  </div>
                  <div>
                    <span className="text-gray-500">Téléphone:</span>
                    <p className="font-medium truncate">{gerant.telephone}</p>
                  </div>
                  {gerant.ville && (
                    <div>
                      <span className="text-gray-500">Ville:</span>
                      <p className="font-medium truncate">{gerant.ville}</p>
                    </div>
                  )}
                  {gerant.salaire_base && (
                    <div>
                      <span className="text-gray-500">Salaire:</span>
                      <p className="font-medium">{formatCurrency(gerant.salaire_base)}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500">
                    Embauché le {gerant.date_embauche ? new Date(gerant.date_embauche).toLocaleDateString('fr-FR') : 'N/A'}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(gerant)}
                      className="h-8 w-8 p-0 hover:bg-purple-50"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(gerant.id)}
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

      {filteredGerants.length === 0 && (
        <Card className="p-8">
          <div className="text-center">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun salarié trouvé</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" || posteFilter !== "all"
                ? "Aucun salarié ne correspond à vos critères de recherche."
                : "Commencez par créer votre premier salarié."
              }
            </p>
            {!searchTerm && statusFilter === "all" && posteFilter === "all" && (
              <Button onClick={handleAdd} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Créer un salarié
              </Button>
            )}
          </div>
        </Card>
      )}

      {showForm && (
        <GerantFormEnhanced
          gerant={editingGerant}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
