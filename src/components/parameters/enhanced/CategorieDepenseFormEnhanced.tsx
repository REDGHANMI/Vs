
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Wallet, Save, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CategorieDepense } from "@/types/database-extended";

const categorieSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  code_categorie: z.string().min(1, "Le code catégorie est requis"),
  type_depense: z.enum(["fixe", "variable", "exceptionnelle"]),
  compte_comptable: z.string().optional(),
  description: z.string().optional(),
  budget_mensuel: z.number().optional(),
  seuil_alerte: z.number().optional(),
  responsable: z.string().optional(),
  autorisation_requise: z.boolean(),
  niveau_autorisation: z.enum(["gerant", "manager", "direction"]).optional(),
  active: z.boolean(),
});

type CategorieFormData = z.infer<typeof categorieSchema>;

interface CategorieDepenseFormEnhancedProps {
  categorie?: CategorieDepense | null;
  onClose: () => void;
}

export default function CategorieDepenseFormEnhanced({ categorie, onClose }: CategorieDepenseFormEnhancedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<CategorieFormData>({
    resolver: zodResolver(categorieSchema),
    defaultValues: {
      nom: categorie?.nom || "",
      code_categorie: categorie?.code_categorie || "",
      type_depense: categorie?.type_depense || "variable",
      compte_comptable: categorie?.compte_comptable || "",
      description: categorie?.description || "",
      budget_mensuel: categorie?.budget_mensuel || undefined,
      seuil_alerte: categorie?.seuil_alerte || undefined,
      responsable: categorie?.responsable || "",
      autorisation_requise: categorie?.autorisation_requise ?? false,
      niveau_autorisation: categorie?.niveau_autorisation || "gerant",
      active: categorie?.active ?? true,
    },
  });

  const onSubmit = async (data: CategorieFormData) => {
    console.log("CategorieDepenseFormEnhanced: Soumission du formulaire", { isEdit: !!categorie, data });
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("CategorieDepenseFormEnhanced: Catégorie sauvegardée", data);
      onClose();
    } catch (error) {
      console.error("CategorieDepenseFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const autorisationRequise = form.watch('autorisation_requise');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Wallet className="w-5 h-5 text-green-600" />
            {categorie ? "Modifier la catégorie" : "Nouvelle catégorie de dépense"}
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
                      <FormLabel>Nom de la catégorie *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Maintenance Équipements" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_categorie"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code catégorie *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: MAINT_EQ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type_depense"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type de dépense *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fixe">Dépense fixe</SelectItem>
                          <SelectItem value="variable">Dépense variable</SelectItem>
                          <SelectItem value="exceptionnelle">Dépense exceptionnelle</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="compte_comptable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compte comptable</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 6152001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description de la catégorie de dépense..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="budget_mensuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4" />
                        Budget mensuel (DH)
                      </FormLabel>
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
                  name="seuil_alerte"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seuil d'alerte (DH)</FormLabel>
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
              </div>

              <FormField
                control={form.control}
                name="responsable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Responsable</FormLabel>
                    <FormControl>
                      <Input placeholder="Ex: Chef de maintenance" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="autorisation_requise"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Autorisation requise</FormLabel>
                        <div className="text-sm text-gray-500">
                          Les dépenses de cette catégorie nécessitent une autorisation
                        </div>
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

                {autorisationRequise && (
                  <FormField
                    control={form.control}
                    name="niveau_autorisation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Niveau d'autorisation</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Sélectionner un niveau" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="gerant">Gérant</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="direction">Direction</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
                    <div className="space-y-0.5">
                      <FormLabel>Catégorie active</FormLabel>
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
