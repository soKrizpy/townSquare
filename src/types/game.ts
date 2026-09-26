export interface AvatarItem {
  id: string;
  name: string;
  category: 'hat' | 'visor' | 'hood' | 'headset';
  price: number;
  description: string;
  accentColor: string;
  iconType: 'hacker-cap' | 'wizard-hood' | 'cyber-cat' | 'rookie-band';
}

export interface StudentCoder {
  id: string;
  name: string;
  role: string;
  status: 'online' | 'offline';
  isUser?: boolean;
  equippedHatId: string | null;
  grade: string;
  bio: string;
  favoriteLanguages: { name: string; level: string; color: string }[];
  xp: number;
  level: number;
  streakDays: number;
  recentProject: {
    title: string;
    description: string;
    tech: string;
    codeSnippet?: string;
  };
}

export interface PetData {
  name: string;
  stage: 'EGG' | 'HATCHING' | 'BABY_DIGIMON';
  hatchProgress: number; // 0 to 100
  logicData: number;     // e.g. 35
  creativeData: number;  // e.g. 20
  spatialData: number;   // e.g. 10
}

export type FeedDataType = 'logic' | 'creative' | 'spatial';

export type QuestStatus = 'completed' | 'active' | 'locked';

export interface QuestNode {
  id: number;
  chapter: number;
  title: string;
  subtitle: string;
  status: QuestStatus;
  icon: string;
  xpReward: number;
  coinReward: number;
  dataFragmentReward: {
    type: FeedDataType;
    amount: number;
  };
  isBoss?: boolean;
}

export type AppRole = 'student' | 'teacher' | 'parent';

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface TeacherReport {
  sessionTitle: string;
  sessionNumber: number;
  attendance: { studentId: string; present: boolean }[];
  note: string;
  completedAt: string | null;
  competency: string;
}

