import type { AgentResult } from './agent';

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

export interface AnalysisSummary {
  totalIssues: number;
  highSeverity: number;
  mediumSeverity: number;
  lowSeverity: number;
}
