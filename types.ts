export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  SYLLABUS = 'SYLLABUS',
  MODULES = 'MODULES',
  ASSIGNMENTS = 'ASSIGNMENTS',
  AI_TA = 'AI_TA'
}

export interface Assignment {
  id: string;
  title: string;
  dueDate: string;
  points: number;
  status: 'Pending' | 'Submitted' | 'Graded' | 'Overdue';
}

export interface Module {
  week: number;
  title: string;
  description: string;
  topics: string[];
  resources: { title: string; type: 'pdf' | 'video' | 'link' }[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface GradeData {
  assignment: string;
  avg: number;
  yours: number;
}