import { askClaude } from '../utils/claude';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = `You are a performance analysis expert. Analyze the provided code for:
- Algorithm complexity issues
- Memory leaks
- Unnecessary re-renders (for React)
- N+1 query problems
- Bundle size concerns

Return your analysis as JSON with this structure:
{
  "score": <0-100>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "message": "<description>", "suggestion": "<fix>"}],
  "summary": "<brief summary>"
}`;

export const performanceAnalyzer: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze performance of this code:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agentType: 'performance-analyzer',
    score: parsed.score,
    issues: parsed.issues,
    summary: parsed.summary,
    executionTime: Date.now() - startTime,
  };
};
