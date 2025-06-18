
import { useState } from "react";
import { X, Building2, Save, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParameters } from "@/contexts/ParametersContext";
import { Societe } from "@/types/database";

interface SocieteFormEnhancedProps {
  societe?: Societe | null;
  onClose: () => void;
}

export default function SocieteFormEnhanced({ societe, onClose }: SocieteFormEnhancedProps) {
  const { createSociete, updateSociete } = useParameters();
  const [formData, setFormData] = useState<Partial<Societe>>({
    nom: societe?.nom || "",
    code: societe?.code || "",
    description: societe?.description || "",
    adresse: societe?.adresse || "",
    ville: societe?.ville || "",
    code_postal: societe?.code_postal || "",
    telephone: societe?.telephone || "",
    email: societe?.email || "",
    site_web: societe?.site_web || "",
    couleur_theme: societe?.couleur_theme || "#2563eb",
    date_creation: societe?.date_creation || "",
    capital_social: societe?.capital_social || 0,
    forme_juridique: societe?.forme_juridique || "",
    numero_rc: societe?.numero_rc || "",
    numero_ice: societe?.numero_ice || "",
    numero_if: societe?.numero_if || "",
    numero_cnss: societe?.numero_cnss || "",
    numero_patente: societe?.numero_patente || "",
    active: societe?.active ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (societe) {
        await updateSociete(societe.id, formData);
      } else {
        await createSociete(formData as Omit<Societe, 'id' | 'created_at'>);
      }
      onClose();
    } catch (error) {
      console.error('Error saving societe:', error);
    }
  };

  const handleInputChange = (field: keyof Societe, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              {societe ? "Modifier la société" : "Nouvelle société"}
            </CardTitle>
            <CardDescription>
              {societe ? "Modifiez les informations de la société" : "Créez une nouvelle société"}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <form onSubmit={handleSubmit} className="h-full">
          <CardContent className="overflow-y-auto max-h-[calc(90vh-200px)]">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
                <TabsTrigger value="juridique">Juridique</TabsTrigger>
              </TabsList>

              <TabsContent value="general" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nom">Nom de la société *</Label>
                    <Input
                      id="nom"
                      value={formData.nom}
                      onChange={(e) => handleInputChange('nom', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Code *</Label>
                    <Input
                      id="code"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="couleur_theme">Couleur thème</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="couleur_theme"
                        type="color"
                        value={formData.couleur_theme}
                        onChange={(e) => handleInputChange('couleur_theme', e.target.value)}
                        className="w-16 h-10"
                      />
                      <Input
                        value={formData.couleur_theme}
                        onChange={(e) => handleInputChange('couleur_theme', e.target.value)}
                        placeholder="#2563eb"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date_creation">Date de création</Label>
                    <Input
                      id="date_creation"
                      type="date"
                      value={formData.date_creation}
                      onChange={(e) => handleInputChange('date_creation', e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={formData.active}
                    onCheckedChange={(checked) => handleInputChange('active', checked)}
                  />
                  <Label htmlFor="active">Société active</Label>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="adresse">Adresse</Label>
                    <Input
                      id="adresse"
                      value={formData.adresse}
                      onChange={(e) => handleInputChange('adresse', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ville">Ville</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => handleInputChange('ville', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="code_postal">Code postal</Label>
                    <Input
                      id="code_postal"
                      value={formData.code_postal}
                      onChange={(e) => handleInputChange('code_postal', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telephone">Téléphone</Label>
                    <Input
                      id="telephone"
                      value={formData.telephone}
                      onChange={(e) => handleInputChange('telephone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="site_web">Site web</Label>
                    <Input
                      id="site_web"
                      type="url"
                      value={formData.site_web}
                      onChange={(e) => handleInputChange('site_web', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="juridique" className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="forme_juridique">Forme juridique</Label>
                    <Select
                      value={formData.forme_juridique}
                      onValueChange={(value) => handleInputChange('forme_juridique', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SARL">SARL</SelectItem>
                        <SelectItem value="SA">SA</SelectItem>
                        <SelectItem value="SARL AU">SARL AU</SelectItem>
                        <SelectItem value="SNC">SNC</SelectItem>
                        <SelectItem value="SCS">SCS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="capital_social">Capital social (MAD)</Label>
                    <Input
                      id="capital_social"
                      type="number"
                      value={formData.capital_social}
                      onChange={(e) => handleInputChange('capital_social', Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero_rc">Numéro RC</Label>
                    <Input
                      id="numero_rc"
                      value={formData.numero_rc}
                      onChange={(e) => handleInputChange('numero_rc', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero_ice">Numéro ICE</Label>
                    <Input
                      id="numero_ice"
                      value={formData.numero_ice}
                      onChange={(e) => handleInputChange('numero_ice', e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="numero_if">Numéro IF</Label>
                    <Input
                      id="numero_if"
                      value={formData.numero_if}
                      onChange={(e) => handleInputChange('numero_if', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero_cnss">Numéro CNSS</Label>
                    <Input
                      id="numero_cnss"
                      value={formData.numero_cnss}
                      onChange={(e) => handleInputChange('numero_cnss', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="numero_patente">Numéro Patente</Label>
                    <Input
                      id="numero_patente"
                      value={formData.numero_patente}
                      onChange={(e) => handleInputChange('numero_patente', e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>

          <div className="flex justify-end gap-2 p-6 border-t">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button type="submit" className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {societe ? "Modifier" : "Créer"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
