import { Expanded as Games } from '$lib/data/games.js'

const sizes = [
  'small'
]

let logos = import.meta.glob(
  '../*.(webp|png)',
  {
    query: '?base64',
    import: 'default'
  }
)

const keyToBase64 = async (spriteName) => {
  let path = `../${spriteName}`;

  if(!logos[path]) return false;

  let test = await logos[path]();

  return test;
}

/* legacy stuff. sometimes the caller of the logo seems to not know the
 * logo key, but only the game id, so we resolve that here
 */
const getLogoUrlFromGameId = (logo, ext) => {
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

  return `${resolvedLogoPath}${size}.${ext}`
}

export async function GET({ params }) {
  const { logo, ext } = params;

  let location = `${logo}.${ext}`;

  const legacyPath = getLogoUrlFromGameId(logo, ext);

  if(legacyPath) {
    location = legacyPath;
  }

  let sprite = await keyToBase64(location)

  if (!sprite) {
    return new Response('', {
      status: 303,
      headers: {
        Location: '/assets/img/pokemon/base-201-question.png'
      }
    });
  }

  return new Response(Buffer.from(sprite, 'base64'), {
    headers: {
      'Content-Type': `image/${ext}`
    }
  });
}
