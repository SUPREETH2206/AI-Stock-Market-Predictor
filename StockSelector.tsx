'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

interface StockSelectorProps {
  onStockSelect: (stock: Stock) => void;
  selectedStock: Stock | null;
}

const StockSelector = ({ onStockSelect, selectedStock }: StockSelectorProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const popularStocks: Stock[] = [
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', price: 2456.75, change: 23.50, changePercent: 0.97 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', price: 3678.90, change: -12.30, changePercent: -0.33 },
    { symbol: 'INFY', name: 'Infosys Limited', price: 1543.20, change: 18.75, changePercent: 1.23 },
    { symbol: 'HDFC', name: 'HDFC Bank Limited', price: 1687.45, change: 8.90, changePercent: 0.53 },
    { symbol: 'ICICI', name: 'ICICI Bank Limited', price: 987.60, change: -5.40, changePercent: -0.54 },
    { symbol: 'SBIN', name: 'State Bank of India', price: 623.85, change: 15.20, changePercent: 2.50 },
    { symbol: 'BHARTI', name: 'Bharti Airtel Limited', price: 1234.50, change: 22.30, changePercent: 1.84 },
    { symbol: 'ITC', name: 'ITC Limited', price: 456.75, change: -3.25, changePercent: -0.71 },
  ];

  const filteredStocks = popularStocks.filter(
    (stock) =>
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStockSelect = (stock: Stock) => {
    onStockSelect(stock);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <div className="relative">
      <div className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg">
        <Icon name="MagnifyingGlassIcon" size={20} className="text-muted-foreground" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsDropdownOpen(true);
          }}
          onFocus={() => setIsDropdownOpen(true)}
          placeholder="Search stocks by symbol or name..."
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none font-caption"
        />
        {selectedStock && (
          <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-md">
            <span className="font-caption font-semibold text-primary">{selectedStock.symbol}</span>
            <button
              onClick={() => {
                onStockSelect(null as any);
                setSearchQuery('');
              }}
              className="text-primary hover:text-primary/80 transition-smooth"
            >
              <Icon name="XMarkIcon" size={16} />
            </button>
          </div>
        )}
      </div>

      {isDropdownOpen && searchQuery && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-glow-lg max-h-96 overflow-y-auto z-50 animate-slide-in">
          {filteredStocks.length > 0 ? (
            <div className="p-2">
              {filteredStocks.map((stock) => (
                <button
                  key={stock.symbol}
                  onClick={() => handleStockSelect(stock)}
                  className="w-full flex items-center justify-between p-3 rounded-md hover:bg-muted transition-smooth text-left"
                >
                  <div className="flex-1">
                    <p className="font-caption font-semibold text-foreground">{stock.symbol}</p>
                    <p className="font-caption text-sm text-muted-foreground">{stock.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-data text-foreground">₹{stock.price.toFixed(2)}</p>
                    <p
                      className={`font-data text-sm ${
                        stock.change >= 0 ? 'text-success' : 'text-error'
                      }`}
                    >
                      {stock.change >= 0 ? '+' : ''}
                      {stock.changePercent.toFixed(2)}%
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <Icon name="MagnifyingGlassIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
              <p className="font-caption text-muted-foreground">No stocks found</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default StockSelector;
