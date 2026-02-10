import { askClaude } from '../utils/claude';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = `You are a documentation quality expert. Analyze the provided code for:
- Missing or outdated documentation
- Unclear function/class descriptions
- Missing API documentation
- README completeness
- Inline comment quality

Return your analysis as JSON with this structure:
{
  "score": <0-100>,
  "issues": [{"file": "<path>", "line": <number>, "severity": "high"|"medium"|"low", "message": "<description>", "suggestion": "<fix>"}],
  "summary": "<brief summary>"
}`;

export const docWriter: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze documentation quality:\n\n${filesSummary}`);

  const parsed = JSON.parse(response);
  return {
    agentType: 'doc-writer',
    score: parsed.score,
    issues: parsed.issues,
    summary: parsed.summary,
    executionTime: Date.now() - startTime,
  };
};
