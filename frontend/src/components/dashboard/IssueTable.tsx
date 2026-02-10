import { Card } from '../common/Card';
import { getSeverityBadgeClass } from '../../utils/formatters';
import type { AgentIssue } from '../../types/agent';

interface IssueTableProps {
  issues: AgentIssue[];
}

export const IssueTable = ({ issues }: IssueTableProps) => {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Issues</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border text-left text-text-secondary">
              <th className="pb-3 pr-4">File</th>
              <th className="pb-3 pr-4">Line</th>
              <th className="pb-3 pr-4">Severity</th>
              <th className="pb-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {issues.map((issue, index) => (
              <tr key={index} className="border-b border-border/50 hover:bg-bg-tertiary">
                <td className="py-3 pr-4 font-mono text-xs">{issue.file}</td>
                <td className="py-3 pr-4">{issue.line}</td>
                <td className="py-3 pr-4">
                  <span
                    className={`px-2 py-1 rounded text-xs border ${getSeverityBadgeClass(issue.severity)}`}
                  >
                    {issue.severity.toUpperCase()}
                  </span>
                </td>
                <td className="py-3 text-text-secondary">{issue.message}</td>
              </tr>
            ))}
            {issues.length === 0 && (
              <tr>
                <td colSpan={4} className="py-8 text-center text-text-muted">
                  No issues found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
