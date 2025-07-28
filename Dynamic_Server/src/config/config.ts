import dotenv from 'dotenv';
import { ILostarkConfig, IRedisConfig } from './types/types';
dotenv.config();

export const lostarkConfig: ILostarkConfig = {
  lostarkapikey: process.env.LOSTARK_API_KEY || '',
  lostarkapiurl: process.env.LOSTARK_API_URL || '',
};

export const redisConfig: IRedisConfig = {
  redisHost: process.env.REDIS_HOST || '',
  redisPort: process.env.REDIS_PORT || '',
};

export interface IMongoConfig {
  // 필요한 설정이 있으면 여기에 추가
}

export const mongoConfig: IMongoConfig = {};
