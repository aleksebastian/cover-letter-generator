<script lang="ts">
	import Nav from './components/Nav.svelte';
	import Editor from './components/Editor.svelte';
	import Fields from './components/Fields.svelte';
</script>

<Nav />
<div class="container">
	<Editor />
	<Fields />
</div>

<style>
	.container {
		display: grid;
		grid-template-columns: repeat(8, 1fr);
		padding: 2rem;
		gap: 2rem;
	}
</style>
