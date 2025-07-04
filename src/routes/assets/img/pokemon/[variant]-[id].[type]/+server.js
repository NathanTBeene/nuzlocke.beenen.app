let pokemon = import.meta.glob(
  [
    '/node_modules/pokemon-sprites/sprites/pokemon/*.png',
    '/node_modules/pokemon-sprites/sprites/pokemon/shiny/*.png',
  ],
  {
    query: '?base64',
    import: 'default'
  }
)

const keyToBase64 = async (spriteName, shiny) => {
  let defaultShinyPath = `/node_modules/pokemon-sprites/sprites/pokemon/shiny/${spriteName}.png`
  let defaultPath = `/node_modules/pokemon-sprites/sprites/pokemon/${spriteName}.png`;

  let sprite = null;

  if(shiny) {
    sprite = pokemon[defaultShinyPath];
  } else {
    sprite = pokemon[defaultPath];
  }

  if(!sprite) return null;

  return await sprite();
}

export async function GET({ params }) {

  const {id, variant} = params;

  let shiny = false;
  if(variant === 'shiny') {
    shiny = true;
  }

  let sprite = await keyToBase64(id, shiny);

  return new Response(Buffer.from(sprite, 'base64'), {
    headers: {
      'Content-Type': 'image/png'
    }
  });
}