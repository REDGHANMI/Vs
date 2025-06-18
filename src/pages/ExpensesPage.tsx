
import { useState } from "react";
import { ArrowLeft, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import ExpensesManager from "@/components/expenses/ExpensesManager";
import ExpenseAnalytics from "@/components/analytics/ExpenseAnalytics";

export default function ExpensesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gestion des Dépenses</h1>
                <p className="text-sm text-gray-600">Suivi et analyse des mouvements financiers</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b">
            <CardTitle>Centre de Gestion Financière</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="movements" className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-auto p-2 bg-gray-50">
                <TabsTrigger 
                  value="movements" 
                  className="flex items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="font-medium">Mouvements</span>
                </TabsTrigger>
                
                <TabsTrigger 
                  value="analytics" 
                  className="flex items-center gap-2 p-4 data-[state=active]:bg-white data-[state=active]:shadow-sm"
                >
                  <PieChart className="w-4 h-4" />
                  <span className="font-medium">Analyses</span>
                </TabsTrigger>
              </TabsList>

              <div className="p-6">
                <TabsContent value="movements" className="mt-0">
                  <ExpensesManager />
                </TabsContent>

                <TabsContent value="analytics" className="mt-0">
                  <ExpenseAnalytics />
                </TabsContent>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
