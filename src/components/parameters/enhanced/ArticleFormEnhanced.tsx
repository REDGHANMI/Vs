
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, Package, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Article } from "@/types/database-extended";
import { mockFamillesArticles } from "@/data/mockExtendedEntities";

const articleSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  code_article: z.string().min(1, "Le code article est requis"),
  famille_article_id: z.string().min(1, "Veuillez sélectionner une famille"),
  prix_unitaire: z.number().positive("Le prix doit être positif"),
  unite_mesure: z.string().min(1, "L'unité de mesure est requise"),
  description: z.string().optional(),
  prix_achat: z.number().optional(),
  stock_minimum: z.number().optional(),
  stock_actuel: z.number().optional(),
  fournisseur_principal: z.string().optional(),
  code_barre: z.string().optional(),
  active: z.boolean(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface ArticleFormEnhancedProps {
  article?: Article | null;
  onClose: () => void;
}

const unitesMesure = [
  { value: "litre", label: "Litre" },
  { value: "pièce", label: "Pièce" },
  { value: "kg", label: "Kilogramme" },
  { value: "metre", label: "Mètre" },
  { value: "boite", label: "Boîte" },
  { value: "pack", label: "Pack" }
];

export default function ArticleFormEnhanced({ article, onClose }: ArticleFormEnhancedProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      nom: article?.nom || "",
      code_article: article?.code_article || "",
      famille_article_id: article?.famille_article_id || "",
      prix_unitaire: article?.prix_unitaire || 0,
      unite_mesure: article?.unite_mesure || "",
      description: article?.description || "",
      prix_achat: article?.prix_achat || undefined,
      stock_minimum: article?.stock_minimum || undefined,
      stock_actuel: article?.stock_actuel || undefined,
      fournisseur_principal: article?.fournisseur_principal || "",
      code_barre: article?.code_barre || "",
      active: article?.active ?? true,
    },
  });

  const onSubmit = async (data: ArticleFormData) => {
    console.log("ArticleFormEnhanced: Soumission du formulaire", { isEdit: !!article, data });
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("ArticleFormEnhanced: Article sauvegardé", data);
      onClose();
    } catch (error) {
      console.error("ArticleFormEnhanced: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculerMarge = () => {
    const prixVente = form.watch('prix_unitaire');
    const prixAchat = form.watch('prix_achat');
    
    if (prixVente && prixAchat && prixAchat > 0) {
      return ((prixVente - prixAchat) / prixAchat * 100).toFixed(2);
    }
    return "0.00";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-600" />
            {article ? "Modifier l'article" : "Nouvel article"}
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
                      <FormLabel>Nom de l'article *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Huile Moteur 5W40" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_article"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code article *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: HM_5W40_001" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="famille_article_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Famille d'article *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une famille" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockFamillesArticles.map((famille) => (
                            <SelectItem key={famille.id} value={famille.id}>
                              {famille.nom}
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
                  name="unite_mesure"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unité de mesure *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner une unité" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {unitesMesure.map((unite) => (
                            <SelectItem key={unite.value} value={unite.value}>
                              {unite.label}
                            </SelectItem>
                          ))}
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
                  name="prix_achat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix d'achat (DH)</FormLabel>
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
                  name="prix_unitaire"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Prix de vente (DH) *</FormLabel>
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
                  <FormLabel>Marge bénéficiaire</FormLabel>
                  <div className="h-10 px-3 py-2 border rounded-md bg-gray-50 flex items-center">
                    <span className="text-sm font-medium">{calculerMarge()}%</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="stock_actuel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock actuel</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="stock_minimum"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock minimum</FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          placeholder="0"
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
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
                        <FormLabel>Article actif</FormLabel>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="fournisseur_principal"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fournisseur principal</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: Total Maroc" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code_barre"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code-barres</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: 3760234567890" {...field} />
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
                        placeholder="Description détaillée de l'article..."
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
