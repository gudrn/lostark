require('dotenv').config();

export const lostarkConfig = {
  lostarkapikey: process.env.LOSTARK_API_KEY,
  lostarkapiurl: process.env.LOSTARK_API_URL,
};

const mongoConfig = {};
