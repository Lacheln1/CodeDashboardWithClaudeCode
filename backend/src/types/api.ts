import type { AgentResult } from '../agents/types';

export interface AnalysisRequest {
  repoUrl: string;
}

export interface AnalysisResponse {
  id: string;
  repoUrl: string;
  overallScore: number;
  results: AgentResult[];
  createdAt: string;
  completedAt?: string;
  status: 'pending' | 'running' | 'completed' | 'error';
}
