

import React, { useState, useEffect } from 'react';
import { getVolucompteursForReport } from '@/services/reportsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface InventoryTabProps {
  reportUuid: string;
}

export default function InventoryTab({ reportUuid }: InventoryTabProps) {
  const [lignesData, setLignesData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getVolucompteursForReport(reportUuid);
        setLignesData(data);
      } catch (error) {
        console.error('Error fetching inventory data:', error);
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
        <span className="ml-2 text-gray-600">Chargement de l'inventaire...</span>
      </div>
    );
  }

  if (lignesData.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012-2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune donnée d'inventaire</h3>
        <p className="text-gray-500">Aucune ligne de volucompteur trouvée pour ce rapport.</p>
      </div>
    );
  }

  // Regrouper par îlot
  const dataGroupedByIlot = lignesData.reduce((acc, item) => {
    const ilotKey = item.volucompteurs?.ilots?.nom_ilot || 
                   `Ilot ${item.volucompteurs?.ilots?.numero_ilot || 'N/A'}`;
    if (!acc[ilotKey]) {
      acc[ilotKey] = [];
    }
    acc[ilotKey].push(item);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      {Object.entries(dataGroupedByIlot).map(([ilotName, items]) => {
        const typedItems = items as any[];
        return (
          <Card key={ilotName}>
            <CardHeader>
              <CardTitle className="text-base flex items-center justify-between">
                <span>{ilotName}</span>
                <Badge variant="outline">{typedItems.length} volucompteurs</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {typedItems.map((item) => (
                  <div key={item.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold">
                          {item.volucompteurs?.code_volucompteur || 'Code N/A'}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.volucompteurs?.produit_nom || item.produit_nom || 'Produit N/A'}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">
                          {formatMAD(item.valeur_totale)}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Quantité (L):</span>
                        <div className="font-medium">
                          {item.quantite?.toLocaleString() || '0'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Prix unitaire:</span>
                        <div className="font-medium">
                          {item.prix_unitaire?.toFixed(2) || '0.00'} MAD
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Type vente:</span>
                        <div className="font-medium capitalize">
                          {item.type_vente || 'N/A'}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Catégorie:</span>
                        <div className="font-medium">
                          {item.categorie || 'N/A'}
                        </div>
                      </div>
                    </div>

                    {item.client_nom && (
                      <div className="mt-2 text-sm">
                        <span className="text-gray-600">Client: </span>
                        <span className="font-medium">{item.client_nom}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

