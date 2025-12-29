import Icon from '@/components/ui/AppIcon';

interface PortfolioMetricsCardProps {
  title: string;
  value: string;
  change: number;
  changePercent: number;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
}

const PortfolioMetricsCard = ({
  title,
  value,
  change,
  changePercent,
  icon,
  trend,
}: PortfolioMetricsCardProps) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-success';
    if (trend === 'down') return 'text-error';
    return 'text-muted-foreground';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'ArrowTrendingUpIcon';
    if (trend === 'down') return 'ArrowTrendingDownIcon';
    return 'MinusIcon';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
            <Icon name={icon as any} size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground font-caption">{title}</p>
            <h3 className="text-2xl font-heading font-bold text-foreground">{value}</h3>
          </div>
        </div>
      </div>
      <div className={`flex items-center gap-2 ${getTrendColor()}`}>
        <Icon name={getTrendIcon() as any} size={16} variant="solid" />
        <span className="font-data text-sm font-medium">
          ₹{Math.abs(change).toFixed(2)} ({Math.abs(changePercent).toFixed(2)}%)
        </span>
      </div>
    </div>
  );
};

export default PortfolioMetricsCard;
