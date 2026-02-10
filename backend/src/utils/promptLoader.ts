import { readFileSync } from 'fs';
import { join } from 'path';
import type { AgentType } from '../types/agent';

const PROMPTS_DIR = join(__dirname, '..', 'prompts');

export const loadPrompt = (agentType: AgentType): string => {
  const filePath = join(PROMPTS_DIR, `${agentType}.md`);
  return readFileSync(filePath, 'utf-8');
};
