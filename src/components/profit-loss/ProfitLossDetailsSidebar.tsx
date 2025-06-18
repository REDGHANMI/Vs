
import { useState } from "react";
import { X, Eye, FileText, Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface DetailItem {
  description: string;
  montant: number;
  date: string;
  reference?: string;
}

interface ProfitLossDetailsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  categoryType: "produit" | "charge";
  totalAmount: number;
  percentage: number;
  details: DetailItem[];
}

export default function ProfitLossDetailsSidebar({
  isOpen,
  onClose,
  category,
  categoryType,
  totalAmount,
  percentage,
  details
}: ProfitLossDetailsSidebarProps) {
  if (!isOpen) return null;

  const colorClass = categoryType === "produit" ? "text-green-700" : "text-red-700";
  const bgClass = categoryType === "produit" ? "bg-green-50" : "bg-red-50";
  const borderClass = categoryType === "produit" ? "border-green-200" : "border-red-200";

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl border-l">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`${bgClass} ${borderClass} border-b p-6`}>
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-bold ${colorClass}`}>Détails</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/50"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <h3 className="font-semibold text-gray-900">{category}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className={colorClass}>
                    {percentage.toFixed(1)}%
                  </Badge>
                  <span className={`font-bold ${colorClass}`}>
                    {totalAmount.toLocaleString()} DH
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                <FileText className="w-4 h-4" />
                <span>{details.length} mouvement(s) détaillé(s)</span>
              </div>

              {details.map((detail, index) => (
                <Card key={index} className="border shadow-sm">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 text-sm">
                            {detail.description}
                          </p>
                          {detail.reference && (
                            <p className="text-xs text-gray-500 mt-1">
                              Réf: {detail.reference}
                            </p>
                          )}
                        </div>
                        <span className={`font-bold text-sm ${colorClass}`}>
                          {detail.montant.toLocaleString()} DH
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{detail.date}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {details.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>Aucun détail disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total</span>
              <span className={`font-bold ${colorClass}`}>
                {totalAmount.toLocaleString()} DH
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
