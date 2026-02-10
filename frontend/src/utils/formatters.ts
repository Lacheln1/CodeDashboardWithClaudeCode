export const formatScore = (score: number): string => {
  return `${Math.round(score)}/100`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

import type { Severity } from '../types/agent';

export const getSeverityColor = (severity: Severity): string => {
  const colors = {
    high: 'text-error',
    medium: 'text-warning',
    low: 'text-text-muted',
  };
  return colors[severity];
};

export const getSeverityBadgeClass = (severity: Severity): string => {
  const classes = {
    high: 'bg-error/10 text-error border-error',
    medium: 'bg-warning/10 text-warning border-warning',
    low: 'bg-gray-500/10 text-gray-400 border-gray-500',
  };
  return classes[severity];
};
