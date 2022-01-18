<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';

	import Letter from './Letter.svelte';

	let hidden = false;
	let transform = '-180deg';

	const handleClick = () => {
		if (hidden) {
			transform = '-180deg';
		} else {
			transform = '0deg';
		}
		hidden = !hidden;
	};

	const MockLetterData = {
		name: 'my-cover-letter-name',
		details:
			'This section is a work in progress. For now, click the open letter button to see a formatted letter example',
		text: 'I came across your company through {job board}. I’m excited at the prospect of joining {company} as a {role}.'
	};
</script>

<div class="container">
	<div class="main">
		<div class="header" on:click={handleClick}>
			<h2 class="section-text">Cover letters</h2>
			<div class="arrow-container">
				<span class="arrow" style="transform: rotateZ({transform})" />
			</div>
		</div>
		{#if !hidden}
			<Letter currentLetter={MockLetterData} />
			<button
				disabled={true}
				transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
				class="button">Get cover letters</button
			>
		{/if}
	</div>
</div>

<style>
	.main {
		display: flex;
		flex-direction: column;
		padding: 0 1rem 0.5rem 1rem;
		background-color: #222831;
		border-radius: 20px;
		color: white;
		max-height: 800px;
	}

	.header {
		display: flex;
		justify-content: space-between;
		cursor: pointer;
	}

	.section-text {
		padding: 1rem;
	}

	.arrow-container {
		transform: rotate(-45deg);
	}

	.arrow {
		display: inline-block;
		margin: 1.7rem 1rem 0 0;
		width: 15px;
		height: 15px;
		border-top: 3px solid white;
		border-right: 3px solid white;
		transition: all 300ms;
	}

	button {
		width: 90%;
		margin: 0.6rem auto;
	}
</style>
