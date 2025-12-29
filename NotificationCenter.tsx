'use client';

import { useState, useRef, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  actionLink?: string;
}

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Trade Executed',
      message: 'Your buy order for 100 shares of RELIANCE at ₹2,456.75 has been executed successfully.',
      timestamp: new Date(Date.now() - 5 * 60000),
      read: false,
      actionLink: '/trading-execution',
    },
    {
      id: '2',
      type: 'warning',
      title: 'Price Alert',
      message: 'TCS has reached your target price of ₹3,680. Consider reviewing your position.',
      timestamp: new Date(Date.now() - 15 * 60000),
      read: false,
      actionLink: '/stock-analysis',
    },
    {
      id: '3',
      type: 'info',
      title: 'AI Recommendation',
      message: 'New AI-powered insights available for your watchlist stocks.',
      timestamp: new Date(Date.now() - 30 * 60000),
      read: true,
      actionLink: '/dashboard',
    },
    {
      id: '4',
      type: 'error',
      title: 'Stop Loss Triggered',
      message: 'Your stop loss order for ICICI at ₹990 has been triggered.',
      timestamp: new Date(Date.now() - 60 * 60000),
      read: true,
      actionLink: '/portfolio-management',
    },
  ]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const unreadCount = notifications.filter((n) => !n.read).length;

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

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return { name: 'CheckCircleIcon', color: 'text-success' };
      case 'warning':
        return { name: 'ExclamationTriangleIcon', color: 'text-warning' };
      case 'error':
        return { name: 'XCircleIcon', color: 'text-error' };
      case 'info':
        return { name: 'InformationCircleIcon', color: 'text-primary' };
    }
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        aria-label="Notifications"
        aria-expanded={isOpen}
      >
        <Icon name="BellIcon" size={24} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-error text-error-foreground rounded-full flex items-center justify-center text-xs font-caption font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-popover border border-border rounded-lg shadow-glow-lg animate-slide-in z-[1020]">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h3 className="font-caption font-semibold text-foreground">Notifications</h3>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
                >
                  Mark all read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs font-caption font-medium text-error hover:text-error/80 transition-smooth"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="max-h-[500px] overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Icon name="BellSlashIcon" size={48} className="mx-auto text-muted-foreground mb-3" />
                <p className="font-caption text-muted-foreground">No notifications</p>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {notifications.map((notification) => {
                  const iconConfig = getNotificationIcon(notification.type);
                  return (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-muted transition-smooth ${
                        !notification.read ? 'bg-muted/50' : ''
                      }`}
                    >
                      <div className="flex gap-3">
                        <div className={`flex-shrink-0 ${iconConfig.color}`}>
                          <Icon name={iconConfig.name as any} size={24} variant="solid" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="font-caption font-semibold text-foreground">
                              {notification.title}
                            </h4>
                            <button
                              onClick={() => deleteNotification(notification.id)}
                              className="flex-shrink-0 p-1 text-muted-foreground hover:text-foreground transition-smooth"
                              aria-label="Delete notification"
                            >
                              <Icon name="XMarkIcon" size={16} />
                            </button>
                          </div>
                          <p className="font-caption text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {formatTimestamp(notification.timestamp)}
                            </span>
                            <div className="flex items-center gap-2">
                              {!notification.read && (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="text-xs font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
                                >
                                  Mark read
                                </button>
                              )}
                              {notification.actionLink && (
                                <a
                                  href={notification.actionLink}
                                  onClick={() => setIsOpen(false)}
                                  className="text-xs font-caption font-medium text-primary hover:text-primary/80 transition-smooth"
                                >
                                  View
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 640px) {
          .absolute.right-0.w-96 {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100vh;
            margin: 0;
            border-radius: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default NotificationCenter;
