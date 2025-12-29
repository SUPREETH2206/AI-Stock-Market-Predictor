import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockTicker from '@/components/common/StockTicker';
import AIAssistantChat from '@/components/common/AIAssistantChat';
import TradingExecutionInteractive from './components/TradingExecutionInteractive';

export const metadata: Metadata = {
  title: 'Trading Execution - AI Stock Predictor',
  description: 'Execute buy and sell orders with AI-powered pre-trade analysis, real-time market data, and seamless order placement for Indian stock market trading.',
};

export default function TradingExecutionPage() {
  return (
    <>
      <Header />
      <StockTicker />
      <TradingExecutionInteractive />
      <AIAssistantChat />
    </>
  );
}
