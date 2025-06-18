
import React, { useState, useEffect } from 'react';
import { getEncaissementsForReport } from '@/services/reportsService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface PaymentsTabProps {
  reportUuid: string;
}

export default function PaymentsTab({ reportUuid }: PaymentsTabProps) {
  const [encaissements, setEncaissements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getEncaissementsForReport(reportUuid);
        setEncaissements(data);
      } catch (error) {
        console.error('Error fetching payments data:', error);
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

  const getPaymentTypeLabel = (type: string) => {
    switch (type) {
      case 'espece': return 'ESP';
      case 'carte': return 'TPE';
      case 'credit': return 'CHQ';
      case 'cheque': return 'Virement';
      default: return type.toUpperCase();
    }
  };

  const getPaymentTypeColor = (type: string) => {
    switch (type) {
      case 'espece': return '#10B981';
      case 'carte': return '#3B82F6';
      case 'credit': return '#F59E0B';
      case 'cheque': return '#8B5CF6';
      default: return '#6B7280';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Chargement des encaissements...</span>
      </div>
    );
  }

  if (encaissements.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 mb-4">
          <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun encaissement</h3>
        <p className="text-gray-500">Aucun encaissement trouvé pour ce rapport.</p>
      </div>
    );
  }

  const totalMontant = encaissements.reduce((sum, enc) => sum + enc.montant, 0);

  const pieData = encaissements.map(enc => ({
    name: getPaymentTypeLabel(enc.type_paiement),
    value: enc.montant,
    color: getPaymentTypeColor(enc.type_paiement),
    percentage: enc.pourcentage
  }));

  return (
    <div className="space-y-6">
      {/* Graphique en secteurs */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Répartition des encaissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-6">
            <div className="w-48 h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={30}
                    outerRadius={80}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatMAD(Number(value))} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1">
              <div className="space-y-3">
                {encaissements.map((enc, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: getPaymentTypeColor(enc.type_paiement) }}
                      />
                      <span className="font-medium">
                        {getPaymentTypeLabel(enc.type_paiement)}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">
                        {formatMAD(enc.montant)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {enc.pourcentage.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tableau détaillé */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Détail des encaissements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {encaissements.map((enc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: getPaymentTypeColor(enc.type_paiement) }}
                  >
                    {getPaymentTypeLabel(enc.type_paiement).charAt(0)}
                  </div>
                  <div>
                    <div className="font-medium">
                      {getPaymentTypeLabel(enc.type_paiement)}
                    </div>
                    {enc.nb_transactions && (
                      <div className="text-sm text-gray-500">
                        {enc.nb_transactions} transactions
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">
                    {formatMAD(enc.montant)}
                  </div>
                  <div className="text-sm text-gray-500">
                    {enc.pourcentage.toFixed(2)}%
                  </div>
                </div>
              </div>
            ))}
            
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total (MAD)</span>
                <span>{formatMAD(totalMontant)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
