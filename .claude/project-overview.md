# CodeBuddy - Multi-Agent Code Analysis Platform

## 프로젝트 목표
여러 AI 에이전트가 협업해서 Github 코드를 다각도로 분석하는 플랫폼

## 핵심 가치
이 프로젝트는 "대시보드 만들기"가 아닌 **AI 에이전트 설계 및 활용 능력**을 증명하기 위한 것입니다.

## 핵심 기능
1. GitHub repo URL 입력
2. 5개 전문 에이전트가 병렬 분석
    - code-reviewer: 코드 품질
    - security-auditor: 보안 취약점
    - performance-analyzer: 성능 병목
    - test-generator: 테스트 커버리지 분석
    - doc-writer : 문서 완성도
3. 통합 대시보드에 결과 시각화
4. 에이전트 활동 타임라인 표시
5. 에이전트별 상세 리포트

## 기술 스택
- Frontend: React + TypeScript + Vite , Tailwind CSS, Recharts
- Backend: Express + TypeScript, Node.js
- AI: Claude API (서브 에이전트)
- VCS: GitHub API

## 프로젝트 구조
CodeDashboardWithClaudeCode/
├── .claude/
│ ├── agents/ # 서브 에이전트 설정
│ ├── references/ # UI 레퍼런스
│ ├── project-overview.md
│ └── tech-stack.md
├── frontend/
│ └── src/
│ ├── components/
│ │ ├── layout/
│ │ ├── dashboard/
│ │ └── common/
│ ├── pages/
│ ├── types/ # TypeScript 타입 정의
│ └── utils/
└── backend/
    └── src/
        ├── agents/         # 에이전트 실행 로직
        ├── routes/
        ├── types/          # TypeScript 타입 정의
        └── utils/

## 성공 지표
- 5개 에이전트 모두 독립적으로 작동
- 병렬 실행으로 분석 속도 향상
- 재사용 가능한 에이전트 아키텍처
- 타입 안정성 100%
