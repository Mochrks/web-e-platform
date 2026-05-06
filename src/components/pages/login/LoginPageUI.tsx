'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Terminal,
  Lock,
  User,
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';
import TalentAvatar from '@/components/shared/avatar';
import { useLoginPageHook } from './LoginPageHook';

export default function LoginPageUI() {
  const {
    view,
    setView,
    form,
    isLoggingIn,
    handleLogin,
    googleLogin,
    showPassword,
    togglePasswordVisibility,
    resetEmail,
    setResetEmail,
    handleForgotSubmit,
    isSendingForgot,
    newPassword,
    setNewPassword,
    handleResetSubmit,
    isResettingPassword,
  } = useLoginPageHook();
  const {
    register,
    formState: { errors, isValid },
  } = form;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute top-8 right-8 z-50">
        <ModeToggle />
      </div>

      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] opacity-50 dark:opacity-100" />
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
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
              {view === 'login' && (
                <>
                  Empower Your{' '}
                  <span className="text-primary italic">Career</span> Journey.
                </>
              )}
              {view === 'forgot' && (
                <>
                  Recover Your{' '}
                  <span className="text-primary italic">Access</span> Securely.
                </>
              )}
              {view === 'reset' && (
                <>
                  Create Your <span className="text-primary italic">New</span>{' '}
                  Password.
                </>
              )}
            </h2>
            <div className="py-4">
              <TalentAvatar
                size={180}
                shirtColor="#7c3aed"
                mood={view === 'login' ? 'happy' : 'thinking'}
                className="-ml-4"
              />
            </div>
            <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-md font-bold">
              {view === 'login' &&
                'The elite command center for IT professionals to sharpen skills, validate expertise, and dominate technical challenges.'}
              {view === 'forgot' &&
                'Forgot your password? No worries. Enter your email and we will send you a secure recovery link.'}
              {view === 'reset' &&
                'Security first. Set a strong new password to regain full access to your E-Platform dashboard.'}
            </p>
          </div>
        </div>

        <div className="lg:hidden flex flex-col items-center gap-2 mb-2">
          <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
            <Terminal className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black tracking-tighter text-foreground">
            E-Platform.
          </h1>
        </div>

        <Card className="bg-card/50 border-border backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          {view === 'login' && (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">
                  Access Dashboard
                </h3>
                <p className="text-muted-foreground font-medium italic">
                  Welcome back, Engineer. Authenticate to resume your quest for
                  excellence.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="identifier"
                    className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                  >
                    Username or Email
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="e.g. admin or admin@example.com"
                      {...register('identifier')}
                      className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/40 focus-visible:bg-background transition-all ${errors.identifier ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                  </div>
                  {errors.identifier && (
                    <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                      {errors.identifier.message}
                    </p>
                  )}
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
                      onClick={() => setView('forgot')}
                      className="text-[10px] font-black text-primary uppercase hover:underline"
                    >
                      Forgot Access?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password')}
                      className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 pr-12 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/40 focus-visible:bg-background transition-all ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn || !isValid}
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
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
                    <FaGithub className="w-5 h-5" /> GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={googleLogin}
                    className="h-14 rounded-2xl border-border bg-muted/30 hover:bg-muted/50 text-foreground font-bold gap-3 transition-all hover:border-primary/20 active:scale-[0.95]"
                  >
                    <FcGoogle className="w-5 h-5" /> Google
                  </Button>
                </div>
              </form>

              <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-primary font-black hover:underline tracking-tight"
                >
                  Register Now
                </Link>
              </p>
            </>
          )}

          {view === 'forgot' && (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">
                  Forgot Password
                </h3>
                <p className="text-muted-foreground font-medium italic">
                  Enter your email to receive a reset link.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    Registered Email
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-14 bg-muted/50 border-border rounded-2xl pl-12 text-foreground focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSendingForgot || !resetEmail}
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20"
                >
                  {isSendingForgot ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    'Send Recovery Link'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setView('login')}
                  className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-muted/50"
                >
                  Back to Login
                </Button>
              </form>
            </>
          )}

          {view === 'reset' && (
            <>
              <div className="mb-10 text-center lg:text-left">
                <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">
                  Reset Password
                </h3>
                <p className="text-muted-foreground font-medium italic">
                  Set your new secure password.
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1">
                    New Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-14 bg-muted/50 border-border rounded-2xl pl-12 pr-12 text-foreground focus-visible:ring-primary/40 focus-visible:bg-background transition-all"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isResettingPassword || !newPassword}
                  className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20"
                >
                  {isResettingPassword ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Resetting...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setView('login')}
                  className="w-full h-14 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-muted/50"
                >
                  Cancel
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
