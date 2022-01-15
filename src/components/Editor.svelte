<script lang="ts">
	import { jsPDF } from 'jspdf';
	import { letter, generatedLetter, fields } from '../store';

	let text: string = '';

	const handleChange = () => {
		letter.update((t) => text);
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
		<textarea
			id="text"
			name="letter"
			spellcheck="true"
			bind:value={text}
			on:change={handleChange}
		/>
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
		gap: 1.5rem;
	}
</style>
