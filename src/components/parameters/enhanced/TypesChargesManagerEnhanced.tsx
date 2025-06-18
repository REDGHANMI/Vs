import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mockTypesCharges } from "@/data/mockExtendedEntities";
import { TypeCharge } from "@/types/expense";
import TypeChargeForm from "./TypeChargeForm";

export default function TypesChargesManagerEnhanced() {
  const [types, setTypes] = useState<TypeCharge[]>(mockTypesCharges);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "charge" | "produit">("all");
  const [filterStatus, setFilterStatus] = useState<"all" | "active" | "inactive">("all");
  const [showForm, setShowForm] = useState(false);
  const [selectedType, setSelectedType] = useState<TypeCharge | null>(null);

  const filteredTypes = types.filter(type => {
    const matchesSearch = type.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         type.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || type.type === filterType;
    const matchesStatus = filterStatus === "all" || 
                         (filterStatus === "active" && type.active) ||
                         (filterStatus === "inactive" && !type.active);
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleEdit = (type: TypeCharge) => {
    setSelectedType(type);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setTypes(prev => prev.filter(t => t.id !== id));
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedType(null);
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "charge":
        return <Badge variant="destructive">Charge</Badge>;
      case "produit":
        return <Badge variant="default" className="bg-green-100 text-green-800">Produit</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Folder className="w-5 h-5 text-blue-600" />
                Gestion des Types de Charges
              </CardTitle>
              <CardDescription>
                Configurez les types de charges et produits comptables
              </CardDescription>
            </div>
            <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Nouveau Type
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
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="charge">Charges uniquement</SelectItem>
                <SelectItem value="produit">Produits uniquement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={(value: any) => setFilterStatus(value)}>
              <SelectTrigger className="w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="active">Types actifs</SelectItem>
                <SelectItem value="inactive">Types inactifs</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type de Charge</TableHead>
                  <TableHead>Classification</TableHead>
                  <TableHead>Compte Comptable</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Statut</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTypes.map((type) => (
                  <TableRow key={type.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        {type.couleur_theme && (
                          <div 
                            className="w-4 h-4 rounded-full border"
                            style={{ backgroundColor: type.couleur_theme }}
                          />
                        )}
                        <div>
                          <div className="font-medium">{type.nom}</div>
                          <div className="text-sm text-gray-500">{type.code}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getTypeBadge(type.type)}
                    </TableCell>
                    <TableCell>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {type.compte_comptable}
                      </code>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-48 truncate text-sm text-gray-600">
                        {type.description || "Aucune description"}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={type.active ? "default" : "secondary"}>
                        {type.active ? "Actif" : "Inactif"}
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
                          <DropdownMenuItem onClick={() => handleEdit(type)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDelete(type.id)}>
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

          {filteredTypes.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun type de charge trouvé
            </div>
          )}
        </CardContent>
      </Card>

      {showForm && (
        <TypeChargeForm
          type={selectedType}
          onClose={handleCloseForm}
        />
      )}
    </div>
  );
}
