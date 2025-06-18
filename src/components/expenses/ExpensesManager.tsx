import { useState } from "react";
import { Plus, Search, TrendingDown, TrendingUp, Filter, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockMouvementsDepenses, mockCategoriesDepenses } from "@/data/mockExtendedEntities";
import { MouvementDepense } from "@/types/expense";
import ExpenseForm from "./ExpenseForm";

export default function ExpensesManager() {
  const [mouvements, setMouvements] = useState<MouvementDepense[]>(mockMouvementsDepenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "depense" | "recette">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedMouvement, setSelectedMouvement] = useState<MouvementDepense | null>(null);

  const filteredMouvements = mouvements.filter(mouvement => {
    const matchesSearch = mouvement.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || mouvement.type === filterType;
    return matchesSearch && matchesType;
  });

  const totalDepenses = mouvements
    .filter(m => m.type === "depense")
    .reduce((sum, m) => sum + m.montant, 0);

  const totalRecettes = mouvements
    .filter(m => m.type === "recette")
    .reduce((sum, m) => sum + m.montant, 0);

  const handleEdit = (mouvement: MouvementDepense) => {
    setSelectedMouvement(mouvement);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setMouvements(prev => prev.filter(m => m.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedMouvement(null);
  };

  const getCategorieNom = (categorieId: string) => {
    return mockCategoriesDepenses.find(c => c.id === categorieId)?.nom || "N/A";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Dépenses</p>
                <p className="text-2xl font-bold text-red-600">{totalDepenses.toLocaleString()} DH</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recettes</p>
                <p className="text-2xl font-bold text-green-600">{totalRecettes.toLocaleString()} DH</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Résultat Net</p>
                <p className={`text-2xl font-bold ${totalRecettes - totalDepenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {(totalRecettes - totalDepenses).toLocaleString()} DH
                </p>
              </div>
              <TrendingUp className={`w-8 h-8 ${totalRecettes - totalDepenses >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Gestion des Mouvements</CardTitle>
              <CardDescription>
                Suivi des dépenses et recettes de vos stations
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Mouvement
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Rechercher par description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les mouvements</SelectItem>
                <SelectItem value="depense">Dépenses uniquement</SelectItem>
                <SelectItem value="recette">Recettes uniquement</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Catégorie</TableHead>
                  <TableHead>Montant</TableHead>
                  <TableHead>Mode Paiement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMouvements.map((mouvement) => (
                  <TableRow key={mouvement.id}>
                    <TableCell>
                      {new Date(mouvement.date_mouvement).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={mouvement.type === "depense" ? "destructive" : "default"}>
                        {mouvement.type === "depense" ? "Dépense" : "Recette"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{mouvement.description}</div>
                        {mouvement.numero_piece && (
                          <div className="text-sm text-gray-500">Pièce: {mouvement.numero_piece}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getCategorieNom(mouvement.categorie_id)}
                    </TableCell>
                    <TableCell>
                      <span className={mouvement.type === "depense" ? "text-red-600 font-medium" : "text-green-600 font-medium"}>
                        {mouvement.type === "depense" ? "-" : "+"}{mouvement.montant.toLocaleString()} DH
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {mouvement.mode_paiement}
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
                          <DropdownMenuItem onClick={() => handleEdit(mouvement)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(mouvement.id)}>
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

          {filteredMouvements.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun mouvement trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <ExpenseForm
          mouvement={selectedMouvement}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
