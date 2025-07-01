<script>
  export let logo, alt = '', aspect = '4x4', pixelated = false, role = '', pictureClass = ''
  import { fade } from 'svelte/transition'

  const [width, height] = aspect.split('x')
</script>

<picture in:fade class={pictureClass || ''}>
  <source media="(min-width: 640)"
          srcset='/assets/img/logos/{logo}-small.webp 2x'
          type='image/webp' />
  <source media="(min-width: 640)"
          srcset='/assets/img/logos/{logo}-small.png 2x'
          type='image/png' />
  <source srcset='/assets/img/logos/{logo}-small.webp'
          type='image/webp' />


  <img class={$$restProps.class || ''}
       decoding=aysnc

       class:pixelated={pixelated}
       src='/assets/img/logos/{logo}-small.png'
       loading="lazy"
       {width}
       {height}
       {alt}
       {role}
       type="image/png"
     />
</picture>

<style lang="postcss">
  img.pixelated {
    image-rendering: pixelated;
  }
</style>
