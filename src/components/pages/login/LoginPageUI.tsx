'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Terminal, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';
import TalentAvatar from '@/components/shared/avatar';
import { useLoginPageHook } from './LoginPageHook';

export default function LoginPageUI() {
  const {
    username,
    setUsername,
    password,
    setPassword,
    isLoading,
    handleLogin,
  } = useLoginPageHook();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Theme Toggle in Corner */}
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>

      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side: Branding (Desktop) */}
        <div className="hidden lg:flex flex-col space-y-8 p-12">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/40">
              <Terminal className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black tracking-tighter text-foreground">
                E-Platform.
              </h1>
              <p className="text-sm font-black uppercase text-primary tracking-[0.3em] leading-none">
                Smart Training
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-foreground leading-[1.1] tracking-tight">
              Empower Your <span className="text-primary italic">Career</span>{' '}
              Journey.
            </h2>
            <div className="py-4">
              <TalentAvatar
                size={180}
                shirtColor="#7c3aed"
                mood="happy"
                className="-ml-4"
              />
            </div>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md font-bold">
              The premium hub for IT talent providers to simulate, track, and
              master technical interviews.
            </p>
          </div>
        </div>

        {/* Mobile Logo Branding */}
        <div className="lg:hidden flex flex-col items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-foreground">
            E-Platform.
          </h1>
        </div>

        {/* Right Side: Login Form */}
        <Card className="bg-card/50 border-border backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="mb-10 text-center lg:text-left">
            <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">
              Access Dashboard
            </h3>
            <p className="text-muted-foreground font-medium italic">
              Use admin/admin for Admin role or user/user for Employee role.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
              >
                Username
              </Label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="username"
                  type="text"
                  placeholder="e.g. admin"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-14 bg-muted/50 border-border rounded-2xl pl-12 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground"
                >
                  Password
                </Label>
                <button
                  type="button"
                  className="text-[10px] font-black text-primary uppercase hover:underline"
                >
                  Forgot Access?
                </button>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-14 bg-muted/50 border-border rounded-2xl pl-12 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoading ? (
                'Processing...'
              ) : (
                <>
                  Sign In to Portal <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>

            <div className="relative py-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-black tracking-widest">
                <span className="bg-card px-4 text-muted-foreground">
                  Verification Support
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="h-14 rounded-2xl border-border bg-muted/30 hover:bg-muted/50 text-foreground font-bold gap-3 transition-all hover:border-primary/20"
              >
                <Github className="w-5 h-5" /> GitHub
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-14 rounded-2xl border-border bg-muted/30 hover:bg-muted/50 text-foreground font-bold gap-3 transition-all hover:border-primary/20"
              >
                <Chrome className="w-5 h-5" /> Google
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
            Unauthorized access?{' '}
            <button className="text-primary font-black hover:underline tracking-tight">
              Contact Admin
            </button>
          </p>
        </Card>
      </div>
    </div>
  );
}
