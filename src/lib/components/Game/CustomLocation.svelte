<script>
  export let store, id
  import { onMount } from 'svelte'
  import { readdata, patchlocation } from '$lib/store'

  import Icon from '@iconify/svelte/dist/OfflineIcon.svelte'
  import { Edit } from '$icons'

  let value
  onMount(() => {
    const [data] = readdata()
    const custom = data?.__custom || []
    const match = custom.find((i) => i.id === id)
    value = match.name
  })

  const oninput = (e) => {
    const val = e.target.innerText
    store.update(patchlocation({ id, name: val }))
    value = val
  }

  const onkeydown = (e) => {
    if (e.key === 'Enter' || e.key === 'Escape') {
      e.preventDefault()
      e.target.blur()
    }
  }
</script>

<div
  class:text-gray-500={!value}
  class:text-black={value}
  class:dark:text-gray-50={value}
  class="cursor-edit relative inline-flex w-auto items-center justify-end border-gray-500 text-gray-500 transition"
>
  <span
    contenteditable
    on:input={oninput}
    on:keydown={onkeydown}
    class:sm:hover:border-gray-300={true}
    class:sm:dark:hover:border-gray-600={true}
    class:focus:border-yellow-500={true}
    class:dark:focus:border-yellow-500={true}
    class="-ml-1 -mr-1 flex select-text flex-row items-center gap-x-2 border-2 border-transparent px-1 text-left outline-none transition focus:w-auto focus:text-black dark:focus:text-white sm:flex-row-reverse md:-ml-2 md:-mr-3 md:px-2 lg:-ml-6"
  >
    {value}
  </span>
  {#if !value}
    <span class="pointer-events-none absolute left-0 block sm:hidden"
      >Edit location name</span
    >
  {/if}
  <Icon
    inline={true}
    size="1.4em"
    icon={Edit}
    class="{!value
      ? 'absolute -right-1 top-1 hidden sm:block'
      : 'sm:right-initial absolute -right-0 top-2 translate-x-full text-gray-300 hover:text-black dark:text-gray-500 sm:-left-1 sm:top-1/2 sm:-translate-y-1/2 sm:-translate-x-full'}
               cursor-edit pointer-events-none fill-current transition"
  />
</div>

<style lang="postcss">
  span:focus ~ :global(*) {
    opacity: 0;
  }
  @media (min-width: theme('screens.sm')) {
    span {
      min-width: 1ch;
      padding-left: 20px;
      text-align: right;
      width: fit-content;
    }
  }

  @media (max-width: theme('screens.sm')) {
    span {
      min-width: 14ch;
      user-select: text;
    }
    span:focus {
      min-width: 0;
    }
  }
</style>
