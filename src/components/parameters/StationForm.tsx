
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParameters } from "@/contexts/ParametersContext";
import { Station } from "@/types/database";

interface StationFormProps {
  station?: Station | null;
  onClose: () => void;
}

export default function StationForm({ station, onClose }: StationFormProps) {
  const { createStation, updateStation, societes, gerants } = useParameters();
  const [formData, setFormData] = useState({
    nom: station?.nom || "",
    code_station: station?.code_station || "",
    societe_id: station?.societe_id || "",
    gerant_id: station?.gerant_id || "",
    ville: station?.ville || "",
    adresse_complete: station?.adresse_complete || "",
    latitude: station?.latitude || 33.5731,
    longitude: station?.longitude || -7.5898,
    active: station?.active ?? true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (station) {
        await updateStation(station.id, formData);
      } else {
        await createStation(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving station:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>
            {station ? "Modifier la station" : "Nouvelle station"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="nom">Nom de la station</Label>
              <Input
                id="nom"
                value={formData.nom}
                onChange={(e) => setFormData(prev => ({ ...prev, nom: e.target.value }))}
                placeholder="Ex: Station Casablanca Centre"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="code_station">Code station</Label>
              <Input
                id="code_station"
                value={formData.code_station}
                onChange={(e) => setFormData(prev => ({ ...prev, code_station: e.target.value }))}
                placeholder="Ex: STA001"
              />
            </div>

            <div>
              <Label htmlFor="societe_id">Société</Label>
              <Select value={formData.societe_id} onValueChange={(value) => setFormData(prev => ({ ...prev, societe_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une société" />
                </SelectTrigger>
                <SelectContent>
                  {societes.map((societe) => (
                    <SelectItem key={societe.id} value={societe.id}>
                      {societe.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="gerant_id">Gérant</Label>
              <Select value={formData.gerant_id} onValueChange={(value) => setFormData(prev => ({ ...prev, gerant_id: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un gérant" />
                </SelectTrigger>
                <SelectContent>
                  {gerants.map((gerant) => (
                    <SelectItem key={gerant.id} value={gerant.id}>
                      {gerant.nom_complet}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ville">Ville</Label>
              <Input
                id="ville"
                value={formData.ville}
                onChange={(e) => setFormData(prev => ({ ...prev, ville: e.target.value }))}
                placeholder="Ex: Casablanca"
              />
            </div>

            <div>
              <Label htmlFor="adresse_complete">Adresse complète</Label>
              <Input
                id="adresse_complete"
                value={formData.adresse_complete}
                onChange={(e) => setFormData(prev => ({ ...prev, adresse_complete: e.target.value }))}
                placeholder="Adresse complète de la station"
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label htmlFor="latitude">Latitude</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="any"
                  value={formData.latitude}
                  onChange={(e) => setFormData(prev => ({ ...prev, latitude: Number(e.target.value) }))}
                />
              </div>
              <div>
                <Label htmlFor="longitude">Longitude</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="any"
                  value={formData.longitude}
                  onChange={(e) => setFormData(prev => ({ ...prev, longitude: Number(e.target.value) }))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: !!checked }))}
              />
              <Label htmlFor="active">Station active</Label>
            </div>

            <div className="flex gap-2 pt-4">
              <Button type="submit" className="flex-1">
                {station ? "Modifier" : "Créer"}
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
