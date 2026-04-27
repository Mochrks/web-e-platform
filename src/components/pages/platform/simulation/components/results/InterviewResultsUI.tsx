'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Trophy,
  Star,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Brain,
  Mic,
  Code,
  Download,
  FileText,
  FileSpreadsheet,
  FileCode,
  Globe,
} from 'lucide-react';
import { Answer } from '../simulator/InterviewSimulatorHook';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  InterviewReport,
  downloadPDF,
  downloadExcel,
  downloadCSV,
  downloadDOCX,
  getReportFilename,
} from '@/lib/reportExport';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface InterviewResultsUIProps {
  answers: Answer[];
  overallScore: number;
  onRestart: () => void;
}

export default function InterviewResultsUI({
  answers,
  overallScore,
  onRestart,
}: InterviewResultsUIProps) {
  // Calculate analytics
  const analytics = React.useMemo(() => {
    const voiceAnswers = answers.filter((a) => a.voiceAnalysis);
    const textAnswers = answers.filter((a) => a.depth !== undefined);

    const avgClarity =
      voiceAnswers.length > 0
        ? Math.round(
            voiceAnswers.reduce(
              (sum, a) => sum + (a.voiceAnalysis?.clarity || 0),
              0
            ) / voiceAnswers.length
          )
        : 0;

    const avgConfidence =
      voiceAnswers.length > 0
        ? Math.round(
            voiceAnswers.reduce(
              (sum, a) => sum + (a.voiceAnalysis?.confidence || 0),
              0
            ) / voiceAnswers.length
          )
        : 0;

    const avgDepth =
      textAnswers.length > 0
        ? Math.round(
            textAnswers.reduce((sum, a) => sum + (a.depth || 0), 0) /
              textAnswers.length
          )
        : 0;

    const avgKeywordMatch =
      textAnswers.length > 0
        ? Math.round(
            textAnswers.reduce((sum, a) => sum + (a.keywordMatch || 0), 0) /
              textAnswers.length
          )
        : 0;

    return {
      clarity: avgClarity,
      confidence: avgConfidence,
      depth: avgDepth,
      keywordMatch: avgKeywordMatch,
    };
  }, [answers]);

  const chartData = [
    { subject: 'Clarity', A: analytics.clarity, fullMark: 100 },
    { subject: 'Confidence', A: analytics.confidence, fullMark: 100 },
    { subject: 'Depth', A: analytics.depth, fullMark: 100 },
    { subject: 'Keywords', A: analytics.keywordMatch, fullMark: 100 },
    { subject: 'Overall', A: overallScore, fullMark: 100 },
  ];

  const handleExport = async (format: 'pdf' | 'xlsx' | 'csv' | 'docx') => {
    const report: InterviewReport = {
      userProfile: {
        name: 'Employee Candidate',
        email: 'candidate@mochrks.com',
        date: new Date().toLocaleDateString(),
        position: 'Applied Position',
      },
      stages: [
        {
          stage: 'Complete Simulation',
          score: overallScore,
          questions: answers.map((a, i) => ({
            question: `Question ${i + 1}`,
            answer: a.answer,
            score: a.score,
            feedback: a.feedback,
          })),
        },
      ],
      overallScore,
      strengths:
        overallScore >= 80
          ? [
              'Strong technical communication',
              'Consistent pace and clarity',
              'High relevance to key concepts',
            ]
          : [
              'Demonstrates base understanding',
              'Professional tone during voice',
            ],
      weaknesses:
        overallScore < 70
          ? [
              'Needs more technical depth',
              'Clarity could be improved in complex topics',
            ]
          : ['Could provide more specific examples'],
      recommendations: [
        'Review core architectural patterns',
        'Practice structured communication (STAR method)',
        'Enhance keyword coverage for faster evaluation',
      ],
    };

    const filename = getReportFilename(format);

    switch (format) {
      case 'pdf':
        downloadPDF(report, filename);
        break;
      case 'xlsx':
        downloadExcel(report, filename);
        break;
      case 'csv':
        downloadCSV(report, filename);
        break;
      case 'docx':
        await downloadDOCX(report, filename);
        break;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 60) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getPerformanceLabel = (score: number) => {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Strong';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Competent';
    return 'Developing';
  };

  return (
    <div className="space-y-16 animate-fade-in pb-20">
      {/* Hero Section */}
      <div className="min-h-[40vh] flex flex-col items-center justify-center text-center space-y-8 bg-card border border-border p-12 rounded-[3.5rem] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0" />

        <div className="relative">
          <div className="w-32 h-32 rounded-3xl bg-primary/10 flex items-center justify-center text-primary animate-bounce-subtle">
            <Trophy className="w-16 h-16" />
          </div>
          <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-xl shadow-lg rotate-12">
            <Star className="w-5 h-5 fill-current" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-black text-primary uppercase tracking-[0.3em]">
            Simulation Complete
          </p>
          <h1 className="text-5xl font-black tracking-tighter">
            Overall Performance
          </h1>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span
            className={`text-[120px] font-black leading-none tracking-tighter ${getScoreColor(overallScore)}`}
          >
            {overallScore}%
          </span>
          <span className="text-xl font-black uppercase tracking-widest opacity-60">
            {getPerformanceLabel(overallScore)}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button
            onClick={onRestart}
            className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-lg gap-3 shadow-xl shadow-primary/20 hover:scale-105 transition-all"
          >
            <RefreshCcw className="w-5 h-5" /> Start New Simulation
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-16 px-10 rounded-2xl font-black text-lg gap-3 border-2 hover:bg-muted transition-all"
              >
                <Download className="w-5 h-5" /> Export Report
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="p-4 rounded-3xl border-2 min-w-[220px] bg-card/80 backdrop-blur-xl"
            >
              <DropdownMenuItem
                onClick={() => handleExport('pdf')}
                className="flex items-center gap-3 p-3 rounded-2xl font-bold cursor-pointer hover:bg-primary/10"
              >
                <FileText className="w-5 h-5 text-rose-500" />
                <span>PDF Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport('xlsx')}
                className="flex items-center gap-3 p-3 rounded-2xl font-bold cursor-pointer hover:bg-emerald-500/10"
              >
                <FileSpreadsheet className="w-5 h-5 text-emerald-500" />
                <span>Excel Sheet</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport('docx')}
                className="flex items-center gap-3 p-3 rounded-2xl font-bold cursor-pointer hover:bg-blue-500/10"
              >
                <FileCode className="w-5 h-5 text-blue-500" />
                <span>Word Document</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleExport('csv')}
                className="flex items-center gap-3 p-3 rounded-2xl font-bold cursor-pointer hover:bg-amber-500/10"
              >
                <Globe className="w-5 h-5 text-amber-500" />
                <span>CSV (Plain Text)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            className="h-16 px-10 rounded-2xl font-black text-lg gap-3 opacity-60 hover:opacity-100 transition-all"
            onClick={() =>
              document
                .getElementById('analytics-dashboard')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            <TrendingUp className="w-5 h-5" /> Detailed Analytics
          </Button>
        </div>
      </div>

      {/* Analytics Dashboard */}
      <div id="analytics-dashboard" className="space-y-10">
        <div className="flex items-center justify-between border-b border-border pb-6">
          <h2 className="text-4xl font-black tracking-tight">
            Analytical <span className="text-primary italic">Deep-Dive</span>
          </h2>
          <div className="bg-primary/5 px-4 py-2 rounded-full border border-primary/10 text-xs font-black uppercase tracking-widest text-primary">
            AI-Generated Insights
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Chart Section */}
          <Card className="lg:col-span-7 p-10 rounded-[3rem] border-border bg-card/50 shadow-sm overflow-hidden min-h-[450px]">
            <h3 className="text-xl font-black mb-8 px-4 border-l-4 border-primary">
              Skill Distribution
            </h3>
            <div className="w-full h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={chartData}
                >
                  <PolarGrid strokeOpacity={0.1} />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fill: 'currentColor',
                      fontSize: 12,
                      fontWeight: 800,
                    }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={false}
                    axisLine={false}
                  />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#CCFF00"
                    fill="#CCFF00"
                    fillOpacity={0.5}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      borderRadius: '16px',
                      border: 'none',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Stats Grid Section */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: 'Communication',
                value: analytics.clarity,
                icon: Mic,
                color: 'text-blue-500',
                bg: 'bg-blue-500/10',
                desc: 'Speech clarity & tempo',
              },
              {
                label: 'Confidence',
                value: analytics.confidence,
                icon: Star,
                color: 'text-amber-500',
                bg: 'bg-amber-500/10',
                desc: 'Delivery steady & bold',
              },
              {
                label: 'Technical Depth',
                value: analytics.depth,
                icon: Brain,
                color: 'text-purple-500',
                bg: 'bg-purple-500/10',
                desc: 'Detail in explanations',
              },
              {
                label: 'Relevance',
                value: analytics.keywordMatch,
                icon: CheckCircle2,
                color: 'text-emerald-500',
                bg: 'bg-emerald-500/10',
                desc: 'Key concept alignment',
              },
            ].map((item, i) => (
              <Card
                key={i}
                className="p-8 rounded-3xl border-border bg-card hover:bg-muted/50 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div
                    className={`w-12 h-12 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center`}
                  >
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">
                      {item.label}
                    </p>
                    <p className="text-3xl font-black">{item.value}%</p>
                  </div>
                </div>
                <p className="text-[10px] font-bold text-muted-foreground mt-4 opacity-60 uppercase">
                  {item.desc}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Question Breakdown */}
      <div className="space-y-8">
        <h2 className="text-3xl font-black tracking-tight underline decoration-primary/30 underline-offset-8">
          Question Breakdown
        </h2>
        <div className="grid grid-cols-1 gap-8">
          {answers.map((answer, index) => (
            <Card
              key={index}
              className="p-10 rounded-[2.5rem] border-border bg-card shadow-sm hover:shadow-xl transition-all group overflow-hidden relative"
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 opacity-[0.03] transition-transform group-hover:scale-110`}
              >
                {answer.codeEvaluation ? (
                  <Code className="w-full h-full" />
                ) : answer.voiceAnalysis ? (
                  <Mic className="w-full h-full" />
                ) : (
                  <Brain className="w-full h-full" />
                )}
              </div>
              <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-2xl shadow-sm ${answer.score >= 70 ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-600 border border-rose-500/20'}`}
                >
                  {answer.score}
                </div>
                <div className="flex-1 space-y-6">
                  <div>
                    <h3 className="text-xl font-black tracking-tight mb-2">
                      Question {index + 1}
                    </h3>
                    <p className="text-lg text-muted-foreground font-medium leading-relaxed italic">
                      &quot;{answer.answer.substring(0, 200)}
                      {answer.answer.length > 200 ? '...' : ''}&quot;
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {answer.depth !== undefined && (
                      <div className="bg-muted/30 p-4 rounded-2xl">
                        <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-1">
                          Depth
                        </p>
                        <p className="text-lg font-black">{answer.depth}%</p>
                      </div>
                    )}
                    {answer.voiceAnalysis && (
                      <>
                        <div className="bg-muted/30 p-4 rounded-2xl">
                          <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-1">
                            Clarity
                          </p>
                          <p className="text-lg font-black">
                            {answer.voiceAnalysis.clarity}%
                          </p>
                        </div>
                        <div className="bg-muted/30 p-4 rounded-2xl">
                          <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-1">
                            Confidence
                          </p>
                          <p className="text-lg font-black">
                            {answer.voiceAnalysis.confidence}%
                          </p>
                        </div>
                      </>
                    )}
                    {answer.codeEvaluation && (
                      <div className="bg-muted/30 p-4 rounded-2xl">
                        <p className="text-[10px] font-black uppercase tracking-tighter text-muted-foreground mb-1">
                          Code Score
                        </p>
                        <p className="text-lg font-black">
                          {answer.codeEvaluation.score}%
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="p-6 rounded-2xl bg-muted/50 border border-border space-y-4">
                    <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-primary">
                      <AlertCircle className="w-4 h-4" /> Mentor Feedback
                    </div>
                    <p className="text-sm font-bold leading-relaxed">
                      {answer.feedback}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
