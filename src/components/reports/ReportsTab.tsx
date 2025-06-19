
import React from 'react';
import ReportsKpiSection from './ReportsKpiSection';

interface ReportsTabProps {
  selectedSociety?: string;
}

export default function ReportsTab({ selectedSociety }: ReportsTabProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Rapports de Stations</h2>
      </div>

      <ReportsKpiSection selectedSociety={selectedSociety} />
      
      {/* Ici vous pouvez ajouter d'autres sections comme la liste des rapports, graphiques, etc. */}
    </div>
  );
}
