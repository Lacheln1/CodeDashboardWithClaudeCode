export type AgentType =
  | 'code-reviewer'
  | 'security-auditor'
  | 'performance-analyzer'
  | 'test-generator'
  | 'doc-writer';

export interface AgentResult {
  agentType: AgentType;
  score: number;
  issues: AgentIssue[];
  summary: string;
  executionTime: number;
}

export interface AgentIssue {
  file: string;
  line: number;
  severity: 'high' | 'medium' | 'low';
  message: string;
  suggestion?: string;
}

export interface AgentInput {
  repoUrl: string;
  files: FileContent[];
}

export interface FileContent {
  path: string;
  content: string;
}

export type AgentFunction = (input: AgentInput) => Promise<AgentResult>;
