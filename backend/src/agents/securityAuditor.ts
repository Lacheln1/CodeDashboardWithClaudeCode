import { askClaude } from '../utils/claude';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = `You are a security audit expert. Analyze the provided code for:
- OWASP Top 10 vulnerabilities
- Input validation issues
- Authentication/authorization flaws
- Sensitive data exposure
- Injection vulnerabilities

Return your analysis as JSON with this structure:
{
  "score": <0-100>,
  "analyzedFiles": <number>,
  "totalLines": <number>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "category": "security", "message": "<description>", "suggestion": "<fix>", "codeSnippet": "<code>"}],
  "summary": "<brief summary>",
  "strengths": ["<strength1>", "<strength2>"],
  "improvements": ["<improvement1>", "<improvement2>"]
}`;

export const securityAuditor: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Audit this code for security issues:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agent: 'security-auditor',
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
