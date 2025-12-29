'use client';

import { useEffect, useRef } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SentimentAnalysisProps {
  stockSymbol: string;
}

const SentimentAnalysis = ({ stockSymbol }: SentimentAnalysisProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const sentimentData = {
    overall: 72,
    bullish: 68,
    bearish: 32,
    sources: [
      { name: 'Social Media', sentiment: 75, icon: 'ChatBubbleLeftRightIcon' },
      { name: 'News Articles', sentiment: 68, icon: 'NewspaperIcon' },
      { name: 'Analyst Reports', sentiment: 82, icon: 'DocumentTextIcon' },
      { name: 'Market Forums', sentiment: 63, icon: 'UserGroupIcon' },
    ],
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
    }> = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        color: sentimentData.overall > 60 ? '#22C55E' : sentimentData.overall < 40 ? '#EF4444' : '#F59E0B',
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, [sentimentData.overall]);

  const getSentimentColor = (value: number) => {
    if (value >= 60) return 'text-success';
    if (value >= 40) return 'text-warning';
    return 'text-error';
  };

  const getSentimentBg = (value: number) => {
    if (value >= 60) return 'bg-success/10 border-success/20';
    if (value >= 40) return 'bg-warning/10 border-warning/20';
    return 'bg-error/10 border-error/20';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 rounded-lg blur-md"></div>
          <div className="relative bg-primary/10 border border-primary/20 p-3 rounded-lg">
            <Icon name="HeartIcon" size={24} className="text-primary" variant="solid" />
          </div>
        </div>
        <div>
          <h3 className="font-heading text-xl font-semibold text-foreground">Market Sentiment</h3>
          <p className="font-caption text-sm text-muted-foreground">Real-time sentiment analysis for {stockSymbol}</p>
        </div>
      </div>

      <div className="relative h-48 bg-muted/30 rounded-lg overflow-hidden">
        <canvas ref={canvasRef} className="w-full h-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="font-caption text-sm text-muted-foreground mb-2">Overall Sentiment</p>
            <p className={`font-data text-5xl font-bold ${getSentimentColor(sentimentData.overall)}`}>
              {sentimentData.overall}%
            </p>
            <p className={`font-caption text-sm font-semibold mt-2 ${getSentimentColor(sentimentData.overall)}`}>
              {sentimentData.overall >= 60 ? 'BULLISH' : sentimentData.overall >= 40 ? 'NEUTRAL' : 'BEARISH'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-center">
          <Icon name="ArrowTrendingUpIcon" size={24} className="text-success mx-auto mb-2" />
          <p className="font-caption text-sm text-muted-foreground mb-1">Bullish</p>
          <p className="font-data text-2xl font-bold text-success">{sentimentData.bullish}%</p>
        </div>
        <div className="bg-error/10 border border-error/20 rounded-lg p-4 text-center">
          <Icon name="ArrowTrendingDownIcon" size={24} className="text-error mx-auto mb-2" />
          <p className="font-caption text-sm text-muted-foreground mb-1">Bearish</p>
          <p className="font-data text-2xl font-bold text-error">{sentimentData.bearish}%</p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-caption font-semibold text-foreground">Sentiment by Source</h4>
        {sentimentData.sources.map((source, index) => (
          <div key={index} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Icon name={source.icon as any} size={20} className="text-primary" />
                <span className="font-caption font-medium text-foreground">{source.name}</span>
              </div>
              <span className={`font-data font-semibold ${getSentimentColor(source.sentiment)}`}>
                {source.sentiment}%
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full transition-smooth ${
                  source.sentiment >= 60 ? 'bg-success' : source.sentiment >= 40 ? 'bg-warning' : 'bg-error'
                }`}
                style={{ width: `${source.sentiment}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SentimentAnalysis;
