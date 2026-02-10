import { codeReviewer } from './codeReviewer';
import { securityAuditor } from './securityAuditor';
import { performanceAnalyzer } from './performanceAnalyzer';
import { testGenerator } from './testGenerator';
import { docWriter } from './docWriter';
import type { AgentInput, AgentResult } from './types';
import { getMockAnalysisResponse } from '../utils/mockData';

const USE_MOCK = process.env.USE_MOCK === 'true';

const agents = [codeReviewer, securityAuditor, performanceAnalyzer, testGenerator, docWriter];

export const runAllAgents = async (input: AgentInput): Promise<AgentResult[]> => {
  if (USE_MOCK) {
    const mock = getMockAnalysisResponse(input.repoUrl);
    return mock.results;
  }

  const results = await Promise.all(agents.map((agent) => agent(input)));
  return results;
};
