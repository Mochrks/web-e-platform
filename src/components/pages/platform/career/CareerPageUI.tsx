import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Trophy,
  Target,
  BookOpen,
  CheckCircle2,
  Circle,
  Clock,
  TrendingUp,
} from 'lucide-react';
import { useCareerPage } from './CareerPageHook';

export default function CareerPageUI(props: ReturnType<typeof useCareerPage>) {
  const { isAdmin, track, setTrack, careerData } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Career Path & Goals
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Define role requirements and career matrices.'
              : 'Track your progression towards your next promotion.'}
          </p>
        </div>
        {isAdmin && (
          <Button variant="outline" className="shrink-0">
            Edit Career Matrix
          </Button>
        )}
      </div>

      <Tabs value={track} onValueChange={setTrack} className="w-full">
        <TabsList className="mb-6 bg-secondary/50">
          <TabsTrigger value="Individual Contributor">
            Individual Contributor Track
          </TabsTrigger>
          <TabsTrigger value="Management">Management Track</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-primary/20 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <TrendingUp className="w-32 h-32" />
            </div>
            <CardHeader className="pb-4 border-b border-border/50 bg-secondary/10">
              <CardTitle className="text-2xl text-primary flex items-center">
                <Target className="w-6 h-6 mr-2" /> Current Goal:{' '}
                {careerData.nextLevel}
              </CardTitle>
              <CardDescription className="text-base mt-2">
                You are {careerData.progress}% of the way to meeting the
                requirements for promotion on the {track} path.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Progress
                value={careerData.progress}
                className="h-3 mb-8 bg-secondary"
              />

              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-primary before:via-primary/20 before:to-transparent">
                <h4 className="font-bold text-sm uppercase tracking-widest text-muted-foreground mb-6 bg-background relative z-10 w-fit md:mx-auto px-4 py-1 rounded-full border">
                  Required Milestones
                </h4>

                {careerData.milestones.map((milestone, i) => (
                  <div
                    key={milestone.id}
                    className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                  >
                    <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow bg-background z-10">
                      {milestone.status === 'completed' && (
                        <CheckCircle2 className="w-full h-full text-green-500 bg-background rounded-full" />
                      )}
                      {milestone.status === 'in-progress' && (
                        <Clock className="w-4 h-4 text-amber-500" />
                      )}
                      {milestone.status === 'pending' && (
                        <Circle className="w-3 h-3 text-muted-foreground" />
                      )}
                    </div>
                    <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-4 rounded-xl border border-border/50 bg-card shadow-sm group-hover:border-primary/30 transition-colors">
                      <div className="flex items-center justify-between mb-1">
                        <h5
                          className={`font-bold text-sm ${milestone.status === 'completed' ? 'text-green-600 dark:text-green-400' : ''}`}
                        >
                          {milestone.title}
                        </h5>
                        <span
                          className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                            milestone.status === 'completed'
                              ? 'bg-green-500/10 text-green-600'
                              : milestone.status === 'in-progress'
                                ? 'bg-amber-500/10 text-amber-600'
                                : 'bg-secondary text-muted-foreground'
                          }`}
                        >
                          {milestone.status.replace('-', ' ')}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {milestone.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-card to-secondary/30">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center text-lg">
                <Trophy className="w-5 h-5 mr-2 text-amber-500" /> Current Level
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                {careerData.currentLevel}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Since Jan 2025 • Performance:{' '}
                <span className="text-green-500 font-semibold">
                  Exceeds Expectations
                </span>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 border-b border-border/50">
              <CardTitle className="flex items-center text-lg">
                <BookOpen className="w-5 h-5 mr-2 text-blue-500" /> Recommended
                Learning
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              {careerData.recommendedCourses.map((course) => (
                <div
                  key={course.id}
                  className="group cursor-pointer p-3 rounded-lg hover:bg-secondary/50 transition-colors border border-transparent hover:border-border"
                >
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {course.title}
                    </p>
                    <span className="text-[10px] bg-secondary px-2 py-0.5 rounded">
                      {course.type}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {course.hours} hours
                  </p>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2 text-xs">
                View Course Catalog
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
