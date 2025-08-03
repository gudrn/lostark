import app from './app';

const PORT: number = Number(process.env.PORT) || 3000;

/**
 * 서버 시작
 */
app.listen(PORT, () => {
  console.log(`🧙 서버가 http://localhost:${PORT} 에서 실행 중`);
});
