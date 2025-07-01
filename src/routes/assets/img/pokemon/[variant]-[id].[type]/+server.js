let pokemon = import.meta.glob(
  '/node_modules/pokemon-sprites/sprites/pokemon/*.png',
  {
    query: '?base64',
    import: 'default'
  }
)

const keyToBase64 = async (spriteName) => {
  let path = `/node_modules/pokemon-sprites/sprites/pokemon/${spriteName}`;

  let test = await pokemon[path]();

  return test;
}

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

  const sprite = await keyToBase64(spriteName);

  return new Response(Buffer.from(sprite, 'base64'), {
    headers: {
      'Content-Type': 'image/png'
    }
  });
}