'use client';

import Icon from '@/components/ui/AppIcon';

interface Indicator {
  name: string;
  value: string;
  signal: 'BUY' | 'SELL' | 'NEUTRAL';
  description: string;
}

interface TechnicalIndicatorsProps {
  stockSymbol: string;
}

const TechnicalIndicators = ({ stockSymbol }: TechnicalIndicatorsProps) => {
  const indicators: Indicator[] = [
    {
      name: 'RSI (14)',
      value: '58.32',
      signal: 'BUY',
      description: 'Relative Strength Index indicates moderate buying momentum',
    },
    {
      name: 'MACD',
      value: '12.45',
      signal: 'BUY',
      description: 'Moving Average Convergence Divergence shows bullish crossover',
    },
    {
      name: 'Moving Avg (50)',
      value: '2,423.50',
      signal: 'BUY',
      description: 'Price trading above 50-day moving average',
    },
    {
      name: 'Moving Avg (200)',
      value: '2,389.75',
      signal: 'BUY',
      description: 'Price trading above 200-day moving average',
    },
    {
      name: 'Bollinger Bands',
      value: 'Upper Band',
      signal: 'NEUTRAL',
      description: 'Price approaching upper Bollinger Band',
    },
    {
      name: 'Stochastic',
      value: '72.18',
      signal: 'NEUTRAL',
      description: 'Stochastic oscillator in overbought territory',
    },
  ];

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'text-success';
      case 'SELL':
        return 'text-error';
      case 'NEUTRAL':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const getSignalBg = (signal: string) => {
    switch (signal) {
      case 'BUY':
        return 'bg-success/10 border-success/20';
      case 'SELL':
        return 'bg-error/10 border-error/20';
      case 'NEUTRAL':
        return 'bg-warning/10 border-warning/20';
      default:
        return 'bg-muted/10 border-muted/20';
    }
  };

  const overallSignal = indicators.filter((i) => i.signal === 'BUY').length > indicators.length / 2 ? 'BUY' : 'NEUTRAL';

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground mb-1">Technical Indicators</h3>
          <p className="font-caption text-sm text-muted-foreground">Real-time technical analysis for {stockSymbol}</p>
        </div>
        <div className={`${getSignalBg(overallSignal)} border px-4 py-2 rounded-lg`}>
          <p className="font-caption text-xs text-muted-foreground mb-1">Overall Signal</p>
          <p className={`font-caption font-bold text-lg ${getSignalColor(overallSignal)}`}>{overallSignal}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {indicators.map((indicator, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon name="ChartBarIcon" size={20} className="text-primary" />
                <h4 className="font-caption font-semibold text-foreground">{indicator.name}</h4>
              </div>
              <span className={`${getSignalBg(indicator.signal)} border px-3 py-1 rounded-md font-caption text-xs font-semibold ${getSignalColor(indicator.signal)}`}>
                {indicator.signal}
              </span>
            </div>
            <p className="font-data text-xl font-semibold text-foreground">{indicator.value}</p>
            <p className="font-caption text-sm text-muted-foreground">{indicator.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
        <Icon name="InformationCircleIcon" size={20} className="text-primary flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-caption font-semibold text-foreground mb-1">Technical Analysis Summary</p>
          <p className="font-caption text-sm text-muted-foreground">
            Based on {indicators.length} technical indicators, {stockSymbol} shows {overallSignal.toLowerCase()} signals with strong momentum indicators and price trading above key moving averages.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;
