'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Stock {
  symbol: string;
  name: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

interface OrderFormProps {
  stocks: Stock[];
  accountBalance: number;
  onOrderSubmit: (orderData: OrderData) => void;
}

interface OrderData {
  stock: Stock;
  quantity: number;
  orderType: 'market' | 'limit';
  limitPrice?: number;
  totalValue: number;
  estimatedCost: number;
}

const OrderForm = ({ stocks, accountBalance, onOrderSubmit }: OrderFormProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [orderType, setOrderType] = useState<'market' | 'limit'>('market');
  const [limitPrice, setLimitPrice] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (selectedStock && orderType === 'limit' && !limitPrice) {
      setLimitPrice(selectedStock.currentPrice.toFixed(2));
    }
  }, [selectedStock, orderType, limitPrice]);

  const calculateTotalValue = () => {
    if (!selectedStock) return 0;
    const price = orderType === 'limit' && limitPrice ? parseFloat(limitPrice) : selectedStock.currentPrice;
    return price * quantity;
  };

  const calculateEstimatedCost = () => {
    const totalValue = calculateTotalValue();
    const brokerage = totalValue * 0.0003; // 0.03% brokerage
    const gst = brokerage * 0.18;
    const stt = totalValue * 0.001; // 0.1% STT
    return totalValue + brokerage + gst + stt;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!selectedStock) {
      newErrors.stock = 'Please select a stock';
    }

    if (quantity < 1) {
      newErrors.quantity = 'Quantity must be at least 1';
    }

    if (orderType === 'limit') {
      const price = parseFloat(limitPrice);
      if (!limitPrice || isNaN(price) || price <= 0) {
        newErrors.limitPrice = 'Please enter a valid limit price';
      }
    }

    const estimatedCost = calculateEstimatedCost();
    if (estimatedCost > accountBalance) {
      newErrors.balance = `Insufficient balance. Required: ₹${estimatedCost.toFixed(2)}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedStock) return;

    const orderData: OrderData = {
      stock: selectedStock,
      quantity,
      orderType,
      limitPrice: orderType === 'limit' ? parseFloat(limitPrice) : undefined,
      totalValue: calculateTotalValue(),
      estimatedCost: calculateEstimatedCost(),
    };

    onOrderSubmit(orderData);
  };

  const handleStockChange = (symbol: string) => {
    const stock = stocks.find(s => s.symbol === symbol);
    setSelectedStock(stock || null);
    setErrors({});
  };

  const handleQuantityChange = (value: string) => {
    const num = parseInt(value);
    if (!isNaN(num) && num >= 0) {
      setQuantity(num);
      setErrors(prev => ({ ...prev, quantity: '', balance: '' }));
    }
  };

  const handleLimitPriceChange = (value: string) => {
    setLimitPrice(value);
    setErrors(prev => ({ ...prev, limitPrice: '', balance: '' }));
  };

  if (!isHydrated) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-10 bg-muted rounded"></div>
          <div className="h-12 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  const totalValue = calculateTotalValue();
  const estimatedCost = calculateEstimatedCost();
  const remainingBalance = accountBalance - estimatedCost;

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b border-border">
        <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
          <Icon name="ShoppingCartIcon" size={20} className="text-primary-foreground" variant="solid" />
        </div>
        <div>
          <h2 className="font-heading text-xl font-semibold text-foreground">Place Order</h2>
          <p className="text-sm text-muted-foreground">Buy stocks with real-time execution</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="stock-select" className="block text-sm font-caption font-medium text-foreground mb-2">
            Select Stock
          </label>
          <div className="relative">
            <select
              id="stock-select"
              value={selectedStock?.symbol || ''}
              onChange={(e) => handleStockChange(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background font-caption"
            >
              <option value="">Choose a stock...</option>
              {stocks.map((stock) => (
                <option key={stock.symbol} value={stock.symbol}>
                  {stock.symbol} - {stock.name} (₹{stock.currentPrice.toFixed(2)})
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDownIcon"
              size={20}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>
          {errors.stock && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.stock}
            </p>
          )}
        </div>

        {selectedStock && (
          <div className="p-4 bg-muted/50 rounded-md border border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-caption text-muted-foreground">Current Price</span>
              <span className="font-data text-lg font-semibold text-foreground">
                ₹{selectedStock.currentPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-caption text-muted-foreground">Change</span>
              <span
                className={`font-data text-sm font-medium flex items-center gap-1 ${
                  selectedStock.change >= 0 ? 'text-success' : 'text-error'
                }`}
              >
                <Icon
                  name={selectedStock.change >= 0 ? 'ArrowUpIcon' : 'ArrowDownIcon'}
                  size={14}
                  variant="solid"
                />
                {Math.abs(selectedStock.changePercent).toFixed(2)}%
              </span>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="quantity" className="block text-sm font-caption font-medium text-foreground mb-2">
            Quantity
          </label>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleQuantityChange(String(Math.max(1, quantity - 1)))}
              className="w-10 h-10 bg-muted border border-border rounded-md flex items-center justify-center text-foreground hover:bg-muted/80 transition-smooth"
              disabled={quantity <= 1}
            >
              <Icon name="MinusIcon" size={20} />
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => handleQuantityChange(e.target.value)}
              className="flex-1 px-4 py-3 bg-input border border-border rounded-md text-foreground text-center font-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
            />
            <button
              type="button"
              onClick={() => handleQuantityChange(String(quantity + 1))}
              className="w-10 h-10 bg-muted border border-border rounded-md flex items-center justify-center text-foreground hover:bg-muted/80 transition-smooth"
            >
              <Icon name="PlusIcon" size={20} />
            </button>
          </div>
          {errors.quantity && (
            <p className="mt-1 text-sm text-error flex items-center gap-1">
              <Icon name="ExclamationCircleIcon" size={16} />
              {errors.quantity}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-caption font-medium text-foreground mb-2">
            Order Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setOrderType('market')}
              className={`px-4 py-3 rounded-md font-caption font-medium transition-smooth ${
                orderType === 'market' ?'bg-primary text-primary-foreground shadow-glow' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Market Order
            </button>
            <button
              type="button"
              onClick={() => setOrderType('limit')}
              className={`px-4 py-3 rounded-md font-caption font-medium transition-smooth ${
                orderType === 'limit' ?'bg-primary text-primary-foreground shadow-glow' :'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              Limit Order
            </button>
          </div>
        </div>

        {orderType === 'limit' && (
          <div>
            <label htmlFor="limit-price" className="block text-sm font-caption font-medium text-foreground mb-2">
              Limit Price (₹)
            </label>
            <input
              id="limit-price"
              type="number"
              step="0.01"
              min="0"
              value={limitPrice}
              onChange={(e) => handleLimitPriceChange(e.target.value)}
              className="w-full px-4 py-3 bg-input border border-border rounded-md text-foreground font-data focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
              placeholder="Enter limit price"
            />
            {errors.limitPrice && (
              <p className="mt-1 text-sm text-error flex items-center gap-1">
                <Icon name="ExclamationCircleIcon" size={16} />
                {errors.limitPrice}
              </p>
            )}
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-md border border-border space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-muted-foreground">Total Value</span>
            <span className="font-data text-foreground">₹{totalValue.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-muted-foreground">Charges & Taxes</span>
            <span className="font-data text-foreground">₹{(estimatedCost - totalValue).toFixed(2)}</span>
          </div>
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="text-sm font-caption font-semibold text-foreground">Estimated Cost</span>
            <span className="font-data text-lg font-bold text-foreground">₹{estimatedCost.toFixed(2)}</span>
          </div>
        </div>

        <div className="p-4 bg-muted/50 rounded-md border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-caption text-muted-foreground">Available Balance</span>
            <span className="font-data text-foreground">₹{accountBalance.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-caption text-muted-foreground">Remaining Balance</span>
            <span
              className={`font-data font-semibold ${
                remainingBalance >= 0 ? 'text-success' : 'text-error'
              }`}
            >
              ₹{remainingBalance.toFixed(2)}
            </span>
          </div>
        </div>

        {errors.balance && (
          <div className="p-3 bg-error/10 border border-error rounded-md flex items-start gap-2">
            <Icon name="ExclamationTriangleIcon" size={20} className="text-error flex-shrink-0 mt-0.5" />
            <p className="text-sm text-error font-caption">{errors.balance}</p>
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4 border-t border-border">
        <button
          type="button"
          className="flex-1 px-6 py-3 bg-muted text-foreground rounded-md font-caption font-medium hover:bg-muted/80 transition-smooth"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          disabled={!selectedStock || remainingBalance < 0}
          className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-md font-caption font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-glow"
        >
          Place Order
        </button>
      </div>
    </form>
  );
};

export default OrderForm;
