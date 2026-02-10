/** GitHub 저장소 메타 정보 */
export interface GitHubRepo {
  /** 저장소 소유자 (사용자 또는 조직) */
  owner: string;
  /** 저장소 이름 */
  name: string;
  /** 전체 이름 (owner/name) */
  fullName: string;
  /** 저장소 설명 */
  description: string;
  /** 주요 프로그래밍 언어 */
  language: string;
  /** 스타 수 */
  stars: number;
  /** 포크 수 */
  forks: number;
  /** 기본 브랜치명 */
  defaultBranch: string;
}

/** GitHub 파일 정보 (분석 대상) */
export interface GitHubFile {
  /** 저장소 내 파일 경로 */
  path: string;
  /** 파일 내용 (UTF-8 디코딩 완료) */
  content: string;
  /** 파일 크기 (bytes) */
  size: number;
}
