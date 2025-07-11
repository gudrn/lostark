import dotenv from 'dotenv';
dotenv.config();

export const lostarkConfig = {
  lostarkapikey: process.env.LOSTARK_API_KEY,
  lostarkapiurl: process.env.LOSTARK_API_URL,
};

export const redisConfig = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
};

const mongoConfig = {};
