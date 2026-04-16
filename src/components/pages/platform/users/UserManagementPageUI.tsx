'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Users,
  UserPlus,
  Search,
  MoreVertical,
  Shield,
  Trash2,
  Edit3,
  Mail,
  UserCheck,
  Building2,
  Filter,
} from 'lucide-react';
import TalentAvatar from '@/components/shared/avatar';
import { useUserManagementPageHook } from './UserManagementPageHook';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function UserManagementPageUI() {
  const {
    users,
    searchQuery,
    setSearchQuery,
    handleDeleteUser,
    totalUsers,
    activeUsers,
  } = useUserManagementPageHook();

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header & Stats */}
      <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black tracking-tighter text-foreground">
            Employee Directory
          </h1>
          <p className="text-muted-foreground font-medium">
            Control center for employee identities, roles, and platform access.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 w-full xl:w-auto">
          <Card className="flex-1 xl:flex-none px-8 py-4 rounded-2xl bg-card border-border flex items-center gap-4 min-w-[180px]">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Total Crew
              </p>
              <p className="text-xl font-black">{totalUsers}</p>
            </div>
          </Card>
          <Card className="flex-1 xl:flex-none px-8 py-4 rounded-2xl bg-card border-border flex items-center gap-4 min-w-[180px]">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                Active Now
              </p>
              <p className="text-xl font-black">{activeUsers}</p>
            </div>
          </Card>
          <Button className="flex-1 xl:flex-none h-14 px-8 bg-primary text-white rounded-2xl font-black text-sm hover:scale-105 transition-all shadow-lg shadow-primary/20">
            <UserPlus className="w-5 h-5 mr-2" /> Add Employee
          </Button>
        </div>
      </div>

      <Card className="rounded-[3rem] border-border bg-card/40 backdrop-blur-xl shadow-sm overflow-hidden p-2">
        {/* Toolbar */}
        <div className="p-6 flex flex-col md:flex-row gap-4 items-center justify-between border-b border-border/50">
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Find employee by name..."
              className="w-full h-12 pl-12 pr-4 bg-muted/30 border border-border rounded-xl outline-none focus:ring-2 focus:ring-primary/20 font-bold text-sm transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              className="flex-1 md:flex-none rounded-xl h-12 font-black text-xs uppercase tracking-widest"
            >
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Badge className="rounded-xl h-12 px-6 bg-muted text-muted-foreground border-none font-black text-xs uppercase tracking-widest hidden md:flex items-center">
              Sorted by Rank
            </Badge>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50">
                <th className="py-6 px-8 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Identity
                </th>
                <th className="py-6 px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Assignment
                </th>
                <th className="py-6 px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Role
                </th>
                <th className="py-6 px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Status
                </th>
                <th className="py-6 px-4 text-[10px] font-black uppercase text-muted-foreground tracking-[0.2em]">
                  Activity
                </th>
                <th className="py-6 px-8"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="group hover:bg-muted/10 transition-all"
                >
                  <td className="py-6 px-8">
                    <div className="flex items-center gap-5">
                      <div className="relative">
                        <TalentAvatar size={52} {...user.avatarConfig} />
                        {user.status === 'Active' && (
                          <div className="absolute bottom-1 right-1 w-3 h-3 bg-emerald-500 border-2 border-card rounded-full" />
                        )}
                      </div>
                      <div className="space-y-0.5">
                        <p className="font-black text-lg tracking-tight group-hover:text-primary transition-colors">
                          {user.name}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
                          <Mail className="w-3 h-3" /> {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2 text-sm font-black text-foreground/80">
                      <Building2 className="w-4 h-4 text-primary" />{' '}
                      {user.department}
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <div className="flex items-center gap-2">
                      {user.role === 'Admin' && (
                        <Shield className="w-4 h-4 text-indigo-500" />
                      )}
                      <span className="font-black text-sm uppercase tracking-tighter opacity-80">
                        {user.role}
                      </span>
                    </div>
                  </td>
                  <td className="py-6 px-4">
                    <Badge
                      className={`rounded-lg px-3 py-1 text-[10px] font-black uppercase tracking-widest border-none ${
                        user.status === 'Active'
                          ? 'bg-emerald-500/10 text-emerald-500'
                          : user.status === 'Inactive'
                            ? 'bg-rose-500/10 text-rose-500'
                            : 'bg-orange-500/10 text-orange-500'
                      }`}
                    >
                      {user.status}
                    </Badge>
                  </td>
                  <td className="py-6 px-4 text-xs font-bold text-muted-foreground">
                    {user.lastSeen}
                  </td>
                  <td className="py-6 px-8 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="p-3 hover:bg-muted rounded-xl transition-all">
                          <MoreVertical className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-all" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-48 rounded-2xl p-2 border-border bg-card shadow-2xl"
                      >
                        <DropdownMenuItem className="rounded-xl flex items-center gap-3 p-3 font-bold text-xs cursor-pointer">
                          <Edit3 className="w-4 h-4 text-primary" /> Edit
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="rounded-xl flex items-center gap-3 p-3 font-bold text-xs cursor-pointer text-rose-500 hover:bg-rose-50 focus:bg-rose-50 transition-colors"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" /> Terminate Access
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {users.length === 0 && (
            <div className="py-20 text-center opacity-40">
              <Users className="w-16 h-16 mx-auto mb-4" />
              <p className="text-xl font-black uppercase tracking-tighter">
                No crew members found
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
