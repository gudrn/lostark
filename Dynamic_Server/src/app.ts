import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from './routes/characterroutes';
import marketRoutes from './routes/marketroutes';
import { connectRedis } from './redis/redisClient';
import { errorMiddleware } from './middlewares/errorMiddleware';

// 환경 변수 로드
dotenv.config();

const app = express();

// 미들웨어 설정
app.use(express.json());

// Redis 연결
connectRedis();

// API 라우터 설정
app.use('/character', characterRoutes);
app.use('/market', marketRoutes);

// 에러 처리 미들웨어 (마지막에 위치)
app.use(errorMiddleware);

export default app;
