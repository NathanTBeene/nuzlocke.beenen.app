let leaders = import.meta.glob(
  '../*.webp',
  {
    query: '?base64',
    import: 'default'
  }
)

const keyToBase64 = async (spriteName) => {
  let path = `../${spriteName}.webp`;

  if(!leaders[path]) return false;

  let test = await leaders[path]();

  return test;
}

export async function GET({ params }) {
  const {leader} = params;

  let sprite = await keyToBase64(leader)

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
      'Content-Type': 'image/webp'
    }
  });
}
