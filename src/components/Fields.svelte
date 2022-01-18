<script lang="ts">
	import Field from './Field.svelte';
	import { fields } from '../store';

	let hidden = false;
	let transform = '-180deg';

	const handleClick = () => {
		// if ($fields.length) {
		if (hidden) {
			transform = '-180deg';
		} else {
			transform = '0deg';
		}
		hidden = !hidden;
	};
	// };
</script>

<div class="container">
	<div class="main">
		<div class="header" on:click={handleClick}>
			<h2 class="section-text">Fields to replace</h2>
			<div class="arrow-container">
				<span class="arrow" style="transform: rotateZ({transform})" />
			</div>
		</div>
		{#if !hidden}
			<div class="fields">
				{#each $fields as field, i}
					<Field {field} {i} />
				{/each}
			</div>
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
		/* max-height: 800px; */
		max-height: calc(100vh - 13rem);
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

	.fields {
		overflow: scroll;
	}
</style>
