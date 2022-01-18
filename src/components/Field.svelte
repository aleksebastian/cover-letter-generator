<script lang="ts">
	import { slide } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import { fields } from '../store';

	type fieldProps = {
		name: string;
		replacement: string;
	};

	export let field: fieldProps;
	export let i: number;

	let textAreaHeight: number;

	const handleChange = (e: any) => {
		let updatedFields = $fields.map((f) => {
			if (f.name === field.name) {
				f.replacement = e.target.value.trim();
			}
			return f;
		});
		fields.update((f) => updatedFields);
	};
</script>

<div
	transition:slide={{ delay: 250, duration: 300, easing: quintOut }}
	class="container"
	style="height:{textAreaHeight}"
>
	<div class="input">
		<label for="company">{field.name}</label>
		<textarea
			id={`${i}`}
			class="field-text"
			name="company"
			rows="1"
			value={field.replacement ? field.replacement : ''}
			bind:clientHeight={textAreaHeight}
			on:change={handleChange}
		/>
	</div>
</div>

<style>
	.container {
		background-color: #393e46;
		display: flex;
		border-radius: 20px;
		margin: 0.8rem 0;
		display: grid;
	}

	textarea {
		min-height: 30px;
		min-width: 250px;
		width: 100%;
		resize: vertical;
	}

	label {
		display: block;
	}

	.input {
		padding: 0.8rem 1.2rem;
	}
</style>
