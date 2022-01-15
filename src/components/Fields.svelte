<script lang="ts">
	import Field from './Field.svelte';
	import { letter, fields, fieldNames } from '../store';

	const handleClick = () => {
		let regexExp = /\{([^{}]+)\}/g;
		let matchAll = $letter.matchAll(regexExp);
		let newFields = [];
		// let fieldNames = [];
		for (const match of matchAll) {
			const field = match[1];
			if (!$fieldNames.includes(field)) {
				let newField = { name: field };
				newFields.push(newField);
				fieldNames.update((f) => [...f, field]);
			}
		}
		fields.update((fields) => [...fields, ...newFields]);
	};
</script>

<div class="container">
	<div class="main">
		<h2 class="section-text">Fields</h2>
		{#each $fields as field, i}
			<Field {field} {i} />
		{/each}
		<button class="button" on:click={handleClick}>Generate Fields</button>
	</div>
</div>

<style>
	.main {
		padding: 0 1rem 1rem 1rem;
		background-color: #222831;
		border-radius: 20px;
		color: white;
	}

	.section-text {
		padding: 1rem;
	}

	button {
		margin: 1rem;
		border-radius: 10px;
		border: 1px solid transparent;
	}
</style>
