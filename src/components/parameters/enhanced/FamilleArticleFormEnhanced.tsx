
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Folder, Save, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FamilleArticle } from "@/types/database-extended";

const familleSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  code_famille: z.string().min(1, "Le code famille est requis"),
  description: z.string().optional(),
  couleur_theme: z.string().optional(),
  taux_tva_defaut: z.number().min(0).max(100).optional(),
  compte_comptable: z.string().optional(),
  active: z.boolean(),
});

type FamilleFormData = z.infer<typeof familleSchema>;

interface FamilleArticleFormEnhancedProps {
  famille?: FamilleArticle | null;
  onClose: () => void;
}

const couleursPredefinies = [
  "#FF6B35", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
  "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9"
];

export default function FamilleArticleFormEnhanced({ famille, onClose }: FamilleArticleFormEnhancedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FamilleFormData>({
    resolver: zodResolver(familleSchema),
    defaultValues: {
      nom: famille?.nom || "",
      code_famille: famille?.code_famille || "",
      description: famille?.description || "",
      couleur_theme: famille?.couleur_theme || "#4ECDC4",
      taux_tva_defaut: famille?.taux_tva_defaut || undefined,
      compte_comptable: famille?.compte_comptable || "",
      active: famille?.active ?? true,
    },
  });

  const onSubmit = async (data: FamilleFormData) => {
    console.log("FamilleArticleFormEnhanced: Soumission du formulaire", { isEdit: !!famille, data });
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("FamilleArticleFormEnhanced: Famille sauvegardée", data);
      onClose();
    } catch (error) {
      console.error("FamilleArticleFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Folder className="w-5 h-5 text-purple-600" />
            {famille ? "Modifier la famille" : "Nouvelle famille d'articles"}
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
                      <FormLabel>Nom de la famille *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Lubrifiants Moteur" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_famille"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code famille *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: LUB_MOT" {...field} />
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
                        placeholder="Description de la famille d'articles..."
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
                  name="taux_tva_defaut"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Taux TVA par défaut (%)</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          step="0.01" 
                          min="0" 
                          max="100" 
                          placeholder="20"
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
                  name="compte_comptable"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Compte comptable</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3140001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="couleur_theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Palette className="w-4 h-4" />
                      Couleur thématique
                    </FormLabel>
                    <FormControl>
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Input
                            type="color"
                            className="w-12 h-10 rounded border cursor-pointer"
                            {...field}
                          />
                          <Input
                            placeholder="#4ECDC4"
                            value={field.value || ""}
                            onChange={field.onChange}
                            className="flex-1"
                          />
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {couleursPredefinies.map((couleur) => (
                            <button
                              key={couleur}
                              type="button"
                              className="w-8 h-8 rounded-full border-2 border-gray-300 hover:border-gray-400"
                              style={{ backgroundColor: couleur }}
                              onClick={() => field.onChange(couleur)}
                            />
                          ))}
                        </div>
                      </div>
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
                      <FormLabel>Famille active</FormLabel>
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
