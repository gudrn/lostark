import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from './routes/characterroutes';
import marketRoutes from './routes/marketroutes';
import { connectRedis } from './redis/redisClient';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

// JSON 파서
app.use(express.json());

// Redis 연결
connectRedis();

// 라우터
app.use('/character', characterRoutes);
app.use('/market', marketRoutes);

// 에러 처리
app.use(errorMiddleware);

export default app;
