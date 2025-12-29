'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface SectorData {
  name: string;
  value: number;
  color: string;
}

const SectorAllocationChart = () => {
  const sectorData: SectorData[] = [
    { name: 'Technology', value: 35, color: '#00D4FF' },
    { name: 'Finance', value: 25, color: '#6366F1' },
    { name: 'Healthcare', value: 15, color: '#10B981' },
    { name: 'Energy', value: 12, color: '#F59E0B' },
    { name: 'Consumer', value: 8, color: '#EC4899' },
    { name: 'Others', value: 5, color: '#94A3B8' },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-glow">
          <p className="text-sm font-caption font-semibold text-foreground mb-1">
            {payload[0].name}
          </p>
          <p className="text-sm font-data text-primary">
            {payload[0].value}% of portfolio
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-heading font-semibold text-foreground mb-6">Sector Allocation</h3>
      <div className="w-full h-80" aria-label="Sector allocation pie chart">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={36}
              iconType="circle"
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SectorAllocationChart;
