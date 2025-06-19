
import React, { useState } from 'react';
import { X, MapPin, Building, User, BarChart3, FileText, Upload, Expand, Shrink, Camera, Fuel } from 'lucide-react';
import { useParameters } from '@/contexts/ParametersContext';
import StationReportsTab from '@/components/reports/StationReportsTab';
import DocumentUploadSimulated from './documents/DocumentUploadSimulated';
import DocumentsList from './documents/DocumentsList';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { mockPrixCarburants } from '@/data/mockPrixCarburants';

interface StationSlidePanelProps {
  stationId: string | null;
  onClose: () => void;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function StationSlidePanel({ stationId, onClose }: StationSlidePanelProps) {
  const { getStationById, getStationsWithRelations } = useParameters();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const stationsWithRelations = getStationsWithRelations();
  const stationWithRelations = stationsWithRelations.find(s => s.id === stationId);

  if (!stationWithRelations) {
    return null;
  }

  const handleDocumentUploadComplete = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const toggleExpanded = () => {
    setIsExpanded(prev => !prev);
  };

  // Simuler les prix actuels pour la station
  const getCurrentPrices = () => {
    const stationPrices = mockPrixCarburants.filter(p => p.societe_id === stationWithRelations.societe_id);
    const latestPrices = stationPrices.sort((a, b) => new Date(b.date_prix).getTime() - new Date(a.date_prix).getTime())[0];
    return latestPrices || { prix_ssp: 13.20, prix_gasoil: 11.29 };
  };

  // Simuler l'historique des prix
  const getPriceHistory = () => {
    const stationPrices = mockPrixCarburants.filter(p => p.societe_id === stationWithRelations.societe_id);
    return stationPrices.sort((a, b) => new Date(b.date_prix).getTime() - new Date(a.date_prix).getTime()).slice(0, 7);
  };

  const currentPrices = getCurrentPrices();
  const priceHistory = getPriceHistory();

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: BarChart3 },
    { id: 'reports', label: 'Rapports', icon: FileText },
    { id: 'ged', label: 'GED Simulation', icon: Upload }
  ];

  // Default station image
  const defaultStationImage = "https://images.unsplash.com/photo-1528744598421-b7b93e12df15?auto=format&fit=crop&w=800&q=80";
  const stationImage = stationWithRelations.photo_url || defaultStationImage;

  return (
    <div className={`fixed inset-y-0 right-0 bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col transition-all duration-300 ${
      isExpanded ? 'w-[800px]' : 'w-[500px]'
    }`}>
      {/* Header with station image */}
      <div className="relative">
        <div className="h-48 bg-gradient-to-r from-blue-500 to-blue-600 relative overflow-hidden">
          <img 
            src={stationImage}
            alt={stationWithRelations.nom}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = defaultStationImage;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
        
        {/* Close and Expand buttons */}
        <div className="absolute top-4 right-4 flex space-x-2">
          <button
            onClick={toggleExpanded}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isExpanded ? <Shrink className="w-5 h-5 text-white" /> : <Expand className="w-5 h-5 text-white" />}
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Station info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h2 className="text-2xl font-bold mb-1">{stationWithRelations.nom}</h2>
          <div className="flex items-center space-x-4 text-sm opacity-90">
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{stationWithRelations.ville || 'Ville non renseignée'}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Building className="w-4 h-4" />
              <span>{stationWithRelations.societe?.nom || 'Société inconnue'}</span>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              stationWithRelations.active 
                ? 'bg-green-500/20 text-green-100' 
                : 'bg-red-500/20 text-red-100'
            }`}>
              {stationWithRelations.active ? 'Active' : 'Inactive'}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                selectedTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {selectedTab === 'overview' && (
          <div className="p-6 space-y-6">
            {/* Indicateurs de prix */}
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Fuel className="w-5 h-5 text-blue-600" />
                    <span>SSP</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {currentPrices.prix_ssp?.toFixed(2)} DH
                  </div>
                  <p className="text-sm text-gray-500">Prix du jour</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center space-x-2 text-lg">
                    <Fuel className="w-5 h-5 text-green-600" />
                    <span>Gasoil</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {currentPrices.prix_gasoil?.toFixed(2)} DH
                  </div>
                  <p className="text-sm text-gray-500">Prix du jour</p>
                </CardContent>
              </Card>
            </div>

            {/* Accordéon historique des prix */}
            <Accordion type="single" collapsible>
              <AccordionItem value="price-history">
                <AccordionTrigger>Historique des prix (derniers jours)</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {priceHistory.map((price, index) => (
                      <div key={price.id} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-600">
                          {new Date(price.date_prix).toLocaleDateString('fr-FR')}
                        </span>
                        <div className="flex space-x-4">
                          <span className="text-sm">SSP: <strong>{price.prix_ssp?.toFixed(2)} DH</strong></span>
                          <span className="text-sm">Gasoil: <strong>{price.prix_gasoil?.toFixed(2)} DH</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Section caméra de surveillance */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <button className="text-blue-600 hover:text-blue-800 hover:underline font-medium">
                Voir les enregistrements vidéo de la station
              </button>
            </div>

            {/* Gerant info */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2" />
                Gérant
              </h3>
              {stationWithRelations.gerant ? (
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{stationWithRelations.gerant.nom_complet}</p>
                    <p className="text-sm text-gray-600">{stationWithRelations.gerant.poste}</p>
                    {stationWithRelations.gerant.telephone && (
                      <p className="text-sm text-gray-500">{stationWithRelations.gerant.telephone}</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">Aucun gérant assigné</p>
              )}
            </div>

            {/* Station details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Détails de la station</h3>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="bg-white border rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-600">{stationWithRelations.nombre_pistons || 'N/A'}</div>
                  <div className="text-sm text-gray-600">Pistons</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-600">Date début:</span>
                  <p className="text-gray-900">{new Date(stationWithRelations.created_at).toLocaleDateString('fr-FR')}</p>
                </div>
                
                <div>
                  <span className="text-sm font-medium text-gray-600">Statut:</span>
                  <p className={`inline-block ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                    stationWithRelations.active 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {stationWithRelations.active ? 'Active' : 'Inactive'}
                  </p>
                </div>

                {stationWithRelations.adresse_complete && (
                  <div>
                    <span className="text-sm font-medium text-gray-600">Adresse:</span>
                    <p className="text-gray-900">{stationWithRelations.adresse_complete}</p>
                  </div>
                )}
              </div>

              {stationWithRelations.services_additionnels && stationWithRelations.services_additionnels.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Services additionnels</h4>
                  <div className="flex flex-wrap gap-2">
                    {stationWithRelations.services_additionnels.map((service: string, index: number) => (
                      <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {stationWithRelations.commentaires && (
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Commentaires</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    {stationWithRelations.commentaires}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {selectedTab === 'reports' && (
          <StationReportsTab stationId={stationId} />
        )}

        {selectedTab === 'ged' && (
          <DocumentUploadSimulated stationId={stationId} />
        )}
      </div>
    </div>
  );
}
