import { askClaude } from '../utils/claude';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = `You are a test coverage analysis expert. Analyze the provided code for:
- Test coverage gaps
- Missing edge case tests
- Untested error paths
- Integration test needs
- Mock/stub opportunities

Return your analysis as JSON with this structure:
{
  "score": <0-100>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "message": "<description>", "suggestion": "<fix>"}],
  "summary": "<brief summary>"
}`;

export const testGenerator: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze test coverage for:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agentType: 'test-generator',
    score: parsed.score,
    issues: parsed.issues,
    summary: parsed.summary,
    executionTime: Date.now() - startTime,
  };
};
