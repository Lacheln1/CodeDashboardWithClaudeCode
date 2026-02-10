/** 에이전트의 현재 실행 상태 */
export type AgentStatus = 'idle' | 'running' | 'completed' | 'error';

/**
 * 5개 전문 분석 에이전트 유형
 * - `code-reviewer`: 코드 품질 및 가독성 검토
 * - `security-auditor`: 보안 취약점 분석
 * - `performance-analyzer`: 성능 병목 분석
 * - `test-generator`: 테스트 커버리지 분석
 * - `doc-writer`: 문서 완성도 분석
 */
export type AgentType =
  | 'code-reviewer'
  | 'security-auditor'
  | 'performance-analyzer'
  | 'test-generator'
  | 'doc-writer';

/**
 * 이슈 심각도
 * - `high`: 버그 가능성, 성능 저하, 보안 위험
 * - `medium`: 가독성 저하, 유지보수 어려움
 * - `low`: 스타일 불일치, 미세한 개선사항
 */
export type Severity = 'high' | 'medium' | 'low';

/** 이슈 분류 카테고리 */
export type IssueCategory =
  | 'naming'
  | 'complexity'
  | 'duplication'
  | 'comment'
  | 'typescript'
  | 'consistency'
  | 'security'
  | 'performance'
  | 'testing'
  | 'documentation';

/** 에이전트가 발견한 개별 이슈 */
export interface AgentIssue {
  /** 이슈가 발견된 파일 경로 */
  file: string;
  /** 이슈가 발견된 라인 번호 */
  line: number;
  /** 이슈 심각도 */
  severity: Severity;
  /** 이슈 분류 카테고리 */
  category: IssueCategory;
  /** 이슈 설명 메시지 */
  message: string;
  /** 개선 제안 */
  suggestion: string;
  /** 관련 코드 스니펫 */
  codeSnippet?: string;
}

/** 단일 에이전트의 분석 결과 */
export interface AgentResult {
  /** 분석을 수행한 에이전트 유형 */
  agent: AgentType;
  /** 분석 점수 (0-100) */
  score: number;
  /** 분석한 파일 수 */
  analyzedFiles: number;
  /** 분석한 총 라인 수 */
  totalLines: number;
  /** 발견된 이슈 목록 */
  issues: AgentIssue[];
  /** 분석 결과 요약 */
  summary: string;
  /** 코드의 강점 목록 */
  strengths: string[];
  /** 개선이 필요한 항목 목록 */
  improvements: string[];
  /** 분석 소요 시간 (ms) */
  executionTime: number;
}

/** 에이전트에 전달되는 분석 입력 데이터 */
export interface AgentInput {
  /** 분석 대상 GitHub 저장소 URL */
  repoUrl: string;
  /** 분석할 파일 목록 */
  files: FileContent[];
}

/** 분석 대상 파일의 경로와 내용 */
export interface FileContent {
  /** 저장소 내 파일 경로 */
  path: string;
  /** 파일 내용 (UTF-8 디코딩 완료) */
  content: string;
}

/** 에이전트 실행 함수 시그니처 */
export type AgentFunction = (input: AgentInput) => Promise<AgentResult>;
