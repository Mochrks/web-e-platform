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
      <div className="absolute top-6 right-6 z-50">
        <ModeToggle />
      </div>

      {/* Background decoration — sage green glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-15%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] dark:bg-primary/5" />
        <div className="absolute bottom-[-15%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px] dark:bg-secondary/30" />
      </div>

      <div className="w-full max-w-5xl flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Panel — Brand & Messaging */}
        <div className="hidden lg:flex flex-col space-y-8 p-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
              <Terminal className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-foreground">
                E-Platform.
              </h1>
              <p className="text-xs font-semibold uppercase text-primary tracking-[0.25em] leading-none">
                Smart Training
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-4xl font-black text-foreground leading-[1.15] tracking-tight">
              {view === 'login' && (
                <>
                  Empower Your <span className="text-primary">Career</span>{' '}
                  Journey.
                </>
              )}
              {view === 'forgot' && (
                <>
                  Recover Your <span className="text-primary">Access</span>{' '}
                  Securely.
                </>
              )}
              {view === 'reset' && (
                <>
                  Create Your <span className="text-primary">New</span>{' '}
                  Password.
                </>
              )}
            </h2>
            <div className="py-2">
              <TalentAvatar
                size={160}
                shirtColor="#059669"
                mood={view === 'login' ? 'happy' : 'thinking'}
                className="-ml-2"
              />
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-md">
              {view === 'login' &&
                'The elite command center for IT professionals to sharpen skills, validate expertise, and dominate technical challenges.'}
              {view === 'forgot' &&
                'Forgot your password? No worries. Enter your email and we will send you a secure recovery link.'}
              {view === 'reset' &&
                'Security first. Set a strong new password to regain full access to your E-Platform dashboard.'}
            </p>
          </div>
        </div>

        {/* Mobile Logo */}
        <div className="lg:hidden flex flex-col items-center gap-2 mb-2">
          <div className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center text-primary-foreground">
            <Terminal className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-black tracking-tighter text-foreground">
            E-Platform.
          </h1>
        </div>

        {/* Right Panel — Auth Card */}
        <Card className="bg-card/80 border-border backdrop-blur-xl rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
          {view === 'login' && (
            <>
              <div className="mb-8 text-center lg:text-left">
                <h3 className="text-2xl font-black text-foreground mb-1.5 tracking-tight">
                  Access Dashboard
                </h3>
                <p className="text-muted-foreground text-sm">
                  Welcome back. Authenticate to resume your learning journey.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="identifier"
                    className="text-xs font-semibold text-muted-foreground ml-0.5"
                  >
                    Username or Email
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="identifier"
                      type="text"
                      placeholder="e.g. admin or admin@example.com"
                      {...register('identifier')}
                      className={`h-12 bg-secondary/50 border-border rounded-xl pl-11 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:bg-background transition-all ${errors.identifier ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                    />
                  </div>
                  {errors.identifier && (
                    <p className="text-xs text-destructive font-medium ml-0.5">
                      {errors.identifier.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between ml-0.5">
                    <Label
                      htmlFor="password"
                      className="text-xs font-semibold text-muted-foreground"
                    >
                      Password
                    </Label>
                    <button
                      type="button"
                      onClick={() => setView('forgot')}
                      className="text-xs font-semibold text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      {...register('password')}
                      className={`h-12 bg-secondary/50 border-border rounded-xl pl-11 pr-11 text-foreground placeholder:text-muted-foreground/50 focus-visible:ring-primary/30 focus-visible:bg-background transition-all ${errors.password ? 'border-destructive focus-visible:ring-destructive/30' : ''}`}
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-destructive font-medium ml-0.5">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isLoggingIn || !isValid}
                  className="w-full h-12 rounded-3xl bg-primary hover:brightness-110 text-primary-foreground font-semibold text-base transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Sign In <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>

                <div className="relative py-3">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border"></span>
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="bg-card px-3 text-muted-foreground font-medium">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-xl border-border bg-background hover:bg-secondary text-foreground gap-2 transition-all"
                  >
                    <FaGithub className="w-5 h-5" /> GitHub
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={googleLogin}
                    className="h-12 rounded-xl border-border bg-background hover:bg-secondary text-foreground gap-2 transition-all active:scale-[0.97]"
                  >
                    <FcGoogle className="w-5 h-5" /> Google
                  </Button>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-primary font-semibold hover:underline"
                >
                  Register Now
                </Link>
              </p>
            </>
          )}

          {view === 'forgot' && (
            <>
              <div className="mb-8 text-center lg:text-left">
                <h3 className="text-2xl font-black text-foreground mb-1.5 tracking-tight">
                  Forgot Password
                </h3>
                <p className="text-muted-foreground text-sm">
                  Enter your email to receive a reset link.
                </p>
              </div>

              <form onSubmit={handleForgotSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground ml-0.5">
                    Registered Email
                  </Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type="email"
                      required
                      placeholder="your@email.com"
                      value={resetEmail}
                      onChange={(e) => setResetEmail(e.target.value)}
                      className="h-12 bg-secondary/50 border-border rounded-xl pl-11 text-foreground focus-visible:ring-primary/30 focus-visible:bg-background transition-all"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSendingForgot || !resetEmail}
                  className="w-full h-12 rounded-3xl bg-primary hover:brightness-110 text-primary-foreground font-semibold text-base"
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
                  className="w-full h-12 rounded-3xl font-semibold text-sm"
                >
                  Back to Login
                </Button>
              </form>
            </>
          )}

          {view === 'reset' && (
            <>
              <div className="mb-8 text-center lg:text-left">
                <h3 className="text-2xl font-black text-foreground mb-1.5 tracking-tight">
                  Reset Password
                </h3>
                <p className="text-muted-foreground text-sm">
                  Set your new secure password.
                </p>
              </div>

              <form onSubmit={handleResetSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-xs font-semibold text-muted-foreground ml-0.5">
                    New Password
                  </Label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="h-12 bg-secondary/50 border-border rounded-xl pl-11 pr-11 text-foreground focus-visible:ring-primary/30 focus-visible:bg-background transition-all"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isResettingPassword || !newPassword}
                  className="w-full h-12 rounded-3xl bg-primary hover:brightness-110 text-primary-foreground font-semibold text-base"
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
                  variant="outline"
                  onClick={() => setView('login')}
                  className="w-full h-12 rounded-3xl font-semibold text-sm"
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
