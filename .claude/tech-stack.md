# 기술 스택 상세

## Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS
- Recharts (차트 라이브러리)
- React Router v6
- Axios 
- React Query

## Backend
- Node.js + Express + TypeScript
- CORS 설정
- dotenv (환경변수)
- @anthropic-ai/sdk (Claude API)
- @octokit/rest (Github API)

## TypeScript 설정
- Strict mode 활성화
- 모든 파일 .ts 또는 .tsx
- any 타입 최소화
- interface 우선 사용 (type보다)

## 코딩 규칙

### 네이밍 컨벤션
- 컴포넌트: PascalCase (HomePage, ScoreCard)
- 함수/변수: camelCase (handleCheck, userData)
- 상수: UPPER_SNAKE_CASE (API_BASE_URL)
- 타입/인터페이스: PascalCase (AnalysisResult, AgentType)

### 컴포넌트 규칙
- 함수형 컴포넌트만 사용
- props는 interface로 타입 정의
- 모든 컴포넌트는 src/components에 
- export default 보다 named export 선호

### 스타일링 규칙
- Tailwind로만 스타일링
- 인라인 스타일 금지
- 공통 색상은 tailwind.config.js에 정의

### 폴더 구조

**Frontend:**
frontend/src/
├── components/
│   ├── layout/         # Layout, Header, Sidebar
│   ├── dashboard/      # ScoreCard, ChartSection, IssueTable
│   └── common/         # Button, Card, Input 등
├── pages/
│   ├── HomePage.tsx
│   ├── DashboardPage.tsx
│   └── AnalysisDetailPage.tsx
├── types/
│   ├── agent.ts        # 에이전트 관련 타입
│   ├── analysis.ts     # 분석 결과 타입
│   └── github.ts       # GitHub 데이터 타입
└── utils/
    ├── api.ts          # API 호출 함수
    └── formatters.ts   # 데이터 포맷 유틸

**Backend:**
backend/src/
├── agents/
│   ├── codeReviewer.ts
│   ├── securityAuditor.ts
│   ├── performanceAnalyzer.ts
│   ├── testGenerator.ts
│   ├── docWriter.ts
│   ├── types.ts        # 에이전트 공통 타입
│   └── index.ts        # runAllAgents 함수
├── routes/
│   ├── analysis.ts
│   └── download.ts
├── types/
│   └── api.ts          # API 요청/응답 타입
└── utils/
    ├── github.ts       # GitHub API 유틸
    └── claude.ts       # Claude API 유틸