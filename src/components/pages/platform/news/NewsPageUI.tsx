/* eslint-disable @next/next/no-img-element */
'use client';
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Calendar,
  Plus,
  ChevronRight,
  Edit,
  Trash2,
  AlertCircle,
  BellRing,
  Eye,
} from 'lucide-react';
import { useNewsPage } from './NewsPageHook';

export default function NewsPageUI(props: ReturnType<typeof useNewsPage>) {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    filteredNews,
    featuredNews,
    regularNews,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Company Announcements
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            Stay up-to-date with the latest news, updates, and policies.
          </p>
        </div>
        {isAdmin && (
          <Button className="shrink-0 shadow-md hover:shadow-lg transition-shadow">
            <Plus className="w-4 h-4 mr-2" />
            Create Announcement
          </Button>
        )}
      </div>

      {/* Tabs Filter */}
      <Tabs
        defaultValue="All"
        className="w-full overflow-x-auto pb-2"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-4 bg-secondary/50 h-auto p-1 flex w-fit min-w-full md:min-w-0">
          <TabsTrigger value="All" className="px-4 py-2 text-sm">
            All News
          </TabsTrigger>
          <TabsTrigger value="Company Update" className="px-4 py-2 text-sm">
            Company Updates
          </TabsTrigger>
          <TabsTrigger value="HR & Benefits" className="px-4 py-2 text-sm">
            HR & Benefits
          </TabsTrigger>
          <TabsTrigger value="Product Update" className="px-4 py-2 text-sm">
            Product
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Alert Banner */}
      <Alert className="bg-amber-500/10 border-amber-500/50 text-amber-700 dark:text-amber-400">
        <AlertCircle className="h-4 w-4 stroke-amber-600 dark:stroke-amber-400" />
        <AlertTitle className="font-bold flex items-center gap-2">
          Urgent Action Required
        </AlertTitle>
        <AlertDescription className="mt-1">
          The deadline for selecting your Q4 health benefit options ends this
          Friday. Please navigate to Settings to finalize your choices.
        </AlertDescription>
      </Alert>

      {/* Featured News (If exists in the active tab) */}
      {featuredNews && (
        <Card className="overflow-hidden group hover:shadow-lg transition-shadow border-primary/20">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <Badge className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
                  Featured
                </Badge>
                <Badge
                  variant="secondary"
                  className="bg-background/80 backdrop-blur-md"
                >
                  {featuredNews.category}
                </Badge>
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col p-6 lg:p-8">
              <div className="flex items-center gap-4 text-xs font-semibold text-muted-foreground mb-3">
                <span className="flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1" /> {featuredNews.date}
                </span>
                <span className="flex items-center">
                  <Eye className="w-3.5 h-3.5 mr-1" /> {featuredNews.views}{' '}
                  Reads
                </span>
              </div>
              <h2 className="text-2xl font-bold leading-tight mb-3 group-hover:text-primary transition-colors">
                {featuredNews.title}
              </h2>
              <p className="text-muted-foreground mb-6 line-clamp-4">
                {featuredNews.excerpt}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <Button className="px-6 font-semibold shadow-sm">
                  Read Full Article <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                {isAdmin && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4 text-muted-foreground" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-destructive/30 hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Grid for standard news */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        {regularNews.map((news) => (
          <Card
            key={news.id}
            className="overflow-hidden flex flex-col group transition-all hover:shadow-md border-border/50"
          >
            <div className="relative h-48 overflow-hidden bg-secondary">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3">
                <Badge
                  variant="secondary"
                  className="bg-background/90 backdrop-blur-md shadow-sm"
                >
                  {news.category}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-3 flex-1">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-2 font-medium">
                <span className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" /> {news.date}
                </span>
                <span className="flex items-center">
                  <Eye className="w-3 h-3 mr-1" /> {news.views}
                </span>
              </div>
              <CardTitle className="text-xl leading-tight line-clamp-2 group-hover:text-primary transition-colors">
                {news.title}
              </CardTitle>
              <CardDescription className="line-clamp-3 mt-2">
                {news.excerpt}
              </CardDescription>
            </CardHeader>
            <CardFooter className="pt-0 flex items-center justify-between border-t border-border/40 p-4 mt-auto">
              <Button
                variant="ghost"
                className="p-0 h-auto font-semibold text-primary hover:bg-transparent hover:brightness-125"
              >
                Read More <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              {isAdmin && (
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="text-center py-12 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed">
          No announcements found for this category.
        </div>
      )}
    </div>
  );
}
