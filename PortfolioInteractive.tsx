'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';
import PortfolioMetricsCard from './PortfolioMetricsCard';
import HoldingsTableRow from './HoldingsTableRow';
import MobileHoldingCard from './MobileHoldingCard';
import PerformanceChart from './PerformanceChart';
import SectorAllocationChart from './SectorAllocationChart';
import AIOptimizationPanel from './AIOptimizationPanel';

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

const PortfolioInteractive = () => {
  const router = useRouter();
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedHoldings, setSelectedHoldings] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Holding; direction: 'asc' | 'desc' } | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const holdings: Holding[] = [
    {
      id: '1',
      stockName: 'Reliance Industries',
      symbol: 'RELIANCE',
      quantity: 50,
      avgPrice: 2433.25,
      currentPrice: 2456.75,
      investedValue: 121662.50,
      currentValue: 122837.50,
      profitLoss: 1175.00,
      profitLossPercent: 0.97,
      dayChange: 1175.00,
      dayChangePercent: 0.97,
    },
    {
      id: '2',
      stockName: 'Tata Consultancy Services',
      symbol: 'TCS',
      quantity: 30,
      avgPrice: 3691.20,
      currentPrice: 3678.90,
      investedValue: 110736.00,
      currentValue: 110367.00,
      profitLoss: -369.00,
      profitLossPercent: -0.33,
      dayChange: -369.00,
      dayChangePercent: -0.33,
    },
    {
      id: '3',
      stockName: 'Infosys Limited',
      symbol: 'INFY',
      quantity: 80,
      avgPrice: 1524.45,
      currentPrice: 1543.20,
      investedValue: 121956.00,
      currentValue: 123456.00,
      profitLoss: 1500.00,
      profitLossPercent: 1.23,
      dayChange: 1500.00,
      dayChangePercent: 1.23,
    },
    {
      id: '4',
      stockName: 'HDFC Bank',
      symbol: 'HDFC',
      quantity: 70,
      avgPrice: 1678.55,
      currentPrice: 1687.45,
      investedValue: 117498.50,
      currentValue: 118121.50,
      profitLoss: 623.00,
      profitLossPercent: 0.53,
      dayChange: 623.00,
      dayChangePercent: 0.53,
    },
    {
      id: '5',
      stockName: 'ICICI Bank',
      symbol: 'ICICI',
      quantity: 100,
      avgPrice: 993.00,
      currentPrice: 987.60,
      investedValue: 99300.00,
      currentValue: 98760.00,
      profitLoss: -540.00,
      profitLossPercent: -0.54,
      dayChange: -540.00,
      dayChangePercent: -0.54,
    },
  ];

  const totalInvested = holdings.reduce((sum, h) => sum + h.investedValue, 0);
  const totalCurrent = holdings.reduce((sum, h) => sum + h.currentValue, 0);
  const totalProfitLoss = totalCurrent - totalInvested;
  const totalProfitLossPercent = (totalProfitLoss / totalInvested) * 100;
  const dayGainLoss = holdings.reduce((sum, h) => sum + h.dayChange, 0);
  const dayGainLossPercent = (dayGainLoss / totalInvested) * 100;

  const handleSort = (key: keyof Holding) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedHoldings = [...holdings].sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSelectHolding = (id: string) => {
    setSelectedHoldings((prev) =>
      prev.includes(id) ? prev.filter((hId) => hId !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedHoldings.length === holdings.length) {
      setSelectedHoldings([]);
    } else {
      setSelectedHoldings(holdings.map((h) => h.id));
    }
  };

  const handleViewDetails = (symbol: string) => {
    router.push(`/stock-analysis?symbol=${symbol}`);
  };

  const handleTrade = (symbol: string) => {
    router.push(`/trading-execution?symbol=${symbol}`);
  };

  const handleAddPosition = () => {
    router.push('/trading-execution');
  };

  const handleExportReport = () => {
    console.log('Exporting portfolio report...');
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-28 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg"></div>
              ))}
            </div>
            <div className="h-96 bg-muted rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-28 px-4 lg:px-8 pb-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-foreground mb-2">
              Portfolio Management
            </h1>
            <p className="text-muted-foreground">Track and optimize your investment holdings</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleExportReport}
              className="flex items-center gap-2 px-4 py-3 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth font-caption font-medium"
            >
              <Icon name="ArrowDownTrayIcon" size={20} />
              <span className="hidden sm:inline">Export</span>
            </button>
            <button
              onClick={handleAddPosition}
              className="flex items-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth font-caption font-medium"
            >
              <Icon name="PlusIcon" size={20} />
              <span>Add Position</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <PortfolioMetricsCard
            title="Total Value"
            value={`₹${totalCurrent.toLocaleString('en-IN')}`}
            change={totalProfitLoss}
            changePercent={totalProfitLossPercent}
            icon="BriefcaseIcon"
            trend={totalProfitLoss >= 0 ? 'up' : 'down'}
          />
          <PortfolioMetricsCard
            title="Day's Gain/Loss"
            value={`₹${Math.abs(dayGainLoss).toLocaleString('en-IN')}`}
            change={dayGainLoss}
            changePercent={dayGainLossPercent}
            icon="ChartBarIcon"
            trend={dayGainLoss >= 0 ? 'up' : 'down'}
          />
          <PortfolioMetricsCard
            title="Total Return"
            value={`${totalProfitLossPercent >= 0 ? '+' : ''}${totalProfitLossPercent.toFixed(2)}%`}
            change={totalProfitLoss}
            changePercent={totalProfitLossPercent}
            icon="TrendingUpIcon"
            trend={totalProfitLoss >= 0 ? 'up' : 'down'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <PerformanceChart />
          </div>
          <div>
            <SectorAllocationChart />
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <h2 className="text-2xl font-heading font-semibold text-foreground">Holdings</h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-md hover:bg-muted/80 transition-smooth font-caption font-medium"
              >
                <Icon name="FunnelIcon" size={18} />
                <span>Filters</span>
              </button>
              <div className="flex items-center gap-2 bg-muted rounded-md p-1">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'table' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                  aria-label="Table view"
                >
                  <Icon name="TableCellsIcon" size={18} />
                </button>
                <button
                  onClick={() => setViewMode('cards')}
                  className={`p-2 rounded transition-smooth ${
                    viewMode === 'cards' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'
                  }`}
                  aria-label="Card view"
                >
                  <Icon name="Squares2X2Icon" size={18} />
                </button>
              </div>
            </div>
          </div>

          {viewMode === 'table' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-4 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedHoldings.length === holdings.length}
                        onChange={handleSelectAll}
                        className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary cursor-pointer"
                        aria-label="Select all holdings"
                      />
                    </th>
                    <th
                      className="px-4 py-3 text-left font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('stockName')}
                    >
                      <div className="flex items-center gap-2">
                        Stock
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-center font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('quantity')}
                    >
                      <div className="flex items-center justify-center gap-2">
                        Qty
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('avgPrice')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Avg Price
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('currentPrice')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Current Price
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('profitLoss')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        P&L
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th
                      className="px-4 py-3 text-right font-caption font-semibold text-muted-foreground cursor-pointer hover:text-foreground transition-smooth"
                      onClick={() => handleSort('dayChange')}
                    >
                      <div className="flex items-center justify-end gap-2">
                        Day Change
                        <Icon name="ChevronUpDownIcon" size={16} />
                      </div>
                    </th>
                    <th className="px-4 py-3 text-right font-caption font-semibold text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedHoldings.map((holding) => (
                    <HoldingsTableRow
                      key={holding.id}
                      holding={holding}
                      isSelected={selectedHoldings.includes(holding.id)}
                      onSelect={handleSelectHolding}
                      onViewDetails={handleViewDetails}
                      onTrade={handleTrade}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedHoldings.map((holding) => (
                <MobileHoldingCard
                  key={holding.id}
                  holding={holding}
                  isSelected={selectedHoldings.includes(holding.id)}
                  onSelect={handleSelectHolding}
                  onViewDetails={handleViewDetails}
                  onTrade={handleTrade}
                />
              ))}
            </div>
          )}
        </div>

        <AIOptimizationPanel />
      </div>
    </div>
  );
};

export default PortfolioInteractive;
