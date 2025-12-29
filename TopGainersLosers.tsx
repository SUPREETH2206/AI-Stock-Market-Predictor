'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StockMovement {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: string;
}

const TopGainersLosers = () => {
  const [activeTab, setActiveTab] = useState<'gainers' | 'losers'>('gainers');

  const gainers: StockMovement[] = [
    { symbol: 'BHARTI', name: 'Bharti Airtel', price: 1234.50, change: 89.30, changePercent: 7.80, volume: '12.5M' },
    { symbol: 'SBIN', name: 'State Bank', price: 623.85, change: 45.20, changePercent: 7.81, volume: '45.2M' },
    { symbol: 'RELIANCE', name: 'Reliance Ind', price: 2456.75, change: 156.50, changePercent: 6.80, volume: '8.9M' },
    { symbol: 'INFY', name: 'Infosys', price: 1543.20, change: 87.75, changePercent: 6.03, volume: '15.3M' },
  ];

  const losers: StockMovement[] = [
    { symbol: 'ITC', name: 'ITC Limited', price: 456.75, change: -35.25, changePercent: -7.16, volume: '22.1M' },
    { symbol: 'ICICI', name: 'ICICI Bank', price: 987.60, change: -68.40, changePercent: -6.48, volume: '18.7M' },
    { symbol: 'TCS', name: 'TCS Limited', price: 3678.90, change: -234.30, changePercent: -5.99, volume: '6.4M' },
    { symbol: 'HDFC', name: 'HDFC Bank', price: 1687.45, change: -98.90, changePercent: -5.54, volume: '12.8M' },
  ];

  const currentData = activeTab === 'gainers' ? gainers : losers;

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="FireIcon" size={24} className="text-primary" />
          Market Movers
        </h3>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setActiveTab('gainers')}
          className={`flex-1 py-2 px-4 rounded-md font-caption font-semibold transition-smooth ${
            activeTab === 'gainers' ?'bg-success text-success-foreground shadow-glow' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Top Gainers
        </button>
        <button
          onClick={() => setActiveTab('losers')}
          className={`flex-1 py-2 px-4 rounded-md font-caption font-semibold transition-smooth ${
            activeTab === 'losers' ?'bg-error text-error-foreground shadow-glow' :'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          Top Losers
        </button>
      </div>

      <div className="space-y-3">
        {currentData.map((stock) => (
          <div
            key={stock.symbol}
            className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-smooth cursor-pointer"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-caption font-semibold text-foreground">
                  {stock.symbol}
                </h4>
                <span className="text-xs text-muted-foreground">{stock.name}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="ChartBarIcon" size={12} />
                <span>{stock.volume}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-data text-sm font-semibold text-foreground mb-1">
                ₹{stock.price.toFixed(2)}
              </p>
              <div
                className={`flex items-center gap-1 justify-end ${
                  stock.change >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                <Icon
                  name={stock.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                  size={12}
                  variant="solid"
                />
                <span className="font-data text-xs font-semibold">
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopGainersLosers;
