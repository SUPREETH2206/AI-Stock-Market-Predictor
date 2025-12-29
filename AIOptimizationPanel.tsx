import Icon from '@/components/ui/AppIcon';

interface OptimizationSuggestion {
  id: string;
  type: 'rebalance' | 'exit' | 'add' | 'hold';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  confidence: number;
}

const AIOptimizationPanel = () => {
  const suggestions: OptimizationSuggestion[] = [
    {
      id: '1',
      type: 'rebalance',
      title: 'Rebalance Technology Sector',
      description: 'Your technology allocation is 35%, consider reducing to 30% for better diversification.',
      impact: 'medium',
      confidence: 87,
    },
    {
      id: '2',
      type: 'exit',
      title: 'Consider Exiting ICICI',
      description: 'Stock showing bearish signals with -5.4% loss. AI suggests booking loss and reallocating.',
      impact: 'high',
      confidence: 92,
    },
    {
      id: '3',
      type: 'add',
      title: 'Add Healthcare Exposure',
      description: 'Healthcare sector underweight at 15%. Consider increasing to 20% for balanced portfolio.',
      impact: 'medium',
      confidence: 78,
    },
  ];

  const getTypeIcon = (type: OptimizationSuggestion['type']) => {
    switch (type) {
      case 'rebalance':
        return 'ArrowPathIcon';
      case 'exit':
        return 'ArrowRightOnRectangleIcon';
      case 'add':
        return 'PlusCircleIcon';
      case 'hold':
        return 'HandRaisedIcon';
    }
  };

  const getTypeColor = (type: OptimizationSuggestion['type']) => {
    switch (type) {
      case 'rebalance':
        return 'text-primary bg-primary/10';
      case 'exit':
        return 'text-error bg-error/10';
      case 'add':
        return 'text-success bg-success/10';
      case 'hold':
        return 'text-warning bg-warning/10';
    }
  };

  const getImpactColor = (impact: OptimizationSuggestion['impact']) => {
    switch (impact) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg flex items-center justify-center">
          <Icon name="SparklesIcon" size={20} className="text-primary" variant="solid" />
        </div>
        <div>
          <h3 className="text-xl font-heading font-semibold text-foreground">AI Optimization</h3>
          <p className="text-sm text-muted-foreground">Powered by advanced analytics</p>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-muted/50 border border-border rounded-lg p-4 hover:shadow-glow transition-smooth"
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`p-2 rounded-lg ${getTypeColor(suggestion.type)}`}>
                <Icon name={getTypeIcon(suggestion.type) as any} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="font-caption font-semibold text-foreground mb-1">
                  {suggestion.title}
                </h4>
                <p className="text-sm text-muted-foreground">{suggestion.description}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Impact:</span>
                  <span className={`text-xs font-caption font-semibold uppercase ${getImpactColor(suggestion.impact)}`}>
                    {suggestion.impact}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Confidence:</span>
                  <span className="text-xs font-data font-semibold text-primary">
                    {suggestion.confidence}%
                  </span>
                </div>
              </div>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-smooth text-sm font-caption font-medium">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIOptimizationPanel;
