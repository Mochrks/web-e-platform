'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Award,
  BookOpen,
  Clock,
  Zap,
  CheckCircle2,
  Lock,
  MoreVertical,
  Edit,
  Trash,
  Plus,
} from 'lucide-react';
import { useCertificationsHook } from './CertificationPageHook';

export default function CertificationPageUI() {
  const {
    isAdmin,
    certs,
    handleEnroll,
    totalCompleted,
    isModalOpen,
    setIsModalOpen,
    certTitle,
    setCertTitle,
    certProvider,
    setCertProvider,
    certDesc,
    setCertDesc,
    certDuration,
    setCertDuration,
    openCreateModal,
    openEditModal,
    handleSubmitCert,
    handleDeleteCert,
  } = useCertificationsHook();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-top-4 duration-1000">
      {/* Header Info */}
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Certification Center
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            Upgrade your skillset with our certifications.
          </p>
        </div>
        <div className="flex gap-4">
          <Card className="p-6 rounded-3xl border-border bg-card  text-center min-w-[140px]">
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1">
              Completed
            </p>
            <h4 className="text-2xl font-black text-primary">
              {totalCompleted}
            </h4>
          </Card>
        </div>
      </div>

      {/* Admin Panel */}
      {isAdmin && (
        <div className="p-6 rounded-3xl bg-green-500/5 dark:bg-green-500/10 border border-dashed border-green-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center">
              <Lock className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h4 className="font-black text-green-900 dark:text-green-300">
                Admin Management
              </h4>
              <p className="text-xs font-bold text-green-700/70 dark:text-green-400/70">
                Manage and assign certifications.
              </p>
            </div>
          </div>
          <Button
            onClick={openCreateModal}
            className="rounded-2xl h-12 px-6 font-black bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" /> Add Certification
          </Button>
        </div>
      )}

      {/* Grid of Certs */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {certs.map((c) => (
          <Card
            key={c.id}
            className="flex flex-col rounded-3xl border-border bg-card/60 backdrop-blur-md  hover: hover:-translate-y-2 transition-all p-1 overflow-hidden group"
          >
            <div className="h-40 rounded-[2.2rem] bg-gradient-to-br from-green-500/10 via-green-500/5 to-transparent relative p-8 flex items-end">
              <Award className="absolute top-6 left-6 w-12 h-12 text-green-500/20 group-hover:scale-125 transition-transform" />
              <div className="space-y-1">
                <p className="text-[10px] font-black uppercase tracking-widest text-green-600 dark:text-green-400">
                  Authorized By
                </p>
                <h5 className="font-black text-lg leading-tight">
                  {c.provider}
                </h5>
              </div>
              <div className="absolute top-6 right-6 flex items-center gap-2">
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 bg-white/50 backdrop-blur-md rounded-full text-black hover:bg-white/80"
                      >
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-40">
                      <DropdownMenuItem onClick={() => openEditModal(c)}>
                        <Edit className="w-4 h-4 mr-2" /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteCert(c.id)}
                        className="text-red-500 focus:text-red-500"
                      >
                        <Trash className="w-4 h-4 mr-2" /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
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
                    className="w-full h-14 rounded-2xl bg-green-600 hover:bg-green-700 text-white font-black text-sm"
                  >
                    Enroll Now
                  </Button>
                ) : c.status === 'ongoing' ? (
                  <Button className="w-full h-14 rounded-2xl bg-green-500/10 text-green-700 dark:text-green-400 font-black text-sm border-2 border-green-500/20 hover:bg-green-500/20">
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden border-border bg-card">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle className="text-2xl font-black">
              Certification Details
            </DialogTitle>
            <DialogDescription>
              Create or edit a certification.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold">Title</label>
              <Input
                value={certTitle}
                onChange={(e) => setCertTitle(e.target.value)}
                className="bg-secondary/20 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Provider</label>
              <Input
                value={certProvider}
                onChange={(e) => setCertProvider(e.target.value)}
                className="bg-secondary/20 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">
                Duration (e.g. &quot;4 Weeks&quot;)
              </label>
              <Input
                value={certDuration}
                onChange={(e) => setCertDuration(e.target.value)}
                className="bg-secondary/20 h-12 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold">Description</label>
              <Textarea
                value={certDesc}
                onChange={(e) => setCertDesc(e.target.value)}
                className="min-h-[100px] bg-secondary/20 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="bg-secondary/20 p-6 border-t flex justify-end">
            <Button
              variant="outline"
              onClick={() => setIsModalOpen(false)}
              className="rounded-xl mr-2"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmitCert}
              className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
            >
              Save Certification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
