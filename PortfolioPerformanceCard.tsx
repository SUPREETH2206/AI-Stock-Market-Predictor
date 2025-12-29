'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PortfolioData {
  totalValue: number;
  todayChange: number;
  todayChangePercent: number;
  totalInvested: number;
  totalReturns: number;
  totalReturnsPercent: number;
}

const PortfolioPerformanceCard = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [portfolioData] = useState<PortfolioData>({
    totalValue: 1245678.50,
    todayChange: 12345.75,
    todayChangePercent: 1.02,
    totalInvested: 1000000,
    totalReturns: 245678.50,
    totalReturnsPercent: 24.57,
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 h-64 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
        <div className="h-10 bg-muted rounded w-2/3 mb-6"></div>
        <div className="space-y-3">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="BriefcaseIcon" size={24} className="text-primary" />
          Portfolio Performance
        </h3>
        <button
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          aria-label="Refresh portfolio"
        >
          <Icon name="ArrowPathIcon" size={20} />
        </button>
      </div>

      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-1">Total Portfolio Value</p>
        <p className="font-data text-3xl font-bold text-foreground mb-2">
          ₹{portfolioData.totalValue.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-1 ${
              portfolioData.todayChange >= 0 ? 'text-success' : 'text-error'
            }`}
          >
            <Icon
              name={portfolioData.todayChange >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
              size={16}
              variant="solid"
            />
            <span className="font-data text-sm font-semibold">
              ₹{Math.abs(portfolioData.todayChange).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="font-data text-sm font-semibold">
              ({portfolioData.todayChangePercent >= 0 ? '+' : ''}{portfolioData.todayChangePercent.toFixed(2)}%)
            </span>
          </div>
          <span className="text-xs text-muted-foreground">Today</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted/30 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total Invested</p>
          <p className="font-data text-lg font-semibold text-foreground">
            ₹{portfolioData.totalInvested.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="bg-success/10 rounded-lg p-3">
          <p className="text-xs text-muted-foreground mb-1">Total Returns</p>
          <p className="font-data text-lg font-semibold text-success">
            +₹{portfolioData.totalReturns.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="font-data text-xs text-success">
            +{portfolioData.totalReturnsPercent.toFixed(2)}%
          </p>
        </div>
      </div>

      <button className="w-full py-3 px-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-md font-caption font-semibold hover:opacity-90 transition-smooth flex items-center justify-center gap-2">
        <Icon name="ChartBarIcon" size={20} variant="solid" />
        View Detailed Analysis
      </button>
    </div>
  );
};

export default PortfolioPerformanceCard;
