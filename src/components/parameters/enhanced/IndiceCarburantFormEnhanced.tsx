
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, TrendingUp, Save, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { IndiceCarburant } from "@/types/database-extended";

const indiceSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  type_carburant: z.enum(["gasoil", "ssp", "mixte"]),
  valeur_indice: z.number().positive("La valeur doit être positive"),
  date_application: z.string().min(1, "La date est requise"),
  source: z.string().min(1, "La source est requise"),
  valeur_precedente: z.number().optional(),
  frequence_mise_a_jour: z.enum(["quotidien", "hebdomadaire", "mensuel"]).optional(),
  methode_calcul: z.string().optional(),
  commentaires: z.string().optional(),
  active: z.boolean(),
});

type IndiceFormData = z.infer<typeof indiceSchema>;

interface IndiceCarburantFormEnhancedProps {
  indice?: IndiceCarburant | null;
  onClose: () => void;
}

export default function IndiceCarburantFormEnhanced({ indice, onClose }: IndiceCarburantFormEnhancedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<IndiceFormData>({
    resolver: zodResolver(indiceSchema),
    defaultValues: {
      nom: indice?.nom || "",
      type_carburant: indice?.type_carburant || "gasoil",
      valeur_indice: indice?.valeur_indice || 0,
      date_application: indice?.date_application || new Date().toISOString().split('T')[0],
      source: indice?.source || "",
      valeur_precedente: indice?.valeur_precedente || undefined,
      frequence_mise_a_jour: indice?.frequence_mise_a_jour || "hebdomadaire",
      methode_calcul: indice?.methode_calcul || "",
      commentaires: indice?.commentaires || "",
      active: indice?.active ?? true,
    },
  });

  const onSubmit = async (data: IndiceFormData) => {
    console.log("IndiceCarburantFormEnhanced: Soumission du formulaire", { isEdit: !!indice, data });
    setIsSubmitting(true);
    
    try {
      // Calculate variation percentage
      if (data.valeur_precedente && data.valeur_precedente > 0) {
        const variation = ((data.valeur_indice - data.valeur_precedente) / data.valeur_precedente) * 100;
        console.log("Variation calculée:", variation.toFixed(2) + "%");
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("IndiceCarburantFormEnhanced: Indice sauvegardé", data);
      onClose();
    } catch (error) {
      console.error("IndiceCarburantFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculerVariation = () => {
    const valeurActuelle = form.watch('valeur_indice');
    const valeurPrecedente = form.watch('valeur_precedente');
    
    if (valeurActuelle && valeurPrecedente && valeurPrecedente > 0) {
      const variation = ((valeurActuelle - valeurPrecedente) / valeurPrecedente) * 100;
      return variation.toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            {indice ? "Modifier l'indice" : "Nouvel indice carburant"}
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
                      <FormLabel>Nom de l'indice *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Indice Gasoil Casablanca" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type_carburant"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de carburant *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="gasoil">Gasoil</SelectItem>
                          <SelectItem value="ssp">SSP (Super Sans Plomb)</SelectItem>
                          <SelectItem value="mixte">Mixte</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="valeur_precedente"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valeur précédente (DH)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valeur_indice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valeur actuelle (DH) *</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          placeholder="0.00"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>Variation (%)</FormLabel>
                  <div className="h-10 px-3 py-2 border rounded-md bg-gray-50 flex items-center">
                    <span className={`text-sm font-medium ${
                      parseFloat(calculerVariation()) > 0 ? 'text-green-600' :
                      parseFloat(calculerVariation()) < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {parseFloat(calculerVariation()) > 0 ? '+' : ''}{calculerVariation()}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="date_application"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Date d'application *
                      </FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="frequence_mise_a_jour"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fréquence de mise à jour</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une fréquence" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="quotidien">Quotidien</SelectItem>
                          <SelectItem value="hebdomadaire">Hebdomadaire</SelectItem>
                          <SelectItem value="mensuel">Mensuel</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="source"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Source *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Ministère de l'Énergie" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="methode_calcul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Méthode de calcul</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Ex: Prix Platts + taxes + marge distribution"
                        rows={2}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="commentaires"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Commentaires</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Observations et commentaires sur cette mise à jour..."
                        rows={3}
                        {...field}
                      />
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
                      <FormLabel>Indice actif</FormLabel>
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
