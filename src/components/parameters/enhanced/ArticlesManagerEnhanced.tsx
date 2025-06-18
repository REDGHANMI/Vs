
import { useState } from "react";
import { Plus, Search, Package, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ArticleFormEnhanced from "./ArticleFormEnhanced";
import { mockArticles, mockFamillesArticles } from "@/data/mockExtendedEntities";
import { Article } from "@/types/database-extended";

export default function ArticlesManagerEnhanced() {
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.code_article.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && article.active) ||
                         (filterStatus === "inactive" && !article.active);
    return matchesSearch && matchesStatus;
  });

  const handleEdit = (article: Article) => {
    setSelectedArticle(article);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setArticles(prev => prev.filter(a => a.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedArticle(null);
  };

  const getFamilleNom = (familleId: string) => {
    const famille = mockFamillesArticles.find(f => f.id === familleId);
    return famille?.nom || "Non définie";
  };

  const getStockStatus = (article: Article) => {
    if (!article.stock_actuel || !article.stock_minimum) return "normal";
    if (article.stock_actuel < article.stock_minimum) return "critique";
    if (article.stock_actuel < article.stock_minimum * 1.5) return "attention";
    return "normal";
  };

  const getStockBadgeVariant = (status: string) => {
    switch (status) {
      case "critique": return "destructive";
      case "attention": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                Gestion des Articles
              </CardTitle>
              <CardDescription>
                Gérez votre catalogue d'articles et produits
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouvel Article
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
                <SelectItem value="all">Tous les articles</SelectItem>
                <SelectItem value="active">Articles actifs</SelectItem>
                <SelectItem value="inactive">Articles inactifs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Article</TableHead>
                  <TableHead>Famille</TableHead>
                  <TableHead>Prix Unitaire</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Marge</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredArticles.map((article) => {
                  const stockStatus = getStockStatus(article);
                  return (
                    <TableRow key={article.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{article.nom}</div>
                          <div className="text-sm text-gray-500">{article.code_article}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {getFamilleNom(article.famille_article_id)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{article.prix_unitaire.toFixed(2)} DH</div>
                          <div className="text-sm text-gray-500">/{article.unite_mesure}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{article.stock_actuel || 0}</span>
                          <Badge variant={getStockBadgeVariant(stockStatus)} className="text-xs">
                            {stockStatus === "critique" ? "Critique" : 
                             stockStatus === "attention" ? "Attention" : "Normal"}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        {article.marge_beneficiaire ? 
                          `${article.marge_beneficiaire.toFixed(1)}%` : 
                          "N/A"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={article.active ? "default" : "secondary"}>
                          {article.active ? "Actif" : "Inactif"}
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
                            <DropdownMenuItem onClick={() => handleEdit(article)}>
                              <Edit className="w-4 h-4 mr-2" />
                              Modifier
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDelete(article.id)}>
                              <Trash2 className="w-4 h-4 mr-2" />
                              Supprimer
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun article trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <ArticleFormEnhanced
          article={selectedArticle}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
