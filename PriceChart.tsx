'use client';

import { useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Icon from '@/components/ui/AppIcon';

interface ChartDataPoint {
  time: string;
  price: number;
  volume: number;
}

interface PriceChartProps {
  stockSymbol: string;
  currentPrice: number;
}

const PriceChart = ({ stockSymbol, currentPrice }: PriceChartProps) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | '3M' | '1Y'>('1D');
  const [chartType, setChartType] = useState<'line' | 'area'>('area');

  const generateChartData = (): ChartDataPoint[] => {
    const dataPoints = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : timeframe === '3M' ? 90 : 365;
    const data: ChartDataPoint[] = [];
    let basePrice = currentPrice * 0.95;

    for (let i = 0; i < dataPoints; i++) {
      const randomChange = (Math.random() - 0.5) * (currentPrice * 0.02);
      basePrice += randomChange;
      data.push({
        time: timeframe === '1D' ? `${i}:00` : `Day ${i + 1}`,
        price: parseFloat(basePrice.toFixed(2)),
        volume: Math.floor(Math.random() * 1000000) + 500000,
      });
    }
    return data;
  };

  const chartData = generateChartData();
  const timeframes: Array<'1D' | '1W' | '1M' | '3M' | '1Y'> = ['1D', '1W', '1M', '3M', '1Y'];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-glow">
          <p className="font-caption text-sm text-muted-foreground mb-1">{payload[0].payload.time}</p>
          <p className="font-data text-lg font-semibold text-foreground">₹{payload[0].value.toFixed(2)}</p>
          <p className="font-caption text-xs text-muted-foreground mt-1">
            Volume: {(payload[0].payload.volume / 1000).toFixed(0)}K
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-1">{stockSymbol} Price Chart</h3>
          <p className="font-caption text-sm text-muted-foreground">Real-time price movements</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setChartType('line')}
            className={`p-2 rounded-md transition-smooth ${
              chartType === 'line' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Line chart"
          >
            <Icon name="ChartBarIcon" size={20} />
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`p-2 rounded-md transition-smooth ${
              chartType === 'area' ?'bg-primary text-primary-foreground' :'bg-muted text-muted-foreground hover:text-foreground'
            }`}
            aria-label="Area chart"
          >
            <Icon name="ChartBarSquareIcon" size={20} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {timeframes.map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-2 rounded-md font-caption font-medium transition-smooth ${
              timeframe === tf
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      <div className="w-full h-80" aria-label={`${stockSymbol} price chart for ${timeframe} timeframe`}>
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'area' ? (
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00D4FF" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00D4FF" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.1)" />
              <XAxis dataKey="time" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00D4FF"
                strokeWidth={2}
                fill="url(#priceGradient)"
              />
            </AreaChart>
          ) : (
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(226, 232, 240, 0.1)" />
              <XAxis dataKey="time" stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <YAxis stroke="#94A3B8" style={{ fontSize: '12px' }} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="price" stroke="#00D4FF" strokeWidth={2} dot={false} />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceChart;
