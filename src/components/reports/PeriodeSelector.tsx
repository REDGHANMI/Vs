
import React from 'react';
import { Calendar, TrendingUp, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export type PeriodeType = 'mois' | 'trimestre' | 'annee';

interface PeriodeSelectorProps {
  selectedPeriode: PeriodeType;
  onPeriodeChange: (periode: PeriodeType) => void;
}

export default function PeriodeSelector({ selectedPeriode, onPeriodeChange }: PeriodeSelectorProps) {
  const periodes = [
    { key: 'mois' as PeriodeType, label: 'Ce mois', icon: Calendar },
    { key: 'trimestre' as PeriodeType, label: 'Trimestre', icon: TrendingUp },
    { key: 'annee' as PeriodeType, label: 'Année', icon: BarChart3 }
  ];

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-600 mr-2">Période :</span>
      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {periodes.map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            onClick={() => onPeriodeChange(key)}
            variant={selectedPeriode === key ? "default" : "ghost"}
            size="sm"
            className={`flex items-center space-x-2 px-3 py-1.5 transition-all ${
              selectedPeriode === key 
                ? 'bg-white shadow-sm text-blue-600 hover:bg-white' 
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span>{label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}
