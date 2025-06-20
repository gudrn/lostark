// 에러 핸들링 미들웨어 구현

export const errorMiddleware = (err, res) => {
  console.error(err);

  // res가 정의되지 않은 경우를 대비한 방어 코드 추가
  if (!res || typeof res.status !== 'function' || typeof res.json !== 'function') {
    // res 객체가 없으면 next로 에러를 넘기거나, 콘솔에만 출력
    console.error('res 객체가 정의되지 않았습니다. 에러:', err);
    return;
  }

  // 기본 에러 메시지와 상태코드 설정
  const status = err.status || 500;
  const message = err.message || '서버 내부 오류가 발생했습니다.';

  res.status(status).json({
    success: false,
    message,
    error: process.env.NODE_ENV === 'production' ? undefined : err.stack,
  });
};
