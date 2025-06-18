
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TypeCharge } from "@/types/expense";

interface TypeChargeFormProps {
  type?: TypeCharge | null;
  onClose: () => void;
}

export default function TypeChargeForm({ type, onClose }: TypeChargeFormProps) {
  const [formData, setFormData] = useState({
    nom: type?.nom || "",
    code: type?.code || "",
    type: type?.type || "charge",
    compte_comptable: type?.compte_comptable || "",
    description: type?.description || "",
    active: type?.active ?? true,
    couleur_theme: type?.couleur_theme || "#FF6B35"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sauvegarde du type de charge:", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>
              {type ? "Modifier le Type de Charge" : "Nouveau Type de Charge"}
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
                <Label htmlFor="nom">Nom du Type</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                  placeholder="Ex: Charges Opérationnelles"
                />
              </div>

              <div>
                <Label htmlFor="code">Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                  placeholder="Ex: OPER"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="type">Classification</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value) => setFormData(prev => ({ ...prev, type: value as "charge" | "produit" }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner le type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="charge">Charge</SelectItem>
                    <SelectItem value="produit">Produit</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="compte_comptable">Compte Comptable</Label>
                <Input
                  id="compte_comptable"
                  value={formData.compte_comptable}
                  onChange={(e) => setFormData(prev => ({ ...prev, compte_comptable: e.target.value }))}
                  placeholder="Ex: 6100000"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Description du type de charge..."
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="couleur">Couleur Thème</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    id="couleur"
                    value={formData.couleur_theme}
                    onChange={(e) => setFormData(prev => ({ ...prev, couleur_theme: e.target.value }))}
                    className="w-12 h-10 rounded border"
                  />
                  <Input
                    value={formData.couleur_theme}
                    onChange={(e) => setFormData(prev => ({ ...prev, couleur_theme: e.target.value }))}
                    placeholder="#FF6B35"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="active"
                  checked={formData.active}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
                />
                <Label htmlFor="active">Type actif</Label>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Annuler
              </Button>
              <Button type="submit">
                {type ? "Modifier" : "Créer"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
