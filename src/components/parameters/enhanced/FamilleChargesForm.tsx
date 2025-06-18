
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { X, DollarSign, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FamilleCharge } from "@/types/database";

const familleChargeSchema = z.object({
  nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  code: z.string().min(1, "Le code est requis"),
  type: z.enum(["charge", "produit"], {
    required_error: "Veuillez sélectionner un type",
  }),
  compte_comptable: z.string().min(1, "Le compte comptable est requis"),
  description: z.string().optional(),
  active: z.boolean(),
});

type FamilleChargeFormData = z.infer<typeof familleChargeSchema>;

interface FamilleChargesFormProps {
  famille?: FamilleCharge | null;
  onClose: () => void;
  onSave: (data: Omit<FamilleCharge, 'id' | 'created_at'>) => void;
}

export default function FamilleChargesForm({ famille, onClose, onSave }: FamilleChargesFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FamilleChargeFormData>({
    resolver: zodResolver(familleChargeSchema),
    defaultValues: {
      nom: famille?.nom || "",
      code: famille?.code || "",
      type: famille?.type || "charge",
      compte_comptable: famille?.compte_comptable || "",
      description: famille?.description || "",
      active: famille?.active ?? true,
    },
  });

  const onSubmit = async (data: FamilleChargeFormData) => {
    console.log("FamilleChargesForm: Soumission du formulaire", { isEdit: !!famille, data });
    setIsSubmitting(true);
    
    try {
      // Type assertion is safe here because our schema ensures all required fields are present
      await onSave(data as Omit<FamilleCharge, 'id' | 'created_at'>);
      console.log("FamilleChargesForm: Famille sauvegardée");
    } catch (error) {
      console.error("FamilleChargesForm: Erreur lors de la sauvegarde", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Comptes comptables prédéfinis
  const comptesCharges = [
    { code: "6122", libelle: "Achats de carburants" },
    { code: "6123", libelle: "Achats de lubrifiants" },
    { code: "6156", libelle: "Maintenance et entretien" },
    { code: "6161", libelle: "Locations" },
    { code: "6181", libelle: "Documentation" },
    { code: "6211", libelle: "Personnel - Salaires" },
    { code: "6311", libelle: "Impôts et taxes" },
    { code: "6511", libelle: "Charges financières" },
  ];

  const comptesProduits = [
    { code: "7121", libelle: "Ventes de carburants" },
    { code: "7122", libelle: "Ventes de lubrifiants" },
    { code: "7123", libelle: "Prestations de services" },
    { code: "7511", libelle: "Produits financiers" },
    { code: "7581", libelle: "Reprises sur provisions" },
  ];

  const comptesDisponibles = form.watch("type") === "charge" ? comptesCharges : comptesProduits;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            {famille ? "Modifier la famille de charges" : "Nouvelle famille de charges"}
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
                        <Input placeholder="Ex: Carburants" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Code *</FormLabel>
                      <FormControl>
                        <Input placeholder="Ex: CARB" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="charge">Charge</SelectItem>
                          <SelectItem value="produit">Produit</SelectItem>
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
                      <FormLabel>Compte comptable *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un compte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {comptesDisponibles.map((compte) => (
                            <SelectItem key={compte.code} value={compte.code}>
                              {compte.code} - {compte.libelle}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
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
                        placeholder="Description de la famille de charges..."
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
                      <FormLabel>Famille active</FormLabel>
                      <div className="text-sm text-gray-500">
                        Les familles inactives ne seront pas proposées dans les sélections
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
