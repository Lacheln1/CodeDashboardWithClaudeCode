import { Card } from '../common/Card';

interface ScoreCardProps {
  label: string;
  score: number;
  icon: string;
}

export const ScoreCard = ({ label, score, icon }: ScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <Card className="flex flex-col items-center gap-2 text-center">
      <span className="text-2xl">{icon}</span>
      <span className="text-sm text-text-secondary">{label}</span>
      <span className={`text-3xl font-bold ${getScoreColor(score)}`}>{score}</span>
    </Card>
  );
};
