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
  ChevronLeft,
  ChevronRight,
  Library,
  TrendingUp,
  Megaphone,
  Network,
  Layers,
  MessageSquare,
  Gift,
  LifeBuoy,
  Timer,
  PieChart,
} from 'lucide-react';
import { useAppSelector } from '@/store';
import { USER_ROLES } from '@/constants';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

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
  Library: <Library className="w-5 h-5" />,
  TrendingUp: <TrendingUp className="w-5 h-5" />,
  Megaphone: <Megaphone className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  MessageSquare: <MessageSquare className="w-5 h-5" />,
  Gift: <Gift className="w-5 h-5" />,
  LifeBuoy: <LifeBuoy className="w-5 h-5" />,
  Timer: <Timer className="w-5 h-5" />,
  PieChart: <PieChart className="w-5 h-5" />,
};

export default function DashboardSidebarLayout({
  isMobile,
  isCollapsed = false,
  setIsCollapsed,
}: Readonly<{
  isMobile?: boolean;
  isCollapsed?: boolean;
  setIsCollapsed?: (val: boolean) => void;
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
      className={cn(
        'bg-card border-r border-border shrink-0 flex flex-col transition-all duration-300',
        isCollapsed ? 'w-[80px]' : 'w-72',
        isMobile
          ? 'relative bg-card'
          : 'hidden lg:flex fixed inset-y-0 left-0 z-50 bg-card'
      )}
    >
      {/* Toggle Button */}
      {!isMobile && setIsCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-9 bg-card border border-border rounded-full p-1 hover:bg-secondary transition-colors z-50 text-muted-foreground hover:text-foreground"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      )}

      <div className={cn('p-6 pb-2 shrink-0', isCollapsed && 'px-3')}>
        {/* Logo */}
        <Link
          href="/platform/dashboard"
          className={cn(
            'flex items-center gap-3 mb-6 group overflow-hidden',
            isCollapsed && 'justify-center'
          )}
        >
          <div className="w-10 h-10 shrink-0 rounded-xl bg-primary flex items-center justify-center text-primary-foreground transition-all group-hover:scale-105">
            <Zap className="w-5 h-5" />
          </div>
          {!isCollapsed && (
            <div className="whitespace-nowrap animate-in fade-in zoom-in duration-300">
              <h2 className="text-lg font-black tracking-tighter text-foreground">
                E-Platform.
              </h2>
              <p className="text-[10px] font-bold uppercase text-primary tracking-widest leading-none">
                Smart Platform
              </p>
            </div>
          )}
        </Link>
      </div>

      <div
        className={cn(
          'flex-1 w-full overflow-y-auto custom-scrollbar overscroll-contain px-6 pb-6',
          isCollapsed && 'px-3'
        )}
      >
        {/* Navigation */}
        <nav className="space-y-6">
          <div>
            <div
              className={cn(
                'text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4 h-3 transition-all',
                isCollapsed ? 'text-center px-0' : 'px-3'
              )}
            >
              {isMounted &&
                (isCollapsed
                  ? '...'
                  : isAdminCategories
                    ? 'Admin Portal'
                    : 'Navigation')}
            </div>
            <div className="space-y-1">
              {!isMounted ? (
                // Skeleton loading
                Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg animate-pulse',
                      isCollapsed && 'justify-center'
                    )}
                  >
                    <div className="w-5 h-5 bg-secondary rounded-md shrink-0" />
                    {!isCollapsed && (
                      <div className="h-4 bg-secondary rounded-md w-40" />
                    )}
                  </div>
                ))
              ) : (
                <TooltipProvider delayDuration={0}>
                  {menuItems.map((item) => {
                    const isActive = pathname === item.path;
                    const linkContent = (
                      <Link
                        key={item.path + item.title}
                        href={item.path}
                        className={cn(
                          'flex items-center gap-3 py-2.5 rounded-lg transition-all group relative',
                          isCollapsed
                            ? 'px-0 justify-center w-10 h-10 mx-auto'
                            : 'px-3',
                          isActive
                            ? 'bg-primary/10 text-foreground font-semibold'
                            : 'hover:bg-secondary text-muted-foreground hover:text-foreground'
                        )}
                      >
                        {isActive && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-full" />
                        )}
                        <div
                          className={cn(
                            'shrink-0 transition-colors',
                            isActive && 'text-primary'
                          )}
                        >
                          {IconMap[item.icon] || (
                            <LayoutDashboard className="w-5 h-5" />
                          )}
                        </div>
                        {!isCollapsed && (
                          <span className="text-sm font-medium tracking-tight whitespace-nowrap animate-in fade-in duration-300">
                            {item.title}
                          </span>
                        )}
                      </Link>
                    );

                    if (isCollapsed) {
                      return (
                        <Tooltip key={item.path + 'tooltip'}>
                          <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                          <TooltipContent
                            side="right"
                            sideOffset={14}
                            className="font-semibold"
                          >
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      );
                    }

                    return linkContent;
                  })}
                </TooltipProvider>
              )}
            </div>
          </div>
        </nav>
      </div>
    </aside>
  );
}
