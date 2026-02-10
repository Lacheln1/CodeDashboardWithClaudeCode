import { ScoreCard } from '../components/dashboard/ScoreCard';
import { ChartSection } from '../components/dashboard/ChartSection';
import { IssueTable } from '../components/dashboard/IssueTable';
import { Card } from '../components/common/Card';
import type { AgentIssue } from '../types/agent';

// Placeholder data — will be replaced with real API data
const agentScores = [
  { label: 'Code Review', icon: '🔍', score: 85 },
  { label: 'Security', icon: '🔒', score: 70 },
  { label: 'Performance', icon: '⚡', score: 82 },
  { label: 'Test Coverage', icon: '🧪', score: 75 },
  { label: 'Documentation', icon: '📝', score: 68 },
];

const issuesByAgent = [
  { name: 'Code', count: 5 },
  { name: 'Security', count: 8 },
  { name: 'Perf', count: 3 },
  { name: 'Test', count: 6 },
  { name: 'Doc', count: 4 },
];

const issuesBySeverity = [
  { name: 'High', value: 6 },
  { name: 'Medium', value: 12 },
  { name: 'Low', value: 8 },
];

const sampleIssues: AgentIssue[] = [
  { file: 'utils/api.ts', line: 45, severity: 'high', message: 'Unvalidated user input in API call' },
  { file: 'Dashboard.tsx', line: 128, severity: 'medium', message: 'Missing error boundary' },
  { file: 'index.ts', line: 12, severity: 'low', message: 'Unused import statement' },
];

export const DashboardPage = () => {
  const overallScore = Math.round(agentScores.reduce((sum, a) => sum + a.score, 0) / agentScores.length);

  return (
    <div className="flex flex-col gap-6">
      <Card className="text-center">
        <h2 className="text-2xl font-semibold mb-2">Overall Score</h2>
        <p className="text-5xl font-bold text-accent">{overallScore}/100</p>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {agentScores.map((agent) => (
          <ScoreCard key={agent.label} {...agent} />
        ))}
      </div>

      <ChartSection issuesByAgent={issuesByAgent} issuesBySeverity={issuesBySeverity} />

      <IssueTable issues={sampleIssues} />
    </div>
  );
};
