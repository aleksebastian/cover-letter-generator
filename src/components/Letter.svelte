<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { fields, letter } from '../store';

	import Modal from './Modal.svelte';
	import Warning from './Warning.svelte';

	type letterProps = {
		name: string;
		details: string;
		text: string;
	};

	export let currentLetter: letterProps;
	// export let i: number;

	let warning = false;

	const handleClick = () => {
		if (!$letter.length) {
			letter.update((l) => currentLetter.text);
		} else {
			warning = true;
		}
	};

	const updateLetter = () => {
		warning = false;
		letter.update((l) => currentLetter.text);
	};

	const closeModal = () => {
		warning = false;
	};
</script>

<div transition:slide={{ delay: 250, duration: 300, easing: quintOut }} class="container">
	<div class="input">
		<div class="labels">
			<label for="company">{currentLetter.name}</label>
			<p class="details">{currentLetter.details}</p>
		</div>
		<div class="button-container">
			<button on:click={handleClick}>Open letter</button>
		</div>
	</div>
</div>
{#if warning}
	<Modal component={Warning} {closeModal} componentProp={updateLetter} />
{/if}

<style>
	.container {
		background-color: #393e46;
		display: flex;
		border-radius: 20px;
		margin: 0.6rem 0;
		display: grid;
	}

	label {
		display: block;
	}

	.labels {
		flex-basis: 65%;
	}

	.input {
		padding: 1rem;
		gap: 5%;
		display: flex;
		justify-content: space-between;
	}

	.details {
		font-size: 0.9rem;
		font-weight: 300;
	}

	.button-container {
		display: flex;
		align-items: center;
		flex-basis: 30%;
	}
</style>
