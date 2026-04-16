'use client';

import { useState, useEffect } from 'react';
import {
  InterviewStage,
  Question,
  CodeChallenge,
  ProgrammingLanguage,
  behavioralQuestions,
  technicalQuestions,
  codingChallenges,
  finalQuestions,
} from '@/data/interviewData';
import {
  evaluateAnswer,
  analyzeVoiceResponse,
  evaluateCode,
} from '@/lib/interviewUtils';

export interface Answer {
  questionId: string;
  answer: string;
  score: number;
  feedback: string;
  duration?: number;
  voiceAnalysis?: any;
  codeEvaluation?: any;
}

export const useInterviewSimulatorHook = (
  onComplete: (answers: Answer[], overallScore: number) => void
) => {
  const [currentStage, setCurrentStage] =
    useState<InterviewStage>('behavioral');
  const [completedStages, setCompletedStages] = useState<InterviewStage[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [selectedLanguage, setSelectedLanguage] =
    useState<ProgrammingLanguage>('javascript');
  const [currentCode, setCurrentCode] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [recordingDuration, setRecordingDuration] = useState(0);

  const getCurrentQuestions = (): (Question | CodeChallenge)[] => {
    switch (currentStage) {
      case 'behavioral':
        return behavioralQuestions.slice(0, 5);
      case 'technical':
        return technicalQuestions.slice(0, 5);
      case 'coding':
        return codingChallenges.slice(0, 2);
      case 'final':
        return finalQuestions.slice(0, 5);
      default:
        return [];
    }
  };

  const questions = getCurrentQuestions();
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isLastStage = currentStage === 'final';

  useEffect(() => {
    if (currentStage === 'coding' && 'starterCode' in (currentQuestion || {})) {
      const challenge = currentQuestion as CodeChallenge;
      setCurrentCode(challenge.starterCode[selectedLanguage]);
    }
  }, [currentQuestionIndex, selectedLanguage, currentStage, currentQuestion]);

  const resetCurrentAnswer = () => {
    setCurrentAnswer('');
    setVoiceTranscript('');
    setRecordingDuration(0);
    setCodeOutput('');
  };

  const handleCompleteStage = () => {
    const newCompletedStages = [...completedStages, currentStage];
    setCompletedStages(newCompletedStages);

    const stageOrder: InterviewStage[] = [
      'behavioral',
      'technical',
      'coding',
      'final',
    ];
    const currentIndex = stageOrder.indexOf(currentStage);

    if (currentIndex < stageOrder.length - 1) {
      setCurrentStage(stageOrder[currentIndex + 1]);
      setCurrentQuestionIndex(0);
      resetCurrentAnswer();
    } else {
      const overallScore = Math.round(
        answers.reduce((sum, a) => sum + a.score, 0) / answers.length
      );
      onComplete(answers, overallScore);
    }
  };

  const handleSubmitAnswer = () => {
    const question = currentQuestion as Question;
    let answerText = currentAnswer;
    let evaluation: any;
    let voiceAnalysis: any;
    let codeEval: any;

    if (question.type === 'voice' && voiceTranscript) {
      answerText = voiceTranscript;
      voiceAnalysis = analyzeVoiceResponse(voiceTranscript, recordingDuration);
    }

    if (currentStage === 'coding') {
      const challenge = currentQuestion as CodeChallenge;
      const testsPassed = Math.floor(
        Math.random() * (challenge.testCases.length + 1)
      );
      codeEval = evaluateCode(
        currentCode,
        testsPassed,
        challenge.testCases.length
      );
      evaluation = codeEval;
    } else if (question.type === 'multiple-choice') {
      const correctOption = question.options?.find((opt) => opt.isCorrect);
      const isCorrect = currentAnswer === correctOption?.id;
      evaluation = {
        score: isCorrect ? 100 : 0,
        feedback: isCorrect
          ? 'Correct!'
          : `Incorrect. The correct answer is: ${correctOption?.text}`,
      };
    } else {
      evaluation = evaluateAnswer(answerText, question.keywords || []);
    }

    const answer: Answer = {
      questionId: question.id,
      answer: answerText,
      score: evaluation.score,
      feedback: evaluation.feedback,
      duration: recordingDuration,
      voiceAnalysis,
      codeEvaluation: codeEval,
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (isLastQuestion) {
      // Small delay to ensure state update or passed directly
      setCompletedStages([...completedStages, currentStage]);
      const stageOrder: InterviewStage[] = [
        'behavioral',
        'technical',
        'coding',
        'final',
      ];
      const currentIndex = stageOrder.indexOf(currentStage);

      if (currentIndex < stageOrder.length - 1) {
        setCurrentStage(stageOrder[currentIndex + 1]);
        setCurrentQuestionIndex(0);
        resetCurrentAnswer();
      } else {
        const overallScore = Math.round(
          newAnswers.reduce((sum, a) => sum + a.score, 0) / newAnswers.length
        );
        onComplete(newAnswers, overallScore);
      }
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      resetCurrentAnswer();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRunCode = (code: string) => {
    setIsRunningCode(true);
    setCodeOutput('Running code...\n');

    setTimeout(() => {
      // Mock execution
      setCodeOutput('Mock output from ' + selectedLanguage);
      setIsRunningCode(false);
    }, 500);
  };

  const handleResetCode = () => {
    if ('starterCode' in (currentQuestion || {})) {
      const challenge = currentQuestion as CodeChallenge;
      setCurrentCode(challenge.starterCode[selectedLanguage]);
      setCodeOutput('');
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    setVoiceTranscript(transcript);
    setCurrentAnswer(transcript);
  };

  const handleRecordingComplete = (transcript: string, duration: number) => {
    setRecordingDuration(duration);
  };

  return {
    currentStage,
    completedStages,
    currentQuestionIndex,
    answers,
    currentAnswer,
    setCurrentAnswer,
    selectedLanguage,
    setSelectedLanguage,
    currentCode,
    setCurrentCode,
    codeOutput,
    isRunningCode,
    voiceTranscript,
    recordingDuration,
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
  };
};
