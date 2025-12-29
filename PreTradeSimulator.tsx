'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface PreTradeSimulatorProps {
  stockSymbol: string;
  currentPrice: number;
  targetPrice: number;
  stopLoss: number;
}

const PreTradeSimulator = ({ stockSymbol, currentPrice, targetPrice, stopLoss }: PreTradeSimulatorProps) => {
  const [quantity, setQuantity] = useState(10);
  const [investmentAmount, setInvestmentAmount] = useState(currentPrice * 10);

  const handleQuantityChange = (value: number) => {
    const newQuantity = Math.max(1, value);
    setQuantity(newQuantity);
    setInvestmentAmount(currentPrice * newQuantity);
  };

  const handleInvestmentChange = (value: number) => {
    const newInvestment = Math.max(currentPrice, value);
    setInvestmentAmount(newInvestment);
    setQuantity(Math.floor(newInvestment / currentPrice));
  };

  const potentialProfit = (targetPrice - currentPrice) * quantity;
  const potentialLoss = (currentPrice - stopLoss) * quantity;
  const profitPercent = ((targetPrice - currentPrice) / currentPrice) * 100;
  const lossPercent = ((currentPrice - stopLoss) / currentPrice) * 100;
  const riskRewardRatio = Math.abs(potentialProfit / potentialLoss);

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md"></div>
          <div className="relative bg-primary/10 border border-primary/20 p-3 rounded-lg">
            <Icon name="CalculatorIcon" size={24} className="text-primary" />
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">Pre-Trade Simulator</h3>
          <p className="font-caption text-sm text-muted-foreground">Model your profit/loss scenarios</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="font-caption text-sm text-muted-foreground mb-2 block">Quantity (Shares)</label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-foreground hover:bg-muted/80 transition-smooth"
              >
                <Icon name="MinusIcon" size={20} />
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                className="flex-1 px-4 py-3 bg-input border border-border rounded-md text-foreground font-data text-center focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-foreground hover:bg-muted/80 transition-smooth"
              >
                <Icon name="PlusIcon" size={20} />
              </button>
            </div>
          </div>

          <div>
            <label className="font-caption text-sm text-muted-foreground mb-2 block">Investment Amount (₹)</label>
            <input
              type="number"
              value={investmentAmount.toFixed(2)}
              onChange={(e) => handleInvestmentChange(parseFloat(e.target.value) || currentPrice)}
              className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground font-data focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          <div className="bg-muted/30 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-caption text-sm text-muted-foreground">Current Price</span>
              <span className="font-data text-foreground">₹{currentPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-caption text-sm text-muted-foreground">Total Investment</span>
              <span className="font-data font-semibold text-foreground">₹{investmentAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="ArrowTrendingUpIcon" size={20} className="text-success" />
              <h4 className="font-caption font-semibold text-success">Profit Scenario</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Target Price</span>
                <span className="font-data text-success">₹{targetPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Potential Profit</span>
                <span className="font-data font-semibold text-success">₹{potentialProfit.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Return %</span>
                <span className="font-data font-semibold text-success">+{profitPercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <Icon name="ArrowTrendingDownIcon" size={20} className="text-error" />
              <h4 className="font-caption font-semibold text-error">Loss Scenario</h4>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Stop Loss</span>
                <span className="font-data text-error">₹{stopLoss.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Potential Loss</span>
                <span className="font-data font-semibold text-error">₹{potentialLoss.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-caption text-sm text-muted-foreground">Loss %</span>
                <span className="font-data font-semibold text-error">-{lossPercent.toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-caption text-sm text-muted-foreground">Risk/Reward Ratio</span>
              <span className="font-data text-xl font-semibold text-primary">1:{riskRewardRatio.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreTradeSimulator;
