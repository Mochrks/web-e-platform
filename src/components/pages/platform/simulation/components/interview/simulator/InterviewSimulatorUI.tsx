'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle,
  BookOpen,
} from 'lucide-react';
import StageIndicator from '../shared/StageIndicator';
import Timer from '../shared/Timer';
import VoiceInteraction from './VoiceInteraction';
import CodeEditor from './CodeEditor';
import { Question, CodeChallenge } from '@/data/interviewData';
import { useInterviewSimulatorHook, Answer } from './InterviewSimulatorHook';

interface InterviewSimulatorUIProps {
  onComplete: (answers: Answer[], overallScore: number) => void;
}

export default function InterviewSimulatorUI({
  onComplete,
}: InterviewSimulatorUIProps) {
  const {
    currentStage,
    currentQuestionIndex,
    currentAnswer,
    setCurrentAnswer,
    selectedLanguage,
    setSelectedLanguage,
    currentCode,
    setCurrentCode,
    codeOutput,
    isRunningCode,
    voiceTranscript,
    questions,
    currentQuestion,
    isLastQuestion,
    isLastStage,
    handleSubmitAnswer,
    handlePreviousQuestion,
    handleRunCode,
    handleResetCode,
    handleVoiceTranscript,
    handleRecordingComplete,
  } = useInterviewSimulatorHook(onComplete);

  const renderQuestion = () => {
    if (currentStage === 'coding') {
      const challenge = currentQuestion as CodeChallenge;
      return (
        <div className="space-y-6">
          <div className="bauhaus-card border-l-4 border-l-primary pt-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-3xl font-bold tracking-tight">
                {challenge.title}
              </h2>
              <div className="flex items-center gap-3">
                <span
                  className={`px-4 py-1.5 rounded-full font-bold uppercase text-xs tracking-wider
                  ${
                    challenge.difficulty === 'easy'
                      ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                      : challenge.difficulty === 'medium'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
                  }`}
                >
                  {challenge.difficulty}
                </span>
                <Timer totalSeconds={challenge.timeLimit} />
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {challenge.description}
            </p>
          </div>

          <CodeEditor
            language={selectedLanguage}
            initialCode={currentCode}
            onLanguageChange={setSelectedLanguage}
            onCodeChange={setCurrentCode}
            onRun={handleRunCode}
            onReset={handleResetCode}
            output={codeOutput}
            isRunning={isRunningCode}
          />
        </div>
      );
    }

    const question = currentQuestion as Question;

    return (
      <div className="space-y-6">
        <div className="bauhaus-card pt-8">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-primary/60">
              Stage: {currentStage}
            </h3>
            {question.timeLimit ? (
              <Timer totalSeconds={question.timeLimit} />
            ) : (
              <div className="h-2 w-24 bg-primary/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{
                    width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                  }}
                />
              </div>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl font-bold mb-10 leading-snug tracking-tight">
            {question?.text}
          </h2>

          <div className="space-y-8">
            {question?.type === 'voice' && (
              <div className="space-y-8">
                <div className="bg-muted/30 p-8 rounded-3xl border border-primary/10">
                  <VoiceInteraction
                    questionText={question.text}
                    onTranscriptChange={handleVoiceTranscript}
                    onRecordingComplete={handleRecordingComplete}
                    autoPlayQuestion={false}
                  />
                </div>

                <div className="space-y-4">
                  <label className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    Transcript Selection
                  </label>
                  <Textarea
                    value={currentAnswer}
                    onChange={(e) => setCurrentAnswer(e.target.value)}
                    placeholder="Capture your voice or type your response here..."
                    className="min-h-[200px] rounded-2xl border-primary/10 bg-muted/20 text-lg focus-visible:ring-primary/20 p-6"
                  />
                </div>
              </div>
            )}

            {question?.type === 'multiple-choice' && question.options && (
              <RadioGroup
                value={currentAnswer}
                onValueChange={setCurrentAnswer}
                className="grid grid-cols-1 gap-4"
              >
                {question.options.map((option) => (
                  <Label
                    key={option.id}
                    htmlFor={option.id}
                    className={`
                      relative flex items-center p-6 rounded-2xl border-2 cursor-pointer transition-all duration-200
                      ${
                        currentAnswer === option.id
                          ? 'border-primary bg-primary/5 shadow-md scale-[1.01]'
                          : 'border-border hover:border-primary/20 hover:bg-muted/50'
                      }
                    `}
                  >
                    <RadioGroupItem
                      value={option.id}
                      id={option.id}
                      className="sr-only"
                    />
                    <div
                      className={`
                      w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                      ${currentAnswer === option.id ? 'border-primary bg-primary' : 'border-muted'}
                    `}
                    >
                      {currentAnswer === option.id && (
                        <div className="w-2 h-2 rounded-full bg-white transition-transform scale-110" />
                      )}
                    </div>
                    <span
                      className={`text-base font-medium ${currentAnswer === option.id ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {option.text}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
            )}

            {question?.type === 'text' && (
              <Textarea
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Type your detailed response here..."
                className="min-h-[250px] rounded-2xl border-primary/10 bg-muted/20 text-lg focus-visible:ring-primary/20 p-8"
              />
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-10">
      <div className="bg-card border border-border p-10 rounded-3xl shadow-sm relative overflow-hidden">
        <div className="flex items-center gap-2 mb-4 text-primary text-[10px] font-black uppercase tracking-[0.2em]">
          <BookOpen className="w-4 h-4" />
          Learning Path
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          {currentStage.charAt(0).toUpperCase() + currentStage.slice(1)} Session
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl font-medium leading-relaxed">
          Focus on your response. Our AI will analyze your tone, content, and
          confidence in real-time.
        </p>
      </div>

      <div className="animate-slide-up pb-10">{renderQuestion()}</div>

      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl z-[100]">
        <div className="bg-white/80 dark:bg-card/80 backdrop-blur-2xl border border-primary/10 p-4 rounded-3xl shadow-2xl shadow-primary/10">
          <div className="flex items-center justify-between gap-4">
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
              variant="ghost"
              className="rounded-2xl px-6 h-12 font-bold hover:bg-primary/5 hover:text-primary transition-all"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Previous</span>
            </Button>

            <div className="flex items-center gap-4">
              <div className="text-xs font-black text-muted-foreground bg-muted/30 px-3 py-2 rounded-lg">
                Q{currentQuestionIndex + 1} / {questions.length}
              </div>
            </div>

            <Button
              onClick={handleSubmitAnswer}
              disabled={
                !currentAnswer && !voiceTranscript && currentStage !== 'coding'
              }
              className="rounded-2xl bg-primary hover:bg-primary/90 text-white px-8 h-12 font-black shadow-lg shadow-primary/10 transition-all hover:scale-105 active:scale-95"
            >
              {isLastQuestion && isLastStage ? (
                <>Finish Simulation</>
              ) : isLastQuestion ? (
                <>
                  Next Module <ArrowRight className="w-4 h-4 ml-2" />
                </>
              ) : (
                <>
                  Next Question <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="h-24" />
    </div>
  );
}
