'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  User,
  Bell,
  Shield,
  Palette,
  Save,
  RefreshCcw,
  Zap,
  Smile,
  Brain,
  Moon,
  Sun,
  Monitor,
  Mail,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import TalentAvatar from '@/components/shared/avatar';
import { useSettingsPageHook } from './SettingsPageHook';
import { presetColors, accessoryPresets } from '@/data/settingsData';

export default function SettingsPageUI() {
  const { activeTab, setActiveTab, avatarState, handleUpdateAvatar } =
    useSettingsPageHook();

  const renderContent = () => {
    switch (activeTab) {
      case 'Profile & Avatar':
        return (
          <div className="space-y-10">
            <Card className="p-10 rounded-[3rem] border-border bg-card shadow-sm space-y-10">
              <div>
                <h3 className="text-2xl font-black mb-1">Talent Avatar</h3>
                <p className="text-sm text-muted-foreground font-bold">
                  Customize your digital representation in the platform.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="bg-muted/30 p-10 rounded-[3rem] border border-border/50 relative group">
                  <TalentAvatar size={185} isAnimated={true} />
                  <button
                    type="button"
                    onClick={() => handleUpdateAvatar({})}
                    className="absolute bottom-4 right-4 p-3 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl hover:rotate-180 transition-transform"
                  >
                    <RefreshCcw className="w-5 h-5 text-primary" />
                  </button>
                </div>

                <div className="flex-1 space-y-6 w-full">
                  {/* Accessory Toggles */}
                  <div className="flex gap-4 p-4 bg-muted/50 rounded-2xl border border-border">
                    <div className="flex-1 flex items-center justify-between px-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        Glasses
                      </Label>
                      <Switch
                        checked={avatarState.hasGlasses}
                        onCheckedChange={(val) =>
                          handleUpdateAvatar({ hasGlasses: val })
                        }
                      />
                    </div>
                    <div className="w-px h-6 bg-border" />
                    <div className="flex-1 flex items-center justify-between px-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">
                        Headphones
                      </Label>
                      <Switch
                        checked={avatarState.hasHeadphones}
                        onCheckedChange={(val) =>
                          handleUpdateAvatar({ hasHeadphones: val })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Shirt Color */}
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Shirt Color
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '#3b82f6',
                          '#ec4899',
                          '#7c3aed',
                          '#10b981',
                          '#f59e0b',
                          '#1e293b',
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              handleUpdateAvatar({ shirtColor: c })
                            }
                            className={`w-7 h-7 rounded-lg border-2 transition-all ${avatarState.shirtColor === c ? 'border-primary scale-110 shadow-sm' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Pants Color */}
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Pants Color
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '#1e293b',
                          '#64748b',
                          '#0f172a',
                          '#475569',
                          '#334155',
                          '#94a3b8',
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              handleUpdateAvatar({ pantsColor: c })
                            }
                            className={`w-7 h-7 rounded-lg border-2 transition-all ${avatarState.pantsColor === c ? 'border-primary scale-110 shadow-sm' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Headphone Color */}
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Headphones
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '#1a1a1a',
                          '#ffffff',
                          '#ef4444',
                          '#22c55e',
                          '#a855f7',
                          '#64748b',
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              handleUpdateAvatar({ headphoneColor: c })
                            }
                            className={`w-7 h-7 rounded-lg border-2 transition-all ${avatarState.headphoneColor === c ? 'border-primary scale-110 shadow-sm' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Glasses Color */}
                    <div className="space-y-3">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                        Glasses Frame
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {[
                          '#7c3aed',
                          '#1a1a1a',
                          '#ffffff',
                          '#3b82f6',
                          '#10b981',
                          '#f97316',
                        ].map((c) => (
                          <button
                            key={c}
                            onClick={() =>
                              handleUpdateAvatar({ glassesColor: c })
                            }
                            className={`w-7 h-7 rounded-lg border-2 transition-all ${avatarState.glassesColor === c ? 'border-primary scale-110 shadow-sm' : 'border-transparent'}`}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Wardrobe Variants */}
                  <div className="space-y-4 pt-4 border-t border-border">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-primary">
                      Wardrobe Studio
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Shirt Type */}
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold opacity-60">
                          Shirt Style
                        </Label>
                        <div className="flex flex-col gap-1.5">
                          {['basic', 'hoodie', 'suit', 'vest'].map((t) => (
                            <button
                              key={t}
                              onClick={() =>
                                handleUpdateAvatar({ shirtType: t as any })
                              }
                              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize text-left transition-all ${avatarState.shirtType === t ? 'bg-primary text-white' : 'bg-muted/50 hover:bg-muted'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Pants Type */}
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold opacity-60">
                          Pants Style
                        </Label>
                        <div className="flex flex-col gap-1.5">
                          {['basic', 'shorts', 'cargo'].map((t) => (
                            <button
                              key={t}
                              onClick={() =>
                                handleUpdateAvatar({ pantsType: t as any })
                              }
                              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize text-left transition-all ${avatarState.pantsType === t ? 'bg-primary text-white' : 'bg-muted/50 hover:bg-muted'}`}
                            >
                              {t === 'basic' ? 'Long Pants' : t}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Shoe Type */}
                      <div className="space-y-2">
                        <Label className="text-[9px] font-bold opacity-60">
                          Footwear
                        </Label>
                        <div className="flex flex-col gap-1.5">
                          {['boots', 'sneakers', 'loafers'].map((t) => (
                            <button
                              key={t}
                              onClick={() =>
                                handleUpdateAvatar({ shoeType: t as any })
                              }
                              className={`px-3 py-2 rounded-lg text-xs font-bold capitalize text-left transition-all ${avatarState.shoeType === t ? 'bg-primary text-white' : 'bg-muted/50 hover:bg-muted'}`}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-border">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                      Character Vibe
                    </Label>
                    <div className="flex gap-3">
                      {[
                        {
                          id: 'happy',
                          label: 'Happy',
                          icon: <Smile className="w-3 h-3" />,
                        },
                        {
                          id: 'thinking',
                          label: 'Smart',
                          icon: <Brain className="w-3 h-3" />,
                        },
                        {
                          id: 'serious',
                          label: 'Focused',
                          icon: <Zap className="w-3 h-3" />,
                        },
                      ].map((m) => (
                        <button
                          key={m.id}
                          type="button"
                          onClick={() =>
                            handleUpdateAvatar({ mood: m.id as any })
                          }
                          className={`flex-1 p-3 rounded-xl border transition-all text-xs font-bold flex items-center justify-center gap-2 ${avatarState.mood === m.id ? 'border-primary bg-primary/5 text-primary scale-105' : 'border-border hover:bg-muted text-muted-foreground'}`}
                        >
                          {m.icon} {m.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-10 rounded-[2.5rem] border-border bg-card shadow-sm space-y-8">
              <h3 className="text-xl font-black">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    defaultValue="Moch Reks"
                    className="h-14 rounded-2xl bg-muted/50 border-border font-bold"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Email Address
                  </Label>
                  <Input
                    defaultValue="moch.reks@E-Platform.pro"
                    className="h-14 rounded-2xl bg-muted/50 border-border font-bold"
                  />
                </div>
              </div>
            </Card>
          </div>
        );
      case 'Notifications':
        return (
          <Card className="p-10 rounded-[3rem] border-border bg-card shadow-sm space-y-8">
            <div>
              <h3 className="text-2xl font-black mb-1">
                Notification Settings
              </h3>
              <p className="text-sm text-muted-foreground font-bold">
                Manage how and when you receive updates from the platform.
              </p>
            </div>
            <div className="space-y-6">
              {[
                {
                  title: 'Email Alerts',
                  description:
                    'Receive interview reminders and mentor messages via email.',
                  icon: <Mail className="w-5 h-5" />,
                },
                {
                  title: 'Push Notifications',
                  description: 'Real-time updates directly in your browser.',
                  icon: <Bell className="w-5 h-5" />,
                },
                {
                  title: 'Goal Reminders',
                  description:
                    'Weekly updates on your training progress and XP status.',
                  icon: <Zap className="w-5 h-5" />,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-6 rounded-[2rem] bg-muted/30 border border-border"
                >
                  <div className="flex items-center gap-5">
                    <div className="p-3 bg-white dark:bg-zinc-800 rounded-xl text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-sm">{item.title}</h4>
                      <p className="text-xs text-muted-foreground font-bold">
                        {item.description}
                      </p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              ))}
            </div>
          </Card>
        );
      case 'Security':
        return (
          <Card className="p-10 rounded-[3rem] border-border bg-card shadow-sm space-y-8">
            <div>
              <h3 className="text-2xl font-black mb-1">Security & Access</h3>
              <p className="text-sm text-muted-foreground font-bold">
                Secure your account with multi-factor authentication and
                password management.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  className="h-14 rounded-2xl bg-muted/50 border-border"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-14 rounded-2xl bg-muted/50 border-border"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    Confirm New Password
                  </Label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="h-14 rounded-2xl bg-muted/50 border-border"
                  />
                </div>
              </div>
              <div className="pt-4">
                <Button
                  type="button"
                  className="rounded-xl px-10 h-12 bg-primary text-white font-black"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </Card>
        );
      case 'Appearance':
        return (
          <Card className="p-10 rounded-[3rem] border-border bg-card shadow-sm space-y-8">
            <div>
              <h3 className="text-2xl font-black mb-1">App Appearance</h3>
              <p className="text-sm text-muted-foreground font-bold">
                Set your interface theme and visual preferences.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  label: 'Light Mode',
                  icon: <Sun className="w-5 h-5 text-amber-500" />,
                  id: 'light',
                },
                {
                  label: 'Dark Mode',
                  icon: <Moon className="w-5 h-5 text-indigo-500" />,
                  id: 'dark',
                },
                {
                  label: 'System Default',
                  icon: <Monitor className="w-5 h-5 text-muted-foreground" />,
                  id: 'system',
                },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="p-8 rounded-[2rem] border-2 border-border hover:border-primary transition-all flex flex-col items-center gap-4 group"
                >
                  <div className="p-4 bg-muted rounded-2xl group-hover:bg-primary/10 transition-colors">
                    {item.icon}
                  </div>
                  <span className="text-sm font-black">{item.label}</span>
                </button>
              ))}
            </div>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-10 pb-20 animate-fade-in">
      <div className="bg-card border border-border p-10 rounded-[3rem] shadow-sm relative overflow-hidden">
        <h1 className="text-4xl font-black tracking-tight mb-2">
          Platform Settings
        </h1>
        <p className="text-muted-foreground font-medium text-lg font-bold">
          Personalize your experience and manage your E-Platform profile.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
        {/* Left: Navigation Tabs */}
        <div className="flex flex-row xl:flex-col gap-2 overflow-x-auto xl:overflow-visible pb-4 xl:pb-0">
          {[
            { label: 'Profile & Avatar', icon: <User className="w-4 h-4" /> },
            { label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
            { label: 'Security', icon: <Shield className="w-4 h-4" /> },
            { label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
          ].map((item, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveTab(item.label)}
              className={`
                   flex-shrink-0 flex items-center gap-4 p-5 rounded-2xl font-bold transition-all min-w-[200px]
                   ${activeTab === item.label ? 'bg-primary text-white shadow-xl shadow-primary/20 scale-105' : 'hover:bg-muted text-muted-foreground hover:text-foreground'}
                `}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Center: Main Content */}
        <div className="xl:col-span-2 space-y-10">
          {renderContent()}

          <div className="flex justify-end gap-3 px-4">
            <Button
              type="button"
              variant="ghost"
              className="rounded-xl font-bold px-8"
            >
              Discard
            </Button>
            <Button
              type="button"
              className="rounded-xl bg-primary text-white font-black px-10 h-14 shadow-xl shadow-primary/20"
            >
              <Save className="w-5 h-5 mr-3" /> Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
