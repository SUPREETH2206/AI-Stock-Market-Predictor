'use client';

import Icon from '@/components/ui/AppIcon';

interface AIRecommendationProps {
  recommendation: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  reasoning: string[];
  targetPrice: number;
  stopLoss: number;
  riskReward: string;
}

const AIRecommendation = ({
  recommendation,
  confidence,
  reasoning,
  targetPrice,
  stopLoss,
  riskReward,
}: AIRecommendationProps) => {
  const getRecommendationColor = () => {
    switch (recommendation) {
      case 'BUY':
        return 'text-success';
      case 'SELL':
        return 'text-error';
      case 'HOLD':
        return 'text-warning';
    }
  };

  const getRecommendationBg = () => {
    switch (recommendation) {
      case 'BUY':
        return 'bg-success/10 border-success/20';
      case 'SELL':
        return 'bg-error/10 border-error/20';
      case 'HOLD':
        return 'bg-warning/10 border-warning/20';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`absolute inset-0 ${getRecommendationBg()} rounded-lg blur-md opacity-50`}></div>
            <div className={`relative ${getRecommendationBg()} border p-3 rounded-lg`}>
              <Icon name="SparklesIcon" size={24} className={getRecommendationColor()} variant="solid" />
            </div>
          </div>
          <div>
            <p className="font-caption text-sm text-muted-foreground">AI Recommendation</p>
            <h3 className={`font-heading text-2xl font-bold ${getRecommendationColor()}`}>
              {recommendation}
            </h3>
          </div>
        </div>
        <div className="text-right">
          <p className="font-caption text-sm text-muted-foreground">Confidence Score</p>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  confidence >= 80
                    ? 'bg-success'
                    : confidence >= 60
                    ? 'bg-warning' :'bg-error'
                } transition-smooth`}
                style={{ width: `${confidence}%` }}
              ></div>
            </div>
            <span className="font-data text-lg font-semibold text-foreground">{confidence}%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="font-caption text-sm text-muted-foreground mb-1">Target Price</p>
          <p className="font-data text-xl font-semibold text-success">₹{targetPrice.toFixed(2)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="font-caption text-sm text-muted-foreground mb-1">Stop Loss</p>
          <p className="font-data text-xl font-semibold text-error">₹{stopLoss.toFixed(2)}</p>
        </div>
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="font-caption text-sm text-muted-foreground mb-1">Risk/Reward</p>
          <p className="font-data text-xl font-semibold text-primary">{riskReward}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Icon name="LightBulbIcon" size={20} className="text-primary" variant="solid" />
          <h4 className="font-caption font-semibold text-foreground">AI Reasoning</h4>
        </div>
        <div className="space-y-2">
          {reasoning.map((reason, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-md">
              <Icon name="CheckCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <p className="font-caption text-sm text-muted-foreground">{reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRecommendation;
