# Code Orchestra

GitHub 저장소를 자동 분석하는 AI 기반 코드 대시보드. 5개의 전문 에이전트가 코드 품질, 보안, 성능, 테스트, 문서화를 병렬로 분석하고 시각화된 결과를 제공합니다.

## 기술 스택

| 영역 | 기술 |
|------|------|
| **Frontend** | React 19, Vite 7, TailwindCSS 4, Recharts 3, React Router 7, TanStack Query |
| **Backend** | Express 5, TypeScript, Anthropic SDK (Claude Sonnet 4.5), Octokit |
| **Dev Tools** | concurrently, nodemon, ts-node, ESLint |

## 프로젝트 구조

```
CodeDashboardWithClaudeCode/
├── backend/
│   └── src/
│       ├── agents/          # 5개 에이전트 실행 로직
│       ├── prompts/         # 에이전트별 시스템 프롬프트 (.md)
│       ├── routes/          # API 라우트 (analysis, download)
│       ├── types/           # 타입 정의 (agent, api, github)
│       ├── utils/           # Claude API, GitHub API, 프롬프트 로더
│       ├── server.ts        # Express 앱 설정
│       └── index.ts         # 서버 진입점
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── common/      # Button, Card, Input
│       │   ├── dashboard/   # ScoreCard, ChartSection, IssueTable
│       │   └── layout/      # Header, Sidebar, Layout
│       ├── pages/           # HomePage, DashboardPage, AnalysisDetailPage
│       ├── types/           # 프론트엔드 타입 정의
│       ├── utils/           # API 클라이언트, 포매터
│       └── App.tsx          # 라우터 설정
└── package.json             # 루트 스크립트 (dev, build, install:all)
```

## 시작하기

### Prerequisites

- Node.js 18+
- npm
- [Anthropic API Key](https://console.anthropic.com/)
- [GitHub Personal Access Token](https://github.com/settings/tokens)

### 설치

```bash
# 의존성 일괄 설치
npm run install:all
```

### 환경변수

`backend/.env` 파일을 생성합니다:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GITHUB_TOKEN=your_github_token_here
PORT=3000
USE_MOCK=true
```

| 변수 | 설명 | 기본값 |
|------|------|--------|
| `ANTHROPIC_API_KEY` | Anthropic Claude API 키 | — |
| `GITHUB_TOKEN` | GitHub Personal Access Token | — |
| `PORT` | 백엔드 서버 포트 | `3000` |
| `USE_MOCK` | 목 데이터 사용 여부 (`true`/`false`) | `true` |
| `CORS_ORIGIN` | CORS 허용 오리진 | `http://localhost:5173` |
| `VITE_API_URL` | (프론트엔드) 백엔드 API URL | `http://localhost:3000` |

### 실행

```bash
# 프론트엔드 + 백엔드 동시 실행
npm run dev

# 개별 실행
npm run dev:frontend   # http://localhost:5173
npm run dev:backend    # http://localhost:3000
```

## 동작 흐름

```
GitHub URL 입력 → GitHub API로 파일 수집 → 5개 에이전트 병렬 분석 (Promise.all) → 대시보드에 결과 표시
```

1. 사용자가 GitHub 저장소 URL을 입력
2. Octokit으로 저장소 파일을 재귀 수집 (최대 50개, 파일당 100KB 제한)
3. 5개 에이전트가 Claude API를 통해 병렬로 분석 실행
4. 각 에이전트가 점수(0–100), 이슈 목록, 요약을 반환
5. 프론트엔드 대시보드에 종합 점수, 차트, 이슈 테이블 표시

## 에이전트

| 에이전트 | 역할 |
|----------|------|
| **Code Reviewer** | 코드 품질, 네이밍 컨벤션, 중복 코드, 함수 복잡도, TypeScript 활용도 |
| **Security Auditor** | 보안 취약점 — 인증, 인젝션, 민감 정보 노출, 의존성 CVE, CORS 설정 |
| **Performance Analyzer** | 성능 병목 — 렌더링 최적화, N+1 쿼리, 알고리즘 복잡도, 번들 사이즈 |
| **Test Generator** | 테스트 커버리지 분석 — 누락된 유닛/컴포넌트/통합 테스트, 엣지 케이스 |
| **Doc Writer** | 문서화 완성도 — JSDoc, README, API 문서, 타입 설명, 인라인 코멘트 |

각 에이전트는 severity(high/medium/low) 기준으로 이슈를 분류하고, 개선 사항과 강점을 함께 제공합니다.

## API 엔드포인트

| Method | Path | 설명 |
|--------|------|------|
| `POST` | `/api/analysis` | 분석 시작. Body: `{ "repoUrl": "https://github.com/owner/repo" }` |
| `GET` | `/api/analysis/:id` | 분석 결과 조회 |
| `GET` | `/api/health` | 서버 상태 확인 |

### POST /api/analysis 응답 예시

```json
{
  "id": "1234567890-abc1234",
  "repoUrl": "https://github.com/owner/repo",
  "overallScore": 0,
  "results": [],
  "createdAt": "2025-01-01T00:00:00.000Z",
  "status": "running"
}
```

분석이 완료되면 `GET /api/analysis/:id`로 폴링하여 `status: "completed"`와 전체 결과를 확인할 수 있습니다.
