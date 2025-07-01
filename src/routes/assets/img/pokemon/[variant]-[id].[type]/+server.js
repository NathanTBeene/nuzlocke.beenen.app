import { Expanded as Games } from '$lib/data/games.js'


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pwd = __dirname.split(path.sep);

function getPath(moduleName, folder = pwd) {
  if (folder.length < 1) {
    logError(moduleName, folder);
    return null;
  }
  const nodeModulesPath = folder.concat(["node_modules"]).join(path.sep);
  const p = moduleName
    ? path.join(nodeModulesPath, moduleName)
    : nodeModulesPath;
  if (fs.existsSync(p)) {
    return nodeModulesPath;
  }
  const res = getPath(moduleName, folder.slice(0, -1));
  if (!res) logError(moduleName, folder);
  return res;
}

const spritesPath = `${getPath('pokemon-sprites')}/pokemon-sprites/sprites/pokemon`;

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
