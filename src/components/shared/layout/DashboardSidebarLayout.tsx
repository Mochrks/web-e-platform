'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Zap,
  BookOpen,
  Video,
  Calendar,
  CheckSquare,
  StickyNote,
  Trophy,
  Award,
  Briefcase,
  Settings,
  LayoutDashboard,
  Fingerprint,
  BarChart3,
  Users,
} from 'lucide-react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';

// Helper for dynamic icons
const IconMap: Record<string, React.ReactNode> = {
  LayoutDashboard: <LayoutDashboard className="w-5 h-5" />,
  BookOpen: <BookOpen className="w-5 h-5" />,
  CheckSquare: <CheckSquare className="w-5 h-5" />,
  Clock: <Fingerprint className="w-5 h-5" />,
  Video: <Video className="w-5 h-5" />,
  Calendar: <Calendar className="w-5 h-5" />,
  FileText: <StickyNote className="w-5 h-5" />,
  Settings: <Settings className="w-5 h-5" />,
  BarChart3: <BarChart3 className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  Trophy: <Trophy className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
};

export default function DashboardSidebarLayout({
  isMobile,
}: Readonly<{
  isMobile?: boolean;
}>) {
  const pathname = usePathname();
  const { role } = useAppSelector((state) => state.auth);
  const { employeeMenu, adminMenu } = useAppSelector((state) => state.sidebar);
  const isAdminCategories =
    role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = isAdminCategories ? adminMenu : employeeMenu;

  return (
    <aside
      className={`
      w-72 bg-card border-r border-border shrink-0 flex flex-col h-screen
      ${
        isMobile
          ? 'relative bg-card'
          : 'hidden lg:flex fixed left-0 top-0 z-50 bg-card'
      }
    `}
    >
      <div className="p-6">
        {/* Logo */}
        <Link
          href="/platform/dashboard"
          className="flex items-center gap-3 mb-10 group"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground transition-all group-hover:scale-105">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter text-foreground">
              E-Platform.
            </h2>
            <p className="text-[10px] font-bold uppercase text-primary tracking-widest leading-none">
              Smart Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}
        <nav className="space-y-6">
          <div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 px-3 h-3">
              {isMounted && (isAdminCategories ? 'Admin Portal' : 'Navigation')}
            </div>
            <div className="space-y-1">
              {!isMounted
                ? // Skeleton loading
                  Array.from({ length: 10 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
                    >
                      <div className="w-5 h-5 bg-secondary rounded-md" />
                      <div className="h-4 bg-secondary rounded-md w-40" />
                    </div>
                  ))
                : menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    return (
                      <Link
                        key={item.path + item.title}
                        href={item.path}
                        className={`
                        flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group relative
                        ${
                          isActive
                            ? 'bg-primary/10 text-foreground font-semibold'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        }
                      `}
                      >
                        {/* Active indicator bar */}
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-full" />
                        )}
                        <div
                          className={`shrink-0 transition-colors ${isActive ? 'text-primary' : ''}`}
                        >
                          {IconMap[item.icon] || (
                            <LayoutDashboard className="w-5 h-5" />
                          )}
                        </div>
                        <span className="text-sm font-medium tracking-tight">
                          {item.title}
                        </span>
                      </Link>
                    );
                  })}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
