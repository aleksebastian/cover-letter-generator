<script lang="ts">
	import { fade } from 'svelte/transition';
	import type { SvelteComponent } from 'svelte';
	import type { SvelteComponentDev, SvelteComponentTyped } from 'svelte/internal';

	export let component: SvelteComponent;
	export let closeModal;
</script>

<div transition:fade={{ delay: 150, duration: 150 }} class="container">
	<div>
		<p class="close" on:click={closeModal}>&#9587;</p>
		<svelte:component this={component} />
	</div>
</div>

<style>
	.container {
		/* modal window center */
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background-color: #393e46;
		color: white;
		padding: 2rem;
		border-radius: 20px;
	}

	/* modal content center */
	.content {
		display: flex;
		justify-content: center; /* horizontal */
		align-items: center; /* vertical */
	}

	.close {
		text-align: right;
		cursor: pointer;
		/* padding: 0.5rem; */
		color: white;
	}
</style>
