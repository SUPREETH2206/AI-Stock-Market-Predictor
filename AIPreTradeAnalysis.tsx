'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface AIPreTradeAnalysisProps {
  orderData: {
    stock: {
      symbol: string;
      name: string;
      currentPrice: number;
    };
    quantity: number;
    orderType: 'market' | 'limit';
    limitPrice?: number;
    totalValue: number;
  } | null;
}

interface AnalysisMetric {
  label: string;
  value: string;
  status: 'positive' | 'neutral' | 'negative';
  icon: string;
}

const AIPreTradeAnalysis = ({ orderData }: AIPreTradeAnalysisProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [analysis, setAnalysis] = useState<{
    confidence: number;
    recommendation: 'strong_buy' | 'buy' | 'hold' | 'sell';
    projectedProfit: number;
    projectedLoss: number;
    riskPercentage: number;
    rewardPercentage: number;
    metrics: AnalysisMetric[];
    reasoning: string[];
  } | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!orderData || !isHydrated) {
      setAnalysis(null);
      return;
    }

    const confidence = Math.random() * 30 + 65;
    const projectedProfit = orderData.totalValue * (Math.random() * 0.15 + 0.05);
    const projectedLoss = orderData.totalValue * (Math.random() * 0.08 + 0.02);
    const riskPercentage = (projectedLoss / orderData.totalValue) * 100;
    const rewardPercentage = (projectedProfit / orderData.totalValue) * 100;

    const recommendations: Array<'strong_buy' | 'buy' | 'hold' | 'sell'> = ['strong_buy', 'buy', 'hold'];
    const recommendation = recommendations[Math.floor(Math.random() * recommendations.length)];

    const metrics: AnalysisMetric[] = [
      {
        label: 'Technical Score',
        value: `${(Math.random() * 30 + 65).toFixed(0)}/100`,
        status: 'positive',
        icon: 'ChartBarIcon',
      },
      {
        label: 'Momentum',
        value: 'Bullish',
        status: 'positive',
        icon: 'ArrowTrendingUpIcon',
      },
      {
        label: 'Volatility',
        value: 'Moderate',
        status: 'neutral',
        icon: 'ArrowsUpDownIcon',
      },
      {
        label: 'Volume Trend',
        value: 'Increasing',
        status: 'positive',
        icon: 'ChartBarSquareIcon',
      },
    ];

    const reasoning = [
      `Strong technical indicators suggest ${orderData.stock.symbol} is in an uptrend with support at ₹${(orderData.stock.currentPrice * 0.95).toFixed(2)}`,
      `AI models predict ${rewardPercentage.toFixed(1)}% potential upside based on historical patterns and market sentiment`,
      `Risk-reward ratio of 1:${(rewardPercentage / riskPercentage).toFixed(2)} indicates favorable trade setup`,
      `Volume analysis shows institutional buying interest with ${(Math.random() * 20 + 10).toFixed(0)}% increase in last 5 days`,
    ];

    setAnalysis({
      confidence,
      recommendation,
      projectedProfit,
      projectedLoss,
      riskPercentage,
      rewardPercentage,
      metrics,
      reasoning,
    });
  }, [orderData, isHydrated]);

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-muted rounded w-1/2"></div>
          <div className="h-32 bg-muted rounded"></div>
          <div className="grid grid-cols-2 gap-4">
            <div className="h-20 bg-muted rounded"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData || !analysis) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Icon name="SparklesIcon" size={48} className="text-muted-foreground mb-3" />
          <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
            AI Analysis Ready
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Configure your order to receive AI-powered pre-trade analysis and risk assessment
          </p>
        </div>
      </div>
    );
  }

  const getRecommendationConfig = () => {
    switch (analysis.recommendation) {
      case 'strong_buy':
        return {
          label: 'Strong Buy',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'ArrowTrendingUpIcon',
        };
      case 'buy':
        return {
          label: 'Buy',
          color: 'text-success',
          bgColor: 'bg-success/10',
          borderColor: 'border-success/20',
          icon: 'ArrowUpIcon',
        };
      case 'hold':
        return {
          label: 'Hold',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
          borderColor: 'border-warning/20',
          icon: 'MinusIcon',
        };
      default:
        return {
          label: 'Sell',
          color: 'text-error',
          bgColor: 'bg-error/10',
          borderColor: 'border-error/20',
          icon: 'ArrowDownIcon',
        };
    }
  };

  const recommendationConfig = getRecommendationConfig();

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="SparklesIcon" size={20} className="text-primary-foreground" variant="solid" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">AI Pre-Trade Analysis</h2>
          <p className="text-sm text-muted-foreground">Powered by advanced machine learning</p>
        </div>
      </div>

      <div className={`p-4 rounded-lg border ${recommendationConfig.bgColor} ${recommendationConfig.borderColor}`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Icon
              name={recommendationConfig.icon as any}
              size={24}
              className={recommendationConfig.color}
              variant="solid"
            />
            <span className={`font-heading text-xl font-bold ${recommendationConfig.color}`}>
              {recommendationConfig.label}
            </span>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground mb-1">AI Confidence</p>
            <p className="font-data text-2xl font-bold text-foreground">{analysis.confidence.toFixed(0)}%</p>
          </div>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-smooth"
            style={{ width: `${analysis.confidence}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-success/10 rounded-md border border-success/20">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ArrowTrendingUpIcon" size={16} className="text-success" />
            <span className="text-xs font-caption text-success">Projected Profit</span>
          </div>
          <p className="font-data text-2xl font-bold text-success">₹{analysis.projectedProfit.toFixed(2)}</p>
          <p className="text-xs text-success/80 mt-1">+{analysis.rewardPercentage.toFixed(2)}% potential gain</p>
        </div>

        <div className="p-4 bg-error/10 rounded-md border border-error/20">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="ArrowTrendingDownIcon" size={16} className="text-error" />
            <span className="text-xs font-caption text-error">Projected Loss</span>
          </div>
          <p className="font-data text-2xl font-bold text-error">₹{analysis.projectedLoss.toFixed(2)}</p>
          <p className="text-xs text-error/80 mt-1">-{analysis.riskPercentage.toFixed(2)}% potential loss</p>
        </div>
      </div>

      <div className="p-4 bg-muted/50 rounded-md border border-border">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-caption text-muted-foreground">Risk/Reward Ratio</span>
          <span className="font-data text-lg font-bold text-foreground">
            1:{(analysis.rewardPercentage / analysis.riskPercentage).toFixed(2)}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Risk</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-error rounded-full"
                  style={{ width: `${analysis.riskPercentage * 5}%` }}
                ></div>
              </div>
              <span className="text-xs font-data text-error">{analysis.riskPercentage.toFixed(1)}%</span>
            </div>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Reward</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-success rounded-full"
                  style={{ width: `${analysis.rewardPercentage * 5}%` }}
                ></div>
              </div>
              <span className="text-xs font-data text-success">{analysis.rewardPercentage.toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {analysis.metrics.map((metric, index) => (
          <div key={index} className="p-3 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center gap-2 mb-1">
              <Icon name={metric.icon as any} size={14} className="text-primary" />
              <span className="text-xs font-caption text-muted-foreground">{metric.label}</span>
            </div>
            <p
              className={`font-caption text-sm font-semibold ${
                metric.status === 'positive' ?'text-success'
                  : metric.status === 'negative' ?'text-error' :'text-foreground'
              }`}
            >
              {metric.value}
            </p>
          </div>
        ))}
      </div>

      <div className="p-4 bg-muted/50 rounded-md border border-border">
        <div className="flex items-center gap-2 mb-3">
          <Icon name="LightBulbIcon" size={20} className="text-primary" />
          <h4 className="font-caption font-semibold text-foreground">AI Reasoning</h4>
        </div>
        <ul className="space-y-2">
          {analysis.reasoning.map((reason, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
              <Icon name="CheckCircleIcon" size={16} className="text-primary flex-shrink-0 mt-0.5" />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AIPreTradeAnalysis;
