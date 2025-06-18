import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockCategoriesDepenses } from "@/data/mockExtendedEntities";
import { MouvementDepense } from "@/types/expense";

interface ExpenseFormProps {
  mouvement?: MouvementDepense | null;
  onClose: () => void;
}

export default function ExpenseForm({ mouvement, onClose }: ExpenseFormProps) {
  const [formData, setFormData] = useState({
    type: mouvement?.type || "depense",
    categorie_id: mouvement?.categorie_id || "",
    description: mouvement?.description || "",
    montant: mouvement?.montant || 0,
    date_mouvement: mouvement?.date_mouvement || new Date().toISOString().split('T')[0],
    mode_paiement: mouvement?.mode_paiement || "espece",
    numero_piece: mouvement?.numero_piece || ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sauvegarde du mouvement:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {mouvement ? "Modifier le Mouvement" : "Nouveau Mouvement"}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Type de Mouvement</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "depense" | "recette" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="depense">Dépense</SelectItem>
                    <SelectItem value="recette">Recette</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="categorie">Catégorie</Label>
                <Select 
                  value={formData.categorie_id} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, categorie_id: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner la catégorie" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategoriesDepenses.map((categorie) => (
                      <SelectItem key={categorie.id} value={categorie.id}>
                        {categorie.nom}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description du mouvement..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="montant">Montant (DH)</Label>
                <Input
                  id="montant"
                  type="number"
                  value={formData.montant}
                  onChange={(e) => setFormData(prev => ({ ...prev, montant: parseFloat(e.target.value) || 0 }))}
                  placeholder="0.00"
                  step="0.01"
                />
              </div>

              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date_mouvement}
                  onChange={(e) => setFormData(prev => ({ ...prev, date_mouvement: e.target.value }))}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="mode_paiement">Mode de Paiement</Label>
                <Select 
                  value={formData.mode_paiement} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, mode_paiement: value as any }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Mode de paiement" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="espece">Espèce</SelectItem>
                    <SelectItem value="cheque">Chèque</SelectItem>
                    <SelectItem value="virement">Virement</SelectItem>
                    <SelectItem value="carte">Carte bancaire</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="numero_piece">N° de Pièce (optionnel)</Label>
                <Input
                  id="numero_piece"
                  value={formData.numero_piece}
                  onChange={(e) => setFormData(prev => ({ ...prev, numero_piece: e.target.value }))}
                  placeholder="FAC-2024-001"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">
                {mouvement ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
