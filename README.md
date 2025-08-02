# Lost Ark Dynamic Server

로스트아크 게임 데이터를 제공하는 API 서버입니다.

## 🏗️ 프로젝트 구조

```
src/
├── config/           # 설정 파일
│   ├── config.ts
│   └── types/
│       └── types.ts
├── constants/        # 상수 데이터
│   ├── data.ts       # 메인 데이터 export
│   ├── marketCodes.ts # 마켓 코드 상수
│   ├── gameData.ts   # 게임 데이터 (보석, 각인서 등)
│   └── types/
│       └── types.ts
├── controller/       # 컨트롤러
│   ├── characterController.ts
│   ├── marketController.ts
│   └── specsController.ts
├── middlewares/      # 미들웨어
│   └── errorMiddleware.ts
├── model/           # 데이터 모델
│   ├── characterModel.ts
│   ├── marketModel.ts
│   └── sample/
├── redis/           # Redis 연결
│   ├── instances.ts
│   └── redisClient.ts
├── routes/          # 라우터
│   ├── characterroutes.ts
│   └── marketroutes.ts
├── service/         # 비즈니스 로직
│   ├── characterService.ts
│   ├── marketService.ts
│   └── types/
│       ├── characterServiceType.ts
│       └── marketServiceTypes.ts
├── types/           # 타입 정의
│   ├── armory.ts    # 아머리 관련 타입
│   ├── market.ts    # 마켓 관련 타입
│   └── refining.ts  # 재련 관련 타입
├── utils/           # 유틸리티
│   ├── calculators/ # 계산기
│   │   ├── relicCalculator.ts
│   │   └── gemCalculator.ts
│   ├── data/        # 데이터 파일
│   │   └── simulationData.ts
│   ├── specsCalculate.ts
│   ├── type.ts
│   ├── helpers.ts   # 공통 유틸리티 함수
│   ├── customError.ts # 커스텀 에러 클래스
│   ├── refining-util.ts
│   ├── simulated.ts
│   └── customError.ts
├── app.ts           # Express 앱 설정
└── index.ts         # 서버 시작점
```

## 🚀 주요 개선사항

### 1. 파일 분리 및 구조화

- **상수 데이터 분리**: `marketCodes.ts`, `gameData.ts`로 마켓 코드와 게임 데이터를 분리
- **타입 정의 분리**: `types/` 폴더에 기능별로 타입을 분리
- **계산기 분리**: `calculators/` 폴더에 각인/보석 계산 로직을 분리
- **시뮬레이션 데이터 분리**: `data/` 폴더에 시뮬레이션 데이터를 분리

### 2. 가독성 개선

- **주석 추가**: 각 함수와 클래스에 JSDoc 주석 추가
- **에러 메시지 개선**: 더 명확한 에러 메시지와 가이드 제공
- **코드 구조화**: 관련 기능들을 논리적으로 그룹화

### 3. API 엔드포인트 개선

- **문서화**: 각 라우터에 API 설명 주석 추가
- **검증 강화**: 입력 파라미터 검증 로직 개선
- **응답 구조화**: 일관된 응답 형식 제공

### 4. 타입 안전성 강화

- **구체적인 타입 정의**: 모든 인터페이스에 상세한 타입 정의
- **타입 가드 함수**: 런타임 타입 검증을 위한 헬퍼 함수
- **에러 타입 분리**: 상황별 에러 클래스 정의

### 5. 에러 처리 개선

- **커스텀 에러 클래스**: 상황별 에러 타입 정의
- **상세한 에러 정보**: 에러 발생 위치와 컨텍스트 제공
- **일관된 에러 응답**: 모든 에러에 대한 통일된 응답 형식

## 📋 API 엔드포인트

### 캐릭터 관련

- `GET /character?name={캐릭터명}` - 캐릭터 정보 조회
- `GET /character/specs?name={캐릭터명}` - 캐릭터 스펙 계산

### 마켓 관련

- `GET /market` - 마켓 정보 조회

## 🛠️ 개발 환경

- **Node.js**: v16 이상
- **TypeScript**: v4.5 이상
- **Express**: v4.18 이상
- **Redis**: 캐싱용

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check

# 빌드 정리 및 재빌드
npm run rebuild
```

## 📝 주요 기능

1. **캐릭터 정보 조회**: 로스트아크 캐릭터의 상세 정보를 조회
2. **스펙 계산**: 캐릭터의 각인과 보석 정보를 기반으로 필요한 아이템과 비용 계산
3. **마켓 데이터**: 실시간 마켓 가격 정보 제공
4. **Redis 캐싱**: 성능 최적화를 위한 데이터 캐싱

## 🔧 설정

환경 변수 설정:

```env
PORT=3000
REDIS_URL=redis://localhost:6379
NODE_ENV=development
```

## 📊 성능 최적화

- Redis를 통한 데이터 캐싱
- 계산 로직 분리로 메모리 사용량 최적화
- 타입 안전성을 통한 런타임 에러 방지
- 재시도 로직으로 안정성 향상

## 🛡️ 에러 처리

- **ValidationError**: 입력 검증 실패
- **ApiError**: API 호출 실패
- **CacheError**: 캐시 관련 오류
- **ExternalApiError**: 외부 API 호출 실패

모든 에러는 일관된 형식으로 응답됩니다:

```json
{
  "success": false,
  "error": {
    "message": "에러 메시지",
    "statusCode": 400,
    "timestamp": "2024-01-01T00:00:00.000Z",
    "path": "/character",
    "method": "GET",
    "type": "VALIDATION_ERROR",
    "field": "name"
  }
}
```
