import React, { useState, useEffect } from 'react';
import { FileText, Calendar, User, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ReportDetailsView from './ReportDetailsView';
import { getRapportsForStation, type RapportStation } from '@/services/reportsService';

interface StationReportsTabProps {
  stationId: string;
}

export default function StationReportsTab({ stationId }: StationReportsTabProps) {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);
  const [reports, setReports] = useState<RapportStation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      console.log('StationReportsTab: Station ID received:', stationId);
      console.log('StationReportsTab: Fetching reports for station:', stationId);
      setLoading(true);
      try {
        const stationReports = await getRapportsForStation(stationId);
        console.log('StationReportsTab: Received reports:', stationReports);
        setReports(stationReports);
      } catch (error) {
        console.error('StationReportsTab: Error fetching reports:', error);
      } finally {
        setLoading(false);
      }
    };

    if (stationId) {
      fetchReports();
    } else {
      console.log('StationReportsTab: No station ID provided');
      setLoading(false);
    }
  }, [stationId]);

  const getStatusBadge = (statut: string) => {
    switch (statut) {
      case "complet":
        return <Badge className="bg-green-100 text-green-800">Complet</Badge>;
      case "en_cours":
        return <Badge className="bg-yellow-100 text-yellow-800">En cours</Badge>;
      case "manquant":
        return <Badge className="bg-red-100 text-red-800">Manquant</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>;
    }
  };

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  if (selectedReport) {
    const report = reports.find(r => r.uuid === selectedReport);
    if (report) {
      return (
        <ReportDetailsView 
          report={report} 
          onBack={() => setSelectedReport(null)} 
        />
      );
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Chargement des rapports...</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <FileText className="w-5 h-5" />
          <span>Rapports de la station</span>
        </h3>
        <Badge variant="outline">{reports.length} rapports</Badge>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
        <p className="text-sm text-yellow-800">
          <strong>Debug Info:</strong> Station ID: {stationId || 'No station selected'} | Reports found: {reports.length}
        </p>
      </div>

      {reports.length > 0 ? (
        <div className="space-y-3">
          {reports.map((report) => (
            <Card key={report.uuid} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-gray-900">
                        Rapport N° {report.numero_rapport || 'N/A'}
                      </h4>
                      {getStatusBadge(report.statut)}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(report.date_rapport).toLocaleDateString('fr-FR')}</span>
                        {report.heure_creation && (
                          <span className="text-gray-400">à {report.heure_creation}</span>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{report.gerant_nom}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-blue-600">CA Total</span>
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                        </div>
                        <p className="text-lg font-bold text-blue-700">
                          {formatMAD(report.total_ca)}
                        </p>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-green-600">Tonnage</span>
                          <span className="text-xs text-green-500">L</span>
                        </div>
                        <p className="text-lg font-bold text-green-700">
                          {report.total_tonnage?.toLocaleString() || 'N/A'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    <Button
                      onClick={() => setSelectedReport(report.uuid)}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Voir détails</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun rapport</h3>
          <p className="text-gray-500">Cette station n'a pas encore de rapports.</p>
          <p className="text-sm text-gray-400 mt-2">Station ID: {stationId}</p>
        </div>
      )}
    </div>
  );
}
