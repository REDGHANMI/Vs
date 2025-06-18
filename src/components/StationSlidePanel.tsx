import { X, User, Phone, TrendingUp, TrendingDown, Download, AlertTriangle, CheckCircle, Clock, MapPin, Calendar, Building2, Users, ChevronDown, ChevronUp, Fuel, Gauge, FileText, Plus, Maximize2, Minimize2 } from "lucide-react";
import { Station } from "@/types/database";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useParameters } from "@/contexts/ParametersContext";
import { mockStationsEnriched } from "@/data/mockStationsEnriched";
import { mockSalaries } from "@/data/mockSalaries";
import { mockPrixCarburantsEnriched } from "@/data/mockPrixCarburantsEnriched";
import { mockVolucompteursEnriched } from "@/data/mockVolucompteursEnriched";
import { mockDocuments, type Document } from "@/data/mockDocuments";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import FileDropzone from "@/components/FileDropzone";
import StationReportsTab from "@/components/reports/StationReportsTab";
import { useState } from "react";

interface StationSlidePanelProps {
  station: Station | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function StationSlidePanel({ station, isOpen, onClose }: StationSlidePanelProps) {
  const { mouvements } = useParameters();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    otherEmployees: false,
    priceHistory: false
  });
  const [stationDocuments, setStationDocuments] = useState<Document[]>(mockDocuments);
  const [showUploadArea, setShowUploadArea] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  
  if (!station) return null;

  // Get enriched station data
  const enrichedStation = mockStationsEnriched.find(s => s.id === station.id) || station;
  
  // Get movements for this station
  const stationMouvements = mouvements.filter(m => m.station_id === station.id);
  const latestMouvement = stationMouvements[stationMouvements.length - 1];
  const previousMouvement = stationMouvements[stationMouvements.length - 2];

  // Get station employees
  const mainManager = mockSalaries.find(s => s.station_uuid === station.id && s.est_responsable_station);
  const otherEmployees = mockSalaries.filter(s => s.station_uuid === station.id && !s.est_responsable_station);

  // Get fuel prices
  const todayPrices = mockPrixCarburantsEnriched.filter(p => 
    p.station_id === station.id && p.date_prix === "2025-06-18"
  )[0];

  const priceHistory = mockPrixCarburantsEnriched
    .filter(p => p.station_id === station.id)
    .sort((a, b) => new Date(b.date_prix).getTime() - new Date(a.date_prix).getTime())
    .slice(0, 5);

  // Get volucompteurs
  const stationVolucompteurs = mockVolucompteursEnriched.filter(v => v.station_id === station.id);
  const volucompteursGrouped = stationVolucompteurs.reduce((acc, vol) => {
    const key = vol.ilot_nom || `Ilot ${vol.ilot_id}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(vol);
    return acc;
  }, {} as Record<string, typeof stationVolucompteurs>);

  // Get documents for this station
  const filteredDocuments = stationDocuments.filter(doc => doc.station_uuid === station.id);

  // Get society theme color
  const societyThemeColor = station.societe?.couleur_theme || "#dc2626";
  const societyLogo = station.societe?.logo_url;

  const formatMAD = (amount: number) => {
    return new Intl.NumberFormat('fr-MA').format(amount) + ' MAD';
  };

  // Determine status based on movements
  const getStationStatus = () => {
    if (!latestMouvement) return "sans_mouvement";
    if (latestMouvement.montant < 10000) return "anomalie";
    return "a_jour";
  };

  const status = getStationStatus();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "a_jour": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "sans_mouvement": return <Clock className="w-5 h-5 text-yellow-500" />;
      case "anomalie": return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "a_jour": return "Station à jour";
      case "sans_mouvement": return "Mouvement manquant";
      case "anomalie": return "Anomalie détectée";
      default: return "Statut inconnu";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "a_jour": return "bg-green-100 text-green-800";
      case "sans_mouvement": return "bg-yellow-100 text-yellow-800";
      case "anomalie": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStationStatusBadge = (statut?: string) => {
    switch (statut) {
      case "operationnel": return <Badge className="bg-green-100 text-green-800">Opérationnelle</Badge>;
      case "maintenance": return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case "ferme": return <Badge className="bg-red-100 text-red-800">Fermée</Badge>;
      case "construction": return <Badge className="bg-blue-100 text-blue-800">Construction</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Inconnue</Badge>;
    }
  };

  const getVolucompteurStatusBadge = (statut?: string) => {
    switch (statut) {
      case "operationnel": return <Badge className="bg-green-100 text-green-800">Opérationnel</Badge>;
      case "maintenance": return <Badge className="bg-yellow-100 text-yellow-800">Maintenance</Badge>;
      case "anomalie": return <Badge className="bg-red-100 text-red-800">Anomalie</Badge>;
      default: return <Badge className="bg-gray-100 text-gray-800">Inconnu</Badge>;
    }
  };

  const getDocumentTypeBadge = (type: string) => {
    const typeLabels = {
      contrat: "Contrat",
      autorisation: "Autorisation", 
      certificat: "Certificat",
      plan_securite: "Plan sécurité",
      autre: "Autre"
    };
    
    const typeColors = {
      contrat: "bg-blue-100 text-blue-800",
      autorisation: "bg-green-100 text-green-800",
      certificat: "bg-purple-100 text-purple-800", 
      plan_securite: "bg-red-100 text-red-800",
      autre: "bg-gray-100 text-gray-800"
    };

    return (
      <Badge className={typeColors[type as keyof typeof typeColors] || typeColors.autre}>
        {typeLabels[type as keyof typeof typeLabels] || typeLabels.autre}
      </Badge>
    );
  };

  // Prepare chart data from real movements
  const chartData = stationMouvements
    .filter(m => m.type === "entree")
    .slice(-6)
    .map((mouvement, index) => ({
      mois: `M${index + 1}`,
      ca: mouvement.montant / 1000, // Convert to thousands
      espece: mouvement.mode_paiement === "espece" ? mouvement.montant / 1000 : 0,
      tpe: mouvement.mode_paiement === "carte" ? mouvement.montant / 1000 : 0,
      cheque: mouvement.mode_paiement === "cheque" ? mouvement.montant / 1000 : 0,
      virement: mouvement.mode_paiement === "virement" ? mouvement.montant / 1000 : 0
    }));

  // Payment breakdown from movements
  const paymentData = stationMouvements
    .filter(m => m.type === "entree")
    .reduce((acc, mouvement) => {
      const mode = mouvement.mode_paiement || "autre";
      acc[mode] = (acc[mode] || 0) + mouvement.montant;
      return acc;
    }, {} as Record<string, number>);

  const pieData = Object.entries(paymentData)
    .filter(([, value]) => value > 0)
    .map(([mode, value]) => ({
      name: mode === "espece" ? "Espèces" : 
            mode === "carte" ? "TPE" :
            mode === "cheque" ? "Chèques" :
            mode === "virement" ? "Virements" : "Autre",
      value,
      color: mode === "espece" ? "#10B981" :
             mode === "carte" ? "#3B82F6" :
             mode === "cheque" ? "#F59E0B" :
             mode === "virement" ? "#8B5CF6" : "#6B7280"
    }));

  // Calculate variation
  const variation = previousMouvement && latestMouvement ? 
    ((latestMouvement.montant - previousMouvement.montant) / previousMouvement.montant) * 100 : 0;

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFileUpload = (file: File) => {
    const newDocument: Document = {
      id: `doc_${Date.now()}`,
      station_uuid: station.id,
      nom_fichier: file.name,
      type_document: "autre",
      date_upload: new Date().toISOString(),
      url_fichier: `https://example.com/docs/${file.name}`
    };
    
    setStationDocuments(prev => [...prev, newDocument]);
    setShowUploadArea(false);
    console.log("Document ajouté:", newDocument);
  };

  return (
    <div className={`fixed right-0 top-0 h-full bg-white shadow-2xl z-50 transform transition-all duration-300 ease-in-out ${
      isOpen ? 'translate-x-0' : 'translate-x-full'
    } ${isExpanded ? 'w-[80%]' : 'w-96'}`}>
      <div className="flex flex-col h-full">
        {/* Header with Station Info */}
        <div 
          className="relative text-white p-6"
          style={{ background: `linear-gradient(135deg, ${societyThemeColor}, ${societyThemeColor}dd)` }}
        >
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              title={isExpanded ? "Réduire" : "Agrandir"}
            >
              {isExpanded ? (
                <Minimize2 className="w-5 h-5" />
              ) : (
                <Maximize2 className="w-5 h-5" />
              )}
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center space-x-3">
            {societyLogo && (
              <img 
                src={societyLogo} 
                alt="Logo société"
                className="w-8 h-8 rounded bg-white/10 p-1"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            )}
            <div>
              <h2 className="text-xl font-bold">{station.nom}</h2>
              <p className="text-sm opacity-90">{station.societe?.nom}</p>
            </div>
          </div>
          {/* Accent border */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{ backgroundColor: societyThemeColor }}
          ></div>
        </div>

        {/* Tabs Content */}
        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="apercu" className="h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-4 mx-4 mt-4">
              <TabsTrigger value="apercu">Aperçu</TabsTrigger>
              <TabsTrigger value="fiche">Fiche station</TabsTrigger>
              <TabsTrigger value="rapports">Rapports</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>

            {/* Overview Tab - Existing Content */}
            <TabsContent value="apercu" className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Manager Info with Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold"
                      style={{ background: `linear-gradient(135deg, ${societyThemeColor}, ${societyThemeColor}cc)` }}
                    >
                      {station.gerant?.nom_complet?.split(' ').map(n => n[0]).join('') || 'GA'}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{station.gerant?.nom_complet || 'Gérant non assigné'}</p>
                      <p className="text-sm text-gray-600">Gérant de station</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(status)}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{station.gerant?.telephone || 'Non renseigné'}</span>
                  </div>
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(status)}`}>
                    {getStatusText(status)}
                  </div>
                  <p className="text-xs text-gray-500">
                    Dernier mouvement : {latestMouvement?.date_mouvement || 'Jamais'}
                  </p>
                </div>
              </div>

              {/* CA Current Movement */}
              {latestMouvement && (
                <div 
                  className="rounded-lg p-4 text-white"
                  style={{ background: `linear-gradient(135deg, ${societyThemeColor}22, ${societyThemeColor}11)` }}
                >
                  <h3 className="text-lg font-semibold mb-2" style={{ color: societyThemeColor }}>Dernier Mouvement</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold" style={{ color: societyThemeColor }}>{formatMAD(latestMouvement.montant)}</p>
                      <div className="flex items-center mt-1">
                        {variation > 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                        )}
                        <span className={`text-sm font-medium ${variation > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {variation > 0 ? '+' : ''}{variation.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm opacity-80" style={{ color: societyThemeColor }}>Type</p>
                      <p className="text-lg font-semibold" style={{ color: societyThemeColor }}>{latestMouvement.type}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment Breakdown */}
              {pieData.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Répartition Paiements</h3>
                  <div className="h-40">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={60}
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
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    {pieData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CA Trend */}
              {chartData.length > 0 && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Tendance CA</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="mois" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}K MAD`} />
                        <Line type="monotone" dataKey="ca" stroke={societyThemeColor} strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Movement Details */}
              {latestMouvement && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Détails Mouvement</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Catégorie:</span>
                      <span className="font-medium">{latestMouvement.categorie}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Mode paiement:</span>
                      <span className="font-medium">{latestMouvement.mode_paiement || 'Non spécifié'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Description:</span>
                      <span className="font-medium">{latestMouvement.description}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">{new Date(latestMouvement.date_mouvement).toLocaleDateString('fr-FR')}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* No Data Message */}
              {!latestMouvement && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-semibold text-yellow-800">Aucun mouvement disponible</h3>
                      <p className="text-sm text-yellow-600 mt-1">Cette station n'a pas encore enregistré de mouvement.</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Documents */}
              <div className="bg-white border border-gray-200 rounded-lg p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                <div className="space-y-2">
                  <button className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm text-gray-700">Rapport mensuel</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm text-gray-700">Contrat gérance</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="flex items-center justify-between w-full p-2 hover:bg-gray-50 rounded-lg transition-colors">
                    <span className="text-sm text-gray-700">Certificats conformité</span>
                    <Download className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </TabsContent>

            {/* Station Details Tab - Existing Content */}
            <TabsContent value="fiche" className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Station Photo Header */}
              <div className="relative h-48 rounded-lg overflow-hidden">
                {enrichedStation.photo_url ? (
                  <img
                    src={enrichedStation.photo_url}
                    alt={`Photo de ${station.nom}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=400&fit=crop";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Building2 className="w-16 h-16 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-bold">{station.nom}</h3>
                  <p className="text-sm opacity-90">{station.societe?.nom}</p>
                </div>
              </div>

              {/* General Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5" />
                    <span>Informations générales</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Nom de la station</p>
                      <p className="font-medium">{station.nom}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Société</p>
                      <p className="font-medium">{station.societe?.nom}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Ville / Adresse</p>
                      <p className="font-medium">{station.ville || 'Non renseignée'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date d'ouverture</p>
                      <p className="font-medium">
                        {enrichedStation.date_ouverture ? 
                          new Date(enrichedStation.date_ouverture).toLocaleDateString('fr-FR') : 
                          'Non renseignée'
                        }
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Statut</p>
                    {getStationStatusBadge(enrichedStation.statut)}
                  </div>
                </CardContent>
              </Card>

              {/* Main Manager */}
              {mainManager && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="w-5 h-5" />
                      <span>Gérant principal</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={mainManager.photo_url} />
                        <AvatarFallback>
                          {mainManager.nom_complet.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{mainManager.nom_complet}</h4>
                        <p className="text-sm text-gray-600">{mainManager.poste}</p>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center space-x-2">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">{mainManager.telephone}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-gray-400" />
                            <span className="text-sm">
                              Embauché le {mainManager.date_embauche ? 
                                new Date(mainManager.date_embauche).toLocaleDateString('fr-FR') : 
                                'Date inconnue'
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Other Employees Accordion */}
              {otherEmployees.length > 0 && (
                <Collapsible 
                  open={openSections.otherEmployees} 
                  onOpenChange={() => toggleSection('otherEmployees')}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-5 h-5" />
                            <span>Autres salariés de la station</span>
                          </div>
                          {openSections.otherEmployees ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-3">
                        {otherEmployees.map((employee) => (
                          <div key={employee.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={employee.photo_url} />
                              <AvatarFallback className="text-xs">
                                {employee.nom_complet.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{employee.nom_complet}</p>
                              <p className="text-xs text-gray-600">{employee.poste}</p>
                              <p className="text-xs text-gray-500">
                                Embauché le {employee.date_embauche ? 
                                  new Date(employee.date_embauche).toLocaleDateString('fr-FR') : 
                                  'Date inconnue'
                                }
                              </p>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}

              {/* Fuel Prices Today */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fuel className="w-5 h-5" />
                    <span>Prix carburants du jour</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-semibold text-blue-900">Gasoil 10ppm</h4>
                      <p className="text-2xl font-bold text-blue-700">
                        {todayPrices?.prix_gasoil ? `${todayPrices.prix_gasoil.toFixed(2)} DH` : '-- DH'}
                      </p>
                      {todayPrices?.variation_gasoil && (
                        <div className="flex items-center mt-1">
                          {todayPrices.variation_gasoil > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${todayPrices.variation_gasoil > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {todayPrices.variation_gasoil > 0 ? '+' : ''}{(todayPrices.variation_gasoil * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-semibold text-green-900">SSP</h4>
                      <p className="text-2xl font-bold text-green-700">
                        {todayPrices?.prix_ssp ? `${todayPrices.prix_ssp.toFixed(2)} DH` : '-- DH'}
                      </p>
                      {todayPrices?.variation_ssp && (
                        <div className="flex items-center mt-1">
                          {todayPrices.variation_ssp > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm ${todayPrices.variation_ssp > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {todayPrices.variation_ssp > 0 ? '+' : ''}{(todayPrices.variation_ssp * 100).toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Price History Accordion */}
              {priceHistory.length > 0 && (
                <Collapsible 
                  open={openSections.priceHistory} 
                  onOpenChange={() => toggleSection('priceHistory')}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
                        <CardTitle className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Clock className="w-5 h-5" />
                            <span>Historique des 5 derniers jours</span>
                          </div>
                          {openSections.priceHistory ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </CardTitle>
                      </CardHeader>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <CardContent className="space-y-3">
                        {priceHistory.map((price) => (
                          <div key={price.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <p className="font-medium">{new Date(price.date_prix).toLocaleDateString('fr-FR')}</p>
                              <div className="flex space-x-4 mt-1">
                                <span className="text-sm text-gray-600">
                                  SSP: {price.prix_ssp.toFixed(2)} DH
                                </span>
                                <span className="text-sm text-gray-600">
                                  Gasoil: {price.prix_gasoil.toFixed(2)} DH
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              {price.variation_ssp && (
                                <div className="flex items-center">
                                  {price.variation_ssp > 0 ? (
                                    <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                                  )}
                                  <span className={`text-xs ${price.variation_ssp > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {(price.variation_ssp * 100).toFixed(1)}%
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )}

              {/* Volucompteurs */}
              {Object.keys(volucompteursGrouped).length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Gauge className="w-5 h-5" />
                      <span>Volucompteurs ({stationVolucompteurs.length})</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(volucompteursGrouped).map(([ilotName, volucompteurs]) => (
                        <div key={ilotName}>
                          <h4 className="font-semibold text-gray-900 mb-3">{ilotName}</h4>
                          <div className="grid gap-3">
                            {volucompteurs.map((vol) => (
                              <div key={vol.id} className="p-3 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="font-medium">{vol.code_volucompteur}</h5>
                                  {getVolucompteurStatusBadge(vol.statut)}
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                  <p><span className="font-medium">Produit:</span> {vol.produit_nom}</p>
                                  <p><span className="font-medium">Index:</span> {vol.index_courant?.toLocaleString() || 'N/A'}</p>
                                  <p><span className="font-medium">Mise à jour:</span> {
                                    vol.date_maj ? 
                                      new Date(vol.date_maj).toLocaleDateString('fr-FR') + ' ' + 
                                      new Date(vol.date_maj).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }) :
                                      'N/A'
                                  }</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* NEW RAPPORTS TAB */}
            <TabsContent value="rapports" className="flex-1 overflow-y-auto p-6">
              <StationReportsTab stationId={station.id} />
            </TabsContent>

            {/* Documents Tab - Existing Content */}
            <TabsContent value="documents" className="flex-1 overflow-y-auto p-6 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-5 h-5" />
                      <span>Documents de la station</span>
                    </div>
                    <Button
                      onClick={() => setShowUploadArea(!showUploadArea)}
                      size="sm"
                      className="flex items-center space-x-2"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Ajouter</span>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {/* Upload Area */}
                  {showUploadArea && (
                    <div className="mb-6">
                      <FileDropzone onFileUpload={handleFileUpload} />
                    </div>
                  )}

                  {/* Documents List */}
                  <div className="space-y-4">
                    {filteredDocuments.length > 0 ? (
                      filteredDocuments.map((document) => (
                        <div 
                          key={document.id} 
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                              <FileText className="w-5 h-5 text-red-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{document.nom_fichier}</h4>
                              <div className="flex items-center space-x-3 mt-1">
                                {getDocumentTypeBadge(document.type_document)}
                                <span className="text-sm text-gray-500">
                                  {new Date(document.date_upload).toLocaleDateString('fr-FR')}
                                </span>
                              </div>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => window.open(document.url_fichier, '_blank')}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun document</h3>
                        <p className="text-gray-500">Cette station n'a pas encore de documents.</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
