'use client';

import React, { Suspense } from 'react';
import { Mail, CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useVerifyEmailHook } from './VerifyEmailHook';

function VerifyEmailContent() {
  const { token, isPending, isSuccess, isError, error } = useVerifyEmailHook();

  if (!token) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-amber-50 dark:bg-amber-950/30 text-amber-500">
            <Mail className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Waiting for verification link
        </h2>
        <p className="text-slate-500 dark:text-zinc-400 max-w-sm mx-auto">
          Please check your email and click the verification link we sent you to
          activate your account.
        </p>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Verifying your email
        </h2>
        <p className="text-slate-500 dark:text-zinc-400">
          Please wait while we verify your account.
        </p>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500">
            <CheckCircle2 className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Email Verified!
        </h2>
        <p className="text-slate-500 dark:text-zinc-400">
          Your account has been successfully verified. You can now login to your
          account.
        </p>
        <div className="pt-4">
          <Button asChild className="w-full">
            <Link href="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 rounded-full bg-rose-50 dark:bg-rose-950/30 text-rose-500">
            <XCircle className="w-12 h-12" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Verification Failed
        </h2>
        <p className="text-slate-500 dark:text-zinc-400">
          {(error as any)?.response?.data?.message ||
            'The verification link is invalid or has expired.'}
        </p>
        <div className="pt-4">
          <Button asChild variant="outline" className="w-full">
            <Link href="/login">Back to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return null;
}

export default function VerifyEmailUI() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex items-center justify-center p-6 font-outfit">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-violet-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-3xl p-8 shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-zinc-800 relative">
        <Suspense
          fallback={
            <div className="flex justify-center items-center py-12">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
          }
        >
          <VerifyEmailContent />
        </Suspense>
      </div>
    </div>
  );
}
