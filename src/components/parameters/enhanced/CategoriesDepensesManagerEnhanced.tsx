
import { useState } from "react";
import { Plus, Search, Wallet, Filter, MoreHorizontal, Edit, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CategorieDepenseFormEnhanced from "./CategorieDepenseFormEnhanced";
import { mockCategoriesDepenses } from "@/data/mockExtendedEntities";
import { CategorieDepense } from "@/types/database-extended";

export default function CategoriesDepensesManagerEnhanced() {
  const [categories, setCategories] = useState<CategorieDepense[]>(mockCategoriesDepenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "fixe" | "variable" | "exceptionnelle">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedCategorie, setSelectedCategorie] = useState<CategorieDepense | null>(null);

  const filteredCategories = categories.filter(categorie => {
    const matchesSearch = categorie.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         categorie.code_categorie.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || categorie.type_depense === filterType;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && categorie.active) ||
                         (filterStatus === "inactive" && !categorie.active);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (categorie: CategorieDepense) => {
    setSelectedCategorie(categorie);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setCategories(prev => prev.filter(c => c.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedCategorie(null);
  };

  const getTypeDepenseBadge = (type: string) => {
    switch (type) {
      case "fixe":
        return <Badge variant="default" className="bg-blue-100 text-blue-800">Fixe</Badge>;
      case "variable":
        return <Badge variant="default" className="bg-green-100 text-green-800">Variable</Badge>;
      case "exceptionnelle":
        return <Badge variant="default" className="bg-orange-100 text-orange-800">Exceptionnelle</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  const getNiveauAutorisationBadge = (niveau?: string) => {
    switch (niveau) {
      case "gerant":
        return <Badge variant="outline" className="text-green-700 border-green-300">Gérant</Badge>;
      case "manager":
        return <Badge variant="outline" className="text-blue-700 border-blue-300">Manager</Badge>;
      case "direction":
        return <Badge variant="outline" className="text-red-700 border-red-300">Direction</Badge>;
      default:
        return <Badge variant="secondary">N/A</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="w-5 h-5 text-green-600" />
                Gestion des Catégories de Dépenses
              </CardTitle>
              <CardDescription>
                Organisez et contrôlez vos catégories de dépenses
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Catégorie
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par nom ou code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Type dépense" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="fixe">Dépenses fixes</SelectItem>
                <SelectItem value="variable">Dépenses variables</SelectItem>
                <SelectItem value="exceptionnelle">Dépenses exceptionnelles</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                <SelectItem value="active">Catégories actives</SelectItem>
                <SelectItem value="inactive">Catégories inactives</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Budget Mensuel</TableHead>
                  <TableHead>Autorisation</TableHead>
                  <TableHead>Compte Comptable</TableHead>
                  <TableHead>Responsable</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCategories.map((categorie) => (
                  <TableRow key={categorie.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{categorie.nom}</div>
                        <div className="text-sm text-gray-500">{categorie.code_categorie}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeDepenseBadge(categorie.type_depense)}
                    </TableCell>
                    <TableCell>
                      <div>
                        {categorie.budget_mensuel ? (
                          <>
                            <div className="font-medium">{categorie.budget_mensuel.toLocaleString()} DH</div>
                            {categorie.seuil_alerte && (
                              <div className="text-sm text-orange-600 flex items-center gap-1">
                                <AlertTriangle className="w-3 h-3" />
                                Seuil: {categorie.seuil_alerte.toLocaleString()} DH
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="text-gray-500">Non défini</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {categorie.autorisation_requise ? (
                          getNiveauAutorisationBadge(categorie.niveau_autorisation)
                        ) : (
                          <Badge variant="secondary">Aucune</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {categorie.compte_comptable || "N/A"}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600 max-w-32 truncate">
                        {categorie.responsable || "Non assigné"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={categorie.active ? "default" : "secondary"}>
                        {categorie.active ? "Active" : "Inactive"}
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
                          <DropdownMenuItem onClick={() => handleEdit(categorie)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(categorie.id)}>
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

          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune catégorie trouvée
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <CategorieDepenseFormEnhanced
          categorie={selectedCategorie}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
