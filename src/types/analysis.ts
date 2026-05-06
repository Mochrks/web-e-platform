export interface VoiceAnalysis {
  clarity: number; // 0-100
  confidence: number; // 0-100
  pace: number; // words per minute
  tone: 'professional' | 'casual' | 'nervous' | 'confident';
  wordCount: number;
  duration: number; // in seconds
}

export interface AnswerEvaluation {
  score: number; // 0-100
  keywordMatch: number; // percentage of keywords found
  depth: number; // 0-100 based on length and detail
  relevance: number; // 0-100
  feedback: string;
  matchedKeywords: string[];
  missedKeywords: string[];
}

export interface CodeEvaluation {
  score: number; // 0-100
  correctness: number; // 0-100
  efficiency: number; // 0-100
  readability: number; // 0-100
  bestPractices: number; // 0-100
  feedback: string;
  testsPassed: number;
  totalTests: number;
}
