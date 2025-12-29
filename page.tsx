import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockTicker from '@/components/common/StockTicker';
import AIAssistantChat from '@/components/common/AIAssistantChat';

import DashboardInteractive from './components/DashboardInteractive';

export const metadata: Metadata = {
  title: 'Dashboard - AI Stock Predictor',
  description: 'AI-powered trading dashboard with real-time market insights, portfolio performance tracking, sector analysis, and personalized stock recommendations for Indian stock market traders.',
};

export default function DashboardPage() {
  return (
    <>
      <Header />
      <StockTicker />
      <DashboardInteractive />
      <AIAssistantChat />
    </>
  );
}
