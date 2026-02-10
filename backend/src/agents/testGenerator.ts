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
  "analyzedFiles": <number>,
  "totalLines": <number>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "category": "testing", "message": "<description>", "suggestion": "<fix>", "codeSnippet": "<code>"}],
  "summary": "<brief summary>",
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"]
}`;

export const testGenerator: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze test coverage for:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agent: 'test-generator',
    score: parsed.score,
    analyzedFiles: parsed.analyzedFiles,
    totalLines: parsed.totalLines,
    issues: parsed.issues,
    summary: parsed.summary,
    strengths: parsed.strengths,
    improvements: parsed.improvements,
    executionTime: Date.now() - startTime,
  };
};
