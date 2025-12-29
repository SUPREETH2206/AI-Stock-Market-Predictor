import type { Metadata } from 'next';
import RegistrationForm from './components/RegistrationForm';
import BackgroundVisuals from './components/BackgroundVisuals';
import MarketDataOverlay from './components/MarketDataOverlay';

export const metadata: Metadata = {
  title: 'Register - AI Stock Predictor',
  description: 'Create your AI Stock Predictor account to access AI-powered stock market analysis, real-time trading signals, and advanced portfolio management tools.',
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen relative">
      <BackgroundVisuals />
      <MarketDataOverlay />
      
      <div className="relative z-20 min-h-screen flex items-center justify-center px-4 py-12">
        <RegistrationForm />
      </div>
    </main>
  );
}
