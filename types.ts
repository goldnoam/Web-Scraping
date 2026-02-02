
export enum ToolDifficulty {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced'
}

export interface ScraperTool {
  id: string;
  name: string;
  description: string;
  difficulty: ToolDifficulty;
  priceModel: string;
  url: string;
  features: string[];
}

export interface Lesson {
  id: string;
  title: string;
  summary: string;
  content: string;
  codeSnippet?: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}