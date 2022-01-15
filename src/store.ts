import { writable } from 'svelte/store';

export const fields = writable([]);
export const fieldNames = writable([]);

export const letter = writable('');
export const generatedLetter = writable('');
