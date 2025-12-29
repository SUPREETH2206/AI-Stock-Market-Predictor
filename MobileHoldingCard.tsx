import Icon from '@/components/ui/AppIcon';

interface Holding {
  id: string;
  stockName: string;
  symbol: string;
  quantity: number;
  avgPrice: number;
  currentPrice: number;
  investedValue: number;
  currentValue: number;
  profitLoss: number;
  profitLossPercent: number;
  dayChange: number;
  dayChangePercent: number;
}

interface MobileHoldingCardProps {
  holding: Holding;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (symbol: string) => void;
  onTrade: (symbol: string) => void;
}

const MobileHoldingCard = ({
  holding,
  isSelected,
  onSelect,
  onViewDetails,
  onTrade,
}: MobileHoldingCardProps) => {
  const getProfitLossColor = (value: number) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(holding.id)}
            className="mt-1 w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
            aria-label={`Select ${holding.stockName}`}
          />
          <div className="flex-1">
            <h4 className="font-caption font-semibold text-foreground">{holding.stockName}</h4>
            <p className="text-sm text-muted-foreground">{holding.symbol}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewDetails(holding.symbol)}
            className="p-2 rounded-md text-primary hover:bg-primary/10 transition-smooth"
            aria-label={`View details for ${holding.stockName}`}
          >
            <Icon name="ChartBarIcon" size={18} />
          </button>
          <button
            onClick={() => onTrade(holding.symbol)}
            className="p-2 rounded-md text-secondary hover:bg-secondary/10 transition-smooth"
            aria-label={`Trade ${holding.stockName}`}
          >
            <Icon name="ArrowsRightLeftIcon" size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">Quantity</p>
          <p className="font-data text-foreground">{holding.quantity}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Avg Price</p>
          <p className="font-data text-foreground">₹{holding.avgPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
          <p className="font-data text-foreground">₹{holding.currentPrice.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground mb-1">Day Change</p>
          <p className={`font-data ${getProfitLossColor(holding.dayChange)}`}>
            ₹{Math.abs(holding.dayChange).toFixed(2)} ({holding.dayChange >= 0 ? '+' : '-'}{Math.abs(holding.dayChangePercent).toFixed(2)}%)
          </p>
        </div>
      </div>

      <div className="pt-3 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Total P&L</span>
          <div className="text-right">
            <p className={`font-data font-semibold ${getProfitLossColor(holding.profitLoss)}`}>
              ₹{Math.abs(holding.profitLoss).toFixed(2)}
            </p>
            <p className={`text-sm font-data ${getProfitLossColor(holding.profitLoss)}`}>
              ({holding.profitLoss >= 0 ? '+' : '-'}{Math.abs(holding.profitLossPercent).toFixed(2)}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileHoldingCard;
