// 에러 핸들링 미들웨어 구현

export const errorMiddleware = (err, res) => {
  console.error(err);

  // 기본 에러 메시지와 상태코드 설정
  const status = err.status || 500;
  const message = err.message || '서버 내부 오류가 발생했습니다.';

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
