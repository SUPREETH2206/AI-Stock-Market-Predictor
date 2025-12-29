'use client';

import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface QuickAction {
  label: string;
  icon: string;
  path: string;
  color: string;
  description: string;
}

const QuickActionsPanel = () => {
  const quickActions: QuickAction[] = [
    {
      label: 'Stock Analysis',
      icon: 'ChartBarIcon',
      path: '/stock-analysis',
      color: 'from-primary to-secondary',
      description: 'Deep dive into stock metrics',
    },
    {
      label: 'Execute Trade',
      icon: 'CurrencyDollarIcon',
      path: '/trading-execution',
      color: 'from-success to-emerald-400',
      description: 'Place buy/sell orders',
    },
    {
      label: 'Portfolio',
      icon: 'BriefcaseIcon',
      path: '/portfolio-management',
      color: 'from-warning to-amber-400',
      description: 'Manage your holdings',
    },
    {
      label: 'AI Insights',
      icon: 'SparklesIcon',
      path: '/dashboard',
      color: 'from-purple-500 to-pink-500',
      description: 'Get AI recommendations',
    },
  ];

  return (
    <div className="bg-card/50 backdrop-blur-md border border-border rounded-lg p-6 hover:shadow-glow transition-smooth">
      <h3 className="font-heading font-semibold text-lg text-foreground mb-4 flex items-center gap-2">
        <Icon name="BoltIcon" size={24} className="text-primary" />
        Quick Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.path}
            href={action.path}
            className="group relative overflow-hidden rounded-lg p-4 bg-muted/30 hover:bg-muted/50 transition-smooth"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-smooth`}></div>
            <div className="relative flex items-start gap-3">
              <div className={`p-3 rounded-lg bg-gradient-to-br ${action.color} shadow-glow`}>
                <Icon
                  name={action.icon as any}
                  size={24}
                  className="text-white"
                  variant="solid"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-caption font-semibold text-foreground mb-1">
                  {action.label}
                </h4>
                <p className="text-xs text-muted-foreground">{action.description}</p>
              </div>
              <Icon
                name="ChevronRightIcon"
                size={20}
                className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-smooth"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActionsPanel;
