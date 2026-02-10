import { useParams } from 'react-router-dom';
import { Card } from '../components/common/Card';

export const AnalysisDetailPage = () => {
  const { agentType } = useParams<{ agentType: string }>();

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold capitalize">{agentType?.replace('-', ' ')} Report</h1>
      <Card>
        <p className="text-text-secondary">Detailed agent report will be displayed here.</p>
      </Card>
    </div>
  );
};
