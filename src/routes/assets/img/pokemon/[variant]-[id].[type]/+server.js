import { Expanded as Games } from '$lib/data/games.js'

const spritesPath = `./node_modules/pokemon-sprites/sprites/pokemon`;

import fs from 'fs';
export async function GET({ params }) {
  const {id, variant} = params;

  let spriteName = '';

  switch(variant) {
    case 'shiny':
      spriteName = `shiny/${id}.png`;
      break;
    case 'base':
    default:
      spriteName = `${id}.png`;
  }

  const buffer = fs.readFileSync(`${spritesPath}/${spriteName}`);

  return new Response(buffer);
}
