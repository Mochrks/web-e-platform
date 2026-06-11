import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Plus,
  LayoutGrid,
  List,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  DollarSign,
} from 'lucide-react';
import TalentAvatar from '@/components/shared/avatar';
import { useProjectsPage } from './ProjectsPageHook';

export default function ProjectsPageUI(
  props: ReturnType<typeof useProjectsPage>
) {
  const {
    isAdmin,
    activeFilter,
    setActiveFilter,
    filteredProjects,
    hasOverdue,
  } = props;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            Project Workspace
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Manage all company projects and resources.'
              : 'Collaborate with your team on active projects.'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-secondary p-1 rounded-lg flex">
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-3 ${props.viewMode === 'grid' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => props.setViewMode('grid')}
            >
              <LayoutGrid className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={`h-8 px-3 ${props.viewMode === 'list' ? 'bg-background shadow-sm' : 'text-muted-foreground'}`}
              onClick={() => props.setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          {isAdmin && (
            <Button className="shrink-0 shadow-sm">
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          )}
        </div>
      </div>

      <Tabs
        value={activeFilter}
        onValueChange={setActiveFilter}
        className="w-full"
      >
        <TabsList className="mb-4 bg-secondary/50">
          <TabsTrigger value="All">All Projects</TabsTrigger>
          <TabsTrigger value="In Progress">In Progress</TabsTrigger>
          <TabsTrigger value="Planning">Planning</TabsTrigger>
          <TabsTrigger value="Completed">Completed</TabsTrigger>
        </TabsList>
      </Tabs>

      {props.viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="flex flex-col hover:border-primary/50 hover:shadow-md transition-all cursor-pointer bg-card"
            >
              <CardHeader className="pb-4">
                <div className="flex justify-between items-start mb-2">
                  <Badge
                    variant={
                      project.status === 'Completed'
                        ? 'default'
                        : project.status === 'Planning'
                          ? 'secondary'
                          : 'outline'
                    }
                    className={
                      project.status === 'In Progress'
                        ? 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-none shadow-sm'
                        : ''
                    }
                  >
                    {project.status}
                  </Badge>
                  <Badge
                    variant="outline"
                    className={
                      project.priority === 'Critical'
                        ? 'bg-destructive/10 text-destructive border-destructive/20 font-bold'
                        : project.priority === 'High'
                          ? 'bg-orange-500/10 text-orange-600 border-orange-500/20'
                          : ''
                    }
                  >
                    {project.priority}
                  </Badge>
                </div>
                <CardTitle className="text-lg line-clamp-1">
                  {project.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-end">
                <div className="space-y-4 mb-4">
                  <div className="text-sm text-foreground/80 flex items-start gap-2">
                    <Building2 className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span>{project.client}</span>
                  </div>
                  <div className="text-sm text-foreground/80 flex items-start gap-2">
                    <DollarSign className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                    <span>{project.budget}</span>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground font-medium">
                        Progress
                      </span>
                      <span className="font-bold">{project.progress}%</span>
                    </div>
                    <Progress
                      value={project.progress}
                      className={`h-2.5 ${project.overdue && project.status !== 'Completed' ? 'bg-destructive/20 [&>div]:bg-destructive' : ''}`}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div
                      className={`flex items-center text-xs font-medium ${project.overdue && project.status !== 'Completed' ? 'text-destructive' : 'text-muted-foreground'}`}
                    >
                      {project.status === 'Completed' ? (
                        <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-500" />
                      ) : (
                        <Clock className="w-4 h-4 mr-1.5" />
                      )}
                      {project.deadline}
                    </div>
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(project.team, 3))].map((_, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center overflow-hidden z-10"
                        >
                          <TalentAvatar size={28} />
                        </div>
                      ))}
                      {project.team > 3 && (
                        <div className="w-7 h-7 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[10px] font-bold z-0 text-muted-foreground">
                          +{project.team - 3}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Team</TableHead>
                <TableHead className="text-right">Budget</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProjects.map((project) => (
                <TableRow
                  key={project.id}
                  className="cursor-pointer hover:bg-secondary/20"
                >
                  <TableCell>
                    <div className="font-medium">{project.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">
                      {project.description}
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{project.client}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        project.status === 'Completed'
                          ? 'default'
                          : project.status === 'Planning'
                            ? 'secondary'
                            : 'outline'
                      }
                      className={
                        project.status === 'In Progress'
                          ? 'bg-blue-500/10 text-blue-500 border-none'
                          : ''
                      }
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress
                        value={project.progress}
                        className={`h-2 w-16 ${project.overdue && project.status !== 'Completed' ? 'bg-destructive/20 [&>div]:bg-destructive' : ''}`}
                      />
                      <span className="text-xs font-medium">
                        {project.progress}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      className={`flex items-center text-xs font-medium ${project.overdue && project.status !== 'Completed' ? 'text-destructive' : 'text-muted-foreground'}`}
                    >
                      {project.status === 'Completed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-green-500" />
                      ) : (
                        <Clock className="w-3.5 h-3.5 mr-1" />
                      )}
                      {project.deadline}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex -space-x-2">
                      {[...Array(Math.min(project.team, 3))].map((_, i) => (
                        <div
                          key={i}
                          className="w-6 h-6 rounded-full bg-primary/10 border-2 border-card flex items-center justify-center overflow-hidden z-10"
                        >
                          <TalentAvatar size={24} />
                        </div>
                      ))}
                      {project.team > 3 && (
                        <div className="w-6 h-6 rounded-full bg-secondary border-2 border-card flex items-center justify-center text-[9px] font-bold z-0 text-muted-foreground">
                          +{project.team - 3}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">
                    {project.budget}
                  </TableCell>
                </TableRow>
              ))}
              {filteredProjects.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="h-24 text-center text-muted-foreground"
                  >
                    No projects found for this filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
