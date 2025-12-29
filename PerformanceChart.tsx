'use client';

import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface ChartDataPoint {
  date: string;
  value: number;
  invested: number;
}

const PerformanceChart = () => {
  const [timeRange, setTimeRange] = useState<'1D' | '1W' | '1M' | '3M' | '1Y' | 'ALL'>('1M');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const chartData: ChartDataPoint[] = [
    { date: '01 Dec', value: 500000, invested: 480000 },
    { date: '05 Dec', value: 515000, invested: 480000 },
    { date: '10 Dec', value: 498000, invested: 480000 },
    { date: '15 Dec', value: 535000, invested: 480000 },
    { date: '20 Dec', value: 528000, invested: 480000 },
    { date: '25 Dec', value: 567850, invested: 480000 },
    { date: '27 Dec', value: 567850, invested: 480000 },
  ];

  const timeRanges = ['1D', '1W', '1M', '3M', '1Y', 'ALL'] as const;

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-glow">
          <p className="text-sm text-muted-foreground mb-2">{payload[0].payload.date}</p>
          <div className="space-y-1">
            <p className="text-sm font-data text-success">
              Current: ₹{payload[0].value.toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-data text-muted-foreground">
              Invested: ₹{payload[1].value.toLocaleString('en-IN')}
            </p>
            <p className="text-sm font-data text-primary">
              Gain: ₹{(payload[0].value - payload[1].value).toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground">Portfolio Performance</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType(chartType === 'line' ? 'area' : 'line')}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Toggle chart type"
          >
            <Icon name={chartType === 'line' ? 'ChartBarIcon' : 'ChartPieIcon'} size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        {timeRanges.map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded-md font-caption font-medium transition-smooth whitespace-nowrap ${
              timeRange === range
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="w-full h-80" aria-label="Portfolio performance chart">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.1)" />
              <XAxis dataKey="date" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00D4FF"
                strokeWidth={2}
                fill="url(#colorValue)"
                name="Current Value"
              />
              <Area
                type="monotone"
                dataKey="invested"
                stroke="#94A3B8"
                strokeWidth={1}
                strokeDasharray="5 5"
                fill="transparent"
                name="Invested"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.1)" />
              <XAxis dataKey="date" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#00D4FF"
                strokeWidth={2}
                dot={{ fill: '#00D4FF', r: 4 }}
                name="Current Value"
              />
              <Line
                type="monotone"
                dataKey="invested"
                stroke="#94A3B8"
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
                name="Invested"
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;
