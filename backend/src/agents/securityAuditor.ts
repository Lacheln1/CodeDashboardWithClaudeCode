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
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "message": "<description>", "suggestion": "<fix>"}],
  "summary": "<brief summary>"
}`;

export const securityAuditor: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Audit this code for security issues:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agentType: 'security-auditor',
    score: parsed.score,
    issues: parsed.issues,
    summary: parsed.summary,
    executionTime: Date.now() - startTime,
  };
};
