
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useParameters } from "@/contexts/ParametersContext";

interface DailyData {
  ca: number;
  stations: Set<string>;
}

export default function TrendsCard() {
  const { mouvements, stations } = useParameters();

  // Group movements by date and calculate daily CA
  const entreeMovements = mouvements.filter(m => m.type === "entree");
  const dailyCA = entreeMovements.reduce((acc, mouvement) => {
    const date = mouvement.date_mouvement;
    if (!acc[date]) {
      acc[date] = {
        ca: 0,
        stations: new Set()
      } as DailyData;
    }
    acc[date].ca += mouvement.montant;
    acc[date].stations.add(mouvement.station_id);
    return acc;
  }, {} as Record<string, DailyData>);

  // Convert to chart data format and sort by date
  const data = Object.entries(dailyCA)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-7) // Last 7 days
    .map(([date, dailyData]) => ({
      name: new Date(date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }),
      ca: Math.round(dailyData.ca / 1000), // Convert to thousands
      stations: dailyData.stations.size
    }));

  // Calculate trend percentage
  const trend = data.length > 1 ? 
    ((data[data.length - 1].ca - data[0].ca) / data[0].ca) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-medium text-gray-500">Tendance CA (7 jours)</div>
        <div className="flex items-center space-x-2">
          <span className={`text-xs px-2 py-0.5 rounded ${
            trend >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {trend >= 0 ? '📈' : '📉'} {Math.abs(trend).toFixed(1)}%
          </span>
          <span className="bg-gray-50 px-2 py-0.5 rounded text-gray-500 text-xs">
            {data.length} jours
          </span>
        </div>
      </div>
      {data.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={80}>
            <LineChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ 
                  background: "#fff", 
                  borderRadius: 8, 
                  border: "1px solid #eee", 
                  fontSize: 12,
                  padding: "8px"
                }}
                formatter={(value: any, name: string) => {
                  if (name === "ca") return [`${value}K MAD`, "CA"];
                  return [value, name];
                }}
              />
              <Line 
                type="monotone" 
                dataKey="ca" 
                stroke="#FF4A4A" 
                strokeWidth={3} 
                dot={{ fill: "#FF4A4A", strokeWidth: 0, r: 4 }} 
                activeDot={{ r: 6, stroke: "#FF4A4A", strokeWidth: 2, fill: "#fff" }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div className="text-center">
              <p className="text-gray-400">CA Moyen</p>
              <p className="font-semibold text-gray-800">
                {Math.round(data.reduce((sum, d) => sum + d.ca, 0) / data.length)}K MAD
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400">Stations</p>
              <p className="font-semibold text-gray-800">
                {Math.max(...data.map(d => d.stations))}
              </p>
            </div>
          </div>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
          Pas de données disponibles
        </div>
      )}
    </div>
  );
}
