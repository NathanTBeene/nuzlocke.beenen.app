<script>
	import { gzip } from 'pako';

	import QRCode from './QRCode.svelte';
	import { fade, fly } from 'svelte/transition';
	import { getGame, savedGames, read, parse } from '$lib/store';
	import { page } from '$app/stores';
	import { Icon } from '$c/core';
	import { Share, Check } from '$icons';
	import { getContext } from 'svelte';

	import { Button, IconButton } from '$lib/components/core'

	export let id;

	let save, data;
	savedGames.subscribe(parse((g) => (save = g[id])));
	getGame(id).subscribe(read((game) => (data = game)));

	let copy, copytimeout;
	const handlecopy = (code) => () => {
	navigator.clipboard.writeText(code);
	copy = true;
	clearTimeout(copytimeout);
	copytimeout = setTimeout(() => (copy = false), 1500);
	};

	function encodeForUrl(jsonData) {
	try {
	const jsonString = JSON.stringify(jsonData);
	const compressed = gzip(jsonString);
	const compressedStr = String.fromCharCode.apply(null, compressed);
	const base64 = btoa(compressedStr);
	const urlSafe = encodeURIComponent(base64);
	return urlSafe;
	} catch (error) {
	console.error('Encoding failed:', error);
	return '';
	}
	}

	const payload = { data, save };
	const encodedData = encodeForUrl(payload);

	const { close } = getContext('simple-modal')

</script>

<section>
	<h1>
		<Icon inline={true} icon={Share} class="-ml-4 mr-2 fill-current" />
		Transfer your save
	</h1>

	<p>
		Click "Copy Link" to copy the link to your clipboard, or scan the QR code with your phone.
	</p>
	
	<Button rounded on:click={handlecopy(`${$page.url.origin}/drop/${encodedData}`)}>
		Copy Link
	</Button>

	<span style="min-height: 320px;">
		<div transition:fade class="mt-4 bg-white p-2">
			<QRCode value="{$page.url.origin}/drop/{encodedData}" />
		</div>
	</span>

	<p>
		(<i>Note: Some saves fail to generate a QR code. If this happens, please use the link instead.</i>)
	</p>
</section>

{#if copy}
<div
  transition:fly={{ y: 50 }}
  class="fixed bottom-0 left-0 z-50 w-full px-4 md:left-1/2 md:w-auto md:-translate-x-1/2"
  >
	<div
      class="inline-flex w-full max-w-sm justify-center rounded-t-lg bg-green-100 px-6 py-2 font-bold text-green-600"
    >
		Copied Code
		<Icon
		  inline={true}
		  icon={Check}
		  height="1.4em"
		  class="ml-2 fill-current"
      />
	</div>

</div>
{/if}


<style lang="postcss">
	h1 {
	@apply -mb-2 inline-flex items-center text-2xl font-bold md:text-4xl;
	}

	section {
	@apply mx-auto flex flex-col items-center gap-y-4 overflow-hidden rounded-xl bg-gray-50 py-10 px-6 text-gray-800 md:px-12;
	}

	:global(.dark) section {
	@apply bg-gray-800 text-white;
	}

	p {
	@apply max-w-xs text-center text-sm leading-5;
	}

	span mark {
	@apply cursor-pointer bg-transparent transition;
	}
	span {
	@apply mt-4 mb-8 flex flex-col items-center tracking-widest;
	}

	:global(.dark) span mark {
	@apply text-yellow-300;
	}
	:global(.dark) span:hover mark {
	@apply bg-yellow-200 text-gray-900;
	}
	span mark {
	@apply text-yellow-400 transition;
	}
	span:hover mark {
	@apply bg-yellow-300 text-gray-900;
	}
</style>