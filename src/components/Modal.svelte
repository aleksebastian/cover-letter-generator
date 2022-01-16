<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { fade } from 'svelte/transition';
	import { clickOutside } from '../utils';

	export let component: any;
	export let componentProp: any;
	export let closeModal: any;
</script>

<div
	transition:fade={{ delay: 150, duration: 150 }}
	id="modal"
	class="container"
	use:clickOutside
	on:outsideclick={closeModal}
>
	<div>
		<p class="close" on:click={closeModal}>&#9587;</p>
		<svelte:component this={component} {componentProp} />
	</div>
</div>

<style>
	.container {
		/* modal window center */
		z-index: 20;
		position: fixed;
		left: 50%;
		top: 40%;
		transform: translate(-50%, -50%);
		background-color: #222831;
		color: white;
		padding: 2rem;
		border-radius: 20px;
		max-height: 60vh;
		overflow: scroll;
		box-shadow: 0 0 0 1000px rgba(0, 0, 0, 0.658);
	}

	.close {
		text-align: right;
		cursor: pointer;
		/* padding: 0.5rem; */
		color: white;
		-webkit-tap-highlight-color: transparent;
	}

	@media screen and (max-width: 1280px) {
		.container {
			/* modal window center */
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			max-height: 85vh;
		}
	}

	@media screen and (max-width: 768px) {
		.container {
			/* modal window center */
			top: 17%;
			left: 10%;
			transform: translate(-5%, -5%);
			max-height: 85vh;
		}
	}
</style>
