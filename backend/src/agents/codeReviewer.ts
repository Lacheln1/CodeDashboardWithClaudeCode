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
  "analyzedFiles": <number>,
  "totalLines": <number>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "category": "<naming|complexity|duplication|comment|typescript|consistency>", "message": "<description>", "suggestion": "<fix>", "codeSnippet": "<code>"}],
  "summary": "<brief summary>",
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"]
}`;

export const codeReviewer: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze this repository:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agent: 'code-reviewer',
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
