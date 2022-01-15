<script lang="ts">
	import { fields } from '../store';
	// import { onMount } from 'svelte';

	type fieldProps = {
		name: string;
		replacement?: string;
	};

	export let field: fieldProps;
	export let i: number;

	// let textAreaSize;
	let textAreaHeight;
	let containerWidth;

	const handleChange = (e: any) => {
		console.log(e.target.value);
		let updatedFields = $fields.map((f) => {
			if (f.name === field.name) {
				console.log('gello');
				f.replacement = e.target.value.trim();
			}
			return f;
		});
		fields.update((f) => updatedFields);
	};

	// onMount(() => console.log(containerWidth));

	// console.log(containerWidth);
</script>

<div class="container" style="height:{textAreaHeight * 2}" bind:clientWidth={containerWidth}>
	<div class="input">
		<label for="company">{field.name}</label>
		<textarea
			id={`${i}`}
			class="field-text"
			name="company"
			rows="1"
			style="max-width: calc({containerWidth}px - 2rem)"
			bind:clientHeight={textAreaHeight}
			on:change={handleChange}
		/>
		<!-- <button>Save</button> -->
	</div>
</div>

<style>
	.container {
		width: 400px;
		/* height: 1001px; */
		background-color: #393e46;
		display: flex;
		/* justify-content: center; */
		/* align-items: center; */
		border-radius: 20px;
		margin: 1rem 0;
		display: grid;
	}

	textarea {
		min-height: 30px;
		min-width: 250px;
	}

	label {
		display: block;
	}

	/* button {
		cursor: pointer;
	} */

	.input {
		padding: 1rem;
	}

	.field-text {
		/* resize: vertical; */
	}

	/* .input {
	} */
</style>
