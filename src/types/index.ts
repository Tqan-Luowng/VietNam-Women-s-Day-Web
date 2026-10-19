export interface QuizOption {
  text: string;
  reply: string;
  sticker?: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export interface MemberBadge {
  title: string;
  description: string;
}

export interface Member {
  id: string;
  name: string;
  callName: string;
  accentColor: string;
  stickers: string[];
  photo: string;
  backPhoto?: string;
  message: string;
  backNote?: string;
  quiz: QuizQuestion[];
  badge: MemberBadge;
}

export interface AppContent {
  generalLetter: string;
  members: Member[];
}

export type ScreenState = 'gate' | 'intro' | 'picker' | 'card' | 'quiz' | 'letter';

