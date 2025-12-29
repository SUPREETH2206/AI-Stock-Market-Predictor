import type { Metadata } from 'next';
import LoginForm from './components/LoginForm';

export const metadata: Metadata = {
  title: 'Login - AI Stock Predictor',
  description: 'Securely access your AI-powered stock trading platform with phone number authentication and advanced market analytics.',
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 text-muted-foreground/30 font-data text-sm animate-float">
          RELIANCE ₹2,456.75 ▲ 0.97%
        </div>
        <div className="absolute top-1/3 right-1/4 text-muted-foreground/30 font-data text-sm animate-float" style={{ animationDelay: '0.5s' }}>
          TCS ₹3,678.90 ▼ 0.33%
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-muted-foreground/30 font-data text-sm animate-float" style={{ animationDelay: '1s' }}>
          INFY ₹1,543.20 ▲ 1.23%
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-muted-foreground/30 font-data text-sm animate-float" style={{ animationDelay: '1.5s' }}>
          HDFC ₹1,687.45 ▲ 0.53%
        </div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <LoginForm />
      </div>
    </main>
  );
}
