'use client';

import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface QuickActionsProps {
  stockSymbol: string;
  onAddToWatchlist: () => void;
  onSetPriceAlert: () => void;
}

const QuickActions = ({ stockSymbol, onAddToWatchlist, onSetPriceAlert }: QuickActionsProps) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-4">
      <h3 className="font-heading text-xl font-semibold text-foreground mb-4">Quick Actions</h3>

      <Link
        href="/trading-execution"
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-lg font-caption font-semibold hover:opacity-90 transition-smooth shadow-glow"
      >
        <Icon name="BoltIcon" size={24} variant="solid" />
        <span>Execute Trade</span>
      </Link>

      <button
        onClick={onAddToWatchlist}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-muted text-foreground rounded-lg font-caption font-semibold hover:bg-muted/80 transition-smooth"
      >
        <Icon name="StarIcon" size={24} />
        <span>Add to Watchlist</span>
      </button>

      <button
        onClick={onSetPriceAlert}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-muted text-foreground rounded-lg font-caption font-semibold hover:bg-muted/80 transition-smooth"
      >
        <Icon name="BellAlertIcon" size={24} />
        <span>Set Price Alert</span>
      </button>

      <Link
        href="/portfolio-management"
        className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-muted text-foreground rounded-lg font-caption font-semibold hover:bg-muted/80 transition-smooth"
      >
        <Icon name="BriefcaseIcon" size={24} />
        <span>View Portfolio</span>
      </Link>

      <div className="pt-4 border-t border-border">
        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-smooth font-caption"
        >
          <Icon name="ArrowLeftIcon" size={20} />
          <span>Back to Dashboard</span>
        </Link>
      </div>
    </div>
  );
};

export default QuickActions;
