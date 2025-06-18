import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { generateExpenseAnalytics } from "@/data/mockExtendedEntities";

export default function ExpenseAnalytics() {
  const analytics = generateExpenseAnalytics();

  const COLORS = ['#FF6B35', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8'];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dépenses du Mois</p>
                <p className="text-2xl font-bold text-red-600">
                  {analytics.total_depenses_mois.toLocaleString()} DH
                </p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Recettes du Mois</p>
                <p className="text-2xl font-bold text-green-600">
                  {analytics.total_recettes_mois.toLocaleString()} DH
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Résultat Net</p>
                <p className={`text-2xl font-bold ${analytics.resultat_net >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {analytics.resultat_net.toLocaleString()} DH
                </p>
              </div>
              <DollarSign className={`w-8 h-8 ${analytics.resultat_net >= 0 ? 'text-green-500' : 'text-red-500'}`} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Marge Brute</p>
                <p className="text-2xl font-bold text-blue-600">
                  {analytics.total_recettes_mois > 0 ? 
                    ((analytics.resultat_net / analytics.total_recettes_mois) * 100).toFixed(1) : 0}%
                </p>
              </div>
              <Target className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Répartition par Catégorie */}
        <Card>
          <CardHeader>
            <CardTitle>Répartition des Dépenses par Catégorie</CardTitle>
            <CardDescription>Distribution des dépenses par type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analytics.repartition_par_categorie}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="montant"
                  >
                    {analytics.repartition_par_categorie.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.couleur || COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value.toLocaleString()} DH`, 'Montant']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {analytics.repartition_par_categorie.map((item: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.couleur || COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm">{item.categorie}</span>
                  </div>
                  <Badge variant="outline">
                    {item.montant.toLocaleString()} DH ({item.pourcentage.toFixed(1)}%)
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Évolution Mensuelle */}
        <Card>
          <CardHeader>
            <CardTitle>Évolution Mensuelle</CardTitle>
            <CardDescription>Tendance des résultats sur 3 mois</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics.evolution_mensuelle}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="mois" />
                  <YAxis tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`} />
                  <Tooltip formatter={(value: any) => [`${value.toLocaleString()} DH`, '']} />
                  <Legend />
                  <Line type="monotone" dataKey="recettes" stroke="#4ECDC4" strokeWidth={2} name="Recettes" />
                  <Line type="monotone" dataKey="depenses" stroke="#FF6B35" strokeWidth={2} name="Dépenses" />
                  <Line type="monotone" dataKey="resultat" stroke="#45B7D1" strokeWidth={2} name="Résultat" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Dépenses */}
      <Card>
        <CardHeader>
          <CardTitle>Top 5 des Dépenses</CardTitle>
          <CardDescription>Les plus importantes dépenses du mois</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.top_depenses.map((depense: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{depense.description}</h4>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>Catégorie: {depense.categorie}</span>
                    <span>Date: {new Date(depense.date).toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-red-600">
                    {depense.montant.toLocaleString()} DH
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
