import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error('[에러 발생]', err.message);

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || '서버 내부 오류 발생',
  });
};
