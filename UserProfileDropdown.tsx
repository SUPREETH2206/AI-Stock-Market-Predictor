'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

interface UserProfileDropdownProps {
  userName?: string;
  userEmail?: string;
  userInitials?: string;
}

const UserProfileDropdown = ({
  userName = 'AI Trader',
  userEmail = 'trader@aistock.com',
  userInitials = 'AT',
}: UserProfileDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const menuItems = [
    { label: 'Profile Settings', icon: 'UserCircleIcon', path: '/profile' },
    { label: 'Account', icon: 'Cog6ToothIcon', path: '/account' },
    { label: 'Trading Preferences', icon: 'AdjustmentsHorizontalIcon', path: '/preferences' },
    { label: 'Help & Support', icon: 'QuestionMarkCircleIcon', path: '/support' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        aria-label="User profile menu"
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <span className="font-caption font-semibold text-sm text-primary-foreground">
            {userInitials}
          </span>
        </div>
        <Icon
          name="ChevronDownIcon"
          size={16}
          className={`transition-smooth ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-72 bg-popover border border-border rounded-lg shadow-glow-lg animate-slide-in z-[1010]">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="font-caption font-bold text-lg text-primary-foreground">
                  {userInitials}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-caption font-semibold text-foreground truncate">{userName}</p>
                <p className="font-caption text-sm text-muted-foreground truncate">{userEmail}</p>
              </div>
            </div>
          </div>

          <div className="py-2">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 px-4 py-3 text-popover-foreground hover:bg-muted transition-smooth"
              >
                <Icon name={item.icon as any} size={20} />
                <span className="font-caption font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          <div className="p-2 border-t border-border">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-error hover:bg-muted rounded-md transition-smooth"
            >
              <Icon name="ArrowRightOnRectangleIcon" size={20} />
              <span className="font-caption font-medium">Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfileDropdown;
