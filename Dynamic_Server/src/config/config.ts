import dotenv from 'dotenv';
import { ILostarkConfig, IRedisConfig, IServerConfig } from './types/types';
dotenv.config();

export const serverConfig: IServerConfig = {
  port: Number(process.env.SERVER_PORT) || 3000,
};

export const lostarkConfig: ILostarkConfig = {
  lostarkapikey: process.env.LOSTARK_API_KEY || '',
  lostarkapiurl: process.env.LOSTARK_API_URL || '',
};

export const redisConfig: IRedisConfig = {
  redisHost: process.env.REDIS_HOST || '',
  redisPort: process.env.REDIS_PORT || '',
};

export interface IMongoConfig {
  // TODO: 필요한 설정이 있으면 여기에 추가
}

export const mongoConfig: IMongoConfig = {};
