<script lang="ts">
	import { jsPDF } from 'jspdf';
	import { letter, generatedLetter, fields, fieldNames } from '../store';
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	let text: string = '';
	let previousMatchAllResult: RegExpMatchArray[];

	const handleInput = () => {
		letter.update((t) => text);
		let regexExp = /\{([^{}]+)\}/g;
		let newMatchAll = [...text.matchAll(regexExp)];
		if (
			(previousMatchAllResult &&
				JSON.stringify(previousMatchAllResult) !== JSON.stringify(newMatchAll)) ||
			(!previousMatchAllResult && newMatchAll.length)
		) {
			let newFields = [];
			let updatedNames = [];

			for (const match of newMatchAll) {
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

		previousMatchAllResult = newMatchAll;
	};

	const handleClick = (request: string) => {
		let regexExp = /\{([^{}]+)\}/g;
		let newLetter = $letter;
		for (const field of $fields) {
			newLetter = newLetter.replaceAll(`{${field.name}}`, field.replacement);
		}
		generatedLetter.update((letter) => newLetter);
		if (request === 'text') {
			navigator.clipboard.writeText(newLetter);
		} else if (request === 'pdf') {
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
		<textarea id="text" name="letter" spellcheck="true" bind:value={text} on:input={handleInput} />
	</main>
	<div class="buttons">
		<button on:click={() => handleClick('pdf')}>Download generated PDF</button>
		<button on:click={() => handleClick('text')}>Copy generated text</button>
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
		height: 75vh;
		max-height: 800px;
		background-color: #f8f8f8;
		font-weight: 300;
		resize: vertical;
	}

	.buttons {
		display: flex;
		gap: 1rem;
		margin-top: 0.5rem;
	}
</style>
