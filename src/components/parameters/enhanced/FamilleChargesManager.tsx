
import { useState } from "react";
import { Plus, Edit, Trash2, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import FamilleChargesForm from "./FamilleChargesForm";

export interface FamilleCharge {
  id: string;
  nom: string;
  code: string;
  type: "charge" | "produit";
  compte_comptable: string;
  description?: string;
  active: boolean;
  created_at: string;
}

// Données mock pour les familles de charges
const mockFamillesCharges: FamilleCharge[] = [
  {
    id: "fc_001",
    nom: "Carburants",
    code: "CARB",
    type: "charge",
    compte_comptable: "6122",
    description: "Achats de carburants",
    active: true,
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "fc_002",
    nom: "Lubrifiants", 
    code: "LUBR",
    type: "charge",
    compte_comptable: "6123",
    description: "Achats de lubrifiants",
    active: true,
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "fc_003",
    nom: "Maintenance",
    code: "MAINT",
    type: "charge",
    compte_comptable: "6156",
    description: "Frais de maintenance et entretien",
    active: true,
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "fc_004",
    nom: "Ventes Carburants",
    code: "VCARB",
    type: "produit",
    compte_comptable: "7121",
    description: "Ventes de carburants",
    active: true,
    created_at: "2025-01-01T00:00:00Z"
  },
  {
    id: "fc_005",
    nom: "Ventes Lubrifiants",
    code: "VLUBR", 
    type: "produit",
    compte_comptable: "7122",
    description: "Ventes de lubrifiants",
    active: true,
    created_at: "2025-01-01T00:00:00Z"
  }
];

export default function FamilleChargesManager() {
  const [famillesCharges, setFamillesCharges] = useState<FamilleCharge[]>(mockFamillesCharges);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFamille, setSelectedFamille] = useState<FamilleCharge | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const filteredFamilles = famillesCharges.filter(famille =>
    famille.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    famille.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    famille.compte_comptable.includes(searchTerm)
  );

  const handleAdd = () => {
    setSelectedFamille(null);
    setIsFormOpen(true);
  };

  const handleEdit = (famille: FamilleCharge) => {
    setSelectedFamille(famille);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette famille de charges ?")) {
      setFamillesCharges(prev => prev.filter(f => f.id !== id));
      console.log("FamilleChargesManager: Famille supprimée", id);
    }
  };

  const handleSave = (familleData: Omit<FamilleCharge, 'id' | 'created_at'>) => {
    if (selectedFamille) {
      // Modification
      setFamillesCharges(prev => prev.map(f => 
        f.id === selectedFamille.id 
          ? { ...f, ...familleData }
          : f
      ));
      console.log("FamilleChargesManager: Famille modifiée", selectedFamille.id);
    } else {
      // Ajout
      const newFamille: FamilleCharge = {
        id: `fc_${Date.now()}`,
        ...familleData,
        created_at: new Date().toISOString()
      };
      setFamillesCharges(prev => [...prev, newFamille]);
      console.log("FamilleChargesManager: Nouvelle famille créée", newFamille.id);
    }
    setIsFormOpen(false);
    setSelectedFamille(null);
  };

  const chargesCount = famillesCharges.filter(f => f.type === "charge").length;
  const produitsCount = famillesCharges.filter(f => f.type === "produit").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Familles de Charges</h2>
          <p className="text-gray-600">
            Gestion des familles de charges et produits pour le compte de résultat
          </p>
        </div>
        <Button onClick={handleAdd} className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Nouvelle famille
        </Button>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-gray-600">Familles Charges</p>
                <p className="text-2xl font-bold">{chargesCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-600">Familles Produits</p>
                <p className="text-2xl font-bold">{produitsCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-gray-600">Total Familles</p>
                <p className="text-2xl font-bold">{famillesCharges.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtres */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Input
              placeholder="Rechercher par nom, code ou compte..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />
          </div>
        </CardContent>
      </Card>

      {/* Tableau des familles de charges */}
      <Card>
        <CardHeader>
          <CardTitle>
            Familles de charges et produits ({filteredFamilles.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Compte comptable</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredFamilles.map((famille) => (
                <TableRow key={famille.id}>
                  <TableCell className="font-medium">{famille.nom}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{famille.code}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant={famille.type === "charge" ? "destructive" : "default"}
                      className={famille.type === "charge" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}
                    >
                      {famille.type === "charge" ? "Charge" : "Produit"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {famille.compte_comptable}
                    </code>
                  </TableCell>
                  <TableCell className="max-w-xs truncate">
                    {famille.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Badge variant={famille.active ? "default" : "secondary"}>
                      {famille.active ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(famille)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(famille.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {filteredFamilles.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucune famille de charges trouvée
            </div>
          )}
        </CardContent>
      </Card>

      {/* Formulaire */}
      {isFormOpen && (
        <FamilleChargesForm
          famille={selectedFamille}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedFamille(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
