import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Search,
  UserPlus,
  Mail,
  MessageCircle,
  MapPin,
  Building2,
  Calendar as CalendarIcon,
  AtSign,
} from 'lucide-react';
import TalentAvatar from '@/components/shared/avatar';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useDirectoryPage } from './DirectoryPageHook';

export default function DirectoryPageUI(
  props: ReturnType<typeof useDirectoryPage>
) {
  const {
    isAdmin,
    searchQuery,
    setSearchQuery,
    selectedDept,
    setSelectedDept,
    filteredEmployees,
    departments,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Company Directory
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            Find colleagues, view organization structure, and connect.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search people, roles..."
              className="pl-9 h-12 rounded-xl bg-muted/50 border-border font-bold text-sm shadow-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isAdmin && (
            <Button className="shrink-0 w-full sm:w-auto h-12 px-6 rounded-xl font-black bg-primary text-white shadow-none hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4 mr-2" />
              Add Employee
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={selectedDept}
        onValueChange={setSelectedDept}
        className="w-full overflow-x-auto pb-2"
      >
        <TabsList className="bg-secondary/50 h-auto p-1 flex w-fit min-w-full sm:min-w-0">
          {departments.map((dept) => (
            <TabsTrigger key={dept} value={dept} className="px-4 py-2 text-sm">
              {dept}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((emp) => (
          <Card
            key={emp.id}
            className="p-6 flex flex-col hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group bg-card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-secondary overflow-hidden flex items-center justify-center border-2 border-border group-hover:border-primary/50 transition-colors">
                    <TalentAvatar size={56} />
                  </div>
                  <div
                    className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-card ${
                      emp.status === 'Online'
                        ? 'bg-green-500'
                        : emp.status === 'Away'
                          ? 'bg-amber-500'
                          : emp.status === 'In a meeting'
                            ? 'bg-red-500'
                            : 'bg-slate-400'
                    }`}
                  />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                    {emp.name}
                  </h3>
                  <p className="text-sm font-medium text-muted-foreground">
                    {emp.role}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Edit
                </Button>
              )}
            </div>

            <div className="space-y-3 mt-2 bg-secondary/20 rounded-lg p-3">
              <div className="flex items-center text-sm text-foreground/80">
                <Building2 className="w-4 h-4 mr-3 text-muted-foreground" />
                {emp.department}
              </div>
              <div className="flex items-center text-sm text-foreground/80">
                <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
                {emp.location}
              </div>
              <div className="flex items-center text-sm text-foreground/80">
                <AtSign className="w-4 h-4 mr-3 text-muted-foreground" />
                <a href={`mailto:${emp.email}`} className="hover:underline">
                  {emp.email}
                </a>
              </div>
              <div className="flex items-center text-sm text-foreground/80">
                <CalendarIcon className="w-4 h-4 mr-3 text-muted-foreground" />
                Joined: {emp.joinDate}
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <Button
                variant="default"
                className="w-full text-xs shadow-sm bg-primary/90 hover:bg-primary"
                size="sm"
              >
                <Mail className="w-3.5 h-3.5 mr-2" /> Email
              </Button>
              <Button
                variant="outline"
                className="w-full text-xs shadow-sm bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/20 dark:border-green-800/50 dark:text-green-500 dark:hover:bg-green-900/40 font-bold"
                size="sm"
              >
                <MessageCircle className="w-3.5 h-3.5 mr-2 fill-green-600 dark:fill-green-500" />{' '}
                WhatsApp
              </Button>
            </div>
          </Card>
        ))}
        {filteredEmployees.length === 0 && (
          <div className="col-span-full py-16 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border flex flex-col items-center">
            <Search className="w-8 h-8 text-muted-foreground/50 mb-3" />
            <p className="text-lg font-medium text-foreground">
              No employees found
            </p>
            <p>Try adjusting your search or department filter.</p>
          </div>
        )}
      </div>
    </div>
  );
}
