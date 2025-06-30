import { Expanded as Games } from '$lib/data/games.js'
import fs from 'fs'

const spritesPath = `./src/routes/assets/img/logo`;

export async function GET({ params }) {
  const { logo, ext } = params;

  if (!['png', 'webp'].includes(ext)) return new Response('', { stauts: 404 })

  const [id, res] = logo.split('@')
  const logoPath = Games?.[id]?.logo;
  if (!logoPath) return new Response('', { status: 404 });

  const location = res
    ? `${logoPath}@${res}.${ext}`
    : `${logoPath}.${ext}`

  let buffer = null;

  console.log(`${spritesPath}/${location}`)

  if(fs.existsSync(`${spritesPath}/${location}`)) {
    buffer = fs.readFileSync(`${spritesPath}/${location}`)
  }

  if (!buffer) return new Response('', { status: 404 });

  return new Response(buffer);
}
