export const stringToHash = (string: string) => {
	var hash = 0;

	if (string.length == 0) return hash;

	for (let i = 0; i < string.length; i++) {
		let char = string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash = hash & hash;
	}

	return hash;
};

export const clickOutside = (node: any) => {
	const handleClick = (event: any) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(new CustomEvent('outsideclick'));
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};
