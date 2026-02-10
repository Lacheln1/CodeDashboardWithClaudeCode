import express, { type Express, type Request, type Response } from 'express';
import cors from 'cors';
import { analysisRouter } from './routes/analysis';
import { downloadRouter } from './routes/download';

/** CORS 허용 옵션 */
const corsOptions: cors.CorsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST'],
};

/** Express 앱을 생성하고 미들웨어/라우트를 등록하여 반환 */
export const createApp = (): Express => {
  const app = express();

  // --- 미들웨어 ---
  app.use(cors(corsOptions));
  app.use(express.json());

  // --- 라우트 ---
  app.use('/api/analysis', analysisRouter);
  app.use('/api/download', downloadRouter);

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  return app;
};
