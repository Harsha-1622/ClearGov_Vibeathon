import React, { useState, useRef, useEffect } from 'react';
import { Bell, AlertTriangle, CheckCircle2, ShieldAlert, FileQuestion, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PageRoute, NotificationItem } from '../types';

export const NotificationCenter: React.FC = () => {
  const { setCurrentRoute, scenario, decisionState } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Missing Income Certificate',
      description: 'Family Income requirement cannot be established without revenue certificate.',
      time: '10m ago',
      read: false,
      type: 'warning',
      targetRoute: 'evidence',
    },
    {
      id: 'notif-2',
      title: 'Discrepancy in Case #CG-2026-7215',
      description: 'Reviewer required: Rahul Kumar date of birth differs between form and Aadhaar.',
      time: '32m ago',
      read: false,
      type: 'danger',
      targetRoute: 'reviewer',
    },
    {
      id: 'notif-3',
      title: 'Low Optical Confidence Alert',
      description: 'Priya Sharma scan exhibits 42% clarity. Reviewer intervention required.',
      time: '1h ago',
      read: false,
      type: 'warning',
      targetRoute: 'reviewer',
    },
    {
      id: 'notif-4',
      title: 'System Assessment Engine Online',
      description: 'ClearGov rule engines active with deterministic verification.',
      time: '2h ago',
      read: true,
      type: 'info',
      targetRoute: 'assessment',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNotificationClick = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    setCurrentRoute(item.targetRoute);
    setIsOpen(false);
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Bell Trigger Button */}
      <button
        id="btn-notification-bell"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer focus:outline-none"
        aria-label="Notifications"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center ring-2 ring-white">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-slate-200 shadow-xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm font-black text-slate-900">Notifications</span>
              {unreadCount > 0 && (
                <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  {unreadCount} New
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-[11px] font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 cursor-pointer"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
            {notifications.map((n) => (
              <div
                key={n.id}
                onClick={() => handleNotificationClick(n)}
                className={`p-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer ${
                  !n.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {n.type === 'danger' && <ShieldAlert className="w-4 h-4 text-rose-600" />}
                  {n.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {n.type === 'info' && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                  {n.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </div>

                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h5 className={`text-xs ${!n.read ? 'font-black text-slate-900' : 'font-semibold text-slate-700'}`}>
                      {n.title}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-mono">{n.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug">
                    {n.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-2.5 bg-slate-50 border-t border-slate-100 text-center">
            <span className="text-[11px] text-slate-500 font-medium">
              Click any notification to navigate directly to resolution
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
