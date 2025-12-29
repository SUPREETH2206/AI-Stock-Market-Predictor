import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockTicker from '@/components/common/StockTicker';
import AIAssistantChat from '@/components/common/AIAssistantChat';

import PortfolioInteractive from './components/PortfolioInteractive';

export const metadata: Metadata = {
  title: 'Portfolio Management - AI Stock Predictor',
  description: 'Comprehensive portfolio oversight with AI-powered optimization, real-time performance tracking, and advanced position management for Indian stock market traders.',
};

export default function PortfolioManagementPage() {
  return (
    <>
      <Header />
      <StockTicker />
      <PortfolioInteractive />
      <AIAssistantChat />
    </>
  );
}
