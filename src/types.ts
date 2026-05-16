export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface Option {
  id: string;
  text: string;
}

export interface Problem {
  title: string;
  difficulty: string;
  color: string;
  svg: string;
  story: string;
  question: string;
  options: Option[];
  correct: string;
  customVisual: string;
  explanation: string;
  hint: string;
}

export interface ProblemSet {
  easy: Problem;
  medium: Problem;
  hard: Problem;
}
