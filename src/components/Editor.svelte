<script lang="ts">
	import { fade } from 'svelte/transition';
	import { jsPDF } from 'jspdf';
	import { letter, generatedLetter, fields, fieldNames } from '../store';

	let memoMatchAllResult: RegExpMatchArray[];
	let showCopyConfirm: boolean = false;
	let unableToCopy: boolean = false;
	let missingReplacement: boolean = false;

	$: $letter, handleLetterUpdate();

	const handleLetterUpdate = () => {
		let regexExp = /\{([^{}]+)\}/g;
		let newMatchAllResult = [...$letter.matchAll(regexExp)];
		if (
			(memoMatchAllResult &&
				JSON.stringify(memoMatchAllResult) !== JSON.stringify(newMatchAllResult)) ||
			(!memoMatchAllResult && newMatchAllResult.length)
		) {
			let newFields = [];
			let updatedNames = [];

			for (const match of newMatchAllResult) {
				const currentFieldName = match[1];
				if (!$fieldNames.includes(currentFieldName)) {
					const newField = { name: currentFieldName };
					newFields.push(newField);
					fieldNames.update((f) => [...f, currentFieldName]);
				}
				updatedNames.push(currentFieldName);
			}
			let updatedFields = $fields.filter((field) => updatedNames.includes(field.name));
			let updatedFieldNames = $fieldNames.filter((fieldName) => updatedNames.includes(fieldName));

			fieldNames.update((names) => updatedFieldNames);
			fields.update((fields) => [...updatedFields, ...newFields]);
		}

		memoMatchAllResult = newMatchAllResult;
	};

	const handleClick = async (request: string) => {
		let regexExp = /\{([^{}]+)\}/g;
		let newLetter = $letter;
		for (const field of $fields) {
			if (!field.replacement) {
				missingReplacement = true;
				setTimeout(() => {
					missingReplacement = false;
				}, 3000);
				return;
			} else {
				newLetter = newLetter.replaceAll(`{${field.name}}`, field.replacement);
			}
		}
		generatedLetter.update((letter) => newLetter);
		if (request === 'text' && newLetter.length) {
			navigator.clipboard.writeText(newLetter).then(
				() => {
					showCopyConfirm = true;
					setTimeout(() => {
						showCopyConfirm = false;
					}, 1500);
				},
				() => {
					unableToCopy = true;
					setTimeout(() => {
						unableToCopy = false;
					}, 1500);
				}
			);

			return;
		}

		if (request === 'pdf' && newLetter.length) {
			const lMargin = 25;
			const rMargin = 25;
			const pdfInMM = 210;
			const doc = new jsPDF();
			doc.setFontSize(12);
			const formattedText = doc.splitTextToSize(newLetter, pdfInMM - lMargin - rMargin);
			doc.text(formattedText, 25, 25);
			doc.save('cover-letter.pdf');
		}
	};
</script>

<div class="container">
	<main>
		<textarea id="text" name="letter" spellcheck="true" bind:value={$letter} />
	</main>
	<div class="buttons">
		<button on:click={() => handleClick('pdf')}>Download generated PDF</button>
		<button on:click={() => handleClick('text')}>Copy generated text</button>
		{#if showCopyConfirm}
			<p transition:fade={{ delay: 150, duration: 150 }} class="copy-ok">&#10003; Copied</p>
		{:else if unableToCopy}
			<p transition:fade={{ delay: 150, duration: 150 }} class="missing-replacement">
				&#10060; Unable to copy text
			</p>
		{:else if missingReplacement}
			<p transition:fade={{ delay: 150, duration: 150 }} class="missing-replacement">
				&#10060; At least one replacement is missing. Please check your fields.
			</p>
		{/if}
	</div>
</div>

<style>
	.container {
		grid-column-start: 1;
		grid-column-end: 6;
	}

	textarea {
		width: 100%;
		min-height: 450px;
		height: 70vh;
		max-height: 800px;
		background-color: #f8f8f8;
		font-weight: 300;
		resize: vertical;
	}

	.buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		margin-top: 0.5rem;
	}

	.copy-ok {
		color: rgb(0, 221, 0);
	}

	.missing-replacement {
		color: red;
	}

	@media screen and (max-width: 1024px) {
		button {
			flex-basis: 100%;
		}
	}
</style>
