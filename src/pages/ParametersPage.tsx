
import { useState } from "react";
import { ArrowLeft, Building2, Users, MapPin, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useParameters } from "@/contexts/ParametersContext";
import { seedInitialData } from "@/services/seedService";
import { toast } from "sonner";
import SocietesManager from "@/components/parameters/SocietesManager";
import StationsManager from "@/components/parameters/StationsManager";
import GerantsManager from "@/components/parameters/GerantsManager";

export default function ParametersPage() {
  const navigate = useNavigate();
  const { societes, stations, gerants, refreshData } = useParameters();
  const [activeTab, setActiveTab] = useState("societes");
  const [seeding, setSeeding] = useState(false);

  const handleSeedData = async () => {
    try {
      setSeeding(true);
      await seedInitialData();
      await refreshData();
    } catch (error) {
      console.error('Error seeding data:', error);
    } finally {
      setSeeding(false);
    }
  };

  const isEmpty = societes.length === 0 && stations.length === 0 && gerants.length === 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
          </div>
          {isEmpty && (
            <Button
              onClick={handleSeedData}
              disabled={seeding}
              className="flex items-center gap-2"
            >
              <Database className="w-4 h-4" />
              {seeding ? 'Création...' : 'Créer des données d\'exemple'}
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Gestion des Paramètres</CardTitle>
            <CardDescription>
              Configurez les sociétés, stations et gérants de votre système.
              {isEmpty && (
                <span className="block mt-2 text-amber-600">
                  Votre base de données est vide. Vous pouvez créer des données d'exemple pour commencer.
                </span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="societes" className="flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  Sociétés ({societes.length})
                </TabsTrigger>
                <TabsTrigger value="stations" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Stations ({stations.length})
                </TabsTrigger>
                <TabsTrigger value="gerants" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Gérants ({gerants.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="societes" className="mt-6">
                <SocietesManager />
              </TabsContent>

              <TabsContent value="stations" className="mt-6">
                <StationsManager />
              </TabsContent>

              <TabsContent value="gerants" className="mt-6">
                <GerantsManager />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
