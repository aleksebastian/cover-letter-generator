<script lang="ts">
	import Field from './Field.svelte';
	import { letter, fields, fieldNames } from '../store';

	const handleClick = () => {
		let regexExp = /\{([^{}]+)\}/g;
		let matchAll = $letter.matchAll(regexExp);
		let newFields = [];
		let updatedNames = [];

		for (const match of matchAll) {
			const field = match[1];
			if (!$fieldNames.includes(field)) {
				const newField = { name: field };
				newFields.push(newField);
				fieldNames.update((f) => [...f, field]);
			}
			updatedNames.push(field);
		}
		let updatedFields = $fields.filter((field) => updatedNames.includes(field.name));
		let updatedFieldNames = $fieldNames.filter((fieldName) => updatedNames.includes(fieldName));

		fieldNames.update((names) => updatedFieldNames);
		fields.update((fields) => [...updatedFields, ...newFields]);
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
	/* .container {
		grid-column-start: 6;
		grid-column-end: 9;
	} */

	.main {
		display: flex;
		flex-direction: column;
		padding: 0 1rem 1rem 1rem;
		background-color: #222831;
		border-radius: 20px;
		color: white;
		max-height: 800px;
	}

	.section-text {
		padding: 1rem;
	}

	button {
		width: 90%;
		margin: 0.6rem auto;
	}
</style>
