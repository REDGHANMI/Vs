
import React from 'react';
import { ArrowLeft, DollarSign, CreditCard, Fuel, Package } from 'lucide-react';
import { RapportStation } from '@/services/reportsService';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import SalesTab from './tabs/SalesTab';
import PaymentsTab from './tabs/PaymentsTab';
import TanksTab from './tabs/TanksTab';
import InventoryTab from './tabs/InventoryTab';

interface ReportDetailsViewProps {
  report: RapportStation;
  onBack: () => void;
}

export default function ReportDetailsView({ report, onBack }: ReportDetailsViewProps) {
  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button
          onClick={onBack}
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </Button>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Rapport N° {report.numero_rapport || 'N/A'}
          </h3>
          <p className="text-sm text-gray-600">
            {new Date(report.date_rapport).toLocaleDateString('fr-FR')} 
            {report.heure_creation && ` à ${report.heure_creation}`}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">CA Total</p>
                <p className="text-xl font-bold text-gray-900">
                  {formatMAD(report.total_ca)}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tonnage</p>
                <p className="text-xl font-bold text-gray-900">
                  {report.total_tonnage?.toLocaleString() || 'N/A'} L
                </p>
              </div>
              <Fuel className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs defaultValue="ventes" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="ventes" className="flex items-center space-x-2">
            <DollarSign className="w-4 h-4" />
            <span>Ventes</span>
          </TabsTrigger>
          <TabsTrigger value="encaissements" className="flex items-center space-x-2">
            <CreditCard className="w-4 h-4" />
            <span>Encaissements</span>
          </TabsTrigger>
          <TabsTrigger value="cuves" className="flex items-center space-x-2">
            <Fuel className="w-4 h-4" />
            <span>Cuves</span>
          </TabsTrigger>
          <TabsTrigger value="inventaire" className="flex items-center space-x-2">
            <Package className="w-4 h-4" />
            <span>Inventaire</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ventes" className="space-y-4">
          <SalesTab reportUuid={report.uuid} />
        </TabsContent>

        <TabsContent value="encaissements" className="space-y-4">
          <PaymentsTab reportUuid={report.uuid} />
        </TabsContent>

        <TabsContent value="cuves" className="space-y-4">
          <TanksTab reportUuid={report.uuid} />
        </TabsContent>

        <TabsContent value="inventaire" className="space-y-4">
          <InventoryTab reportUuid={report.uuid} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
