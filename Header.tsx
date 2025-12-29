'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/ui/AppIcon';

interface NavigationItem {
  label: string;
  path: string;
  icon: string;
}

const Header = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigationItems: NavigationItem[] = [
    { label: 'Dashboard', path: '/dashboard', icon: 'ChartBarIcon' },
    { label: 'Analysis', path: '/stock-analysis', icon: 'ChartPieIcon' },
    { label: 'Trade', path: '/trading-execution', icon: 'CurrencyDollarIcon' },
    { label: 'Portfolio', path: '/portfolio-management', icon: 'BriefcaseIcon' },
  ];

  const isActive = (path: string) => pathname === path;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[1000] bg-card shadow-md">
      <nav className="flex items-center justify-between h-16 px-6 lg:px-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-lg blur-md opacity-50 group-hover:opacity-75 transition-smooth"></div>
            <div className="relative bg-gradient-to-br from-primary to-secondary p-2 rounded-lg">
              <Icon name="SparklesIcon" size={24} className="text-primary-foreground" variant="solid" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl text-foreground leading-none">AI Stock</span>
            <span className="font-heading font-medium text-sm text-primary leading-none">Predictor</span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-caption font-medium transition-smooth ${
                isActive(item.path)
                  ? 'bg-primary text-primary-foreground shadow-glow'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item.icon as any} size={20} variant={isActive(item.path) ? 'solid' : 'outline'} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="Notifications"
          >
            <Icon name="BellIcon" size={24} />
          </button>
          <button
            className="flex items-center gap-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
            aria-label="User profile"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <span className="font-caption font-semibold text-sm text-primary-foreground">AI</span>
            </div>
          </button>
        </div>

        <button
          className="lg:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <Icon name={mobileMenuOpen ? 'XMarkIcon' : 'Bars3Icon'} size={24} />
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border animate-slide-in">
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md font-caption font-medium transition-smooth ${
                  isActive(item.path)
                    ? 'bg-primary text-primary-foreground shadow-glow'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item.icon as any} size={20} variant={isActive(item.path) ? 'solid' : 'outline'} />
                <span>{item.label}</span>
              </Link>
            ))}
            <div className="pt-4 border-t border-border flex items-center gap-4">
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                aria-label="Notifications"
              >
                <Icon name="BellIcon" size={20} />
                <span className="font-caption font-medium">Notifications</span>
              </button>
              <button
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                aria-label="Profile"
              >
                <Icon name="UserIcon" size={20} />
                <span className="font-caption font-medium">Profile</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
