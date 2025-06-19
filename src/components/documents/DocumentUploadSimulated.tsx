
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimulatedDocument {
  id: string;
  nom_fichier: string;
  type_document: string;
  size: number;
  date_upload: string;
}

interface DocumentUploadSimulatedProps {
  stationId: string;
  onDocumentsChange?: (documents: SimulatedDocument[]) => void;
}

export default function DocumentUploadSimulated({ stationId, onDocumentsChange }: DocumentUploadSimulatedProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [simulatedDocuments, setSimulatedDocuments] = useState<SimulatedDocument[]>([]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const simulateFileUpload = async (file: File): Promise<SimulatedDocument> => {
    // Simuler un délai d'upload
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    const fileExt = file.name.split('.').pop() || 'unknown';
    
    return {
      id: `sim_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      nom_fichier: file.name,
      type_document: fileExt,
      size: file.size,
      date_upload: new Date().toISOString()
    };
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, []);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await handleFiles(files);
  }, []);

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    const newDocuments: SimulatedDocument[] = [];

    try {
      for (const file of files) {
        try {
          console.log('Simulation de l\'upload:', file.name);
          const simulatedDoc = await simulateFileUpload(file);
          newDocuments.push(simulatedDoc);
          console.log('Document simulé créé:', simulatedDoc);
        } catch (error) {
          console.error('Erreur lors de la simulation:', file.name, error);
        }
      }

      if (newDocuments.length > 0) {
        setSimulatedDocuments(prev => {
          const updated = [...prev, ...newDocuments];
          onDocumentsChange?.(updated);
          return updated;
        });
      }
    } catch (error) {
      console.error('Erreur lors du processus de simulation:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleBrowseClick = () => {
    const input = document.getElementById('file-input-simulated-' + stationId) as HTMLInputElement;
    input?.click();
  };

  const removeDocument = (id: string) => {
    setSimulatedDocuments(prev => {
      const updated = prev.filter(doc => doc.id !== id);
      onDocumentsChange?.(updated);
      return updated;
    });
  };

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-5 h-5 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <FileText className="w-5 h-5 text-green-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileText className="w-5 h-5 text-purple-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full p-6 space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Simulation GED</h3>
        <p className="text-sm text-gray-600">Testez le drag & drop (simulation en mémoire)</p>
      </div>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-gray-50'
        } ${uploading ? 'opacity-50 pointer-events-none' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
            {uploading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            ) : (
              <Upload className="w-8 h-8 text-blue-500" />
            )}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">
              {uploading ? 'Simulation en cours...' : 'Glissez & Déposez'}
            </p>
            <p className="text-lg font-medium text-gray-900">
              ou{' '}
              <button 
                onClick={handleBrowseClick}
                className="text-blue-500 hover:text-blue-600 underline"
                disabled={uploading}
              >
                parcourir
              </button>
            </p>
          </div>
          
          <p className="text-sm text-gray-500">
            Simulation - Tous types de fichiers acceptés
          </p>
        </div>
      </div>

      {simulatedDocuments.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-gray-700">
            Documents simulés ({simulatedDocuments.length})
          </h4>
          
          {simulatedDocuments.map((doc) => (
            <div key={doc.id} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                {getFileIcon(doc.type_document)}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {doc.nom_fichier}
                  </p>
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>Simulé</span>
                    <span>•</span>
                    <span>{formatFileSize(doc.size)}</span>
                    <span>•</span>
                    <span className="uppercase">{doc.type_document}</span>
                  </div>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeDocument(doc.id)}
                className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
      
      <input
        id={`file-input-simulated-${stationId}`}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
