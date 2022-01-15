<script lang="ts">
	import Nav from './components/Nav.svelte';
	import Editor from './components/Editor.svelte';
	import Letters from './components/Letters.svelte';
	import Fields from './components/Fields.svelte';

	import { stringToHash } from './utils';
</script>

<Nav />
<div class="container">
	<Editor />
	<div class="second-column">
		<Letters />
		<Fields />
	</div>
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		padding: 2rem;
		gap: 2rem;
	}

	.second-column {
		grid-column-start: 6;
		grid-column-end: 9;
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}
</style>
