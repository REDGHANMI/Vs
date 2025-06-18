
import React, { useState, useEffect } from 'react';
import { getStocksCiternesForReport } from '@/services/reportsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface TanksTabProps {
  reportUuid: string;
}

export default function TanksTab({ reportUuid }: TanksTabProps) {
  const [stocksData, setStocksData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getStocksCiternesForReport(reportUuid);
        setStocksData(data);
      } catch (error) {
        console.error('Error fetching tanks data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (reportUuid) {
      fetchData();
    }
  }, [reportUuid]);

  const formatLiters = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' L';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Chargement des cuves...</span>
      </div>
    );
  }

  if (stocksData.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucune cuve</h3>
        <p className="text-gray-500">Aucune donnée de cuve trouvée pour ce rapport.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Stock Citerne</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Code</th>
                  <th className="text-left p-2">Désignation</th>
                  <th className="text-right p-2">Capacité</th>
                  <th className="text-right p-2">Stock Ini</th>
                  <th className="text-right p-2">Entrée</th>
                  <th className="text-right p-2">Sortie</th>
                  <th className="text-right p-2">Stock Fin</th>
                  <th className="text-right p-2">Jaugeage</th>
                  <th className="text-right p-2">Variation</th>
                </tr>
              </thead>
              <tbody>
                {stocksData.map((stock, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2 font-mono text-xs">
                      {stock.code_produit || 'N/A'}
                    </td>
                    <td className="p-2 font-medium">
                      {stock.designation_produit || stock.produit}
                    </td>
                    <td className="p-2 text-right">
                      {stock.capacite_max.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {stock.stock_debut.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {stock.livraisons.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {stock.ventes.toLocaleString()}
                    </td>
                    <td className="p-2 text-right font-medium">
                      {stock.stock_fin.toLocaleString()}
                    </td>
                    <td className="p-2 text-right">
                      {stock.jauge_finale?.toLocaleString() || 'N/A'}
                    </td>
                    <td className="p-2 text-right">
                      <div className="flex items-center justify-end space-x-1">
                        {(stock.variation || 0) > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-500" />
                        ) : (stock.variation || 0) < 0 ? (
                          <TrendingDown className="w-3 h-3 text-red-500" />
                        ) : null}
                        <span className={
                          (stock.variation || 0) > 0 ? 'text-green-600' :
                          (stock.variation || 0) < 0 ? 'text-red-600' : 'text-gray-600'
                        }>
                          {(stock.variation || 0) > 0 ? '+' : ''}{stock.variation || 0}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Niveaux des cuves */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stocksData.map((stock, index) => {
          const pourcentageRemplissage = stock.pourcentage_remplissage || 
            ((stock.stock_fin / stock.capacite_max) * 100);
          
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold">{stock.designation_produit || stock.produit}</h4>
                    <span className="text-sm text-gray-500">
                      {pourcentageRemplissage.toFixed(1)}%
                    </span>
                  </div>
                  
                  <Progress 
                    value={pourcentageRemplissage} 
                    className="h-3"
                  />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Stock actuel:</span>
                      <div className="font-medium">{formatLiters(stock.stock_fin)}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Capacité max:</span>
                      <div className="font-medium">{formatLiters(stock.capacite_max)}</div>
                    </div>
                  </div>

                  {stock.ecart !== 0 && (
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-600">Écart:</span>
                      <span className={`font-medium ${
                        stock.ecart > 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stock.ecart > 0 ? '+' : ''}{formatLiters(stock.ecart)}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
