'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Award, BookOpen, Clock, Zap, CheckCircle2, Lock } from 'lucide-react';
import { useCertificationsHook } from './CertificationPageHook';

export default function CertificationPageUI() {
  const { certs, handleEnroll, totalCompleted, activePoints } =
    useCertificationsHook();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight">
            Certification Center
          </h1>
          <p className="text-muted-foreground font-medium">
            Upgrade your skillset and earn XP rewards for each completion.
          </p>
        </div>
        <div className="flex gap-4">
          <Card className="p-6 rounded-3xl border-border bg-card shadow-sm text-center min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Total Points
            </p>
            <h4 className="text-2xl font-black text-primary">{activePoints}</h4>
          </Card>
          <Card className="p-6 rounded-3xl border-border bg-card shadow-sm text-center min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Completed
            </p>
            <h4 className="text-2xl font-black text-primary">
              {totalCompleted}
            </h4>
          </Card>
        </div>
      </div>

      {/* Admin Panel (Simulation) */}
      <div className="p-6 rounded-[2.5rem] bg-muted/30 border border-dashed border-border flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h4 className="font-black">Admin Management</h4>
            <p className="text-xs font-bold text-muted-foreground">
              Assign certifications to specific employees manually.
            </p>
          </div>
        </div>
        <Button className="rounded-2xl h-12 px-6 font-black bg-white text-black border border-border hover:bg-muted shadow-sm">
          Open Admin Panel
        </Button>
      </div>

      {/* Grid of Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {certs.map((c) => (
          <Card
            key={c.id}
            className="flex flex-col rounded-[2.5rem] border-border bg-card/60 backdrop-blur-md shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all p-1 overflow-hidden group"
          >
            <div className="h-40 rounded-[2.2rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent relative p-8 flex items-end">
              <Award className="absolute top-6 left-6 w-12 h-12 text-primary opacity-20 group-hover:scale-125 transition-transform" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-primary/80">
                  Authorized By
                </p>
                <h5 className="font-black text-lg leading-tight">
                  {c.provider}
                </h5>
              </div>
              <div className="absolute top-6 right-6">
                <Badge className="rounded-full px-3 py-1 bg-white/50 backdrop-blur-md text-black border-none text-[10px] font-black">
                  <Zap className="w-3 h-3 text-primary mr-1 fill-primary" /> +
                  {c.points} XP
                </Badge>
              </div>
            </div>

            <div className="p-8 space-y-4 flex-1 flex flex-col">
              <div className="space-y-1">
                <h3 className="text-xl font-black leading-tight group-hover:text-primary transition-colors">
                  {c.title}
                </h3>
                <p className="text-xs font-bold text-muted-foreground line-clamp-2">
                  {c.description}
                </p>
              </div>

              <div className="flex items-center gap-6 pt-2 border-t border-border/50">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" /> {c.duration}
                </div>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase text-muted-foreground">
                  <BookOpen className="w-3.5 h-3.5" /> 12 Modules
                </div>
              </div>

              <div className="pt-4 mt-auto">
                {c.status === 'available' ? (
                  <Button
                    onClick={() => handleEnroll(c.id)}
                    className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-black text-sm shadow-lg shadow-primary/25"
                  >
                    Enroll Now
                  </Button>
                ) : c.status === 'ongoing' ? (
                  <Button className="w-full h-14 rounded-2xl bg-primary/10 text-primary font-black text-sm border-2 border-primary/20 hover:bg-primary/20">
                    Resume Learning
                  </Button>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-green-500 font-black h-14 bg-green-50 rounded-2xl text-sm">
                    <CheckCircle2 className="w-5 h-5" /> Completed
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
