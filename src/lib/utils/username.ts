const adjectives = [
	'awesome',
	'amazing',
	'fantastic',
	'happy',
	'clever',
	'brave',
	'swift',
	'bright',
	'cool',
	'wild',
	'funny',
	'easy',
	'creative',
	'calm'
];

const nouns = [
	'pheonix',
	'panda',
	'cat',
	'dog',
	'tiger',
	'eagle',
	'wolf',
	'fox',
	'bear',
	'hawk',
	'lion',
	'deer'
];

export function generateUsername(): string {
	const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
	const noun = nouns[Math.floor(Math.random() * nouns.length)];
	return `${adjective}${noun}${Math.floor(Math.random() * 100)}`;
}
