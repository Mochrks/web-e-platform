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
  Mail,
  Hash,
  Phone,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { ModeToggle } from '@/components/shared/theme/ModeToggle';
import { useRegisterPageHook } from './RegisterPageHook';

export default function RegisterPageUI() {
  const {
    form,
    isRegistering,
    handleRegister,
    showPassword,
    togglePasswordVisibility,
    showConfirmPassword,
    toggleConfirmPasswordVisibility,
  } = useRegisterPageHook();
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

      <div className="w-full max-w-2xl">
        <Card className="bg-card/50 border-border backdrop-blur-2xl rounded-[3rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="mb-10 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center text-white shadow-xl shadow-primary/30">
                <Terminal className="w-6 h-6" />
              </div>
            </div>
            <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight">
              Create Account
            </h3>
            <p className="text-muted-foreground font-medium italic">
              Join E-Platform and master your career journey.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="fullName"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Full Name
                </Label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="John Doe"
                    {...register('fullName')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 ${errors.fullName ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.fullName && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                    {errors.fullName.message}
                  </p>
                )}
              </div>
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
                    placeholder="johndoe"
                    {...register('username')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 ${errors.username ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.username && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                    {errors.username.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
              >
                Email Address
              </Label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register('email')}
                  className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="employeeNumber"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Employee Number
                </Label>
                <div className="relative group">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="employeeNumber"
                    type="text"
                    placeholder="EMP-001"
                    {...register('employeeNumber')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 ${errors.employeeNumber ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.employeeNumber && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                    {errors.employeeNumber.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="phoneNumber"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Phone Number
                </Label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="08123456789"
                    {...register('phoneNumber')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 ${errors.phoneNumber ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.phoneNumber && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('password')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 pr-12 ${errors.password ? 'border-destructive focus-visible:ring-destructive' : ''}`}
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
              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-xs font-black uppercase tracking-widest text-muted-foreground ml-1"
                >
                  Confirm Password
                </Label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    {...register('confirmPassword')}
                    className={`h-14 bg-muted/50 border-border rounded-2xl pl-12 pr-12 ${errors.confirmPassword ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors p-1"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[10px] text-destructive font-bold ml-1 uppercase tracking-wider">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={isRegistering || !isValid}
              className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black text-lg shadow-xl shadow-primary/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegistering ? (
                'Creating Account...'
              ) : (
                <>
                  Register Now <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-10 text-center text-sm font-medium text-muted-foreground">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-primary font-black hover:underline tracking-tight"
            >
              Sign In
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
}
