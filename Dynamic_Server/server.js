import express from 'express';
import { connectRedis } from './src/redis/redisClient.js';
import { errorMiddleware } from './src/middlewares/errorMiddleware.js';
import characterRoutes from './src/routes/characterroutes.js';
import marketRoutes from './src/routes/marketroutes.js';

const app = express();
const PORT = 3000;

// 미들웨어
app.use(express.json());

// Redis 연결
connectRedis();

// 라우터 연결
app.use('/character', characterRoutes);
app.use('/market', marketRoutes);

// 에러 핸들링
app.use(errorMiddleware);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🧙 서버가 http://localhost:${PORT} 에서 실행 중`);
});