import { Router } from 'express';
import { runAllAgents } from '../agents';
import { parseRepoUrl, getRepoFiles } from '../utils/github';
import type { AnalysisRequest, AnalysisResponse } from '../types/api';

export const analysisRouter = Router();

const analyses = new Map<string, AnalysisResponse>();

analysisRouter.post('/', async (req, res) => {
  try {
    const { repoUrl } = req.body as AnalysisRequest;
    const { owner, repo } = parseRepoUrl(repoUrl);
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

    const analysis: AnalysisResponse = {
      id,
      repoUrl,
      overallScore: 0,
      results: [],
      createdAt: new Date().toISOString(),
      status: 'running',
    };
    analyses.set(id, analysis);
    res.json(analysis);

    const files = await getRepoFiles(owner, repo);
    const results = await runAllAgents({ repoUrl, files });
    const overallScore = Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length);

    const completed: AnalysisResponse = {
      ...analysis,
      results,
      overallScore,
      completedAt: new Date().toISOString(),
      status: 'completed',
    };
    analyses.set(id, completed);
  } catch (error) {
    console.error('Analysis failed:', error);
    res.status(500).json({ error: 'Analysis failed' });
  }
});

analysisRouter.get('/:id', (req, res) => {
  const analysis = analyses.get(req.params.id);
  if (!analysis) {
    res.status(404).json({ error: 'Analysis not found' });
    return;
  }
  res.json(analysis);
});
