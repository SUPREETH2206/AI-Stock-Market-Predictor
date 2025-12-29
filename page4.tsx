import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StockTicker from '@/components/common/StockTicker';
import AIAssistantChat from '@/components/common/AIAssistantChat';
import StockAnalysisInteractive from './components/StockAnalysisInteractive';

export const metadata: Metadata = {
  title: 'Stock Analysis - AI Stock Predictor',
  description: 'Comprehensive AI-powered stock analysis with real-time insights, technical indicators, sentiment analysis, and pre-trade simulation for informed trading decisions.',
};

export default function StockAnalysisPage() {
  return (
    <>
      <Header />
      <StockTicker />
      <main className="min-h-screen bg-background pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="mb-8">
            <h1 className="font-heading text-4xl font-bold text-foreground mb-2">Stock Analysis</h1>
            <p className="font-caption text-lg text-muted-foreground">
              AI-powered insights and comprehensive analysis for smarter trading decisions
            </p>
          </div>

          <StockAnalysisInteractive />
        </div>
      </main>
      <AIAssistantChat />
    </>
  );
}
