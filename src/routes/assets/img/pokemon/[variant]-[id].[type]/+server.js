

import { Expanded as Games } from '$lib/data/games.js'


let pokemon = import.meta.glob(
  '/node_modules/pokemon-sprites/sprites/pokemon/*.png'
)


const spriteToPath = async (spriteName) => {
  let path = `/node_modules/pokemon-sprites/sprites/pokemon/${spriteName}`;

  let test = await pokemon[path]();

  return test;
}

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

  const sprite = await spriteToPath(spriteName);

  return new Response('', {
    status: 301,
    headers: {
      Location: sprite.default
    }
  });
}