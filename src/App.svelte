<script lang="ts">
	import Nav from './components/Nav.svelte';
	import Editor from './components/Editor.svelte';
	import Letters from './components/Letters.svelte';
	import Fields from './components/Fields.svelte';
	import { scrollable } from './store';

	$: $scrollable, toggleScrollable();

	const toggleScrollable = () => {
		if ($scrollable) {
			window.document.body.style.overflow = null;
		} else {
			window.document.body.style.overflow = 'hidden';
		}
	};
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
		padding: 1rem 2rem 2rem 2rem;
		gap: 2rem;
	}

	.second-column {
		grid-column-start: 6;
		grid-column-end: 9;
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	@media screen and (max-width: 1024px) {
		.container {
			display: flex;
			flex-direction: column;
		}
	}
</style>
