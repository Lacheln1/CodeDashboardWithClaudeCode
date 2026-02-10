import type { AgentResult, AgentIssue } from '../types/agent';
import type { AnalysisResponse } from '../types/api';

// ── Code Reviewer ──────────────────────────────────────────────
const codeReviewerIssues: AgentIssue[] = [
  {
    file: 'src/services/userService.ts',
    line: 42,
    severity: 'medium',
    category: 'naming',
    message: '변수명 `d`가 의미를 전달하지 못합니다.',
    suggestion: '`userData` 또는 `userDTO`처럼 역할을 드러내는 이름을 사용하세요.',
    codeSnippet: 'const d = await repo.findOne(id);',
  },
  {
    file: 'src/controllers/orderController.ts',
    line: 87,
    severity: 'high',
    category: 'complexity',
    message: '함수 `processOrder`의 순환 복잡도가 15로 매우 높습니다.',
    suggestion: '주문 검증, 결제 처리, 재고 차감 로직을 별도 함수로 분리하세요.',
    codeSnippet: `async function processOrder(order: Order) {
  if (order.items.length === 0) throw new Error('empty');
  if (!order.payment) throw new Error('no payment');
  for (const item of order.items) {
    if (item.stock < item.qty) { /* ... */ }
  }
}`,
  },
  {
    file: 'src/utils/helpers.ts',
    line: 12,
    severity: 'medium',
    category: 'duplication',
    message: '`formatDate` 함수가 3개 파일에서 중복 정의되어 있습니다.',
    suggestion: '공통 유틸 모듈로 추출하여 단일 소스로 관리하세요.',
    codeSnippet: `export function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}`,
  },
  {
    file: 'src/models/Product.ts',
    line: 5,
    severity: 'low',
    category: 'consistency',
    message: '인터페이스 속성 순서가 다른 모델과 일관되지 않습니다.',
    suggestion: 'id, name, 기타 속성, timestamps 순서로 통일하세요.',
  },
];

export const mockCodeReviewerResult: AgentResult = {
  agent: 'code-reviewer',
  score: 85,
  analyzedFiles: 24,
  totalLines: 3420,
  issues: codeReviewerIssues,
  summary: '전반적으로 양호한 코드 품질입니다. 일부 함수의 복잡도가 높고 유틸 함수 중복이 발견되었습니다.',
  strengths: [
    'TypeScript strict 모드를 일관되게 적용하고 있습니다.',
    '대부분의 함수가 단일 책임 원칙을 잘 따르고 있습니다.',
    'ESLint/Prettier 규칙이 프로젝트 전반에 걸쳐 준수되고 있습니다.',
  ],
  improvements: [
    '순환 복잡도가 높은 함수를 작은 단위로 분리하세요.',
    '중복된 유틸 함수를 공통 모듈로 통합하세요.',
  ],
  executionTime: 2150,
};

// ── Security Auditor ───────────────────────────────────────────
const securityAuditorIssues: AgentIssue[] = [
  {
    file: 'src/controllers/authController.ts',
    line: 33,
    severity: 'high',
    category: 'security',
    message: 'SQL 쿼리에 사용자 입력이 직접 삽입되어 SQL Injection 위험이 있습니다.',
    suggestion: '파라미터 바인딩 또는 ORM 메서드를 사용하세요.',
    codeSnippet: 'const user = await db.query(`SELECT * FROM users WHERE email = \'${email}\'`);',
  },
  {
    file: 'src/middleware/cors.ts',
    line: 8,
    severity: 'high',
    category: 'security',
    message: 'CORS origin이 와일드카드(*)로 설정되어 모든 도메인에서 접근 가능합니다.',
    suggestion: '허용할 도메인을 명시적으로 지정하세요.',
    codeSnippet: "app.use(cors({ origin: '*' }));",
  },
  {
    file: 'src/config/jwt.ts',
    line: 15,
    severity: 'medium',
    category: 'security',
    message: 'JWT 시크릿이 하드코딩되어 있습니다.',
    suggestion: '환경 변수에서 불러오도록 변경하세요.',
    codeSnippet: "const JWT_SECRET = 'my-super-secret-key-123';",
  },
];

export const mockSecurityAuditorResult: AgentResult = {
  agent: 'security-auditor',
  score: 72,
  analyzedFiles: 18,
  totalLines: 2810,
  issues: securityAuditorIssues,
  summary: '2건의 고위험 보안 취약점이 발견되었습니다. SQL Injection과 CORS 설정을 즉시 수정해야 합니다.',
  strengths: [
    'bcrypt를 사용한 비밀번호 해싱이 올바르게 구현되어 있습니다.',
    'Helmet 미들웨어로 기본 HTTP 보안 헤더가 설정되어 있습니다.',
  ],
  improvements: [
    'SQL 쿼리에 파라미터 바인딩을 적용하세요.',
    'CORS 허용 도메인을 제한하세요.',
    'JWT 시크릿 등 민감 정보를 환경 변수로 관리하세요.',
  ],
  executionTime: 1850,
};

// ── Performance Analyzer ───────────────────────────────────────
const performanceAnalyzerIssues: AgentIssue[] = [
  {
    file: 'src/services/productService.ts',
    line: 28,
    severity: 'high',
    category: 'performance',
    message: 'N+1 쿼리 패턴이 감지되었습니다. 반복문 내에서 개별 쿼리를 실행하고 있습니다.',
    suggestion: 'JOIN 또는 IN 절을 사용한 배치 쿼리로 변경하세요.',
    codeSnippet: `for (const product of products) {
  product.reviews = await reviewRepo.find({ productId: product.id });
}`,
  },
  {
    file: 'src/utils/imageProcessor.ts',
    line: 55,
    severity: 'medium',
    category: 'performance',
    message: '대용량 이미지를 동기적으로 처리하여 이벤트 루프를 차단합니다.',
    suggestion: 'Worker Thread 또는 스트림 기반 처리로 전환하세요.',
    codeSnippet: 'const resized = sharp(buffer).resize(800, 600).toBuffer();',
  },
  {
    file: 'src/middleware/logger.ts',
    line: 12,
    severity: 'low',
    category: 'performance',
    message: '요청마다 동기적 파일 쓰기(fs.writeFileSync)를 수행합니다.',
    suggestion: '비동기 쓰기 또는 버퍼링된 로거(winston 등)를 사용하세요.',
    codeSnippet: "fs.writeFileSync('app.log', logEntry, { flag: 'a' });",
  },
];

export const mockPerformanceAnalyzerResult: AgentResult = {
  agent: 'performance-analyzer',
  score: 80,
  analyzedFiles: 20,
  totalLines: 3100,
  issues: performanceAnalyzerIssues,
  summary: 'N+1 쿼리 문제가 주요 성능 병목입니다. 이미지 처리와 로깅도 개선이 필요합니다.',
  strengths: [
    '비동기 패턴(async/await)이 대부분 올바르게 사용되고 있습니다.',
    '데이터베이스 인덱스가 주요 쿼리에 적절히 설정되어 있습니다.',
  ],
  improvements: [
    'N+1 쿼리를 배치 쿼리로 최적화하세요.',
    '이미지 처리를 Worker Thread로 분리하세요.',
    '동기적 파일 I/O를 비동기로 전환하세요.',
  ],
  executionTime: 2480,
};

// ── Test Generator ─────────────────────────────────────────────
const testGeneratorIssues: AgentIssue[] = [
  {
    file: 'src/services/paymentService.ts',
    line: 1,
    severity: 'high',
    category: 'testing',
    message: '결제 서비스에 대한 테스트가 전혀 없습니다. 핵심 비즈니스 로직입니다.',
    suggestion: '결제 성공/실패/취소 시나리오에 대한 단위 테스트를 작성하세요.',
  },
  {
    file: 'src/controllers/orderController.ts',
    line: 1,
    severity: 'medium',
    category: 'testing',
    message: '주문 컨트롤러의 테스트 커버리지가 32%로 낮습니다.',
    suggestion: '엣지 케이스(빈 장바구니, 재고 부족 등)에 대한 테스트를 추가하세요.',
    codeSnippet: `describe('OrderController', () => {
  it('should create order', async () => {
    // 정상 케이스만 테스트됨
  });
});`,
  },
  {
    file: 'src/utils/validators.ts',
    line: 1,
    severity: 'medium',
    category: 'testing',
    message: '입력 검증 함수들의 경계값 테스트가 누락되어 있습니다.',
    suggestion: '빈 문자열, null, undefined, 최대 길이 등 경계값 테스트를 추가하세요.',
  },
  {
    file: 'src/middleware/auth.ts',
    line: 1,
    severity: 'low',
    category: 'testing',
    message: '인증 미들웨어의 토큰 만료 시나리오 테스트가 없습니다.',
    suggestion: '만료된 토큰, 잘못된 형식의 토큰 등 실패 케이스를 테스트하세요.',
  },
];

export const mockTestGeneratorResult: AgentResult = {
  agent: 'test-generator',
  score: 68,
  analyzedFiles: 24,
  totalLines: 3420,
  issues: testGeneratorIssues,
  summary: '전체 테스트 커버리지 58%. 결제 서비스 등 핵심 모듈의 테스트가 부족합니다.',
  strengths: [
    'Jest + Supertest 기반의 테스트 인프라가 잘 구축되어 있습니다.',
    '유저 서비스의 단위 테스트가 충실합니다.',
  ],
  improvements: [
    '결제 서비스에 대한 테스트를 최우선으로 작성하세요.',
    '통합 테스트를 추가하여 API 엔드포인트를 검증하세요.',
    '경계값 및 에러 케이스 테스트를 보강하세요.',
  ],
  executionTime: 3200,
};

// ── Doc Writer ─────────────────────────────────────────────────
const docWriterIssues: AgentIssue[] = [
  {
    file: 'src/services/paymentService.ts',
    line: 1,
    severity: 'medium',
    category: 'documentation',
    message: '결제 서비스의 공개 API에 JSDoc 문서가 없습니다.',
    suggestion: '모든 공개 메서드에 @param, @returns, @throws를 포함한 JSDoc을 추가하세요.',
  },
  {
    file: 'README.md',
    line: 1,
    severity: 'medium',
    category: 'documentation',
    message: 'API 엔드포인트 문서가 최신 상태가 아닙니다.',
    suggestion: 'OpenAPI(Swagger) 스펙을 추가하거나 README를 업데이트하세요.',
  },
  {
    file: 'src/config/database.ts',
    line: 1,
    severity: 'low',
    category: 'documentation',
    message: '데이터베이스 설정 옵션에 대한 설명이 누락되어 있습니다.',
    suggestion: '각 설정 옵션의 역할과 기본값을 주석으로 설명하세요.',
    codeSnippet: `export const dbConfig = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  poolSize: 10,
  timeout: 30000,
};`,
  },
];

export const mockDocWriterResult: AgentResult = {
  agent: 'doc-writer',
  score: 75,
  analyzedFiles: 24,
  totalLines: 3420,
  issues: docWriterIssues,
  summary: '기본적인 코드 주석은 있으나 공개 API 문서와 프로젝트 문서가 부족합니다.',
  strengths: [
    '타입 정의에 JSDoc 주석이 잘 작성되어 있습니다.',
    'CHANGELOG 관리가 잘 되고 있습니다.',
  ],
  improvements: [
    '공개 서비스 메서드에 JSDoc을 추가하세요.',
    'API 문서를 자동 생성하도록 OpenAPI 스펙을 도입하세요.',
  ],
  executionTime: 1420,
};

// ── 통합 응답 ──────────────────────────────────────────────────
const allResults: AgentResult[] = [
  mockCodeReviewerResult,
  mockSecurityAuditorResult,
  mockPerformanceAnalyzerResult,
  mockTestGeneratorResult,
  mockDocWriterResult,
];

const overallScore = Math.round(
  allResults.reduce((sum, r) => sum + r.score, 0) / allResults.length,
);

export const mockAnalysisResponse: AnalysisResponse = {
  id: 'mock-analysis-001',
  repoUrl: 'https://github.com/example/sample-project',
  overallScore,
  results: allResults,
  createdAt: new Date().toISOString(),
  completedAt: new Date().toISOString(),
  status: 'completed',
};

/** 실제 API 호출을 대체하는 mock 함수. repoUrl을 받아 AnalysisResponse를 반환합니다. */
export function getMockAnalysisResponse(repoUrl: string): AnalysisResponse {
  return {
    ...mockAnalysisResponse,
    id: `mock-${Date.now()}`,
    repoUrl,
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  };
}
