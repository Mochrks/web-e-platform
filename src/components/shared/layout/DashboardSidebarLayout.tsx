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
  ChevronRight,
  Trophy,
  Award,
  Briefcase,
  Settings,
  LayoutDashboard,
  Fingerprint,
  BarChart3,
  Users,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';

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
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const menuItems = role === 'admin' ? adminMenu : employeeMenu;

  if (!isMounted) {
    return (
      <aside
        className={`w-72 bg-card border-r border-border shrink-0 flex flex-col h-screen shadow-sm ${isMobile ? 'relative' : 'hidden lg:flex fixed left-0 top-0 z-50'}`}
      />
    );
  }

  return (
    <aside
      className={`
      w-72 bg-card border-r border-border shrink-0 flex flex-col h-screen shadow-sm
      ${
        isMobile
          ? 'relative bg-card'
          : 'hidden lg:flex fixed left-0 top-0 z-50 backdrop-blur-xl bg-card/95'
      }
    `}
    >
      <div className="p-8">
        <Link
          href="/platform/dashboard"
          className="flex items-center gap-3 mb-10 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/20 transition-all group-hover:scale-110">
            <Zap className="w-6 h-6 fill-white" />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tighter">E-Platform.</h2>
            <p className="text-[10px] font-black uppercase text-primary tracking-widest leading-none">
              Smart Platform
            </p>
          </div>
        </Link>

        <nav className="space-y-8">
          <div>
            <div className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-4 px-2 opacity-50">
              {role === 'admin' ? 'Admin Portal' : 'Navigation'}
            </div>
            <div className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.path + item.title}
                  href={item.path}
                  className={`
                    flex items-center gap-3 p-3.5 rounded-2xl transition-all group
                    ${
                      pathname === item.path
                        ? 'bg-primary text-white shadow-lg shadow-primary/15'
                        : 'hover:bg-primary/5 text-muted-foreground hover:text-foreground'
                    }
                  `}
                >
                  <div className="shrink-0 transition-transform group-hover:scale-110">
                    {IconMap[item.icon as string] || (
                      <LayoutDashboard className="w-5 h-5" />
                    )}
                  </div>
                  <span className="font-bold text-sm tracking-tight">
                    {item.title}
                  </span>
                  {pathname === item.path && (
                    <ChevronRight className="w-4 h-4 ml-auto opacity-50" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
