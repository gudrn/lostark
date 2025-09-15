/**
 * @fileoverview Express 애플리케이션 메인 설정 파일
 * 
 * 이 파일은 로스트아크 마켓 서비스의 Express 애플리케이션을 구성합니다.
 * 미들웨어, 라우터, 에러 핸들링을 설정하고 Redis 연결을 초기화합니다.
 * 
 * 주요 구성 요소:
 * - Express 애플리케이션 인스턴스 생성
 * - 환경 변수 로드 (.env 파일)
 * - JSON 파싱 미들웨어 설정
 * - Redis 캐시 연결 초기화
 * - API 라우터 등록 (캐릭터, 마켓)
 * - 전역 에러 처리 미들웨어 설정
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import express from 'express';
import dotenv from 'dotenv';
import characterRoutes from './routes/characterroutes';
import marketRoutes from './routes/marketroutes';
import { connectRedis } from './redis/redisClient';
import { errorMiddleware } from './middlewares/errorMiddleware';

// .env 파일에서 환경 변수 로드 (포트, API 키, Redis 설정 등)
dotenv.config();

// Express 애플리케이션 인스턴스 생성
const app = express();

// JSON 요청 본문을 파싱하는 미들웨어 설정
// API 요청의 Content-Type이 application/json인 경우 자동으로 파싱
app.use(express.json());

// Redis 캐시 서버에 연결
// 마켓 데이터 캐싱을 위해 애플리케이션 시작 시 연결
connectRedis();

// API 라우터 등록
// /character 경로로 시작하는 모든 요청은 characterRoutes로 라우팅
app.use('/character', characterRoutes);
// /market 경로로 시작하는 모든 요청은 marketRoutes로 라우팅
app.use('/market', marketRoutes);

// 전역 에러 처리 미들웨어 (반드시 마지막에 위치)
// 모든 라우터에서 발생하는 에러를 일관되게 처리
app.use(errorMiddleware);

export default app;
