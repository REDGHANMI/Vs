
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParameters } from "@/contexts/ParametersContext";
import { Gerant } from "@/types/database";

interface GerantFormProps {
  gerant?: Gerant | null;
  onClose: () => void;
}

export default function GerantForm({ gerant, onClose }: GerantFormProps) {
  const { createGerant, updateGerant } = useParameters();
  const [formData, setFormData] = useState({
    nom_complet: gerant?.nom_complet || "",
    nom: gerant?.nom || "",
    prenom: gerant?.prenom || "",
    telephone: gerant?.telephone || "",
    date_embauche: gerant?.date_embauche || "",
    poste: gerant?.poste || "Gérant",
    est_responsable_station: gerant?.est_responsable_station ?? true,
    actif: gerant?.actif ?? true,
    active: gerant?.active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (gerant) {
        await updateGerant(gerant.id, formData);
      } else {
        await createGerant(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving gerant:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {gerant ? "Modifier le gérant" : "Nouveau gérant"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom_complet">Nom complet</Label>
              <Input
                id="nom_complet"
                value={formData.nom_complet}
                onChange={(e) => setFormData(prev => ({ ...prev, nom_complet: e.target.value }))}
                placeholder="Ex: Mr. BYDAT SAID"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="nom">Nom</Label>
                <Input
                  id="nom"
                  value={formData.nom}
                  onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                  placeholder="Ex: BYDAT"
                  required
                />
              </div>
              <div>
                <Label htmlFor="prenom">Prénom</Label>
                <Input
                  id="prenom"
                  value={formData.prenom}
                  onChange={(e) => setFormData(prev => ({ ...prev, prenom: e.target.value }))}
                  placeholder="Ex: SAID"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="telephone">Téléphone</Label>
              <Input
                id="telephone"
                value={formData.telephone}
                onChange={(e) => setFormData(prev => ({ ...prev, telephone: e.target.value }))}
                placeholder="Ex: +212 6 12 34 56 78"
                required
              />
            </div>

            <div>
              <Label htmlFor="poste">Poste</Label>
              <Input
                id="poste"
                value={formData.poste}
                onChange={(e) => setFormData(prev => ({ ...prev, poste: e.target.value }))}
                placeholder="Ex: Gérant"
                required
              />
            </div>

            <div>
              <Label htmlFor="date_embauche">Date d'embauche</Label>
              <Input
                id="date_embauche"
                type="date"
                value={formData.date_embauche}
                onChange={(e) => setFormData(prev => ({ ...prev, date_embauche: e.target.value }))}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="est_responsable_station"
                checked={formData.est_responsable_station}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, est_responsable_station: !!checked }))}
              />
              <Label htmlFor="est_responsable_station">Responsable de station</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="actif"
                checked={formData.actif}
                onCheckedChange={(checked) => setFormData(prev => ({ 
                  ...prev, 
                  actif: !!checked,
                  active: !!checked 
                }))}
              />
              <Label htmlFor="actif">Gérant actif</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {gerant ? "Modifier" : "Créer"}
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="flex-1">
                Annuler
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
