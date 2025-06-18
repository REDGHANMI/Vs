
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParameters } from "@/contexts/ParametersContext";
import { Societe } from "@/types/database";

interface SocieteFormProps {
  societe?: Societe | null;
  onClose: () => void;
}

export default function SocieteForm({ societe, onClose }: SocieteFormProps) {
  const { createSociete, updateSociete } = useParameters();
  const [formData, setFormData] = useState({
    nom: societe?.nom || "",
    code: societe?.code || "",
    active: societe?.active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (societe) {
        await updateSociete(societe.id, formData);
      } else {
        await createSociete(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving societe:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {societe ? "Modifier la société" : "Nouvelle société"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de la société</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Ex: MEDMA GESTION"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="code">Code société</Label>
              <Input
                id="code"
                value={formData.code}
                onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
                placeholder="Ex: MEDMA_GEST"
                required
              />
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: !!checked }))}
              />
              <Label htmlFor="active">Société active</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {societe ? "Modifier" : "Créer"}
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
