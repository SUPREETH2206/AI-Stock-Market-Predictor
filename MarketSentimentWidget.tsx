'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SentimentData {
  overall: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  score: number;
  bullishPercent: number;
  bearishPercent: number;
  neutralPercent: number;
  volume: string;
  lastUpdated: string;
}

const MarketSentimentWidget = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [sentimentData] = useState<SentimentData>({
    overall: 'BULLISH',
    score: 72,
    bullishPercent: 58,
    bearishPercent: 25,
    neutralPercent: 17,
    volume: '2.45B',
    lastUpdated: '2 mins ago',
  });

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 h-80 animate-pulse">
        <div className="h-6 bg-muted rounded w-1/2 mb-4"></div>
        <div className="h-32 bg-muted rounded mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'BULLISH':
        return 'text-success';
      case 'BEARISH':
        return 'text-error';
      case 'NEUTRAL':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-lg text-foreground flex items-center gap-2">
          <Icon name="ChartPieIcon" size={24} className="text-primary" />
          Market Sentiment
        </h3>
        <span className="text-xs text-muted-foreground">{sentimentData.lastUpdated}</span>
      </div>

      <div className="text-center mb-6">
        <div className="relative inline-block mb-3">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(sentimentData.score / 100) * 351.86} 351.86`}
              className={getSentimentColor(sentimentData.overall)}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`font-data text-2xl font-bold ${getSentimentColor(sentimentData.overall)}`}>
              {sentimentData.score}
            </span>
            <span className="text-xs text-muted-foreground">Score</span>
          </div>
        </div>
        <p className={`font-heading font-bold text-xl ${getSentimentColor(sentimentData.overall)}`}>
          {sentimentData.overall}
        </p>
      </div>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-success flex items-center gap-1">
              <Icon name="ArrowTrendingUpIcon" size={16} />
              Bullish
            </span>
            <span className="font-data text-sm font-semibold text-success">
              {sentimentData.bullishPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-success rounded-full transition-smooth"
              style={{ width: `${sentimentData.bullishPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-error flex items-center gap-1">
              <Icon name="ArrowTrendingDownIcon" size={16} />
              Bearish
            </span>
            <span className="font-data text-sm font-semibold text-error">
              {sentimentData.bearishPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-error rounded-full transition-smooth"
              style={{ width: `${sentimentData.bearishPercent}%` }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-warning flex items-center gap-1">
              <Icon name="MinusIcon" size={16} />
              Neutral
            </span>
            <span className="font-data text-sm font-semibold text-warning">
              {sentimentData.neutralPercent}%
            </span>
          </div>
          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-warning rounded-full transition-smooth"
              style={{ width: `${sentimentData.neutralPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <span className="text-sm text-muted-foreground">Trading Volume</span>
        <span className="font-data text-sm font-semibold text-foreground">
          {sentimentData.volume}
        </span>
      </div>
    </div>
  );
};

export default MarketSentimentWidget;
