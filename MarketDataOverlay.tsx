'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MarketStat {
  label: string;
  value: string;
  change: number;
  icon: string;
}

const MarketDataOverlay = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [stats, setStats] = useState<MarketStat[]>([
    { label: 'NIFTY 50', value: '21,456.75', change: 1.23, icon: 'ChartBarIcon' },
    { label: 'SENSEX', value: '71,234.90', change: 0.87, icon: 'ArrowTrendingUpIcon' },
    { label: 'Active Traders', value: '2.4M', change: 5.6, icon: 'UsersIcon' },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return null;
  }

  return (
    <div className="fixed top-32 left-8 right-8 z-10 pointer-events-none hidden lg:block">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-card/20 backdrop-blur-md border border-border/50 rounded-xl p-4 shadow-glow"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name={stat.icon as any} size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-caption text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-data font-semibold text-foreground">{stat.value}</span>
                    <span className={`text-xs font-caption font-medium flex items-center gap-1 ${stat.change >= 0 ? 'text-success' : 'text-error'}`}>
                      <Icon name={stat.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'} size={12} variant="solid" />
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketDataOverlay;
