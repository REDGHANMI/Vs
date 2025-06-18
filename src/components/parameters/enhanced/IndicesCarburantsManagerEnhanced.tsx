
import { useState } from "react";
import { Plus, Search, TrendingUp, Filter, MoreHorizontal, Edit, Trash2, ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import IndiceCarburantFormEnhanced from "./IndiceCarburantFormEnhanced";
import { mockIndicesCarburants } from "@/data/mockExtendedEntities";
import { IndiceCarburant } from "@/types/database-extended";

export default function IndicesCarburantsManagerEnhanced() {
  const [indices, setIndices] = useState<IndiceCarburant[]>(mockIndicesCarburants);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "gasoil" | "ssp" | "mixte">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedIndice, setSelectedIndice] = useState<IndiceCarburant | null>(null);

  const filteredIndices = indices.filter(indice => {
    const matchesSearch = indice.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         indice.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || indice.type_carburant === filterType;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && indice.active) ||
                         (filterStatus === "inactive" && !indice.active);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (indice: IndiceCarburant) => {
    setSelectedIndice(indice);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setIndices(prev => prev.filter(i => i.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedIndice(null);
  };

  const getTypeCarburantBadge = (type: string) => {
    switch (type) {
      case "gasoil":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Gasoil</Badge>;
      case "ssp":
        return <Badge variant="default" className="bg-green-100 text-green-800">SSP</Badge>;
      case "mixte":
        return <Badge variant="default" className="bg-purple-100 text-purple-800">Mixte</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getVariationIcon = (variation: number | undefined) => {
    if (!variation) return <Minus className="w-4 h-4 text-gray-400" />;
    if (variation > 0) return <ArrowUp className="w-4 h-4 text-green-600" />;
    if (variation < 0) return <ArrowDown className="w-4 h-4 text-red-600" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  const getVariationColor = (variation: number | undefined) => {
    if (!variation) return "text-gray-600";
    if (variation > 0) return "text-green-600";
    if (variation < 0) return "text-red-600";
    return "text-gray-600";
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-600" />
                Gestion des Indices Carburants
              </CardTitle>
              <CardDescription>
                Suivez et gérez les indices de prix des carburants
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvel Indice
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou source..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type carburant" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="gasoil">Gasoil</SelectItem>
                <SelectItem value="ssp">SSP</SelectItem>
                <SelectItem value="mixte">Mixte</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les indices</SelectItem>
                <SelectItem value="active">Indices actifs</SelectItem>
                <SelectItem value="inactive">Indices inactifs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indice</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Valeur Actuelle</TableHead>
                  <TableHead>Variation</TableHead>
                  <TableHead>Date Application</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIndices.map((indice) => (
                  <TableRow key={indice.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{indice.nom}</div>
                        <div className="text-sm text-gray-500">
                          {indice.frequence_mise_a_jour && (
                            <Badge variant="outline" className="text-xs">
                              {indice.frequence_mise_a_jour}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeCarburantBadge(indice.type_carburant)}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-lg">
                        {indice.valeur_indice.toFixed(2)} DH
                      </div>
                      {indice.valeur_precedente && (
                        <div className="text-sm text-gray-500">
                          Précédent: {indice.valeur_precedente.toFixed(2)} DH
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-1 ${getVariationColor(indice.variation_pourcentage)}`}>
                        {getVariationIcon(indice.variation_pourcentage)}
                        <span className="font-medium">
                          {indice.variation_pourcentage !== undefined 
                            ? `${indice.variation_pourcentage.toFixed(2)}%`
                            : "N/A"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {new Date(indice.date_application).toLocaleDateString('fr-FR')}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 max-w-32 truncate">
                        {indice.source}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={indice.active ? "default" : "secondary"}>
                        {indice.active ? "Actif" : "Inactif"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEdit(indice)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(indice.id)}>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredIndices.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun indice trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <IndiceCarburantFormEnhanced
          indice={selectedIndice}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
