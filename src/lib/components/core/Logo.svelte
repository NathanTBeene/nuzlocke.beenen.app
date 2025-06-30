<script>
  export let logo, alt = '', aspect = '4x4', pixelated = false, role = '', pictureClass = ''
  import { fade } from 'svelte/transition'

  const [width, height] = aspect.split('x')
</script>

<picture in:fade class={pictureClass || ''}>
  <source media="(min-width: 640)"
          srcset='/assets/img/logos/{logo}-small.webp /assets/img/logos/{logo}.webp 2x'
          type='image/webp' />

  <img class={$$restProps.class || ''}
       decoding=aysnc

       class:pixelated={pixelated}
       src='/assets/img/logos/{logo}-small.webp'
       loading="lazy"
       {width}
       {height}
       {alt}
       {role}
     />
</picture>

<style lang="postcss">
  img.pixelated {
    image-rendering: pixelated;
  }
</style>
