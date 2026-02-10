import type { AgentResult, Severity } from './agent';

/** 분석 요청 페이로드 */
export interface AnalysisRequest {
  /** 분석할 GitHub 저장소 URL */
  repoUrl: string;
}

/** 분석 응답 (전체 결과) */
export interface AnalysisResponse {
  /** 분석 고유 ID */
  id: string;
  /** 분석 대상 GitHub 저장소 URL */
  repoUrl: string;
  /** 전체 통합 점수 (0-100, 에이전트 평균) */
  overallScore: number;
  /** 각 에이전트의 분석 결과 배열 */
  results: AgentResult[];
  /** 분석 요청 시각 (ISO 8601) */
  createdAt: string;
  /** 분석 완료 시각 (ISO 8601) */
  completedAt?: string;
  /** 분석 진행 상태 */
  status: 'pending' | 'running' | 'completed' | 'error';
}

/** 분석 결과 통계 요약 */
export interface AnalysisSummary {
  /** 발견된 전체 이슈 수 */
  totalIssues: number;
  /** high 심각도 이슈 수 */
  highSeverity: number;
  /** medium 심각도 이슈 수 */
  mediumSeverity: number;
  /** low 심각도 이슈 수 */
  lowSeverity: number;
  /** 분석된 파일 수 */
  analyzedFiles: number;
  /** 분석된 총 라인 수 */
  totalLines: number;
}

/** 심각도별 이슈 분포 (파이 차트용) */
export interface IssueBySeverity {
  /** 심각도 이름 */
  name: Severity;
  /** 해당 심각도의 이슈 수 */
  value: number;
}

/** 에이전트별 이슈 분포 (바 차트용) */
export interface IssueByAgent {
  /** 에이전트 표시 이름 */
  name: string;
  /** 해당 에이전트가 발견한 이슈 수 */
  count: number;
}
