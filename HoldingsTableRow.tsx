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

interface HoldingsTableRowProps {
  holding: Holding;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onViewDetails: (symbol: string) => void;
  onTrade: (symbol: string) => void;
}

const HoldingsTableRow = ({
  holding,
  isSelected,
  onSelect,
  onViewDetails,
  onTrade,
}: HoldingsTableRowProps) => {
  const getProfitLossColor = (value: number) => {
    if (value > 0) return 'text-success';
    if (value < 0) return 'text-error';
    return 'text-muted-foreground';
  };

  return (
    <tr className="border-b border-border hover:bg-muted/50 transition-smooth">
      <td className="px-4 py-4">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(holding.id)}
          className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background cursor-pointer"
          aria-label={`Select ${holding.stockName}`}
        />
      </td>
      <td className="px-4 py-4">
        <div className="flex flex-col">
          <span className="font-caption font-semibold text-foreground">{holding.stockName}</span>
          <span className="text-sm text-muted-foreground">{holding.symbol}</span>
        </div>
      </td>
      <td className="px-4 py-4 text-center">
        <span className="font-data text-foreground">{holding.quantity}</span>
      </td>
      <td className="px-4 py-4 text-right">
        <span className="font-data text-foreground">₹{holding.avgPrice.toFixed(2)}</span>
      </td>
      <td className="px-4 py-4 text-right">
        <span className="font-data text-foreground">₹{holding.currentPrice.toFixed(2)}</span>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="flex flex-col items-end">
          <span className={`font-data font-semibold ${getProfitLossColor(holding.profitLoss)}`}>
            ₹{Math.abs(holding.profitLoss).toFixed(2)}
          </span>
          <span className={`text-sm font-data ${getProfitLossColor(holding.profitLoss)}`}>
            ({holding.profitLoss >= 0 ? '+' : '-'}{Math.abs(holding.profitLossPercent).toFixed(2)}%)
          </span>
        </div>
      </td>
      <td className="px-4 py-4 text-right">
        <div className="flex flex-col items-end">
          <span className={`font-data ${getProfitLossColor(holding.dayChange)}`}>
            ₹{Math.abs(holding.dayChange).toFixed(2)}
          </span>
          <span className={`text-sm font-data ${getProfitLossColor(holding.dayChange)}`}>
            ({holding.dayChange >= 0 ? '+' : '-'}{Math.abs(holding.dayChangePercent).toFixed(2)}%)
          </span>
        </div>
      </td>
      <td className="px-4 py-4">
        <div className="flex items-center gap-2 justify-end">
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
      </td>
    </tr>
  );
};

export default HoldingsTableRow;
