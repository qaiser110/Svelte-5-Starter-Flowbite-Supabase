export function maskEmail(email: string) {
	const [username, domain] = email.split('@');
	if (username.length <= 6) return email;

	const maskedUsername =
		username.slice(0, 3) + '*'.repeat(username.length - 6) + username.slice(-3);
	return `${maskedUsername}@${domain}`;
}
