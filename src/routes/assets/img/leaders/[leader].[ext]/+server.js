import { Expanded as Games } from '$lib/data/games.js'

const spritesPath = `./src/routes/assets/img/leaders`;

import fs from 'fs';

export async function GET({ params }) {
  const {leader, ext} = params;

  let buffer = null;
  console.log(`${spritesPath}/${leader}.png`)

  if(fs.existsSync(`${spritesPath}/${leader}.webp`)) {
    console.log(`exists ${spritesPath}/${leader}.webp`)
    buffer = fs.readFileSync(`${spritesPath}/${leader}.webp`)
  } else if(fs.existsSync(`${spritesPath}/${leader}.png`)) {
    console.log(`exists ${spritesPath}/${leader}.png`)
    buffer = fs.readFileSync(`${spritesPath}/${leader}.png`)
  }



  if (!buffer) {
    const spritesPath = `./node_modules/pokemon-sprites/sprites/pokemon`;
    const spriteName = `201-question.png`;
    buffer = fs.readFileSync(`${spritesPath}/${spriteName}`);
  }

  return new Response(buffer);
}
