import dotenv from 'dotenv';
import { createApp } from './server';

dotenv.config();

const PORT: number = Number(process.env.PORT) || 3000;
const app = createApp();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
