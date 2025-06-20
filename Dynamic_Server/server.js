import express from 'express';
import { getCharacters } from './service/characterService.js';
import { connectRedis } from './redis/redosClient.js';
const app = express();

connectRedis();
app.get('/characterName=:characterName', async (req, res) => {
  const characterName = req.params.characterName;
  await getCharacters(characterName, res);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
