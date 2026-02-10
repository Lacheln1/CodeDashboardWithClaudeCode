import { askClaude } from '../utils/claude';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = `You are a code review expert. Analyze the provided code for:
- Code quality and readability
- Design patterns and best practices
- Naming conventions
- Code duplication
- Error handling

Return your analysis as JSON with this structure:
{
  "score": <0-100>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "message": "<description>", "suggestion": "<fix>"}],
  "summary": "<brief summary>"
}`;

export const codeReviewer: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze this repository:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agentType: 'code-reviewer',
    score: parsed.score,
    issues: parsed.issues,
    summary: parsed.summary,
    executionTime: Date.now() - startTime,
  };
};
