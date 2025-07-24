import express from 'express';
import { fnGetCharacters } from './controller/characterController.js';
import { allArrMarketItems } from './controller/marketController.js';
import { connectRedis } from './redis/redisClient.js';
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();

// JSON 파싱 미들웨어
app.use(express.json());

// Redis 연결

connectRedis();

// 캐릭터 정보 조회 라우터
app.get('/characterName=:characterName', async (req, res, next) => {
  try {
    const characterName = req.params.characterName;
    await fnGetCharacters(characterName, res);
  } catch (err) {
    next(err);
  }
});

// 마켓 전체 아이템 조회 라우터
app.get('/marketallitem', async (req, res, next) => {
  try {
    await allArrMarketItems(res);
  } catch (err) {
    next(err);
  }
});

// 에러 핸들링 미들웨어
app.use(errorMiddleware);

// 서버 시작
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중입니다.`);
});
