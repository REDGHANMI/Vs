
import { useState } from "react";
import { Plus, Edit, Trash2, Building2, Eye, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useParameters } from "@/contexts/ParametersContext";
import SocieteFormEnhanced from "./SocieteFormEnhanced";
import { Societe } from "@/types/database";

export default function SocietesManagerEnhanced() {
  const { societes, deleteSociete } = useParameters();
  const [editingSociete, setEditingSociete] = useState<Societe | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive">("all");

  const filteredSocietes = societes.filter(societe => {
    const matchesSearch = societe.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         societe.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || 
                         (statusFilter === "active" && societe.active) ||
                         (statusFilter === "inactive" && !societe.active);
    return matchesSearch && matchesStatus;
  });

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

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette société ? Toutes les stations associées seront également supprimées.")) {
      deleteSociete(id);
    }
  };

  const formatCurrency = (amount?: number) => {
    if (!amount) return "Non défini";
    return new Intl.NumberFormat('fr-MA', { 
      style: 'currency', 
      currency: 'MAD' 
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Gestion des Sociétés</h3>
          <p className="text-sm text-gray-600 mt-1">
            Interface avancée de gestion des sociétés. {filteredSocietes.length} société(s) affichée(s) sur {societes.length}.
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          Nouvelle société
        </Button>
      </div>

      {/* Search and Filter Bar */}
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
          <div className="flex gap-2">
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
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
            >
              {viewMode === "grid" ? "Liste" : "Grille"}
            </Button>
          </div>
        </div>
      </Card>

      {/* Enhanced Societies Grid/List */}
      <div className={viewMode === "grid" ? "grid gap-6 md:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
        {filteredSocietes.map((societe) => (
          <Card key={societe.id} className="group hover:shadow-lg transition-all duration-200 border-l-4 border-l-blue-500">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div 
                    className="p-3 rounded-lg flex-shrink-0"
                    style={{ 
                      backgroundColor: societe.couleur_theme || "#2563eb",
                      opacity: 0.1
                    }}
                  >
                    <Building2 
                      className="w-6 h-6" 
                      style={{ color: societe.couleur_theme || "#2563eb" }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <CardTitle className="text-lg truncate">{societe.nom}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <code className="bg-gray-100 px-2 py-0.5 rounded text-xs">{societe.code}</code>
                      <Badge variant={societe.active ? "default" : "secondary"} className="text-xs">
                        {societe.active ? "Active" : "Inactive"}
                      </Badge>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="space-y-3">
                {societe.description && (
                  <p className="text-sm text-gray-600 line-clamp-2">{societe.description}</p>
                )}
                
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {societe.ville && (
                    <div>
                      <span className="text-gray-500">Ville:</span>
                      <p className="font-medium truncate">{societe.ville}</p>
                    </div>
                  )}
                  {societe.capital_social && (
                    <div>
                      <span className="text-gray-500">Capital:</span>
                      <p className="font-medium">{formatCurrency(societe.capital_social)}</p>
                    </div>
                  )}
                  {societe.forme_juridique && (
                    <div>
                      <span className="text-gray-500">Forme:</span>
                      <p className="font-medium">{societe.forme_juridique}</p>
                    </div>
                  )}
                  {societe.telephone && (
                    <div>
                      <span className="text-gray-500">Tél:</span>
                      <p className="font-medium truncate">{societe.telephone}</p>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t">
                  <span className="text-xs text-gray-500">
                    Créée le {new Date(societe.created_at).toLocaleDateString('fr-FR')}
                  </span>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(societe)}
                      className="h-8 w-8 p-0 hover:bg-blue-50"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(societe.id)}
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

      {filteredSocietes.length === 0 && (
        <Card className="p-8">
          <div className="text-center">
            <Building2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune société trouvée</h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all" 
                ? "Aucune société ne correspond à vos critères de recherche."
                : "Commencez par créer votre première société."
              }
            </p>
            {!searchTerm && statusFilter === "all" && (
              <Button onClick={handleAdd} className="flex items-center gap-2 mx-auto">
                <Plus className="w-4 h-4" />
                Créer une société
              </Button>
            )}
          </div>
        </Card>
      )}

      {showForm && (
        <SocieteFormEnhanced
          societe={editingSociete}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
