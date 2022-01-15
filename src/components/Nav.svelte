<script lang="ts">
	import Modal from './Modal.svelte';
	import About from './About.svelte';
	import Instructions from './Instructions.svelte';

	let aboutHidden: boolean = true;
	let instructionsHidden: boolean = true;

	const handleClick = (section) => {
		if (section === 'instructions') {
			instructionsHidden = false;
		}
		if (section === 'about') {
			aboutHidden = false;
		}
	};

	const closeModal = () => {
		aboutHidden = true;
		instructionsHidden = true;
	};
</script>

<nav>
	<p class="app-name">Cover Letter Generator</p>
	<div class="links">
		<p on:click={() => handleClick('instructions')}>Instructions</p>
		<p on:click={() => handleClick('about')}>About</p>
	</div>
</nav>
{#if !aboutHidden}
	<Modal component={About} {closeModal} />
{/if}
{#if !instructionsHidden}
	<Modal component={Instructions} {closeModal} />
{/if}

<style>
	nav {
		display: flex;
		height: 80px;
		justify-content: space-between;
		align-items: center;
		color: white;
		padding: 2rem 2rem 1rem 2rem;
		font-weight: 300;
	}

	.app-name {
		font-size: 1.5rem;
		cursor: default;
	}

	.links {
		display: flex;
		gap: 2rem;
	}

	.links p {
		cursor: pointer;
	}

	@media screen and (max-width: 1024px) {
		.links {
			gap: 1rem;
		}
	}
</style>
