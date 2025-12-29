'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SectorData {
  name: string;
  change: number;
  volume: string;
  topStock: string;
}

const SectorHeatmap = () => {
  const [sectors] = useState<SectorData[]>([
    { name: 'IT', change: 2.45, volume: '1.2B', topStock: 'TCS' },
    { name: 'Banking', change: 1.87, volume: '2.8B', topStock: 'HDFC' },
    { name: 'Pharma', change: -0.65, volume: '0.8B', topStock: 'SUN' },
    { name: 'Auto', change: 3.12, volume: '1.5B', topStock: 'TATA' },
    { name: 'Energy', change: -1.23, volume: '1.1B', topStock: 'RELIANCE' },
    { name: 'FMCG', change: 0.45, volume: '0.9B', topStock: 'ITC' },
    { name: 'Metals', change: 1.56, volume: '1.3B', topStock: 'TATA STEEL' },
    { name: 'Telecom', change: -0.89, volume: '0.7B', topStock: 'BHARTI' },
  ]);

  const getHeatmapColor = (change: number) => {
    if (change > 2) return 'bg-success/80 text-success-foreground';
    if (change > 0) return 'bg-success/40 text-success-foreground';
    if (change > -1) return 'bg-warning/40 text-warning-foreground';
    return 'bg-error/60 text-error-foreground';
  };

  const getHeatmapIntensity = (change: number) => {
    const absChange = Math.abs(change);
    if (absChange > 2) return 'shadow-glow-lg';
    if (absChange > 1) return 'shadow-glow';
    return '';
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="Squares2X2Icon" size={24} className="text-primary" />
          Sector Heatmap
        </h3>
        <button
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          aria-label="Refresh heatmap"
        >
          <Icon name="ArrowPathIcon" size={20} />
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {sectors.map((sector) => (
          <div
            key={sector.name}
            className={`${getHeatmapColor(sector.change)} ${getHeatmapIntensity(
              sector.change
            )} rounded-lg p-4 cursor-pointer hover:scale-105 transition-smooth`}
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-caption font-bold text-sm">{sector.name}</h4>
              <Icon
                name={sector.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                size={16}
                variant="solid"
              />
            </div>
            <p className="font-data text-2xl font-bold mb-1">
              {sector.change >= 0 ? '+' : ''}{sector.change.toFixed(2)}%
            </p>
            <div className="flex items-center justify-between text-xs opacity-90">
              <span>{sector.topStock}</span>
              <span>{sector.volume}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-success rounded"></div>
            <span className="text-muted-foreground">Strong Gain</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-warning rounded"></div>
            <span className="text-muted-foreground">Neutral</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-error rounded"></div>
            <span className="text-muted-foreground">Loss</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectorHeatmap;
