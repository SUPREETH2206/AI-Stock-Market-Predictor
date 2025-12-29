'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  orderData: {
    stock: {
      symbol: string;
      name: string;
      currentPrice: number;
    };
    quantity: number;
    orderType: 'market' | 'limit';
    limitPrice?: number;
    totalValue: number;
    estimatedCost: number;
  } | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const OrderConfirmationModal = ({ isOpen, orderData, onConfirm, onCancel }: OrderConfirmationModalProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleConfirm = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setIsProcessing(true);
      setTimeout(() => {
        onConfirm();
        setIsProcessing(false);
      }, 2000);
    }
  };

  if (!isOpen || !orderData || !isHydrated) return null;

  const charges = orderData.estimatedCost - orderData.totalValue;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 animate-fade-in">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={!isProcessing ? onCancel : undefined}
      ></div>

      <div className="relative w-full max-w-lg bg-card border border-border rounded-lg shadow-glow-lg animate-slide-up">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Icon name="ShieldCheckIcon" size={20} className="text-primary-foreground" variant="solid" />
            </div>
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground">
                {step === 1 ? 'Confirm Order' : 'Final Verification'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? 'Review your order details' : 'Confirm to execute trade'}
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onCancel}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              aria-label="Close modal"
            >
              <Icon name="XMarkIcon" size={20} />
            </button>
          )}
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h4 className="font-heading text-lg font-bold text-foreground">{orderData.stock.symbol}</h4>
                <p className="text-sm text-muted-foreground">{orderData.stock.name}</p>
              </div>
              <div className="text-right">
                <p className="font-data text-2xl font-bold text-foreground">
                  ₹{orderData.stock.currentPrice.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground">Current Price</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-caption text-muted-foreground">Order Type</span>
              <span className="font-caption font-semibold text-foreground capitalize">
                {orderData.orderType} Order
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-caption text-muted-foreground">Quantity</span>
              <span className="font-data font-semibold text-foreground">{orderData.quantity} shares</span>
            </div>

            {orderData.orderType === 'limit' && orderData.limitPrice && (
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <span className="text-sm font-caption text-muted-foreground">Limit Price</span>
                <span className="font-data font-semibold text-foreground">₹{orderData.limitPrice.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-caption text-muted-foreground">Total Value</span>
              <span className="font-data font-semibold text-foreground">₹{orderData.totalValue.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
              <span className="text-sm font-caption text-muted-foreground">Charges & Taxes</span>
              <span className="font-data font-semibold text-foreground">₹{charges.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-primary/10 rounded-md border border-primary/20">
              <span className="text-sm font-caption font-semibold text-foreground">Total Amount</span>
              <span className="font-data text-xl font-bold text-primary">
                ₹{orderData.estimatedCost.toFixed(2)}
              </span>
            </div>
          </div>

          {step === 2 && (
            <div className="p-4 bg-warning/10 border border-warning/20 rounded-md">
              <div className="flex items-start gap-3">
                <Icon name="ExclamationTriangleIcon" size={20} className="text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-caption font-semibold text-warning mb-1">Final Confirmation Required</p>
                  <p className="text-sm text-muted-foreground">
                    This action will execute a real-money trade. Please ensure all details are correct before
                    proceeding.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isProcessing && (
            <div className="p-4 bg-muted/50 rounded-md border border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <div>
                  <p className="font-caption font-semibold text-foreground">Processing Order...</p>
                  <p className="text-sm text-muted-foreground">Please wait while we execute your trade</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 p-6 border-t border-border">
          <button
            onClick={onCancel}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-muted text-foreground rounded-md font-caption font-medium hover:bg-muted/80 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            disabled={isProcessing}
            className="flex-1 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-md font-caption font-semibold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth shadow-glow flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Icon name="CheckCircleIcon" size={20} variant="solid" />
                {step === 1 ? 'Proceed' : 'Confirm Trade'}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
