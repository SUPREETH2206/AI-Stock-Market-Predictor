'use client';

import { useState, useEffect } from 'react';
import AIRecommendationCard from './AIRecommendationCard';
import PortfolioPerformanceCard from './PortfolioPerformanceCard';
import MarketSentimentWidget from './MarketSentimentWidget';
import SectorHeatmap from './SectorHeatmap';
import QuickActionsPanel from './QuickActionsPanel';
import TopGainersLosers from './TopGainersLosers';

interface AIRecommendation {
  id: string;
  stockSymbol: string;
  stockName: string;
  action: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
  potentialReturn: number;
  reasoning: string;
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  timeframe: string;
}

const DashboardInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [recommendations] = useState<AIRecommendation[]>([
    {
      id: '1',
      stockSymbol: 'RELIANCE',
      stockName: 'Reliance Industries Ltd',
      action: 'BUY',
      confidence: 87,
      currentPrice: 2456.75,
      targetPrice: 2850.00,
      stopLoss: 2300.00,
      potentialReturn: 16.02,
      reasoning: 'Strong quarterly results with 23% YoY revenue growth. Technical indicators show bullish momentum with RSI at 62. Sector rotation favoring energy stocks. Institutional buying increased by 4.5% in last quarter.',
      riskLevel: 'LOW',
      timeframe: '3-6 months',
    },
    {
      id: '2',
      stockSymbol: 'TCS',
      stockName: 'Tata Consultancy Services',
      action: 'HOLD',
      confidence: 72,
      currentPrice: 3678.90,
      targetPrice: 3900.00,
      stopLoss: 3500.00,
      potentialReturn: 6.01,
      reasoning: 'Stable fundamentals with consistent dividend payouts. Current valuation at fair price. Wait for better entry point or hold existing positions. IT sector showing mixed signals.',
      riskLevel: 'MEDIUM',
      timeframe: '6-12 months',
    },
    {
      id: '3',
      stockSymbol: 'BHARTI',
      stockName: 'Bharti Airtel Limited',
      action: 'BUY',
      confidence: 91,
      currentPrice: 1234.50,
      targetPrice: 1500.00,
      stopLoss: 1150.00,
      potentialReturn: 21.51,
      reasoning: '5G rollout accelerating with strong subscriber growth. ARPU improvement of 18% QoQ. Debt reduction ahead of schedule. Market share gains in premium segment.',
      riskLevel: 'LOW',
      timeframe: '6-9 months',
    },
  ]);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="h-12 bg-muted rounded w-1/3 mb-8 animate-pulse"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-64 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 pb-8 px-4 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="font-heading text-4xl font-bold text-foreground mb-2">
            Trading Dashboard
          </h1>
          <p className="text-muted-foreground">
            AI-powered insights and real-time market analysis
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <PortfolioPerformanceCard />
          </div>
          <div>
            <MarketSentimentWidget />
          </div>
        </div>

        <div className="mb-6">
          <SectorHeatmap />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <QuickActionsPanel />
          <TopGainersLosers />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading text-2xl font-bold text-foreground">
              AI Recommendations
            </h2>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md font-caption font-semibold hover:opacity-90 transition-smooth">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((recommendation) => (
              <AIRecommendationCard
                key={recommendation.id}
                recommendation={recommendation}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardInteractive;
