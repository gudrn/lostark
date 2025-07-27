/** ✅ 커스텀 에러 클래스 */
export class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode ?? 500;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
