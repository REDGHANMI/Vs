
import { useState } from "react";
import { ArrowLeft, Building2, Users, MapPin, Settings, Palette, Database, Package, Folder, TrendingUp, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useParameters } from "@/contexts/ParametersContext";
import SocietesManagerEnhanced from "@/components/parameters/enhanced/SocietesManagerEnhanced";
import StationsManagerEnhanced from "@/components/parameters/enhanced/StationsManagerEnhanced";
import GerantsManagerEnhanced from "@/components/parameters/enhanced/GerantsManagerEnhanced";
import ArticlesManagerEnhanced from "@/components/parameters/enhanced/ArticlesManagerEnhanced";
import FamillesArticlesManagerEnhanced from "@/components/parameters/enhanced/FamillesArticlesManagerEnhanced";
import IndicesCarburantsManagerEnhanced from "@/components/parameters/enhanced/IndicesCarburantsManagerEnhanced";
import CategoriesDepensesManagerEnhanced from "@/components/parameters/enhanced/CategoriesDepensesManagerEnhanced";
import TypesChargesManagerEnhanced from "@/components/parameters/enhanced/TypesChargesManagerEnhanced";
import { mockArticles, mockFamillesArticles, mockIndicesCarburants, mockCategoriesDepenses } from "@/data/mockExtendedEntities";

export default function ParametersPageEnhanced() {
  const navigate = useNavigate();
  const { societes, stations, gerants } = useParameters();
  const [activeTab, setActiveTab] = useState("societes");

  const getTabStats = () => {
    return {
      societes: { total: societes.length, active: societes.filter(s => s.active).length },
      stations: { total: stations.length, active: stations.filter(s => s.active).length },
      gerants: { total: gerants.length, active: gerants.filter(g => g.active).length },
      articles: { total: mockArticles.length, active: mockArticles.filter(a => a.active).length },
      famillesArticles: { total: mockFamillesArticles.length, active: mockFamillesArticles.filter(f => f.active).length },
      indicesCarburants: { total: mockIndicesCarburants.length, active: mockIndicesCarburants.filter(i => i.active).length },
      categoriesDepenses: { total: mockCategoriesDepenses.length, active: mockCategoriesDepenses.filter(c => c.active).length },
      typesCharges: { total: 3, active: 3 } // Mock data for types charges
    };
  };

  const stats = getTabStats();
  const totalElements = stats.societes.total + stats.stations.total + stats.gerants.total + 
                       stats.articles.total + stats.famillesArticles.total + 
                       stats.indicesCarburants.total + stats.categoriesDepenses.total + stats.typesCharges.total;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                Retour au tableau de bord
              </Button>
              <div className="h-6 w-px bg-gray-300" />
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Centre de Configuration</h1>
                  <p className="text-sm text-gray-600">Gestion avancée des données de base</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600 border-green-200">
                <Database className="w-3 h-3 mr-1" />
                {totalElements} éléments
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-blue-600" />
              Interface de Gestion Avancée
            </CardTitle>
            <CardDescription>
              Configurez et gérez tous les aspects de votre système. Interface professionnelle avec formulaires multi-onglets, validation avancée et aperçus en temps réel.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 h-auto p-2 bg-gray-50">
                <TabsTrigger 
                  value="societes" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    <span className="font-medium">Sociétés</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.societes.total}</Badge>
                    <Badge variant="default">{stats.societes.active}</Badge>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="stations" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <span className="font-medium">Stations</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.stations.total}</Badge>
                    <Badge variant="default">{stats.stations.active}</Badge>
                  </div>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="gerants" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span className="font-medium">Gérants</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.gerants.total}</Badge>
                    <Badge variant="default">{stats.gerants.active}</Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger 
                  value="articles" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span className="font-medium">Articles</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.articles.total}</Badge>
                    <Badge variant="default">{stats.articles.active}</Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger 
                  value="familles" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span className="font-medium">Familles</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.famillesArticles.total}</Badge>
                    <Badge variant="default">{stats.famillesArticles.active}</Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger 
                  value="indices" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">Indices</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.indicesCarburants.total}</Badge>
                    <Badge variant="default">{stats.indicesCarburants.active}</Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger 
                  value="categories" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    <span className="font-medium">Catégories</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.categoriesDepenses.total}</Badge>
                    <Badge variant="default">{stats.categoriesDepenses.active}</Badge>
                  </div>
                </TabsTrigger>

                <TabsTrigger 
                  value="types" 
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <div className="flex items-center gap-2">
                    <Folder className="w-4 h-4" />
                    <span className="font-medium">Types</span>
                  </div>
                  <div className="flex gap-2 text-xs">
                    <Badge variant="secondary">{stats.typesCharges.total}</Badge>
                    <Badge variant="default">{stats.typesCharges.active}</Badge>
                  </div>
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="societes" className="mt-0">
                  <SocietesManagerEnhanced />
                </TabsContent>

                <TabsContent value="stations" className="mt-0">
                  <StationsManagerEnhanced />
                </TabsContent>

                <TabsContent value="gerants" className="mt-0">
                  <GerantsManagerEnhanced />
                </TabsContent>

                <TabsContent value="articles" className="mt-0">
                  <ArticlesManagerEnhanced />
                </TabsContent>

                <TabsContent value="familles" className="mt-0">
                  <FamillesArticlesManagerEnhanced />
                </TabsContent>

                <TabsContent value="indices" className="mt-0">
                  <IndicesCarburantsManagerEnhanced />
                </TabsContent>

                <TabsContent value="categories" className="mt-0">
                  <CategoriesDepensesManagerEnhanced />
                </TabsContent>

                <TabsContent value="types" className="mt-0">
                  <TypesChargesManagerEnhanced />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
