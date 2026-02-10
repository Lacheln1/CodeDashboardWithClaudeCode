import { askClaude } from '../utils/claude';
import { loadPrompt } from '../utils/promptLoader';
import type { AgentFunction } from './types';

const SYSTEM_PROMPT = loadPrompt('code-reviewer');

export const codeReviewer: AgentFunction = async (input) => {
  const startTime = Date.now();
  const filesSummary = input.files.map((f) => `--- ${f.path} ---\n${f.content}`).join('\n\n');

  const response = await askClaude(SYSTEM_PROMPT, `Analyze this repository:\n\n${filesSummary}`);

  let parsed;
  try {
    parsed = JSON.parse(response);
  } catch {
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
  }

  if (!parsed) {
    return {
      agent: 'code-reviewer',
      score: 0,
      analyzedFiles: input.files.length,
      totalLines: 0,
      issues: [],
      summary: 'Failed to parse analysis response.',
      strengths: [],
      improvements: [],
      executionTime: Date.now() - startTime,
    };
  }

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
