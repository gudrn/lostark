import express from 'express';
import { fnGetCharacters } from './controller/characterController.js';
import { connectRedis } from './redis/redisClient.js';
import { allArrMarketItems } from './controller/marketController.js';
const app = express();

connectRedis();
app.get('/characterName=:characterName', async (req, res) => {
  const characterName = req.params.characterName;
  await fnGetCharacters(characterName, res);
});

app.get('/marketallitem', async (req, res) => {
  await allArrMarketItems(res);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
