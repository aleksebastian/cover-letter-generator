<script lang="ts">
	export let componentProp: any;
</script>

<div class="container">
	<p>This will overwrite your current letter. Are you sure?</p>
	<p />
	<button on:click={componentProp}>Yes, open letter</button>
</div>

<style>
	.container {
		width: 300px;
		padding: 1rem;
	}

	button {
		margin: 1rem 0;
	}
</style>
