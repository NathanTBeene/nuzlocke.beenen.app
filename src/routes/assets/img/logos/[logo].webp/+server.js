import { Expanded as Games } from '$lib/data/games.js'
import fs from 'fs'

const spritesPath = `./src/routes/assets/img/logos`;

const sizes = [
  'small'
]

/* legacy stuff. sometimes the caller of the logo seems to not know the
 * logo key, but only the game id, so we resolve that here
 */
const getLogoUrlFromGameId = (logo) => {
  const logoSplit = logo.split('-');
  let size = '';
  let id = logo;
  if(sizes.indexOf(logoSplit[logoSplit.length - 1]) !== -1) {
    size = `-${logoSplit[logoSplit.length - 1]}`;
  }

  if(size) {
    id = logoSplit.slice(0, -1).join('-');
  }

  const resolvedLogoPath = Games?.[id]?.logo;

  if(!resolvedLogoPath) return null;

  return `${resolvedLogoPath}${size}.webp`
}

export async function GET({ params }) {
  const { logo } = params;

  let location = `${logo}.webp`;

  const legacyPath = getLogoUrlFromGameId(logo);

  if(legacyPath) {
    location = legacyPath;
  }

  let buffer = null;

  if(fs.existsSync(`${spritesPath}/${location}`)) {
    buffer = fs.readFileSync(`${spritesPath}/${location}`)
  }

  if (!buffer) return new Response('', { status: 404 });

  return new Response(buffer);
}
