import express from 'express';
import { getCharacters } from './service/characterService.js';
const app = express();

app.get('/characterName=:characterName', async (req, res) => {
  const characterName = req.params.characterName;
  const character = await getCharacters(characterName);
  if (!character) {
    return res.status(404).json({ error: '캐릭터를 찾을 수 없습니다.' });
  }
  res.json(character);
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
