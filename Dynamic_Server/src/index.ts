/**
 * @fileoverview 서버 진입점 (Entry Point)
 * 
 * 이 파일은 로스트아크 마켓 서비스의 메인 진입점입니다.
 * Express 애플리케이션을 시작하고 지정된 포트에서 서버를 실행합니다.
 * 
 * 주요 기능:
 * - Express 애플리케이션 인스턴스 가져오기
 * - 환경 변수에서 포트 설정 읽기
 * - HTTP 서버 시작 및 리스닝
 * - 서버 시작 성공 메시지 출력
 * 
 * @author LostArk Market Service Team
 * @version 1.0.0
 * @since 2024
 */

import app from './app';
import { serverConfig } from './config/config';

// 환경 변수에서 포트 번호를 읽어오고, 없으면 기본값 3000 사용
const PORT: number = Number(serverConfig.port) || 3000;

/**
 * HTTP 서버 시작
 * 
 * @description
 * Express 애플리케이션을 지정된 포트에서 HTTP 서버로 시작합니다.
 * 서버가 성공적으로 시작되면 콘솔에 실행 정보를 출력합니다.
 * 
 * @param {number} PORT - 서버가 리스닝할 포트 번호
 * @param {Function} callback - 서버 시작 성공 시 실행될 콜백 함수
 */
app.listen(PORT, () => {
  console.log(`🧙 서버가 http://localhost:${PORT} 에서 실행 중`);
});
