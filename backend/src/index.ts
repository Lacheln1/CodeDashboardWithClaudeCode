import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { analysisRouter } from './routes/analysis';
import { downloadRouter } from './routes/download';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api/analysis', analysisRouter);
app.use('/api/download', downloadRouter);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
