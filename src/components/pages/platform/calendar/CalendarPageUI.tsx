'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import Badge from '@/components/shared/components/Badge';
import {
  Clock,
  Plus,
  Users,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Video,
  CalendarIcon as LucideCalendar,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import CalendarGrid from './components/CalendarGrid';
import { useCalendarPageHook } from './CalendarPageHook';

export default function CalendarPageUI() {
  const {
    currentMonth,
    setCurrentMonth,
    selectedDate,
    setSelectedDate,
    isBookingOpen,
    setIsBookingOpen,
    newBooking,
    setNewBooking,
    sessions,
    nextMonth,
    prevMonth,
    handleBook,
    filteredSessions,
  } = useCalendarPageHook();

  return (
    <div className="space-y-10 pb-20 animate-fade-in px-2">
      {/* Header Board */}
      <div className="flex flex-col md:flex-row justify-between items-center bg-card border border-border p-10 rounded-[3rem] shadow-sm gap-8 relative overflow-hidden mb-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl opacity-50" />
        <div className="relative z-10 text-center md:text-left">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Training Schedule
          </h1>
          <p className="text-muted-foreground font-medium text-lg leading-relaxed font-bold max-w-xl text-balance">
            {format(currentMonth, 'MMMM yyyy')} • {sessions.length} Simulations
            this month
          </p>
        </div>
        <Button
          onClick={() => setIsBookingOpen(true)}
          className="rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold h-16 px-10 shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95 text-xl"
        >
          <Plus className="w-6 h-6 mr-3" aria-hidden="true" /> Book Session
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-6">
          <div className="flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <LucideCalendar
                className="w-6 h-6 text-primary"
                aria-hidden="true"
              />
              <h2 className="text-2xl font-black tracking-tighter">
                Monthly Grid
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevMonth}
                className="rounded-xl"
                aria-label="Previous month"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentMonth(new Date())}
                className="rounded-xl font-black px-4 mx-2"
              >
                Today
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={nextMonth}
                className="rounded-xl"
                aria-label="Next month"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <CalendarGrid
            currentMonth={currentMonth}
            selectedDate={selectedDate}
            sessions={sessions}
            onDateClick={setSelectedDate}
          />
        </div>

        <div className="xl:col-span-4 space-y-8">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-2xl font-black tracking-tight underline decoration-primary/30 underline-offset-8">
              Agenda: {format(selectedDate, 'MMM d')}
            </h3>
            <Badge className="rounded-full bg-primary/5 border-primary/10 text-primary font-black px-4 py-1">
              {filteredSessions.length} Events
            </Badge>
          </div>

          <div className="space-y-6">
            {filteredSessions.length === 0 ? (
              <Card className="p-16 rounded-[2.5rem] border-border border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4 bg-muted/5">
                <div className="w-20 h-20 rounded-3xl bg-muted flex items-center justify-center text-muted-foreground opacity-20">
                  <LucideCalendar className="w-10 h-10" aria-hidden="true" />
                </div>
                <p className="text-muted-foreground font-black uppercase text-xs tracking-widest">
                  Free Day
                </p>
                <p className="text-muted-foreground font-medium text-sm">
                  No simulations or meetings yet.
                </p>
                <Button
                  onClick={() => setIsBookingOpen(true)}
                  variant="ghost"
                  className="text-primary font-black hover:bg-primary/5"
                >
                  Schedule a Session
                </Button>
              </Card>
            ) : (
              filteredSessions.map((event: any) => (
                <Card
                  key={event.id}
                  className="p-8 rounded-[2.5rem] bg-card border-border shadow-sm hover:shadow-xl hover:border-primary/20 transition-all group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform">
                    <Video className="w-24 h-24" aria-hidden="true" />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <Badge className="rounded-full px-4 py-1.5 text-[10px] uppercase font-black tracking-widest bg-primary/5 text-primary border-primary/20">
                      {event.type}
                    </Badge>

                    <div>
                      <h4 className="text-2xl font-black tracking-tight group-hover:text-primary transition-colors">
                        {event.title}
                      </h4>
                      <div className="flex flex-col gap-2 mt-4 text-xs font-bold text-muted-foreground group-hover:text-foreground transition-all">
                        <span className="flex items-center gap-2">
                          <Clock
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />{' '}
                          {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />{' '}
                          {event.mentor}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin
                            className="w-4 h-4 text-primary"
                            aria-hidden="true"
                          />{' '}
                          {event.location}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 border-t border-border flex gap-3">
                      <Button className="flex-1 rounded-xl bg-primary text-white font-bold h-12 shadow-md">
                        Join Simulation
                      </Button>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md rounded-[2.5rem] p-10">
          <DialogHeader>
            <DialogTitle className="text-3xl font-black tracking-tight">
              Book a Session
            </DialogTitle>
            <p className="text-muted-foreground font-medium">
              Schedule for {format(selectedDate, 'MMMM d, yyyy')}
            </p>
          </DialogHeader>
          <div className="space-y-6 py-6 font-bold">
            <div className="space-y-2">
              <label
                htmlFor="sim-title"
                className="text-xs uppercase tracking-widest text-muted-foreground font-black"
              >
                Simulation Name
              </label>
              <Input
                id="sim-title"
                placeholder="e.g. Mock Coding Challenge"
                className="h-14 rounded-2xl bg-muted/30 border-border"
                value={newBooking.title}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="mentor-select"
                className="text-xs uppercase tracking-widest text-muted-foreground font-black"
              >
                Choose Mentor
              </label>
              <select
                id="mentor-select"
                className="w-full h-14 rounded-2xl bg-muted/30 border border-border px-4 text-sm font-bold appearance-none"
                value={newBooking.mentor}
                onChange={(e) =>
                  setNewBooking({ ...newBooking, mentor: e.target.value })
                }
              >
                <option>Senior Mentor John</option>
                <option>Lead Engineer Sarah</option>
                <option>Coach Michael (HR)</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setIsBookingOpen(false)}
              className="rounded-xl font-bold px-8"
            >
              Discard
            </Button>
            <Button
              onClick={handleBook}
              className="rounded-xl bg-primary text-white font-black px-8 h-12 shadow-lg shadow-primary/20"
            >
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
