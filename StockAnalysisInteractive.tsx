'use client';

import { useState } from 'react';
import StockSelector from './StockSelector';
import AIRecommendation from './AIRecommendation';
import PriceChart from './PriceChart';
import TechnicalIndicators from './TechnicalIndicators';
import PreTradeSimulator from './PreTradeSimulator';
import SentimentAnalysis from './SentimentAnalysis';
import QuickActions from './QuickActions';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

const StockAnalysisInteractive = () => {
  const [selectedStock, setSelectedStock] = useState<Stock>({
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    price: 2456.75,
    change: 23.50,
    changePercent: 0.97,
  });

  const aiRecommendationData = {
    recommendation: 'BUY' as const,
    confidence: 82,
    reasoning: [
      'Strong upward momentum with RSI at 58.32 indicating healthy buying pressure without overbought conditions',
      'MACD showing bullish crossover with positive divergence suggesting continued upward movement',
      'Price trading above both 50-day and 200-day moving averages confirming strong trend',
      'Volume analysis shows institutional accumulation with above-average trading activity',
      'Technical support established at ₹2,400 level with resistance at ₹2,550',
    ],
    targetPrice: 2650.00,
    stopLoss: 2380.00,
    riskReward: '1:3.5',
  };

  const handleAddToWatchlist = () => {
    alert(`${selectedStock.symbol} added to your watchlist!`);
  };

  const handleSetPriceAlert = () => {
    alert(`Price alert set for ${selectedStock.symbol}!`);
  };

  return (
    <div className="space-y-6">
      <StockSelector onStockSelect={setSelectedStock} selectedStock={selectedStock} />

      {selectedStock && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <AIRecommendation {...aiRecommendationData} />
              <PriceChart stockSymbol={selectedStock.symbol} currentPrice={selectedStock.price} />
              <TechnicalIndicators stockSymbol={selectedStock.symbol} />
              <PreTradeSimulator
                stockSymbol={selectedStock.symbol}
                currentPrice={selectedStock.price}
                targetPrice={aiRecommendationData.targetPrice}
                stopLoss={aiRecommendationData.stopLoss}
              />
            </div>

            <div className="space-y-6">
              <QuickActions
                stockSymbol={selectedStock.symbol}
                onAddToWatchlist={handleAddToWatchlist}
                onSetPriceAlert={handleSetPriceAlert}
              />
              <SentimentAnalysis stockSymbol={selectedStock.symbol} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StockAnalysisInteractive;
