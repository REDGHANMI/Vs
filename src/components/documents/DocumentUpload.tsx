
import React, { useState, useCallback } from 'react';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface DocumentUploadProps {
  stationId: string;
  onUploadComplete?: () => void;
}

export default function DocumentUpload({ stationId, onUploadComplete }: DocumentUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const uploadFile = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${stationId}/${Date.now()}_${file.name}`;
      
      console.log('Uploading file:', fileName);
      
      const { data, error } = await supabase.storage
        .from('documents')
        .upload(fileName, file);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('File uploaded successfully:', data);
      
      // Save document record to database
      const { error: dbError } = await supabase
        .from('documents')
        .insert({
          station_uuid: stationId,
          nom_fichier: file.name,
          url_fichier: data.path,
          type_document: fileExt || 'unknown'
        });

      if (dbError) {
        console.error('Database error:', dbError);
        throw dbError;
      }

      return fileName;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    await handleFiles(files);
  }, [stationId]);

  const handleFileSelect = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    await handleFiles(files);
  }, [stationId]);

  const handleFiles = async (files: File[]) => {
    if (files.length === 0) return;

    setUploading(true);
    const successfulUploads: string[] = [];

    try {
      for (const file of files) {
        try {
          const fileName = await uploadFile(file);
          successfulUploads.push(file.name);
          console.log('Successfully uploaded:', file.name);
        } catch (error) {
          console.error('Failed to upload:', file.name, error);
          toast({
            title: "Erreur d'upload",
            description: `Échec de l'upload du fichier ${file.name}`,
            variant: "destructive",
          });
        }
      }

      if (successfulUploads.length > 0) {
        setUploadedFiles(prev => [...prev, ...successfulUploads]);
        toast({
          title: "Upload réussi",
          description: `${successfulUploads.length} fichier(s) uploadé(s) avec succès`,
        });
        onUploadComplete?.();
      }
    } catch (error) {
      console.error('Upload process error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleBrowseClick = () => {
    const input = document.getElementById('file-input-' + stationId) as HTMLInputElement;
    input?.click();
  };

  return (
    <div className="w-full p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Gestion Électronique de Documents</h3>
        <p className="text-sm text-gray-600">Uploadez vos documents pour cette station</p>
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
              {uploading ? 'Upload en cours...' : 'Glissez & Déposez'}
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
            Supports PDF, DOC, XLS, JPG, PNG
          </p>
        </div>
      </div>
      
      {uploadedFiles.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Fichiers uploadés :</h4>
          <div className="space-y-2">
            {uploadedFiles.map((fileName, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span>{fileName}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <input
        id={`file-input-${stationId}`}
        type="file"
        multiple
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
