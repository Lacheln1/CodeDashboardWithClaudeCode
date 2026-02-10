import { codeReviewer } from './codeReviewer';
import { securityAuditor } from './securityAuditor';
import { performanceAnalyzer } from './performanceAnalyzer';
import { testGenerator } from './testGenerator';
import { docWriter } from './docWriter';
import type { AgentInput, AgentResult } from './types';

const agents = [codeReviewer, securityAuditor, performanceAnalyzer, testGenerator, docWriter];

export const runAllAgents = async (input: AgentInput): Promise<AgentResult[]> => {
  const results = await Promise.all(agents.map((agent) => agent(input)));
  return results;
};
