export type AgentStatus = 'idle' | 'running' | 'completed' | 'error';

export type AgentType =
  | 'code-reviewer'
  | 'security-auditor'
  | 'performance-analyzer'
  | 'test-generator'
  | 'doc-writer';

export interface AgentInfo {
  type: AgentType;
  name: string;
  description: string;
  icon: string;
  status: AgentStatus;
}

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
