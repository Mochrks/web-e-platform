import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Target,
  TrendingUp,
  Award,
  BarChart3,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Download,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { usePerformancePage } from './PerformancePageHook';

export default function PerformancePageUI(
  props: ReturnType<typeof usePerformancePage>
) {
  const {
    isAdmin,
    activeTab,
    setActiveTab,
    kpis,
    goals,
    handleAddGoal,
    handleEditGoal,
    handleDeleteGoal,
    reviewHistory,
  } = props;

  const [isAdding, setIsAdding] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    progress: 0,
    deadline: '',
    status: 'On Track',
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editGoal, setEditGoal] = useState<any>({});

  const saveNewGoal = () => {
    if (!newGoal.title) return;
    handleAddGoal({
      title: newGoal.title,
      progress: Number(newGoal.progress),
      deadline: newGoal.deadline,
      status: newGoal.status,
    });
    setIsAdding(false);
    setNewGoal({ title: '', progress: 0, deadline: '', status: 'On Track' });
  };

  const saveEdit = () => {
    if (editingId) {
      handleEditGoal(editingId, {
        title: editGoal.title,
        progress: Number(editGoal.progress),
        deadline: editGoal.deadline,
        status: editGoal.status,
      });
      setEditingId(null);
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="bg-card border border-border p-8 md:p-10 rounded-3xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">
            My Performance
          </h1>
          <p className="text-muted-foreground font-medium text-lg font-bold">
            {isAdmin
              ? 'Review team performance and OKRs.'
              : 'Track your KPIs, goals, and evaluation history.'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="shrink-0 shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          {isAdmin && (
            <Button className="shrink-0 shadow-sm">Start Review Cycle</Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-card to-secondary/30 md:col-span-2">
          <CardHeader className="pb-2 border-b border-border/50">
            <CardTitle className="text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-primary" /> KPI Overview
              (Q3)
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-6">
              {kpis.map((kpi) => (
                <div key={kpi.id} className="space-y-2">
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-semibold text-sm">{kpi.name}</h4>
                      <p className="text-xs text-muted-foreground flex items-center mt-1">
                        Target: {kpi.target} <span className="mx-2">•</span>
                        <TrendingUp className="w-3 h-3 mr-1 text-green-500" />{' '}
                        <span className="text-green-600 dark:text-green-400 font-medium">
                          {kpi.trend}
                        </span>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-xl font-bold">{kpi.score}</span>
                      <span className="text-sm text-muted-foreground">
                        /{kpi.max}
                      </span>
                    </div>
                  </div>
                  <Progress
                    value={(kpi.score / kpi.max) * 100}
                    className="h-2.5 bg-secondary"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3 border-b border-border/50 bg-secondary/10">
            <CardTitle className="text-lg flex items-center">
              <Award className="w-5 h-5 mr-2 text-amber-500" /> Overall Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
            <div className="w-24 h-24 rounded-full border-4 border-primary/20 flex items-center justify-center mb-4 relative shadow-inner">
              <div className="absolute inset-0 rounded-full border-4 border-primary border-l-transparent border-b-transparent rotate-45"></div>
              <span className="text-4xl font-black text-primary">4.6</span>
            </div>
            <h3 className="text-xl font-bold text-foreground">
              Exceeds Expectations
            </h3>
            <p className="text-sm text-muted-foreground mt-2 px-4">
              Top 10% performer in the Engineering department this quarter.
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 bg-secondary/50">
          <TabsTrigger value="overview">Goals & OKRs</TabsTrigger>
          <TabsTrigger value="history">Review History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border/50">
              <div>
                <CardTitle className="text-lg flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-500" /> Current
                  Objectives
                </CardTitle>
                <CardDescription>
                  Goals set for the H2 2026 period.
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsAdding(!isAdding)}
              >
                {isAdding ? (
                  'Cancel'
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" /> Add Goal
                  </>
                )}
              </Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {isAdding && (
                  <div className="p-4 rounded-xl border border-primary/50 bg-primary/5 space-y-3">
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Input
                        placeholder="Goal Title"
                        className="flex-1"
                        value={newGoal.title}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, title: e.target.value })
                        }
                      />
                      <Input
                        placeholder="Deadline (e.g. Q4 2026)"
                        className="w-full sm:w-40"
                        value={newGoal.deadline}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, deadline: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex items-center gap-3">
                      <select
                        className="bg-background border border-border rounded-md text-sm p-1.5 w-40"
                        value={newGoal.status}
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, status: e.target.value })
                        }
                      >
                        <option value="On Track">On Track</option>
                        <option value="At Risk">At Risk</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <Input
                        type="number"
                        className="w-24"
                        placeholder="Progress %"
                        value={newGoal.progress}
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            progress: Number(e.target.value),
                          })
                        }
                      />
                      <span className="text-sm font-bold text-muted-foreground">
                        %
                      </span>
                      <Button
                        size="sm"
                        onClick={saveNewGoal}
                        className="ml-auto"
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Save Goal
                      </Button>
                    </div>
                  </div>
                )}
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="p-4 rounded-xl border border-border/50 hover:border-primary/30 transition-colors bg-secondary/10 group"
                  >
                    {editingId === goal.id ? (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Input
                            className="flex-1"
                            value={editGoal.title}
                            onChange={(e) =>
                              setEditGoal({
                                ...editGoal,
                                title: e.target.value,
                              })
                            }
                          />
                          <Input
                            className="w-full sm:w-40"
                            value={editGoal.deadline}
                            onChange={(e) =>
                              setEditGoal({
                                ...editGoal,
                                deadline: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="flex items-center gap-3">
                          <select
                            className="bg-background border border-border rounded-md text-sm p-1.5 w-40"
                            value={editGoal.status}
                            onChange={(e) =>
                              setEditGoal({
                                ...editGoal,
                                status: e.target.value,
                              })
                            }
                          >
                            <option value="On Track">On Track</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Completed">Completed</option>
                          </select>
                          <Input
                            type="number"
                            className="w-24"
                            value={editGoal.progress}
                            onChange={(e) =>
                              setEditGoal({
                                ...editGoal,
                                progress: Number(e.target.value),
                              })
                            }
                          />
                          <span className="text-sm font-bold text-muted-foreground">
                            %
                          </span>
                          <div className="ml-auto flex gap-2">
                            <Button size="sm" onClick={saveEdit}>
                              <Save className="w-4 h-4 mr-2" /> Save
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingId(null)}
                            >
                              <X className="w-4 h-4 mr-2" /> Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                          <div>
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                              {goal.title}
                            </h4>
                            <p className="text-sm text-muted-foreground flex items-center mt-1">
                              Deadline: {goal.deadline}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant="outline"
                              className={
                                goal.status === 'Completed'
                                  ? 'bg-green-500/10 text-green-600 border-green-500/20'
                                  : goal.status === 'At Risk'
                                    ? 'bg-destructive/10 text-destructive border-destructive/20'
                                    : 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                              }
                            >
                              {goal.status}
                            </Badge>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  setEditingId(goal.id);
                                  setEditGoal(goal);
                                }}
                                className="h-8 w-8"
                              >
                                <Edit2 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteGoal(goal.id)}
                                className="h-8 w-8"
                              >
                                <Trash2 className="w-4 h-4 text-destructive hover:text-destructive/80" />
                              </Button>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Progress
                            value={goal.progress}
                            className={`h-2 flex-1 ${goal.status === 'At Risk' ? '[&>div]:bg-destructive' : goal.status === 'Completed' ? '[&>div]:bg-green-500' : ''}`}
                          />
                          <span className="text-xs font-bold w-8 text-right">
                            {goal.progress}%
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                ))}
                {goals.length === 0 && !isAdding && (
                  <div className="text-center py-8 text-muted-foreground bg-secondary/20 rounded-xl border border-dashed border-border">
                    No active goals. Add one to get started.
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <div className="space-y-4">
            {reviewHistory.length === 0 ? (
              <Card className="p-12 text-center text-muted-foreground bg-secondary/20 border-dashed">
                <Award className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-bold text-foreground mb-2">
                  Review Archive
                </h3>
                <p>Past performance reviews will appear here.</p>
              </Card>
            ) : (
              reviewHistory.map((review) => (
                <Card
                  key={review.id}
                  className="p-6 bg-card hover:border-primary/50 transition-colors border-border/50 shadow-sm group"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="text-xl font-bold">{review.period}</h4>
                        <Badge
                          className={
                            review.rating === 'Exceeds Expectations'
                              ? 'bg-primary text-white'
                              : review.rating === 'Meets Expectations'
                                ? 'bg-green-500/10 text-green-600 border-none'
                                : 'bg-secondary text-muted-foreground'
                          }
                        >
                          {review.rating}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        Manager: {review.manager}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-primary">
                        {review.score}
                      </div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold mt-1">
                        Final Score
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-secondary/30 rounded-xl border border-border/50">
                    <p className="text-sm leading-relaxed text-foreground/80 italic">
                      &quot;{review.notes}&quot;
                    </p>
                  </div>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
