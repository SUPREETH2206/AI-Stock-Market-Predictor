'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

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

interface AIRecommendationCardProps {
  recommendation: AIRecommendation;
}

const AIRecommendationCard = ({ recommendation }: AIRecommendationCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  const getActionColor = (action: string) => {
    switch (action) {
      case 'BUY':
        return 'text-success bg-success/10 border-success/20';
      case 'SELL':
        return 'text-error bg-error/10 border-error/20';
      case 'HOLD':
        return 'text-warning bg-warning/10 border-warning/20';
      default:
        return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'LOW':
        return 'text-success';
      case 'MEDIUM':
        return 'text-warning';
      case 'HIGH':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-4 hover:shadow-glow transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {recommendation.stockSymbol}
            </h3>
            <span
              className={`px-2 py-1 rounded-md text-xs font-caption font-bold border ${getActionColor(
                recommendation.action
              )}`}
            >
              {recommendation.action}
            </span>
          </div>
          <p className="text-sm text-muted-foreground">{recommendation.stockName}</p>
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          aria-label="Toggle details"
        >
          <Icon
            name={showDetails ? 'ChevronUpIcon' : 'ChevronDownIcon'}
            size={20}
          />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
          <p className="font-data text-lg font-semibold text-foreground">
            ₹{recommendation.currentPrice.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Target Price</p>
          <p className="font-data text-lg font-semibold text-success">
            ₹{recommendation.targetPrice.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-muted-foreground">AI Confidence</span>
          <span className="font-data text-sm font-semibold text-primary">
            {recommendation.confidence}%
          </span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
            style={{ width: `${recommendation.confidence}%` }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Icon name="ClockIcon" size={16} className="text-muted-foreground" />
          <span className="text-muted-foreground">{recommendation.timeframe}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Risk:</span>
          <span className={`font-caption font-semibold ${getRiskColor(recommendation.riskLevel)}`}>
            {recommendation.riskLevel}
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-border space-y-3 animate-slide-in">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Stop Loss</p>
              <p className="font-data text-sm font-semibold text-error">
                ₹{recommendation.stopLoss.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Potential Return</p>
              <p className="font-data text-sm font-semibold text-success">
                +{recommendation.potentialReturn.toFixed(2)}%
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs text-muted-foreground mb-2 flex items-center gap-2">
              <Icon name="SparklesIcon" size={14} className="text-primary" />
              AI Reasoning
            </p>
            <p className="text-sm text-foreground leading-relaxed">
              {recommendation.reasoning}
            </p>
          </div>

          <button className="w-full py-2 px-4 bg-primary text-primary-foreground rounded-md font-caption font-semibold hover:opacity-90 transition-smooth">
            Execute Trade
          </button>
        </div>
      )}
    </div>
  );
};

export default AIRecommendationCard;
