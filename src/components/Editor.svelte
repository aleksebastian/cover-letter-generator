<script lang="ts">
	import { jsPDF } from 'jspdf';
	import { letter, generatedLetter, fields } from '../store';

	let text: string = `Dear Hiring Manager,

I came across your company through an acquaintance who had a great experience working at {company} as a Software Engineer. I’m excited at the prospect of joining {company} as a {role}. I feel that the job description aligns well with my strengths in technologies as I am very comfortable utilizing the {stack} stack.

A bit about me and things I’ve done recently. I am a software engineer with a passion for learning and writing clean, reusable code. I also place a focus on the user experience with everything I develop. My recent applications include two fully interactive front-end React microservices that consume data via a REST API. I developed these microservices with separation of concerns by utilizing styled-components to modularize CSS. This optimization resulted in a smooth integration and operability amongst other microservices. I also optimized the back-end for an inherited microservice codebase written in Node.js by setting up a scalable and performant NoSQL database, setting up a cache with Redis, and setting up a proxy-server with NGINX configured as a primary cache and load balancer. As a result, the requests per second the service was able to handle dramatically increased, latency decreased, and there was virtually a zero percent error rate. Please feel free to check out these projects’ codebases through my portfolio at aleksebastian.dev.

I believe that my technical experience working with the {stack} stack and relevant technologies to this position will help me contribute great value as a {role} at {company}. I would love to learn more about the company, role, responsibilities, and team. Would you be available to discuss this in more detail? I look forward to speaking to you.

Best Regards,

Alek Ortiz
512-695-8483 | aleksebastian@outlook.com 
linkedin.com/in/alek-ortiz`;

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
	<button on:click={() => handleClick('pdf')}>Download generated PDF</button>
	<button on:click={() => handleClick('text')}>Copy generated text</button>
</div>

<style>
	/* main {
		padding: 1em;
	} */

	textarea {
		min-width: 600px;
		min-height: 450px;
		height: 75vh;
		max-height: 800px;
		background-color: #f8f8f8;
	}
</style>
