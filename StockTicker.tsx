'use client';

import { useEffect, useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockTicker = () => {
  const [stocks, setStocks] = useState<StockData[]>([
    { symbol: 'RELIANCE', price: 2456.75, change: 23.50, changePercent: 0.97 },
    { symbol: 'TCS', price: 3678.90, change: -12.30, changePercent: -0.33 },
    { symbol: 'INFY', price: 1543.20, change: 18.75, changePercent: 1.23 },
    { symbol: 'HDFC', price: 1687.45, change: 8.90, changePercent: 0.53 },
    { symbol: 'ICICI', price: 987.60, change: -5.40, changePercent: -0.54 },
    { symbol: 'SBIN', price: 623.85, change: 15.20, changePercent: 2.50 },
    { symbol: 'BHARTI', price: 1234.50, change: 22.30, changePercent: 1.84 },
    { symbol: 'ITC', price: 456.75, change: -3.25, changePercent: -0.71 },
  ]);

  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setStocks((prevStocks) =>
          prevStocks.map((stock) => {
            const randomChange = (Math.random() - 0.5) * 10;
            const newPrice = stock.price + randomChange;
            const newChange = newPrice - stock.price;
            const newChangePercent = (newChange / stock.price) * 100;
            
            return {
              ...stock,
              price: parseFloat(newPrice.toFixed(2)),
              change: parseFloat(newChange.toFixed(2)),
              changePercent: parseFloat(newChangePercent.toFixed(2)),
            };
          })
        );
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div className="fixed top-16 left-0 right-0 z-[900] bg-card border-b border-border overflow-hidden">
      <div className="relative h-12 flex items-center">
        <div
          className={`flex gap-8 ${!isPaused ? 'animate-scroll' : ''}`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {[...stocks, ...stocks].map((stock, index) => (
            <div
              key={`${stock.symbol}-${index}`}
              className="flex items-center gap-3 px-4 whitespace-nowrap"
            >
              <span className="font-caption font-semibold text-foreground">{stock.symbol}</span>
              <span className="font-data text-sm text-foreground">₹{stock.price.toFixed(2)}</span>
              <div
                className={`flex items-center gap-1 ${
                  stock.change >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                <Icon
                  name={stock.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                  size={14}
                  variant="solid"
                />
                <span className="font-data text-xs font-medium">
                  {Math.abs(stock.changePercent).toFixed(2)}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default StockTicker;
