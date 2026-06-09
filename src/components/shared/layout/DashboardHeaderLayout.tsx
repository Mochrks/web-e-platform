'use client';

import React from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  Command,
  ChevronDown,
  Settings,
  Menu,
  LogOut,
  Sparkles,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import DashboardSidebarLayout from './DashboardSidebarLayout';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';
import TalentAvatar from '@/components/shared/avatar';
import { cn } from '@/lib/utils';

import { useAppDispatch, useAppSelector } from '@/store';
import { openChat } from '@/store/slices/chatSlice';
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hooks/api/useAuth';
import { toast } from 'sonner';
import { USER_ROLES } from '@/constants';

export default function DashboardHeaderLayout() {
  const [isMounted, setIsMounted] = React.useState(false);
  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);
  const isAdminCategories =
    role === USER_ROLES.ADMIN || role === USER_ROLES.SUPER_ADMIN;

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const { mutate: logoutMutation } = useLogout();

  const handleLogout = () => {
    logoutMutation();
  };

  const handleOpenChat = () => {
    dispatch(openChat());
    toast.info('Chat assistant opened');
  };

  const dummyNotifications = [
    {
      id: 1,
      title: 'New Message from Sarah',
      desc: 'Can we review the React module?',
      time: '5m ago',
      unread: true,
    },
    {
      id: 2,
      title: 'Simulation Completed',
      desc: 'You scored 92% on System Design.',
      time: '1h ago',
      unread: true,
    },
    {
      id: 3,
      title: 'Upcoming Meeting',
      desc: 'Daily Standup starts in 15 mins.',
      time: '2h ago',
      unread: false,
    },
  ];

  return (
    <header className="h-20 border-b border-border bg-card/80 backdrop-blur-xl sticky top-0 z-40 px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        {/* Mobile Menu Trigger */}
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="p-2.5 hover:bg-secondary rounded-xl transition-all"
                aria-label="Open Menu"
              >
                <Menu className="w-5 h-5 text-foreground" />
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 border-none w-72">
              <DashboardSidebarLayout isMobile />
            </SheetContent>
          </Sheet>
        </div>

        {/* Search Bar — Wise Sage Style */}
        <div className="hidden md:flex items-center gap-3 bg-secondary border border-transparent px-4 py-2.5 rounded-xl w-80 group focus-within:bg-background focus-within:border-border transition-all">
          <Search className="w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search simulations, tasks..."
            className="bg-transparent border-none text-sm focus:outline-none w-full placeholder:text-muted-foreground/60"
            aria-label="Search"
          />
          <div className="flex items-center gap-1 bg-background px-2 py-0.5 rounded-md border border-border">
            <Command className="w-3 h-3 text-muted-foreground" />
            <span className="text-[10px] font-semibold text-muted-foreground">
              K
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Quick AI Action */}
        <button
          type="button"
          onClick={handleOpenChat}
          className="hidden lg:flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-3xl font-semibold text-sm hover:brightness-110 transition-all active:scale-[0.98] group"
        >
          <Sparkles className="w-4 h-4 group-hover:animate-spin" />
          Ask E-Platform
        </button>

        <div className="flex items-center gap-2 pr-4 border-r border-border">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="p-2.5 hover:bg-secondary rounded-xl transition-all relative group outline-none"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 p-2 rounded-2xl mt-2 border-border shadow-lg"
            >
              <DropdownMenuLabel className="px-3 py-2 flex items-center justify-between">
                <span className="text-sm font-semibold tracking-tight">
                  Notifications
                </span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  2 New
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {dummyNotifications.map((notif) => (
                  <DropdownMenuItem
                    key={notif.id}
                    className="p-3 rounded-xl cursor-pointer items-start gap-3 mb-1 focus:bg-secondary"
                  >
                    <div
                      className={cn(
                        'w-2 h-2 rounded-full mt-1.5 shrink-0',
                        notif.unread ? 'bg-primary' : 'bg-transparent'
                      )}
                    />
                    <div className="flex flex-col gap-1">
                      <span
                        className={cn(
                          'text-sm tracking-tight',
                          notif.unread
                            ? 'font-bold text-foreground'
                            : 'font-medium text-muted-foreground'
                        )}
                      >
                        {notif.title}
                      </span>
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {notif.desc}
                      </span>
                      <span className="text-[10px] font-semibold text-muted-foreground/60">
                        {notif.time}
                      </span>
                    </div>
                  </DropdownMenuItem>
                ))}
              </div>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem className="p-2 justify-center rounded-xl cursor-pointer text-xs font-semibold text-primary focus:bg-primary/10">
                View All Notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 p-1.5 hover:bg-secondary rounded-xl transition-all group outline-none">
              <div className="w-9 h-9 rounded-xl bg-secondary flex items-center justify-center overflow-hidden">
                <TalentAvatar size={36} />
              </div>
              <div className="hidden sm:block text-left w-24">
                {!isMounted ? (
                  <div className="space-y-1.5 mt-1">
                    <div className="h-3 bg-secondary rounded-md w-20 animate-pulse" />
                    <div className="h-2.5 bg-secondary rounded-md w-16 animate-pulse" />
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-semibold tracking-tight leading-none mb-0.5 truncate text-foreground">
                      {user?.fullName || user?.username || 'Guest User'}
                    </p>
                    <p className="text-[10px] text-primary font-semibold leading-none">
                      {isAdminCategories ? 'Administrator' : 'Employee Portal'}
                    </p>
                  </>
                )}
              </div>
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-all group-data-[state=open]:rotate-180" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-60 p-2 rounded-xl mt-2 border-border shadow-lg"
          >
            <DropdownMenuLabel className="px-3 py-2">
              <div className="flex flex-col gap-1">
                <span className="text-sm font-semibold tracking-tight">
                  Account
                </span>
                <span className="text-xs text-muted-foreground truncate max-w-full">
                  {user?.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              asChild
              className="p-2.5 rounded-lg cursor-pointer"
            >
              <Link
                href="/platform/settings"
                className="flex items-center gap-3 text-sm"
              >
                <Settings className="w-4 h-4" /> Platform Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-border" />
            <DropdownMenuItem
              onClick={handleLogout}
              className="p-2.5 rounded-lg cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/5"
            >
              <LogOut className="w-4 h-4 mr-3" /> Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
