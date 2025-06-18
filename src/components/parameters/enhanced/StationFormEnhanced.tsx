
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, MapPin, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useParameters } from "@/contexts/ParametersContext";
import { Station } from "@/types/database";
import MapCoordinateSelector from "./MapCoordinateSelector";

const stationSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  code_station: z.string().optional(),
  societe_id: z.string().min(1, "Veuillez sélectionner une société"),
  gerant_id: z.string().min(1, "Veuillez sélectionner un gérant"),
  ville: z.string().optional(),
  adresse_complete: z.string().optional(),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  active: z.boolean(),
});

type StationFormData = z.infer<typeof stationSchema>;

interface StationFormEnhancedProps {
  station?: Station | null;
  onClose: () => void;
}

// Coordonnées par défaut pour Casablanca
const CASABLANCA_COORDS = {
  latitude: 33.5731,
  longitude: -7.5898
};

export default function StationFormEnhanced({ station, onClose }: StationFormEnhancedProps) {
  const { createStation, updateStation, societes, gerants } = useParameters();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Utiliser les coordonnées de Casablanca par défaut pour les nouvelles stations
  const defaultLatitude = station?.latitude || CASABLANCA_COORDS.latitude;
  const defaultLongitude = station?.longitude || CASABLANCA_COORDS.longitude;

  const form = useForm<StationFormData>({
    resolver: zodResolver(stationSchema),
    defaultValues: {
      nom: station?.nom || "",
      code_station: station?.code_station || "",
      societe_id: station?.societe_id || "",
      gerant_id: station?.gerant_id || "",
      ville: station?.ville || "",
      adresse_complete: station?.adresse_complete || "",
      latitude: defaultLatitude,
      longitude: defaultLongitude,
      active: station?.active ?? true,
    },
  });

  const onSubmit = async (data: StationFormData) => {
    console.log("StationFormEnhanced: Soumission du formulaire", { isEdit: !!station, data });
    setIsSubmitting(true);
    
    try {
      // Transform form data to match the database type requirements
      const stationData = {
        nom: data.nom,
        societe_id: data.societe_id,
        gerant_id: data.gerant_id,
        latitude: data.latitude,
        longitude: data.longitude,
        active: data.active,
        code_station: data.code_station || undefined,
        ville: data.ville || undefined,
        adresse_complete: data.adresse_complete || undefined,
        date_mise_en_service: undefined,
      };

      if (station) {
        await updateStation(station.id, stationData);
        console.log("StationFormEnhanced: Station mise à jour", station.id);
      } else {
        await createStation(stationData);
        console.log("StationFormEnhanced: Nouvelle station créée");
      }
      onClose();
    } catch (error) {
      console.error("StationFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCoordinateChange = (lat: number, lng: number) => {
    console.log("StationFormEnhanced: Changement de coordonnées", { lat, lng });
    form.setValue('latitude', lat);
    form.setValue('longitude', lng);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-600" />
            {station ? "Modifier la station" : "Nouvelle station"}
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom de la station *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Station Casablanca Centre" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_station"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code station</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: STA001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="societe_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Société *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une société" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {societes.map((societe) => (
                            <SelectItem key={societe.id} value={societe.id}>
                              {societe.nom}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="gerant_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gérant *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un gérant" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {gerants.map((gerant) => (
                            <SelectItem key={gerant.id} value={gerant.id}>
                              {gerant.nom_complet}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ville"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ville</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Casablanca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Station active</FormLabel>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="adresse_complete"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adresse complète</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Adresse complète de la station..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Position géographique *
                </FormLabel>
                <FormField
                  control={form.control}
                  name="latitude"
                  render={() => (
                    <FormItem>
                      <FormControl>
                        <MapCoordinateSelector
                          latitude={form.watch('latitude')}
                          longitude={form.watch('longitude')}
                          onCoordinateChange={handleCoordinateChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-3 pt-4 border-t">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {isSubmitting ? "Sauvegarde..." : "Sauvegarder"}
                </Button>
                <Button type="button" variant="outline" onClick={onClose}>
                  Annuler
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
