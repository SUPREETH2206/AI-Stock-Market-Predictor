'use client';

import { useState, useEffect } from 'react';
import OrderForm from './OrderForm';
import LiveMarketData from './LiveMarketData';
import AIPreTradeAnalysis from './AIPreTradeAnalysis';
import OrderConfirmationModal from './OrderConfirmationModal';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

interface OrderData {
  stock: Stock;
  quantity: number;
  orderType: 'market' | 'limit';
  limitPrice?: number;
  totalValue: number;
  estimatedCost: number;
}

const TradingExecutionInteractive = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [stocks] = useState<Stock[]>([
    { symbol: 'RELIANCE', name: 'Reliance Industries Ltd', currentPrice: 2456.75, change: 23.50, changePercent: 0.97 },
    { symbol: 'TCS', name: 'Tata Consultancy Services', currentPrice: 3678.90, change: -12.30, changePercent: -0.33 },
    { symbol: 'INFY', name: 'Infosys Limited', currentPrice: 1543.20, change: 18.75, changePercent: 1.23 },
    { symbol: 'HDFC', name: 'HDFC Bank Limited', currentPrice: 1687.45, change: 8.90, changePercent: 0.53 },
    { symbol: 'ICICI', name: 'ICICI Bank Limited', currentPrice: 987.60, change: -5.40, changePercent: -0.54 },
    { symbol: 'SBIN', name: 'State Bank of India', currentPrice: 623.85, change: 15.20, changePercent: 2.50 },
    { symbol: 'BHARTI', name: 'Bharti Airtel Limited', currentPrice: 1234.50, change: 22.30, changePercent: 1.84 },
    { symbol: 'ITC', name: 'ITC Limited', currentPrice: 456.75, change: -3.25, changePercent: -0.71 },
  ]);
  const [accountBalance] = useState(150000);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [currentOrderData, setCurrentOrderData] = useState<OrderData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleOrderSubmit = (orderData: OrderData) => {
    setCurrentOrderData(orderData);
    setSelectedStock(orderData.stock);
    setIsModalOpen(true);
  };

  const handleOrderConfirm = () => {
    setIsModalOpen(false);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      setCurrentOrderData(null);
    }, 5000);
  };

  const handleOrderCancel = () => {
    setIsModalOpen(false);
  };

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-12 bg-muted rounded w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-96 bg-muted rounded"></div>
              <div className="h-96 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-background pt-28 pb-8 px-4">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Trading Execution</h1>
              <p className="text-muted-foreground">Place orders with AI-powered analysis and real-time data</p>
            </div>
            <div className="hidden md:flex items-center gap-4">
              <div className="px-4 py-2 bg-card border border-border rounded-md">
                <p className="text-xs text-muted-foreground mb-1">Available Balance</p>
                <p className="font-data text-lg font-bold text-foreground">₹{accountBalance.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {showSuccessMessage && (
            <div className="p-4 bg-success/10 border border-success/20 rounded-lg flex items-start gap-3 animate-slide-in">
              <Icon name="CheckCircleIcon" size={24} className="text-success flex-shrink-0" variant="solid" />
              <div className="flex-1">
                <p className="font-caption font-semibold text-success mb-1">Order Executed Successfully!</p>
                <p className="text-sm text-muted-foreground">
                  Your order for {currentOrderData?.quantity} shares of {currentOrderData?.stock.symbol} has been
                  placed and is being processed.
                </p>
              </div>
              <button
                onClick={() => setShowSuccessMessage(false)}
                className="p-1 text-success hover:text-success/80 transition-smooth"
              >
                <Icon name="XMarkIcon" size={20} />
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <OrderForm stocks={stocks} accountBalance={accountBalance} onOrderSubmit={handleOrderSubmit} />
            </div>

            <div className="space-y-6">
              <LiveMarketData selectedStock={selectedStock} />
            </div>
          </div>

          <AIPreTradeAnalysis orderData={currentOrderData} />
        </div>
      </div>

      <OrderConfirmationModal
        isOpen={isModalOpen}
        orderData={currentOrderData}
        onConfirm={handleOrderConfirm}
        onCancel={handleOrderCancel}
      />
    </>
  );
};

export default TradingExecutionInteractive;
