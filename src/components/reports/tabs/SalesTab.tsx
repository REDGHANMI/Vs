
import React, { useState, useEffect } from 'react';
import { getVentesForReport, getVolucompteursForReport } from '@/services/reportsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SalesTabProps {
  reportUuid: string;
}

export default function SalesTab({ reportUuid }: SalesTabProps) {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [volucompteurData, setVolucompteurData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [sales, volucompteurs] = await Promise.all([
          getVentesForReport(reportUuid),
          getVolucompteursForReport(reportUuid)
        ]);
        setSalesData(sales);
        setVolucompteurData(volucompteurs);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reportUuid) {
      fetchData();
    }
  }, [reportUuid]);

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Chargement des ventes...</span>
      </div>
    );
  }

  // Regrouper les ventes par type (comptant/crédit)
  const ventesComptant = salesData.filter(v => v.type_vente === 'comptant');
  const ventesCredit = salesData.filter(v => v.type_vente === 'credit');

  // Calculer les totaux
  const totalComptant = ventesComptant.reduce((sum, v) => sum + v.valeur_totale, 0);
  const totalCredit = ventesCredit.reduce((sum, v) => sum + v.valeur_totale, 0);
  const totalCarburant = volucompteurData.reduce((sum, v) => sum + v.valeur_totale, 0);
  const totalNonCarburant = salesData
    .filter(v => v.famille_produit === 'non_carburant')
    .reduce((sum, v) => sum + v.valeur_totale, 0);

  return (
    <div className="space-y-6">
      {/* Résumé des ventes */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Vente au comptant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ventesComptant.length > 0 ? (
                ventesComptant.map((vente) => (
                  <div key={vente.id} className="flex justify-between items-center">
                    <div>
                      <span className="font-medium">{vente.produit_nom}</span>
                      <span className="text-sm text-gray-500 ml-2">
                        {vente.quantite.toLocaleString()} L
                      </span>
                    </div>
                    <span className="font-medium">
                      {formatMAD(vente.valeur_totale)}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Aucune vente comptant</p>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Comptant</span>
                  <span>{formatMAD(totalComptant)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Vente à crédit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ventesCredit.length > 0 ? (
                ventesCredit.map((vente) => (
                  <div key={vente.id} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="font-medium">{vente.produit_nom}</span>
                        <span className="text-sm text-gray-500 ml-2">
                          {vente.quantite.toLocaleString()} L
                        </span>
                      </div>
                      <span className="font-medium">
                        {formatMAD(vente.valeur_totale)}
                      </span>
                    </div>
                    {vente.client_nom && (
                      <div className="text-xs text-gray-500 pl-2">
                        Client: {vente.client_nom}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Aucune vente crédit</p>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Crédit</span>
                  <span>{formatMAD(totalCredit)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Détail par produit et totaux */}
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Carburant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Tonnage Carburant</span>
                <span className="font-medium">
                  {salesData
                    .filter(v => v.famille_produit === 'carburant')
                    .reduce((sum, v) => sum + v.quantite, 0)
                    .toLocaleString()} L
                </span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total CA</span>
                <span>{formatMAD(totalCarburant)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Vente Non Carburant</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {salesData
                .filter(v => v.famille_produit === 'non_carburant')
                .map((vente) => (
                  <div key={vente.id} className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{vente.produit_nom}</span>
                      <Badge variant="outline" className="text-xs">
                        {vente.categorie}
                      </Badge>
                    </div>
                    <span className="font-medium">
                      {formatMAD(vente.valeur_totale)}
                    </span>
                  </div>
                ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between items-center font-bold">
                  <span>Total Non Carburant</span>
                  <span>{formatMAD(totalNonCarburant)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
