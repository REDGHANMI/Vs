
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiCardProps {
  title: string;
  value: string | number;
  unit?: string;
  variation?: number;
  icon: React.ComponentType<{ className?: string }>;
  isPercentage?: boolean;
}

export default function KpiCard({ 
  title, 
  value, 
  unit = '', 
  variation, 
  icon: Icon,
  isPercentage = false 
}: KpiCardProps) {
  const formatVariation = (variation: number) => {
    const sign = variation >= 0 ? '+' : '';
    return `${sign}${variation.toFixed(1)}%`;
  };

  const getVariationColor = (variation: number) => {
    if (variation > 0) return 'text-green-600 bg-green-50';
    if (variation < 0) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const formatValue = (val: string | number) => {
    if (typeof val === 'number') {
      if (isPercentage) {
        return val.toFixed(1);
      }
      return val.toLocaleString('fr-FR');
    }
    return val;
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Icon className="w-5 h-5 text-blue-600" />
            <span className="text-sm font-medium text-gray-600">{title}</span>
          </div>
          {variation !== undefined && (
            <Badge className={`text-xs px-2 py-1 ${getVariationColor(variation)}`}>
              <div className="flex items-center space-x-1">
                {variation > 0 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : variation < 0 ? (
                  <TrendingDown className="w-3 h-3" />
                ) : null}
                <span>{formatVariation(variation)}</span>
              </div>
            </Badge>
          )}
        </div>
        
        <div className="flex items-baseline space-x-1">
          <span className="text-2xl font-bold text-gray-900">
            {formatValue(value)}
          </span>
          {unit && (
            <span className="text-sm text-gray-500 font-medium">
              {unit}
            </span>
          )}
        </div>
        
        {variation !== undefined && (
          <p className="text-xs text-gray-500 mt-1">
            vs période précédente
          </p>
        )}
      </CardContent>
    </Card>
  );
}
