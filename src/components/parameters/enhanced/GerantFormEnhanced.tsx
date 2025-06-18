
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Users, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useParameters } from "@/contexts/ParametersContext";
import { Gerant } from "@/types/database";

const gerantSchema = z.object({
  nom: z.string().min(1, "Le nom est requis"),
  prenom: z.string().min(1, "Le prénom est requis"),
  nom_complet: z.string().min(2, "Le nom complet doit contenir au moins 2 caractères"),
  email: z.string().email("Format d'email invalide").optional().or(z.literal("")),
  telephone: z.string().min(10, "Numéro de téléphone requis"),
  poste: z.string().min(1, "Le poste est requis"),
  station_uuid: z.string().optional(),
  est_responsable_station: z.boolean(),
  date_embauche: z.string().optional(),
  ville: z.string().optional(),
  salaire_base: z.number().optional(),
  type_contrat: z.enum(["cdi", "cdd", "stage", "freelance"]).optional(),
  actif: z.boolean(),
});

type GerantFormData = z.infer<typeof gerantSchema>;

interface GerantFormEnhancedProps {
  gerant?: Gerant | null;
  onClose: () => void;
}

export default function GerantFormEnhanced({ gerant, onClose }: GerantFormEnhancedProps) {
  const { createGerant, updateGerant, stations } = useParameters();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<GerantFormData>({
    resolver: zodResolver(gerantSchema),
    defaultValues: {
      nom: gerant?.nom || "",
      prenom: gerant?.prenom || "",
      nom_complet: gerant?.nom_complet || "",
      email: gerant?.email || "",
      telephone: gerant?.telephone || "",
      poste: gerant?.poste || "",
      station_uuid: gerant?.station_uuid || "",
      est_responsable_station: gerant?.est_responsable_station ?? false,
      date_embauche: gerant?.date_embauche || "",
      ville: gerant?.ville || "",
      salaire_base: gerant?.salaire_base || undefined,
      type_contrat: gerant?.type_contrat || undefined,
      actif: gerant?.actif ?? true,
    },
  });

  // Auto-génération du nom_complet
  const watchedNom = form.watch("nom");
  const watchedPrenom = form.watch("prenom");
  
  // Met à jour automatiquement le nom_complet quand nom ou prénom change
  useState(() => {
    if (watchedNom && watchedPrenom) {
      form.setValue("nom_complet", `${watchedNom} ${watchedPrenom}`);
    }
  });

  const onSubmit = async (data: GerantFormData) => {
    console.log("GerantFormEnhanced: Soumission du formulaire", { isEdit: !!gerant, data });
    setIsSubmitting(true);
    
    try {
      // Transform form data to match the database type requirements
      const gerantData = {
        nom: data.nom,
        prenom: data.prenom,
        nom_complet: data.nom_complet,
        email: data.email || undefined,
        telephone: data.telephone,
        poste: data.poste,
        station_uuid: data.station_uuid || undefined,
        est_responsable_station: data.est_responsable_station,
        actif: data.actif,
        active: data.actif, // Map actif to active for compatibility
        date_embauche: data.date_embauche || undefined,
        ville: data.ville || undefined,
        salaire_base: data.salaire_base || undefined,
        type_contrat: data.type_contrat || undefined,
      };

      if (gerant) {
        await updateGerant(gerant.id, gerantData);
        console.log("GerantFormEnhanced: Salarié mis à jour", gerant.id);
      } else {
        await createGerant(gerantData);
        console.log("GerantFormEnhanced: Nouveau salarié créé");
      }
      onClose();
    } catch (error) {
      console.error("GerantFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            {gerant ? "Modifier le salarié" : "Nouveau salarié"}
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
                      <FormLabel>Nom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ben Ali" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="prenom"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prénom *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Ahmed" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="nom_complet"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom complet *</FormLabel>
                    <FormControl>
                      <Input placeholder="Généré automatiquement..." {...field} readOnly className="bg-gray-50" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="ahmed@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telephone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Téléphone *</FormLabel>
                      <FormControl>
                        <Input placeholder="+212 6 12 34 56 78" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="poste"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Poste *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un poste" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Gérant">Gérant</SelectItem>
                          <SelectItem value="Gérant Senior">Gérant Senior</SelectItem>
                          <SelectItem value="Caissier">Caissier</SelectItem>
                          <SelectItem value="Pompiste">Pompiste</SelectItem>
                          <SelectItem value="Agent de sécurité">Agent de sécurité</SelectItem>
                          <SelectItem value="Technicien">Technicien</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="station_uuid"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Station</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une station" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {stations.map((station) => (
                            <SelectItem key={station.id} value={station.id}>
                              {station.nom}
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
                  name="date_embauche"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date d'embauche</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type_contrat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de contrat</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="cdi">CDI</SelectItem>
                          <SelectItem value="cdd">CDD</SelectItem>
                          <SelectItem value="stage">Stage</SelectItem>
                          <SelectItem value="freelance">Freelance</SelectItem>
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
                  name="salaire_base"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salaire de base (MAD)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="8000"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="est_responsable_station"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Responsable de station</FormLabel>
                        <p className="text-sm text-gray-500">Gérant ou responsable</p>
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

                <FormField
                  control={form.control}
                  name="actif"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Salarié actif</FormLabel>
                        <p className="text-sm text-gray-500">En service</p>
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
