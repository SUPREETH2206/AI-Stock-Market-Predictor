'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface MarketDataItem {
  label: string;
  value: string;
  change?: number;
  icon: string;
}

interface LiveMarketDataProps {
  selectedStock: {
    symbol: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
  } | null;
}

const LiveMarketData = ({ selectedStock }: LiveMarketDataProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [marketData, setMarketData] = useState<MarketDataItem[]>([]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!selectedStock || !isHydrated) return;

    const baseData: MarketDataItem[] = [
      {
        label: 'Open',
        value: `₹${(selectedStock.currentPrice - Math.random() * 10).toFixed(2)}`,
        icon: 'ClockIcon',
      },
      {
        label: 'High',
        value: `₹${(selectedStock.currentPrice + Math.random() * 20).toFixed(2)}`,
        change: 1.2,
        icon: 'ArrowTrendingUpIcon',
      },
      {
        label: 'Low',
        value: `₹${(selectedStock.currentPrice - Math.random() * 15).toFixed(2)}`,
        change: -0.8,
        icon: 'ArrowTrendingDownIcon',
      },
      {
        label: 'Volume',
        value: `${(Math.random() * 10 + 5).toFixed(2)}M`,
        icon: 'ChartBarIcon',
      },
      {
        label: 'Bid',
        value: `₹${(selectedStock.currentPrice - 0.5).toFixed(2)}`,
        icon: 'ArrowDownCircleIcon',
      },
      {
        label: 'Ask',
        value: `₹${(selectedStock.currentPrice + 0.5).toFixed(2)}`,
        icon: 'ArrowUpCircleIcon',
      },
      {
        label: 'Market Cap',
        value: `₹${(Math.random() * 500 + 1000).toFixed(0)}B`,
        icon: 'BuildingOfficeIcon',
      },
      {
        label: 'P/E Ratio',
        value: (Math.random() * 30 + 10).toFixed(2),
        icon: 'CalculatorIcon',
      },
    ];

    setMarketData(baseData);

    const interval = setInterval(() => {
      setMarketData(prev =>
        prev.map(item => ({
          ...item,
          value: item.label === 'Volume' || item.label === 'Market Cap' || item.label === 'P/E Ratio'
            ? item.value
            : `₹${(parseFloat(item.value.replace('₹', '')) + (Math.random() - 0.5) * 2).toFixed(2)}`,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, [selectedStock, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="grid grid-cols-2 gap-4">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-20 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!selectedStock) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="ChartBarIcon" size={48} className="text-muted-foreground mb-3" />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            No Stock Selected
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Select a stock from the order form to view live market data and trading information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="ChartBarIcon" size={20} className="text-primary-foreground" variant="solid" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">Live Market Data</h2>
          <p className="text-sm text-muted-foreground">Real-time stock information</p>
        </div>
      </div>

      <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-heading text-2xl font-bold text-foreground">{selectedStock.symbol}</h3>
            <p className="text-sm text-muted-foreground">{selectedStock.name}</p>
          </div>
          <div className="text-right">
            <p className="font-data text-3xl font-bold text-foreground">
              ₹{selectedStock.currentPrice.toFixed(2)}
            </p>
            <div
              className={`flex items-center justify-end gap-1 ${
                selectedStock.change >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              <Icon
                name={selectedStock.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                size={16}
                variant="solid"
              />
              <span className="font-data text-sm font-medium">
                {Math.abs(selectedStock.changePercent).toFixed(2)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {marketData.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-muted/50 rounded-md border border-border hover:bg-muted transition-smooth"
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon name={item.icon as any} size={16} className="text-primary" />
              <span className="text-xs font-caption text-muted-foreground">{item.label}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-data text-lg font-semibold text-foreground">{item.value}</span>
              {item.change !== undefined && (
                <span
                  className={`text-xs font-data font-medium ${
                    item.change >= 0 ? 'text-success' : 'text-error'
                  }`}
                >
                  {item.change >= 0 ? '+' : ''}{item.change.toFixed(2)}%
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/50 rounded-md border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="InformationCircleIcon" size={20} className="text-primary" />
          <h4 className="font-caption font-semibold text-foreground">Trading Hours</h4>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Market Status</span>
            <span className="flex items-center gap-2 text-success font-medium">
              <span className="w-2 h-2 bg-success rounded-full animate-pulse"></span>
              Open
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Trading Hours</span>
            <span className="text-foreground font-data">09:15 AM - 03:30 PM</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Updated</span>
            <span className="text-foreground font-data">Just now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMarketData;
