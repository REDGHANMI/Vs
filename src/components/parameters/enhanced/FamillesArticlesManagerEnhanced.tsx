
import { useState } from "react";
import { Plus, Search, Folder, Filter, MoreHorizontal, Edit, Trash2, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import FamilleArticleFormEnhanced from "./FamilleArticleFormEnhanced";
import { mockFamillesArticles, mockArticles } from "@/data/mockExtendedEntities";
import { FamilleArticle } from "@/types/database-extended";

export default function FamillesArticlesManagerEnhanced() {
  const [familles, setFamilles] = useState<FamilleArticle[]>(mockFamillesArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedFamille, setSelectedFamille] = useState<FamilleArticle | null>(null);

  const filteredFamilles = familles.filter(famille => {
    const matchesSearch = famille.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         famille.code_famille.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && famille.active) ||
                         (filterStatus === "inactive" && !famille.active);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (famille: FamilleArticle) => {
    setSelectedFamille(famille);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setFamilles(prev => prev.filter(f => f.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedFamille(null);
  };

  const getNombreArticles = (familleId: string) => {
    return mockArticles.filter(article => article.famille_article_id === familleId).length;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-purple-600" />
                Gestion des Familles d'Articles
              </CardTitle>
              <CardDescription>
                Organisez vos articles par catégories et familles
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvelle Famille
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
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les familles</SelectItem>
                <SelectItem value="active">Familles actives</SelectItem>
                <SelectItem value="inactive">Familles inactives</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Famille</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Nb Articles</TableHead>
                  <TableHead>TVA</TableHead>
                  <TableHead>Compte</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFamilles.map((famille) => (
                  <TableRow key={famille.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {famille.couleur_theme && (
                          <div 
                            className="w-4 h-4 rounded-full border border-gray-300"
                            style={{ backgroundColor: famille.couleur_theme }}
                          />
                        )}
                        <div>
                          <div className="font-medium">{famille.nom}</div>
                          <div className="text-sm text-gray-500">{famille.code_famille}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs truncate text-sm text-gray-600">
                        {famille.description || "Aucune description"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {getNombreArticles(famille.id)} articles
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {famille.taux_tva_defaut ? `${famille.taux_tva_defaut}%` : "N/A"}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {famille.compte_comptable || "N/A"}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={famille.active ? "default" : "secondary"}>
                        {famille.active ? "Active" : "Inactive"}
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
                          <DropdownMenuItem onClick={() => handleEdit(famille)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(famille.id)}>
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

          {filteredFamilles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune famille trouvée
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <FamilleArticleFormEnhanced
          famille={selectedFamille}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
